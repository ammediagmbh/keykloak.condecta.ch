<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    ${msg("emailVerifyTitle")}
  <#elseif section = "form">
    <p class="instruction">${msg("emailVerifyInstruction1",user.email)}</p> 
  <#elseif section = "info">
    <p class="instruction">
      ${msg("emailVerifyInstruction2")}
      <br/>
      <a href="${url.loginAction}">${msg("doClickHere")}</a> ${msg("emailVerifyInstruction3")}
    </p>
  </#if>
</@layout.registrationLayout>
