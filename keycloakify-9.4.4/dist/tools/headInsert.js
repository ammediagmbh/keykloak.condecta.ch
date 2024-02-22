import "./HTMLElement.prototype.prepend";
import { Deferred } from "evt/tools/Deferred";
export function headInsert(params) {
    const htmlElement = document.createElement((() => {
        switch (params.type) {
            case "css":
                return "link";
            case "javascript":
                return "script";
        }
    })());
    const dLoaded = new Deferred();
    htmlElement.addEventListener("load", () => dLoaded.resolve());
    Object.assign(htmlElement, (() => {
        switch (params.type) {
            case "css":
                return {
                    "href": params.href,
                    "type": "text/css",
                    "rel": "stylesheet",
                    "media": "screen,print"
                };
            case "javascript":
                return {
                    "src": params.src,
                    "type": "text/javascript"
                };
        }
    })());
    document.getElementsByTagName("head")[0][(() => {
        switch (params.type) {
            case "javascript":
                return "appendChild";
            case "css":
                return (() => {
                    switch (params.position) {
                        case "append":
                            return "appendChild";
                        case "prepend":
                            return "prepend";
                    }
                })();
        }
    })()](htmlElement);
    return {
        "prLoaded": dLoaded.pr,
        "remove": () => htmlElement.remove()
    };
}
//# sourceMappingURL=headInsert.js.map