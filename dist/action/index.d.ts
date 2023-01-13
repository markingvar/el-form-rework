import type { FormBlueprint } from "../types";
export declare function formActionFunction({ request, formBlueprint, handleDataFn, successRedirectPath, formUtilitiesFromRemixApp, }: {
    request: Request;
    formBlueprint: FormBlueprint;
    handleDataFn: any;
    successRedirectPath: string;
    formUtilitiesFromRemixApp: {
        commitSession: any;
        getSession: any;
        destroySession: any;
        redirect: any;
        json: any;
    };
}): Promise<any>;
//# sourceMappingURL=index.d.ts.map