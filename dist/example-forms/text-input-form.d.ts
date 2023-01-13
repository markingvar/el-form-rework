export declare const textInputFormBlueprint: {
    fields: ({
        type: string;
        name: string;
        label: string;
        required: boolean;
        initialValue: string;
        validation: {
            browserPattern?: string;
            browserMessage?: string;
            patterns: string[];
            messages: string[];
        };
        description?: undefined;
    } | {
        type: string;
        name: string;
        label: string;
        required: boolean;
        description: string;
        initialValue: string;
        validation: {
            browserPattern?: string;
            browserMessage?: string;
            patterns: string[];
            messages: string[];
        };
    })[];
}[];
//# sourceMappingURL=text-input-form.d.ts.map