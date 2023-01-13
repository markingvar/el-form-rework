import type { FormEvent } from "react";
import { convertSingleQuotes } from "../../shared-logic";

export function createFieldLabel(fieldName: string) {
  let words = fieldName.split("-");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
}

export function onChange({
  e,
  fieldValidation,
  setFieldErrors,
  fieldErrors,
}: {
  e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>;
  setFieldErrors: any;
  fieldErrors: string[];
  fieldValidation: { patterns: string[]; messages: string[] };
}) {
  //  console.log("hello from onChange");
  //    console.log({ validation: fieldValidation, fieldErrors });
  let fieldIsValid = true;
  fieldValidation.patterns.forEach(async (pattern, index) => {
    let regexTestPattern = new RegExp(pattern, "gim");

    let value = convertSingleQuotes(e?.currentTarget?.value);
    // console.log({ value });
    let currentFieldIsValid = regexTestPattern.test(value);
    if (!currentFieldIsValid) fieldIsValid = false;
    if (currentFieldIsValid) {
      // remove the current error message if it exists
      let indexOfError = fieldErrors.indexOf(fieldValidation.messages[index]);
      // console.log({currentFieldMessage: fieldValidation.messages[index]});
      // console.log("indexOfError", indexOfError);
      if (indexOfError > -1) {
        fieldErrors.splice(indexOfError, 1);
      }
    } else if (!fieldErrors.includes(fieldValidation.messages[index])) {
      // console.log("not valid");

      // Only display the error message once
      setFieldErrors([...fieldErrors, fieldValidation.messages[index]]);
    }
  });
  if (fieldIsValid) {
    setFieldErrors([]);
  }
}

export function useFormField({
  fieldBlueprint,
  fieldContext,
  remixBrowserUtils,
}: {
  fieldBlueprint: {
    name: string;
    type: string;
    initialValue?: string;
  };
  fieldContext: {
    value?: string;
    errors: string[];
  };
  remixBrowserUtils: {
    useState: any;
    useEffect: any;
  };
}) {
  let { useState } = remixBrowserUtils;
  // Determine if the field has errors or has been visited
  let errors: string[] = [];
  let visited = false;

  if (
    fieldBlueprint.type === "email" ||
    fieldBlueprint.type === "password" ||
    fieldBlueprint.type === "text" ||
    fieldBlueprint.type === "textarea"
  ) {
    if (fieldContext?.errors) {
      errors = fieldContext?.errors;

      if (fieldContext?.errors.length >= 1) visited = true;
    }
  }

  let [fieldErrors, setFieldErrors] = useState(errors);
  let [fieldVisited, setFieldVisited] = useState(visited);

  // Check to see whether a value for the field exists in the context
  // If it does, set the value to the context value
  // If it doesn't, set the value to the initial value
  let initialValue = fieldBlueprint.initialValue ?? "";
  let defaultValue = fieldContext?.value ?? initialValue;

  return {
    fieldErrors,
    fieldVisited,
    setFieldErrors,
    setFieldVisited,
    defaultValue,
  };
}
