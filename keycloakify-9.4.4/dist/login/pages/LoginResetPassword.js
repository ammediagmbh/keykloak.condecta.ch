import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from "../../tools/clsx";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function LoginResetPassword(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { url, realm, auth } = kcContext;
    const { msg, msgStr } = i18n;
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { displayMessage: false, headerNode: msg("emailForgotTitle"), infoNode: msg("emailInstruction") }, { children: _jsxs("form", Object.assign({ id: "kc-reset-password-form", className: getClassName("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: getClassName("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "username", className: getClassName("kcLabelClass") }, { children: !realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                        ? msg("usernameOrEmail")
                                        : msg("email") })) })), _jsx("div", Object.assign({ className: getClassName("kcInputWrapperClass") }, { children: _jsx("input", { type: "text", id: "username", name: "username", className: getClassName("kcInputClass"), autoFocus: true, defaultValue: auth !== undefined && auth.showUsername ? auth.attemptedUsername : undefined }) }))] })), _jsxs("div", Object.assign({ className: clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass")) }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: getClassName("kcFormOptionsClass") }, { children: _jsx("div", Object.assign({ className: getClassName("kcFormOptionsWrapperClass") }, { children: _jsx("span", { children: _jsx("a", Object.assign({ href: url.loginUrl }, { children: msg("backToLogin") })) }) })) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormButtonsClass") }, { children: _jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), type: "submit", value: msgStr("doSubmit") }) }))] }))] })) })));
}
//# sourceMappingURL=LoginResetPassword.js.map