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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRequest = void 0;
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
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var react_icons_1 = require("@patternfly/react-icons");
var AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
var Msg_1 = require("../../widgets/Msg");
var ContentAlert_1 = require("../ContentAlert");
var PermissionRequest = /** @class */ (function (_super) {
    __extends(PermissionRequest, _super);
    function PermissionRequest(props, context) {
        var _this = _super.call(this, props) || this;
        _this.handleApprove = function (shareRequest, index) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.handle(shareRequest.username, shareRequest.scopes, true);
                this.props.resource.shareRequests.splice(index, 1);
                return [2 /*return*/];
            });
        }); };
        _this.handleDeny = function (shareRequest, index) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.handle(shareRequest.username, shareRequest.scopes);
                this.props.resource.shareRequests.splice(index, 1);
                return [2 /*return*/];
            });
        }); };
        _this.handle = function (username, scopes, approve) {
            if (approve === void 0) { approve = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var id, permissionsRequest, permissions, foundPermission, userScopes, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = this.props.resource._id;
                            this.handleToggleDialog();
                            return [4 /*yield*/, this.context.doGet("/resources/".concat(encodeURIComponent(id), "/permissions"))];
                        case 1:
                            permissionsRequest = _a.sent();
                            permissions = permissionsRequest.data || [];
                            foundPermission = permissions.find(function (p) { return p.username === username; });
                            userScopes = foundPermission ? foundPermission.scopes : [];
                            if (approve) {
                                userScopes.push.apply(userScopes, scopes);
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.context.doPut("/resources/".concat(encodeURIComponent(id), "/permissions"), [{ username: username, scopes: userScopes }])];
                        case 3:
                            _a.sent();
                            ContentAlert_1.ContentAlert.success(Msg_1.Msg.localize('shareSuccess'));
                            this.props.onClose();
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            console.error('Could not update permissions', e_1.error);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        _this.handleToggleDialog = function () {
            _this.setState({ isOpen: !_this.state.isOpen });
        };
        _this.context = context;
        _this.state = {
            isOpen: false,
        };
        return _this;
    }
    PermissionRequest.prototype.render = function () {
        var _this = this;
        var id = "shareRequest-".concat(this.props.resource.name.replace(/\s/, '-'));
        return (React.createElement(React.Fragment, null,
            React.createElement(react_core_1.Button, { id: id, variant: "link", onClick: this.handleToggleDialog },
                React.createElement(react_icons_1.UserCheckIcon, { size: "lg" }),
                React.createElement(react_core_1.Badge, null, this.props.resource.shareRequests.length)),
            React.createElement(react_core_1.Modal, { id: "modal-".concat(id), title: Msg_1.Msg.localize('permissionRequests') + ' - ' + this.props.resource.name, variant: react_core_1.ModalVariant.large, isOpen: this.state.isOpen, onClose: this.handleToggleDialog, actions: [
                    React.createElement(react_core_1.Button, { id: "close-".concat(id), key: "close", variant: "link", onClick: this.handleToggleDialog },
                        React.createElement(Msg_1.Msg, { msgKey: "close" })),
                ] },
                React.createElement(react_core_1.DataList, { "aria-label": Msg_1.Msg.localize('permissionRequests') },
                    React.createElement(react_core_1.DataListItemRow, null,
                        React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                                React.createElement(react_core_1.DataListCell, { key: 'permissions-name-header', width: 5 },
                                    React.createElement("strong", null, "Requestor")),
                                React.createElement(react_core_1.DataListCell, { key: 'permissions-requested-header', width: 5 },
                                    React.createElement("strong", null,
                                        React.createElement(Msg_1.Msg, { msgKey: 'permissionRequests' }))),
                                React.createElement(react_core_1.DataListCell, { key: 'permission-request-header', width: 5 })
                            ] })),
                    this.props.resource.shareRequests.map(function (shareRequest, i) {
                        return React.createElement(react_core_1.DataListItem, { key: i, "aria-labelledby": "requestor" },
                            React.createElement(react_core_1.DataListItemRow, null,
                                React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                                        React.createElement(react_core_1.DataListCell, { id: "requestor".concat(i), key: "requestor".concat(i) },
                                            React.createElement("span", null,
                                                shareRequest.firstName,
                                                " ",
                                                shareRequest.lastName,
                                                " ",
                                                shareRequest.lastName ? '' : shareRequest.username),
                                            React.createElement("br", null),
                                            React.createElement(react_core_1.Text, { component: react_core_1.TextVariants.small }, shareRequest.email)),
                                        React.createElement(react_core_1.DataListCell, { id: "permissions".concat(i), key: "permissions".concat(i) }, shareRequest.scopes.map(function (scope, j) { return React.createElement(react_core_1.Chip, { key: j, isReadOnly: true }, scope); })),
                                        React.createElement(react_core_1.DataListCell, { key: "actions".concat(i) },
                                            React.createElement(react_core_1.Split, { hasGutter: true },
                                                React.createElement(react_core_1.SplitItem, null,
                                                    React.createElement(react_core_1.Button, { id: "accept-".concat(i, "-").concat(id), onClick: function () { return _this.handleApprove(shareRequest, i); } }, "Accept")),
                                                React.createElement(react_core_1.SplitItem, null,
                                                    React.createElement(react_core_1.Button, { id: "deny-".concat(i, "-").concat(id), variant: "danger", onClick: function () { return _this.handleDeny(shareRequest, i); } }, "Deny"))))
                                    ] })));
                    })))));
    };
    PermissionRequest.defaultProps = { permissions: [], row: 0 };
    PermissionRequest.contextType = AccountServiceContext_1.AccountServiceContext;
    return PermissionRequest;
}(React.Component));
exports.PermissionRequest = PermissionRequest;
