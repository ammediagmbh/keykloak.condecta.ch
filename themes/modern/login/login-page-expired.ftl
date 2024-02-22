<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <h4>${msg("pageExpiredTitle")}</h4>
    <p>${msg("pageExpiredDescription")}</p>
  <#elseif section = "form">
    <p id="instruction1" class="instruction">
      ${msg("pageExpiredMsg1")} <a id="loginRestartLink" href="${url.loginRestartFlowUrl}">${msg("doClickHere")}</a> .<br/>
      ${msg("pageExpiredMsg2")} <a id="loginContinueLink" href="${url.loginAction}">${msg("doClickHere")}</a> .
    </p>
  </#if>
</@layout.registrationLayout>
