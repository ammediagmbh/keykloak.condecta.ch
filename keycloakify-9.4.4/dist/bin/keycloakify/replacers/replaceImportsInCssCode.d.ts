export type BuildOptionsLike = {
    urlPathname: string | undefined;
};
export declare function replaceImportsInCssCode(params: {
    cssCode: string;
}): {
    fixedCssCode: string;
    cssGlobalsToDefine: Record<string, string>;
};
export declare function generateCssCodeToDefineGlobals(params: {
    cssGlobalsToDefine: Record<string, string>;
    buildOptions: BuildOptionsLike;
}): {
    cssCodeToPrependInHead: string;
};
