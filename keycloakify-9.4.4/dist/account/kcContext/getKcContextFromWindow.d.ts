import type { AndByDiscriminatingKey } from "../../tools/AndByDiscriminatingKey";
import type { KcContext } from "./KcContext";
export type ExtendKcContext<KcContextExtension extends {
    pageId: string;
}> = [KcContextExtension] extends [never] ? KcContext : AndByDiscriminatingKey<"pageId", KcContextExtension & KcContext.Common, KcContext>;
export declare function getKcContextFromWindow<KcContextExtension extends {
    pageId: string;
} = never>(): ExtendKcContext<KcContextExtension> | undefined;
