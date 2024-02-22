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
exports.SharedResourcesTable = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var react_icons_1 = require("@patternfly/react-icons");
var Msg_1 = require("../../widgets/Msg");
var AbstractResourceTable_1 = require("./AbstractResourceTable");
var EmptyMessageState_1 = require("../../widgets/EmptyMessageState");
var SharedResourcesTable = /** @class */ (function (_super) {
    __extends(SharedResourcesTable, _super);
    function SharedResourcesTable(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            permissions: new Map()
        };
        return _this;
    }
    SharedResourcesTable.prototype.render = function () {
        var _this = this;
        if (this.props.resources.data.length === 0) {
            return (React.createElement(EmptyMessageState_1.default, { icon: react_icons_1.RepositoryIcon, messageKey: "noResourcesSharedWithYou" }));
        }
        return (React.createElement(react_core_1.DataList, { "aria-label": Msg_1.Msg.localize('resources'), id: "sharedResourcesList" },
            React.createElement(react_core_1.DataListItem, { key: 'resource-header', "aria-labelledby": 'resource-header' },
                React.createElement(react_core_1.DataListItemRow, null,
                    React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                            React.createElement(react_core_1.DataListCell, { key: 'resource-name-header', width: 2 },
                                React.createElement("strong", null,
                                    React.createElement(Msg_1.Msg, { msgKey: 'resourceName' }))),
                            React.createElement(react_core_1.DataListCell, { key: 'application-name-header', width: 2 },
                                React.createElement("strong", null,
                                    React.createElement(Msg_1.Msg, { msgKey: 'application' }))),
                            React.createElement(react_core_1.DataListCell, { key: 'permission-header', width: 2 }),
                            React.createElement(react_core_1.DataListCell, { key: 'requests-header', width: 2 }),
                        ] }))),
            this.props.resources.data.map(function (resource, row) { return (React.createElement(react_core_1.DataListItem, { key: 'resource-' + row, "aria-labelledby": resource.name },
                React.createElement(react_core_1.DataListItemRow, null,
                    React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                            React.createElement(react_core_1.DataListCell, { key: 'resourceName-' + row, width: 2 },
                                React.createElement(Msg_1.Msg, { msgKey: resource.name })),
                            React.createElement(react_core_1.DataListCell, { key: 'resourceClient-' + row, width: 2 },
                                React.createElement("a", { href: resource.client.baseUrl }, _this.getClientName(resource.client))),
                            React.createElement(react_core_1.DataListCell, { key: 'permissions-' + row, width: 2 }, resource.scopes.length > 0 &&
                                React.createElement(react_core_1.ChipGroup, { categoryName: Msg_1.Msg.localize('permissions') }, resource.scopes.map(function (scope) { return (React.createElement(react_core_1.Chip, { key: scope.name, isReadOnly: true }, scope.displayName || scope.name)); }))),
                            React.createElement(react_core_1.DataListCell, { key: 'pending-' + row, width: 2 }, resource.shareRequests.length > 0 &&
                                React.createElement(react_core_1.ChipGroup, { categoryName: Msg_1.Msg.localize('pending') }, resource.shareRequests[0].scopes.map(function (scope) { return (React.createElement(react_core_1.Chip, { key: scope.name, isReadOnly: true }, scope.displayName || scope.name)); })))
                        ] })))); })));
    };
    return SharedResourcesTable;
}(AbstractResourceTable_1.AbstractResourcesTable));
exports.SharedResourcesTable = SharedResourcesTable;
