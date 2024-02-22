/// <reference types="react" />
import "minimal-polyfills/Object.fromEntries";
import fallbackMessages from "./baseMessages/en";
export declare const fallbackLanguageTag = "en";
export type KcContextLike = {
    locale?: {
        currentLanguageTag: string;
        supported: {
            languageTag: string;
            url: string;
            label: string;
        }[];
    };
};
export type MessageKey = keyof typeof fallbackMessages | keyof (typeof keycloakifyExtraMessages)[typeof fallbackLanguageTag];
export type GenericI18n<MessageKey extends string> = {
    /**
     * e.g: "en", "fr", "zh-CN"
     *
     * The current language
     */
    currentLanguageTag: string;
    /**
     * To call when the user switch language.
     * This will cause the page to be reloaded,
     * on next load currentLanguageTag === newLanguageTag
     */
    changeLocale: (newLanguageTag: string) => never;
    /**
     * e.g. "en" => "English", "fr" => "Français", ...
     *
     * Used to render a select that enable user to switch language.
     * ex: https://user-images.githubusercontent.com/6702424/186044799-38801eec-4e89-483b-81dd-8e9233e8c0eb.png
     * */
    labelBySupportedLanguageTag: Record<string, string>;
    /**
     * Examples assuming currentLanguageTag === "en"
     *
     * msg("access-denied") === <span>Access denied</span>
     * msg("impersonateTitleHtml", "Foo") === <span><strong>Foo</strong> Impersonate User</span>
     */
    msg: (key: MessageKey, ...args: (string | undefined)[]) => JSX.Element;
    /**
     * It's the same thing as msg() but instead of returning a JSX.Element it returns a string.
     * It can be more convenient to manipulate strings but if there are HTML tags it wont render.
     * msgStr("impersonateTitleHtml", "Foo") === "<strong>Foo</strong> Impersonate User"
     */
    msgStr: (key: MessageKey, ...args: (string | undefined)[]) => string;
    /**
     * Examples assuming currentLanguageTag === "en"
     * advancedMsg("${access-denied} foo bar") === <span>${msgStr("access-denied")} foo bar<span> === <span>Access denied foo bar</span>
     * advancedMsg("${access-denied}") === advancedMsg("access-denied") === msg("access-denied") === <span>Access denied</span>
     * advancedMsg("${not-a-message-key}") === advancedMsg(not-a-message-key") === <span>not-a-message-key</span>
     */
    advancedMsg: (key: string, ...args: (string | undefined)[]) => JSX.Element;
    /**
     * Examples assuming currentLanguageTag === "en"
     * advancedMsg("${access-denied} foo bar") === msg("access-denied") + " foo bar" === "Access denied foo bar"
     * advancedMsg("${not-a-message-key}") === advancedMsg(not-a-message-key") === "not-a-message-key"
     */
    advancedMsgStr: (key: string, ...args: (string | undefined)[]) => string;
};
export type I18n = GenericI18n<MessageKey>;
export declare function createUseI18n<ExtraMessageKey extends string = never>(extraMessages: {
    [languageTag: string]: {
        [key in ExtraMessageKey]: string;
    };
}): {
    useI18n: (params: {
        kcContext: KcContextLike;
    }) => GenericI18n<MessageKey | ExtraMessageKey> | null;
};
declare const keycloakifyExtraMessages: {
    en: {
        shouldBeEqual: string;
        shouldBeDifferent: string;
        shouldMatchPattern: string;
        mustBeAnInteger: string;
        notAValidOption: string;
        newPasswordSameAsOld: string;
        passwordConfirmNotMatch: string;
    };
    fr: {
        shouldBeEqual: string;
        shouldBeDifferent: string;
        shouldMatchPattern: string;
        mustBeAnInteger: string;
        notAValidOption: string;
        logoutConfirmTitle: string;
        logoutConfirmHeader: string;
        doLogout: string;
        newPasswordSameAsOld: string;
        passwordConfirmNotMatch: string;
    };
};
export {};
