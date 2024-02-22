import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { clsx } from "../../tools/clsx";
import { UserProfileFormFields } from "./shared/UserProfileFormFields";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function RegisterUserProfile(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey, realm } = kcContext;
    realm.registrationEmailAsUsername;
    const { msg, msgStr } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { displayMessage: messagesPerField.exists("global"), displayRequiredFields: true, headerNode: msg("registerTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-register-form", className: getClassName("kcFormClass"), action: url.registrationAction, method: "post" }, { children: [_jsx(UserProfileFormFields, { kcContext: kcContext, onIsFormSubmittableValueChange: setIsFormSubmittable, i18n: i18n, getClassName: getClassName }), recaptchaRequired && (_jsx("div", Object.assign({ className: "form-group" }, { children: _jsx("div", Object.assign({ className: getClassName("kcInputWrapperClass") }, { children: _jsx("div", { className: "g-recaptcha", "data-size": "compact", "data-sitekey": recaptchaSiteKey }) })) }))), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass"), style: { "marginBottom": 30 } }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: getClassName("kcFormOptionsClass") }, { children: _jsx("div", Object.assign({ className: getClassName("kcFormOptionsWrapperClass") }, { children: _jsx("span", { children: _jsx("a", Object.assign({ href: url.loginUrl }, { children: msg("backToLogin") })) }) })) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormButtonsClass") }, { children: _jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), type: "submit", value: msgStr("doRegister"), disabled: !isFormSubmittable }) }))] }))] })) })));
}
//# sourceMappingURL=RegisterUserProfile.js.map