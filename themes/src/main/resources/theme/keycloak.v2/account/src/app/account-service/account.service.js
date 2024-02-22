"use strict";
/*
 * Copyright 2018 Red Hat Inc. and/or its affiliates and other contributors
 * as indicated by the @author tags. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountServiceClient = exports.AccountServiceError = void 0;
var ContentAlert_1 = require("../content/ContentAlert");
var AccountServiceError = /** @class */ (function (_super) {
    __extends(AccountServiceError, _super);
    function AccountServiceError(response) {
        var _this = _super.call(this, response.statusText) || this;
        _this.response = response;
        return _this;
    }
    return AccountServiceError;
}(Error));
exports.AccountServiceError = AccountServiceError;
/**
 *
 * @author Stan Silvert ssilvert@redhat.com (C) 2018 Red Hat Inc.
 */
var AccountServiceClient = /** @class */ (function () {
    function AccountServiceClient(keycloakService) {
        this.kcSvc = keycloakService;
        this.accountUrl = this.kcSvc.authServerUrl() + 'realms/' + this.kcSvc.realm() + '/account';
    }
    AccountServiceClient.prototype.doGet = function (endpoint, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doRequest(endpoint, __assign(__assign({}, config), { method: 'get' }))];
            });
        });
    };
    AccountServiceClient.prototype.doDelete = function (endpoint, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doRequest(endpoint, __assign(__assign({}, config), { method: 'delete' }))];
            });
        });
    };
    AccountServiceClient.prototype.doPost = function (endpoint, body, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doRequest(endpoint, __assign(__assign({}, config), { body: JSON.stringify(body), method: 'post' }))];
            });
        });
    };
    AccountServiceClient.prototype.doPut = function (endpoint, body, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doRequest(endpoint, __assign(__assign({}, config), { body: JSON.stringify(body), method: 'put' }))];
            });
        });
    };
    AccountServiceClient.prototype.doRequest = function (endpoint, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = fetch;
                        _b = [this.makeUrl(endpoint, config).toString()];
                        return [4 /*yield*/, this.makeConfig(config)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_d.sent()]))];
                    case 2:
                        response = _d.sent();
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        _c = response;
                        return [4 /*yield*/, response.json()];
                    case 4:
                        _c.data = _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _d.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        if (!response.ok) {
                            this.handleError(response);
                            throw new AccountServiceError(response);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    AccountServiceClient.prototype.handleError = function (response) {
        if (response !== null && response.status === 401) {
            if (this.kcSvc.authenticated() && !this.kcSvc.audiencePresent()) {
                // authenticated and the audience is not present => not allowed
                window.location.href = baseUrl + '#/forbidden';
            }
            else {
                // session timed out?
                this.kcSvc.login();
            }
        }
        if (response !== null && response.status === 403) {
            window.location.href = baseUrl + '#/forbidden';
        }
        if (response !== null && response.data != null) {
            if (response.data['errors'] != null) {
                for (var _i = 0, _a = response.data['errors']; _i < _a.length; _i++) {
                    var err = _a[_i];
                    ContentAlert_1.ContentAlert.danger(err['errorMessage'], err['params']);
                }
            }
            else {
                ContentAlert_1.ContentAlert.danger("".concat(response.statusText, ": ").concat(response.data['errorMessage'] ? response.data['errorMessage'] : '', " ").concat(response.data['error'] ? response.data['error'] : ''));
            }
            ;
        }
        else {
            ContentAlert_1.ContentAlert.danger(response.statusText);
        }
    };
    AccountServiceClient.prototype.makeUrl = function (endpoint, config) {
        if (endpoint.startsWith('http'))
            return new URL(endpoint);
        var url = new URL(this.accountUrl + endpoint);
        // add request params
        if (config && config.hasOwnProperty('params')) {
            var params_1 = config.params || {};
            Object.keys(params_1).forEach(function (key) { return url.searchParams.append(key, params_1[key]); });
        }
        return url;
    };
    AccountServiceClient.prototype.makeConfig = function (config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        return new Promise(function (resolve) {
            _this.kcSvc.getToken()
                .then(function (token) {
                resolve(__assign(__assign({}, config), { headers: __assign(__assign({ 'Content-Type': 'application/json' }, config.headers), { Authorization: 'Bearer ' + token }) }));
            }).catch(function () {
                _this.kcSvc.login();
            });
        });
    };
    return AccountServiceClient;
}());
exports.AccountServiceClient = AccountServiceClient;
window.addEventListener("unhandledrejection", function (event) {
    event.promise.catch(function (error) {
        if (error instanceof AccountServiceError) {
            // We already handled the error. Ignore unhandled rejection.
            event.preventDefault();
        }
    });
});
