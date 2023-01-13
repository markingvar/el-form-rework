import type { FormFieldInput } from "./types";
// @ts-ignore sometimes you walk the line, sometimes it walks you
import React from "react";
import { HiddenField } from "./components/hidden";
import { TextInput } from "./components/text-input";
import { Radio } from "./components/radio";
import { CheckboxGroup } from "./components/checkbox-group";
import { ExpandableList } from "./components/expandable-list";
import { StatefulRadio } from "./components/stateful-radio";
import { Select } from "./components/select";

function FormField({
  field,
  context,
  remixBrowserUtils,
}: {
  field: FormFieldInput;
  context: any;
  remixBrowserUtils?: {
    useSubmit: any;
    Form: any;
    useState: any;
    useEffect: any;
  };
}) {
  //    console.log({remixBrowserUtils});
  if (field.type === "hidden") {
    return (
      <HiddenField fieldContext={context[field.name]} fieldBlueprint={field} />
    );
  }

  if (
    field.type === "text" ||
    field.type === "textarea" ||
    field.type === "password" ||
    field.type === "email"
  ) {
    return (
      <div
        className="el-field-item"
        data-tb-width={field.tbWidth}
        data-lt-width={field.ltWidth}
      >
        <TextInput
          remixBrowserUtils={remixBrowserUtils}
          fieldBlueprint={field}
          fieldContext={context[field.name]}
        />
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div
        className="el-field-item"
        data-tb-width={field.tbWidth}
        data-lt-width={field.ltWidth}
      >
        <Radio fieldBlueprint={field} fieldContext={context[field.name]} />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div
        className="el-field-item"
        data-tb-width={field.tbWidth}
        data-lt-width={field.ltWidth}
      >
        <Select
          remixBrowserUtils={remixBrowserUtils}
          fieldBlueprint={field}
          fieldContext={context[field.name]}
        />
      </div>
    );
  }

  if (field.type === "checkbox-group") {
    return (
      <div
        className="el-field-item"
        data-tb-width={field.tbWidth}
        data-lt-width={field.ltWidth}
      >
        <CheckboxGroup fieldBlueprint={field} context={context} />
      </div>
    );
  }

  if (field.type === "expandable-list") {
    return (
      <div className="el-field-item">
        <ExpandableList
          remixBrowserUtils={remixBrowserUtils}
          fieldBlueprint={field}
          fieldContext={context[field.name]}
        />
      </div>
    );
  }

  if (field.type === "stateful-radio") {
    return (
      <StatefulRadio
        remixBrowserUtils={remixBrowserUtils}
        fieldBlueprint={field}
        context={context}
      />
    );
  }
  return null;
}

export { FormField };
