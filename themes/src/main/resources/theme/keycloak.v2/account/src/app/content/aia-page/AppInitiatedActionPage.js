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
exports.AppInitiatedActionPage = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var AIACommand_1 = require("../../util/AIACommand");
var Msg_1 = require("../../widgets/Msg");
var react_core_1 = require("@patternfly/react-core");
var react_icons_1 = require("@patternfly/react-icons");
var KeycloakContext_1 = require("../../keycloak-service/KeycloakContext");
/**
 * @author Stan Silvert
 */
var ApplicationInitiatedActionPage = /** @class */ (function (_super) {
    __extends(ApplicationInitiatedActionPage, _super);
    function ApplicationInitiatedActionPage(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = function (keycloak) {
            new AIACommand_1.AIACommand(keycloak, _this.props.pageDef.kcAction).execute();
        };
        return _this;
    }
    ApplicationInitiatedActionPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(react_core_1.EmptyState, { variant: react_core_1.EmptyStateVariant.full },
            React.createElement(react_core_1.EmptyStateIcon, { icon: react_icons_1.PassportIcon }),
            React.createElement(react_core_1.Title, { headingLevel: "h5", size: react_core_1.TitleSizes.lg },
                React.createElement(Msg_1.Msg, { msgKey: this.props.pageDef.label, params: this.props.pageDef.labelParams })),
            React.createElement(react_core_1.EmptyStateBody, null,
                React.createElement(Msg_1.Msg, { msgKey: "actionRequiresIDP" })),
            React.createElement(KeycloakContext_1.KeycloakContext.Consumer, null, function (keycloak) { return (React.createElement(react_core_1.Button, { variant: "primary", onClick: function () { return _this.handleClick(keycloak); }, target: "_blank" },
                React.createElement(Msg_1.Msg, { msgKey: "continue" }))); })));
    };
    return ApplicationInitiatedActionPage;
}(React.Component));
;
// Note that the class name is not exported above.  To get access to the router,
// we use withRouter() and export a different name.
exports.AppInitiatedActionPage = (0, react_router_dom_1.withRouter)(ApplicationInitiatedActionPage);
