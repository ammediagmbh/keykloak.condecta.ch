export type ResolvedViteConfig = {
    buildDir: string;
    publicDir: string;
    assetsDir: string;
    urlPathname: string | undefined;
};
export declare function readResolvedViteConfig(params: {
    cacheDirPath: string;
}): {
    resolvedViteConfig: ResolvedViteConfig | undefined;
};
