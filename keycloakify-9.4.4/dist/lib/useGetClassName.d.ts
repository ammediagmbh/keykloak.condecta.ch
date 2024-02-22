export declare function createUseClassName<ClassKey extends string>(params: {
    defaultClasses: Record<ClassKey, string | undefined>;
}): {
    useGetClassName: (params: {
        doUseDefaultCss: boolean;
        classes: Partial<Record<ClassKey, string>> | undefined;
    }) => {
        getClassName: (classKey: ClassKey) => string;
    };
};
