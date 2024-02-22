"use strict";
/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
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
exports.App = void 0;
var React = require("react");
var PageNav_1 = require("./PageNav");
var PageHeaderTool_1 = require("./PageHeaderTool");
var ContentPages_1 = require("./ContentPages");
var react_core_1 = require("@patternfly/react-core");
var KeycloakContext_1 = require("./keycloak-service/KeycloakContext");
;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props, context) {
        var _this = _super.call(this, props) || this;
        _this.context = context;
        toggleReact();
        return _this;
    }
    App.prototype.render = function () {
        toggleReact();
        // check login
        if (!this.context.authenticated() && !isWelcomePage()) {
            this.context.login();
        }
        var Header = (React.createElement(react_core_1.PageHeader, { logo: React.createElement("a", { id: "brandLink", href: brandUrl },
                React.createElement(react_core_1.Brand, { src: brandImg, alt: "Logo", className: "brand" })), headerTools: React.createElement(PageHeaderTool_1.PageHeaderTool, null), showNavToggle: true }));
        var Sidebar = React.createElement(react_core_1.PageSidebar, { nav: React.createElement(PageNav_1.PageNav, null) });
        return (React.createElement(react_core_1.Page, { header: Header, sidebar: Sidebar, isManagedSidebar: true }, (0, ContentPages_1.makeRoutes)()));
    };
    App.contextType = KeycloakContext_1.KeycloakContext;
    return App;
}(React.Component));
exports.App = App;
;
