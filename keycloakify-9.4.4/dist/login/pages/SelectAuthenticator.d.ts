/// <reference types="react" />
import type { PageProps } from "../../login/pages/PageProps";
import type { KcContext } from "../../login/kcContext";
import type { I18n } from "../../login/i18n";
export default function SelectAuthenticator(props: PageProps<Extract<KcContext, {
    pageId: "select-authenticator.ftl";
}>, I18n>): JSX.Element;
