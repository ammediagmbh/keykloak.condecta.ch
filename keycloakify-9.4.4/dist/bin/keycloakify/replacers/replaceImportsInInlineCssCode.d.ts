export type BuildOptionsLike = {
    urlPathname: string | undefined;
};
export declare function replaceImportsInInlineCssCode(params: {
    cssCode: string;
    buildOptions: BuildOptionsLike;
}): {
    fixedCssCode: string;
};
