"use strict";
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
exports.PageNotFound = void 0;
var React = require("react");
var react_icons_1 = require("@patternfly/react-icons");
var react_router_dom_1 = require("react-router-dom");
var Msg_1 = require("../../widgets/Msg");
var EmptyMessageState_1 = require("../../widgets/EmptyMessageState");
var PgNotFound = /** @class */ (function (_super) {
    __extends(PgNotFound, _super);
    function PgNotFound(props) {
        return _super.call(this, props) || this;
    }
    PgNotFound.prototype.render = function () {
        return (React.createElement(EmptyMessageState_1.default, { icon: react_icons_1.WarningTriangleIcon, messageKey: "pageNotFound" },
            React.createElement(Msg_1.Msg, { msgKey: "invalidRoute", params: [this.props.location.pathname] })));
    };
    return PgNotFound;
}(React.Component));
;
exports.PageNotFound = (0, react_router_dom_1.withRouter)(PgNotFound);
