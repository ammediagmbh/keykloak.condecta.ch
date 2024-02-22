import { useEffect } from "react";
import { memoize } from "../../tools/memoize";
import { fallbackLanguageTag } from "../../login/i18n/i18n";
import { useConst } from "../../tools/useConst";
import { useConstCallback } from "../../tools/useConstCallback";
import { assert } from "tsafe/assert";
import { Evt } from "evt";
export const evtTermMarkdown = Evt.create(undefined);
assert();
/** Allow to avoid bundling the terms and download it on demand*/
export function useDownloadTerms(params) {
    const { kcContext } = params;
    const { downloadTermMarkdownMemoized } = (function useClosure() {
        const { downloadTermMarkdown } = params;
        const downloadTermMarkdownConst = useConstCallback(downloadTermMarkdown);
        const downloadTermMarkdownMemoized = useConst(() => memoize((currentLanguageTag) => downloadTermMarkdownConst({ currentLanguageTag })));
        return { downloadTermMarkdownMemoized };
    })();
    useEffect(() => {
        var _a, _b;
        if (kcContext.pageId !== "terms.ftl") {
            return;
        }
        downloadTermMarkdownMemoized((_b = (_a = kcContext.locale) === null || _a === void 0 ? void 0 : _a.currentLanguageTag) !== null && _b !== void 0 ? _b : fallbackLanguageTag).then(thermMarkdown => (evtTermMarkdown.state = thermMarkdown));
    }, []);
}
//# sourceMappingURL=useDownloadTerms.js.map