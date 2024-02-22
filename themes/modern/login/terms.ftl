<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <h4>${msg("termsTitle")}</h4>
  <#elseif section = "form">
    <div id="kc-terms-text">
      ${kcSanitize(msg("termsText"))?no_esc}
    </div>
    <form class="form-actions terms-form" action="${url.loginAction}" method="POST">
      <input class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!} btn-cancel" name="cancel" id="kc-decline" type="submit" value="${msg("doDecline")}"/>
      <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" name="accept" id="kc-accept" type="submit" value="${msg("doAccept")}"/>
    </form>
    <div class="clearfix"></div>
  </#if>
</@layout.registrationLayout>
