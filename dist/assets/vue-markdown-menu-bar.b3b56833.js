import{r as d,e as T,y,C as M,o as r,c as u,a as i,T as h,M as B,u as f,n as g,ar as x,L as I,a3 as b,O as k,U as w}from"./@vue.36a15b24.js";const p=(t,e)=>{const n=t.__vccOpts||t;for(const[l,o]of e)n[l]=o;return n};function C(t=0){const e=document.documentElement||document.body;let n=Math.abs(e.scrollTop-t)/20,l=0,o=n,c=-1;function s(){l=e.scrollTop;let a=l-t;c==l||a==0||(c=l,window.requestAnimationFrame(function(){if(n=a>0?o:-o,l-=n,Math.abs(a)<o){e.scrollTop=t;return}e.scrollTop=l,Math.abs(a)>0&&s()}))}s()}function E(t,e){let n=null;return function(...l){const o=this;clearTimeout(n),n=setTimeout(()=>{t.apply(o,l)},e)}}function D(){const t=d(0),e=E(function(){t.value=(document.documentElement||document.body).scrollTop},50);return T(()=>{document.addEventListener("scroll",e)}),y(()=>{document.removeEventListener("scroll",e)}),t}const S=["level"],A=M({__name:"MenuBarItem",props:{MenuItem:null},setup(t){const e=D();return(n,l)=>(r(),u("div",{class:"o_menu-bar_title",level:t.MenuItem.level},[i("span",{class:B({o_active:f(e)>=t.MenuItem.offset&&f(e)<t.MenuItem.offsetMax})},h(t.MenuItem.title),3)],8,S))}});const L=p(A,[["__scopeId","data-v-ec688799"]]);function P(t){const e=d([]);return g(()=>{e.value=_(t)}),x(()=>{e.value=_(t)}),e}function _(t){const e=[];return v(e,document.querySelector(t)),G(e),e}function v(t,e,n){const l=e==null?void 0:e.tagName.toLowerCase();if((e==null?void 0:e.nodeType)==1&&l[0]==="h"){const o={offsetMax:0};o.title=e.textContent+"",o.level=+l[1],o.offset=F(e),o.target=e,t.push(o)}else{if(!e||e.nodeType!=1)return;let o=Array.from(e.children);for(let c of o)v(t,c)}}function F(t){let e=t==null?void 0:t.offsetTop,n=t.offsetParent;for(;n!==null;)e+=n.offsetTop,n=n.offsetParent;return e}function G(t){for(let e=0,n=t.length;e<n;e++)e+1<n?t[e].offsetMax=t[e+1].offset:t[e].offsetMax=1/0}const N={class:"o_menu_title"},O={class:"o_menu_bar_container"},V=M({__name:"MenuBar",props:{body:null,width:null,menuTitle:null},emits:["MenuBarClick"],setup(t,{emit:e}){const{width:n,body:l}=t,o=P(l);function c(s){C(s.offset),e("MenuBarClick",s)}return(s,a)=>(r(),u("div",{class:"o_navigator_menu",style:w({width:typeof t.width=="number"?t.width+"px":t.width})},[i("h3",N,h(t.menuTitle||"\u76EE\u5F55"),1),i("div",O,[(r(!0),u(I,null,b(f(o),m=>(r(),k(L,{MenuItem:m,onClick:$=>c(m)},null,8,["MenuItem","onClick"]))),256))])],4))}});const z=p(V,[["__scopeId","data-v-f9a271cd"]]);export{z as V,p as _};