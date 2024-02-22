#!/usr/bin/env node
export type BuildOptionsLike = {
    cacheDirPath: string;
    npmWorkspaceRootDirPath: string;
};
export declare function downloadBuiltinKeycloakTheme(params: {
    keycloakVersion: string;
    destDirPath: string;
    buildOptions: BuildOptionsLike;
}): Promise<void>;
