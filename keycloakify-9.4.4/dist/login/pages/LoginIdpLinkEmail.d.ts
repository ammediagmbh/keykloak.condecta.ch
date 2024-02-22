/// <reference types="react" />
import type { KcContext } from "../../login/kcContext";
import type { PageProps } from "../../login/pages/PageProps";
import type { I18n } from "../../login/i18n";
export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, {
    pageId: "login-idp-link-email.ftl";
}>, I18n>): JSX.Element;
