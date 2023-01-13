type AlignText = "left" | "right" | "center";

export type StatefulRadioFieldBlueprint = {
  type: "stateful-radio";
  name: string;
  testName?: string;
  description?: string;
  label: string;
  options: string[];
  initialValue: string;
  dependentChildren: (FormFieldInput | undefined)[][];
  tableFlex?: number;
  showOnMobileTable?: boolean;
  alignText?: AlignText;
};

type HiddenFieldBlueprint = {
  type: "hidden";
  label?: string;
  name: string;
  initialValue: string;
};

export type RadioFieldBlueprint = {
  type: "radio";
  testName?: string;
  name: string;
  description?: string;
  label: string;
  options: string[];
  initialValue: string;
  showOnMobileTable?: boolean;
  tableFlex?: number;
  alignText?: AlignText;
  tbWidth?: "full" | "half" | "third";
  ltWidth?: "full" | "half" | "third";
};

export type SelectFieldBlueprint = {
  type: "select";
  testName?: string;
  name: string;
  description?: string;
  label: string;
  options: string[];
  initialValue: string;
  showOnMobileTable?: boolean;
  tableFlex?: number;
  alignText?: AlignText;
  tbWidth?: "full" | "half" | "third";
  ltWidth?: "full" | "half" | "third";
};

export type CheckboxBlueprint = {
  testName?: string;
  type: "checkbox";
  name: string;
  label: string;
  value: string;
  initialValue?: string;
  showOnMobileTable?: boolean;
  tableFlex?: number;
  alignText?: AlignText;
};

export type CheckboxGroupBlueprint = {
  type: "checkbox-group";
  name: string;
  label: string;
  description?: string;
  checkboxes: CheckboxBlueprint[];
  showOnMobileTable?: boolean;
  tbWidth?: "full" | "half" | "third";
  ltWidth?: "full" | "half" | "third";
};

export type ExpandableListBlueprint = {
  type: "expandable-list";
  name: string;
  label?: string;
  description?: string;
  listItemStructure: FormFieldInput[];
  initialValue: any[];
  addItemLabel?: string;
  editItemLabel?: string;
  addOrEditItemModalLabel?: string;
};

export type TextFieldBlueprint = {
  testName?: string;
  type: "text" | "textarea" | "password" | "email";
  description?: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  initialValue?: string;
  validation: {
    browserPattern?: string;
    browserMessage?: string;
    patterns: string[];
    messages: string[];
  };
  showOnMobileTable?: boolean;
  tableFlex?: number;
  alignText?: AlignText;
  tbWidth?: "full" | "half" | "third";
  ltWidth?: "full" | "half" | "third";
};

export type FormFieldInput =
  | StatefulRadioFieldBlueprint
  | RadioFieldBlueprint
  | TextFieldBlueprint
  | CheckboxBlueprint
  | HiddenFieldBlueprint
  | CheckboxGroupBlueprint
  | ExpandableListBlueprint
  | SelectFieldBlueprint;

export type FormStage = {
  stageTitle?: string;
  fields: FormFieldInput[];
  nextButtonText?: string;
  backButtonText?: string;
};

export type FormBlueprint = FormStage[];
