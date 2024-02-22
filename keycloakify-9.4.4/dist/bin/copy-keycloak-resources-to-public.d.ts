#!/usr/bin/env node
import { type BuildOptionsLike } from "./keycloakify/generateTheme/downloadKeycloakStaticResources";
export declare function copyKeycloakResourcesToPublic(params: {
    processArgv: string[];
}): Promise<void>;
export declare function generateKeycloakifyBuildinfoRaw(params: {
    destDirPath: string;
    keycloakifyVersion: string;
    buildOptions: BuildOptionsLike & {
        loginThemeResourcesFromKeycloakVersion: string;
    };
}): {
    keycloakifyBuildinfoRaw: string;
};
