export type BuildOptionsLike = {
    bundler: "vite" | "webpack";
    extraThemeProperties: string[] | undefined;
    themeVersion: string;
    loginThemeResourcesFromKeycloakVersion: string;
    keycloakifyBuildDirPath: string;
    reactAppBuildDirPath: string;
    cacheDirPath: string;
    assetsDirPath: string;
    urlPathname: string | undefined;
    doBuildRetrocompatAccountTheme: boolean;
    themeNames: string[];
    npmWorkspaceRootDirPath: string;
};
export declare function generateTheme(params: {
    themeName: string;
    themeSrcDirPath: string;
    keycloakifySrcDirPath: string;
    buildOptions: BuildOptionsLike;
    keycloakifyVersion: string;
}): Promise<void>;
