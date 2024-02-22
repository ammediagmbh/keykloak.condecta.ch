export type BuildOptionsLike = {
    reactAppBuildDirPath: string;
    assetsDirPath: string;
    urlPathname: string | undefined;
};
export declare function replaceImportsInJsCode_vite(params: {
    jsCode: string;
    buildOptions: BuildOptionsLike;
    basenameOfAssetsFiles: string[];
    systemType?: "posix" | "win32";
}): {
    fixedJsCode: string;
};
