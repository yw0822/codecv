var d=Object.defineProperty;var g=(e,t,o)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var f=(e,t,o)=>(g(e,typeof t!="symbol"?t+"":t,o),o);import{_ as c,E}from"./jspdf.0b42b4d1.js";import{t as y}from"./config.7c9af602.js";import{r as T}from"./element-plus.c24761e2.js";import L from"./html2canvas.4d0ab5af.js";import{s as w,e as D}from"./index.fc3a7f73.js";const P=(e,t)=>{const o=e[t];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((s,i)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+t)))})};async function V(e){return(await P(Object.assign({"../../templates/business/style.scss":()=>c(()=>Promise.resolve({}),["./style.921137d1.css"],import.meta.url),"../../templates/concise/style.scss":()=>c(()=>Promise.resolve({}),["./style.5608aa1c.css"],import.meta.url),"../../templates/create/style.scss":()=>c(()=>Promise.resolve({}),["./style.05d652a8.css"],import.meta.url),"../../templates/fresh/style.scss":()=>c(()=>Promise.resolve({}),["./style.30149525.css"],import.meta.url),"../../templates/front_end/style.scss":()=>c(()=>Promise.resolve({}),["./style.9a1b3212.css"],import.meta.url),"../../templates/general/style.scss":()=>c(()=>Promise.resolve({}),["./style.f1ccec0a.css"],import.meta.url),"../../templates/graduation_reexam/style.scss":()=>c(()=>Promise.resolve({}),["./style.396bad6e.css"],import.meta.url),"../../templates/internet/style.scss":()=>c(()=>Promise.resolve({}),["./style.8cdab9ef.css"],import.meta.url),"../../templates/internet_avatar/style.scss":()=>c(()=>Promise.resolve({}),["./style.98063749.css"],import.meta.url),"../../templates/internet_social/style.scss":()=>c(()=>Promise.resolve({}),["./style.d0f50919.css"],import.meta.url),"../../templates/operation/style.scss":()=>c(()=>Promise.resolve({}),["./style.bf4e149e.css"],import.meta.url),"../../templates/operation_avatar/style.scss":()=>c(()=>Promise.resolve({}),["./style.a72a82d8.css"],import.meta.url),"../../templates/simple_avatar/style.scss":()=>c(()=>Promise.resolve({}),["./style.7eb98396.css"],import.meta.url)}),`../../templates/${e}/style.scss`)).default}const N=e=>{for(const t of y)if(e===t.type)return t.content;return""},S={h1:{max:30,min:-15,top:0,tag:"",optimal:0},h2:{max:30,min:-15,top:0,tag:"",optimal:0},h3:{max:20,min:-15,top:0,tag:"",optimal:0},h4:{max:20,min:-15,top:0,tag:"",optimal:0},h5:{max:20,min:-15,top:0,tag:"",optimal:0},h6:{max:20,min:-15,top:0,tag:"",optimal:0},li:{max:10,min:-15,top:0,tag:"",optimal:0},p:{max:10,min:-15,top:0,tag:"",optimal:0}},A=(e,t)=>e.optimal>t.optimal,_=(e,t,o)=>[e[t],e[o]]=[e[o],e[t]];class B{constructor(t){f(this,"container",[]);f(this,"cmp",A);this.cmp=t}push(t){const{container:o,cmp:s}=this;o.push(t);let i=o.length-1;for(;i;){const a=Math.floor((i-1)/2);if(!s(o[i],o[a]))return;_(o,i,a),i=a}}pop(){const{container:t,cmp:o}=this;if(!t.length)return null;_(t,0,t.length-1);const s=t.pop(),i=t.length;let a=0,r=a*2+1;for(;r<i;){const n=a*2+2;if(n<i&&o(t[n],t[r])&&(r=n),!o(t[r],t[a]))break;_(t,r,a),a=r,r=a*2+1}return s}top(){return this.container.length?this.container[0]:null}isEmpty(){return this.container.length===0}}function $(){return document.createElement("style")}function k(){return document.createElement("div")}function v(e){return document.head.querySelector(`style[${e}]`)}function H(e){var t;(t=v(e))==null||t.remove()}function q(e,t){const{showLoading:o,closeLoading:s}=O();o("\u6B63\u5728\u5BFC\u51FAPDF \u8BF7\u8010\u5FC3\u7B49\u5F85..."),L(t,{allowTaint:!1,logging:!1,useCORS:!0,scale:4}).then(i=>{var h;const a=new E("p","mm","a4"),r=i.getContext("2d"),n=210,m=297,l=Math.floor(m*i.width/n);let u=0;for(;u<i.height;){const p=document.createElement("canvas");p.width=i.width,p.height=Math.min(l,i.height-u),(h=p.getContext("2d"))==null||h.putImageData(r==null?void 0:r.getImageData(0,u,i.width,Math.min(l,i.height-u)),0,0),a.addImage(p.toDataURL("image/jpeg",1),"JPEG",0,0,n,Math.min(m,n*p.height/p.width)),u+=l,i.height-u>1&&a.addPage()}a.save(`${e}.pdf`),w("PDF\u5BFC\u51FA\u6210\u529F")}).catch(i=>{D("\u5BFC\u51FA\u5931\u8D25, "+i)}).finally(s)}function O(){let e=null;function t(s){e=T.service({lock:!0,text:s,background:"rgba(0, 0, 0, 0.7)"})}function o(){e&&e.close()}return{showLoading:t,closeLoading:o}}function G(e=0){const t=document.documentElement||document.body;let o=Math.abs(t.scrollTop-e)/20,s=0,i=-1;const a=o;function r(){s=t.scrollTop;const n=s-e;i==s||n==0||(i=s,window.requestAnimationFrame(function(){if(o=n>0?a:-a,s-=o,Math.abs(n)<a){t.scrollTop=e;return}t.scrollTop=s,Math.abs(n)>0&&r()}))}r()}function U(e){let t=e==null?void 0:e.offsetTop,o=e==null?void 0:e.offsetParent;for(;o!==null;)t+=o.offsetTop,o=o.offsetParent;return t}function x({node:e,latest:t,uid:o}){var i,a;let s="";if(e.nodeType===Node.ELEMENT_NODE){const r=e.classList,n=e.tagName.toLowerCase();r.contains("flex-layout")?s+=`
::: start
`:r.contains("iconfont")?s+=`icon:${r[1].slice(5)} `:r.contains("head-layout")?s+=`
::: headStart
`:n==="a"?s+="[":["b","strong"].includes(n)?s+="**":n[0]==="h"?s+="#".repeat(+n[1])+" ":n==="li"?s+=`${((i=e.parentElement)==null?void 0:i.tagName.toLowerCase())=="ul"?"- ":o+". "}`:["td","th"].includes(n)?s+="| ":n==="code"?s+="`":n==="i"&&r[0]!="iconfont"?s+="*":n==="br"&&(s+="&nbsp;");const m=e.childNodes;for(let l=0;l<m.length;l++){const u=m[l].nodeType==m[l].ELEMENT_NODE&&((a=m[l].parentElement)==null?void 0:a.tagName.toLowerCase())=="ol";s+=x({node:m[l],latest:l===m.length-1,uid:u?++o:0})}if(r.contains("flex-layout"))s+="::: end";else if(r.contains("head-layout"))s+="::: headEnd";else if(r.contains("flex-layout-item")&&!t)s+=`
:::`;else if(n=="a")s+=`](${e.textContent})`;else if(["b","strong"].includes(n))s+="**";else if(n=="img"){const l=e.alt,u=l==null?void 0:l.includes("\u4E2A\u4EBA\u5934\u50CF");s+=`![${u?"\u4E2A\u4EBA\u5934\u50CF":l}](${e.src})`}else n==="tr"?s+="|":["th","td"].includes(n)?s+=" ":n==="code"?s+="`":n==="i"&&r[0]!="iconfont"&&(s+="*");["b","span","strong","a","i","td","th","thead","code","ul","ol"].includes(n)||(s+=`
`)}else{const r=e.textContent||"";s+=r}return s}export{B as H,$ as a,k as b,U as c,q as d,x as e,N as g,V as i,S as o,v as q,H as r,G as s};