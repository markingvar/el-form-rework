// Takes in the data (context), success redirect path, and

// session and commitSession function
export async function handleFormData({
  handleDataFn,
  context,
  successRedirectPath,
  session,
  request,
  formUtilitiesFromRemixApp,
}: {
  handleDataFn: any;
  context: any;
  successRedirectPath: string;
  session: any;
  request: Request;
  formUtilitiesFromRemixApp: {
    redirect: any;
    json: any;
    commitSession: any;
  };
}) {
  const { commitSession, redirect, json } = formUtilitiesFromRemixApp;
  // handle data - the data function should return a tuple
  // the first item in the tuple will be a boolean to indicate
  // whether the operation succeeded or failed

  // The second item in the tuple is the success or error message
  let handleDataResult: [boolean, string] = await handleDataFn(
    context,
    request
  );
  let [success, message] = handleDataResult;

  if (success) {
      // clear the context values so that the form fields are empty if 
      // the user goes back to the same form
    context = {};
    context.dataHandlerSuccessMessage = message;
    context.dataHandlerErrorMessage = "";
    session.set("context", context);

    return redirect(successRedirectPath, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    context.dataHandlerSuccessMessage = "";
    context.dataHandlerErrorMessage = message;
    session.set("context", context);

    return json(
      {},
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }
}
