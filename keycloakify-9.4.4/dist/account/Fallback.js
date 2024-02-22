var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from "react";
import { assert } from "tsafe/assert";
const Password = lazy(() => import("../account/pages/Password"));
const Account = lazy(() => import("../account/pages/Account"));
export default function Fallback(props) {
    const { kcContext } = props, rest = __rest(props, ["kcContext"]);
    return (_jsx(Suspense, { children: (() => {
            switch (kcContext.pageId) {
                case "password.ftl":
                    return _jsx(Password, Object.assign({ kcContext: kcContext }, rest));
                case "account.ftl":
                    return _jsx(Account, Object.assign({ kcContext: kcContext }, rest));
            }
            assert(false);
        })() }));
}
//# sourceMappingURL=Fallback.js.map