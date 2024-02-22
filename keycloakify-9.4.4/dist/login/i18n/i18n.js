import { jsx as _jsx } from "react/jsx-runtime";
import "minimal-polyfills/Object.fromEntries";
//NOTE for later: https://github.com/remarkjs/react-markdown/blob/236182ecf30bd89c1e5a7652acaf8d0bf81e6170/src/renderers.js#L7-L35
import { useEffect, useState, useRef } from "react";
import fallbackMessages from "./baseMessages/en";
import { getMessages } from "./baseMessages";
import { assert } from "tsafe/assert";
import { Markdown } from "../../tools/Markdown";
export const fallbackLanguageTag = "en";
assert();
export function createUseI18n(extraMessages) {
    function useI18n(params) {
        const { kcContext } = params;
        const [i18n, setI18n] = useState(undefined);
        const refHasStartedFetching = useRef(false);
        useEffect(() => {
            if (refHasStartedFetching.current) {
                return;
            }
            refHasStartedFetching.current = true;
            (async () => {
                var _a, _b, _c, _d, _e, _f, _g;
                const { currentLanguageTag = fallbackLanguageTag } = (_a = kcContext.locale) !== null && _a !== void 0 ? _a : {};
                setI18n(Object.assign(Object.assign({}, createI18nTranslationFunctions({
                    "fallbackMessages": Object.assign(Object.assign(Object.assign({}, fallbackMessages), ((_b = keycloakifyExtraMessages[fallbackLanguageTag]) !== null && _b !== void 0 ? _b : {})), ((_c = extraMessages[fallbackLanguageTag]) !== null && _c !== void 0 ? _c : {})),
                    "messages": Object.assign(Object.assign(Object.assign({}, (await getMessages(currentLanguageTag))), ((_d = keycloakifyExtraMessages[currentLanguageTag]) !== null && _d !== void 0 ? _d : {})), ((_e = extraMessages[currentLanguageTag]) !== null && _e !== void 0 ? _e : {}))
                })), { currentLanguageTag, "changeLocale": newLanguageTag => {
                        const { locale } = kcContext;
                        assert(locale !== undefined, "Internationalization not enabled");
                        const targetSupportedLocale = locale.supported.find(({ languageTag }) => languageTag === newLanguageTag);
                        assert(targetSupportedLocale !== undefined, `${newLanguageTag} need to be enabled in Keycloak admin`);
                        window.location.href = targetSupportedLocale.url;
                        assert(false, "never");
                    }, "labelBySupportedLanguageTag": Object.fromEntries(((_g = (_f = kcContext.locale) === null || _f === void 0 ? void 0 : _f.supported) !== null && _g !== void 0 ? _g : []).map(({ languageTag, label }) => [languageTag, label])) }));
            })();
        }, []);
        return i18n !== null && i18n !== void 0 ? i18n : null;
    }
    return { useI18n };
}
function createI18nTranslationFunctions(params) {
    const { fallbackMessages, messages } = params;
    function resolveMsg(props) {
        var _a;
        const { key, args, doRenderMarkdown } = props;
        const messageOrUndefined = (_a = messages[key]) !== null && _a !== void 0 ? _a : fallbackMessages[key];
        if (messageOrUndefined === undefined) {
            return undefined;
        }
        const message = messageOrUndefined;
        const messageWithArgsInjectedIfAny = (() => {
            var _a;
            const startIndex = (_a = message
                .match(/{[0-9]+}/g)) === null || _a === void 0 ? void 0 : _a.map(g => g.match(/{([0-9]+)}/)[1]).map(indexStr => parseInt(indexStr)).sort((a, b) => a - b)[0];
            if (startIndex === undefined) {
                // No {0} in message (no arguments expected)
                return message;
            }
            let messageWithArgsInjected = message;
            args.forEach((arg, i) => {
                if (arg === undefined) {
                    return;
                }
                messageWithArgsInjected = messageWithArgsInjected.replace(new RegExp(`\\{${i + startIndex}\\}`, "g"), arg);
            });
            return messageWithArgsInjected;
        })();
        return doRenderMarkdown ? (_jsx(Markdown, Object.assign({ allowDangerousHtml: true, renderers: { "paragraph": "span" } }, { children: messageWithArgsInjectedIfAny }))) : (messageWithArgsInjectedIfAny);
    }
    function resolveMsgAdvanced(props) {
        const { key, args, doRenderMarkdown } = props;
        const match = key.match(/^\$\{([^{]+)\}$/);
        const keyUnwrappedFromCurlyBraces = match === null ? key : match[1];
        const out = resolveMsg({
            "key": keyUnwrappedFromCurlyBraces,
            args,
            doRenderMarkdown
        });
        return (out !== undefined ? out : doRenderMarkdown ? _jsx("span", { children: keyUnwrappedFromCurlyBraces }) : keyUnwrappedFromCurlyBraces);
    }
    return {
        "msgStr": (key, ...args) => resolveMsg({ key, args, "doRenderMarkdown": false }),
        "msg": (key, ...args) => resolveMsg({ key, args, "doRenderMarkdown": true }),
        "advancedMsg": (key, ...args) => resolveMsgAdvanced({ key, args, "doRenderMarkdown": true }),
        "advancedMsgStr": (key, ...args) => resolveMsgAdvanced({ key, args, "doRenderMarkdown": false })
    };
}
const keycloakifyExtraMessages = {
    "en": {
        "shouldBeEqual": "{0} should be equal to {1}",
        "shouldBeDifferent": "{0} should be different to {1}",
        "shouldMatchPattern": "Pattern should match: `/{0}/`",
        "mustBeAnInteger": "Must be an integer",
        "notAValidOption": "Not a valid option",
        "selectAnOption": "Select an option"
    },
    "fr": {
        /* spell-checker: disable */
        "shouldBeEqual": "{0} doit être égal à {1}",
        "shouldBeDifferent": "{0} doit être différent de {1}",
        "shouldMatchPattern": "Dois respecter le schéma: `/{0}/`",
        "mustBeAnInteger": "Doit être un nombre entier",
        "notAValidOption": "N'est pas une option valide",
        "logoutConfirmTitle": "Déconnexion",
        "logoutConfirmHeader": "Êtes-vous sûr(e) de vouloir vous déconnecter ?",
        "doLogout": "Se déconnecter",
        "selectAnOption": "Sélectionner une option"
        /* spell-checker: enable */
    }
};
//# sourceMappingURL=i18n.js.map