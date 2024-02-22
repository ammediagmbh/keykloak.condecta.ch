<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
  <#if section = "header">
    <#if !realm.loginWithEmailAllowed>
      <#assign label = msg("username")>
      <#assign placeholder = msg("enterUsername")>
      <#assign header = msg("enterUsernameForgotPassword")>
    <#elseif !realm.registrationEmailAsUsername>
      <#assign label = msg("usernameOrEmail")>
      <#assign placeholder = msg("enterUsernameOrEmail")>
      <#assign header = msg("enterUsernameOrEmailForgotPassword")>
    <#else>
      <#assign label = msg("email")>
      <#assign placeholder = msg("enterEmail")>
      <#assign header = msg("enterEmailForgotPassword")>
    </#if>
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <h4>${msg("emailForgotTitle")}</h4>
    <p>${header}</p>
  <#elseif section = "form">
    <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
      <div class="${properties.kcFormGroupClass!}">
        <div class="${properties.kcLabelWrapperClass!}">
          <label for="username" class="${properties.kcLabelClass!}">${label}</label>
        </div>
        <div class="${properties.kcInputWrapperClass!}">
          <#if auth?has_content && auth.showUsername()>
            <input
              type="text"
              id="username"
              placeholder="${placeholder}"
              name="username"
              class="${properties.kcInputClass!}"
              autofocus
              value="${auth.attemptedUsername}"
            />
          <#else>
            <input
              type="text"
              id="username"
              placeholder="${placeholder}"
              name="username"
              class="${properties.kcInputClass!}"
              autofocus
            />
          </#if>
        </div>
      </div>
      <div class="${properties.kcFormGroupClass!}">
        <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
          <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}"/>
        </div>
      </div>
    </form>
    <span>
      ${msg('rememberYourPassword')}
      <a href="${url.loginUrl}">${kcSanitize(msg("doLogin"))?no_esc}</a>
    </span>
  </#if>
</@layout.registrationLayout>
