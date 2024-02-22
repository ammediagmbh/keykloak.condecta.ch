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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentPage = void 0;
var React = require("react");
var react_core_1 = require("@patternfly/react-core");
var react_icons_1 = require("@patternfly/react-icons");
var Msg_1 = require("../widgets/Msg");
var ContentAlert_1 = require("./ContentAlert");
/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
var ContentPage = /** @class */ (function (_super) {
    __extends(ContentPage, _super);
    function ContentPage(props) {
        return _super.call(this, props) || this;
    }
    ContentPage.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(ContentAlert_1.ContentAlert, null),
            React.createElement(react_core_1.PageSection, { variant: react_core_1.PageSectionVariants.light, className: "pf-u-pb-xs" },
                React.createElement(react_core_1.Split, null,
                    React.createElement(react_core_1.SplitItem, { isFilled: true },
                        React.createElement(react_core_1.TextContent, null,
                            React.createElement(react_core_1.Title, { headingLevel: "h1", size: "2xl", className: "pf-u-mb-xl" },
                                React.createElement(Msg_1.Msg, { msgKey: this.props.title })),
                            this.props.introMessage && (React.createElement(react_core_1.Text, { component: "p" },
                                React.createElement(Msg_1.Msg, { msgKey: this.props.introMessage }))))),
                    this.props.onRefresh && (React.createElement(react_core_1.SplitItem, null,
                        React.createElement(react_core_1.Tooltip, { content: React.createElement(Msg_1.Msg, { msgKey: "refreshPage" }) },
                            React.createElement(react_core_1.Button, { "aria-label": Msg_1.Msg.localize('refreshPage'), id: "refresh-page", variant: "link", onClick: this.props.onRefresh, icon: React.createElement(react_icons_1.SyncAltIcon, null) },
                                React.createElement(Msg_1.Msg, { msgKey: "refresh" }))))))),
            this.props.children));
    };
    return ContentPage;
}(React.Component));
exports.ContentPage = ContentPage;
;
