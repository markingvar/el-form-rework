import type { ReactNode } from "react";
import type { FormFieldInput, FormStage } from "./types";
// @ts-expect-error sometimes you walk the line, sometimes it walks you
import React from "react";
import { FormField } from "./form-field";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function ElectricLadylandForm({
  context,
  formStructure,
  action,
  submitText = "Submit",
  reloadDocument = false,
  remixBrowserUtils,
}: {
  context: any;
  formStructure: FormStage;
  action?: string;
  submitText?: string;
  reloadDocument?: boolean;
  remixBrowserUtils: {
    useSubmit: any;
    Form: any;
    useState: any;
    useEffect: any;
  };
}) {
  //  console.log({ formStructure });

  return (
    <div className="el-form-wrapper">
      <FormWrapper
        RemixFormFromApplication={remixBrowserUtils?.Form}
        reloadDocument={reloadDocument}
        action={action}
      >
        {formStructure?.stageTitle && (
          <div className="el-form-stage-title">{formStructure.stageTitle}</div>
        )}
        <HoneypotField />
        {formStructure.fields.map((field: FormFieldInput) => {
          return (
            <FormField
              remixBrowserUtils={remixBrowserUtils}
              field={field}
              context={context}
              key={field.name}
            />
          );
        })}
        {context.dataHandlerErrorMessage && context.formStage === "end" ? (
          <>
            <div className="font-display text-lg font-semibold text-danger-5">
              {context.dataHandlerErrorMessage}
            </div>
            <span className="block h-6"></span>
          </>
        ) : null}
        <div className="forward-button-wrapper mt-10 flex w-full">
          {(context.formStage === "beginning" ||
            context.formStage === "middle") && (
            <FormButton
              dataTest="next"
              className="el-form-button-forward"
              name="submit-type"
              type="submit"
              value="next"
            >
              {context.nextButtonText}
              <span className="el-form-right-icon">
                <FaChevronRight aria-hidden="true" />
              </span>
            </FormButton>
          )}
          {context.formStage === "end" && (
            <FormButton
              dataTest="submit"
              className="el-form-button-forward"
              name="submit-type"
              type="submit"
              value="submit"
            >
              {submitText}
              <span className="el-form-right-icon">
                <FaChevronRight aria-hidden="true" />
              </span>
            </FormButton>
          )}
        </div>
      </FormWrapper>
      {(context.formStage === "middle" || context.formStage === "end") &&
      context.currentStep > 0 ? (
        <FormWrapper RemixFormFromApplication={remixBrowserUtils?.Form}>
          <FormButton
            dataTest="back"
            className="el-form-button-back"
            name="submit-type"
            type="submit"
            value="back"
          >
            <span className="el-form-left-icon">
              <FaChevronLeft aria-hidden="true" />
            </span>
            {context.backButtonText}
          </FormButton>
        </FormWrapper>
      ) : null}
    </div>
  );
}

function FormWrapper({
  children,
  action,
  reloadDocument = false,
  RemixFormFromApplication,
}: {
  children: ReactNode;
  action?: string;
  reloadDocument?: boolean;
  RemixFormFromApplication?: any;
}) {
  if (!RemixFormFromApplication) {
    return (
      <form className="el-form-element" method="post" action={action}>
        {children}
      </form>
    );
  }
  if (reloadDocument) {
    return (
      <RemixFormFromApplication reloadDocument action={action} method="post">
        <div className="el-form-element">{children}</div>
      </RemixFormFromApplication>
    );
  }
  return (
    <RemixFormFromApplication action={action} method="post">
      <div className="el-form-element">{children}</div>
    </RemixFormFromApplication>
  );
}

function HoneypotField() {
  return (
    <>
      <input
        className="visually-hidden"
        type="text"
        name="given-name"
        id="given-name"
      />
      <label className="visually-hidden" htmlFor="given-name">
        Given Name
      </label>
    </>
  );
}

function FormButton({
  children,
  name,
  className,
  value,
  type = "submit",
  dataTest,
}: {
  children: ReactNode;
  name?: string;
  className?: string;
  value?: string;
  type?: "submit";
  dataTest?: string;
}) {
  return (
    <button
      data-test={dataTest}
      className={`el-form-button${className ? " " + className : ""}`}
      name={name}
      type={type}
      value={value}
    >
      {children}
    </button>
  );
}
