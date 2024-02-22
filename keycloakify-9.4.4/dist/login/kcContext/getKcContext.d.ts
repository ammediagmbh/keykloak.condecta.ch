import type { DeepPartial } from "../../tools/DeepPartial";
import type { ExtendKcContext } from "./getKcContextFromWindow";
/** NOTE: We now recommend using createGetKcContext instead of this function to make storybook integration easier
 *  See: https://github.com/keycloakify/keycloakify-starter/blob/main/src/keycloak-theme/account/kcContext.ts
 */
export declare function getKcContext<KcContextExtension extends {
    pageId: string;
} = never>(params?: {
    mockPageId?: ExtendKcContext<KcContextExtension>["pageId"];
    mockData?: readonly DeepPartial<ExtendKcContext<KcContextExtension>>[];
}): {
    kcContext: ExtendKcContext<KcContextExtension> | undefined;
};
