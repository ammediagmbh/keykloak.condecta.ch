type BuildOptionsLike = {
    groupId: string;
    artifactId: string;
    themeVersion: string;
    keycloakifyBuildDirPath: string;
};
export declare function generatePom(params: {
    buildOptions: BuildOptionsLike;
}): {
    pomFileCode: string;
};
export {};
