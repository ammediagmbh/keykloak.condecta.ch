export declare function usePrepareTemplate(params: {
    doFetchDefaultThemeResources: boolean;
    styles?: string[];
    scripts?: string[];
    htmlClassName: string | undefined;
    bodyClassName: string | undefined;
}): {
    isReady: boolean;
};
