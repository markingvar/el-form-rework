import type { FormFieldInput, FormBlueprint } from "../../types";

// Take the form values from the request
// form data and add them to context
export function addFormValuesToContext({
  formBlueprint,
  body,
  context,
}: {
  context: any;
  formBlueprint: FormBlueprint;
  body: FormData;
}): any {
  // Get the inputs from the form
  function addFieldToContext(field: FormFieldInput) {
    // Get the form field value
    let formFieldValue: string | undefined;

    if (
      field.type === "email" ||
      field.type === "password" ||
      field.type === "text" ||
      field.type === "textarea" ||
      field.type === "radio" ||
  field.type === "select" ||
      field.type === "hidden" ||
      field.type === "stateful-radio"
    ) {
      formFieldValue =
        body.get(`${field.name}`)?.toString() ?? field.initialValue;
    }

    if (field.type === "checkbox") {
      let checkboxValue = body.get(`${field.name}`)?.toString();
      // If there is no value, the checkbox was never checked, so
      // we want to return early
      // console.log({ checkboxValue });

      if (!checkboxValue) {
        return;
      }
      formFieldValue = checkboxValue;
    }

    let errors: string[] = [];
    // If a field is required and not present, we need to add an error
    // to the field
    if (
      field.type === "text" ||
      field.type === "textarea" ||
      field.type === "email" ||
      field.type === "password"
    ) {
      if (!formFieldValue && field.required) {
        errors.push("This field is required");
      }
    }

    if (typeof field === "object") {
      // console.log({ formFieldValue, fieldName: field.name });

      // Add the field to context
      if (formFieldValue) {
        context[`${field.name}`] = {
          value: formFieldValue,
          errors,
        };
      }
    }

    // If it is a stateful radio field, check for
    // dependent children
    if (field.type === "stateful-radio") {
      // Get the index of the selected value
      // We need this to know which children to show

      field.dependentChildren.forEach((fields) => {
        if (typeof fields !== "undefined") {
          fields.forEach((nestedField) => {
            if (nestedField) {
              addFieldToContext(nestedField);
            }
          });
        }
      });
    }

    if (field.type === "checkbox-group") {
      field.checkboxes.forEach((checkbox) => {
        // Get rid of checkbox values that might
        // exist from a previous pass
        delete context[`${checkbox.name}`];
        // console.log({ contextAfterDelete: context });

        addFieldToContext(checkbox);
        //        console.log("hi neighbors");
      });
    }
  }

  // Use the form structure to create a context object

  // Get the current form step to know what to add to context
  const currentFormStep = context.currentStep;

  // console.log({ currentFormStep, formBlueprint, context });

  // console.log("lol: ", typeof formBlueprint[currentFormStep]);

  for (const field of formBlueprint[currentFormStep]?.fields) {
    if (field) {
      addFieldToContext(field);
    }
  }

  // console.log({ context });
}
