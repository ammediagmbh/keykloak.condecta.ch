/// <reference types="react" />
import type { PageProps } from "../../login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
export default function LoginConfigTotp(props: PageProps<Extract<KcContext, {
    pageId: "login-config-totp.ftl";
}>, I18n>): JSX.Element;
