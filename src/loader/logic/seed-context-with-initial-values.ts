import type { FormFieldInput, FormBlueprint } from "../../types";

function seedContextWithInitialValues({
  formBlueprint,
}: {
  formBlueprint: FormBlueprint;
}): any {
  // Give the context object initial values
  let context: any = {};

  for (const step of formBlueprint) {
    // console.log({ step });

    // @ts-ignore
    for (const field of step?.fields) {
      // console.log({ field });

      if (field) {
        addFieldToContext({ field, context });
      }
    }
  }

  context.currentStep = 0;

  return context;
}

function addFieldToContext({
  field,
  context,
}: {
  field: FormFieldInput;
  context: any;
}) {
  if (field.type !== "checkbox-group" && field.type !== "expandable-list") {
    context[`${field.name}`] = {
      value: field.initialValue || "",
      errors: [],
    };
  } else if (field.type === "checkbox-group") {
    field.checkboxes.forEach((checkbox) => {
      if (checkbox.initialValue) {
        context[`${checkbox.name}`] = {
          value: checkbox.initialValue || "",
          errors: [],
        };
      }
    });
  } else if (field.type === "expandable-list") {
    context[`${field.name}`] = {
      value: field.initialValue || [],
      errors: [],
    };
  }

  // console.log("adding field context: ", context);

  if (field.type === "stateful-radio") {
    field.dependentChildren.forEach((fields) => {
      fields.forEach((nestedField) => {
        if (typeof nestedField !== "undefined") {
          addFieldToContext({ field: nestedField, context });
        }
      });
    });
  }
}

export { seedContextWithInitialValues };
