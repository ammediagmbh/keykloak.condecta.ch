import { type ThemeType } from "../../constants";
export type BuildOptionsLike = {
    bundler: "vite" | "webpack";
    themeVersion: string;
    urlPathname: string | undefined;
    reactAppBuildDirPath: string;
    assetsDirPath: string;
};
export declare function generateFtlFilesCodeFactory(params: {
    themeName: string;
    indexHtmlCode: string;
    cssGlobalsToDefine: Record<string, string>;
    buildOptions: BuildOptionsLike;
    keycloakifyVersion: string;
    themeType: ThemeType;
    fieldNames: string[];
}): {
    generateFtlFilesCode: (params: {
        pageId: string;
    }) => {
        ftlCode: string;
    };
};
