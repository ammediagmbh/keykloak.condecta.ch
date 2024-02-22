import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from "../../tools/clsx";
import { useRerenderOnStateChange } from "evt/hooks";
import { Markdown } from "../../tools/Markdown";
import { useGetClassName } from "../../login/lib/useGetClassName";
import { evtTermMarkdown } from "../../login/lib/useDownloadTerms";
export default function Terms(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    useRerenderOnStateChange(evtTermMarkdown);
    const { url } = kcContext;
    const termMarkdown = evtTermMarkdown.state;
    if (termMarkdown === undefined) {
        return null;
    }
    return (_jsxs(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { displayMessage: false, headerNode: msg("termsTitle") }, { children: [_jsx("div", Object.assign({ id: "kc-terms-text" }, { children: _jsx(Markdown, { children: termMarkdown }) })), _jsxs("form", Object.assign({ className: "form-actions", action: url.loginAction, method: "POST" }, { children: [_jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonClass"), getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonLargeClass")), name: "accept", id: "kc-accept", type: "submit", value: msgStr("doAccept") }), _jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonDefaultClass"), getClassName("kcButtonLargeClass")), name: "cancel", id: "kc-decline", type: "submit", value: msgStr("doDecline") })] })), _jsx("div", { className: "clearfix" })] })));
}
//# sourceMappingURL=Terms.js.map