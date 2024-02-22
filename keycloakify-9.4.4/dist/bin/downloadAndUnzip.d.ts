export type BuildOptionsLike = {
    cacheDirPath: string;
    npmWorkspaceRootDirPath: string;
};
export declare function downloadAndUnzip(params: {
    url: string;
    destDirPath: string;
    specificDirsToExtract?: string[];
    preCacheTransform?: {
        actionCacheId: string;
        action: (params: {
            destDirPath: string;
        }) => Promise<void>;
    };
    buildOptions: BuildOptionsLike;
}): Promise<void>;
