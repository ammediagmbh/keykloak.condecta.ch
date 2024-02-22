/// <reference types="react" />
import type { PageProps } from "../../login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, {
    pageId: "login-update-password.ftl";
}>, I18n>): JSX.Element;
