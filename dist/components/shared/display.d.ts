import type { ReactNode } from "react";
import type { CheckboxGroupBlueprint, ExpandableListBlueprint, RadioFieldBlueprint, SelectFieldBlueprint, StatefulRadioFieldBlueprint, TextFieldBlueprint } from "../../types";
export declare function FieldLabel({ className, children, }: {
    className?: string;
    children: ReactNode;
}): JSX.Element;
export declare function FieldDescription({ children }: {
    children: ReactNode;
}): JSX.Element;
export declare function displayFieldErrors({ fieldErrors, fieldVisited, }: {
    fieldErrors: string[];
    fieldVisited: boolean;
}): JSX.Element;
export declare function displayFieldLabelDescriptionError({ fieldBlueprint, fieldErrors, fieldVisited, }: {
    fieldBlueprint: TextFieldBlueprint | SelectFieldBlueprint | RadioFieldBlueprint | StatefulRadioFieldBlueprint | CheckboxGroupBlueprint | ExpandableListBlueprint;
    fieldErrors?: string[];
    fieldVisited?: boolean;
}): JSX.Element;
export declare function RadioOrCheckboxWrapper({ className, children, }: {
    className?: string;
    children: ReactNode;
}): JSX.Element;
export declare function RadioOrCheckboxLabel({ className, children, htmlFor, }: {
    className?: string;
    children: ReactNode;
    htmlFor: string;
}): JSX.Element;
//# sourceMappingURL=display.d.ts.map