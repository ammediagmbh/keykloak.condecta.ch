export type BuildOptionsLike = {
    reactAppBuildDirPath: string;
    assetsDirPath: string;
    urlPathname: string | undefined;
    bundler: "vite" | "webpack";
};
export declare function replaceImportsInJsCode(params: {
    jsCode: string;
    buildOptions: BuildOptionsLike;
}): {
    fixedJsCode: string;
};
