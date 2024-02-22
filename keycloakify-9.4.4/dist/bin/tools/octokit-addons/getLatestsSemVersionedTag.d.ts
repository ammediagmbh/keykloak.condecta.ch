import type { Octokit } from "@octokit/rest";
import { SemVer } from "../SemVer";
export declare function getLatestsSemVersionedTagFactory(params: {
    octokit: Octokit;
}): {
    getLatestsSemVersionedTag: (params: {
        owner: string;
        repo: string;
        count: number;
    }) => Promise<{
        tag: string;
        version: SemVer;
    }[]>;
};
