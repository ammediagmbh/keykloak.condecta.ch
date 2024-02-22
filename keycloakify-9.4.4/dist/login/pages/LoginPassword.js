import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { clsx } from "../../tools/clsx";
import { useConstCallback } from "../../tools/useConstCallback";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function LoginPassword(props) {
    var _a;
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { realm, url, login } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const onSubmit = useConstCallback(e => {
        e.preventDefault();
        setIsLoginButtonDisabled(true);
        const formElement = e.target;
        formElement.submit();
    });
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("doLogIn") }, { children: _jsx("div", Object.assign({ id: "kc-form" }, { children: _jsx("div", Object.assign({ id: "kc-form-wrapper" }, { children: _jsxs("form", Object.assign({ id: "kc-form-login", onSubmit: onSubmit, action: url.loginAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("hr", {}), _jsx("label", Object.assign({ htmlFor: "password", className: getClassName("kcLabelClass") }, { children: msg("password") })), _jsx("input", { tabIndex: 2, id: "password", className: getClassName("kcInputClass"), name: "password", type: "password", autoFocus: true, autoComplete: "on", defaultValue: (_a = login.password) !== null && _a !== void 0 ? _a : "" })] })), _jsxs("div", Object.assign({ className: clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass")) }, { children: [_jsx("div", { id: "kc-form-options" }), _jsx("div", Object.assign({ className: getClassName("kcFormOptionsWrapperClass") }, { children: realm.resetPasswordAllowed && (_jsx("span", { children: _jsx("a", Object.assign({ tabIndex: 5, href: url.loginResetCredentialsUrl }, { children: msg("doForgotPassword") })) })) }))] })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormGroupClass") }, { children: _jsx("input", { tabIndex: 4, className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), name: "login", id: "kc-login", type: "submit", value: msgStr("doLogIn"), disabled: isLoginButtonDisabled }) }))] })) })) })) })));
}
//# sourceMappingURL=LoginPassword.js.map