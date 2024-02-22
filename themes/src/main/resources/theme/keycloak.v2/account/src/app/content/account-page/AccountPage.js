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
exports.AccountPage = void 0;
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
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
var Msg_1 = require("../../widgets/Msg");
var ContentPage_1 = require("../ContentPage");
var ContentAlert_1 = require("../ContentAlert");
var LocaleSelectors_1 = require("../../widgets/LocaleSelectors");
var KeycloakContext_1 = require("../../keycloak-service/KeycloakContext");
var AIACommand_1 = require("../../util/AIACommand");
var react_icons_1 = require("@patternfly/react-icons");
/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2018 Red Hat Inc.
 */
var AccountPage = /** @class */ (function (_super) {
    __extends(AccountPage, _super);
    function AccountPage(props, context) {
        var _this = _super.call(this, props) || this;
        _this.isRegistrationEmailAsUsername = features.isRegistrationEmailAsUsername;
        _this.isEditUserNameAllowed = features.isEditUserNameAllowed;
        _this.isDeleteAccountAllowed = features.deleteAccountAllowed;
        _this.isUpdateEmailFeatureEnabled = features.updateEmailFeatureEnabled;
        _this.isUpdateEmailActionEnabled = features.updateEmailActionEnabled;
        _this.DEFAULT_STATE = {
            errors: {
                username: '',
                firstName: '',
                lastName: '',
                email: ''
            },
            formFields: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                attributes: {}
            }
        };
        _this.state = _this.DEFAULT_STATE;
        _this.handleCancel = function () {
            _this.fetchPersonalInfo();
        };
        _this.handleChange = function (value, event) {
            var _a, _b;
            var target = event.currentTarget;
            var name = target.name;
            _this.setState({
                errors: __assign(__assign({}, _this.state.errors), (_a = {}, _a[name] = target.validationMessage, _a)),
                formFields: __assign(__assign({}, _this.state.formFields), (_b = {}, _b[name] = value, _b))
            });
        };
        _this.handleSubmit = function (event) {
            event.preventDefault();
            var form = event.target;
            var isValid = form.checkValidity();
            if (isValid) {
                var reqData = __assign({}, _this.state.formFields);
                _this.context.doPost("/", reqData)
                    .then(function () {
                    ContentAlert_1.ContentAlert.success('accountUpdatedMessage');
                    if (locale !== _this.state.formFields.attributes.locale[0]) {
                        window.location.reload();
                    }
                });
            }
            else {
                var formData = new FormData(form);
                var validationMessages = Array.from(formData.keys()).reduce(function (acc, key) {
                    acc[key] = form.elements[key].validationMessage;
                    return acc;
                }, {});
                _this.setState({
                    errors: __assign({}, validationMessages),
                    formFields: _this.state.formFields
                });
            }
        };
        _this.handleDelete = function (keycloak) {
            new AIACommand_1.AIACommand(keycloak, "delete_account").execute();
        };
        _this.handleEmailUpdate = function (keycloak) {
            new AIACommand_1.AIACommand(keycloak, "UPDATE_EMAIL").execute();
        };
        _this.UsernameInput = function () { return (React.createElement(react_core_1.TextInput, { isRequired: true, type: "text", id: "user-name", name: "username", maxLength: 254, value: _this.state.formFields.username, onChange: _this.handleChange, validated: _this.state.errors.username !== '' ? react_core_1.ValidatedOptions.error : react_core_1.ValidatedOptions.default })); };
        _this.RestrictedUsernameInput = function () { return (React.createElement(react_core_1.TextInput, { isReadOnly: true, type: "text", id: "user-name", name: "username", value: _this.state.formFields.username })); };
        _this.context = context;
        _this.fetchPersonalInfo();
        return _this;
    }
    AccountPage.prototype.fetchPersonalInfo = function () {
        var _this = this;
        this.context.doGet("/")
            .then(function (response) {
            _this.setState(_this.DEFAULT_STATE);
            var formFields = response.data;
            if (!formFields.attributes) {
                formFields.attributes = { locale: [locale] };
            }
            else if (!formFields.attributes.locale) {
                formFields.attributes.locale = [locale];
            }
            _this.setState(__assign({ formFields: formFields }));
        });
    };
    AccountPage.prototype.render = function () {
        var _this = this;
        var fields = this.state.formFields;
        return (React.createElement(ContentPage_1.ContentPage, { title: "personalInfoHtmlTitle", introMessage: "personalSubMessage" },
            React.createElement(react_core_1.PageSection, { isFilled: true, variant: react_core_1.PageSectionVariants.light },
                React.createElement(react_core_1.TextContent, { className: "pf-u-mb-lg" },
                    React.createElement(react_core_1.Text, { component: react_core_1.TextVariants.small }, Msg_1.Msg.localize('allFieldsRequired'))),
                React.createElement(react_core_1.Form, { onSubmit: function (event) { return _this.handleSubmit(event); }, className: "personal-info-form" },
                    !this.isRegistrationEmailAsUsername && fields.username != undefined && (React.createElement(react_core_1.FormGroup, { label: Msg_1.Msg.localize("username"), fieldId: "user-name", helperTextInvalid: this.state.errors.username, validated: this.state.errors.username !== ""
                            ? react_core_1.ValidatedOptions.error
                            : react_core_1.ValidatedOptions.default },
                        this.isEditUserNameAllowed && React.createElement(this.UsernameInput, null),
                        !this.isEditUserNameAllowed && (React.createElement(this.RestrictedUsernameInput, null)))),
                    !this.isUpdateEmailFeatureEnabled && React.createElement(react_core_1.FormGroup, { label: Msg_1.Msg.localize('email'), fieldId: "email-address", helperTextInvalid: this.state.errors.email, validated: this.state.errors.email !== ""
                            ? react_core_1.ValidatedOptions.error
                            : react_core_1.ValidatedOptions.default },
                        React.createElement(react_core_1.TextInput, { isRequired: true, type: "email", id: "email-address", name: "email", maxLength: 254, value: fields.email, onChange: this.handleChange, validated: this.state.errors.email !== ""
                                ? react_core_1.ValidatedOptions.error
                                : react_core_1.ValidatedOptions.default })),
                    this.isUpdateEmailFeatureEnabled && React.createElement(react_core_1.FormGroup, { label: Msg_1.Msg.localize('email'), fieldId: "email-address" },
                        React.createElement(react_core_1.InputGroup, null,
                            React.createElement(react_core_1.TextInput, { isDisabled: true, type: "email", id: "email-address", name: "email", value: fields.email }),
                            this.isUpdateEmailActionEnabled && (!this.isRegistrationEmailAsUsername || this.isEditUserNameAllowed) &&
                                React.createElement(KeycloakContext_1.KeycloakContext.Consumer, null, function (keycloak) { return (React.createElement(react_core_1.Button, { id: "update-email-btn", variant: "link", onClick: function () { return _this.handleEmailUpdate(keycloak); }, icon: React.createElement(react_icons_1.ExternalLinkSquareAltIcon, null), iconPosition: "right" },
                                    React.createElement(Msg_1.Msg, { msgKey: "updateEmail" }))); }))),
                    React.createElement(react_core_1.FormGroup, { label: Msg_1.Msg.localize("firstName"), fieldId: "first-name", helperTextInvalid: this.state.errors.firstName, validated: this.state.errors.firstName !== ""
                            ? react_core_1.ValidatedOptions.error
                            : react_core_1.ValidatedOptions.default },
                        React.createElement(react_core_1.TextInput, { isRequired: true, type: "text", id: "first-name", name: "firstName", maxLength: 254, value: fields.firstName, onChange: this.handleChange, validated: this.state.errors.firstName !== ""
                                ? react_core_1.ValidatedOptions.error
                                : react_core_1.ValidatedOptions.default })),
                    React.createElement(react_core_1.FormGroup, { label: Msg_1.Msg.localize("lastName"), fieldId: "last-name", helperTextInvalid: this.state.errors.lastName, validated: this.state.errors.lastName !== ""
                            ? react_core_1.ValidatedOptions.error
                            : react_core_1.ValidatedOptions.default },
                        React.createElement(react_core_1.TextInput, { isRequired: true, type: "text", id: "last-name", name: "lastName", maxLength: 254, value: fields.lastName, onChange: this.handleChange, validated: this.state.errors.lastName !== ""
                                ? react_core_1.ValidatedOptions.error
                                : react_core_1.ValidatedOptions.default })),
                    features.isInternationalizationEnabled && (React.createElement(react_core_1.FormGroup, { label: Msg_1.Msg.localize("selectLocale"), isRequired: true, fieldId: "locale" },
                        React.createElement(LocaleSelectors_1.LocaleSelector, { id: "locale-selector", value: fields.attributes.locale || "", onChange: function (value) {
                                return _this.setState({
                                    errors: _this.state.errors,
                                    formFields: __assign(__assign({}, _this.state.formFields), { attributes: __assign(__assign({}, _this.state.formFields.attributes), { locale: [value] }) }),
                                });
                            } }))),
                    React.createElement(react_core_1.ActionGroup, null,
                        React.createElement(react_core_1.Button, { type: "submit", id: "save-btn", variant: "primary", isDisabled: Object.values(this.state.errors).filter(function (e) { return e !== ""; })
                                .length !== 0 },
                            React.createElement(Msg_1.Msg, { msgKey: "doSave" })),
                        React.createElement(react_core_1.Button, { id: "cancel-btn", variant: "link", onClick: this.handleCancel },
                            React.createElement(Msg_1.Msg, { msgKey: "doCancel" })))),
                this.isDeleteAccountAllowed && (React.createElement("div", { id: "delete-account", style: { marginTop: "30px" } },
                    React.createElement(react_core_1.ExpandableSection, { toggleText: Msg_1.Msg.localize("deleteAccount") },
                        React.createElement(react_core_1.Grid, { hasGutter: true },
                            React.createElement(react_core_1.GridItem, { span: 6 },
                                React.createElement("p", null,
                                    React.createElement(Msg_1.Msg, { msgKey: "deleteAccountWarning" }))),
                            React.createElement(react_core_1.GridItem, { span: 4 },
                                React.createElement(KeycloakContext_1.KeycloakContext.Consumer, null, function (keycloak) { return (React.createElement(react_core_1.Button, { id: "delete-account-btn", variant: "danger", onClick: function () { return _this.handleDelete(keycloak); }, className: "delete-button" },
                                    React.createElement(Msg_1.Msg, { msgKey: "doDelete" }))); })),
                            React.createElement(react_core_1.GridItem, { span: 2 }))))))));
    };
    AccountPage.contextType = AccountServiceContext_1.AccountServiceContext;
    return AccountPage;
}(React.Component));
exports.AccountPage = AccountPage;
;
