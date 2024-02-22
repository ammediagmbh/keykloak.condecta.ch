type LoggerOpts = {
    force?: boolean;
};
type Logger = {
    log: (message: string, opts?: LoggerOpts) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
};
export declare const getLogger: ({ isSilent }?: {
    isSilent?: boolean | undefined;
}) => Logger;
export {};
