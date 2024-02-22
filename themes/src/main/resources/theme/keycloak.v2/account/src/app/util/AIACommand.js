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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIACommand = void 0;
/**
 * @author Stan Silvert
 */
var AIACommand = /** @class */ (function () {
    function AIACommand(keycloak, action) {
        this.keycloak = keycloak;
        this.action = action;
    }
    AIACommand.prototype.execute = function () {
        this.keycloak.login({
            action: this.action,
        });
    };
    return AIACommand;
}());
exports.AIACommand = AIACommand;
