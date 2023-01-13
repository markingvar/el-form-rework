export declare const multiItemFormBlueprint: {
    fields: {
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
    }[];
}[];
//# sourceMappingURL=multi-item-list-form.d.ts.map