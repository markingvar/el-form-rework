import type { FormFieldInput, FormBlueprint } from "../../types";

// Check to see that the context applies to the current
// form structure. If it doesn't, return false

// Perform different validation based on the field type
// Outliers:
// - Stateful Radio
// - Checkbox Group

// Does the context apply to the current form structure?
// Yes - return the current context
// No - return an empty context object
function checkForRelevantContext({
  formBlueprint,
  context,
}: {
  formBlueprint: FormBlueprint;
  context: any;
}): any {
  // No context exists
  if (!context) {
    return {};
  }

  let contextMismatch = false;

  // Loop through the steps of the form structure and
  // then loop through the fields of that step

  // Each iteration of the loop will check the value of the
  // contextMatches boolean. If contextMatches is false, we
  // know we have a context mismatch and want to return an
  // empty context object to re-initate the form

  for (const step of formBlueprint) {
    // @ts-ignore
    for (const field of step?.fields) {
      if (contextMismatch) {
        return {};
      }

      contextMismatch = checkContextForMismatch({ field, context });
    }
    if (contextMismatch) {
      //      console.log(
      //       "The context you passed in does not match the structure of the form. Setting context to an empty object so that we can start the form again"
      //    );

      return {};
    }
  }

  return context;
}

function checkContextForMismatch({
  field,
  context,
}: {
  field: FormFieldInput;
  context: any;
}) {
  // Checkbox groups should be ignored, because their value
  // may or may not exist. A selected checkbox will show up
  // in a form post, an unselected checkbox will not
  if (field.type === "checkbox-group") {
    return false;
  }

  let contextFieldName = context[`${field.name}`];
  // If the context field name is not defined, we know we're on the wrong form
  if (typeof contextFieldName === "undefined") {
    return true;
  }
  if (
    typeof contextFieldName?.value !== "string" &&
    typeof contextFieldName?.value !== "object"
  ) {
    //    console.log("bad value: ", contextFieldName.value);

    return true;
  }

  // Stateful radios are also special in that in addition to
  // their value, they can have nested children
  if (field.type === "stateful-radio") {
    field.dependentChildren.forEach((fields) => {
      fields.forEach((nestedField) => {
        if (nestedField) {
          checkContextForMismatch({ field: nestedField, context });
        }
      });
    });
  }

  if (field.type === "expandable-list") {
    field.listItemStructure.forEach((nestedField) => {
      if (nestedField) {
        checkContextForMismatch({ field: nestedField, context });
      }
    });
  }

  return false;
}

export { checkForRelevantContext };
