import{f as o}from"./index.281e2969.js";import{t as i}from"./theme.5b844ea5.js";const n=(t,e)=>{const r=t[e];return r?typeof r=="function"?r():Promise.resolve(r):new Promise((m,s)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(s.bind(null,new Error("Unknown variable dynamic import: "+e)))})},a=async t=>await n(Object.assign({"../styles/front_end.css":()=>o(()=>Promise.resolve({}),["./front_end.f8bfab41.css"],import.meta.url),"../styles/operation.css":()=>o(()=>Promise.resolve({}),["./operation.f761bf5a.css"],import.meta.url),"../styles/test.css":()=>o(()=>Promise.resolve({}),["./test.a586f3cd.css"],import.meta.url)}),`../styles/${t}.css`),c=t=>{for(let e of i)if(t===e.type)return e.content;return""};export{c as g,a as i};