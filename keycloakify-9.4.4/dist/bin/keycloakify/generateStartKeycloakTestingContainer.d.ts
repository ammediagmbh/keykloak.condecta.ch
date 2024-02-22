export type BuildOptionsLike = {
    keycloakifyBuildDirPath: string;
};
/** Files for being able to run a hot reload keycloak container */
export declare function generateStartKeycloakTestingContainer(params: {
    jarFilePath: string;
    keycloakVersion: string;
    buildOptions: BuildOptionsLike;
}): void;
export declare namespace generateStartKeycloakTestingContainer {
    var basename: string;
}
