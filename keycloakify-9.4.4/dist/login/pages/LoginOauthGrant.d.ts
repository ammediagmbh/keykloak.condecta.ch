/// <reference types="react" />
import { PageProps } from "./PageProps";
import { KcContext } from "../kcContext";
import { I18n } from "../i18n";
export default function LoginOauthGrant(props: PageProps<Extract<KcContext, {
    pageId: "login-oauth-grant.ftl";
}>, I18n>): JSX.Element;
