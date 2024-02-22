import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Error(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { message, client } = kcContext;
    const { msg } = i18n;
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { displayMessage: false, headerNode: msg("errorTitle") }, { children: _jsxs("div", Object.assign({ id: "kc-error-message" }, { children: [_jsx("p", Object.assign({ className: "instruction" }, { children: message.summary })), client !== undefined && client.baseUrl !== undefined && (_jsx("p", { children: _jsx("a", Object.assign({ id: "backToApplication", href: client.baseUrl }, { children: msg("backToApplication") })) }))] })) })));
}
//# sourceMappingURL=Error.js.map