type BuildOptionsLike = {
    keycloakifyBuildDirPath: string;
    cacheDirPath: string;
    npmWorkspaceRootDirPath: string;
};
export declare function bringInAccountV1(params: {
    buildOptions: BuildOptionsLike;
}): Promise<void>;
export {};
