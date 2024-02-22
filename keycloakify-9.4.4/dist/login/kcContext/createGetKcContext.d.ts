import type { DeepPartial } from "../../tools/DeepPartial";
import type { ExtendKcContext } from "./getKcContextFromWindow";
export declare function createGetKcContext<KcContextExtension extends {
    pageId: string;
} = never>(params?: {
    mockData?: readonly DeepPartial<ExtendKcContext<KcContextExtension>>[];
}): {
    getKcContext: <PageId extends ExtendKcContext<KcContextExtension>["pageId"] | undefined = undefined>(params?: {
        mockPageId?: PageId | undefined;
        storyPartialKcContext?: DeepPartial<Extract<ExtendKcContext<KcContextExtension>, {
            pageId: PageId;
        }>> | undefined;
    } | undefined) => {
        kcContext: PageId extends undefined ? ExtendKcContext<KcContextExtension> | undefined : Extract<ExtendKcContext<KcContextExtension>, {
            pageId: PageId;
        }>;
    };
};
