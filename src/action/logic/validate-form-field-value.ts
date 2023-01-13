import { convertSingleQuotes } from "../../shared-logic";
import type { FormFieldInput } from "../../types";

// Validate a form field value (context)
// using the validation patterns outlined in formField
// If an error exists, add it to the context

// errors array
export function validateFormFieldValue({
  formField,
  context,
}: {
  context: any;
  formField: FormFieldInput;
}) {
  // currentStep and formStage are context properties
  // that we don't want to validate, they are also not
  // objects

  // if (typeof formField !== "object") {
  //   console.log("I'm out..");

  //   return;
  // }
  if (formField.type === "hidden") {
    return;
  }

  if (
    formField.type === "text" ||
    formField.type === "textarea" ||
    formField.type === "email" ||
    formField.type === "password"
  ) {
    let currentFieldValue = context[`${formField.name}`].value;
    // Iterate through the validation patterns
    formField.validation.patterns.forEach((pattern, index) => {
      const valueIsValid = validateFieldValue({
        value: currentFieldValue,
        regex: pattern,
      });

      // console.log("valueIsValid: ", valueIsValid);

      // Value is not valid
      // Push current error message onto array if it isn't already there
      if (
        !valueIsValid &&
        !context[`${formField.name}`].errors.includes(
          formField.validation.messages[index]
        )
      ) {
        // console.log("add an error");

        context[`${formField.name}`].errors.push(
          formField.validation.messages[index]
        );
      }
    });
  }

  if (formField.type === "stateful-radio") {
    let currentFieldValue = context[`${formField.name}`].value;
    let { dependentChildren } = formField;
    // Get currently selected radio option
    // Get the index of the current value
    const selectedValueIndex: number =
      formField.options.indexOf(currentFieldValue);

    if (typeof dependentChildren === "object") {
      dependentChildren[selectedValueIndex].forEach((dependentField) => {
        if (typeof dependentField !== "undefined") {
          validateFormFieldValue({ context, formField: dependentField });
        }
      });
    }
  }
}

function validateFieldValue({
  value,
  regex,
}: {
  value: string;
  regex: string;
}) {
  let regexTestPattern = new RegExp(`${regex}`, "igm");

  value = convertSingleQuotes(value);

  // console.log({ regexTestPattern });

  // console.log("regexTest: ", regexTestPattern.test(value));

  // console.log({ value });

  return regexTestPattern.test(value);
}
