// @ts-ignore sometimes you walk the line, sometimes it walks you
import React from "react";
import { displayFieldLabelDescriptionError } from "./shared/display";
import type { TextFieldBlueprint } from "../types";
import { onChange, useFormField } from "./shared/logic";

export function TextInput({
  fieldBlueprint,
  fieldContext,
  className,
  remixBrowserUtils,
}: {
  fieldContext: { value?: string; errors: string[] };
  fieldBlueprint: TextFieldBlueprint;
  className?: string;
  remixBrowserUtils: {
    useState: any;
    useEffect: any;
  };
}) {
  let {
    defaultValue,
    fieldErrors,
    setFieldErrors,
    fieldVisited,
    setFieldVisited,
  } = useFormField({ fieldBlueprint, fieldContext, remixBrowserUtils });
  //  console.log({ validation: fieldBlueprint.validation});
  //  console.log({ fieldErrors, fieldVisited });
  return (
    <>
      {displayFieldLabelDescriptionError({
        fieldBlueprint,
        fieldErrors,
        fieldVisited,
      })}
      {fieldBlueprint.type === "text" ||
      fieldBlueprint.type === "password" ||
      fieldBlueprint.type === "email" ? (
        <input
          data-test={fieldBlueprint.name}
          name={fieldBlueprint.name}
          id={fieldBlueprint.name}
          className={`el-text-input${className ? " " + className : ""}`}
          required={fieldBlueprint.required}
          defaultValue={defaultValue}
          placeholder={fieldBlueprint.placeholder}
          onBlur={() => setFieldVisited(true)}
          onChange={(event) => {
            onChange({
              e: event,
              setFieldErrors,
              fieldErrors,
              fieldValidation: fieldBlueprint.validation,
            });
          }}
          pattern={fieldBlueprint.validation.browserPattern}
          title={fieldBlueprint.validation.browserMessage}
          type={fieldBlueprint.type}
          autoCorrect="false"
          autoComplete="false"
        />
      ) : fieldBlueprint.type === "textarea" ? (
        <textarea
          name={fieldBlueprint.name}
          id={fieldBlueprint.name}
          data-test={fieldBlueprint.name}
          className="el-text-input"
          required={fieldBlueprint.required}
          rows={5}
          defaultValue={defaultValue}
          placeholder={fieldBlueprint.placeholder}
          onBlur={() => setFieldVisited(true)}
          onChange={(event) => {
            onChange({
              e: event,
              setFieldErrors,
              fieldErrors,
              fieldValidation: fieldBlueprint.validation,
            });
          }}
        />
      ) : null}
    </>
  );
}
