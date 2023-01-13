// Check for errors in context

import type { FormFieldInput, FormBlueprint } from "../../types";

// for the current step
export function checkContextForErrors({
  context,
  formBlueprint,
}: {
  formBlueprint: FormBlueprint;
  context: any;
}): boolean {
  let errorsPresent = false;
  // Basic form

  const currentFormStep = context.currentStep;

  // Using the current form step, get the context fields to
  // check for errors
  // eslint-disable-next-line no-inner-declarations
  // We only care about the context values in the current step
  let fieldsToValidate: string[] = [];

  for (const field of formBlueprint[currentFormStep]?.fields) {
    // console.log({ field });

    if (context)
      addFieldNameToValidateToArray(field, fieldsToValidate, context);
  }

  // console.log({ fieldsToValidate });

  for (const fieldToValidate of fieldsToValidate) {
    if (context[`${fieldToValidate}`]?.errors?.length >= 1) {
      errorsPresent = true;
    }

    if (errorsPresent) {
      return true;
    }
  }
  return false;
}

function addFieldNameToValidateToArray(
  field: FormFieldInput,
  fieldsToValidate: string[],
  context: any
) {
  fieldsToValidate.push(field.name);

  if (field.type === "stateful-radio") {
    let selectedIndex = field.options.indexOf(context[`${field.name}`].value);
    field.dependentChildren[selectedIndex].forEach((nestedField) => {
      if (nestedField) {
        fieldsToValidate.push(nestedField.name);
      }
    });
  }
}
