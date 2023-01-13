export declare const statefulRadioBlueprint: {
    fields: {
        name: string;
        label: string;
        type: string;
        options: string[];
        initialValue: string;
        dependentChildren: {
            name: string;
            label: string;
            type: string;
            required: boolean;
            initialValue: string;
            validation: {
                browserPattern?: string;
                browserMessage?: string;
                patterns: string[];
                messages: string[];
            };
        }[][];
    }[];
}[];
//# sourceMappingURL=stateful-radio-form.d.ts.map