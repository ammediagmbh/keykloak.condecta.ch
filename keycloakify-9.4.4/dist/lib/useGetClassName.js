import { clsx } from "../tools/clsx";
import { useConstCallback } from "../tools/useConstCallback";
export function createUseClassName(params) {
    const { defaultClasses } = params;
    function useGetClassName(params) {
        const { classes } = params;
        const getClassName = useConstCallback((classKey) => {
            return clsx(classKey, defaultClasses[classKey], classes === null || classes === void 0 ? void 0 : classes[classKey]);
        });
        return { getClassName };
    }
    return { useGetClassName };
}
//# sourceMappingURL=useGetClassName.js.map