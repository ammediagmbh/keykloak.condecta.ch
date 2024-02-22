import "minimal-polyfills/Object.fromEntries";
export function deepClone(o) {
    if (!(o instanceof Object)) {
        return o;
    }
    if (typeof o === "function") {
        return o;
    }
    if (o instanceof Array) {
        return o.map(deepClone);
    }
    return Object.fromEntries(Object.entries(o).map(([key, value]) => [key, deepClone(value)]));
}
//# sourceMappingURL=deepClone.js.map