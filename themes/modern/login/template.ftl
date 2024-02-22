<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false displayWide=false showAnotherWayIfPresent=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <script src="http://localhost:35729/livereload.js"></script>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
</head>

<body class="${properties.kcBodyClass!}">
  <div class="main ${properties.kcLoginClass!}">
    <div class="session-page">
      <div class="${properties.kcFormCardClass!} <#if displayWide>${properties.kcFormCardAccountClass!}</#if>">
        <header class="${properties.kcFormHeaderClass!}">
          <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
              <div id="kc-locale" class="dropdown">
                  <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
                      <div class="kc-dropdown" id="kc-locale-dropdown">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="kc-current-locale-link">${locale.current}</a>
                          <ul class="dropdown-menu dropdown-menu-right">
                              <#list locale.supported as l>
                                  <li class="kc-dropdown-item dropdown-item"><a href="${l.url}">${l.label}</a></li>
                              </#list>
                          </ul>
                      </div>
                  </div>
              </div>
          </#if>
          <!-- Required fields message -->
          <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
              <#if displayRequiredFields>
                  <div class="${properties.kcContentWrapperClass!}">
                      <div class="">
                          <div id="kc-page-title"><#nested "header"></div>
                      </div>
                  </div>
              <#else>
                  <div id="kc-page-title"><#nested "header"></div>
              </#if>
          <#else>
              <#if displayRequiredFields>
                  <div class="${properties.kcContentWrapperClass!}">
                      <div class="${properties.kcLabelWrapperClass!} subtitle">
                          <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                      </div>
                      <div class="col-md-10">
                          <#nested "show-username">
                          <div class="${properties.kcFormGroupClass!}">
                              <div id="kc-username">
                                  <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                                  <a id="reset-login" href="${url.loginRestartFlowUrl}">
                                      <div class="kc-login-tooltip">
                                          <i class="${properties.kcResetFlowIcon!}"></i>
                                          <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                      </div>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              <#else>
                  <#nested "show-username">
                  <div class="${properties.kcFormGroupClass!}">
                      <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
                      <h4>${msg("continueAuth")}</h4>
                      <p>${msg("continueAuthDescription")}</p>
                      <div id="kc-username">
                          <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                          <a id="reset-login" href="${url.loginRestartFlowUrl}">
                              <div class="kc-login-tooltip">
                                  <i class="${properties.kcResetFlowIcon!}"></i>
                                  <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                              </div>
                          </a>
                      </div>
                  </div>
              </#if>
          </#if>
        </header>
        <div id="kc-content">
          <div id="kc-content-wrapper">

            <#-- App-initiated actions should not see warning messages about the need to complete the action -->
            <#-- during login.                                                                               -->
            <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                <div class="alert alert-${(message.type == 'error')?then('danger', message.type)}">
                    <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                    <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                    <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                    <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                    <span class="kc-feedback-text">${kcSanitize(message.summary)?no_esc}</span>
                </div>
            </#if>

            <#nested "form">

            <#if auth?has_content && auth.showTryAnotherWayLink() && showAnotherWayIfPresent>
            <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post" <#if displayWide>class="${properties.kcContentWrapperClass!}"</#if>>
                <div <#if displayWide>class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}"</#if>>
                    <div class="${properties.kcFormGroupClass!}">
                      <input type="hidden" name="tryAnotherWay" value="on" />
                      <a href="#" id="try-another-way" onclick="document.forms['kc-select-try-another-way-form'].submit();return false;">${msg("doTryAnotherWay")}</a>
                    </div>
                </div>
            </form>
            </#if>

            <#if displayInfo>
                <div id="kc-info" class="${properties.kcSignUpClass!}">
                    <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                        <#nested "info">
                    </div>
                </div>
            </#if>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer>
    ${msg("footerText")}
  </footer>
</body>
</html>
</#macro>
