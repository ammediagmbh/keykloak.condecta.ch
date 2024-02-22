import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { clsx } from "../../tools/clsx";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function UpdateEmail(props) {
    var _a;
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    const { url, messagesPerField, isAppInitiatedAction, email } = kcContext;
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("updateEmailTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-update-email-form", className: getClassName("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: clsx(getClassName("kcFormGroupClass"), messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass"))) }, { children: [_jsx("div", Object.assign({ className: getClassName("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "email", className: getClassName("kcLabelClass") }, { children: msg("email") })) })), _jsx("div", Object.assign({ className: getClassName("kcInputWrapperClass") }, { children: _jsx("input", { type: "text", id: "email", name: "email", defaultValue: (_a = email.value) !== null && _a !== void 0 ? _a : "", className: getClassName("kcInputClass"), "aria-invalid": messagesPerField.existsError("email") }) }))] })), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: getClassName("kcFormOptionsClass") }, { children: _jsx("div", { className: getClassName("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormButtonsClass") }, { children: isAppInitiatedAction ? (_jsxs(_Fragment, { children: [_jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonLargeClass")), type: "submit", defaultValue: msgStr("doSubmit") }), _jsx("button", Object.assign({ className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonDefaultClass"), getClassName("kcButtonLargeClass")), type: "submit", name: "cancel-aia", value: "true" }, { children: msg("doCancel") }))] })) : (_jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), type: "submit", defaultValue: msgStr("doSubmit") })) }))] }))] })) })));
}
//# sourceMappingURL=UpdateEmail.js.map