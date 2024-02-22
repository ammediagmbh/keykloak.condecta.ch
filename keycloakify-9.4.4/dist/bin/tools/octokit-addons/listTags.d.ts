import type { Octokit } from "@octokit/rest";
export declare function listTagsFactory(params: {
    octokit: Octokit;
}): {
    listTags: (params: {
        owner: string;
        repo: string;
    }) => AsyncGenerator<string>;
    getLatestTag: (params: {
        owner: string;
        repo: string;
    }) => Promise<string | undefined>;
};
