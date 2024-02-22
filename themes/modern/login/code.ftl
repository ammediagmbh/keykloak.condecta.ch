<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <#if code.success>
      <h4>${msg("codeSuccessTitle")}</h4>
    <#else>
      <h4>${msg("codeErrorTitle", code.error)}</h4>
    </#if>
  <#elseif section = "form">
    <div id="kc-code">
      <#if code.success>
        <p>${msg("copyCodeInstruction")}</p>
        <input id="code" class="${properties.kcTextareaClass!}" value="${code.code}"/>
      <#else>
        <p id="error">${code.error}</p>
      </#if>
    </div>
  </#if>
</@layout.registrationLayout>
