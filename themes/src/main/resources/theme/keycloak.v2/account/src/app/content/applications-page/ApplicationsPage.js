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
exports.ApplicationsPage = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var react_icons_1 = require("@patternfly/react-icons");
var ContentPage_1 = require("../ContentPage");
var ContinueCancelModal_1 = require("../../widgets/ContinueCancelModal");
var AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
var Msg_1 = require("../../widgets/Msg");
var ApplicationsPage = /** @class */ (function (_super) {
    __extends(ApplicationsPage, _super);
    function ApplicationsPage(props, context) {
        var _this = _super.call(this, props) || this;
        _this.removeConsent = function (clientId) {
            _this.context.doDelete("/applications/" + encodeURIComponent(clientId) + "/consent")
                .then(function () {
                _this.fetchApplications();
            });
        };
        _this.onToggle = function (row) {
            var newIsRowOpen = _this.state.isRowOpen;
            newIsRowOpen[row] = !newIsRowOpen[row];
            _this.setState({ isRowOpen: newIsRowOpen });
        };
        _this.context = context;
        _this.state = {
            isRowOpen: [],
            applications: []
        };
        _this.fetchApplications();
        return _this;
    }
    ApplicationsPage.prototype.fetchApplications = function () {
        var _this = this;
        this.context.doGet("/applications")
            .then(function (response) {
            var applications = response.data || [];
            _this.setState({
                isRowOpen: new Array(applications.length).fill(false),
                applications: applications
            });
        });
    };
    ApplicationsPage.prototype.elementId = function (item, application) {
        return "application-".concat(item, "-").concat(application.clientId);
    };
    ApplicationsPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(ContentPage_1.ContentPage, { title: Msg_1.Msg.localize('applicationsPageTitle'), introMessage: Msg_1.Msg.localize('applicationsPageSubTitle') },
            React.createElement(react_core_1.PageSection, { isFilled: true, variant: react_core_1.PageSectionVariants.light },
                React.createElement(react_core_1.Stack, { hasGutter: true },
                    React.createElement(react_core_1.DataList, { id: "applications-list", "aria-label": Msg_1.Msg.localize('applicationsPageTitle') },
                        React.createElement(react_core_1.DataListItem, { id: "applications-list-header", "aria-labelledby": "Columns names" },
                            React.createElement(react_core_1.DataListItemRow, null,
                                "// invisible toggle allows headings to line up properly",
                                React.createElement("span", { style: { visibility: 'hidden', height: 55 } },
                                    React.createElement(react_core_1.DataListToggle, { isExpanded: false, id: 'applications-list-header-invisible-toggle', "aria-controls": "hidden" })),
                                React.createElement(react_core_1.DataListItemCells, { dataListCells: [
                                        React.createElement(react_core_1.DataListCell, { key: 'applications-list-client-id-header', width: 2, className: "pf-u-pt-md" },
                                            React.createElement("strong", null,
                                                React.createElement(Msg_1.Msg, { msgKey: 'applicationName' }))),
                                        React.createElement(react_core_1.DataListCell, { key: 'applications-list-app-type-header', width: 2, className: "pf-u-pt-md" },
                                            React.createElement("strong", null,
                                                React.createElement(Msg_1.Msg, { msgKey: 'applicationType' }))),
                                        React.createElement(react_core_1.DataListCell, { key: 'applications-list-status', width: 2, className: "pf-u-pt-md" },
                                            React.createElement("strong", null,
                                                React.createElement(Msg_1.Msg, { msgKey: 'status' }))),
                                    ] }))),
                        this.state.applications.map(function (application, appIndex) {
                            return (React.createElement(react_core_1.DataListItem, { id: _this.elementId("client-id", application), key: 'application-' + appIndex, "aria-labelledby": "applications-list", isExpanded: _this.state.isRowOpen[appIndex] },
                                React.createElement(react_core_1.DataListItemRow, { className: "pf-u-align-items-center" },
                                    React.createElement(react_core_1.DataListToggle, { onClick: function () { return _this.onToggle(appIndex); }, isExpanded: _this.state.isRowOpen[appIndex], id: _this.elementId('toggle', application), "aria-controls": _this.elementId("expandable", application) }),
                                    React.createElement(react_core_1.DataListItemCells, { className: "pf-u-align-items-center", dataListCells: [
                                            React.createElement(react_core_1.DataListCell, { id: _this.elementId('name', application), width: 2, key: 'app-' + appIndex },
                                                React.createElement(react_core_1.Button, { className: "pf-u-pl-0 title-case", component: "a", variant: "link", onClick: function () { return window.open(application.effectiveUrl); } },
                                                    application.clientName || application.clientId,
                                                    " ",
                                                    React.createElement(react_icons_1.ExternalLinkAltIcon, null))),
                                            React.createElement(react_core_1.DataListCell, { id: _this.elementId('internal', application), width: 2, key: 'internal-' + appIndex },
                                                application.userConsentRequired ? Msg_1.Msg.localize('thirdPartyApp') : Msg_1.Msg.localize('internalApp'),
                                                application.offlineAccess ? ', ' + Msg_1.Msg.localize('offlineAccess') : ''),
                                            React.createElement(react_core_1.DataListCell, { id: _this.elementId('status', application), width: 2, key: 'status-' + appIndex }, application.inUse ? Msg_1.Msg.localize('inUse') : Msg_1.Msg.localize('notInUse'))
                                        ] })),
                                React.createElement(react_core_1.DataListContent, { className: "pf-u-pl-35xl", hasNoPadding: false, "aria-label": Msg_1.Msg.localize('applicationDetails'), id: _this.elementId("expandable", application), isHidden: !_this.state.isRowOpen[appIndex] },
                                    React.createElement(react_core_1.DescriptionList, null,
                                        React.createElement(react_core_1.DescriptionListGroup, null,
                                            React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('client')),
                                            React.createElement(react_core_1.DescriptionListDescription, null, application.clientId)),
                                        application.description &&
                                            React.createElement(react_core_1.DescriptionListGroup, null,
                                                React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('description')),
                                                React.createElement(react_core_1.DescriptionListDescription, null, application.description)),
                                        application.effectiveUrl &&
                                            React.createElement(react_core_1.DescriptionListGroup, null,
                                                React.createElement(react_core_1.DescriptionListTerm, null, "URL"),
                                                React.createElement(react_core_1.DescriptionListDescription, { id: _this.elementId("effectiveurl", application) }, application.effectiveUrl.split('"'))),
                                        application.consent &&
                                            React.createElement(React.Fragment, null,
                                                React.createElement(react_core_1.DescriptionListGroup, null,
                                                    React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('hasAccessTo')),
                                                    application.consent.grantedScopes.map(function (scope, scopeIndex) {
                                                        return (React.createElement(React.Fragment, { key: 'scope-' + scopeIndex },
                                                            React.createElement(react_core_1.DescriptionListDescription, null,
                                                                React.createElement(react_icons_1.CheckIcon, null),
                                                                Msg_1.Msg.localize(scope.name))));
                                                    })),
                                                application.tosUri &&
                                                    React.createElement(react_core_1.DescriptionListGroup, null,
                                                        React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('termsOfService')),
                                                        React.createElement(react_core_1.DescriptionListDescription, null, application.tosUri)),
                                                application.policyUri &&
                                                    React.createElement(react_core_1.DescriptionListGroup, null,
                                                        React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('policy')),
                                                        React.createElement(react_core_1.DescriptionListDescription, null, application.policyUri)),
                                                application.logoUri &&
                                                    React.createElement(react_core_1.DescriptionListGroup, null,
                                                        React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('logo')),
                                                        React.createElement(react_core_1.DescriptionListDescription, null,
                                                            React.createElement("img", { src: application.logoUri }))),
                                                React.createElement(react_core_1.DescriptionListGroup, null,
                                                    React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('accessGrantedOn') + ': '),
                                                    React.createElement(react_core_1.DescriptionListDescription, null, new Intl.DateTimeFormat(locale, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        second: 'numeric'
                                                    }).format(application.consent.createDate))))),
                                    (application.consent || application.offlineAccess) &&
                                        React.createElement(react_core_1.Grid, { hasGutter: true },
                                            React.createElement("hr", null),
                                            React.createElement(react_core_1.GridItem, null,
                                                React.createElement(React.Fragment, null,
                                                    React.createElement(ContinueCancelModal_1.ContinueCancelModal, { buttonTitle: Msg_1.Msg.localize('removeButton'), buttonVariant: 'secondary' // defaults to 'primary'
                                                        , modalTitle: Msg_1.Msg.localize('removeModalTitle'), modalMessage: Msg_1.Msg.localize('removeModalMessage', [application.clientId]), modalContinueButtonLabel: Msg_1.Msg.localize('confirmButton'), onContinue: function () { return _this.removeConsent(application.clientId); } }))),
                                            React.createElement(react_core_1.GridItem, null,
                                                React.createElement(react_icons_1.InfoAltIcon, null),
                                                " ",
                                                Msg_1.Msg.localize('infoMessage'))))));
                        }))))));
    };
    ApplicationsPage.contextType = AccountServiceContext_1.AccountServiceContext;
    return ApplicationsPage;
}(React.Component));
exports.ApplicationsPage = ApplicationsPage;
;
