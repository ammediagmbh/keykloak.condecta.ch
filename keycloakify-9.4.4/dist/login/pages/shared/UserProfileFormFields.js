import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, Fragment } from "react";
import { clsx } from "../../../tools/clsx";
import { useFormValidation } from "../../../login/lib/useFormValidation";
export function UserProfileFormFields(props) {
    const { kcContext, onIsFormSubmittableValueChange, i18n, getClassName, BeforeField, AfterField } = props;
    const { advancedMsg, msg } = i18n;
    const { formValidationState: { fieldStateByAttributeName, isFormSubmittable }, formValidationDispatch, attributesWithPassword } = useFormValidation({
        kcContext,
        i18n
    });
    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);
    let currentGroup = "";
    return (_jsx(_Fragment, { children: attributesWithPassword.map((attribute, i) => {
            var _a;
            const { group = "", groupDisplayHeader = "", groupDisplayDescription = "" } = attribute;
            const { value, displayableErrors } = fieldStateByAttributeName[attribute.name];
            const formGroupClassName = clsx(getClassName("kcFormGroupClass"), displayableErrors.length !== 0 && getClassName("kcFormGroupErrorClass"));
            return (_jsxs(Fragment, { children: [group !== currentGroup && (currentGroup = group) !== "" && (_jsxs("div", Object.assign({ className: formGroupClassName }, { children: [_jsx("div", Object.assign({ className: getClassName("kcContentWrapperClass") }, { children: _jsx("label", Object.assign({ id: `header-${group}`, className: getClassName("kcFormGroupHeader") }, { children: advancedMsg(groupDisplayHeader) || currentGroup })) })), groupDisplayDescription !== "" && (_jsx("div", Object.assign({ className: getClassName("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ id: `description-${group}`, className: getClassName("kcLabelClass") }, { children: advancedMsg(groupDisplayDescription) })) })))] }))), BeforeField && _jsx(BeforeField, { attribute: attribute }), _jsxs("div", Object.assign({ className: formGroupClassName }, { children: [_jsxs("div", Object.assign({ className: getClassName("kcLabelWrapperClass") }, { children: [_jsx("label", Object.assign({ htmlFor: attribute.name, className: getClassName("kcLabelClass") }, { children: advancedMsg((_a = attribute.displayName) !== null && _a !== void 0 ? _a : "") })), attribute.required && _jsx(_Fragment, { children: "*" })] })), _jsxs("div", Object.assign({ className: getClassName("kcInputWrapperClass") }, { children: [(() => {
                                        const { options } = attribute.validators;
                                        if (options !== undefined) {
                                            return (_jsx("select", Object.assign({ id: attribute.name, name: attribute.name, onChange: event => formValidationDispatch({
                                                    "action": "update value",
                                                    "name": attribute.name,
                                                    "newValue": event.target.value
                                                }), onBlur: () => formValidationDispatch({
                                                    "action": "focus lost",
                                                    "name": attribute.name
                                                }), value: value }, { children: _jsxs(_Fragment, { children: [_jsx("option", Object.assign({ value: "", selected: true, disabled: true, hidden: true }, { children: msg("selectAnOption") })), options.options.map(option => (_jsx("option", Object.assign({ value: option }, { children: option }), option)))] }) })));
                                        }
                                        return (_jsx("input", { type: (() => {
                                                switch (attribute.name) {
                                                    case "password-confirm":
                                                    case "password":
                                                        return "password";
                                                    default:
                                                        return "text";
                                                }
                                            })(), id: attribute.name, name: attribute.name, value: value, onChange: event => formValidationDispatch({
                                                "action": "update value",
                                                "name": attribute.name,
                                                "newValue": event.target.value
                                            }), onBlur: () => formValidationDispatch({
                                                "action": "focus lost",
                                                "name": attribute.name
                                            }), className: getClassName("kcInputClass"), "aria-invalid": displayableErrors.length !== 0, disabled: attribute.readOnly, autoComplete: attribute.autocomplete }));
                                    })(), displayableErrors.length !== 0 &&
                                        (() => {
                                            const divId = `input-error-${attribute.name}`;
                                            return (_jsxs(_Fragment, { children: [_jsx("style", { children: `#${divId} > span: { display: block; }` }), _jsx("span", Object.assign({ id: divId, className: getClassName("kcInputErrorMessageClass"), style: {
                                                            "position": displayableErrors.length === 1 ? "absolute" : undefined
                                                        }, "aria-live": "polite" }, { children: displayableErrors.map(({ errorMessage }) => errorMessage) }))] }));
                                        })()] }))] })), AfterField && _jsx(AfterField, { attribute: attribute })] }, i));
        }) }));
}
//# sourceMappingURL=UserProfileFormFields.js.map