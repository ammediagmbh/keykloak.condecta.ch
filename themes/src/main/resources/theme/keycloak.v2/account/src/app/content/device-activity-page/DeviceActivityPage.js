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
exports.DeviceActivityPage = void 0;
var React = require("react");
var AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
var TimeUtil_1 = require("../../util/TimeUtil");
var react_core_1 = require("@patternfly/react-core");
var react_icons_1 = require("@patternfly/react-icons");
var Msg_1 = require("../../widgets/Msg");
var ContinueCancelModal_1 = require("../../widgets/ContinueCancelModal");
var KeycloakContext_1 = require("../../keycloak-service/KeycloakContext");
var ContentPage_1 = require("../ContentPage");
var ContentAlert_1 = require("../ContentAlert");
/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
var DeviceActivityPage = /** @class */ (function (_super) {
    __extends(DeviceActivityPage, _super);
    function DeviceActivityPage(props, context) {
        var _this = _super.call(this, props) || this;
        _this.signOutAll = function (keycloakService) {
            _this.context.doDelete("/sessions")
                .then(function () {
                keycloakService.logout();
            });
        };
        _this.signOutSession = function (device, session) {
            _this.context.doDelete("/sessions/" + encodeURIComponent(session.id))
                .then(function () {
                _this.fetchDevices();
                ContentAlert_1.ContentAlert.success('signedOutSession', [session.browser, device.os]);
            });
        };
        _this.context = context;
        _this.state = {
            devices: []
        };
        _this.fetchDevices();
        return _this;
    }
    DeviceActivityPage.prototype.fetchDevices = function () {
        var _this = this;
        this.context.doGet("/sessions/devices")
            .then(function (response) {
            console.log({ response: response });
            var devices = _this.moveCurrentToTop(response.data);
            _this.setState({
                devices: devices
            });
        });
    };
    // current device and session should display at the top of their respective lists
    DeviceActivityPage.prototype.moveCurrentToTop = function (devices) {
        var currentDevice = devices[0];
        devices.forEach(function (device, index) {
            if (device.current) {
                currentDevice = device;
                devices.splice(index, 1);
                devices.unshift(device);
            }
        });
        currentDevice.sessions.forEach(function (session, index) {
            if (session.current) {
                var currentSession = currentDevice.sessions.splice(index, 1);
                currentDevice.sessions.unshift(currentSession[0]);
            }
        });
        return devices;
    };
    DeviceActivityPage.prototype.time = function (time) {
        return TimeUtil_1.default.format(time * 1000);
    };
    DeviceActivityPage.prototype.elementId = function (item, session, element) {
        if (element === void 0) { element = 'session'; }
        return "".concat(element, "-").concat(session.id.substring(0, 7), "-").concat(item);
    };
    DeviceActivityPage.prototype.findDeviceTypeIcon = function (session, device) {
        var deviceType = device.mobile;
        if (deviceType === true)
            return (React.createElement(react_icons_1.MobileAltIcon, { id: this.elementId('icon-mobile', session, 'device') }));
        return (React.createElement(react_icons_1.DesktopIcon, { id: this.elementId('icon-desktop', session, 'device') }));
    };
    DeviceActivityPage.prototype.findOS = function (device) {
        if (device.os.toLowerCase().includes('unknown'))
            return Msg_1.Msg.localize('unknownOperatingSystem');
        return device.os;
    };
    DeviceActivityPage.prototype.findOSVersion = function (device) {
        if (device.osVersion.toLowerCase().includes('unknown'))
            return '';
        return device.osVersion;
    };
    DeviceActivityPage.prototype.makeClientsString = function (clients) {
        var clientsString = "";
        clients.forEach(function (client, index) {
            var clientName;
            if (client.hasOwnProperty('clientName') && (client.clientName !== undefined) && (client.clientName !== '')) {
                clientName = Msg_1.Msg.localize(client.clientName);
            }
            else {
                clientName = client.clientId;
            }
            clientsString += clientName;
            if (clients.length > index + 1)
                clientsString += ', ';
        });
        return clientsString;
    };
    DeviceActivityPage.prototype.isShowSignOutAll = function (devices) {
        if (devices.length === 0)
            return false;
        if (devices.length > 1)
            return true;
        if (devices[0].sessions.length > 1)
            return true;
        return false;
    };
    DeviceActivityPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(ContentPage_1.ContentPage, { title: "device-activity", introMessage: "signedInDevicesExplanation" },
            React.createElement(react_core_1.PageSection, { isFilled: true, variant: react_core_1.PageSectionVariants.light },
                React.createElement(react_core_1.Split, { hasGutter: true, className: "pf-u-mb-lg" },
                    React.createElement(react_core_1.SplitItem, { isFilled: true },
                        React.createElement("div", { id: "signedInDevicesTitle", className: "pf-c-content" },
                            React.createElement(react_core_1.Title, { headingLevel: "h2", size: "xl" },
                                React.createElement(Msg_1.Msg, { msgKey: "signedInDevices" })))),
                    React.createElement(react_core_1.SplitItem, null,
                        React.createElement(react_core_1.Tooltip, { content: React.createElement(Msg_1.Msg, { msgKey: "refreshPage" }) },
                            React.createElement(react_core_1.Button, { "aria-describedby": "refresh page", id: "refresh-page", variant: "link", onClick: this.fetchDevices.bind(this), icon: React.createElement(react_icons_1.SyncAltIcon, null) },
                                React.createElement(Msg_1.Msg, { msgKey: "refresh" })))),
                    React.createElement(react_core_1.SplitItem, null,
                        React.createElement(KeycloakContext_1.KeycloakContext.Consumer, null, function (keycloak) { return (_this.isShowSignOutAll(_this.state.devices) &&
                            React.createElement(ContinueCancelModal_1.ContinueCancelModal, { buttonTitle: 'signOutAllDevices', buttonId: 'sign-out-all', modalTitle: 'signOutAllDevices', modalMessage: 'signOutAllDevicesWarning', onContinue: function () { return _this.signOutAll(keycloak); } })); }))),
                React.createElement(react_core_1.DataList, { className: "signed-in-device-list", "aria-label": Msg_1.Msg.localize('signedInDevices') },
                    React.createElement(react_core_1.DataListItem, { "aria-labelledby": 'sessions', id: 'device-activity-sessions' }, this.state.devices.map(function (device, deviceIndex) {
                        return (React.createElement(React.Fragment, null, device.sessions.map(function (session, sessionIndex) {
                            return (React.createElement(React.Fragment, { key: 'device-' + deviceIndex + '-session-' + sessionIndex },
                                React.createElement(react_core_1.DataListItemRow, null,
                                    React.createElement(react_core_1.DataListContent, { "aria-label": "device-sessions-content", isHidden: false, className: "pf-u-flex-grow-1" },
                                        React.createElement(react_core_1.Grid, { id: _this.elementId("item", session), className: "signed-in-device-grid", hasGutter: true },
                                            React.createElement(react_core_1.GridItem, { className: "device-icon", span: 1, rowSpan: 2 },
                                                React.createElement("span", null, _this.findDeviceTypeIcon(session, device))),
                                            React.createElement(react_core_1.GridItem, { sm: 8, md: 9, span: 10 },
                                                React.createElement("span", { id: _this.elementId('browser', session), className: "pf-u-mr-md session-title" },
                                                    _this.findOS(device),
                                                    " ",
                                                    _this.findOSVersion(device),
                                                    " / ",
                                                    session.browser),
                                                session.current &&
                                                    React.createElement(react_core_1.Label, { color: "green", id: _this.elementId('current-badge', session) },
                                                        React.createElement(Msg_1.Msg, { msgKey: "currentSession" }))),
                                            React.createElement(react_core_1.GridItem, { className: "pf-u-text-align-right", sm: 3, md: 2, span: 1 }, !session.current &&
                                                React.createElement(ContinueCancelModal_1.ContinueCancelModal, { buttonTitle: 'doSignOut', buttonId: _this.elementId('sign-out', session), modalTitle: 'doSignOut', buttonVariant: 'secondary', modalMessage: 'signOutWarning', onContinue: function () { return _this.signOutSession(device, session); } })),
                                            React.createElement(react_core_1.GridItem, { span: 11 },
                                                React.createElement(react_core_1.DescriptionList, { columnModifier: { sm: '2Col', lg: '3Col' } },
                                                    React.createElement(react_core_1.DescriptionListGroup, null,
                                                        React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('ipAddress')),
                                                        React.createElement(react_core_1.DescriptionListDescription, { id: _this.elementId('ip', session) }, session.ipAddress)),
                                                    React.createElement(react_core_1.DescriptionListGroup, null,
                                                        React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('lastAccessedOn')),
                                                        React.createElement(react_core_1.DescriptionListDescription, { id: _this.elementId('last-access', session) }, _this.time(session.lastAccess))),
                                                    React.createElement(react_core_1.DescriptionListGroup, null,
                                                        React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('clients')),
                                                        React.createElement(react_core_1.DescriptionListDescription, { id: _this.elementId('clients', session) }, _this.makeClientsString(session.clients))),
                                                    React.createElement(react_core_1.DescriptionListGroup, null,
                                                        React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('started')),
                                                        React.createElement(react_core_1.DescriptionListDescription, { id: _this.elementId('started', session) }, _this.time(session.started))),
                                                    React.createElement(react_core_1.DescriptionListGroup, null,
                                                        React.createElement(react_core_1.DescriptionListTerm, null, Msg_1.Msg.localize('expires')),
                                                        React.createElement(react_core_1.DescriptionListDescription, { id: _this.elementId('expires', session) }, _this.time(session.expires))))))))));
                        })));
                    }))))));
    };
    DeviceActivityPage.contextType = AccountServiceContext_1.AccountServiceContext;
    return DeviceActivityPage;
}(React.Component));
exports.DeviceActivityPage = DeviceActivityPage;
;
