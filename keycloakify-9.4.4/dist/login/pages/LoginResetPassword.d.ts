/// <reference types="react" />
import type { PageProps } from "../../login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
export default function LoginResetPassword(props: PageProps<Extract<KcContext, {
    pageId: "login-reset-password.ftl";
}>, I18n>): JSX.Element;
