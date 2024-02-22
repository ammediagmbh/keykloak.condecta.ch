import type { ClassKey } from "../../account/TemplateProps";
export declare const useGetClassName: (params: {
    doUseDefaultCss: boolean;
    classes: Partial<Record<ClassKey, string>> | undefined;
}) => {
    getClassName: (classKey: ClassKey) => string;
};
