module.exports=[3130,a=>{"use strict";a.s(["Card",()=>d,"CardContent",()=>g,"CardHeader",()=>e,"CardTitle",()=>f]);var b=a.i(87924),c=a.i(97895);function d({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card",className:(0,c.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",a),...d})}function e({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-header",className:(0,c.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",a),...d})}function f({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-title",className:(0,c.cn)("leading-none font-semibold",a),...d})}function g({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-content",className:(0,c.cn)("px-6",a),...d})}},5522,a=>{"use strict";a.s(["Input",()=>d]);var b=a.i(87924),c=a.i(97895);function d({className:a,type:d,...e}){return(0,b.jsx)("input",{type:d,"data-slot":"input",className:(0,c.cn)("file:text-foreground placeholder:text-muted-foreground selection:bg-primary py-6 bg-neutral-50 rounded-xl selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0  border px-3  text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",a),...e})}},56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},9270,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.AppRouterContext},36313,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.HooksClientContext},18341,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.ServerInsertedHtml},41997,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),!function(a,b){for(var c in b)Object.defineProperty(a,c,{enumerable:!0,get:b[c]})}(c,{BailoutToCSRError:function(){return e},isBailoutToCSRError:function(){return f}});let d="BAILOUT_TO_CLIENT_SIDE_RENDERING";class e extends Error{constructor(a){super("Bail out to client-side rendering: "+a),this.reason=a,this.digest=d}}function f(a){return"object"==typeof a&&null!==a&&"digest"in a&&a.digest===d}},50944,(a,b,c)=>{b.exports=a.r(74137)},17171,a=>{"use strict";a.s(["Label",()=>h],17171);var b=a.i(87924),c=a.i(72131);a.i(35112);var d=a.i(11011),e=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"].reduce((a,e)=>{let f=(0,d.createSlot)(`Primitive.${e}`),g=c.forwardRef((a,c)=>{let{asChild:d,...g}=a;return(0,b.jsx)(d?f:e,{...g,ref:c})});return g.displayName=`Primitive.${e}`,{...a,[e]:g}},{}),f=c.forwardRef((a,c)=>(0,b.jsx)(e.label,{...a,ref:c,onMouseDown:b=>{b.target.closest("button, input, select, textarea")||(a.onMouseDown?.(b),!b.defaultPrevented&&b.detail>1&&b.preventDefault())}}));f.displayName="Label";var g=a.i(97895);function h({className:a,...c}){return(0,b.jsx)(f,{"data-slot":"label",className:(0,g.cn)("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",a),...c})}},14964,a=>{"use strict";a.s(["ClipLoader",()=>j],14964);var b,c,d=a.i(72131),e={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function f(a){var b=function(a){if("number"==typeof a)return{value:a,unit:"px"};var b,c=(a.match(/^[0-9.]*/)||"").toString();b=c.includes(".")?parseFloat(c):parseInt(c,10);var d=(a.match(/[^0-9]*$/)||"").toString();return e[d]?{value:b,unit:d}:(console.warn("React Spinners: ".concat(a," is not a valid css value. Defaulting to ").concat(b,"px.")),{value:b,unit:"px"})}(a);return"".concat(b.value).concat(b.unit)}var g=function(){return(g=Object.assign||function(a){for(var b,c=1,d=arguments.length;c<d;c++)for(var e in b=arguments[c])Object.prototype.hasOwnProperty.call(b,e)&&(a[e]=b[e]);return a}).apply(this,arguments)},h=function(a,b){var c={};for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&0>b.indexOf(d)&&(c[d]=a[d]);if(null!=a&&"function"==typeof Object.getOwnPropertySymbols)for(var e=0,d=Object.getOwnPropertySymbols(a);e<d.length;e++)0>b.indexOf(d[e])&&Object.prototype.propertyIsEnumerable.call(a,d[e])&&(c[d[e]]=a[d[e]]);return c},i=(b=0,c="clip","react-spinners-".concat("ClipLoader","-").concat(c));let j=function(a){var b=a.loading,c=a.color,e=void 0===c?"#000000":c,j=a.speedMultiplier,k=a.cssOverride,l=a.size,m=void 0===l?35:l,n=h(a,["loading","color","speedMultiplier","cssOverride","size"]),o=g({background:"transparent !important",width:f(m),height:f(m),borderRadius:"100%",border:"2px solid",borderTopColor:e,borderBottomColor:"transparent",borderLeftColor:e,borderRightColor:e,display:"inline-block",animation:"".concat(i," ").concat(.75/(void 0===j?1:j),"s 0s infinite linear"),animationFillMode:"both"},void 0===k?{}:k);return void 0===b||b?d.createElement("span",g({style:o},n)):null}},33354,(a,b,c)=>{"use strict";c._=function(a){return a&&a.__esModule?a:{default:a}}},92434,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"warnOnce",{enumerable:!0,get:function(){return d}});let d=a=>{}},46058,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},8591,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"useMergedRef",{enumerable:!0,get:function(){return e}});let d=a.r(72131);function e(a,b){let c=(0,d.useRef)(null),e=(0,d.useRef)(null);return(0,d.useCallback)(d=>{if(null===d){let a=c.current;a&&(c.current=null,a());let b=e.current;b&&(e.current=null,b())}else a&&(c.current=f(a,d)),b&&(e.current=f(b,d))},[a,b])}function f(a,b){if("function"!=typeof a)return a.current=b,()=>{a.current=null};{let c=a(b);return"function"==typeof c?c:()=>a(null)}}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},33095,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),!function(a,b){for(var c in b)Object.defineProperty(a,c,{enumerable:!0,get:b[c]})}(c,{default:function(){return i},getImageProps:function(){return h}});let d=a.r(33354),e=a.r(94915),f=a.r(67161),g=d._(a.r(2305));function h(a){let{props:b}=(0,e.getImgProps)(a,{defaultLoader:g.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[a,c]of Object.entries(b))void 0===c&&delete b[a];return{props:b}}let i=f.Image},71987,(a,b,c)=>{b.exports=a.r(33095)},6193,a=>{"use strict";a.s(["default",()=>e]);var b=a.i(87924),c=a.i(3130),d=a.i(71987);let e=({title:a,paragraph:e})=>(0,b.jsxs)(c.CardHeader,{className:"text-center  pt-8",children:[(0,b.jsx)("div",{className:"flex justify-center ",children:(0,b.jsx)(d.default,{src:"/logo.png",className:" w-52 h-52 object-cover rounded-lg drop-shadow-2xl",blurDataURL:"/logo.svg",alt:"logo",width:500,height:600})}),(0,b.jsx)("h2",{className:"text-xl font-semibold  mt-2",children:a}),(0,b.jsx)("p",{children:e||"Tech Advantage Admin Access"})]})},22725,a=>{"use strict";a.s(["useAppDispatch",()=>c,"useAppSelector",()=>d]);var b=a.i(14174);let c=b.useDispatch.withTypes(),d=b.useSelector.withTypes();b.useStore.withTypes()},99248,a=>{"use strict";a.s(["useForgotPasswordMutation",()=>Z,"useGetUserProfileQuery",()=>X,"useLoginMutation",()=>V,"useResetPasswordMutation",()=>_,"useVerifyOTPMutation",()=>$],99248);var b,c=a.i(72131);let d={data:""},e=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,f=/\/\*[^]*?\*\/|  +/g,g=/\n+/g,h=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?h(g,f):f+"{"+h(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=h(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=h.p?h.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},i={},j=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+j(a[c]);return b}return a};function k(a){let b,c,k=this||{},l=a.call?a(k.p):a;return((a,b,c,d,k)=>{var l,m,n,o;let p=j(a),q=i[p]||(i[p]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(p));if(!i[q]){let b=p!==a?a:(a=>{let b,c,d=[{}];for(;b=e.exec(a.replace(f,""));)b[4]?d.shift():b[3]?(c=b[3].replace(g," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(g," ").trim();return d[0]})(a);i[q]=h(k?{["@keyframes "+q]:b}:b,c?"":"."+q)}let r=c&&i.g?i.g:null;return c&&(i.g=i[q]),l=i[q],m=b,n=d,(o=r)?m.data=m.data.replace(o,l):-1===m.data.indexOf(l)&&(m.data=n?l+m.data:m.data+l),q})(l.unshift?l.raw?(b=[].slice.call(arguments,1),c=k.p,l.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":h(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):l.reduce((a,b)=>Object.assign(a,b&&b.call?b(k.p):b),{}):l,k.target||d,k.g,k.o,k.k)}k.bind({g:1});let l,m,n,o=k.bind({k:1});function p(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:m&&m()},h),c.o=/ *go\d+/.test(i),h.className=k.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),n&&j[0]&&n(h),l(j,h)}return b?b(e):e}}var q=(a,b)=>"function"==typeof a?a(b):a,r=(()=>{let a=0;return()=>(++a).toString()})(),s=(()=>{let a;return()=>a})(),t="default",u=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return u(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},v=[],w={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},x={},y=(a,b=t)=>{x[b]=u(x[b]||w,a),v.forEach(([a,c])=>{a===b&&c(x[b])})},z=a=>Object.keys(x).forEach(b=>y(a,b)),A=(a=t)=>b=>{y(b,a)},B=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||r()}))(b,a,c);return A(e.toasterId||(d=e.id,Object.keys(x).find(a=>x[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},C=(a,b)=>B("blank")(a,b);C.error=B("error"),C.success=B("success"),C.loading=B("loading"),C.custom=B("custom"),C.dismiss=(a,b)=>{let c={type:3,toastId:a};b?A(b)(c):z(c)},C.dismissAll=a=>C.dismiss(void 0,a),C.remove=(a,b)=>{let c={type:4,toastId:a};b?A(b)(c):z(c)},C.removeAll=a=>C.remove(void 0,a),C.promise=(a,b,c)=>{let d=C.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?q(b.success,a):void 0;return e?C.success(e,{id:d,...c,...null==c?void 0:c.success}):C.dismiss(d),a}).catch(a=>{let e=b.error?q(b.error,a):void 0;e?C.error(e,{id:d,...c,...null==c?void 0:c.error}):C.dismiss(d)}),a};var D=o`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,E=o`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=o`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=p("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${E} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,H=o`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,I=p("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${H} 1s linear infinite;
`,J=o`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,K=o`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,L=p("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${K} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,M=p("div")`
  position: absolute;
`,N=p("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,O=o`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,P=p("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${O} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Q=({toast:a})=>{let{icon:b,type:d,iconTheme:e}=a;return void 0!==b?"string"==typeof b?c.createElement(P,null,b):b:"blank"===d?null:c.createElement(N,null,c.createElement(I,{...e}),"loading"!==d&&c.createElement(M,null,"error"===d?c.createElement(G,{...e}):c.createElement(L,{...e})))},R=p("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,S=p("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;c.memo(({toast:a,position:b,style:d,children:e})=>{let f=a.height?((a,b)=>{let c=a.includes("top")?1:-1,[d,e]=s()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*c}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*c}%,-1px) scale(.6); opacity:0;}
`];return{animation:b?`${o(d)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${o(e)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(a.position||b||"top-center",a.visible):{opacity:0},g=c.createElement(Q,{toast:a}),h=c.createElement(S,{...a.ariaProps},q(a.message,a));return c.createElement(R,{className:a.className,style:{...f,...d,...a.style}},"function"==typeof e?e({icon:g,message:h}):c.createElement(c.Fragment,null,g,h))}),b=c.createElement,h.p=void 0,l=b,m=void 0,n=void 0,k`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var T=a.i(97893),U=a.i(40541);let{useLoginMutation:V,useLogoutMutation:W,useGetUserProfileQuery:X,useRefreshTokenMutation:Y,useForgotPasswordMutation:Z,useVerifyOTPMutation:$,useResetPasswordMutation:_}=U.apiSlice.injectEndpoints({endpoints:a=>({login:a.mutation({query:a=>({url:"/auth/login",method:"POST",body:a}),async onQueryStarted(a,{dispatch:b,queryFulfilled:c}){b((0,T.setLoading)(!0));try{let{data:a}=await c,d=a.data,e=await fetch("https://api.t3chadvantage.com/api/v1/user/profile",{headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"}});if(!e.ok)throw C.error("Failed to fetch user profile"),Error("Failed to fetch user profile");let f=await e.json();if("SUPER_ADMIN"!==f?.data?.role)throw C.error("You are not authorized to access this page"),Error("You are not authorized to access this page");b((0,T.setCredentials)({user:f.user||f,token:d}))}catch(a){throw b((0,T.logout)()),a}finally{b((0,T.setLoading)(!1))}}}),getUserProfile:a.query({query:()=>({url:"https://api.t3chadvantage.com/api/v1/user/profile",headers:{"Content-Type":"application/json"}}),providesTags:["User"],transformResponse:a=>({user:a.user||a})}),logout:a.mutation({query:()=>({url:"/auth/logout",method:"POST"}),async onQueryStarted(a,{dispatch:b,queryFulfilled:c}){try{await c,b((0,T.logout)()),b(U.apiSlice.util.resetApiState())}catch(a){throw b((0,T.logout)()),b(U.apiSlice.util.resetApiState()),a}}}),refreshToken:a.mutation({query:()=>({url:"/auth/refresh",method:"POST"})}),forgotPassword:a.mutation({query:a=>({url:"/auth/forget-password",method:"POST",body:a})}),verifyOTP:a.mutation({query:({otp:a,email:b})=>({url:"/auth/verify-email",method:"POST",body:{email:b,oneTimeCode:a}})}),resetPassword:a.mutation({query:({password:a,confirmPassword:b,authToken:c})=>({url:"/auth/reset-password",headers:{Authorization:c||""},method:"POST",body:{newPassword:a,confirmPassword:b}})})})})}];

//# sourceMappingURL=%5Broot-of-the-server%5D__aa0f1b00._.js.map