<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(realm.password && social.providers??); section>
<#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="https://www.condecta.ch/themes/condecta_website/images/condecta-logo-slogan-de.svg"></h1>
    <h4>${msg("doLogIn")}</h4>
    <p>${msg("enterCredentialsToLogin")}</p>
<#elseif section = "form">
  <#if !realm.loginWithEmailAllowed>
    <#assign label = msg("username")>
    <#assign placeholder = msg("enterUsername")>
  <#elseif !realm.registrationEmailAsUsername>
    <#assign label = msg("usernameOrEmail")>
    <#assign placeholder = msg("enterUsernameOrEmail")>
  <#else>
    <#assign label = msg("email")>
    <#assign placeholder = msg("enterEmail")>
  </#if>
  <div id="kc-form" <#if realm.password && social.providers??>class="${properties.kcContentWrapperClass!}"</#if>>
    <div id="kc-form-wrapper" <#if realm.password && social.providers??>class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}"</#if>>
    <#if realm.password>
        <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcFormLabelGroupClass}">
                  <label for="username" class="${properties.kcLabelClass!}">
                    ${label}
                  </label>
                </div>

                <#if usernameEditDisabled??>
                  <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" disabled />
                <#else>
                  <input
                    tabindex="1"
                    id="username"
                    class="${properties.kcInputClass!}"
                    name="username"
                    placeholder="${placeholder}"
                    value="${(login.username!'')}"
                    type="text"
                    autofocus
                    autocomplete="off"
                  />
                </#if>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcFormLabelGroupClass} ${properties.kcFormDoubleLabelGroupClass}">
                    <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                    <#if realm.resetPasswordAllowed>
                        <span><a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
                    </#if>
                </div>
                <input tabindex="2" id="password" class="${properties.kcInputClass!}" placeholder="${msg("enterPassword")}" name="password" type="password" autocomplete="off" />
            </div>

            <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                <div id="kc-form-options">
                    <#if realm.rememberMe && !usernameEditDisabled??>
                        <div class="checkbox">
                            <label class=${properties.kcCheckboxLabelClass}>
                                <#if login.rememberMe??>
                                    <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                <#else>
                                    <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                </#if>
                            </label>
                        </div>
                    </#if>
                    </div>

                </div>

                <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                    <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                    <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                </div>
        </form>
    </#if>
    </div>
    <#if realm.password && social.providers??>
        <div id="kc-social-providers" class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}">
          <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 4>${properties.kcFormSocialAccountDoubleListClass!}</#if>">
                <#list social.providers as p>
                    <li class="${properties.kcFormSocialAccountListLinkClass!}"><a href="${p.loginUrl}" id="zocial-${p.alias}" class="zocial ${p.providerId}"> <span>${p.displayName}</span></a></li>
                </#list>
            </ul>
        </div>
    </#if>
    </div>
<#elseif section = "info" >
    <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
        <div id="kc-registration">
            <span>${msg("noAccount")} <a tabindex="6" href="${url.registrationUrl}">${msg("doRegister")}</a></span>
        </div>
    </#if>
</#if>
</@layout.registrationLayout>
