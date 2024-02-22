<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <h4>${msg("errorTitle")}</h4>
  <#elseif section = "form">
    <div id="kc-error-message">
      <p class="instruction">${message.summary}</p>
      <#if client?? && client.baseUrl?has_content>
        <p><a id="backToApplication" href="${client.baseUrl}">${msg("backToApplication")?no_esc}</a></p>
      </#if>
    </div>
  </#if>
</@layout.registrationLayout>
