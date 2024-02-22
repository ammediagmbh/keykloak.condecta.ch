import type { ThemeType } from "../../constants";
/** Assumes the theme type exists */
export declare function readFieldNameUsage(params: {
    keycloakifySrcDirPath: string;
    themeSrcDirPath: string;
    themeType: ThemeType;
}): string[];
