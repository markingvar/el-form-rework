import {
  addFormValuesToContext,
  checkContextForErrors,
  handleFormData,
  handleListItemFormStructureOp,
  honeypotFieldHasValue,
  validateFormFieldValue,
} from "./logic";
import type { FormBlueprint } from "../types";
import { getFormStage } from "../shared-logic";

export async function formActionFunction({
  request,
  formBlueprint,
  handleDataFn,
  successRedirectPath,
  formUtilitiesFromRemixApp,
}: {
  request: Request;
  formBlueprint: FormBlueprint;
  handleDataFn: any;
  successRedirectPath: string;
  formUtilitiesFromRemixApp: {
    commitSession: any;
    getSession: any;
    destroySession: any;
    redirect: any;
    json: any;
  };
}): Promise<any> {
  // Get the form utilities by spreading the form utilities object
  const { commitSession, getSession, destroySession, redirect } =
    formUtilitiesFromRemixApp;

  let basicOrMultipart: "basic" | "multipart" = "basic";
  formBlueprint.length > 1
    ? (basicOrMultipart = "multipart")
    : (basicOrMultipart = "basic");

  // Get the current session
  const session = await getSession(request.headers.get("Cookie"));

  //  console.log({ session });

  let { pathname } = new URL(request.url);

  let context: any = session.get("context") ?? {};

  //  console.log({ context });

  // If there is no context, the session most likely timed out
  // We only really care about the context if it is a multipart form
  if (basicOrMultipart === "multipart" && Object.keys(context).length < 1) {
    let { pathname } = new URL(request.url);
    // console.log({ pathname });

    //    console.log("No context found in session, redirecting to start");
    return redirect(pathname, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  const body = await request.formData();

  // Handle bots by checking for honeypot field
  let honeypotFieldHit = honeypotFieldHasValue({ body });

  if (honeypotFieldHit) {
    return redirect("/");
  }

  const operationType = body.get("operation-type");

  // *** ALERT ***
  // operationType only exists for list item form structure
  // Handle accordingly
  if (operationType) {
    return await handleListItemFormStructureOp({
      operationType,
      formBlueprint,
      context,
      session,
      commitSession,
      pathname,
      body,
      redirect,
    });
  }

  let submitType: "back" | "next" | "submit" | string =
    body.get("submit-type")?.toString() ?? "";

  // console.log({ submitType });

  // Multipart - back button
  if (basicOrMultipart === "multipart") {
    if (submitType === "back") {
      context.currentStep -= 1;

      session.set("context", context);

      return redirect(pathname, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }

  // Add the form values to context
  await addFormValuesToContext({
    formBlueprint,
    body,
    context,
  });

  // Validate the form inputs using the validation
  // methods from the form structure
  if (!formBlueprint[context.currentStep].fields) {
    throw new Error("No fields found in formBlueprint");
  }

  formBlueprint[0].fields.forEach((formField) => {
    validateFormFieldValue({ context, formField });
  });

  let sessionData: any = {};

  for (const contextItem in context) {
    // console.log({ contextItem: context[contextItem] });

    sessionData[contextItem] = context[contextItem].value;
  }

  // console.log({ sessionData });

  session.set("context", context);

  // Check for errors in context
  // In basic, we want to check all of the context entries
  // In multipart, we only want to check the context items
  // for the current step
  let errorsInContext = checkContextForErrors({
    context,
    formBlueprint,
  });

  // console.log({ errorsInContext, context });

  if (!errorsInContext) {
    // Get the current form stage, if it is only a single step form
    // the formStage will be set to end to show a submit button
    const formStage = getFormStage({ formBlueprint, context });
    context.formStage = formStage;
    // If there are no errors in the context we have two routes
    // to take

    // Basic Form
    // Multipart Form

    // BASIC FORM
    if (basicOrMultipart === "basic") {
      return handleFormData({
        request,
        handleDataFn,
        context,
        successRedirectPath,
        formUtilitiesFromRemixApp,
        session,
      });
    }

    // MULTIPART FORM

    // Get the current form stage
    // This will determine a couple things
    // * What buttons we need to render on the form
    // (Next, Back, Submit)
    // * If we are at the end, we want to handle the data,
    // otherwise we want to show the next step of the form

    // Handle data
    if (formStage === "end" && submitType === "submit") {
      // console.log("hey guys");

      return handleFormData({
        handleDataFn,
        context,
        successRedirectPath,
        formUtilitiesFromRemixApp,
        session,
        request,
      });
    } else {
      // Still at the beginning or middle of the form
      // All the inputs were correct, we want to go to
      // the next stage of the form
      context.currentStep += 1;
      //      console.log({ currentStep: context.currentStep });

      session.set("context", context);

      return redirect(pathname, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }

  return redirect(pathname, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
