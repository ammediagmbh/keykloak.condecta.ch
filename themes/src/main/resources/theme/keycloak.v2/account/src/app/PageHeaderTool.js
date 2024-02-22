"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeaderTool = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var ReferrerLink_1 = require("./widgets/ReferrerLink");
var Logout_1 = require("./widgets/Logout");
var PageHeaderTool = /** @class */ (function (_super) {
    __extends(PageHeaderTool, _super);
    function PageHeaderTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasReferrer = typeof referrerName !== 'undefined';
        return _this;
    }
    PageHeaderTool.prototype.render = function () {
        var username = loggedInUserName();
        return (React.createElement(react_core_1.PageHeaderTools, null,
            this.hasReferrer &&
                React.createElement("div", { className: "pf-c-page__header-tools-group" },
                    React.createElement(ReferrerLink_1.ReferrerLink, null)),
            React.createElement("div", { className: "pf-c-page__header-tools-group" },
                React.createElement(Logout_1.LogoutButton, null)),
            React.createElement("span", { style: { marginLeft: '10px' }, id: "loggedInUser" }, username)));
    };
    return PageHeaderTool;
}(React.Component));
exports.PageHeaderTool = PageHeaderTool;
