import type { ThemeType } from "../../constants";
export declare function generateMessageProperties(params: {
    themeSrcDirPath: string;
    themeType: ThemeType;
}): {
    languageTag: string;
    propertiesFileSource: string;
}[];
