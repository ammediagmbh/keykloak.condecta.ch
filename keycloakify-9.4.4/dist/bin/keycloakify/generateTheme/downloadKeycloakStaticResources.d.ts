import { type ThemeType } from "../../constants";
export type BuildOptionsLike = {
    cacheDirPath: string;
    npmWorkspaceRootDirPath: string;
};
export declare function downloadKeycloakStaticResources(params: {
    themeType: ThemeType;
    themeDirPath: string;
    keycloakVersion: string;
    buildOptions: BuildOptionsLike;
}): Promise<void>;
