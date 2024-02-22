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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinueCancelModal = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var Msg_1 = require("./Msg");
/**
 * This class renders a button that provides a continue/cancel modal dialog when clicked.  If the user selects 'Continue'
 * then the onContinue function is executed.
 *
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
var ContinueCancelModal = /** @class */ (function (_super) {
    __extends(ContinueCancelModal, _super);
    function ContinueCancelModal(props) {
        var _this = _super.call(this, props) || this;
        _this.handleModalToggle = function () {
            _this.setState(function (_a) {
                var isModalOpen = _a.isModalOpen;
                return ({
                    isModalOpen: !isModalOpen
                });
            });
            if (_this.props.onClose)
                _this.props.onClose();
        };
        _this.handleContinue = function () {
            _this.handleModalToggle();
            _this.props.onContinue();
        };
        _this.state = {
            isModalOpen: false
        };
        return _this;
    }
    ContinueCancelModal.prototype.render = function () {
        var isModalOpen = this.state.isModalOpen;
        return (React.createElement(React.Fragment, null,
            !this.props.render &&
                React.createElement(react_core_1.Button, { id: this.props.buttonId, variant: this.props.buttonVariant, onClick: this.handleModalToggle, isDisabled: this.props.isDisabled },
                    React.createElement(Msg_1.Msg, { msgKey: this.props.buttonTitle })),
            this.props.render && this.props.render(this.handleModalToggle),
            React.createElement(react_core_1.Modal, __assign({}, this.props, { variant: react_core_1.ModalVariant.small, title: Msg_1.Msg.localize(this.props.modalTitle), isOpen: isModalOpen, onClose: this.handleModalToggle, actions: [
                    React.createElement(react_core_1.Button, { id: 'modal-confirm', key: "confirm", variant: "primary", onClick: this.handleContinue },
                        React.createElement(Msg_1.Msg, { msgKey: this.props.modalContinueButtonLabel })),
                    React.createElement(react_core_1.Button, { id: 'modal-cancel', key: "cancel", variant: "secondary", onClick: this.handleModalToggle },
                        React.createElement(Msg_1.Msg, { msgKey: this.props.modalCancelButtonLabel }))
                ] }),
                !this.props.modalMessage && this.props.children,
                this.props.modalMessage && React.createElement(Msg_1.Msg, { msgKey: this.props.modalMessage }))));
    };
    ContinueCancelModal.defaultProps = {
        buttonVariant: 'primary',
        modalContinueButtonLabel: 'continue',
        modalCancelButtonLabel: 'doCancel',
        isDisabled: false
    };
    return ContinueCancelModal;
}(React.Component));
exports.ContinueCancelModal = ContinueCancelModal;
;
