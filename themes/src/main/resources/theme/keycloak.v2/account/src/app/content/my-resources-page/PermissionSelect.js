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
exports.PermissionSelect = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var Msg_1 = require("../../widgets/Msg");
var ScopeValue = /** @class */ (function () {
    function ScopeValue(value) {
        this.value = value;
    }
    ScopeValue.prototype.toString = function () {
        return this.value.displayName ? this.value.displayName : this.value.name;
    };
    ScopeValue.prototype.compareTo = function (selectOption) {
        return selectOption.name === this.value.name;
    };
    return ScopeValue;
}());
var PermissionSelect = /** @class */ (function (_super) {
    __extends(PermissionSelect, _super);
    function PermissionSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.onSelect = function (event, value) {
            var selected = _this.state.selected;
            var onSelect = _this.props.onSelect;
            if (!(value instanceof ScopeValue)) {
                return;
            }
            if (selected.includes(value)) {
                _this.setState(function (prevState) { return ({ selected: prevState.selected.filter(function (item) { return item !== value; }) }); }, function () { return onSelect(_this.state.selected.map(function (sv) { return sv.value; })); });
            }
            else {
                _this.setState(function (prevState) { return ({ selected: __spreadArray(__spreadArray([], prevState.selected, true), [value], false) }); }, function () { return onSelect(_this.state.selected.map(function (sv) { return sv.value; })); });
            }
        };
        _this.onToggle = function (isExpanded) {
            _this.setState({
                isExpanded: isExpanded
            });
        };
        _this.clearSelection = function () {
            _this.setState({
                selected: [],
                isExpanded: false
            });
            _this.props.onSelect([]);
        };
        var values = [];
        if (_this.props.selected) {
            values = _this.props.selected.map(function (s) { return new ScopeValue(s); });
        }
        _this.state = {
            isExpanded: false,
            selected: values,
            scopes: _this.props.scopes.map(function (option, index) { return (React.createElement(react_core_1.SelectOption, { key: index, value: values.find(function (s) { return s.compareTo(option); }) || new ScopeValue(option) })); })
        };
        return _this;
    }
    PermissionSelect.prototype.render = function () {
        var _a = this.state, isExpanded = _a.isExpanded, selected = _a.selected;
        var titleId = 'permission-id';
        return (React.createElement("div", null,
            React.createElement("span", { id: titleId, hidden: true },
                React.createElement(Msg_1.Msg, { msgKey: 'selectPermissions' })),
            React.createElement(react_core_1.Select, { maxHeight: 300, direction: this.props.direction || 'down', variant: react_core_1.SelectVariant.typeaheadMulti, typeAheadAriaLabel: Msg_1.Msg.localize("selectPermissions"), onToggle: this.onToggle, onSelect: this.onSelect, onClear: this.clearSelection, selections: selected, isOpen: isExpanded, "aria-labelledby": titleId, placeholderText: Msg_1.Msg.localize("selectPermissions"), menuAppendTo: "parent" }, this.state.scopes)));
    };
    return PermissionSelect;
}(React.Component));
exports.PermissionSelect = PermissionSelect;
