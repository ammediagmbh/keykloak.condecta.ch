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
exports.GroupsPage = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var ContentPage_1 = require("../ContentPage");
var AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
var Msg_1 = require("../../widgets/Msg");
var GroupsPage = /** @class */ (function (_super) {
    __extends(GroupsPage, _super);
    function GroupsPage(props, context) {
        var _this = _super.call(this, props) || this;
        _this.changeDirectMembership = function (checked, event) {
            _this.setState({
                isDirectMembership: checked
            });
        };
        _this.context = context;
        _this.state = {
            groups: [],
            directGroups: [],
            isDirectMembership: false
        };
        _this.fetchGroups();
        return _this;
    }
    GroupsPage.prototype.fetchGroups = function () {
        var _this = this;
        this.context.doGet("/groups")
            .then(function (response) {
            var directGroups = response.data || [];
            var groups = __spreadArray([], directGroups, true);
            var groupsPaths = directGroups.map(function (s) { return s.path; });
            directGroups.forEach(function (el) { return _this.getParents(el, groups, groupsPaths); });
            _this.setState({
                groups: groups,
                directGroups: directGroups
            });
        });
    };
    GroupsPage.prototype.getParents = function (el, groups, groupsPaths) {
        var parentPath = el.path.slice(0, el.path.lastIndexOf('/'));
        if (parentPath && (groupsPaths.indexOf(parentPath) === -1)) {
            el = {
                name: parentPath.slice(parentPath.lastIndexOf('/') + 1),
                path: parentPath
            };
            groups.push(el);
            groupsPaths.push(parentPath);
            this.getParents(el, groups, groupsPaths);
        }
    };
    GroupsPage.prototype.emptyGroup = function () {
        return (React.createElement(react_core_1.DataListItem, { key: 'emptyItem', "aria-labelledby": "empty-item" },
            React.createElement(react_core_1.DataListItemRow, { key: 'emptyRow' },
                React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                        React.createElement(react_core_1.DataListCell, { key: 'empty' },
                            React.createElement("strong", null,
                                React.createElement(Msg_1.Msg, { msgKey: 'noGroupsText' })))
                    ] }))));
    };
    GroupsPage.prototype.renderGroupList = function (group, appIndex) {
        return (React.createElement(react_core_1.DataListItem, { id: "".concat(appIndex, "-group"), key: 'group-' + appIndex, "aria-labelledby": "groups-list" },
            React.createElement(react_core_1.DataListItemRow, null,
                React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                        React.createElement(react_core_1.DataListCell, { id: "".concat(appIndex, "-group-name"), width: 2, key: 'name-' + appIndex }, group.name),
                        React.createElement(react_core_1.DataListCell, { id: "".concat(appIndex, "-group-path"), width: 2, key: 'path-' + appIndex }, group.path),
                        React.createElement(react_core_1.DataListCell, { id: "".concat(appIndex, "-group-directMembership"), width: 2, key: 'directMembership-' + appIndex },
                            React.createElement(react_core_1.Checkbox, { id: "".concat(appIndex, "-checkbox-directMembership"), isChecked: group.id != null, isDisabled: true }))
                    ] }))));
    };
    GroupsPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(ContentPage_1.ContentPage, { title: Msg_1.Msg.localize('groupLabel') },
            React.createElement(react_core_1.DataList, { id: "groups-list", "aria-label": Msg_1.Msg.localize('groupLabel'), isCompact: true },
                React.createElement(react_core_1.DataListItem, { id: "groups-list-header", "aria-labelledby": "Columns names" },
                    React.createElement(react_core_1.DataListItemRow, null,
                        React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                                React.createElement(react_core_1.DataListCell, { key: 'directMembership-header' },
                                    React.createElement(react_core_1.Checkbox, { label: Msg_1.Msg.localize('directMembership'), id: "directMembership-checkbox", isChecked: this.state.isDirectMembership, onChange: this.changeDirectMembership }))
                            ] }))),
                React.createElement(react_core_1.DataListItem, { id: "groups-list-header", "aria-labelledby": "Columns names" },
                    React.createElement(react_core_1.DataListItemRow, null,
                        React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                                React.createElement(react_core_1.DataListCell, { key: 'group-name-header', width: 2 },
                                    React.createElement("strong", null,
                                        React.createElement(Msg_1.Msg, { msgKey: 'Name' }))),
                                React.createElement(react_core_1.DataListCell, { key: 'group-path-header', width: 2 },
                                    React.createElement("strong", null,
                                        React.createElement(Msg_1.Msg, { msgKey: 'path' }))),
                                React.createElement(react_core_1.DataListCell, { key: 'group-direct-membership-header', width: 2 },
                                    React.createElement("strong", null,
                                        React.createElement(Msg_1.Msg, { msgKey: 'directMembership' }))),
                            ] }))),
                this.state.groups.length === 0
                    ? this.emptyGroup()
                    : (this.state.isDirectMembership ? this.state.directGroups.map(function (group, appIndex) {
                        return _this.renderGroupList(group, appIndex);
                    }) : this.state.groups.map(function (group, appIndex) {
                        return _this.renderGroupList(group, appIndex);
                    })))));
    };
    GroupsPage.contextType = AccountServiceContext_1.AccountServiceContext;
    return GroupsPage;
}(React.Component));
exports.GroupsPage = GroupsPage;
;
