<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <h4>${msg("emailLinkIdpTitle", idpAlias)}</h4>
    <p>${msg("thisProcessLinksYourAccount")}</p>
  <#elseif section = "form">
    <p id="instruction1" class="instruction">
      ${msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
    </p>
    <hr />
    <p id="instruction2" class="instruction">
      ${msg("emailLinkIdp2")} <a href="${url.loginAction}">${msg("doClickHere")}</a> ${msg("emailLinkIdp3")}
    </p>
    <p id="instruction3" class="instruction">
      ${msg("emailLinkIdp4")} <a href="${url.loginAction}">${msg("doClickHere")}</a> ${msg("emailLinkIdp5")}
    </p>
  </#if>
</@layout.registrationLayout>
