import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from "../../tools/clsx";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function LoginOauthGrant(props) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url, oauth, client } = kcContext;
    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("oauthGrantTitle", client.name ? advancedMsgStr(client.name) : client.clientId) }, { children: _jsxs("div", Object.assign({ id: "kc-oauth", className: "content-area" }, { children: [_jsx("h3", { children: msg("oauthGrantRequest") }), _jsx("ul", { children: oauth.clientScopesRequested.map(clientScope => (_jsx("li", { children: _jsx("span", { children: advancedMsg(clientScope.consentScreenText) }) }, clientScope.consentScreenText))) }), _jsxs("form", Object.assign({ className: "form-actions", action: url.oauthAction, method: "POST" }, { children: [_jsx("input", { type: "hidden", name: "code", value: oauth.code }), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options" }, { children: _jsx("div", { className: getClassName("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons" }, { children: _jsxs("div", Object.assign({ className: getClassName("kcFormButtonsWrapperClass") }, { children: [_jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonLargeClass")), name: "accept", id: "kc-login", type: "submit", value: msgStr("doYes") }), _jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonDefaultClass"), getClassName("kcButtonLargeClass")), name: "cancel", id: "kc-cancel", type: "submit", value: msgStr("doNo") })] })) }))] }))] })), _jsx("div", { className: "clearfix" })] })) })));
}
//# sourceMappingURL=LoginOauthGrant.js.map