import { type FetchOptions } from "make-fetch-happen";
export type ProxyFetchOptions = Pick<FetchOptions, "proxy" | "noProxy" | "strictSSL" | "cert" | "ca">;
export declare function getProxyFetchOptions(params: {
    npmWorkspaceRootDirPath: string;
}): Promise<ProxyFetchOptions>;
