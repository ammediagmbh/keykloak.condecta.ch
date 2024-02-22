import { jsx as _jsx } from "react/jsx-runtime";
import "../../tools/Array.prototype.every";
import { useMemo, useReducer, Fragment } from "react";
import { id } from "tsafe/id";
import { useConstCallback } from "../../tools/useConstCallback";
import { emailRegexp } from "../../tools/emailRegExp";
/**
 * NOTE: The attributesWithPassword returned is actually augmented with
 * artificial password related attributes only if kcContext.passwordRequired === true
 */
export function useFormValidation(params) {
    const { kcContext, passwordValidators = {}, i18n } = params;
    const attributesWithPassword = useMemo(() => !kcContext.passwordRequired
        ? kcContext.profile.attributes
        : (() => {
            const name = kcContext.realm.registrationEmailAsUsername ? "email" : "username";
            return kcContext.profile.attributes.reduce((prev, curr) => [
                ...prev,
                ...(curr.name !== name
                    ? [curr]
                    : [
                        curr,
                        id({
                            "name": "password",
                            "displayName": id("${password}"),
                            "required": true,
                            "readOnly": false,
                            "validators": passwordValidators,
                            "annotations": {},
                            "groupAnnotations": {},
                            "autocomplete": "new-password"
                        }),
                        id({
                            "name": "password-confirm",
                            "displayName": id("${passwordConfirm}"),
                            "required": true,
                            "readOnly": false,
                            "validators": {
                                "_compareToOther": {
                                    "name": "password",
                                    "ignore.empty.value": true,
                                    "shouldBe": "equal",
                                    "error-message": id("${invalidPasswordConfirmMessage}")
                                }
                            },
                            "annotations": {},
                            "groupAnnotations": {},
                            "autocomplete": "new-password"
                        })
                    ])
            ], []);
        })(), [kcContext, passwordValidators]);
    const { getErrors } = useGetErrors({
        "kcContext": {
            "messagesPerField": kcContext.messagesPerField,
            "profile": {
                "attributes": attributesWithPassword
            }
        },
        i18n
    });
    const initialInternalState = useMemo(() => Object.fromEntries(attributesWithPassword
        .map(attribute => ({
        attribute,
        "errors": getErrors({
            "name": attribute.name,
            "fieldValueByAttributeName": Object.fromEntries(attributesWithPassword.map(({ name, value }) => [name, { "value": value !== null && value !== void 0 ? value : "" }]))
        })
    }))
        .map(({ attribute, errors }) => {
        var _a;
        return [
            attribute.name,
            {
                "value": (_a = attribute.value) !== null && _a !== void 0 ? _a : "",
                errors,
                "doDisplayPotentialErrorMessages": errors.length !== 0
            }
        ];
    })), [attributesWithPassword]);
    const [formValidationInternalState, formValidationDispatch] = useReducer((state, params) => (Object.assign(Object.assign({}, state), { [params.name]: Object.assign(Object.assign({}, state[params.name]), (() => {
            switch (params.action) {
                case "focus lost":
                    return { "doDisplayPotentialErrorMessages": true };
                case "update value":
                    return {
                        "value": params.newValue,
                        "errors": getErrors({
                            "name": params.name,
                            "fieldValueByAttributeName": Object.assign(Object.assign({}, state), { [params.name]: { "value": params.newValue } })
                        })
                    };
            }
        })()) })), initialInternalState);
    const formValidationState = useMemo(() => ({
        "fieldStateByAttributeName": Object.fromEntries(Object.entries(formValidationInternalState).map(([name, { value, errors, doDisplayPotentialErrorMessages }]) => [
            name,
            { value, "displayableErrors": doDisplayPotentialErrorMessages ? errors : [] }
        ])),
        "isFormSubmittable": Object.entries(formValidationInternalState).every(([name, { value, errors }]) => errors.length === 0 && (value !== "" || !attributesWithPassword.find(attribute => attribute.name === name).required))
    }), [formValidationInternalState, attributesWithPassword]);
    return {
        formValidationState,
        formValidationDispatch,
        attributesWithPassword
    };
}
/** Expect to be used in a component wrapped within a <I18nProvider> */
function useGetErrors(params) {
    const { kcContext, i18n } = params;
    const { messagesPerField, profile: { attributes } } = kcContext;
    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;
    const getErrors = useConstCallback((params) => {
        var _a;
        const { name, fieldValueByAttributeName } = params;
        const { value } = fieldValueByAttributeName[name];
        const { value: defaultValue, validators } = attributes.find(attribute => attribute.name === name);
        block: {
            if ((defaultValue !== null && defaultValue !== void 0 ? defaultValue : "") !== value) {
                break block;
            }
            let doesErrorExist;
            try {
                doesErrorExist = messagesPerField.existsError(name);
            }
            catch (_b) {
                break block;
            }
            if (!doesErrorExist) {
                break block;
            }
            const errorMessageStr = messagesPerField.get(name);
            return [
                {
                    "validatorName": undefined,
                    errorMessageStr,
                    "errorMessage": _jsx("span", { children: errorMessageStr }, 0)
                }
            ];
        }
        const errors = [];
        scope: {
            const validatorName = "length";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break scope;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false, max, min } = validator;
            if (ignoreEmptyValue && value === "") {
                break scope;
            }
            if (max !== undefined && value.length > parseInt(max)) {
                const msgArgs = ["error-invalid-length-too-long", max];
                errors.push({
                    "errorMessage": _jsx(Fragment, { children: msg(...msgArgs) }, errors.length),
                    "errorMessageStr": msgStr(...msgArgs),
                    validatorName
                });
            }
            if (min !== undefined && value.length < parseInt(min)) {
                const msgArgs = ["error-invalid-length-too-short", min];
                errors.push({
                    "errorMessage": _jsx(Fragment, { children: msg(...msgArgs) }, errors.length),
                    "errorMessageStr": msgStr(...msgArgs),
                    validatorName
                });
            }
        }
        scope: {
            const validatorName = "_compareToOther";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break scope;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false, name: otherName, shouldBe, "error-message": errorMessageKey } = validator;
            if (ignoreEmptyValue && value === "") {
                break scope;
            }
            const { value: otherValue } = fieldValueByAttributeName[otherName];
            const isValid = (() => {
                switch (shouldBe) {
                    case "different":
                        return otherValue !== value;
                    case "equal":
                        return otherValue === value;
                }
            })();
            if (isValid) {
                break scope;
            }
            const msgArg = [
                errorMessageKey !== null && errorMessageKey !== void 0 ? errorMessageKey : id((() => {
                    switch (shouldBe) {
                        case "equal":
                            return "shouldBeEqual";
                        case "different":
                            return "shouldBeDifferent";
                    }
                })()),
                otherName,
                name,
                shouldBe
            ];
            errors.push({
                validatorName,
                "errorMessage": _jsx(Fragment, { children: advancedMsg(...msgArg) }, errors.length),
                "errorMessageStr": advancedMsgStr(...msgArg)
            });
        }
        scope: {
            const validatorName = "pattern";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break scope;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false, pattern, "error-message": errorMessageKey } = validator;
            if (ignoreEmptyValue && value === "") {
                break scope;
            }
            if (new RegExp(pattern).test(value)) {
                break scope;
            }
            const msgArgs = [errorMessageKey !== null && errorMessageKey !== void 0 ? errorMessageKey : id("shouldMatchPattern"), pattern];
            errors.push({
                validatorName,
                "errorMessage": _jsx(Fragment, { children: advancedMsg(...msgArgs) }, errors.length),
                "errorMessageStr": advancedMsgStr(...msgArgs)
            });
        }
        scope: {
            if (((_a = [...errors].reverse()[0]) === null || _a === void 0 ? void 0 : _a.validatorName) === "pattern") {
                break scope;
            }
            const validatorName = "email";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break scope;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false } = validator;
            if (ignoreEmptyValue && value === "") {
                break scope;
            }
            if (emailRegexp.test(value)) {
                break scope;
            }
            const msgArgs = [id("invalidEmailMessage")];
            errors.push({
                validatorName,
                "errorMessage": _jsx(Fragment, { children: msg(...msgArgs) }, errors.length),
                "errorMessageStr": msgStr(...msgArgs)
            });
        }
        scope: {
            const validatorName = "integer";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break scope;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false, max, min } = validator;
            if (ignoreEmptyValue && value === "") {
                break scope;
            }
            const intValue = parseInt(value);
            if (isNaN(intValue)) {
                const msgArgs = ["mustBeAnInteger"];
                errors.push({
                    validatorName,
                    "errorMessage": _jsx(Fragment, { children: msg(...msgArgs) }, errors.length),
                    "errorMessageStr": msgStr(...msgArgs)
                });
                break scope;
            }
            if (max !== undefined && intValue > parseInt(max)) {
                const msgArgs = ["error-number-out-of-range-too-big", max];
                errors.push({
                    validatorName,
                    "errorMessage": _jsx(Fragment, { children: msg(...msgArgs) }, errors.length),
                    "errorMessageStr": msgStr(...msgArgs)
                });
                break scope;
            }
            if (min !== undefined && intValue < parseInt(min)) {
                const msgArgs = ["error-number-out-of-range-too-small", min];
                errors.push({
                    validatorName,
                    "errorMessage": _jsx(Fragment, { children: msg(...msgArgs) }, errors.length),
                    "errorMessageStr": msgStr(...msgArgs)
                });
                break scope;
            }
        }
        scope: {
            const validatorName = "options";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break scope;
            }
            if (value === "") {
                break scope;
            }
            if (validator.options.indexOf(value) >= 0) {
                break scope;
            }
            const msgArgs = [id("notAValidOption")];
            errors.push({
                validatorName,
                "errorMessage": _jsx(Fragment, { children: advancedMsg(...msgArgs) }, errors.length),
                "errorMessageStr": advancedMsgStr(...msgArgs)
            });
        }
        //TODO: Implement missing validators.
        return errors;
    });
    return { getErrors };
}
//# sourceMappingURL=useFormValidation.js.map