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
exports.SigningInPage = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_core_1 = require("@patternfly/react-core");
var AIACommand_1 = require("../../util/AIACommand");
var TimeUtil_1 = require("../../util/TimeUtil");
var AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
var ContinueCancelModal_1 = require("../../widgets/ContinueCancelModal");
var Msg_1 = require("../../widgets/Msg");
var ContentPage_1 = require("../ContentPage");
var ContentAlert_1 = require("../ContentAlert");
var KeycloakContext_1 = require("../../keycloak-service/KeycloakContext");
/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2018 Red Hat Inc.
 */
var SigningInPage = /** @class */ (function (_super) {
    __extends(SigningInPage, _super);
    function SigningInPage(props, context) {
        var _this = _super.call(this, props) || this;
        _this.handleRemove = function (credentialId, userLabel) {
            _this.context.doDelete("/credentials/" + encodeURIComponent(credentialId)).then(function () {
                _this.getCredentialContainers();
                ContentAlert_1.ContentAlert.success("successRemovedMessage", [userLabel]);
            });
        };
        _this.context = context;
        _this.state = {
            credentialContainers: new Map(),
        };
        _this.getCredentialContainers();
        return _this;
    }
    SigningInPage.prototype.getCredentialContainers = function () {
        var _this = this;
        this.context.doGet("/credentials").then(function (response) {
            var allContainers = new Map();
            var containers = response.data || [];
            containers.forEach(function (container) {
                var categoryMap = allContainers.get(container.category);
                if (!categoryMap) {
                    categoryMap = new Map();
                    allContainers.set(container.category, categoryMap);
                }
                categoryMap.set(container.type, container);
            });
            _this.setState({ credentialContainers: allContainers });
        });
    };
    SigningInPage.credElementId = function (credType, credId, item) {
        return "".concat(credType, "-").concat(item, "-").concat(credId.substring(0, 8));
    };
    SigningInPage.prototype.render = function () {
        return (React.createElement(ContentPage_1.ContentPage, { title: "signingIn", introMessage: "signingInSubMessage" }, this.renderCategories()));
    };
    SigningInPage.prototype.renderCategories = function () {
        var _this = this;
        return Array.from(this.state.credentialContainers.keys()).map(function (category) { return (React.createElement(react_core_1.PageSection, { key: category, variant: react_core_1.PageSectionVariants.light },
            React.createElement(react_core_1.Title, { id: "".concat(category, "-categ-title"), headingLevel: "h2", size: "xl" },
                React.createElement(Msg_1.Msg, { msgKey: category })),
            _this.renderTypes(category))); });
    };
    SigningInPage.prototype.renderTypes = function (category) {
        var _this = this;
        var credTypeMap = this.state.credentialContainers.get(category);
        return (React.createElement(KeycloakContext_1.KeycloakContext.Consumer, null, function (keycloak) { return (React.createElement(React.Fragment, null, Array.from(credTypeMap.keys()).map(function (credType, index, typeArray) { return [
            _this.renderCredTypeTitle(credTypeMap.get(credType), keycloak, category),
            _this.renderUserCredentials(credTypeMap, credType, keycloak),
        ]; }))); }));
    };
    SigningInPage.prototype.renderEmptyRow = function (type, isLast) {
        if (isLast)
            return; // don't put empty row at the end
        return (React.createElement(react_core_1.DataListItem, { "aria-labelledby": "empty-list-item-" + type },
            React.createElement(react_core_1.DataListItemRow, { key: "empty-row-" + type },
                React.createElement(react_core_1.DataListItemCells, { dataListCells: [React.createElement(react_core_1.DataListCell, null)] }))));
    };
    SigningInPage.prototype.renderUserCredentials = function (credTypeMap, credType, keycloak) {
        var _this = this;
        var credContainer = credTypeMap.get(credType);
        var userCredentialMetadatas = credContainer.userCredentialMetadatas;
        var removeable = credContainer.removeable;
        var type = credContainer.type;
        var displayName = credContainer.displayName;
        if (!userCredentialMetadatas || userCredentialMetadatas.length === 0) {
            var localizedDisplayName = Msg_1.Msg.localize(displayName);
            return (React.createElement(react_core_1.DataList, { "aria-label": Msg_1.Msg.localize('notSetUp', [localizedDisplayName]), className: "pf-u-mb-xl" },
                React.createElement(react_core_1.DataListItem, { key: 'no-credentials-list-item', "aria-labelledby": Msg_1.Msg.localize('notSetUp', [localizedDisplayName]) },
                    React.createElement(react_core_1.DataListItemRow, { key: 'no-credentials-list-item-row', className: "pf-u-align-items-center" },
                        React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                                React.createElement(react_core_1.DataListCell, { key: 'no-credentials-cell-0' }),
                                React.createElement(react_core_1.EmptyState, { id: "".concat(type, "-not-set-up"), key: 'no-credentials-cell-1', variant: react_core_1.EmptyStateVariant.xs },
                                    React.createElement(react_core_1.EmptyStateBody, null,
                                        React.createElement(Msg_1.Msg, { msgKey: 'notSetUp', params: [localizedDisplayName] }))),
                                React.createElement(react_core_1.DataListCell, { key: 'no-credentials-cell-2' })
                            ] })))));
        }
        userCredentialMetadatas.forEach(function (credentialMetadata) {
            var credential = credentialMetadata.credential;
            if (!credential.userLabel)
                credential.userLabel = Msg_1.Msg.localize(credential.type);
            if (credential.hasOwnProperty('createdDate') && credential.createdDate && credential.createdDate > 0) {
                credential.strCreatedDate = TimeUtil_1.default.format(credential.createdDate);
            }
        });
        var updateAIA;
        if (credContainer.updateAction) {
            updateAIA = new AIACommand_1.AIACommand(keycloak, credContainer.updateAction);
        }
        var maxWidth = { maxWidth: 689 };
        return (React.createElement(React.Fragment, { key: 'userCredentialMetadatas' },
            " ",
            userCredentialMetadatas.map(function (credentialMetadata) { return (React.createElement(React.Fragment, null,
                (credentialMetadata.infoMessage && !credentialMetadata.warningMessageTitle && !credentialMetadata.warningMessageDescription) &&
                    React.createElement(react_core_1.Alert, { variant: "default", className: "pf-u-mb-md", isInline: true, isPlain: true, title: Msg_1.Msg.localize(JSON.parse(credentialMetadata.infoMessage).key, JSON.parse(credentialMetadata.infoMessage).parameters) }),
                (credentialMetadata.warningMessageTitle && credentialMetadata.warningMessageDescription) &&
                    React.createElement(react_core_1.Alert, { variant: "warning", className: "pf-u-mb-md", isInline: true, title: Msg_1.Msg.localize(JSON.parse(credentialMetadata.warningMessageTitle).key, JSON.parse(credentialMetadata.warningMessageTitle).parameters), style: maxWidth },
                        React.createElement("p", null, Msg_1.Msg.localize(JSON.parse(credentialMetadata.warningMessageDescription).key, JSON.parse(credentialMetadata.warningMessageDescription).parameters))),
                React.createElement(react_core_1.DataList, { "aria-label": "user credential", className: "pf-u-mb-xl" },
                    React.createElement(react_core_1.DataListItem, { id: "".concat(SigningInPage.credElementId(type, credentialMetadata.credential.id, 'row')), key: 'credential-list-item-' + credentialMetadata.credential.id, "aria-labelledby": 'credential-list-item-' + credentialMetadata.credential.userLabel },
                        React.createElement(react_core_1.DataListItemRow, { key: 'userCredentialRow-' + credentialMetadata.credential.id, className: "pf-u-align-items-center" },
                            React.createElement(react_core_1.DataListItemCells, { dataListCells: _this.credentialRowCells(credentialMetadata, type) }),
                            React.createElement(CredentialAction, { credential: credentialMetadata.credential, removeable: removeable, updateAction: updateAIA, credRemover: _this.handleRemove })))))); }),
            " "));
    };
    SigningInPage.prototype.credentialRowCells = function (credMetadata, type) {
        var credRowCells = [];
        var credential = credMetadata.credential;
        var maxWidth = { "--pf-u-max-width--MaxWidth": "300px" };
        credRowCells.push(React.createElement(react_core_1.DataListCell, { id: "".concat(SigningInPage.credElementId(type, credential.id, 'label')), key: 'userLabel-' + credential.id, className: "pf-u-max-width", style: maxWidth }, credential.userLabel));
        if (credential.strCreatedDate) {
            credRowCells.push(React.createElement(react_core_1.DataListCell, { id: "".concat(SigningInPage.credElementId(type, credential.id, "created-at")), key: "created-" + credential.id },
                React.createElement("strong", { className: "pf-u-mr-md" },
                    React.createElement(Msg_1.Msg, { msgKey: "credentialCreatedAt" }),
                    " "),
                credential.strCreatedDate));
            credRowCells.push(React.createElement(react_core_1.DataListCell, { key: "spacer-" + credential.id }));
        }
        return credRowCells;
    };
    SigningInPage.prototype.renderCredTypeTitle = function (credContainer, keycloak, category) {
        var _this = this;
        if (!credContainer.hasOwnProperty("helptext") &&
            !credContainer.hasOwnProperty("createAction"))
            return;
        var setupAction;
        if (credContainer.createAction) {
            setupAction = new AIACommand_1.AIACommand(keycloak, credContainer.createAction);
        }
        var credContainerDisplayName = Msg_1.Msg.localize(credContainer.displayName);
        return (React.createElement(React.Fragment, { key: "credTypeTitle-" + credContainer.type },
            React.createElement(react_core_1.Split, { className: "pf-u-mt-lg pf-u-mb-lg" },
                React.createElement(react_core_1.SplitItem, null,
                    React.createElement(react_core_1.Title, { headingLevel: "h3", size: "md", className: "pf-u-mb-md" },
                        React.createElement("span", { className: "cred-title pf-u-display-block", id: "".concat(credContainer.type, "-cred-title") },
                            React.createElement(Msg_1.Msg, { msgKey: credContainer.displayName }))),
                    React.createElement("span", { id: "".concat(credContainer.type, "-cred-help") }, credContainer.helptext && (React.createElement(Msg_1.Msg, { msgKey: credContainer.helptext })))),
                React.createElement(react_core_1.SplitItem, { isFilled: true },
                    credContainer.createAction && (React.createElement("div", { id: "mob-setUpAction-" + credContainer.type, className: "pf-u-display-none-on-lg pf-u-float-right" },
                        React.createElement(react_core_1.Dropdown, { isPlain: true, position: react_core_1.DropdownPosition.right, toggle: React.createElement(react_core_1.KebabToggle, { onToggle: function (isOpen) {
                                    credContainer.open = isOpen;
                                    _this.setState({
                                        credentialContainers: new Map(_this.state.credentialContainers),
                                    });
                                } }), isOpen: credContainer.open, dropdownItems: [
                                React.createElement("button", { id: "mob-".concat(credContainer.type, "-set-up"), className: "pf-c-button pf-m-link", type: "button", onClick: function () {
                                        return setupAction.execute();
                                    } },
                                    React.createElement("span", { className: "pf-c-button__icon" },
                                        React.createElement("i", { className: "fa fa-plus-circle", "aria-hidden": "true" })),
                                    React.createElement(Msg_1.Msg, { msgKey: "setUpNew", params: [
                                            credContainerDisplayName,
                                        ] })),
                            ] }))),
                    credContainer.createAction && (React.createElement("div", { id: "setUpAction-" + credContainer.type, className: "pf-u-display-none pf-u-display-inline-flex-on-lg pf-u-float-right" },
                        React.createElement("button", { id: "".concat(credContainer.type, "-set-up"), className: "pf-c-button pf-m-link", type: "button", onClick: function () { return setupAction.execute(); } },
                            React.createElement("span", { className: "pf-c-button__icon" },
                                React.createElement("i", { className: "fa fa-plus-circle", "aria-hidden": "true" })),
                            React.createElement(Msg_1.Msg, { msgKey: "setUpNew", params: [credContainerDisplayName] }))))))));
    };
    SigningInPage.contextType = AccountServiceContext_1.AccountServiceContext;
    return SigningInPage;
}(React.Component));
;
var CredentialAction = /** @class */ (function (_super) {
    __extends(CredentialAction, _super);
    function CredentialAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CredentialAction.prototype.render = function () {
        var _this = this;
        if (this.props.updateAction) {
            return (React.createElement(react_core_1.DataListAction, { "aria-labelledby": Msg_1.Msg.localize('updateCredAriaLabel'), "aria-label": Msg_1.Msg.localize('updateCredAriaLabel'), id: "updateAction-" + this.props.credential.id },
                React.createElement(react_core_1.Button, { variant: "secondary", id: "".concat(SigningInPage.credElementId(this.props.credential.type, this.props.credential.id, "update")), onClick: function () { return _this.props.updateAction.execute(); } },
                    React.createElement(Msg_1.Msg, { msgKey: "update" }))));
        }
        if (this.props.removeable) {
            var userLabel_1 = this.props.credential.userLabel;
            return (React.createElement(react_core_1.DataListAction, { "aria-label": Msg_1.Msg.localize('removeCredAriaLabel'), "aria-labelledby": Msg_1.Msg.localize('removeCredAriaLabel'), id: 'removeAction-' + this.props.credential.id },
                React.createElement(ContinueCancelModal_1.ContinueCancelModal, { buttonTitle: 'remove', buttonVariant: 'danger', buttonId: "".concat(SigningInPage.credElementId(this.props.credential.type, this.props.credential.id, 'remove')), modalTitle: Msg_1.Msg.localize('removeCred', [userLabel_1]), modalMessage: Msg_1.Msg.localize('stopUsingCred', [userLabel_1]), onContinue: function () { return _this.props.credRemover(_this.props.credential.id, userLabel_1); } })));
        }
        return React.createElement(React.Fragment, null);
    };
    return CredentialAction;
}(React.Component));
var SigningInPageWithRouter = (0, react_router_dom_1.withRouter)(SigningInPage);
exports.SigningInPage = SigningInPageWithRouter;
