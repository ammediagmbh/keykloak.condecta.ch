import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { assert } from "../../tools/assert";
export default function Info(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msgStr, msg } = i18n;
    assert(kcContext.message !== undefined, "No message in kcContext.message, there will always be a message in production context, add it in your mock");
    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { displayMessage: false, headerNode: messageHeader !== undefined ? _jsx(_Fragment, { children: messageHeader }) : _jsx(_Fragment, { children: message.summary }) }, { children: _jsxs("div", Object.assign({ id: "kc-info-message" }, { children: [_jsxs("p", Object.assign({ className: "instruction" }, { children: [message.summary, requiredActions !== undefined && (_jsx("b", { children: requiredActions.map(requiredAction => msgStr(`requiredAction.${requiredAction}`)).join(",") }))] })), !skipLink && pageRedirectUri !== undefined ? (_jsx("p", { children: _jsx("a", Object.assign({ href: pageRedirectUri }, { children: msg("backToApplication") })) })) : actionUri !== undefined ? (_jsx("p", { children: _jsx("a", Object.assign({ href: actionUri }, { children: msg("proceedWithAction") })) })) : (client.baseUrl !== undefined && (_jsx("p", { children: _jsx("a", Object.assign({ href: client.baseUrl }, { children: msg("backToApplication") })) })))] })) })));
}
//# sourceMappingURL=Info.js.map