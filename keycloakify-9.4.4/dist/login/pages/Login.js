import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { clsx } from "../../tools/clsx";
import { useConstCallback } from "../../tools/useConstCallback";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function Login(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { social, realm, url, usernameHidden, login, auth, registrationDisabled } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const onSubmit = useConstCallback(e => {
        var _a;
        e.preventDefault();
        setIsLoginButtonDisabled(true);
        const formElement = e.target;
        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        (_a = formElement.querySelector("input[name='email']")) === null || _a === void 0 ? void 0 : _a.setAttribute("name", "username");
        formElement.submit();
    });
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { displayInfo: realm.password && realm.registrationAllowed && !registrationDisabled, displayWide: realm.password && social.providers !== undefined, headerNode: msg("doLogIn"), infoNode: _jsx("div", Object.assign({ id: "kc-registration" }, { children: _jsxs("span", { children: [msg("noAccount"), _jsx("a", Object.assign({ tabIndex: 6, href: url.registrationUrl }, { children: msg("doRegister") }))] }) })) }, { children: _jsxs("div", Object.assign({ id: "kc-form", className: clsx(realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass")) }, { children: [_jsx("div", Object.assign({ id: "kc-form-wrapper", className: clsx(realm.password &&
                        social.providers && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]) }, { children: realm.password && (_jsxs("form", Object.assign({ id: "kc-form-login", onSubmit: onSubmit, action: url.loginAction, method: "post" }, { children: [_jsx("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: !usernameHidden &&
                                    (() => {
                                        var _a;
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";
                                        const autoCompleteHelper = label === "usernameOrEmail" ? "username" : label;
                                        return (_jsxs(_Fragment, { children: [_jsx("label", Object.assign({ htmlFor: autoCompleteHelper, className: getClassName("kcLabelClass") }, { children: msg(label) })), _jsx("input", { tabIndex: 1, id: autoCompleteHelper, className: getClassName("kcInputClass"), 
                                                    //NOTE: This is used by Google Chrome auto fill so we use it to tell
                                                    //the browser how to pre fill the form but before submit we put it back
                                                    //to username because it is what keycloak expects.
                                                    name: autoCompleteHelper, defaultValue: (_a = login.username) !== null && _a !== void 0 ? _a : "", type: "text", autoFocus: true, autoComplete: "off" })] }));
                                    })() })), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("label", Object.assign({ htmlFor: "password", className: getClassName("kcLabelClass") }, { children: msg("password") })), _jsx("input", { tabIndex: 2, id: "password", className: getClassName("kcInputClass"), name: "password", type: "password", autoComplete: "off" })] })), _jsxs("div", Object.assign({ className: clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass")) }, { children: [_jsx("div", Object.assign({ id: "kc-form-options" }, { children: realm.rememberMe && !usernameHidden && (_jsx("div", Object.assign({ className: "checkbox" }, { children: _jsxs("label", { children: [_jsx("input", Object.assign({ tabIndex: 3, id: "rememberMe", name: "rememberMe", type: "checkbox" }, (login.rememberMe === "on"
                                                        ? {
                                                            "checked": true
                                                        }
                                                        : {}))), msg("rememberMe")] }) }))) })), _jsx("div", Object.assign({ className: getClassName("kcFormOptionsWrapperClass") }, { children: realm.resetPasswordAllowed && (_jsx("span", { children: _jsx("a", Object.assign({ tabIndex: 5, href: url.loginResetCredentialsUrl }, { children: msg("doForgotPassword") })) })) }))] })), _jsxs("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormGroupClass") }, { children: [_jsx("input", Object.assign({ type: "hidden", id: "id-hidden-input", name: "credentialId" }, ((auth === null || auth === void 0 ? void 0 : auth.selectedCredential) !== undefined
                                        ? {
                                            "value": auth.selectedCredential
                                        }
                                        : {}))), _jsx("input", { tabIndex: 4, className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), name: "login", id: "kc-login", type: "submit", value: msgStr("doLogIn"), disabled: isLoginButtonDisabled })] }))] }))) })), realm.password && social.providers !== undefined && (_jsx("div", Object.assign({ id: "kc-social-providers", className: clsx(getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")) }, { children: _jsx("ul", Object.assign({ className: clsx(getClassName("kcFormSocialAccountListClass"), social.providers.length > 4 && getClassName("kcFormSocialAccountDoubleListClass")) }, { children: social.providers.map(p => (_jsx("li", Object.assign({ className: getClassName("kcFormSocialAccountListLinkClass") }, { children: _jsx("a", Object.assign({ href: p.loginUrl, id: `zocial-${p.alias}`, className: clsx("zocial", p.providerId) }, { children: _jsx("span", { children: p.displayName }) })) }), p.providerId))) })) })))] })) })));
}
//# sourceMappingURL=Login.js.map