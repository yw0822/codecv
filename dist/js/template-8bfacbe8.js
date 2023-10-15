import{m as N}from"./element-plus-37c3e502.js";import{_ as v,g as I,f as q,s as L,N as V,T as M,E as B}from"./index-b0d1f513.js";import{D,o as l,c as F,Z as R,_ as U,a as u,U as r,V as m,at as y,au as k,r as _,b,O as h,u as s,F as E,a6 as g,R as f,Q as A}from"./@vue-c6fcbc26.js";import{u as z}from"./vue-router-5174534a.js";import{t as p,f as G}from"./config-3bd082f3.js";import"./@vueuse-63034ea9.js";import"./lodash-es-9d35530d.js";import"./async-validator-604317c1.js";import"./@element-plus-a7a51df2.js";import"./dayjs-d3824421.js";import"./aos-80360ef4.js";import"./@popperjs-535f1f87.js";import"./@ctrl-aa1b1e70.js";import"./pinia-c946f11f.js";import"./picture-verification-code-77c40e50.js";import"./axios-93ecc7d0.js";import"./nprogress-6c9d9548.js";const O=""+new URL("../png/wechat_group-ab9a254f.png",import.meta.url).href,x=t=>(y("data-v-6174268f"),t=t(),k(),t),J={class:"resume-card","data-aos":"zoom-in"},Q={class:"template-hot"},Z=x(()=>u("i",{class:"iconfont icon-hot font-20"},null,-1)),j=["src"],H=x(()=>u("div",{class:"resume-card-mask"},[u("button",{class:"btn center pointer"},"\u4F7F\u7528\u6A21\u677F")],-1)),K=D({__name:"resumeCard",props:{theme:null},setup(t){const e=z(),a=i=>{e.push({path:"/editor",query:{type:i}})};return(i,o)=>(l(),F("div",J,[R(u("p",Q,[Z,r(" "+m(t.theme.hot),1)],512),[[U,t.theme.hot]]),u("div",{onClick:o[0]||(o[0]=d=>a(t.theme.type))},[u("img",{src:t.theme.img,loading:"lazy"},null,8,j),H,r(" "+m(t.theme.name),1)])]))}});const P=v(K,[["__scopeId","data-v-6174268f"]]),w=["\u5168\u90E8","\u6821\u62DB","\u793E\u62DB","\u82F1\u6587","Geek","\u8FD0\u8425","\u5546\u52A1","\u8BBE\u8BA1","\u4E92\u8054\u7F51","\u7B80\u7EA6","\u6697\u9ED1","\u901A\u7528","\u4E8B\u4E1A\u5355\u4F4D","\u7814\u7A76\u751F\u590D\u8BD5"];function W(){const t=_("\u5168\u90E8"),e=_([...p.value]);function a(i){if(t.value=w[i],t.value==="\u5168\u90E8"){e.value=[...p.value];return}e.value=p.value.filter(o=>o.name.includes(t.value))}return{queryCategory:a,category:t,data:e}}function X(){const t=_([]);async function e(){const a=await G();if(!a.result){q(a.msg);return}const i=JSON.parse(a.result);p.value.forEach(o=>o.hot=i[`t${o.type}`]),t.value=[...p.value].sort((o,d)=>d.hot-o.hot).slice(0,10)}return b(()=>e()),{templateCondition:e,ranks:t}}function Y(){const t=_(!1);function e(){t.value=!1,L("notification","read",1e3*60*60*24*1)}return b(()=>{I("notification")!=="read"&&(t.value=!0)}),{flag:t,close:e}}function uu(t){return t>=1e3?(t/1e3).toFixed(1)+"k":t}const c=t=>(y("data-v-2606ed17"),t=t(),k(),t),tu={class:"resume-container flex"},eu={class:"resume-left-container content-card","data-aos":"fade-right"},ou={key:0,class:"resume-card-container"},su={class:"resume-right-container","data-aos":"fade-left"},au={class:"resume-hot-rank content-card mb-20"},nu=c(()=>u("strong",{class:"mb-20"},"\u7B80\u5386\u6A21\u677F\u70ED\u5EA6\u6392\u884C",-1)),lu={key:0},ru=["onClick"],iu={class:"line-1"},cu={class:"mr-10"},Fu=c(()=>u("i",{class:"iconfont icon-hot"},null,-1)),du=c(()=>u("div",{class:"resume-notification content-card"},[u("strong",null,"\u516C\u544A"),u("p",null,[r(" \u5982\u679C\u4F60\u89C9\u5F97\u9879\u76EE\u5BF9\u4F60\u6709\u6240\u5E2E\u52A9\uFF0C\u8BF7\u8003\u8651\u4E3A "),u("a",{href:"https://github.com/acmenlei/codecv",target:"_blank"},"\u9879\u76EE"),r(" \u70B9\u4E00\u4E2A "),u("i",{class:"iconfont icon-star"}),r("\uFF0C\u82E5\u9047\u5230 BUG \u8BF7\u901A\u8FC7\u5E95\u90E8\u5FAE\u4FE1/ "),u("a",{href:"https://github.com/acmenlei/codecv/issues",target:"_blank"},"issues"),r(" \u63CF\u8FF0\u5E76\u590D\u73B0\u4F60\u6240\u9047\u5230\u7684\u95EE\u9898\uFF0C\u826F\u597D\u7684\u7528\u6237\u4F53\u9A8C\u9700\u8981\u5927\u5BB6\u4E00\u8D77\u6765\u6784\u5EFA\uFF0C\u611F\u8C22\u5927\u5BB6\u7684\u652F\u6301\uFF5E\u{1F64F} ")])],-1)),mu=c(()=>u("h3",{style:{"margin-bottom":"10px"}},"\u901A\u77E5",-1)),pu=c(()=>u("p",{style:{"line-height":"27px"}},[r(" \u8FD1\u671F\u53CD\u5E94\u540C\u5B66\u8F83\u591A\uFF0C\u53D1\u4E2A\u901A\u77E5\u544A\u77E5\u4E00\u4E0B\uFF0C\u6B64\u7F51\u5740\u4E3A\u5907\u7528\u7F51\u5740\uFF0C\u82E5\u9700\u4F53\u9A8C\u66F4\u591A\u529F\u80FD\u8BF7\u524D\u5F80\u4E3B\u7AD9"),u("del",{style:{color:"var(--theme)"}},[u("a",{target:"_blank",href:"https://codecv.top",style:{color:"var(--theme)","text-decoration":"none"}}," https://codecv.top")]),r("(\u4E3B\u7AD9\u6B63\u5728\u5907\u6848\uFF0C\u5927\u6982\u4E00\u5468\u5DE6\u53F3\u6062\u590D\u4F7F\u7528)\uFF0C\u53EF\u8BBF\u95EE\u4E34\u65F6\u5730\u5740"),u("a",{target:"_blank",href:"https://wuxiancv.com",style:{color:"var(--theme)","text-decoration":"none"}}," https://wuxiancv.com")],-1)),_u=c(()=>u("ol",{class:"",style:{margin:"10px 0","padding-left":"20px","line-height":"28px"}},[u("li",null,"\u{1F308} \u4E3B\u7AD9\u5BFC\u51FA\u6587\u4EF6\u66F4\u7A33\u5B9A"),u("li",null,"\u270D\u{1F3FB} \u7F16\u5199\u4F53\u9A8C\u66F4\u597D"),u("li",null,"\u2728 \u5DE5\u5177\u66F4\u52A0\u5B8C\u5584"),u("li",null,"\u2601\uFE0F \u6570\u636E\u4E91\u7AEF\u5B9E\u65F6\u4FDD\u5B58")],-1)),hu=c(()=>u("p",null,"\u82E5\u4E0D\u9700\u8981\u8BF7\u76F4\u63A5\u5FFD\u7565\uFF0C\u8C22\u8C22\u914D\u5408!",-1)),Eu=c(()=>u("br",null,null,-1)),fu=c(()=>u("div",{class:"flex group"},[u("img",{src:O,style:{width:"30%"}}),u("h4",null,"\u52A0\u5165\u7FA4\u804A\u83B7\u53D6\u6700\u65B0\u60C5\u62A5\uFF0C\u5144\u5F1F\u840C\u901F\u901F\u6765\u6C34\u7FA4 \u270C\u{1F3FB}")],-1)),Cu={style:{"text-align":"center","margin-top":"20px"}},Bu=D({__name:"template",setup(t){const{queryCategory:e,data:a}=W(),{ranks:i}=X(),{flag:o,close:d}=Y();return($,C)=>{const S=N;return l(),F(E,null,[u("div",tu,[u("div",eu,[h(V,{button:"\u521B\u4F5C\u6A21\u677F",tabs:s(w),onTabClick:s(e)},null,8,["tabs","onTabClick"]),s(a).length?(l(),F("div",ou,[(l(!0),F(E,null,g(s(a),n=>(l(),f(P,{key:n.id,theme:n},null,8,["theme"]))),128))])):(l(),f(B,{key:1,title:"\u6682\u65F6\u6CA1\u6709\u8FD9\u7C7B\u6A21\u677F \u4F60\u53EF\u4EE5\u70B9\u51FB\u53F3\u4E0A\u89D2\u521B\u4F5C\u6A21\u677F\u6216\u8054\u7CFB\u4F5C\u8005\u6DFB\u52A0\uFF5E"}))]),u("div",su,[u("div",au,[nu,s(i).length?(l(),F("ul",lu,[(l(!0),F(E,null,g(s(i),(n,T)=>(l(),F("li",{key:n.type,class:"flex hover pointer",onClick:gu=>$.$router.push({path:"/editor",query:{type:n.type}})},[h(S,{content:n.name,placement:"left"},{default:A(()=>[u("p",iu,[u("span",cu,m(T+1),1),r(m(n.name),1)])]),_:2},1032,["content"]),u("sub",null,[Fu,r(" "+m(s(uu)(+String(n.hot))),1)])],8,ru))),128))])):(l(),f(B,{key:1,title:"\u6B63\u5728\u52A0\u8F7D\u4E2D"}))]),du])]),h(M,{flag:s(o),onClose:s(d)},{default:A(()=>[mu,pu,_u,hu,Eu,fu,u("p",Cu,[u("button",{class:"primary btn",onClick:C[0]||(C[0]=(...n)=>s(d)&&s(d)(...n))},"\u77E5\u9053\u4E86")])]),_:1},8,["flag","onClose"])],64)}}});const Ru=v(Bu,[["__scopeId","data-v-2606ed17"]]);export{Ru as default};
