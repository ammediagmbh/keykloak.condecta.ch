import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { clsx } from "../../tools/clsx";
import { base64url } from "rfc4648";
import { useConstCallback } from "../../tools/useConstCallback";
import { useGetClassName } from "../../login/lib/useGetClassName";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import { typeGuard } from "tsafe/typeGuard";
export default function WebauthnAuthenticate(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });
    const { url } = kcContext;
    const { msg, msgStr } = i18n;
    const { authenticators, challenge, shouldDisplayAuthenticators, userVerification, rpId } = kcContext;
    const createTimeout = Number(kcContext.createTimeout);
    const isUserIdentified = kcContext.isUserIdentified == "true";
    const formElementRef = useRef(null);
    const webAuthnAuthenticate = useConstCallback(async () => {
        if (!isUserIdentified) {
            return;
        }
        const submitForm = async () => {
            const formElement = formElementRef.current;
            if (formElement === null) {
                await new Promise(resolve => setTimeout(resolve, 100));
                return submitForm();
            }
            formElement.submit();
        };
        const allowCredentials = authenticators.authenticators.map(authenticator => ({
            id: base64url.parse(authenticator.credentialId, { loose: true }),
            type: "public-key"
        }));
        // Check if WebAuthn is supported by this browser
        if (!window.PublicKeyCredential) {
            setError(msgStr("webauthn-unsupported-browser-text"));
            submitForm();
            return;
        }
        const publicKey = {
            rpId,
            challenge: base64url.parse(challenge, { loose: true })
        };
        if (createTimeout !== 0) {
            publicKey.timeout = createTimeout * 1000;
        }
        if (allowCredentials.length) {
            publicKey.allowCredentials = allowCredentials;
        }
        if (userVerification !== "not specified") {
            publicKey.userVerification = userVerification;
        }
        try {
            const result = await navigator.credentials.get({ publicKey });
            if (!result || result.type != "public-key") {
                return;
            }
            assert(is(result));
            if (!("authenticatorData" in result.response)) {
                return;
            }
            const response = result.response;
            const clientDataJSON = response.clientDataJSON;
            assert(typeGuard(response, "signature" in response && response.authenticatorData instanceof ArrayBuffer), "response not an AuthenticatorAssertionResponse");
            const authenticatorData = response.authenticatorData;
            const signature = response.signature;
            setClientDataJSON(base64url.stringify(new Uint8Array(clientDataJSON), { "pad": false }));
            setAuthenticatorData(base64url.stringify(new Uint8Array(authenticatorData), { "pad": false }));
            setSignature(base64url.stringify(new Uint8Array(signature), { "pad": false }));
            setCredentialId(result.id);
            setUserHandle(base64url.stringify(new Uint8Array(response.userHandle), { "pad": false }));
        }
        catch (err) {
            setError(String(err));
        }
        submitForm();
    });
    const [clientDataJSON, setClientDataJSON] = useState("");
    const [authenticatorData, setAuthenticatorData] = useState("");
    const [signature, setSignature] = useState("");
    const [credentialId, setCredentialId] = useState("");
    const [userHandle, setUserHandle] = useState("");
    const [error, setError] = useState("");
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { headerNode: msg("webauthn-login-title") }, { children: _jsxs("div", Object.assign({ id: "kc-form-webauthn", className: getClassName("kcFormClass") }, { children: [_jsxs("form", Object.assign({ id: "webauth", action: url.loginAction, ref: formElementRef, method: "post" }, { children: [_jsx("input", { type: "hidden", id: "clientDataJSON", name: "clientDataJSON", value: clientDataJSON }), _jsx("input", { type: "hidden", id: "authenticatorData", name: "authenticatorData", value: authenticatorData }), _jsx("input", { type: "hidden", id: "signature", name: "signature", value: signature }), _jsx("input", { type: "hidden", id: "credentialId", name: "credentialId", value: credentialId }), _jsx("input", { type: "hidden", id: "userHandle", name: "userHandle", value: userHandle }), _jsx("input", { type: "hidden", id: "error", name: "error", value: error })] })), _jsxs("div", Object.assign({ className: getClassName("kcFormGroupClass") }, { children: [authenticators &&
                            (() => (_jsx("form", Object.assign({ id: "authn_select", className: getClassName("kcFormClass") }, { children: authenticators.authenticators.map(authenticator => (_jsx("input", { type: "hidden", name: "authn_use_chk", value: authenticator.credentialId }, authenticator.credentialId))) }))))(), authenticators &&
                            shouldDisplayAuthenticators &&
                            (() => (_jsxs(_Fragment, { children: [authenticators.authenticators.length > 1 && (_jsx("p", Object.assign({ className: getClassName("kcSelectAuthListItemTitle") }, { children: msg("webauthn-available-authenticators") }))), _jsx("div", Object.assign({ className: getClassName("kcFormClass") }, { children: authenticators.authenticators.map(authenticator => (_jsxs("div", Object.assign({ id: "kc-webauthn-authenticator", className: getClassName("kcSelectAuthListItemClass") }, { children: [_jsx("div", Object.assign({ className: getClassName("kcSelectAuthListItemIconClass") }, { children: _jsx("i", { className: clsx((() => {
                                                            const className = getClassName(authenticator.transports.iconClass);
                                                            return className.includes(" ")
                                                                ? className
                                                                : [className, getClassName("kcWebAuthnDefaultIcon")];
                                                        })(), getClassName("kcSelectAuthListItemIconPropertyClass")) }) })), _jsxs("div", Object.assign({ className: getClassName("kcSelectAuthListItemBodyClass") }, { children: [_jsx("div", Object.assign({ id: "kc-webauthn-authenticator-label", className: getClassName("kcSelectAuthListItemHeadingClass") }, { children: authenticator.label })), authenticator.transports && authenticator.transports.displayNameProperties.length && (_jsx("div", Object.assign({ id: "kc-webauthn-authenticator-transport", className: getClassName("kcSelectAuthListItemDescriptionClass") }, { children: authenticator.transports.displayNameProperties.map((transport, index) => (_jsxs(_Fragment, { children: [_jsx("span", { children: msg(transport) }), index < authenticator.transports.displayNameProperties.length - 1 && (_jsx("span", { children: ", " }))] }))) }))), _jsxs("div", Object.assign({ className: getClassName("kcSelectAuthListItemDescriptionClass") }, { children: [_jsx("span", Object.assign({ id: "kc-webauthn-authenticator-created-label" }, { children: msg("webauthn-createdAt-label") })), _jsx("span", Object.assign({ id: "kc-webauthn-authenticator-created" }, { children: authenticator.createdAt }))] }))] })), _jsx("div", { className: getClassName("kcSelectAuthListItemFillClass") })] })))) }))] })))(), _jsx("div", Object.assign({ id: "kc-form-buttons", className: getClassName("kcFormButtonsClass") }, { children: _jsx("input", { id: "authenticateWebAuthnButton", type: "button", onClick: webAuthnAuthenticate, autoFocus: true, value: msgStr("webauthn-doAuthenticate"), className: clsx(getClassName("kcButtonClass"), getClassName("kcButtonPrimaryClass"), getClassName("kcButtonBlockClass"), getClassName("kcButtonLargeClass")) }) }))] }))] })) })));
}
//# sourceMappingURL=WebauthnAuthenticate.js.map