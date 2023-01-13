export declare const multiItemStepForm: ({
    fields: ({
        name: string;
        label: string;
        type: string;
        required: boolean;
        initialValue: string;
        validation: {
            patterns: string[];
            messages: string[];
        };
        options?: undefined;
        dependentChildren?: undefined;
    } | {
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
                patterns: string[];
                messages: string[];
            };
        }[][];
        required?: undefined;
        validation?: undefined;
    } | {
        name: string;
        type: string;
        initialValue: string;
        label?: undefined;
        required?: undefined;
        validation?: undefined;
        options?: undefined;
        dependentChildren?: undefined;
    })[];
    nextButtonText: string;
} | {
    fields: ({
        type: string;
        name: string;
        label: string;
        options: string[];
        initialValue: string;
        addItemLabel?: undefined;
        editItemLabel?: undefined;
        addOrEditItemModalLabel?: undefined;
        listItemStructure?: undefined;
    } | {
        name: string;
        type: string;
        label: string;
        addItemLabel: string;
        editItemLabel: string;
        addOrEditItemModalLabel: string;
        initialValue: any[];
        listItemStructure: ({
            name: string;
            label: string;
            type: string;
            required: boolean;
            initialValue: string;
            validation: {
                patterns: string[];
                messages: string[];
            };
            showOnMobileTable: boolean;
            tableFlex: number;
            alignText: string;
            description?: undefined;
            options?: undefined;
        } | {
            name: string;
            label: string;
            description: string;
            type: string;
            required: boolean;
            initialValue: string;
            validation: {
                patterns: string[];
                messages: string[];
            };
            showOnMobileTable: boolean;
            tableFlex: number;
            alignText: string;
            options?: undefined;
        } | {
            name: string;
            label: string;
            type: string;
            options: string[];
            initialValue: string;
            required?: undefined;
            validation?: undefined;
            showOnMobileTable?: undefined;
            tableFlex?: undefined;
            alignText?: undefined;
            description?: undefined;
        })[];
        options?: undefined;
    })[];
    backButtonText: string;
    nextButtonText: string;
} | {
    fields: {
        name: string;
        label: string;
        type: string;
        required: boolean;
        initialValue: string;
        validation: {
            patterns: string[];
            messages: string[];
        };
    }[];
    backButtonText: string;
    nextButtonText: string;
})[];
//# sourceMappingURL=multi-step-form.d.ts.map