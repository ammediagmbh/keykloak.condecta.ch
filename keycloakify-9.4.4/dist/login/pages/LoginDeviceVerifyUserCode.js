import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from "../../tools/clsx";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function LoginOauthGrant(props) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url } = kcContext;
    const { msg, msgStr } = i18n;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("oauth2DeviceVerificationTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-user-verify-device-user-code-form", className: getClassName("kcFormClass"), action: url.oauth2DeviceVerificationAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: getClassName("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "device-user-code", className: getClassName("kcLabelClass") }, { children: msg("verifyOAuth2DeviceUserCode") })) })), _jsx("div", Object.assign({ className: getClassName("kcInputWrapperClass") }, { children: _jsx("input", { id: "device-user-code", name: "device_user_code", autoComplete: "off", type: "text", className: getClassName("kcInputClass"), autoFocus: true }) }))] })), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: getClassName("kcFormOptionsClass") }, { children: _jsx("div", { className: getClassName("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormButtonsClass") }, { children: _jsx("div", Object.assign({ className: getClassName("kcFormButtonsWrapperClass") }, { children: _jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonLargeClass")), type: "submit", value: msgStr("doSubmit") }) })) }))] }))] })) })));
}
//# sourceMappingURL=LoginDeviceVerifyUserCode.js.map