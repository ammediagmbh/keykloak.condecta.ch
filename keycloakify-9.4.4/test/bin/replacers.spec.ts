import { replaceImportsInJsCode_vite } from "keycloakify/bin/keycloakify/replacers/replaceImportsInJsCode/vite";
import { replaceImportsInJsCode_webpack } from "keycloakify/bin/keycloakify/replacers/replaceImportsInJsCode/webpack";
import { generateCssCodeToDefineGlobals, replaceImportsInCssCode } from "keycloakify/bin/keycloakify/replacers/replaceImportsInCssCode";
import { replaceImportsInInlineCssCode } from "keycloakify/bin/keycloakify/replacers/replaceImportsInInlineCssCode";
import { same } from "evt/tools/inDepth/same";
import { expect, it, describe } from "vitest";
import { isSameCode } from "../tools/isSameCode";
import { basenameOfTheKeycloakifyResourcesDir, nameOfTheGlobal } from "keycloakify/bin/constants";

describe("js replacer - vite", () => {
    it("replaceImportsInJsCode_vite - 1", () => {
        const before = `Uv="modulepreload",`;
        const after = `,Wc={},`;
        const jsCodeUntransformed = `${before}Hv=function(e){return"/foo-bar-baz/"+e}${after}`;

        const { fixedJsCode } = replaceImportsInJsCode_vite({
            "jsCode": jsCodeUntransformed,
            "basenameOfAssetsFiles": [],
            "buildOptions": {
                "reactAppBuildDirPath": "/Users/someone/github/keycloakify-starter/dist/",
                "assetsDirPath": "/Users/someone/github/keycloakify-starter/dist/assets/",
                "urlPathname": "/foo-bar-baz/"
            }
        });

        const fixedJsCodeExpected = `${before}Hv=function(e){return"/"+e}${after}`;

        expect(isSameCode(fixedJsCode, fixedJsCodeExpected)).toBe(true);
    });

    it("replaceImportsInJsCode_vite - 2", () => {
        const before = `Uv="modulepreload",`;
        const after = `,Wc={},`;
        const jsCodeUntransformed = `${before}Hv=function(e){return"/foo/bar/baz/"+e}${after}`;

        const { fixedJsCode } = replaceImportsInJsCode_vite({
            "jsCode": jsCodeUntransformed,
            "basenameOfAssetsFiles": [],
            "buildOptions": {
                "reactAppBuildDirPath": "/Users/someone/github/keycloakify-starter/dist/",
                "assetsDirPath": "/Users/someone/github/keycloakify-starter/dist/assets/",
                "urlPathname": "/foo/bar/baz/"
            }
        });

        const fixedJsCodeExpected = `${before}Hv=function(e){return"/"+e}${after}`;

        expect(isSameCode(fixedJsCode, fixedJsCodeExpected)).toBe(true);
    });

    it("replaceImportsInJsCode_vite - 3", () => {
        const jsCodeUntransformed = `
            S="/assets/keycloakify-logo-mqjydaoZ.png",H=(()=>{

            function __vite__mapDeps(indexes) {
                if (!__vite__mapDeps.viteFileDeps) {
                    __vite__mapDeps.viteFileDeps = ["assets/Login-dJpPRzM4.js", "assets/index-XwzrZ5Gu.js"]
                }
                return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
            }
        `;

        for (const { reactAppBuildDirPath, assetsDirPath, systemType } of [
            {
                "systemType": "posix",
                "reactAppBuildDirPath": "/Users/someone/github/keycloakify-starter/dist",
                "assetsDirPath": "/Users/someone/github/keycloakify-starter/dist/assets"
            },
            {
                "systemType": "win32",
                "reactAppBuildDirPath": "C:\\\\Users\\someone\\github\\keycloakify-starter\\dist",
                "assetsDirPath": "C:\\\\Users\\someone\\github\\keycloakify-starter\\dist\\assets"
            }
        ] as const) {
            const { fixedJsCode } = replaceImportsInJsCode_vite({
                "jsCode": jsCodeUntransformed,
                "basenameOfAssetsFiles": ["Login-dJpPRzM4.js", "index-XwzrZ5Gu.js", "keycloakify-logo-mqjydaoZ.png"],
                "buildOptions": {
                    reactAppBuildDirPath,
                    assetsDirPath,
                    "urlPathname": undefined
                },
                systemType
            });

            const fixedJsCodeExpected = `
                    S=(window.${nameOfTheGlobal}.url.resourcesPath + "/${basenameOfTheKeycloakifyResourcesDir}/assets/keycloakify-logo-mqjydaoZ.png"),H=(()=>{

                    function __vite__mapDeps(indexes) {
                        if (!__vite__mapDeps.viteFileDeps) {
                            __vite__mapDeps.viteFileDeps = [
                                (window.${nameOfTheGlobal}.url.resourcesPath.substring(1) + "/${basenameOfTheKeycloakifyResourcesDir}/assets/Login-dJpPRzM4.js"), 
                                (window.${nameOfTheGlobal}.url.resourcesPath.substring(1) + "/${basenameOfTheKeycloakifyResourcesDir}/assets/index-XwzrZ5Gu.js")
                            ]
                        }
                        return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
                    }
                `;

            expect(isSameCode(fixedJsCode, fixedJsCodeExpected)).toBe(true);
        }
    });

    it("replaceImportsInJsCode_vite - 4", () => {
        const jsCodeUntransformed = `
            S="/foo/bar/keycloakify-logo-mqjydaoZ.png",H=(()=>{

            function __vite__mapDeps(indexes) {
                if (!__vite__mapDeps.viteFileDeps) {
                    __vite__mapDeps.viteFileDeps = ["foo/bar/Login-dJpPRzM4.js", "foo/bar/index-XwzrZ5Gu.js"]
                }
                return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
            }
        `;

        for (const { reactAppBuildDirPath, assetsDirPath, systemType } of [
            {
                "systemType": "posix",
                "reactAppBuildDirPath": "/Users/someone/github/keycloakify-starter/dist",
                "assetsDirPath": "/Users/someone/github/keycloakify-starter/dist/foo/bar"
            },
            {
                "systemType": "win32",
                "reactAppBuildDirPath": "C:\\\\Users\\someone\\github\\keycloakify-starter\\dist",
                "assetsDirPath": "C:\\\\Users\\someone\\github\\keycloakify-starter\\dist\\foo\\bar"
            }
        ] as const) {
            const { fixedJsCode } = replaceImportsInJsCode_vite({
                "jsCode": jsCodeUntransformed,
                "basenameOfAssetsFiles": ["Login-dJpPRzM4.js", "index-XwzrZ5Gu.js", "keycloakify-logo-mqjydaoZ.png"],
                "buildOptions": {
                    reactAppBuildDirPath,
                    assetsDirPath,
                    "urlPathname": undefined
                },
                systemType
            });

            const fixedJsCodeExpected = `
                    S=(window.${nameOfTheGlobal}.url.resourcesPath + "/${basenameOfTheKeycloakifyResourcesDir}/foo/bar/keycloakify-logo-mqjydaoZ.png"),H=(()=>{

                    function __vite__mapDeps(indexes) {
                        if (!__vite__mapDeps.viteFileDeps) {
                            __vite__mapDeps.viteFileDeps = [
                                (window.${nameOfTheGlobal}.url.resourcesPath.substring(1) + "/${basenameOfTheKeycloakifyResourcesDir}/foo/bar/Login-dJpPRzM4.js"), 
                                (window.${nameOfTheGlobal}.url.resourcesPath.substring(1) + "/${basenameOfTheKeycloakifyResourcesDir}/foo/bar/index-XwzrZ5Gu.js")
                            ]
                        }
                        return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
                    }
                `;

            expect(isSameCode(fixedJsCode, fixedJsCodeExpected)).toBe(true);
        }
    });

    it("replaceImportsInJsCode_vite - 5", () => {
        const jsCodeUntransformed = `
            S="/foo-bar-baz/assets/keycloakify-logo-mqjydaoZ.png",H=(()=>{

            function __vite__mapDeps(indexes) {
                if (!__vite__mapDeps.viteFileDeps) {
                    __vite__mapDeps.viteFileDeps = ["assets/Login-dJpPRzM4.js", "assets/index-XwzrZ5Gu.js"]
                }
                return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
            }
        `;

        for (const { reactAppBuildDirPath, assetsDirPath, systemType } of [
            {
                "systemType": "posix",
                "reactAppBuildDirPath": "/Users/someone/github/keycloakify-starter/dist",
                "assetsDirPath": "/Users/someone/github/keycloakify-starter/dist/assets"
            },
            {
                "systemType": "win32",
                "reactAppBuildDirPath": "C:\\\\Users\\someone\\github\\keycloakify-starter\\dist",
                "assetsDirPath": "C:\\\\Users\\someone\\github\\keycloakify-starter\\dist\\assets"
            }
        ] as const) {
            const { fixedJsCode } = replaceImportsInJsCode_vite({
                "jsCode": jsCodeUntransformed,
                "basenameOfAssetsFiles": ["Login-dJpPRzM4.js", "index-XwzrZ5Gu.js", "keycloakify-logo-mqjydaoZ.png"],
                "buildOptions": {
                    reactAppBuildDirPath,
                    assetsDirPath,
                    "urlPathname": "/foo-bar-baz/"
                },
                systemType
            });

            const fixedJsCodeExpected = `
                    S=(window.${nameOfTheGlobal}.url.resourcesPath + "/${basenameOfTheKeycloakifyResourcesDir}/assets/keycloakify-logo-mqjydaoZ.png"),H=(()=>{

                    function __vite__mapDeps(indexes) {
                        if (!__vite__mapDeps.viteFileDeps) {
                            __vite__mapDeps.viteFileDeps = [
                                (window.${nameOfTheGlobal}.url.resourcesPath.substring(1) + "/${basenameOfTheKeycloakifyResourcesDir}/assets/Login-dJpPRzM4.js"), 
                                (window.${nameOfTheGlobal}.url.resourcesPath.substring(1) + "/${basenameOfTheKeycloakifyResourcesDir}/assets/index-XwzrZ5Gu.js")
                            ]
                        }
                        return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
                    }
                `;

            expect(isSameCode(fixedJsCode, fixedJsCodeExpected)).toBe(true);
        }
    });
});

describe("js replacer - webpack", () => {
    it("replaceImportsInJsCode_webpack - 1", () => {
        const jsCodeUntransformed = `
            function f() {
                return a.p+"static/js/" + ({}[e] || e) + "." + {
                    3: "0664cdc0"
                }[e] + ".chunk.js"
            }
        
            function sameAsF() {
                return a.p+"static/js/" + ({}[e] || e) + "." + {
                    3: "0664cdc0"
                }[e] + ".chunk.js"
            }

            __webpack_require__.u=function(e){return"static/js/" + e + "." + {
                    147: "6c5cee76",
                    787: "8da10fcf",
                    922: "be170a73"
                } [e] + ".chunk.js"
            }

            t.miniCssF=function(e){return"static/css/"+e+"."+{
                    164:"dcfd7749",
                    908:"67c9ed2c"
                }[e]+".chunk.css"
            }
        
            n.u=e=>"static/js/"+e+"."+{69:"4f205f87",128:"49264537",453:"b2fed72e",482:"f0106901"}[e]+".chunk.js"
        
            t.miniCssF=e=>"static/css/"+e+"."+{164:"dcfd7749",908:"67c9ed2c"}[e]+".chunk.css"
        `;

        const { fixedJsCode } = replaceImportsInJsCode_webpack({
            "jsCode": jsCodeUntransformed,
            "buildOptions": {
                "reactAppBuildDirPath": "/Users/someone/github/keycloakify-starter/build",
                "assetsDirPath": "/Users/someone/github/keycloakify-starter/build/static",
                "urlPathname": undefined
            }
        });

        const fixedJsCodeExpected = `
            function f() {
                return window.kcContext.url.resourcesPath + "/build/static/js/" + ({}[e] || e) + "." + {
                    3: "0664cdc0"
                }[e] + ".chunk.js"
            }

            function sameAsF() {
                return window.kcContext.url.resourcesPath + "/build/static/js/" + ({}[e] || e) + "." + {
                    3: "0664cdc0"
                }[e] + ".chunk.js"
            }

            __webpack_require__[(function (){
                var pd = Object.getOwnPropertyDescriptor(__webpack_require__, "p");
                if( pd === undefined || pd.configurable ){
                    Object.defineProperty(__webpack_require__, "p", {
                        get: function() { return window.kcContext.url.resourcesPath; },
                        set: function() {}
                    });
                }
                return "u";
            })()] = function(e) {
                return "/build/static/js/" + e + "." + {
                    147: "6c5cee76",
                    787: "8da10fcf",
                    922: "be170a73"
                } [e] + ".chunk.js"
            }

            t[(function (){
                var pd = Object.getOwnPropertyDescriptor(t, "p");
                if( pd === undefined || pd.configurable ){
                    Object.defineProperty(t, "p", {
                        get: function() { return window.kcContext.url.resourcesPath; },
                        set: function() {}
                    });
                }
                return "miniCssF";
            })()] = function(e) {
                return "/build/static/css/" + e + "." + {
                    164:"dcfd7749",
                    908:"67c9ed2c"
                } [e] + ".chunk.css"
            }
            
            n[(function(){
                var pd = Object.getOwnPropertyDescriptor(n, "p");
                if( pd === undefined || pd.configurable ){
                    Object.defineProperty(n, "p", {
                        get: function() { return window.kcContext.url.resourcesPath; },
                        set: function() {}
                    });
                }
                return "u";
            })()] = e => "/build/static/js/"+e+"."+{69:"4f205f87",128:"49264537",453:"b2fed72e",482:"f0106901"}[e]+".chunk.js"
        
            t[(function(){
                var pd = Object.getOwnPropertyDescriptor(t, "p");
                if( pd === undefined || pd.configurable ){
                    Object.defineProperty(t, "p", {
                        get: function() { return window.kcContext.url.resourcesPath; },
                        set: function() {}
                    });
                }
                return "miniCssF";
            })()] = e => "/build/static/css/"+e+"."+{164:"dcfd7749",908:"67c9ed2c"}[e]+".chunk.css"
        `;

        expect(isSameCode(fixedJsCode, fixedJsCodeExpected)).toBe(true);
    });

    it("replaceImportsInJsCode_webpack - 2", () => {
        const before = `"__esModule",{value:!0})}`;
        const after = `function(){if("undefined"`;

        const jsCodeUntransformed = `${before},n.p="/foo-bar/",${after}`;

        const { fixedJsCode } = replaceImportsInJsCode_webpack({
            "jsCode": jsCodeUntransformed,
            "buildOptions": {
                "reactAppBuildDirPath": "/Users/someone/github/keycloakify-starter/build",
                "assetsDirPath": "/Users/someone/github/keycloakify-starter/build/static",
                "urlPathname": "/foo-bar/"
            }
        });

        const fixedJsCodeExpected = `${before},n.p="/",${after}`;

        expect(isSameCode(fixedJsCode, fixedJsCodeExpected)).toBe(true);
    });

    it("replaceImportsInJsCode_webpack - 3", () => {
        const before = `"__esModule",{value:!0})}`;
        const after = `function(){if("undefined"`;

        const jsCodeUntransformed = `${before},n.p="/foo/bar/",${after}`;

        const { fixedJsCode } = replaceImportsInJsCode_webpack({
            "jsCode": jsCodeUntransformed,
            "buildOptions": {
                "reactAppBuildDirPath": "/Users/someone/github/keycloakify-starter/build",
                "assetsDirPath": "/Users/someone/github/keycloakify-starter/dist/build/static",
                "urlPathname": "/foo/bar/"
            }
        });

        const fixedJsCodeExpected = `${before},n.p="/",${after}`;

        expect(isSameCode(fixedJsCode, fixedJsCodeExpected)).toBe(true);
    });
});

describe("css replacer", () => {
    it("transforms absolute urls to css globals properly with no urlPathname", () => {
        const { fixedCssCode, cssGlobalsToDefine } = replaceImportsInCssCode({
            "cssCode": `
                .my-div {
                    background: url(/logo192.png) no-repeat center center;
                }
    
                .my-div2 {
                    background: url(/logo192.png) repeat center center;
                }
    
                .my-div {
                    background-image: url(/static/media/something.svg);
                }
            `
        });

        const fixedCssCodeExpected = `
            .my-div {
                background: var(--urla882a969fd39473) no-repeat center center;
            }
    
            .my-div2 {
                background: var(--urla882a969fd39473) repeat center center;
            }
    
            .my-div {
                background-image: var(--urldd75cab58377c19);
            }
        `;

        expect(isSameCode(fixedCssCode, fixedCssCodeExpected)).toBe(true);

        const cssGlobalsToDefineExpected = {
            "urla882a969fd39473": "url(/logo192.png)",
            "urldd75cab58377c19": "url(/static/media/something.svg)"
        };

        expect(same(cssGlobalsToDefine, cssGlobalsToDefineExpected)).toBe(true);

        const { cssCodeToPrependInHead } = generateCssCodeToDefineGlobals({
            cssGlobalsToDefine,
            "buildOptions": {
                "urlPathname": undefined
            }
        });

        const cssCodeToPrependInHeadExpected = `
            :root {
                --urla882a969fd39473: url(\${url.resourcesPath}/build/logo192.png);
                --urldd75cab58377c19: url(\${url.resourcesPath}/build/static/media/something.svg);
            }
        `;

        expect(isSameCode(cssCodeToPrependInHead, cssCodeToPrependInHeadExpected)).toBe(true);
    });
    it("transforms absolute urls to css globals properly with custom urlPathname", () => {
        const { fixedCssCode, cssGlobalsToDefine } = replaceImportsInCssCode({
            "cssCode": `
                .my-div {
                    background: url(/x/y/z/logo192.png) no-repeat center center;
                }
    
                .my-div2 {
                    background: url(/x/y/z/logo192.png) no-repeat center center;
                }
    
                .my-div {
                    background-image: url(/x/y/z/static/media/something.svg);
                }
            `
        });

        const fixedCssCodeExpected = `
            .my-div {
                background: var(--url749a3139386b2c8) no-repeat center center;
            }
    
            .my-div2 {
                background: var(--url749a3139386b2c8) no-repeat center center;
            }
    
            .my-div {
                background-image: var(--url8bdc0887b97ac9a);
            }
        `;

        expect(isSameCode(fixedCssCode, fixedCssCodeExpected)).toBe(true);

        const cssGlobalsToDefineExpected = {
            "url749a3139386b2c8": "url(/x/y/z/logo192.png)",
            "url8bdc0887b97ac9a": "url(/x/y/z/static/media/something.svg)"
        };

        expect(same(cssGlobalsToDefine, cssGlobalsToDefineExpected)).toBe(true);

        const { cssCodeToPrependInHead } = generateCssCodeToDefineGlobals({
            cssGlobalsToDefine,
            "buildOptions": {
                "urlPathname": "/x/y/z/"
            }
        });

        const cssCodeToPrependInHeadExpected = `
            :root {
                --url749a3139386b2c8: url(\${url.resourcesPath}/build/logo192.png);
                --url8bdc0887b97ac9a: url(\${url.resourcesPath}/build/static/media/something.svg);
            }
        `;

        expect(isSameCode(cssCodeToPrependInHead, cssCodeToPrependInHeadExpected)).toBe(true);
    });
});

describe("inline css replacer", () => {
    describe("no url pathName", () => {
        const cssCode = `
        @font-face {
          font-family: "Work Sans";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url("/fonts/WorkSans/worksans-regular-webfont.woff2") format("woff2");
        }
        @font-face {
          font-family: "Work Sans";
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url("/fonts/WorkSans/worksans-medium-webfont.woff2") format("woff2");
        }
        @font-face {
          font-family: "Work Sans";
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url("/fonts/WorkSans/worksans-semibold-webfont.woff2") format("woff2");
        }
        @font-face {
          font-family: "Work Sans";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url("/fonts/WorkSans/worksans-bold-webfont.woff2") format("woff2");
        }
    `;
        it("transforms css for standalone app properly", () => {
            const { fixedCssCode } = replaceImportsInInlineCssCode({
                cssCode,
                "buildOptions": {
                    "urlPathname": undefined
                }
            });

            const fixedCssCodeExpected = `
            @font-face {
              font-family: "Work Sans";
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(\${url.resourcesPath}/build/fonts/WorkSans/worksans-regular-webfont.woff2)
                format("woff2");
            }
            @font-face {
              font-family: "Work Sans";
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: url(\${url.resourcesPath}/build/fonts/WorkSans/worksans-medium-webfont.woff2)
                format("woff2");
            }
            @font-face {
              font-family: "Work Sans";
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: url(\${url.resourcesPath}/build/fonts/WorkSans/worksans-semibold-webfont.woff2)
                format("woff2");
            }
            @font-face {
              font-family: "Work Sans";
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: url(\${url.resourcesPath}/build/fonts/WorkSans/worksans-bold-webfont.woff2)
                format("woff2");
            }
        `;

            expect(isSameCode(fixedCssCode, fixedCssCodeExpected)).toBe(true);
        });
    });

    describe("with url pathName", () => {
        const cssCode = `
        @font-face {
          font-family: "Work Sans";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url("/x/y/z/fonts/WorkSans/worksans-regular-webfont.woff2") format("woff2");
        }
        @font-face {
          font-family: "Work Sans";
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url("/x/y/z/fonts/WorkSans/worksans-medium-webfont.woff2") format("woff2");
        }
        @font-face {
          font-family: "Work Sans";
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url("/x/y/z/fonts/WorkSans/worksans-semibold-webfont.woff2") format("woff2");
        }
        @font-face {
          font-family: "Work Sans";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url("/x/y/z/fonts/WorkSans/worksans-bold-webfont.woff2") format("woff2");
        }
    `;
        it("transforms css for standalone app properly", () => {
            const { fixedCssCode } = replaceImportsInInlineCssCode({
                cssCode,
                "buildOptions": {
                    "urlPathname": "/x/y/z/"
                }
            });

            const fixedCssCodeExpected = `
                @font-face {
                  font-family: "Work Sans";
                  font-style: normal;
                  font-weight: 400;
                  font-display: swap;
                  src: url(\${url.resourcesPath}/build/fonts/WorkSans/worksans-regular-webfont.woff2)
                    format("woff2");
                }
                @font-face {
                  font-family: "Work Sans";
                  font-style: normal;
                  font-weight: 500;
                  font-display: swap;
                  src: url(\${url.resourcesPath}/build/fonts/WorkSans/worksans-medium-webfont.woff2)
                    format("woff2");
                }
                @font-face {
                  font-family: "Work Sans";
                  font-style: normal;
                  font-weight: 600;
                  font-display: swap;
                  src: url(\${url.resourcesPath}/build/fonts/WorkSans/worksans-semibold-webfont.woff2)
                    format("woff2");
                }
                @font-face {
                  font-family: "Work Sans";
                  font-style: normal;
                  font-weight: 700;
                  font-display: swap;
                  src: url(\${url.resourcesPath}/build/fonts/WorkSans/worksans-bold-webfont.woff2)
                    format("woff2");
                }
            `;

            expect(isSameCode(fixedCssCode, fixedCssCodeExpected)).toBe(true);
        });
    });
});
