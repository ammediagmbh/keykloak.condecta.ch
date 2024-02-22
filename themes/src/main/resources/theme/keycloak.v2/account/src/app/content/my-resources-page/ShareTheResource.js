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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareTheResource = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
var Msg_1 = require("../../widgets/Msg");
var ContentAlert_1 = require("../ContentAlert");
var PermissionSelect_1 = require("./PermissionSelect");
/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
var ShareTheResource = /** @class */ (function (_super) {
    __extends(ShareTheResource, _super);
    function ShareTheResource(props, context) {
        var _this = _super.call(this, props) || this;
        _this.handleAddPermission = function () {
            var rscId = _this.props.resource._id;
            var newPermissions = [];
            for (var _i = 0, _a = _this.state.permissionsSelected; _i < _a.length; _i++) {
                var permission = _a[_i];
                newPermissions.push(permission.name);
            }
            var permissions = [];
            for (var _b = 0, _c = _this.state.usernames; _b < _c.length; _b++) {
                var username = _c[_b];
                permissions.push({ username: username, scopes: newPermissions });
            }
            _this.handleToggleDialog();
            _this.context.doPut("/resources/".concat(encodeURIComponent(rscId), "/permissions"), permissions)
                .then(function () {
                ContentAlert_1.ContentAlert.success('shareSuccess');
                _this.props.onClose();
            });
        };
        _this.handleToggleDialog = function () {
            if (_this.state.isOpen) {
                _this.setState({ isOpen: false });
                _this.props.onClose();
            }
            else {
                _this.clearState();
                _this.setState({ isOpen: true });
            }
        };
        _this.handleUsernameChange = function (username) {
            _this.setState({ usernameInput: username });
        };
        _this.handleAddUsername = function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((this.state.usernameInput !== '') && (!this.state.usernames.includes(this.state.usernameInput)))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.context.doGet("/resources/".concat(encodeURIComponent(this.props.resource._id), "/user"), { params: { value: this.state.usernameInput } })];
                    case 1:
                        response = _a.sent();
                        if (response.data && response.data.username) {
                            this.setState({ usernameInput: '', usernames: __spreadArray(__spreadArray([], this.state.usernames, true), [this.state.usernameInput], false) });
                        }
                        else {
                            ContentAlert_1.ContentAlert.info('userNotFound', [this.state.usernameInput]);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.handleEnterKeyInAddField = function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                _this.handleAddUsername();
            }
        };
        _this.handleDeleteUsername = function (username) {
            var newUsernames = _this.state.usernames.filter(function (user) { return user !== username; });
            _this.setState({ usernames: newUsernames });
        };
        _this.context = context;
        _this.state = {
            isOpen: false,
            permissionsSelected: [],
            permissionsUnSelected: _this.props.resource.scopes,
            usernames: [],
            usernameInput: ''
        };
        return _this;
    }
    ShareTheResource.prototype.clearState = function () {
        this.setState({
            permissionsSelected: [],
            permissionsUnSelected: this.props.resource.scopes,
            usernames: [],
            usernameInput: ''
        });
    };
    ShareTheResource.prototype.isAddDisabled = function () {
        return this.state.usernameInput === '' || this.isAlreadyShared();
    };
    ShareTheResource.prototype.isAlreadyShared = function () {
        for (var _i = 0, _a = this.props.permissions; _i < _a.length; _i++) {
            var permission = _a[_i];
            if (permission.username === this.state.usernameInput)
                return true;
        }
        return false;
    };
    ShareTheResource.prototype.isFormInvalid = function () {
        return (this.state.usernames.length === 0) || (this.state.permissionsSelected.length === 0);
    };
    ShareTheResource.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            this.props.children(this.handleToggleDialog),
            React.createElement(react_core_1.Modal, { title: 'Share the resource - ' + this.props.resource.name, variant: react_core_1.ModalVariant.large, isOpen: this.state.isOpen, onClose: this.handleToggleDialog, actions: [
                    React.createElement(react_core_1.Button, { key: "cancel", variant: "link", onClick: this.handleToggleDialog },
                        React.createElement(Msg_1.Msg, { msgKey: 'cancel' })),
                    React.createElement(react_core_1.Button, { key: "confirm", variant: "primary", id: "done", onClick: this.handleAddPermission, isDisabled: this.isFormInvalid() },
                        React.createElement(Msg_1.Msg, { msgKey: 'done' }))
                ] },
                React.createElement(react_core_1.Stack, { hasGutter: true },
                    React.createElement(react_core_1.StackItem, { isFilled: true },
                        React.createElement(react_core_1.Form, null,
                            React.createElement(react_core_1.FormGroup, { label: "Add users to share your resource with", type: "string", helperTextInvalid: Msg_1.Msg.localize('resourceAlreadyShared'), fieldId: "username", isRequired: true },
                                React.createElement(react_core_1.Gallery, { hasGutter: true },
                                    React.createElement(react_core_1.GalleryItem, null,
                                        React.createElement(react_core_1.TextInput, { value: this.state.usernameInput, id: "username", "aria-describedby": "username-helper", placeholder: "Username or email", onChange: this.handleUsernameChange, onKeyPress: this.handleEnterKeyInAddField })),
                                    React.createElement(react_core_1.GalleryItem, null,
                                        React.createElement(react_core_1.Button, { key: "add-user", variant: "primary", id: "add", onClick: this.handleAddUsername, isDisabled: this.isAddDisabled() },
                                            React.createElement(Msg_1.Msg, { msgKey: "add" })))),
                                React.createElement(react_core_1.ChipGroup, { categoryName: Msg_1.Msg.localize('shareWith') }, this.state.usernames.map(function (currentChip) { return (React.createElement(react_core_1.Chip, { key: currentChip, onClick: function () { return _this.handleDeleteUsername(currentChip); } }, currentChip)); }))),
                            React.createElement(react_core_1.FormGroup, { label: "", fieldId: "permissions-selected" },
                                React.createElement(PermissionSelect_1.PermissionSelect, { scopes: this.state.permissionsUnSelected, onSelect: function (selection) { return _this.setState({ permissionsSelected: selection }); }, direction: "up" })))),
                    React.createElement(react_core_1.StackItem, { isFilled: true },
                        React.createElement("br", null)),
                    React.createElement(react_core_1.StackItem, { isFilled: true }, this.props.sharedWithUsersMsg)))));
    };
    ShareTheResource.defaultProps = { permissions: [] };
    ShareTheResource.contextType = AccountServiceContext_1.AccountServiceContext;
    return ShareTheResource;
}(React.Component));
exports.ShareTheResource = ShareTheResource;
