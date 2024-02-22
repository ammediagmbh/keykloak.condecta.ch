import{r as k,j as s}from"./index-PCTXMqwh.js";import{c as y}from"./useGetClassName-B7fCCu0h.js";import{u as S}from"./useFormValidation-DbFv93NN.js";import{u as I}from"./useGetClassName-D6X8vyy2.js";function w(g){const{kcContext:i,onIsFormSubmittableValueChange:c,i18n:t,getClassName:l,BeforeField:d,AfterField:a}=g,{advancedMsg:o,msg:j}=t,{formValidationState:{fieldStateByAttributeName:C,isFormSubmittable:h},formValidationDispatch:n,attributesWithPassword:f}=S({kcContext:i,i18n:t});k.useEffect(()=>{c(h)},[h]);let m="";return s.jsx(s.Fragment,{children:f.map((e,B)=>{const{group:x="",groupDisplayHeader:b="",groupDisplayDescription:v=""}=e,{value:N,displayableErrors:p}=C[e.name],F=y(l("kcFormGroupClass"),p.length!==0&&l("kcFormGroupErrorClass"));return s.jsxs(k.Fragment,{children:[x!==m&&(m=x)!==""&&s.jsxs("div",{className:F,children:[s.jsx("div",{className:l("kcContentWrapperClass"),children:s.jsx("label",{id:`header-${x}`,className:l("kcFormGroupHeader"),children:o(b)||m})}),v!==""&&s.jsx("div",{className:l("kcLabelWrapperClass"),children:s.jsx("label",{id:`description-${x}`,className:l("kcLabelClass"),children:o(v)})})]}),d&&s.jsx(d,{attribute:e}),s.jsxs("div",{className:F,children:[s.jsxs("div",{className:l("kcLabelWrapperClass"),children:[s.jsx("label",{htmlFor:e.name,className:l("kcLabelClass"),children:o(e.displayName??"")}),e.required&&s.jsx(s.Fragment,{children:"*"})]}),s.jsxs("div",{className:l("kcInputWrapperClass"),children:[(()=>{const{options:u}=e.validators;return u!==void 0?s.jsx("select",{id:e.name,name:e.name,onChange:r=>n({action:"update value",name:e.name,newValue:r.target.value}),onBlur:()=>n({action:"focus lost",name:e.name}),value:N,children:s.jsxs(s.Fragment,{children:[s.jsx("option",{value:"",selected:!0,disabled:!0,hidden:!0,children:j("selectAnOption")}),u.options.map(r=>s.jsx("option",{value:r,children:r},r))]})}):s.jsx("input",{type:(()=>{switch(e.name){case"password-confirm":case"password":return"password";default:return"text"}})(),id:e.name,name:e.name,value:N,onChange:r=>n({action:"update value",name:e.name,newValue:r.target.value}),onBlur:()=>n({action:"focus lost",name:e.name}),className:l("kcInputClass"),"aria-invalid":p.length!==0,disabled:e.readOnly,autoComplete:e.autocomplete})})(),p.length!==0&&(()=>{const u=`input-error-${e.name}`;return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`#${u} > span: { display: block; }`}),s.jsx("span",{id:u,className:l("kcInputErrorMessageClass"),style:{position:p.length===1?"absolute":void 0},"aria-live":"polite",children:p.map(({errorMessage:r})=>r)})]})})()]})]}),a&&s.jsx(a,{attribute:e})]},B)})})}function L(g){const{kcContext:i,i18n:c,doUseDefaultCss:t,Template:l,classes:d}=g,{getClassName:a}=I({doUseDefaultCss:t,classes:d}),{url:o,messagesPerField:j,recaptchaRequired:C,recaptchaSiteKey:h}=i,{msg:n,msgStr:f}=c,[m,e]=k.useState(!1);return s.jsx(l,{kcContext:i,i18n:c,doUseDefaultCss:t,classes:d,displayMessage:j.exists("global"),displayRequiredFields:!0,headerNode:n("registerTitle"),children:s.jsxs("form",{id:"kc-register-form",className:a("kcFormClass"),action:o.registrationAction,method:"post",children:[s.jsx(w,{kcContext:i,onIsFormSubmittableValueChange:e,i18n:c,getClassName:a}),C&&s.jsx("div",{className:"form-group",children:s.jsx("div",{className:a("kcInputWrapperClass"),children:s.jsx("div",{className:"g-recaptcha","data-size":"compact","data-sitekey":h})})}),s.jsxs("div",{className:a("kcFormGroupClass"),style:{marginBottom:30},children:[s.jsx("div",{id:"kc-form-options",className:a("kcFormOptionsClass"),children:s.jsx("div",{className:a("kcFormOptionsWrapperClass"),children:s.jsx("span",{children:s.jsx("a",{href:o.loginUrl,children:n("backToLogin")})})})}),s.jsx("div",{id:"kc-form-buttons",className:a("kcFormButtonsClass"),children:s.jsx("input",{className:y(a("kcButtonClass"),a("kcButtonPrimaryClass"),a("kcButtonBlockClass"),a("kcButtonLargeClass")),type:"submit",value:f("doRegister"),disabled:!m})})]})]})})}export{L as default};
