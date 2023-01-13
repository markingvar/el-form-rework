export declare const validationPatterns: {
    phoneNumber: string;
    email: string;
    postalCode: string;
    password: string;
};
export declare const validation: {
    phone: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
    email: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
    postalCode: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
    password: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
    sentences: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
    lettersOnly: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
    lettersAndSpaces: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
    numbersOnly: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
    numbersAndSpaces: {
        browserPattern: string;
        browserMessage: string;
        patterns: string[];
        messages: string[];
    };
};
export declare type StringValidatorArgs = {
    min?: number;
    max?: number;
    validationType: "sentences" | "lettersOnly" | "lettersAndSpaces" | "numbersOnly" | "numbersAndSpaces" | "phone" | "email" | "postalCode" | "password";
    customValidation?: {
        pattern: string;
        message: string;
    };
};
declare type StringValidatorObj = {
    browserPattern?: string;
    browserMessage?: string;
    patterns: string[];
    messages: string[];
};
export declare function stringValidator({ min, max, validationType, customValidation, }: StringValidatorArgs): StringValidatorObj;
export {};
//# sourceMappingURL=validation.d.ts.map