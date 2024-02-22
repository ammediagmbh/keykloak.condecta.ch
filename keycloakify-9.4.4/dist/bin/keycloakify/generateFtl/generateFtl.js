"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFtlFilesCodeFactory = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var replaceImportsInJsCode_1 = require("../replacers/replaceImportsInJsCode");
var replaceImportsInCssCode_1 = require("../replacers/replaceImportsInCssCode");
var replaceImportsInInlineCssCode_1 = require("../replacers/replaceImportsInInlineCssCode");
var fs = __importStar(require("fs"));
var path_1 = require("path");
var objectKeys_1 = require("tsafe/objectKeys");
var assert_1 = require("tsafe/assert");
var constants_1 = require("../../constants");
(0, assert_1.assert)();
function generateFtlFilesCodeFactory(params) {
    var themeName = params.themeName, cssGlobalsToDefine = params.cssGlobalsToDefine, indexHtmlCode = params.indexHtmlCode, buildOptions = params.buildOptions, keycloakifyVersion = params.keycloakifyVersion, themeType = params.themeType, fieldNames = params.fieldNames;
    var $ = cheerio_1.default.load(indexHtmlCode);
    fix_imports_statements: {
        $("script:not([src])").each(function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 2), element = _b[1];
            var jsCode = $(element).html();
            (0, assert_1.assert)(jsCode !== null);
            var fixedJsCode = (0, replaceImportsInJsCode_1.replaceImportsInJsCode)({ jsCode: jsCode, buildOptions: buildOptions }).fixedJsCode;
            $(element).text(fixedJsCode);
        });
        $("style").each(function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 2), element = _b[1];
            var cssCode = $(element).html();
            (0, assert_1.assert)(cssCode !== null);
            var fixedCssCode = (0, replaceImportsInInlineCssCode_1.replaceImportsInInlineCssCode)({
                cssCode: cssCode,
                buildOptions: buildOptions
            }).fixedCssCode;
            $(element).text(fixedCssCode);
        });
        [
            ["link", "href"],
            ["script", "src"]
        ].forEach(function (_a) {
            var _b = __read(_a, 2), selector = _b[0], attrName = _b[1];
            return $(selector).each(function () {
                var _a;
                var _b = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _b[_i] = arguments[_i];
                }
                var _c = __read(_b, 2), element = _c[1];
                var href = $(element).attr(attrName);
                if (href === undefined) {
                    return;
                }
                $(element).attr(attrName, href.replace(new RegExp("^".concat(((_a = buildOptions.urlPathname) !== null && _a !== void 0 ? _a : "/").replace(/\//g, "\\/"))), "${url.resourcesPath}/".concat(constants_1.basenameOfTheKeycloakifyResourcesDir, "/")));
            });
        });
        if (Object.keys(cssGlobalsToDefine).length !== 0) {
            $("head").prepend([
                "",
                "<style>",
                (0, replaceImportsInCssCode_1.generateCssCodeToDefineGlobals)({
                    cssGlobalsToDefine: cssGlobalsToDefine,
                    buildOptions: buildOptions
                }).cssCodeToPrependInHead,
                "</style>",
                ""
            ].join("\n"));
        }
    }
    //FTL is no valid html, we can't insert with cheerio, we put placeholder for injecting later.
    var replaceValueBySearchValue = {
        '{ "x": "vIdLqMeOed9sdLdIdOxdK0d" }': fs
            .readFileSync((0, path_1.join)(__dirname, "ftl_object_to_js_code_declaring_an_object.ftl"))
            .toString("utf8")
            .match(/^<script>const _=((?:.|\n)+)<\/script>[\n]?$/)[1]
            .replace("FIELD_NAMES_eKsIY4ZsZ4xeM", fieldNames.map(function (name) { return "\"".concat(name, "\""); }).join(", "))
            .replace("KEYCLOAKIFY_VERSION_xEdKd3xEdr", keycloakifyVersion)
            .replace("KEYCLOAKIFY_THEME_VERSION_sIgKd3xEdr3dx", buildOptions.themeVersion)
            .replace("KEYCLOAKIFY_THEME_TYPE_dExKd3xEdr", themeType)
            .replace("KEYCLOAKIFY_THEME_NAME_cXxKd3xEer", themeName)
            .replace("RESOURCES_COMMON_cLsLsMrtDkpVv", constants_1.resources_common),
        "<!-- xIdLqMeOedErIdLsPdNdI9dSlxI -->": [
            "<#if scripts??>",
            "    <#list scripts as script>",
            '        <script src="${script}" type="text/javascript"></script>',
            "    </#list>",
            "</#if>"
        ].join("\n")
    };
    $("head").prepend([
        "<script>",
        "    window.".concat(constants_1.nameOfTheGlobal, "= ").concat((0, objectKeys_1.objectKeys)(replaceValueBySearchValue)[0], ";"),
        "</script>",
        "",
        (0, objectKeys_1.objectKeys)(replaceValueBySearchValue)[1]
    ].join("\n"));
    // Remove part of the document marked as ignored.
    {
        var startTags = $('meta[name="keycloakify-ignore-start"]');
        startTags.each(function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 2), startTag = _b[1];
            var $startTag = $(startTag);
            var $endTag = $startTag.nextAll('meta[name="keycloakify-ignore-end"]').first();
            if ($endTag.length) {
                var currentNode = $startTag.next();
                while (currentNode.length && !currentNode.is($endTag)) {
                    currentNode.remove();
                    currentNode = $startTag.next();
                }
                $startTag.remove();
                $endTag.remove();
            }
        });
    }
    var partiallyFixedIndexHtmlCode = $.html();
    function generateFtlFilesCode(params) {
        var pageId = params.pageId;
        var $ = cheerio_1.default.load(partiallyFixedIndexHtmlCode);
        var ftlCode = $.html();
        Object.entries(__assign(__assign({}, replaceValueBySearchValue), { "PAGE_ID_xIgLsPgGId9D8e": pageId })).map(function (_a) {
            var _b = __read(_a, 2), searchValue = _b[0], replaceValue = _b[1];
            return (ftlCode = ftlCode.replace(searchValue, replaceValue));
        });
        return { ftlCode: ftlCode };
    }
    return { generateFtlFilesCode: generateFtlFilesCode };
}
exports.generateFtlFilesCodeFactory = generateFtlFilesCodeFactory;
//# sourceMappingURL=generateFtl.js.map