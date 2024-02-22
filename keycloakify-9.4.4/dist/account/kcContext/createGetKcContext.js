import { deepAssign } from "../../tools/deepAssign";
import { isStorybook } from "../../lib/isStorybook";
import { getKcContextFromWindow } from "./getKcContextFromWindow";
import { symToStr } from "tsafe/symToStr";
import { kcContextMocks, kcContextCommonMock } from "../../account/kcContext/kcContextMocks";
export function createGetKcContext(params) {
    const { mockData } = params !== null && params !== void 0 ? params : {};
    function getKcContext(params) {
        const { mockPageId, storyPartialKcContext } = params !== null && params !== void 0 ? params : {};
        const realKcContext = getKcContextFromWindow();
        if (mockPageId !== undefined && realKcContext === undefined) {
            //TODO maybe trow if no mock fo custom page
            warn_that_mock_is_enbaled: {
                if (isStorybook) {
                    break warn_that_mock_is_enbaled;
                }
                console.log(`%cKeycloakify: ${symToStr({ mockPageId })} set to ${mockPageId}.`, "background: red; color: yellow; font-size: medium");
            }
            const kcContextDefaultMock = kcContextMocks.find(({ pageId }) => pageId === mockPageId);
            const partialKcContextCustomMock = (() => {
                const out = {};
                const mockDataPick = mockData === null || mockData === void 0 ? void 0 : mockData.find(({ pageId }) => pageId === mockPageId);
                if (mockDataPick !== undefined) {
                    deepAssign({
                        "target": out,
                        "source": mockDataPick
                    });
                }
                if (storyPartialKcContext !== undefined) {
                    deepAssign({
                        "target": out,
                        "source": storyPartialKcContext
                    });
                }
                return Object.keys(out).length === 0 ? undefined : out;
            })();
            if (kcContextDefaultMock === undefined && partialKcContextCustomMock === undefined) {
                console.warn([
                    `WARNING: You declared the non build in page ${mockPageId} but you didn't `,
                    `provide mock data needed to debug the page outside of Keycloak as you are trying to do now.`,
                    `Please check the documentation of the getKcContext function`
                ].join("\n"));
            }
            const kcContext = {};
            deepAssign({
                "target": kcContext,
                "source": kcContextDefaultMock !== undefined ? kcContextDefaultMock : Object.assign({ "pageId": mockPageId }, kcContextCommonMock)
            });
            if (partialKcContextCustomMock !== undefined) {
                deepAssign({
                    "target": kcContext,
                    "source": partialKcContextCustomMock
                });
            }
            return { kcContext };
        }
        if (realKcContext === undefined) {
            return { "kcContext": undefined };
        }
        if (realKcContext.themeType !== "account") {
            return { "kcContext": undefined };
        }
        return { "kcContext": realKcContext };
    }
    return { getKcContext };
}
//# sourceMappingURL=createGetKcContext.js.map