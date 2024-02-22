import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from "../../tools/clsx";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function LogoutConfirm(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { url, client, logoutConfirm } = kcContext;
    const { msg, msgStr } = i18n;
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { displayMessage: false, headerNode: msg("logoutConfirmTitle") }, { children: _jsxs("div", Object.assign({ id: "kc-logout-confirm", className: "content-area" }, { children: [_jsx("p", Object.assign({ className: "instruction" }, { children: msg("logoutConfirmHeader") })), _jsxs("form", Object.assign({ className: "form-actions", action: url.logoutConfirmAction, method: "POST" }, { children: [_jsx("input", { type: "hidden", name: "session_code", value: logoutConfirm.code }), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options" }, { children: _jsx("div", { className: getClassName("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormGroupClass") }, { children: _jsx("input", { tabIndex: 4, className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), name: "confirmLogout", id: "kc-logout", type: "submit", value: msgStr("doLogout") }) }))] }))] })), _jsx("div", Object.assign({ id: "kc-info-message" }, { children: !logoutConfirm.skipLink && client.baseUrl && (_jsx("p", { children: _jsx("a", { href: client.baseUrl, dangerouslySetInnerHTML: { __html: msgStr("backToApplication") } }) })) }))] })) })));
}
//# sourceMappingURL=LogoutConfirm.js.map