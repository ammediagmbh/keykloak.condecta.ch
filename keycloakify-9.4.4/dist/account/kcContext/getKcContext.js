import { createGetKcContext } from "./createGetKcContext";
/** NOTE: We now recommend using createGetKcContext instead of this function to make storybook integration easier
 *  See: https://github.com/keycloakify/keycloakify-starter/blob/main/src/keycloak-theme/account/kcContext.ts
 */
export function getKcContext(params) {
    const { mockPageId, mockData } = params !== null && params !== void 0 ? params : {};
    const { getKcContext } = createGetKcContext({
        mockData
    });
    const { kcContext } = getKcContext({ mockPageId });
    return { kcContext };
}
//# sourceMappingURL=getKcContext.js.map