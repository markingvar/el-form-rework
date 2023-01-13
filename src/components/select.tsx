import type { SelectFieldBlueprint } from "../types";
// @ts-ignore sometimes you walk the line, sometimes it walks you
import React from "react";
import {
  displayFieldLabelDescriptionError,
} from "./shared/display";
import { createFieldLabel } from "./shared/logic";
import {FaChevronDown} from "react-icons/fa";

export function Select({
  fieldBlueprint,
  fieldContext,
  remixBrowserUtils 
}: {
  fieldContext: { value?: string; errors: string[] };
  fieldBlueprint: SelectFieldBlueprint;
  className?: string;
  remixBrowserUtils: {
      useState: any;
      useEffect: any;
  }
}) {
//    console.log({remixBrowserUtils});
    let {useState} = remixBrowserUtils;
    let defaultSelectOption = fieldBlueprint.initialValue;

    if (fieldContext?.value) {
        defaultSelectOption = fieldContext.value;
    }
    const [selectedValue, setSelectedValue] = useState(defaultSelectOption);
  return (
    <>
      {displayFieldLabelDescriptionError({
        fieldBlueprint,
      })}
<div className="el-select-wrapper">
          <select className="el-native-select" id={fieldBlueprint.name}  value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} name={fieldBlueprint.name}>
          {fieldBlueprint.options.map((selectOption) => {
                  //        console.log({ radioValue });

          const label = createFieldLabel(selectOption);

          return (
            <option key={selectOption} value={selectOption}>{label}</option>
          )
                                                      })}


          </select>
          <div className="el-select-presentational">
          {createFieldLabel(selectedValue)}
          <div className="el-select-icon-wrapper">
            <FaChevronDown/>
            </div>
          </div>
        </div>
    </>
  );
}
