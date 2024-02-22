import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { clsx } from "../../tools/clsx";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function LoginOtp(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { otpLogin, url } = kcContext;
    const { msg, msgStr } = i18n;
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
                input[type="radio"]:checked~label.kcSelectOTPListClass{
                    border: 2px solid #39a5dc;
                }` }), _jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("doLogIn") }, { children: _jsxs("form", Object.assign({ id: "kc-otp-login-form", className: getClassName("kcFormClass"), action: url.loginAction, method: "post" }, { children: [otpLogin.userOtpCredentials.length > 1 && (_jsx("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: _jsx("div", Object.assign({ className: getClassName("kcInputWrapperClass") }, { children: otpLogin.userOtpCredentials.map((otpCredential, index) => (_jsxs("div", { children: [_jsx("input", { id: `kc-otp-credential-${index}`, name: "selectedCredentialId", type: "radio", value: otpCredential.id, style: { display: "none" } }), _jsx("label", Object.assign({ htmlFor: `kc-otp-credential-${index}`, className: getClassName("kcSelectOTPListClass") }, { children: _jsxs("div", Object.assign({ className: getClassName("kcSelectOTPListItemClass") }, { children: [_jsx("span", { className: getClassName("kcAuthenticatorOtpCircleClass") }), _jsx("h2", Object.assign({ className: getClassName("kcSelectOTPItemHeadingClass") }, { children: otpCredential.userLabel }))] })) }), otpCredential.id)] }, otpCredential.id))) })) }))), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: getClassName("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "otp", className: getClassName("kcLabelClass") }, { children: msg("loginOtpOneTime") })) })), _jsx("div", Object.assign({ className: getClassName("kcInputWrapperClass") }, { children: _jsx("input", { id: "otp", name: "otp", autoComplete: "off", type: "text", className: getClassName("kcInputClass"), autoFocus: true }) }))] })), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: getClassName("kcFormOptionsClass") }, { children: _jsx("div", { className: getClassName("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormButtonsClass") }, { children: _jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), name: "login", id: "kc-login", type: "submit", value: msgStr("doLogIn") }) }))] }))] })) }))] }));
}
//# sourceMappingURL=LoginOtp.js.map