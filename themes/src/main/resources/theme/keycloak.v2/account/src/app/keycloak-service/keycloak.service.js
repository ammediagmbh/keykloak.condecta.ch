"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakService = void 0;
var KeycloakService = /** @class */ (function () {
    function KeycloakService(keycloak) {
        this.keycloakAuth = keycloak;
    }
    KeycloakService.prototype.authenticated = function () {
        return this.keycloakAuth.authenticated ? this.keycloakAuth.authenticated : false;
    };
    KeycloakService.prototype.audiencePresent = function () {
        if (this.keycloakAuth.tokenParsed) {
            var audience = this.keycloakAuth.tokenParsed['aud'];
            return audience === 'account' || (Array.isArray(audience) && audience.indexOf('account') >= 0);
        }
        return false;
    };
    KeycloakService.prototype.login = function (options) {
        this.keycloakAuth.login(options);
    };
    KeycloakService.prototype.logout = function (redirectUri) {
        if (redirectUri === void 0) { redirectUri = baseUrl; }
        this.keycloakAuth.logout({ redirectUri: redirectUri });
    };
    KeycloakService.prototype.account = function () {
        this.keycloakAuth.accountManagement();
    };
    KeycloakService.prototype.authServerUrl = function () {
        var authServerUrl = this.keycloakAuth.authServerUrl;
        return authServerUrl.charAt(authServerUrl.length - 1) === '/' ? authServerUrl : authServerUrl + '/';
    };
    KeycloakService.prototype.realm = function () {
        return this.keycloakAuth.realm;
    };
    KeycloakService.prototype.getToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.keycloakAuth.token) {
                _this.keycloakAuth
                    .updateToken(5)
                    .then(function () {
                    resolve(_this.keycloakAuth.token);
                })
                    .catch(function () {
                    reject('Failed to refresh token');
                });
            }
            else {
                reject('Not logged in');
            }
        });
    };
    return KeycloakService;
}());
exports.KeycloakService = KeycloakService;
