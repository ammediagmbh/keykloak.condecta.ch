export type ParsedPackageJson = {
    name: string;
    version?: string;
    homepage?: string;
    keycloakify?: {
        extraThemeProperties?: string[];
        artifactId?: string;
        groupId?: string;
        doCreateJar?: boolean;
        loginThemeResourcesFromKeycloakVersion?: string;
        reactAppBuildDirPath?: string;
        keycloakifyBuildDirPath?: string;
        themeName?: string | string[];
        doBuildRetrocompatAccountTheme?: boolean;
    };
};
export declare function readParsedPackageJson(params: {
    reactAppRootDirPath: string;
}): ParsedPackageJson;
