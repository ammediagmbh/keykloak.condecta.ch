"use strict";
/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
exports.PageToolbar = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var ReferrerLink_1 = require("./widgets/ReferrerLink");
var Logout_1 = require("./widgets/Logout");
var PageToolbar = /** @class */ (function (_super) {
    __extends(PageToolbar, _super);
    function PageToolbar(props) {
        var _this = _super.call(this, props) || this;
        _this.hasReferrer = typeof referrerName !== 'undefined';
        _this.onKebabDropdownToggle = function (isKebabDropdownOpen) {
            _this.setState({
                isKebabDropdownOpen: isKebabDropdownOpen
            });
        };
        _this.state = {
            isKebabDropdownOpen: false,
        };
        return _this;
    }
    PageToolbar.prototype.render = function () {
        return (React.createElement(react_core_1.Toolbar, null,
            this.hasReferrer &&
                React.createElement(react_core_1.ToolbarGroup, { key: 'referrerGroup', alignment: { default: "alignRight" } },
                    React.createElement(react_core_1.ToolbarItem, { className: "pf-m-icons", key: 'referrer' },
                        React.createElement(ReferrerLink_1.ReferrerLink, null))),
            React.createElement(react_core_1.ToolbarGroup, { key: 'secondGroup', alignment: { default: "alignRight" } },
                React.createElement(react_core_1.ToolbarItem, { className: "pf-m-icons", key: 'logout' },
                    React.createElement(Logout_1.LogoutButton, null)))));
    };
    return PageToolbar;
}(React.Component));
exports.PageToolbar = PageToolbar;
