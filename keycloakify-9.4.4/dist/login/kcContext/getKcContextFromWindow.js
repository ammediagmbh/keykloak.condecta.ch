import { nameOfTheGlobal } from "../../bin/constants";
export function getKcContextFromWindow() {
    return typeof window === "undefined" ? undefined : window[nameOfTheGlobal];
}
//# sourceMappingURL=getKcContextFromWindow.js.map