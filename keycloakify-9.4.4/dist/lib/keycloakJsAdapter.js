/**
 * @deprecated: This will be removed in the next major version.
 * If you use this, please copy paste the code into your project.
 * Better yet migrate away from keycloak-js and use https://docs.oidc-spa.dev instead.
 *
 * NOTE: This is just a slightly modified version of the default adapter in keycloak-js
 * The goal here is just to be able to inject search param in url before keycloak redirect.
 * Our use case for it is to pass over the login screen the states of useGlobalState
 * namely isDarkModeEnabled, lgn...
 */
export function createKeycloakAdapter(params) {
    const { keycloakInstance, transformUrlBeforeRedirect, getRedirectMethod = () => "overwrite location.href" } = params;
    const neverResolvingPromise = Object.defineProperties(new Promise(() => { }), {
        "success": { "value": () => { } },
        "error": { "value": () => { } }
    });
    return {
        "login": options => {
            const newHref = transformUrlBeforeRedirect(keycloakInstance.createLoginUrl(options));
            switch (getRedirectMethod()) {
                case "location.replace":
                    window.location.replace(newHref);
                    break;
                case "overwrite location.href":
                    window.location.href = newHref;
                    break;
            }
            return neverResolvingPromise;
        },
        "register": options => {
            const newHref = transformUrlBeforeRedirect(keycloakInstance.createRegisterUrl(options));
            switch (getRedirectMethod()) {
                case "location.replace":
                    window.location.replace(newHref);
                    break;
                case "overwrite location.href":
                    window.location.href = newHref;
                    break;
            }
            return neverResolvingPromise;
        },
        "logout": options => {
            window.location.replace(transformUrlBeforeRedirect(keycloakInstance.createLogoutUrl(options)));
            return neverResolvingPromise;
        },
        "accountManagement": () => {
            const accountUrl = transformUrlBeforeRedirect(keycloakInstance.createAccountUrl());
            if (accountUrl === "undefined") {
                throw new Error("Not supported by the OIDC server");
            }
            switch (getRedirectMethod()) {
                case "location.replace":
                    window.location.replace(accountUrl);
                    break;
                case "overwrite location.href":
                    window.location.href = accountUrl;
                    break;
            }
            return neverResolvingPromise;
        },
        "redirectUri": options => {
            if (options && options.redirectUri) {
                return options.redirectUri;
            }
            else if (keycloakInstance.redirectUri) {
                return keycloakInstance.redirectUri;
            }
            else {
                return window.location.href;
            }
        }
    };
}
//# sourceMappingURL=keycloakJsAdapter.js.map