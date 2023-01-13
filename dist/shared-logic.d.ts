import type { FormBlueprint } from "./types";
export declare function getFormStage({ context, formBlueprint, }: {
    context: any;
    formBlueprint: FormBlueprint;
}): "beginning" | "middle" | "end";
export declare function toBinary(string: string): string;
export declare function fromBinary(binary: string): string;
export declare function convertSingleQuotes(string: string): string;
//# sourceMappingURL=shared-logic.d.ts.map