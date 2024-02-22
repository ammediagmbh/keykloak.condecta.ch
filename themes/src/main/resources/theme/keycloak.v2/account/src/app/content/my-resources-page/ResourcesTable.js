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
exports.ResourcesTable = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var react_icons_1 = require("@patternfly/react-icons");
var AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
var PermissionRequest_1 = require("./PermissionRequest");
var ShareTheResource_1 = require("./ShareTheResource");
var Msg_1 = require("../../widgets/Msg");
var AbstractResourceTable_1 = require("./AbstractResourceTable");
var EditTheResource_1 = require("./EditTheResource");
var ContentAlert_1 = require("../ContentAlert");
var EmptyMessageState_1 = require("../../widgets/EmptyMessageState");
var ContinueCancelModal_1 = require("../../widgets/ContinueCancelModal");
var ResourcesTable = /** @class */ (function (_super) {
    __extends(ResourcesTable, _super);
    function ResourcesTable(props, context) {
        var _this = _super.call(this, props) || this;
        _this.onToggle = function (row) {
            var newIsRowOpen = _this.state.isRowOpen;
            newIsRowOpen[row] = !newIsRowOpen[row];
            if (newIsRowOpen[row])
                _this.fetchPermissions(_this.props.resources.data[row], row);
            _this.setState({ isRowOpen: newIsRowOpen });
        };
        _this.onContextToggle = function (row, isOpen) {
            if (_this.state.isModalActive)
                return;
            var data = _this.props.resources.data;
            var contextOpen = _this.state.contextOpen;
            contextOpen[row] = isOpen;
            if (isOpen) {
                var index = row > data.length ? row - data.length - 1 : row;
                _this.fetchPermissions(data[index], index);
            }
            _this.setState({ contextOpen: contextOpen });
        };
        _this.context = context;
        _this.state = {
            isRowOpen: [],
            contextOpen: [],
            isModalActive: false,
            permissions: new Map()
        };
        return _this;
    }
    ResourcesTable.prototype.fetchPermissions = function (resource, row) {
        var _this = this;
        this.context.doGet("/resources/".concat(encodeURIComponent(resource._id), "/permissions"))
            .then(function (response) {
            var newPermissions = new Map(_this.state.permissions);
            newPermissions.set(row, response.data || []);
            _this.setState({ permissions: newPermissions });
        });
    };
    ResourcesTable.prototype.removeShare = function (resource, row) {
        var permissions = this.state.permissions.get(row).map(function (a) { return ({ username: a.username, scopes: [] }); });
        return this.context.doPut("/resources/".concat(encodeURIComponent(resource._id), "/permissions"), permissions)
            .then(function () {
            ContentAlert_1.ContentAlert.success(Msg_1.Msg.localize('unShareSuccess'));
        });
    };
    ResourcesTable.prototype.render = function () {
        var _this = this;
        if (this.props.resources.data.length === 0) {
            return (React.createElement(EmptyMessageState_1.default, { icon: react_icons_1.RepositoryIcon, messageKey: "notHaveAnyResource" }));
        }
        return (React.createElement(react_core_1.DataList, { "aria-label": Msg_1.Msg.localize('resources'), id: "resourcesList" },
            React.createElement(react_core_1.DataListItem, { key: 'resource-header', "aria-labelledby": 'resource-header' },
                React.createElement(react_core_1.DataListItemRow, null,
                    "// invisible toggle allows headings to line up properly",
                    React.createElement("span", { style: { visibility: 'hidden' } },
                        React.createElement(react_core_1.DataListToggle, { isExpanded: false, id: 'resource-header-invisible-toggle', "aria-controls": "ex-expand1" })),
                    React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                            React.createElement(react_core_1.DataListCell, { key: 'resource-name-header', width: 5 },
                                React.createElement("strong", null,
                                    React.createElement(Msg_1.Msg, { msgKey: 'resourceName' }))),
                            React.createElement(react_core_1.DataListCell, { key: 'application-name-header', width: 5 },
                                React.createElement("strong", null,
                                    React.createElement(Msg_1.Msg, { msgKey: 'application' }))),
                            React.createElement(react_core_1.DataListCell, { key: 'permission-request-header', width: 5 },
                                React.createElement("strong", null,
                                    React.createElement(Msg_1.Msg, { msgKey: 'permissionRequests' }))),
                        ] }))),
            this.props.resources.data.map(function (resource, row) { return (React.createElement(react_core_1.DataListItem, { key: 'resource-' + row, "aria-labelledby": resource.name, isExpanded: _this.state.isRowOpen[row] },
                React.createElement(react_core_1.DataListItemRow, null,
                    React.createElement(react_core_1.DataListToggle, { onClick: function () { return _this.onToggle(row); }, isExpanded: _this.state.isRowOpen[row], id: 'resourceToggle-' + row, "aria-controls": "ex-expand1" }),
                    React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                            React.createElement(react_core_1.DataListCell, { id: 'resourceName-' + row, key: 'resourceName-' + row, width: 5 },
                                React.createElement(Msg_1.Msg, { msgKey: resource.name })),
                            React.createElement(react_core_1.DataListCell, { id: 'resourceClient-' + row, key: 'resourceClient-' + row, width: 5 },
                                React.createElement("a", { href: resource.client.baseUrl }, _this.getClientName(resource.client))),
                            React.createElement(react_core_1.DataListCell, { id: 'resourceRequests-' + row, key: 'permissionRequests-' + row, width: 5 }, resource.shareRequests.length > 0 &&
                                React.createElement(PermissionRequest_1.PermissionRequest, { resource: resource, onClose: function () { return _this.fetchPermissions(resource, row); } }))
                        ] }),
                    React.createElement(react_core_1.DataListAction, { visibility: { lg: 'hidden' }, "aria-labelledby": "check-action-item3 check-action-action3", id: "check-action-action3", "aria-label": "Actions" },
                        React.createElement(react_core_1.Dropdown, { isPlain: true, position: react_core_1.DropdownPosition.right, onSelect: function () { return _this.setState({ isModalActive: true }); }, toggle: React.createElement(react_core_1.KebabToggle, { onToggle: function (isOpen) { return _this.onContextToggle(row + _this.props.resources.data.length + 1, isOpen); } }), isOpen: _this.state.contextOpen[row + _this.props.resources.data.length + 1], dropdownItems: [
                                React.createElement(ShareTheResource_1.ShareTheResource, { resource: resource, permissions: _this.state.permissions.get(row), sharedWithUsersMsg: _this.sharedWithUsersMessage(row), onClose: function () {
                                        _this.setState({ isModalActive: false }, function () {
                                            _this.onContextToggle(row + _this.props.resources.data.length + 1, false);
                                            _this.fetchPermissions(resource, row + _this.props.resources.data.length + 1);
                                        });
                                    } }, function (toggle) { return (React.createElement(react_core_1.DropdownItem, { id: 'mob-share-' + row, key: "mob-share", onClick: toggle },
                                    React.createElement(react_icons_1.ShareAltIcon, null),
                                    " ",
                                    React.createElement(Msg_1.Msg, { msgKey: "share" }))); }),
                                React.createElement(EditTheResource_1.EditTheResource, { resource: resource, permissions: _this.state.permissions.get(row), onClose: function () {
                                        _this.setState({ isModalActive: false }, function () {
                                            _this.onContextToggle(row + _this.props.resources.data.length + 1, false);
                                            _this.fetchPermissions(resource, row + _this.props.resources.data.length + 1);
                                        });
                                    } }, function (toggle) { return (React.createElement(react_core_1.DropdownItem, { id: 'mob-edit-' + row, key: "mob-edit", isDisabled: _this.numOthers(row) < 0, onClick: toggle },
                                    React.createElement(react_icons_1.EditAltIcon, null),
                                    " ",
                                    React.createElement(Msg_1.Msg, { msgKey: "edit" }))); }),
                                React.createElement(ContinueCancelModal_1.ContinueCancelModal, { render: function (toggle) { return (React.createElement(react_core_1.DropdownItem, { id: 'mob-remove-' + row, key: "mob-remove", isDisabled: _this.numOthers(row) < 0, onClick: toggle },
                                        React.createElement(react_icons_1.Remove2Icon, null),
                                        " ",
                                        React.createElement(Msg_1.Msg, { msgKey: "unShare" }))); }, modalTitle: "unShare", modalMessage: "unShareAllConfirm", onClose: function () {
                                        return _this.setState({ isModalActive: false }, function () {
                                            _this.onContextToggle(row + _this.props.resources.data.length + 1, false);
                                        });
                                    }, onContinue: function () { return _this.removeShare(resource, row)
                                        .then(function () { return _this.fetchPermissions(resource, row + _this.props.resources.data.length + 1); }); } })
                            ] })),
                    React.createElement(react_core_1.DataListAction, { id: "actions-".concat(row), visibility: { default: 'hidden', lg: 'visible' }, "aria-labelledby": "Row actions", "aria-label": "Actions" },
                        React.createElement(ShareTheResource_1.ShareTheResource, { resource: resource, permissions: _this.state.permissions.get(row), sharedWithUsersMsg: _this.sharedWithUsersMessage(row), onClose: function () { return _this.fetchPermissions(resource, row); } }, function (toggle) { return (React.createElement(react_core_1.Button, { id: "share-".concat(row), variant: "link", onClick: toggle },
                            React.createElement(react_icons_1.ShareAltIcon, null),
                            " ",
                            React.createElement(Msg_1.Msg, { msgKey: "share" }))); }),
                        React.createElement(react_core_1.Dropdown, { id: "action-menu-".concat(row), isPlain: true, position: react_core_1.DropdownPosition.right, toggle: React.createElement(react_core_1.KebabToggle, { onToggle: function (isOpen) { return _this.onContextToggle(row, isOpen); } }), onSelect: function () { return _this.setState({ isModalActive: true }); }, isOpen: _this.state.contextOpen[row], dropdownItems: [
                                React.createElement(EditTheResource_1.EditTheResource, { resource: resource, permissions: _this.state.permissions.get(row), onClose: function () {
                                        _this.setState({ isModalActive: false }, function () {
                                            _this.onContextToggle(row, false);
                                            _this.fetchPermissions(resource, row);
                                        });
                                    } }, function (toggle) { return (React.createElement(react_core_1.DropdownItem, { id: 'edit-' + row, key: "edit", component: "button", isDisabled: _this.numOthers(row) < 0, onClick: toggle },
                                    React.createElement(react_icons_1.EditAltIcon, null),
                                    " ",
                                    React.createElement(Msg_1.Msg, { msgKey: "edit" }))); }),
                                React.createElement(ContinueCancelModal_1.ContinueCancelModal, { render: function (toggle) { return (React.createElement(react_core_1.DropdownItem, { id: 'remove-' + row, key: "remove", component: "button", isDisabled: _this.numOthers(row) < 0, onClick: toggle },
                                        React.createElement(react_icons_1.Remove2Icon, null),
                                        " ",
                                        React.createElement(Msg_1.Msg, { msgKey: "unShare" }))); }, modalTitle: "unShare", modalMessage: 'unShareAllConfirm', onClose: function () {
                                        return _this.setState({ isModalActive: false }, function () {
                                            _this.onContextToggle(row, false);
                                        });
                                    }, onContinue: function () { return _this.removeShare(resource, row).then(function () { return _this.fetchPermissions(resource, row); }); } })
                            ] }))),
                React.createElement(react_core_1.DataListContent, { hasNoPadding: false, "aria-label": "Session Details", id: 'ex-expand' + row, isHidden: !_this.state.isRowOpen[row] },
                    React.createElement(react_core_1.Level, { hasGutter: true },
                        React.createElement(react_core_1.LevelItem, null,
                            React.createElement("span", null)),
                        React.createElement(react_core_1.LevelItem, { id: 'shared-with-user-message-' + row }, _this.sharedWithUsersMessage(row)),
                        React.createElement(react_core_1.LevelItem, null,
                            React.createElement("span", null)))))); })));
    };
    ResourcesTable.contextType = AccountServiceContext_1.AccountServiceContext;
    return ResourcesTable;
}(AbstractResourceTable_1.AbstractResourcesTable));
exports.ResourcesTable = ResourcesTable;
