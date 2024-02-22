"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keycloakify = void 0;
const path_1 = require("path");
const fs = __importStar(require("fs"));
const constants_1 = require("../bin/constants");
const getCacheDirPath_1 = require("../bin/keycloakify/buildOptions/getCacheDirPath");
const String_prototype_replaceAll_1 = require("../bin/tools/String.prototype.replaceAll");
const id_1 = require("tsafe/id");
const fs_rm_1 = require("../bin/tools/fs.rm");
const copy_keycloak_resources_to_public_1 = require("../bin/copy-keycloak-resources-to-public");
const assert_1 = require("tsafe/assert");
function keycloakify() {
    let reactAppRootDirPath = undefined;
    let urlPathname = undefined;
    let buildDirPath = undefined;
    let command = undefined;
    const plugin = {
        "name": "keycloakify",
        "configResolved": async (resolvedConfig) => {
            command = resolvedConfig.command;
            reactAppRootDirPath = resolvedConfig.root;
            urlPathname = (() => {
                var _a;
                let out = resolvedConfig.env.BASE_URL;
                if (out.startsWith(".") && command === "build" && ((_a = resolvedConfig.envPrefix) === null || _a === void 0 ? void 0 : _a.includes("STORYBOOK_")) !== true) {
                    throw new Error([
                        `BASE_URL=${out} is not supported By Keycloakify. Use an absolute URL instead.`,
                        `If this is a problem, please open an issue at https://github.com/keycloakify/keycloakify/issues/new`
                    ].join("\n"));
                }
                if (out === undefined) {
                    return undefined;
                }
                if (!out.startsWith("/")) {
                    out = "/" + out;
                }
                if (!out.endsWith("/")) {
                    out += "/";
                }
                return out;
            })();
            buildDirPath = (0, path_1.join)(reactAppRootDirPath, resolvedConfig.build.outDir);
            const { cacheDirPath } = (0, getCacheDirPath_1.getCacheDirPath)({
                reactAppRootDirPath
            });
            if (!fs.existsSync(cacheDirPath)) {
                fs.mkdirSync(cacheDirPath, { "recursive": true });
            }
            fs.writeFileSync((0, path_1.join)(cacheDirPath, constants_1.resolvedViteConfigJsonBasename), Buffer.from(JSON.stringify((0, id_1.id)({
                "publicDir": (0, path_1.relative)(reactAppRootDirPath, resolvedConfig.publicDir),
                "assetsDir": resolvedConfig.build.assetsDir,
                "buildDir": resolvedConfig.build.outDir,
                urlPathname
            }), null, 2), "utf8"));
            await (0, copy_keycloak_resources_to_public_1.copyKeycloakResourcesToPublic)({
                "processArgv": ["--project", reactAppRootDirPath]
            });
        },
        "transform": (code, id) => {
            (0, assert_1.assert)(command !== undefined);
            if (command !== "build") {
                return;
            }
            (0, assert_1.assert)(reactAppRootDirPath !== undefined);
            let transformedCode = undefined;
            replace_import_meta_env_base_url_in_source_code: {
                {
                    const isWithinSourceDirectory = id.startsWith((0, path_1.join)(reactAppRootDirPath, "src") + path_1.sep);
                    if (!isWithinSourceDirectory) {
                        break replace_import_meta_env_base_url_in_source_code;
                    }
                }
                {
                    const isJavascriptFile = id.endsWith(".js") || id.endsWith(".jsx");
                    const isTypeScriptFile = id.endsWith(".ts") || id.endsWith(".tsx");
                    if (!isTypeScriptFile && !isJavascriptFile) {
                        break replace_import_meta_env_base_url_in_source_code;
                    }
                }
                if (transformedCode === undefined) {
                    transformedCode = code;
                }
                transformedCode = (0, String_prototype_replaceAll_1.replaceAll)(transformedCode, "import.meta.env.BASE_URL", [
                    `(`,
                    `(window.${constants_1.nameOfTheGlobal} === undefined || import.meta.env.MODE === "development")?`,
                    `"${urlPathname !== null && urlPathname !== void 0 ? urlPathname : "/"}":`,
                    `(window.${constants_1.nameOfTheGlobal}.url.resourcesPath + "/${constants_1.basenameOfTheKeycloakifyResourcesDir}/")`,
                    `)`
                ].join(""));
            }
            if (transformedCode === undefined) {
                return;
            }
            return {
                "code": transformedCode
            };
        },
        "closeBundle": async () => {
            (0, assert_1.assert)(command !== undefined);
            if (command !== "build") {
                return;
            }
            (0, assert_1.assert)(buildDirPath !== undefined);
            await (0, fs_rm_1.rm)((0, path_1.join)(buildDirPath, constants_1.keycloak_resources), { "recursive": true, "force": true });
        }
    };
    return plugin;
}
exports.keycloakify = keycloakify;
//# sourceMappingURL=vite-plugin.js.map