import{i as r}from"./index-885f6543.js";import{b as n,u as m}from"./vue-router-059fda26.js";import{E as i,b as s,J as p,o as a,c}from"./@vue-c8b849dd.js";import{_}from"./index-242f51d6.js";import"./config-4240d15d.js";import"./element-plus-5b013558.js";import"./@vueuse-67b6382f.js";import"./lodash-es-742d3967.js";import"./async-validator-8a4f889d.js";import"./@element-plus-6e6d71a8.js";import"./dayjs-e78a62a1.js";import"./aos-17f8bee5.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./markdown-transform-html-ab2f9e2b.js";import"./pinia-9e5c94d8.js";import"./picture-verification-code-aba23b74.js";import"./nprogress-8660dfbd.js";const d={class:"markdown-transform-html jufe"},u=i({__name:"index",setup(l){const t=n(),e=m();return s(()=>{r(String(t.query.type));const o=JSON.parse(localStorage.getItem("download")||"");document.querySelector(".markdown-transform-html").innerHTML=o,setTimeout(()=>{window.print(),e.back()},100)}),p(()=>{localStorage.removeItem("download")}),(o,f)=>(a(),c("div",d))}});const j=_(u,[["__scopeId","data-v-0c3b2034"]]);export{j as default};