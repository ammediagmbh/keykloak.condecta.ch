import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { clsx } from "../../tools/clsx";
import { UserProfileFormFields } from "../../login/pages/shared/UserProfileFormFields";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function UpdateUserProfile(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    const { url, isAppInitiatedAction } = kcContext;
    const [isFomSubmittable, setIsFomSubmittable] = useState(false);
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("loginProfileTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-update-profile-form", className: getClassName("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsx(UserProfileFormFields, { kcContext: kcContext, onIsFormSubmittableValueChange: setIsFomSubmittable, i18n: i18n, getClassName: getClassName }), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: getClassName("kcFormOptionsClass") }, { children: _jsx("div", { className: getClassName("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormButtonsClass") }, { children: isAppInitiatedAction ? (_jsxs(_Fragment, { children: [_jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonLargeClass")), type: "submit", value: msgStr("doSubmit") }), _jsx("button", Object.assign({ className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonDefaultClass"), getClassName("kcButtonLargeClass")), type: "submit", name: "cancel-aia", value: "true", formNoValidate: true }, { children: msg("doCancel") }))] })) : (_jsx("input", { className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), type: "submit", defaultValue: msgStr("doSubmit"), disabled: !isFomSubmittable })) }))] }))] })) })));
}
//# sourceMappingURL=UpdateUserProfile.js.map