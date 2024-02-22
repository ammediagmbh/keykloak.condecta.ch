export type BuildOptionsLike = {
    reactAppBuildDirPath: string;
    assetsDirPath: string;
    urlPathname: string | undefined;
};
export declare function replaceImportsInJsCode_webpack(params: {
    jsCode: string;
    buildOptions: BuildOptionsLike;
    systemType?: "posix" | "win32";
}): {
    fixedJsCode: string;
};
