<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
  <#if section = "header">
    <h1><img class="${properties.kcHeaderLogoClass!}" src="${url.resourcesPath}/img/logo.png"></h1>
    <h4>${msg("registerTitle")}</h4>
    <p>${msg("enterCredentialsToLogin")}</p>
  <#elseif section = "form">
    <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
      <div class="${properties.kcFormGroupClass!} ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('firstName',properties.kcFormGroupErrorClass!)}">
        <div class="${properties.kcLabelWrapperClass!}">
          <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
        </div>
        <div class="${properties.kcInputWrapperClass!}">
          <input
            type="text"
            id="firstName"
            class="${properties.kcInputClass!}"
            name="firstName"
            value="${(register.formData.firstName!'')}"
            placeholder="${msg('enterFirstName')}"
          />
        </div>
      </div>

      <div class="${properties.kcFormGroupClass!} ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('lastName',properties.kcFormGroupErrorClass!)}">
        <div class="${properties.kcLabelWrapperClass!}">
          <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
        </div>
        <div class="${properties.kcInputWrapperClass!}">
          <input
            type="text"
            id="lastName"
            class="${properties.kcInputClass!}"
            name="lastName"
            value="${(register.formData.lastName!'')}"
            placeholder="${msg('enterLastName')}"
          />
        </div>
      </div>

      <#if !realm.registrationEmailAsUsername>
        <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('username',properties.kcFormGroupErrorClass!)}">
          <div class="${properties.kcLabelWrapperClass!}">
            <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
          </div>
          <div class="${properties.kcInputWrapperClass!}">
            <input
              type="text"
              id="username"
              class="${properties.kcInputClass!}"
              name="username"
              value="${(register.formData.username!'')}"
              autocomplete="username"
              placeholder="${msg('enterUsername')}"
            />
          </div>
        </div>
      </#if>

      <div class="${properties.kcFormGroupClassHidden!} ${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('email',properties.kcFormGroupErrorClass!)}">
        <div class="${properties.kcLabelWrapperClass!}">
          <label for="email" class="${properties.kcLabelClass!}">${msg("email")}</label>
        </div>
        <div class="${properties.kcInputWrapperClass!}">
          <input
            type="text"
            id="email"
            class="${properties.kcInputClass!}"
            name="email"
            value="${(register.formData.email!'')}"
            autocomplete="email"
            placeholder="${msg('enterEmail')}"
          />
        </div>
      </div>

      <#if passwordRequired??>
        <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password',properties.kcFormGroupErrorClass!)}">
          <div class="${properties.kcLabelWrapperClass!}">
            <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
          </div>
          <div class="${properties.kcInputWrapperClass!}">
            <input
              type="password"
              id="password"
              class="${properties.kcInputClass!}"
              name="password"
              autocomplete="new-password"
              placeholder="${msg('enterPassword')}"
            />
          </div>
        </div>

        <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password-confirm',properties.kcFormGroupErrorClass!)}">
          <div class="${properties.kcLabelWrapperClass!}">
            <label for="password-confirm" class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
          </div>
          <div class="${properties.kcInputWrapperClass!}">
            <input
              type="password"
              id="password-confirm"
              class="${properties.kcInputClass!}"
              name="password-confirm"
              placeholder="${msg('enterPasswordConfirmation')}"
            />
          </div>
        </div>
      </#if>

      <#if recaptchaRequired??>
        <div class="form-group">
          <div class="${properties.kcInputWrapperClass!}">
            <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
          </div>
        </div>
      </#if>

      <div class="${properties.kcFormGroupClass!}">
        <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
          <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doRegister")}"/>
        </div>
      </div>
    </form>
    <span>
      ${msg('alreadyGotAnAccount')}
      <a href="${url.loginUrl}">${kcSanitize(msg("doLogin"))?no_esc}</a>
    </span>
  </#if>
</@layout.registrationLayout>
