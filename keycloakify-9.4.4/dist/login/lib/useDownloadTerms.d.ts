export declare const evtTermMarkdown: import("evt/lib/types").StatefulEvt<string | undefined>;
export type KcContextLike = {
    pageId: string;
    locale?: {
        currentLanguageTag: string;
    };
};
/** Allow to avoid bundling the terms and download it on demand*/
export declare function useDownloadTerms(params: {
    kcContext: KcContextLike;
    downloadTermMarkdown: (params: {
        currentLanguageTag: string;
    }) => Promise<string>;
}): void;
