import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from "../../tools/clsx";
import { useGetClassName } from "../../login/lib/useGetClassName";
export default function LoginIdpLinkConfirm(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const { url, idpAlias } = kcContext;
    const { msg } = i18n;
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("confirmLinkIdpTitle") }, { children: _jsx("form", Object.assign({ id: "kc-register-form", action: url.loginAction, method: "post" }, { children: _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [_jsx("button", Object.assign({ type: "submit", className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonDefaultClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), name: "submitAction", id: "updateProfile", value: "updateProfile" }, { children: msg("confirmLinkIdpReviewProfile") })), _jsx("button", Object.assign({ type: "submit", className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonDefaultClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")), name: "submitAction", id: "linkAccount", value: "linkAccount" }, { children: msg("confirmLinkIdpContinue", idpAlias) }))] })) })) })));
}
//# sourceMappingURL=LoginIdpLinkConfirm.js.map