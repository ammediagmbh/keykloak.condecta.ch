/// <reference types="react" />
import type { ClassKey } from "../../../login/TemplateProps";
import { useFormValidation } from "../../../login/lib/useFormValidation";
import type { Attribute } from "../../../login/kcContext/KcContext";
import type { I18n } from "../../i18n";
export type UserProfileFormFieldsProps = {
    kcContext: Parameters<typeof useFormValidation>[0]["kcContext"];
    i18n: I18n;
    getClassName: (classKey: ClassKey) => string;
    onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
    BeforeField?: (props: {
        attribute: Attribute;
    }) => JSX.Element | null;
    AfterField?: (props: {
        attribute: Attribute;
    }) => JSX.Element | null;
};
export declare function UserProfileFormFields(props: UserProfileFormFieldsProps): JSX.Element;
