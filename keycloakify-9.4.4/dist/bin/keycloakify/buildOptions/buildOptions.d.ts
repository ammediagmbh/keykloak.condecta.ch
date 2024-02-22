/** Consolidated build option gathered form CLI arguments and config in package.json */
export type BuildOptions = {
    bundler: "vite" | "webpack";
    isSilent: boolean;
    themeVersion: string;
    themeNames: string[];
    extraThemeProperties: string[] | undefined;
    groupId: string;
    artifactId: string;
    doCreateJar: boolean;
    loginThemeResourcesFromKeycloakVersion: string;
    reactAppRootDirPath: string;
    reactAppBuildDirPath: string;
    /** Directory that keycloakify outputs to. Defaults to {cwd}/build_keycloak */
    keycloakifyBuildDirPath: string;
    publicDirPath: string;
    cacheDirPath: string;
    /** If your app is hosted under a subpath, it's the case in CRA if you have "homepage": "https://example.com/my-app" in your package.json
     * In this case the urlPathname will be "/my-app/" */
    urlPathname: string | undefined;
    assetsDirPath: string;
    doBuildRetrocompatAccountTheme: boolean;
    npmWorkspaceRootDirPath: string;
};
export declare function readBuildOptions(params: {
    processArgv: string[];
}): BuildOptions;
