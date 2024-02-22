/// <reference types="react" />
import "../../tools/Array.prototype.every";
import type { Attribute, Validators } from "../../login/kcContext/KcContext";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
/**
 * NOTE: The attributesWithPassword returned is actually augmented with
 * artificial password related attributes only if kcContext.passwordRequired === true
 */
export declare function useFormValidation(params: {
    kcContext: {
        messagesPerField: Pick<KcContext.Common["messagesPerField"], "existsError" | "get">;
        profile: {
            attributes: Attribute[];
        };
        passwordRequired?: boolean;
        realm: {
            registrationEmailAsUsername: boolean;
        };
    };
    /** NOTE: Try to avoid passing a new ref every render for better performances. */
    passwordValidators?: Validators;
    i18n: I18n;
}): {
    formValidationState: {
        fieldStateByAttributeName: {
            [k: string]: {
                value: string;
                displayableErrors: {
                    errorMessage: JSX.Element;
                    errorMessageStr: string;
                    validatorName: "double" | "pattern" | "length" | "email" | "integer" | "up-immutable-attribute" | "up-attribute-required-by-metadata-value" | "up-username-has-value" | "up-duplicate-username" | "up-username-mutation" | "up-email-exists-as-username" | "up-blank-attribute-value" | "up-duplicate-email" | "local-date" | "person-name-prohibited-characters" | "uri" | "username-prohibited-characters" | "_compareToOther" | "options" | undefined;
                }[];
            };
        };
        isFormSubmittable: boolean;
    };
    formValidationDispatch: import("react").Dispatch<{
        action: "update value";
        name: string;
        newValue: string;
    } | {
        action: "focus lost";
        name: string;
    }>;
    attributesWithPassword: Attribute[];
};
