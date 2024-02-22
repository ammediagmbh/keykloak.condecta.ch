import { kcContextMocks, kcContextCommonMock } from "./kcContextMocks";
import { deepAssign } from "../../tools/deepAssign";
import { isStorybook } from "../../lib/isStorybook";
import { id } from "tsafe/id";
import { exclude } from "tsafe/exclude";
import { assert } from "tsafe/assert";
import { getKcContextFromWindow } from "./getKcContextFromWindow";
import { symToStr } from "tsafe/symToStr";
export function createGetKcContext(params) {
    const { mockData } = params !== null && params !== void 0 ? params : {};
    function getKcContext(params) {
        var _a, _b;
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
                if (partialKcContextCustomMock.pageId === "register-user-profile.ftl" ||
                    partialKcContextCustomMock.pageId === "update-user-profile.ftl" ||
                    partialKcContextCustomMock.pageId === "idp-review-user-profile.ftl") {
                    assert((kcContextDefaultMock === null || kcContextDefaultMock === void 0 ? void 0 : kcContextDefaultMock.pageId) === "register-user-profile.ftl" ||
                        (kcContextDefaultMock === null || kcContextDefaultMock === void 0 ? void 0 : kcContextDefaultMock.pageId) === "update-user-profile.ftl" ||
                        (kcContextDefaultMock === null || kcContextDefaultMock === void 0 ? void 0 : kcContextDefaultMock.pageId) === "idp-review-user-profile.ftl");
                    const { attributes } = kcContextDefaultMock.profile;
                    id(kcContext).profile.attributes = [];
                    id(kcContext).profile.attributesByName = {};
                    const partialAttributes = [
                        ...((_b = (_a = partialKcContextCustomMock.profile) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : [])
                    ].filter(exclude(undefined));
                    attributes.forEach(attribute => {
                        const partialAttribute = partialAttributes.find(({ name }) => name === attribute.name);
                        const augmentedAttribute = {};
                        deepAssign({
                            "target": augmentedAttribute,
                            "source": attribute
                        });
                        if (partialAttribute !== undefined) {
                            partialAttributes.splice(partialAttributes.indexOf(partialAttribute), 1);
                            deepAssign({
                                "target": augmentedAttribute,
                                "source": partialAttribute
                            });
                        }
                        id(kcContext).profile.attributes.push(augmentedAttribute);
                        id(kcContext).profile.attributesByName[augmentedAttribute.name] = augmentedAttribute;
                    });
                    partialAttributes
                        .map(partialAttribute => (Object.assign({ "validators": {} }, partialAttribute)))
                        .forEach(partialAttribute => {
                        const { name } = partialAttribute;
                        assert(name !== undefined, "If you define a mock attribute it must have at least a name");
                        id(kcContext).profile.attributes.push(partialAttribute);
                        id(kcContext).profile.attributesByName[name] = partialAttribute;
                    });
                }
            }
            return { kcContext };
        }
        if (realKcContext === undefined) {
            return { "kcContext": undefined };
        }
        if (realKcContext.themeType !== "login") {
            return { "kcContext": undefined };
        }
        return { "kcContext": realKcContext };
    }
    return { getKcContext };
}
//# sourceMappingURL=createGetKcContext.js.map