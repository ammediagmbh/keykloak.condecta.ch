<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <#if messageHeader??>
      ${messageHeader}
    </#if>
  <#elseif section = "form">
    <div id="kc-info-message">
      <p class="instruction">
        ${message.summary}
        <#if requiredActions??>
          <#list requiredActions>: <b><#items as reqActionItem>${msg("requiredAction.${reqActionItem}")}<#sep>, </#items></b></#list><#else></#if></p>
        <#if skipLink??>
        <#else>
          <#if pageRedirectUri?has_content>
            <p><a href="${pageRedirectUri}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
          <#elseif actionUri?has_content>
            <p><a href="${actionUri}">${kcSanitize(msg("proceedWithAction"))?no_esc}</a></p>
          <#elseif (client.baseUrl)?has_content>
            <p><a href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
          </#if>
        </#if>
    </div>
  </#if>
</@layout.registrationLayout>
