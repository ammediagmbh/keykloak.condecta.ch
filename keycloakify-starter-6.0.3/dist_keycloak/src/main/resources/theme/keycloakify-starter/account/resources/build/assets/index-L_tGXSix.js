import{r as l,d as a,m as v}from"./index-CbRHuHWR.js";var _={},i={},d=a&&a.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r);var u=Object.getOwnPropertyDescriptor(t,r);(!u||("get"in u?!t.__esModule:u.writable||u.configurable))&&(u={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,u)}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),b=a&&a.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),O=a&&a.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.prototype.hasOwnProperty.call(e,r)&&d(t,e,r);return b(t,e),t};Object.defineProperty(i,"__esModule",{value:!0});i.useEvt=void 0;var p=v,g=O(l),y=g.useEffect;function j(e,t){y(function(){var r=p.Evt.newCtx();return e(r),function(){r.done()}},t)}i.useEvt=j;var f={},h=a&&a.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r);var u=Object.getOwnPropertyDescriptor(t,r);(!u||("get"in u?!t.__esModule:u.writable||u.configurable))&&(u={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,u)}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),S=a&&a.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),E=a&&a.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.prototype.hasOwnProperty.call(e,r)&&h(t,e,r);return S(t,e),t},P=a&&a.__read||function(e,t){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var n=r.call(e),u,o=[],c;try{for(;(t===void 0||t-- >0)&&!(u=n.next()).done;)o.push(u.value)}catch(s){c={error:s}}finally{try{u&&!u.done&&(r=n.return)&&r.call(n)}finally{if(c)throw c.error}}return o};Object.defineProperty(f,"__esModule",{value:!0});f.useRerenderOnStateChange=void 0;var M=i,R=E(l),w=R.useState;function C(e){var t=P(w(function(){return e.state}),2),r=t[1];(0,M.useEvt)(function(n){return e.attach(n,function(u){return r(function(){return u})})},[e])}f.useRerenderOnStateChange=C;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.useRerenderOnStateChange=e.useEvt=void 0;var t=i;Object.defineProperty(e,"useEvt",{enumerable:!0,get:function(){return t.useEvt}});var r=f;Object.defineProperty(e,"useRerenderOnStateChange",{enumerable:!0,get:function(){return r.useRerenderOnStateChange}})})(_);export{_ as h};
