/// <reference types="react" />
import type { PageProps } from "../../login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
export default function UpdateEmail(props: PageProps<Extract<KcContext, {
    pageId: "update-email.ftl";
}>, I18n>): JSX.Element;
