<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <h4>${msg("confirmLinkIdpTitle")}</h4>
    <p>${msg("accountIdpAlreadyExist")}</p>
  <#elseif section = "form">
    <form id="kc-register-form" action="${url.loginAction}" method="post">
      <div class="${properties.kcFormGroupClass!}">
        <button type="submit" class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="submitAction" id="updateProfile" value="updateProfile">${msg("confirmLinkIdpReviewProfile")}</button>
        <button type="submit" class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="submitAction" id="linkAccount" value="linkAccount">${msg("confirmLinkIdpContinue", idpAlias)}</button>
      </div>
    </form>
  </#if>
</@layout.registrationLayout>
