import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetClassName } from "../../login/lib/useGetClassName";
import { useRef } from "react";
import { useConstCallback } from "../../tools/useConstCallback";
export default function SelectAuthenticator(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, auth } = kcContext;
    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });
    const { msg } = i18n;
    const selectCredentialsForm = useRef(null);
    const authExecIdInput = useRef(null);
    const submitForm = useConstCallback(() => {
        var _a;
        (_a = selectCredentialsForm.current) === null || _a === void 0 ? void 0 : _a.submit();
    });
    const onSelectedAuthenticator = useConstCallback((event) => {
        const divElement = event.currentTarget;
        const authExecId = divElement.dataset.authExecId;
        if (!authExecIdInput.current || !authExecId) {
            return;
        }
        authExecIdInput.current.value = authExecId;
        submitForm();
    });
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("loginChooseAuthenticator") }, { children: _jsx("form", Object.assign({ id: "kc-select-credential-form", className: getClassName("kcFormClass"), ref: selectCredentialsForm, action: url.loginAction, method: "post" }, { children: _jsxs("div", Object.assign({ className: getClassName("kcSelectAuthListClass") }, { children: [auth.authenticationSelections.map((authenticationSelection, index) => {
                        var _a;
                        return (_jsx("div", Object.assign({ className: getClassName("kcSelectAuthListItemClass") }, { children: _jsxs("div", Object.assign({ style: { cursor: "pointer" }, onClick: onSelectedAuthenticator, "data-auth-exec-id": authenticationSelection.authExecId, className: getClassName("kcSelectAuthListItemInfoClass") }, { children: [_jsx("div", Object.assign({ className: getClassName("kcSelectAuthListItemLeftClass") }, { children: _jsx("span", { className: getClassName((_a = authenticationSelection.iconCssClass) !== null && _a !== void 0 ? _a : "kcAuthenticatorDefaultClass") }) })), _jsx("div", Object.assign({ className: getClassName("kcSelectAuthListItemBodyClass") }, { children: _jsxs("div", Object.assign({ className: getClassName("kcSelectAuthListItemDescriptionClass") }, { children: [_jsx("div", Object.assign({ className: getClassName("kcSelectAuthListItemHeadingClass") }, { children: msg(authenticationSelection.displayName) })), _jsx("div", Object.assign({ className: getClassName("kcSelectAuthListItemHelpTextClass") }, { children: msg(authenticationSelection.helpText) }))] })) }))] })) }), index));
                    }), _jsx("input", { type: "hidden", id: "authexec-hidden-input", name: "authenticationExecution", ref: authExecIdInput })] })) })) })));
}
//# sourceMappingURL=SelectAuthenticator.js.map