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
exports.Main = void 0;
var React = require("react");
var ReactDOM = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./App");
var ContentPages_1 = require("./ContentPages");
var keycloak_service_1 = require("./keycloak-service/keycloak.service");
var KeycloakContext_1 = require("./keycloak-service/KeycloakContext");
var account_service_1 = require("./account-service/account.service");
var AccountServiceContext_1 = require("./account-service/AccountServiceContext");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        return _super.call(this, props) || this;
    }
    Main.prototype.componentDidMount = function () {
        isReactLoading = false;
        toggleReact();
    };
    Main.prototype.render = function () {
        var keycloakService = new keycloak_service_1.KeycloakService(keycloak);
        return (React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement(KeycloakContext_1.KeycloakContext.Provider, { value: keycloakService },
                React.createElement(AccountServiceContext_1.AccountServiceContext.Provider, { value: new account_service_1.AccountServiceClient(keycloakService) },
                    React.createElement(App_1.App, null)))));
    };
    return Main;
}(React.Component));
exports.Main = Main;
;
var e = React.createElement;
function removeHidden(items) {
    var visible = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (item.hidden && eval(item.hidden))
            continue;
        if ((0, ContentPages_1.isExpansion)(item)) {
            visible.push(item);
            item.content = removeHidden(item.content);
            if (item.content.length === 0) {
                visible.pop(); // remove empty expansion
            }
        }
        else {
            visible.push(item);
        }
    }
    return visible;
}
content = removeHidden(content);
(0, ContentPages_1.initGroupAndItemIds)();
function loadModule(modulePage) {
    return new Promise(function (resolve, reject) {
        console.log('loading: ' + resourceUrl + modulePage.modulePath);
        Promise.resolve("".concat(resourceUrl + modulePage.modulePath)).then(function (s) { return require(s); }).then(function (module) {
            modulePage.module = module;
            resolve(modulePage);
        }).catch(function (error) {
            console.warn('Unable to load ' + modulePage.label + ' because ' + error.message);
            reject(modulePage);
        });
    });
}
;
var moduleLoaders = [];
(0, ContentPages_1.flattenContent)(content).forEach(function (item) {
    if ((0, ContentPages_1.isModulePageDef)(item)) {
        moduleLoaders.push(loadModule(item));
    }
});
// load content modules and start
Promise.all(moduleLoaders).then(function () {
    var domContainer = document.querySelector('#main_react_container');
    ReactDOM.render(e(Main), domContainer);
});
