import type { FormEvent } from "react";
export declare function createFieldLabel(fieldName: string): string;
export declare function onChange({ e, fieldValidation, setFieldErrors, fieldErrors, }: {
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>;
    setFieldErrors: any;
    fieldErrors: string[];
    fieldValidation: {
        patterns: string[];
        messages: string[];
    };
}): void;
export declare function useFormField({ fieldBlueprint, fieldContext, remixBrowserUtils, }: {
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
}): {
    fieldErrors: any;
    fieldVisited: any;
    setFieldErrors: any;
    setFieldVisited: any;
    defaultValue: string;
};
//# sourceMappingURL=logic.d.ts.map