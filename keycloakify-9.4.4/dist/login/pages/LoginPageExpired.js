import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function LoginPageExpired(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url } = kcContext;
    const { msg } = i18n;
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { displayMessage: false, headerNode: msg("pageExpiredTitle") }, { children: _jsxs("p", Object.assign({ id: "instruction1", className: "instruction" }, { children: [msg("pageExpiredMsg1"), _jsx("a", Object.assign({ id: "loginRestartLink", href: url.loginRestartFlowUrl }, { children: msg("doClickHere") })), " ", ".", _jsx("br", {}), msg("pageExpiredMsg2"), " ", _jsx("a", Object.assign({ id: "loginContinueLink", href: url.loginAction }, { children: msg("doClickHere") })), " ", "."] })) })));
}
//# sourceMappingURL=LoginPageExpired.js.map