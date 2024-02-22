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
exports.ContentAlert = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var Msg_1 = require("../widgets/Msg");
var ContentAlert = /** @class */ (function (_super) {
    __extends(ContentAlert, _super);
    function ContentAlert(props) {
        var _this = _super.call(this, props) || this;
        _this.hideAlert = function (key) {
            _this.setState({ alerts: __spreadArray([], _this.state.alerts.filter(function (el) { return el.key !== key; }), true) });
        };
        _this.getUniqueId = function () { return (new Date().getTime()); };
        _this.postAlert = function (variant, message, params) {
            var alerts = _this.state.alerts;
            var key = _this.getUniqueId();
            alerts.push({
                key: key,
                message: Msg_1.Msg.localize(message, params),
                variant: variant
            });
            _this.setState({ alerts: alerts });
            if (variant !== react_core_1.AlertVariant.danger) {
                setTimeout(function () { return _this.hideAlert(key); }, 8000);
            }
        };
        _this.state = {
            alerts: []
        };
        ContentAlert.instance = _this;
        return _this;
    }
    /**
     * @param message A literal text message or localization key.
     */
    ContentAlert.success = function (message, params) {
        ContentAlert.instance.postAlert(react_core_1.AlertVariant.success, message, params);
    };
    /**
     * @param message A literal text message or localization key.
     */
    ContentAlert.danger = function (message, params) {
        ContentAlert.instance.postAlert(react_core_1.AlertVariant.danger, message, params);
    };
    /**
     * @param message A literal text message or localization key.
     */
    ContentAlert.warning = function (message, params) {
        ContentAlert.instance.postAlert(react_core_1.AlertVariant.warning, message, params);
    };
    /**
     * @param message A literal text message or localization key.
     */
    ContentAlert.info = function (message, params) {
        ContentAlert.instance.postAlert(react_core_1.AlertVariant.info, message, params);
    };
    ContentAlert.prototype.render = function () {
        var _this = this;
        return (React.createElement(react_core_1.AlertGroup, { isToast: true, "aria-live": "assertive" }, this.state.alerts.map(function (_a) {
            var key = _a.key, variant = _a.variant, message = _a.message;
            return (React.createElement(react_core_1.Alert, { "aria-details": message, isLiveRegion: true, variant: variant, title: message, actionClose: React.createElement(react_core_1.AlertActionCloseButton, { title: message, variantLabel: "".concat(variant, " alert"), onClose: function () { return _this.hideAlert(key); } }), key: key }));
        })));
    };
    return ContentAlert;
}(React.Component));
exports.ContentAlert = ContentAlert;
