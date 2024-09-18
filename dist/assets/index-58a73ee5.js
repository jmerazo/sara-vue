(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}})();function o0(c,e){const a=Object.create(null),r=c.split(",");for(let t=0;t<r.length;t++)a[r[t]]=!0;return e?t=>!!a[t.toLowerCase()]:t=>!!a[t]}const d1={},o4=[],h2=()=>{},hd=()=>!1,md=/^on[^a-z]/,E6=c=>md.test(c),T7=c=>c.startsWith("onUpdate:"),V1=Object.assign,P7=(c,e)=>{const a=c.indexOf(e);a>-1&&c.splice(a,1)},vd=Object.prototype.hasOwnProperty,o1=(c,e)=>vd.call(c,e),j=Array.isArray,l4=c=>A4(c)==="[object Map]",Z3=c=>A4(c)==="[object Set]",Kc=c=>A4(c)==="[object Date]",dd=c=>A4(c)==="[object RegExp]",a1=c=>typeof c=="function",L1=c=>typeof c=="string",h6=c=>typeof c=="symbol",p1=c=>c!==null&&typeof c=="object",R7=c=>p1(c)&&a1(c.then)&&a1(c.catch),ur=Object.prototype.toString,A4=c=>ur.call(c),pd=c=>A4(c).slice(8,-1),hr=c=>A4(c)==="[object Object]",I7=c=>L1(c)&&c!=="NaN"&&c[0]!=="-"&&""+parseInt(c,10)===c,Q4=o0(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),l0=c=>{const e=Object.create(null);return a=>e[a]||(e[a]=c(a))},zd=/-(\w)/g,$1=l0(c=>c.replace(zd,(e,a)=>a?a.toUpperCase():"")),Hd=/\B([A-Z])/g,t2=l0(c=>c.replace(Hd,"-$1").toLowerCase()),T6=l0(c=>c.charAt(0).toUpperCase()+c.slice(1)),c6=l0(c=>c?`on${T6(c)}`:""),C4=(c,e)=>!Object.is(c,e),f4=(c,e)=>{for(let a=0;a<c.length;a++)c[a](e)},F8=(c,e,a)=>{Object.defineProperty(c,e,{configurable:!0,enumerable:!1,value:a})},B8=c=>{const e=parseFloat(c);return isNaN(e)?c:e},U8=c=>{const e=L1(c)?Number(c):NaN;return isNaN(e)?c:e};let Zc;const R5=()=>Zc||(Zc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Cd="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console",Vd=o0(Cd);function _4(c){if(j(c)){const e={};for(let a=0;a<c.length;a++){const r=c[a],t=L1(r)?bd(r):_4(r);if(t)for(const n in t)e[n]=t[n]}return e}else{if(L1(c))return c;if(p1(c))return c}}const Md=/;(?![^(]*\))/g,gd=/:([^]+)/,Ld=/\/\*[^]*?\*\//g;function bd(c){const e={};return c.replace(Ld,"").split(Md).forEach(a=>{if(a){const r=a.split(gd);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function X1(c){let e="";if(L1(c))e=c;else if(j(c))for(let a=0;a<c.length;a++){const r=X1(c[a]);r&&(e+=r+" ")}else if(p1(c))for(const a in c)c[a]&&(e+=a+" ");return e.trim()}function xd(c){if(!c)return null;let{class:e,style:a}=c;return e&&!L1(e)&&(c.class=X1(e)),a&&(c.style=_4(a)),c}const yd="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Nd=o0(yd);function mr(c){return!!c||c===""}function Sd(c,e){if(c.length!==e.length)return!1;let a=!0;for(let r=0;a&&r<c.length;r++)a=H3(c[r],e[r]);return a}function H3(c,e){if(c===e)return!0;let a=Kc(c),r=Kc(e);if(a||r)return a&&r?c.getTime()===e.getTime():!1;if(a=h6(c),r=h6(e),a||r)return c===e;if(a=j(c),r=j(e),a||r)return a&&r?Sd(c,e):!1;if(a=p1(c),r=p1(e),a||r){if(!a||!r)return!1;const t=Object.keys(c).length,n=Object.keys(e).length;if(t!==n)return!1;for(const s in c){const i=c.hasOwnProperty(s),o=e.hasOwnProperty(s);if(i&&!o||!i&&o||!H3(c[s],e[s]))return!1}}return String(c)===String(e)}function f0(c,e){return c.findIndex(a=>H3(a,e))}const vr=c=>L1(c)?c:c==null?"":j(c)||p1(c)&&(c.toString===ur||!a1(c.toString))?JSON.stringify(c,dr,2):String(c),dr=(c,e)=>e&&e.__v_isRef?dr(c,e.value):l4(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((a,[r,t])=>(a[`${r} =>`]=t,a),{})}:Z3(e)?{[`Set(${e.size})`]:[...e.values()]}:p1(e)&&!j(e)&&!hr(e)?String(e):e;let J1;class D7{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=J1,!e&&J1&&(this.index=(J1.scopes||(J1.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const a=J1;try{return J1=this,e()}finally{J1=a}}}on(){J1=this}off(){J1=this.parent}stop(e){if(this._active){let a,r;for(a=0,r=this.effects.length;a<r;a++)this.effects[a].stop();for(a=0,r=this.cleanups.length;a<r;a++)this.cleanups[a]();if(this.scopes)for(a=0,r=this.scopes.length;a<r;a++)this.scopes[a].stop(!0);if(!this.detached&&this.parent&&!e){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.parent=void 0,this._active=!1}}}function O7(c){return new D7(c)}function pr(c,e=J1){e&&e.active&&e.effects.push(c)}function F7(){return J1}function zr(c){J1&&J1.cleanups.push(c)}const B7=c=>{const e=new Set(c);return e.w=0,e.n=0,e},Hr=c=>(c.w&C3)>0,Cr=c=>(c.n&C3)>0,wd=({deps:c})=>{if(c.length)for(let e=0;e<c.length;e++)c[e].w|=C3},Ad=c=>{const{deps:e}=c;if(e.length){let a=0;for(let r=0;r<e.length;r++){const t=e[r];Hr(t)&&!Cr(t)?t.delete(c):e[a++]=t,t.w&=~C3,t.n&=~C3}e.length=a}},q8=new WeakMap;let G4=0,C3=1;const I5=30;let o2;const D3=Symbol(""),D5=Symbol("");class P6{constructor(e,a=null,r){this.fn=e,this.scheduler=a,this.active=!0,this.deps=[],this.parent=void 0,pr(this,r)}run(){if(!this.active)return this.fn();let e=o2,a=m3;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=o2,o2=this,m3=!0,C3=1<<++G4,G4<=I5?wd(this):Jc(this),this.fn()}finally{G4<=I5&&Ad(this),C3=1<<--G4,o2=this.parent,m3=a,this.parent=void 0,this.deferStop&&this.stop()}}stop(){o2===this?this.deferStop=!0:this.active&&(Jc(this),this.onStop&&this.onStop(),this.active=!1)}}function Jc(c){const{deps:e}=c;if(e.length){for(let a=0;a<e.length;a++)e[a].delete(c);e.length=0}}function _d(c,e){c.effect&&(c=c.effect.fn);const a=new P6(c);e&&(V1(a,e),e.scope&&pr(a,e.scope)),(!e||!e.lazy)&&a.run();const r=a.run.bind(a);return r.effect=a,r}function kd(c){c.effect.stop()}let m3=!0;const Vr=[];function k4(){Vr.push(m3),m3=!1}function E4(){const c=Vr.pop();m3=c===void 0?!0:c}function K1(c,e,a){if(m3&&o2){let r=q8.get(c);r||q8.set(c,r=new Map);let t=r.get(a);t||r.set(a,t=B7()),Mr(t)}}function Mr(c,e){let a=!1;G4<=I5?Cr(c)||(c.n|=C3,a=!Hr(c)):a=!c.has(o2),a&&(c.add(o2),o2.deps.push(c))}function O2(c,e,a,r,t,n){const s=q8.get(c);if(!s)return;let i=[];if(e==="clear")i=[...s.values()];else if(a==="length"&&j(c)){const o=Number(r);s.forEach((l,f)=>{(f==="length"||f>=o)&&i.push(l)})}else switch(a!==void 0&&i.push(s.get(a)),e){case"add":j(c)?I7(a)&&i.push(s.get("length")):(i.push(s.get(D3)),l4(c)&&i.push(s.get(D5)));break;case"delete":j(c)||(i.push(s.get(D3)),l4(c)&&i.push(s.get(D5)));break;case"set":l4(c)&&i.push(s.get(D3));break}if(i.length===1)i[0]&&O5(i[0]);else{const o=[];for(const l of i)l&&o.push(...l);O5(B7(o))}}function O5(c,e){const a=j(c)?c:[...c];for(const r of a)r.computed&&Yc(r);for(const r of a)r.computed||Yc(r)}function Yc(c,e){(c!==o2||c.allowRecurse)&&(c.scheduler?c.scheduler():c.run())}function Ed(c,e){var a;return(a=q8.get(c))==null?void 0:a.get(e)}const Td=o0("__proto__,__v_isRef,__isVue"),gr=new Set(Object.getOwnPropertyNames(Symbol).filter(c=>c!=="arguments"&&c!=="caller").map(c=>Symbol[c]).filter(h6)),Pd=u0(),Rd=u0(!1,!0),Id=u0(!0),Dd=u0(!0,!0),Xc=Od();function Od(){const c={};return["includes","indexOf","lastIndexOf"].forEach(e=>{c[e]=function(...a){const r=n1(this);for(let n=0,s=this.length;n<s;n++)K1(r,"get",n+"");const t=r[e](...a);return t===-1||t===!1?r[e](...a.map(n1)):t}}),["push","pop","shift","unshift","splice"].forEach(e=>{c[e]=function(...a){k4();const r=n1(this)[e].apply(this,a);return E4(),r}}),c}function Fd(c){const e=n1(this);return K1(e,"has",c),e.hasOwnProperty(c)}function u0(c=!1,e=!1){return function(r,t,n){if(t==="__v_isReactive")return!c;if(t==="__v_isReadonly")return c;if(t==="__v_isShallow")return e;if(t==="__v_raw"&&n===(c?e?wr:Sr:e?Nr:yr).get(r))return r;const s=j(r);if(!c){if(s&&o1(Xc,t))return Reflect.get(Xc,t,n);if(t==="hasOwnProperty")return Fd}const i=Reflect.get(r,t,n);return(h6(t)?gr.has(t):Td(t))||(c||K1(r,"get",t),e)?i:b1(i)?s&&I7(t)?i:i.value:p1(i)?c?W7(i):T4(i):i}}const Bd=Lr(),Ud=Lr(!0);function Lr(c=!1){return function(a,r,t,n){let s=a[r];if(B3(s)&&b1(s)&&!b1(t))return!1;if(!c&&(!m6(t)&&!B3(t)&&(s=n1(s),t=n1(t)),!j(a)&&b1(s)&&!b1(t)))return s.value=t,!0;const i=j(a)&&I7(r)?Number(r)<a.length:o1(a,r),o=Reflect.set(a,r,t,n);return a===n1(n)&&(i?C4(t,s)&&O2(a,"set",r,t):O2(a,"add",r,t)),o}}function qd(c,e){const a=o1(c,e);c[e];const r=Reflect.deleteProperty(c,e);return r&&a&&O2(c,"delete",e,void 0),r}function Wd(c,e){const a=Reflect.has(c,e);return(!h6(e)||!gr.has(e))&&K1(c,"has",e),a}function jd(c){return K1(c,"iterate",j(c)?"length":D3),Reflect.ownKeys(c)}const br={get:Pd,set:Bd,deleteProperty:qd,has:Wd,ownKeys:jd},xr={get:Id,set(c,e){return!0},deleteProperty(c,e){return!0}},$d=V1({},br,{get:Rd,set:Ud}),Gd=V1({},xr,{get:Dd}),U7=c=>c,h0=c=>Reflect.getPrototypeOf(c);function n8(c,e,a=!1,r=!1){c=c.__v_raw;const t=n1(c),n=n1(e);a||(e!==n&&K1(t,"get",e),K1(t,"get",n));const{has:s}=h0(t),i=r?U7:a?$7:v6;if(s.call(t,e))return i(c.get(e));if(s.call(t,n))return i(c.get(n));c!==t&&c.get(e)}function s8(c,e=!1){const a=this.__v_raw,r=n1(a),t=n1(c);return e||(c!==t&&K1(r,"has",c),K1(r,"has",t)),c===t?a.has(c):a.has(c)||a.has(t)}function i8(c,e=!1){return c=c.__v_raw,!e&&K1(n1(c),"iterate",D3),Reflect.get(c,"size",c)}function Qc(c){c=n1(c);const e=n1(this);return h0(e).has.call(e,c)||(e.add(c),O2(e,"add",c,c)),this}function ce(c,e){e=n1(e);const a=n1(this),{has:r,get:t}=h0(a);let n=r.call(a,c);n||(c=n1(c),n=r.call(a,c));const s=t.call(a,c);return a.set(c,e),n?C4(e,s)&&O2(a,"set",c,e):O2(a,"add",c,e),this}function ee(c){const e=n1(this),{has:a,get:r}=h0(e);let t=a.call(e,c);t||(c=n1(c),t=a.call(e,c)),r&&r.call(e,c);const n=e.delete(c);return t&&O2(e,"delete",c,void 0),n}function ae(){const c=n1(this),e=c.size!==0,a=c.clear();return e&&O2(c,"clear",void 0,void 0),a}function o8(c,e){return function(r,t){const n=this,s=n.__v_raw,i=n1(s),o=e?U7:c?$7:v6;return!c&&K1(i,"iterate",D3),s.forEach((l,f)=>r.call(t,o(l),o(f),n))}}function l8(c,e,a){return function(...r){const t=this.__v_raw,n=n1(t),s=l4(n),i=c==="entries"||c===Symbol.iterator&&s,o=c==="keys"&&s,l=t[c](...r),f=a?U7:e?$7:v6;return!e&&K1(n,"iterate",o?D5:D3),{next(){const{value:u,done:h}=l.next();return h?{value:u,done:h}:{value:i?[f(u[0]),f(u[1])]:f(u),done:h}},[Symbol.iterator](){return this}}}}function J2(c){return function(...e){return c==="delete"?!1:this}}function Kd(){const c={get(n){return n8(this,n)},get size(){return i8(this)},has:s8,add:Qc,set:ce,delete:ee,clear:ae,forEach:o8(!1,!1)},e={get(n){return n8(this,n,!1,!0)},get size(){return i8(this)},has:s8,add:Qc,set:ce,delete:ee,clear:ae,forEach:o8(!1,!0)},a={get(n){return n8(this,n,!0)},get size(){return i8(this,!0)},has(n){return s8.call(this,n,!0)},add:J2("add"),set:J2("set"),delete:J2("delete"),clear:J2("clear"),forEach:o8(!0,!1)},r={get(n){return n8(this,n,!0,!0)},get size(){return i8(this,!0)},has(n){return s8.call(this,n,!0)},add:J2("add"),set:J2("set"),delete:J2("delete"),clear:J2("clear"),forEach:o8(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(n=>{c[n]=l8(n,!1,!1),a[n]=l8(n,!0,!1),e[n]=l8(n,!1,!0),r[n]=l8(n,!0,!0)}),[c,a,e,r]}const[Zd,Jd,Yd,Xd]=Kd();function m0(c,e){const a=e?c?Xd:Yd:c?Jd:Zd;return(r,t,n)=>t==="__v_isReactive"?!c:t==="__v_isReadonly"?c:t==="__v_raw"?r:Reflect.get(o1(a,t)&&t in r?a:r,t,n)}const Qd={get:m0(!1,!1)},cp={get:m0(!1,!0)},ep={get:m0(!0,!1)},ap={get:m0(!0,!0)},yr=new WeakMap,Nr=new WeakMap,Sr=new WeakMap,wr=new WeakMap;function rp(c){switch(c){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function tp(c){return c.__v_skip||!Object.isExtensible(c)?0:rp(pd(c))}function T4(c){return B3(c)?c:v0(c,!1,br,Qd,yr)}function q7(c){return v0(c,!1,$d,cp,Nr)}function W7(c){return v0(c,!0,xr,ep,Sr)}function np(c){return v0(c,!0,Gd,ap,wr)}function v0(c,e,a,r,t){if(!p1(c)||c.__v_raw&&!(e&&c.__v_isReactive))return c;const n=t.get(c);if(n)return n;const s=tp(c);if(s===0)return c;const i=new Proxy(c,s===2?r:a);return t.set(c,i),i}function R2(c){return B3(c)?R2(c.__v_raw):!!(c&&c.__v_isReactive)}function B3(c){return!!(c&&c.__v_isReadonly)}function m6(c){return!!(c&&c.__v_isShallow)}function j7(c){return R2(c)||B3(c)}function n1(c){const e=c&&c.__v_raw;return e?n1(e):c}function R6(c){return F8(c,"__v_skip",!0),c}const v6=c=>p1(c)?T4(c):c,$7=c=>p1(c)?W7(c):c;function G7(c){m3&&o2&&(c=n1(c),Mr(c.dep||(c.dep=B7())))}function d0(c,e){c=n1(c);const a=c.dep;a&&O5(a)}function b1(c){return!!(c&&c.__v_isRef===!0)}function x1(c){return _r(c,!1)}function Ar(c){return _r(c,!0)}function _r(c,e){return b1(c)?c:new sp(c,e)}class sp{constructor(e,a){this.__v_isShallow=a,this.dep=void 0,this.__v_isRef=!0,this._rawValue=a?e:n1(e),this._value=a?e:v6(e)}get value(){return G7(this),this._value}set value(e){const a=this.__v_isShallow||m6(e)||B3(e);e=a?e:n1(e),C4(e,this._rawValue)&&(this._rawValue=e,this._value=a?e:v6(e),d0(this))}}function ip(c){d0(c)}function N1(c){return b1(c)?c.value:c}function op(c){return a1(c)?c():N1(c)}const lp={get:(c,e,a)=>N1(Reflect.get(c,e,a)),set:(c,e,a,r)=>{const t=c[e];return b1(t)&&!b1(a)?(t.value=a,!0):Reflect.set(c,e,a,r)}};function K7(c){return R2(c)?c:new Proxy(c,lp)}class fp{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:a,set:r}=e(()=>G7(this),()=>d0(this));this._get=a,this._set=r}get value(){return this._get()}set value(e){this._set(e)}}function up(c){return new fp(c)}function kr(c){const e=j(c)?new Array(c.length):{};for(const a in c)e[a]=Er(c,a);return e}class hp{constructor(e,a,r){this._object=e,this._key=a,this._defaultValue=r,this.__v_isRef=!0}get value(){const e=this._object[this._key];return e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Ed(n1(this._object),this._key)}}class mp{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function vp(c,e,a){return b1(c)?c:a1(c)?new mp(c):p1(c)&&arguments.length>1?Er(c,e,a):x1(c)}function Er(c,e,a){const r=c[e];return b1(r)?r:new hp(c,e,a)}class dp{constructor(e,a,r,t){this._setter=a,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new P6(e,()=>{this._dirty||(this._dirty=!0,d0(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!t,this.__v_isReadonly=r}get value(){const e=n1(this);return G7(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function pp(c,e,a=!1){let r,t;const n=a1(c);return n?(r=c,t=h2):(r=c.get,t=c.set),new dp(r,t,n||!t,a)}function zp(c,...e){}function Hp(c,e){}function I2(c,e,a,r){let t;try{t=r?c(...r):c()}catch(n){J3(n,e,a)}return t}function c2(c,e,a,r){if(a1(c)){const n=I2(c,e,a,r);return n&&R7(n)&&n.catch(s=>{J3(s,e,a)}),n}const t=[];for(let n=0;n<c.length;n++)t.push(c2(c[n],e,a,r));return t}function J3(c,e,a,r=!0){const t=e?e.vnode:null;if(e){let n=e.parent;const s=e.proxy,i=a;for(;n;){const l=n.ec;if(l){for(let f=0;f<l.length;f++)if(l[f](c,s,i)===!1)return}n=n.parent}const o=e.appContext.config.errorHandler;if(o){I2(o,null,10,[c,s,i]);return}}Cp(c,a,t,r)}function Cp(c,e,a,r=!0){console.error(c)}let d6=!1,F5=!1;const I1=[];let C2=0;const u4=[];let A2=null,k3=0;const Tr=Promise.resolve();let Z7=null;function I6(c){const e=Z7||Tr;return c?e.then(this?c.bind(this):c):e}function Vp(c){let e=C2+1,a=I1.length;for(;e<a;){const r=e+a>>>1;p6(I1[r])<c?e=r+1:a=r}return e}function p0(c){(!I1.length||!I1.includes(c,d6&&c.allowRecurse?C2+1:C2))&&(c.id==null?I1.push(c):I1.splice(Vp(c.id),0,c),Pr())}function Pr(){!d6&&!F5&&(F5=!0,Z7=Tr.then(Rr))}function Mp(c){const e=I1.indexOf(c);e>C2&&I1.splice(e,1)}function J7(c){j(c)?u4.push(...c):(!A2||!A2.includes(c,c.allowRecurse?k3+1:k3))&&u4.push(c),Pr()}function re(c,e=d6?C2+1:0){for(;e<I1.length;e++){const a=I1[e];a&&a.pre&&(I1.splice(e,1),e--,a())}}function W8(c){if(u4.length){const e=[...new Set(u4)];if(u4.length=0,A2){A2.push(...e);return}for(A2=e,A2.sort((a,r)=>p6(a)-p6(r)),k3=0;k3<A2.length;k3++)A2[k3]();A2=null,k3=0}}const p6=c=>c.id==null?1/0:c.id,gp=(c,e)=>{const a=p6(c)-p6(e);if(a===0){if(c.pre&&!e.pre)return-1;if(e.pre&&!c.pre)return 1}return a};function Rr(c){F5=!1,d6=!0,I1.sort(gp);const e=h2;try{for(C2=0;C2<I1.length;C2++){const a=I1[C2];a&&a.active!==!1&&I2(a,null,14)}}finally{C2=0,I1.length=0,W8(),d6=!1,Z7=null,(I1.length||u4.length)&&Rr()}}let t4,f8=[];function Ir(c,e){var a,r;t4=c,t4?(t4.enabled=!0,f8.forEach(({event:t,args:n})=>t4.emit(t,...n)),f8=[]):typeof window<"u"&&window.HTMLElement&&!((r=(a=window.navigator)==null?void 0:a.userAgent)!=null&&r.includes("jsdom"))?((e.__VUE_DEVTOOLS_HOOK_REPLAY__=e.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(n=>{Ir(n,e)}),setTimeout(()=>{t4||(e.__VUE_DEVTOOLS_HOOK_REPLAY__=null,f8=[])},3e3)):f8=[]}function Lp(c,e,...a){if(c.isUnmounted)return;const r=c.vnode.props||d1;let t=a;const n=e.startsWith("update:"),s=n&&e.slice(7);if(s&&s in r){const f=`${s==="modelValue"?"model":s}Modifiers`,{number:u,trim:h}=r[f]||d1;h&&(t=a.map(p=>L1(p)?p.trim():p)),u&&(t=a.map(B8))}let i,o=r[i=c6(e)]||r[i=c6($1(e))];!o&&n&&(o=r[i=c6(t2(e))]),o&&c2(o,c,6,t);const l=r[i+"Once"];if(l){if(!c.emitted)c.emitted={};else if(c.emitted[i])return;c.emitted[i]=!0,c2(l,c,6,t)}}function Dr(c,e,a=!1){const r=e.emitsCache,t=r.get(c);if(t!==void 0)return t;const n=c.emits;let s={},i=!1;if(!a1(c)){const o=l=>{const f=Dr(l,e,!0);f&&(i=!0,V1(s,f))};!a&&e.mixins.length&&e.mixins.forEach(o),c.extends&&o(c.extends),c.mixins&&c.mixins.forEach(o)}return!n&&!i?(p1(c)&&r.set(c,null),null):(j(n)?n.forEach(o=>s[o]=null):V1(s,n),p1(c)&&r.set(c,s),s)}function z0(c,e){return!c||!E6(e)?!1:(e=e.slice(2).replace(/Once$/,""),o1(c,e[0].toLowerCase()+e.slice(1))||o1(c,t2(e))||o1(c,e))}let T1=null,H0=null;function z6(c){const e=T1;return T1=c,H0=c&&c.type.__scopeId||null,e}function Y7(c){H0=c}function X7(){H0=null}const bp=c=>Y1;function Y1(c,e=T1,a){if(!e||c._n)return c;const r=(...t)=>{r._d&&G5(-1);const n=z6(e);let s;try{s=c(...t)}finally{z6(n),r._d&&G5(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function N8(c){const{type:e,vnode:a,proxy:r,withProxy:t,props:n,propsOptions:[s],slots:i,attrs:o,emit:l,render:f,renderCache:u,data:h,setupState:p,ctx:H,inheritAttrs:M}=c;let x,d;const m=z6(c);try{if(a.shapeFlag&4){const C=t||r;x=Q1(f.call(C,C,u,n,p,h,H)),d=o}else{const C=e;x=Q1(C.length>1?C(n,{attrs:o,slots:i,emit:l}):C(n,null)),d=e.props?o:yp(o)}}catch(C){t6.length=0,J3(C,c,1),x=e1(D1)}let g=x;if(d&&M!==!1){const C=Object.keys(d),{shapeFlag:b}=g;C.length&&b&7&&(s&&C.some(T7)&&(d=Np(d,s)),g=b2(g,d))}return a.dirs&&(g=b2(g),g.dirs=g.dirs?g.dirs.concat(a.dirs):a.dirs),a.transition&&(g.transition=a.transition),x=g,z6(m),x}function xp(c){let e;for(let a=0;a<c.length;a++){const r=c[a];if(V3(r)){if(r.type!==D1||r.children==="v-if"){if(e)return;e=r}}else return}return e}const yp=c=>{let e;for(const a in c)(a==="class"||a==="style"||E6(a))&&((e||(e={}))[a]=c[a]);return e},Np=(c,e)=>{const a={};for(const r in c)(!T7(r)||!(r.slice(9)in e))&&(a[r]=c[r]);return a};function Sp(c,e,a){const{props:r,children:t,component:n}=c,{props:s,children:i,patchFlag:o}=e,l=n.emitsOptions;if(e.dirs||e.transition)return!0;if(a&&o>=0){if(o&1024)return!0;if(o&16)return r?te(r,s,l):!!s;if(o&8){const f=e.dynamicProps;for(let u=0;u<f.length;u++){const h=f[u];if(s[h]!==r[h]&&!z0(l,h))return!0}}}else return(t||i)&&(!i||!i.$stable)?!0:r===s?!1:r?s?te(r,s,l):!0:!!s;return!1}function te(c,e,a){const r=Object.keys(e);if(r.length!==Object.keys(c).length)return!0;for(let t=0;t<r.length;t++){const n=r[t];if(e[n]!==c[n]&&!z0(a,n))return!0}return!1}function Q7({vnode:c,parent:e},a){for(;e&&e.subTree===c;)(c=e.vnode).el=a,e=e.parent}const Or=c=>c.__isSuspense,wp={name:"Suspense",__isSuspense:!0,process(c,e,a,r,t,n,s,i,o,l){c==null?_p(e,a,r,t,n,s,i,o,l):kp(c,e,a,r,t,s,i,o,l)},hydrate:Ep,create:c9,normalize:Tp},Ap=wp;function H6(c,e){const a=c.props&&c.props[e];a1(a)&&a()}function _p(c,e,a,r,t,n,s,i,o){const{p:l,o:{createElement:f}}=o,u=f("div"),h=c.suspense=c9(c,t,r,e,u,a,n,s,i,o);l(null,h.pendingBranch=c.ssContent,u,null,r,h,n,s),h.deps>0?(H6(c,"onPending"),H6(c,"onFallback"),l(null,c.ssFallback,e,a,r,null,n,s),h4(h,c.ssFallback)):h.resolve(!1,!0)}function kp(c,e,a,r,t,n,s,i,{p:o,um:l,o:{createElement:f}}){const u=e.suspense=c.suspense;u.vnode=e,e.el=c.el;const h=e.ssContent,p=e.ssFallback,{activeBranch:H,pendingBranch:M,isInFallback:x,isHydrating:d}=u;if(M)u.pendingBranch=h,l2(h,M)?(o(M,h,u.hiddenContainer,null,t,u,n,s,i),u.deps<=0?u.resolve():x&&(o(H,p,a,r,t,null,n,s,i),h4(u,p))):(u.pendingId++,d?(u.isHydrating=!1,u.activeBranch=M):l(M,t,u),u.deps=0,u.effects.length=0,u.hiddenContainer=f("div"),x?(o(null,h,u.hiddenContainer,null,t,u,n,s,i),u.deps<=0?u.resolve():(o(H,p,a,r,t,null,n,s,i),h4(u,p))):H&&l2(h,H)?(o(H,h,a,r,t,u,n,s,i),u.resolve(!0)):(o(null,h,u.hiddenContainer,null,t,u,n,s,i),u.deps<=0&&u.resolve()));else if(H&&l2(h,H))o(H,h,a,r,t,u,n,s,i),h4(u,h);else if(H6(e,"onPending"),u.pendingBranch=h,u.pendingId++,o(null,h,u.hiddenContainer,null,t,u,n,s,i),u.deps<=0)u.resolve();else{const{timeout:m,pendingId:g}=u;m>0?setTimeout(()=>{u.pendingId===g&&u.fallback(p)},m):m===0&&u.fallback(p)}}function c9(c,e,a,r,t,n,s,i,o,l,f=!1){const{p:u,m:h,um:p,n:H,o:{parentNode:M,remove:x}}=l;let d;const m=Pp(c);m&&e!=null&&e.pendingBranch&&(d=e.pendingId,e.deps++);const g=c.props?U8(c.props.timeout):void 0,C={vnode:c,parent:e,parentComponent:a,isSVG:s,container:r,hiddenContainer:t,anchor:n,deps:0,pendingId:0,timeout:typeof g=="number"?g:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:f,isUnmounted:!1,effects:[],resolve(b=!1,T=!1){const{vnode:E,activeBranch:L,pendingBranch:A,pendingId:I,effects:$,parentComponent:F,container:X}=C;if(C.isHydrating)C.isHydrating=!1;else if(!b){const c1=L&&A.transition&&A.transition.mode==="out-in";c1&&(L.transition.afterLeave=()=>{I===C.pendingId&&h(A,X,f1,0)});let{anchor:f1}=C;L&&(f1=H(L),p(L,F,C,!0)),c1||h(A,X,f1,0)}h4(C,A),C.pendingBranch=null,C.isInFallback=!1;let q=C.parent,H1=!1;for(;q;){if(q.pendingBranch){q.effects.push(...$),H1=!0;break}q=q.parent}H1||J7($),C.effects=[],m&&e&&e.pendingBranch&&d===e.pendingId&&(e.deps--,e.deps===0&&!T&&e.resolve()),H6(E,"onResolve")},fallback(b){if(!C.pendingBranch)return;const{vnode:T,activeBranch:E,parentComponent:L,container:A,isSVG:I}=C;H6(T,"onFallback");const $=H(E),F=()=>{C.isInFallback&&(u(null,b,A,$,L,null,I,i,o),h4(C,b))},X=b.transition&&b.transition.mode==="out-in";X&&(E.transition.afterLeave=F),C.isInFallback=!0,p(E,L,null,!0),X||F()},move(b,T,E){C.activeBranch&&h(C.activeBranch,b,T,E),C.container=b},next(){return C.activeBranch&&H(C.activeBranch)},registerDep(b,T){const E=!!C.pendingBranch;E&&C.deps++;const L=b.vnode.el;b.asyncDep.catch(A=>{J3(A,b,0)}).then(A=>{if(b.isUnmounted||C.isUnmounted||C.pendingId!==b.suspenseId)return;b.asyncResolved=!0;const{vnode:I}=b;Z5(b,A,!1),L&&(I.el=L);const $=!L&&b.subTree.el;T(b,I,M(L||b.subTree.el),L?null:H(b.subTree),C,s,o),$&&x($),Q7(b,I.el),E&&--C.deps===0&&C.resolve()})},unmount(b,T){C.isUnmounted=!0,C.activeBranch&&p(C.activeBranch,a,b,T),C.pendingBranch&&p(C.pendingBranch,a,b,T)}};return C}function Ep(c,e,a,r,t,n,s,i,o){const l=e.suspense=c9(e,r,a,c.parentNode,document.createElement("div"),null,t,n,s,i,!0),f=o(c,l.pendingBranch=e.ssContent,a,l,n,s);return l.deps===0&&l.resolve(!1,!0),f}function Tp(c){const{shapeFlag:e,children:a}=c,r=e&32;c.ssContent=ne(r?a.default:a),c.ssFallback=r?ne(a.fallback):e1(D1)}function ne(c){let e;if(a1(c)){const a=W3&&c._c;a&&(c._d=!1,O1()),c=c(),a&&(c._d=!0,e=j1,vt())}return j(c)&&(c=xp(c)),c=Q1(c),e&&!c.dynamicChildren&&(c.dynamicChildren=e.filter(a=>a!==c)),c}function Fr(c,e){e&&e.pendingBranch?j(c)?e.effects.push(...c):e.effects.push(c):J7(c)}function h4(c,e){c.activeBranch=e;const{vnode:a,parentComponent:r}=c,t=a.el=e.el;r&&r.subTree===a&&(r.vnode.el=t,Q7(r,t))}function Pp(c){var e;return((e=c.props)==null?void 0:e.suspensible)!=null&&c.props.suspensible!==!1}function Rp(c,e){return D6(c,null,e)}function Br(c,e){return D6(c,null,{flush:"post"})}function Ip(c,e){return D6(c,null,{flush:"sync"})}const u8={};function g2(c,e,a){return D6(c,e,a)}function D6(c,e,{immediate:a,deep:r,flush:t,onTrack:n,onTrigger:s}=d1){var i;const o=F7()===((i=A1)==null?void 0:i.scope)?A1:null;let l,f=!1,u=!1;if(b1(c)?(l=()=>c.value,f=m6(c)):R2(c)?(l=()=>c,r=!0):j(c)?(u=!0,f=c.some(C=>R2(C)||m6(C)),l=()=>c.map(C=>{if(b1(C))return C.value;if(R2(C))return T3(C);if(a1(C))return I2(C,o,2)})):a1(c)?e?l=()=>I2(c,o,2):l=()=>{if(!(o&&o.isUnmounted))return h&&h(),c2(c,o,3,[p])}:l=h2,e&&r){const C=l;l=()=>T3(C())}let h,p=C=>{h=m.onStop=()=>{I2(C,o,4)}},H;if(M4)if(p=h2,e?a&&c2(e,o,3,[l(),u?[]:void 0,p]):l(),t==="sync"){const C=xt();H=C.__watcherHandles||(C.__watcherHandles=[])}else return h2;let M=u?new Array(c.length).fill(u8):u8;const x=()=>{if(m.active)if(e){const C=m.run();(r||f||(u?C.some((b,T)=>C4(b,M[T])):C4(C,M)))&&(h&&h(),c2(e,o,3,[C,M===u8?void 0:u&&M[0]===u8?[]:M,p]),M=C)}else m.run()};x.allowRecurse=!!e;let d;t==="sync"?d=x:t==="post"?d=()=>P1(x,o&&o.suspense):(x.pre=!0,o&&(x.id=o.uid),d=()=>p0(x));const m=new P6(l,d);e?a?x():M=m.run():t==="post"?P1(m.run.bind(m),o&&o.suspense):m.run();const g=()=>{m.stop(),o&&o.scope&&P7(o.scope.effects,m)};return H&&H.push(g),g}function Dp(c,e,a){const r=this.proxy,t=L1(c)?c.includes(".")?Ur(r,c):()=>r[c]:c.bind(r,r);let n;a1(e)?n=e:(n=e.handler,a=e);const s=A1;M3(this);const i=D6(t,n.bind(r),a);return s?M3(s):v3(),i}function Ur(c,e){const a=e.split(".");return()=>{let r=c;for(let t=0;t<a.length&&r;t++)r=r[a[t]];return r}}function T3(c,e){if(!p1(c)||c.__v_skip||(e=e||new Set,e.has(c)))return c;if(e.add(c),b1(c))T3(c.value,e);else if(j(c))for(let a=0;a<c.length;a++)T3(c[a],e);else if(Z3(c)||l4(c))c.forEach(a=>{T3(a,e)});else if(hr(c))for(const a in c)T3(c[a],e);return c}function Op(c,e){const a=T1;if(a===null)return c;const r=b0(a)||a.proxy,t=c.dirs||(c.dirs=[]);for(let n=0;n<e.length;n++){let[s,i,o,l=d1]=e[n];s&&(a1(s)&&(s={mounted:s,updated:s}),s.deep&&T3(i),t.push({dir:s,instance:r,value:i,oldValue:void 0,arg:o,modifiers:l}))}return c}function H2(c,e,a,r){const t=c.dirs,n=e&&e.dirs;for(let s=0;s<t.length;s++){const i=t[s];n&&(i.oldValue=n[s].value);let o=i.dir[r];o&&(k4(),c2(o,a,8,[c.el,i,c,e]),E4())}}function e9(){const c={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return R4(()=>{c.isMounted=!0}),g0(()=>{c.isUnmounting=!0}),c}const a2=[Function,Array],a9={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:a2,onEnter:a2,onAfterEnter:a2,onEnterCancelled:a2,onBeforeLeave:a2,onLeave:a2,onAfterLeave:a2,onLeaveCancelled:a2,onBeforeAppear:a2,onAppear:a2,onAfterAppear:a2,onAppearCancelled:a2},Fp={name:"BaseTransition",props:a9,setup(c,{slots:e}){const a=G2(),r=e9();let t;return()=>{const n=e.default&&C0(e.default(),!0);if(!n||!n.length)return;let s=n[0];if(n.length>1){for(const M of n)if(M.type!==D1){s=M;break}}const i=n1(c),{mode:o}=i;if(r.isLeaving)return o5(s);const l=se(s);if(!l)return o5(s);const f=V4(l,i,r,a);U3(l,f);const u=a.subTree,h=u&&se(u);let p=!1;const{getTransitionKey:H}=l.type;if(H){const M=H();t===void 0?t=M:M!==t&&(t=M,p=!0)}if(h&&h.type!==D1&&(!l2(l,h)||p)){const M=V4(h,i,r,a);if(U3(h,M),o==="out-in")return r.isLeaving=!0,M.afterLeave=()=>{r.isLeaving=!1,a.update.active!==!1&&a.update()},o5(s);o==="in-out"&&l.type!==D1&&(M.delayLeave=(x,d,m)=>{const g=Wr(r,h);g[String(h.key)]=h,x._leaveCb=()=>{d(),x._leaveCb=void 0,delete f.delayedLeave},f.delayedLeave=m})}return s}}},qr=Fp;function Wr(c,e){const{leavingVNodes:a}=c;let r=a.get(e.type);return r||(r=Object.create(null),a.set(e.type,r)),r}function V4(c,e,a,r){const{appear:t,mode:n,persisted:s=!1,onBeforeEnter:i,onEnter:o,onAfterEnter:l,onEnterCancelled:f,onBeforeLeave:u,onLeave:h,onAfterLeave:p,onLeaveCancelled:H,onBeforeAppear:M,onAppear:x,onAfterAppear:d,onAppearCancelled:m}=e,g=String(c.key),C=Wr(a,c),b=(L,A)=>{L&&c2(L,r,9,A)},T=(L,A)=>{const I=A[1];b(L,A),j(L)?L.every($=>$.length<=1)&&I():L.length<=1&&I()},E={mode:n,persisted:s,beforeEnter(L){let A=i;if(!a.isMounted)if(t)A=M||i;else return;L._leaveCb&&L._leaveCb(!0);const I=C[g];I&&l2(c,I)&&I.el._leaveCb&&I.el._leaveCb(),b(A,[L])},enter(L){let A=o,I=l,$=f;if(!a.isMounted)if(t)A=x||o,I=d||l,$=m||f;else return;let F=!1;const X=L._enterCb=q=>{F||(F=!0,q?b($,[L]):b(I,[L]),E.delayedLeave&&E.delayedLeave(),L._enterCb=void 0)};A?T(A,[L,X]):X()},leave(L,A){const I=String(c.key);if(L._enterCb&&L._enterCb(!0),a.isUnmounting)return A();b(u,[L]);let $=!1;const F=L._leaveCb=X=>{$||($=!0,A(),X?b(H,[L]):b(p,[L]),L._leaveCb=void 0,C[I]===c&&delete C[I])};C[I]=c,h?T(h,[L,F]):F()},clone(L){return V4(L,e,a,r)}};return E}function o5(c){if(O6(c))return c=b2(c),c.children=null,c}function se(c){return O6(c)?c.children?c.children[0]:void 0:c}function U3(c,e){c.shapeFlag&6&&c.component?U3(c.component.subTree,e):c.shapeFlag&128?(c.ssContent.transition=e.clone(c.ssContent),c.ssFallback.transition=e.clone(c.ssFallback)):c.transition=e}function C0(c,e=!1,a){let r=[],t=0;for(let n=0;n<c.length;n++){let s=c[n];const i=a==null?s.key:String(a)+String(s.key!=null?s.key:n);s.type===E1?(s.patchFlag&128&&t++,r=r.concat(C0(s.children,e,i))):(e||s.type!==D1)&&r.push(i!=null?b2(s,{key:i}):s)}if(t>1)for(let n=0;n<r.length;n++)r[n].patchFlag=-2;return r}function P4(c,e){return a1(c)?(()=>V1({name:c.name},e,{setup:c}))():c}const O3=c=>!!c.type.__asyncLoader;function Bp(c){a1(c)&&(c={loader:c});const{loader:e,loadingComponent:a,errorComponent:r,delay:t=200,timeout:n,suspensible:s=!0,onError:i}=c;let o=null,l,f=0;const u=()=>(f++,o=null,h()),h=()=>{let p;return o||(p=o=e().catch(H=>{if(H=H instanceof Error?H:new Error(String(H)),i)return new Promise((M,x)=>{i(H,()=>M(u()),()=>x(H),f+1)});throw H}).then(H=>p!==o&&o?o:(H&&(H.__esModule||H[Symbol.toStringTag]==="Module")&&(H=H.default),l=H,H)))};return P4({name:"AsyncComponentWrapper",__asyncLoader:h,get __asyncResolved(){return l},setup(){const p=A1;if(l)return()=>l5(l,p);const H=m=>{o=null,J3(m,p,13,!r)};if(s&&p.suspense||M4)return h().then(m=>()=>l5(m,p)).catch(m=>(H(m),()=>r?e1(r,{error:m}):null));const M=x1(!1),x=x1(),d=x1(!!t);return t&&setTimeout(()=>{d.value=!1},t),n!=null&&setTimeout(()=>{if(!M.value&&!x.value){const m=new Error(`Async component timed out after ${n}ms.`);H(m),x.value=m}},n),h().then(()=>{M.value=!0,p.parent&&O6(p.parent.vnode)&&p0(p.parent.update)}).catch(m=>{H(m),x.value=m}),()=>{if(M.value&&l)return l5(l,p);if(x.value&&r)return e1(r,{error:x.value});if(a&&!d.value)return e1(a)}}})}function l5(c,e){const{ref:a,props:r,children:t,ce:n}=e.vnode,s=e1(c,r,t);return s.ref=a,s.ce=n,delete e.vnode.ce,s}const O6=c=>c.type.__isKeepAlive,Up={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(c,{slots:e}){const a=G2(),r=a.ctx;if(!r.renderer)return()=>{const m=e.default&&e.default();return m&&m.length===1?m[0]:m};const t=new Map,n=new Set;let s=null;const i=a.suspense,{renderer:{p:o,m:l,um:f,o:{createElement:u}}}=r,h=u("div");r.activate=(m,g,C,b,T)=>{const E=m.component;l(m,g,C,0,i),o(E.vnode,m,g,C,E,i,b,m.slotScopeIds,T),P1(()=>{E.isDeactivated=!1,E.a&&f4(E.a);const L=m.props&&m.props.onVnodeMounted;L&&W1(L,E.parent,m)},i)},r.deactivate=m=>{const g=m.component;l(m,h,null,1,i),P1(()=>{g.da&&f4(g.da);const C=m.props&&m.props.onVnodeUnmounted;C&&W1(C,g.parent,m),g.isDeactivated=!0},i)};function p(m){f5(m),f(m,a,i,!0)}function H(m){t.forEach((g,C)=>{const b=Y5(g.type);b&&(!m||!m(b))&&M(C)})}function M(m){const g=t.get(m);!s||!l2(g,s)?p(g):s&&f5(s),t.delete(m),n.delete(m)}g2(()=>[c.include,c.exclude],([m,g])=>{m&&H(C=>K4(m,C)),g&&H(C=>!K4(g,C))},{flush:"post",deep:!0});let x=null;const d=()=>{x!=null&&t.set(x,u5(a.subTree))};return R4(d),M0(d),g0(()=>{t.forEach(m=>{const{subTree:g,suspense:C}=a,b=u5(g);if(m.type===b.type&&m.key===b.key){f5(b);const T=b.component.da;T&&P1(T,C);return}p(m)})}),()=>{if(x=null,!e.default)return null;const m=e.default(),g=m[0];if(m.length>1)return s=null,m;if(!V3(g)||!(g.shapeFlag&4)&&!(g.shapeFlag&128))return s=null,g;let C=u5(g);const b=C.type,T=Y5(O3(C)?C.type.__asyncResolved||{}:b),{include:E,exclude:L,max:A}=c;if(E&&(!T||!K4(E,T))||L&&T&&K4(L,T))return s=C,g;const I=C.key==null?b:C.key,$=t.get(I);return C.el&&(C=b2(C),g.shapeFlag&128&&(g.ssContent=C)),x=I,$?(C.el=$.el,C.component=$.component,C.transition&&U3(C,C.transition),C.shapeFlag|=512,n.delete(I),n.add(I)):(n.add(I),A&&n.size>parseInt(A,10)&&M(n.values().next().value)),C.shapeFlag|=256,s=C,Or(g.type)?g:C}}},qp=Up;function K4(c,e){return j(c)?c.some(a=>K4(a,e)):L1(c)?c.split(",").includes(e):dd(c)?c.test(e):!1}function r9(c,e){jr(c,"a",e)}function t9(c,e){jr(c,"da",e)}function jr(c,e,a=A1){const r=c.__wdc||(c.__wdc=()=>{let t=a;for(;t;){if(t.isDeactivated)return;t=t.parent}return c()});if(V0(e,r,a),a){let t=a.parent;for(;t&&t.parent;)O6(t.parent.vnode)&&Wp(r,e,a,t),t=t.parent}}function Wp(c,e,a,r){const t=V0(e,c,r,!0);I4(()=>{P7(r[e],t)},a)}function f5(c){c.shapeFlag&=-257,c.shapeFlag&=-513}function u5(c){return c.shapeFlag&128?c.ssContent:c}function V0(c,e,a=A1,r=!1){if(a){const t=a[c]||(a[c]=[]),n=e.__weh||(e.__weh=(...s)=>{if(a.isUnmounted)return;k4(),M3(a);const i=c2(e,a,c,s);return v3(),E4(),i});return r?t.unshift(n):t.push(n),n}}const $2=c=>(e,a=A1)=>(!M4||c==="sp")&&V0(c,(...r)=>e(...r),a),$r=$2("bm"),R4=$2("m"),Gr=$2("bu"),M0=$2("u"),g0=$2("bum"),I4=$2("um"),Kr=$2("sp"),Zr=$2("rtg"),Jr=$2("rtc");function Yr(c,e=A1){V0("ec",c,e)}const n9="components",jp="directives";function s9(c,e){return i9(n9,c,!0,e)||c}const Xr=Symbol.for("v-ndc");function $p(c){return L1(c)?i9(n9,c,!1)||c:c||Xr}function Gp(c){return i9(jp,c)}function i9(c,e,a=!0,r=!1){const t=T1||A1;if(t){const n=t.type;if(c===n9){const i=Y5(n,!1);if(i&&(i===e||i===$1(e)||i===T6($1(e))))return n}const s=ie(t[c]||n[c],e)||ie(t.appContext[c],e);return!s&&r?n:s}}function ie(c,e){return c&&(c[e]||c[$1(e)]||c[T6($1(e))])}function Qr(c,e,a,r){let t;const n=a&&a[r];if(j(c)||L1(c)){t=new Array(c.length);for(let s=0,i=c.length;s<i;s++)t[s]=e(c[s],s,void 0,n&&n[s])}else if(typeof c=="number"){t=new Array(c);for(let s=0;s<c;s++)t[s]=e(s+1,s,void 0,n&&n[s])}else if(p1(c))if(c[Symbol.iterator])t=Array.from(c,(s,i)=>e(s,i,void 0,n&&n[i]));else{const s=Object.keys(c);t=new Array(s.length);for(let i=0,o=s.length;i<o;i++){const l=s[i];t[i]=e(c[l],l,i,n&&n[i])}}else t=[];return a&&(a[r]=t),t}function Kp(c,e){for(let a=0;a<e.length;a++){const r=e[a];if(j(r))for(let t=0;t<r.length;t++)c[r[t].name]=r[t].fn;else r&&(c[r.name]=r.key?(...t)=>{const n=r.fn(...t);return n&&(n.key=r.key),n}:r.fn)}return c}function Zp(c,e,a={},r,t){if(T1.isCE||T1.parent&&O3(T1.parent)&&T1.parent.isCE)return e!=="default"&&(a.name=e),e1("slot",a,r&&r());let n=c[e];n&&n._c&&(n._d=!1),O1();const s=n&&ct(n(a)),i=j3(E1,{key:a.key||s&&s.key||`_${e}`},s||(r?r():[]),s&&c._===1?64:-2);return!t&&i.scopeId&&(i.slotScopeIds=[i.scopeId+"-s"]),n&&n._c&&(n._d=!0),i}function ct(c){return c.some(e=>V3(e)?!(e.type===D1||e.type===E1&&!ct(e.children)):!0)?c:null}function Jp(c,e){const a={};for(const r in c)a[e&&/[A-Z]/.test(r)?`on:${r}`:c6(r)]=c[r];return a}const B5=c=>c?Vt(c)?b0(c)||c.proxy:B5(c.parent):null,e6=V1(Object.create(null),{$:c=>c,$el:c=>c.vnode.el,$data:c=>c.data,$props:c=>c.props,$attrs:c=>c.attrs,$slots:c=>c.slots,$refs:c=>c.refs,$parent:c=>B5(c.parent),$root:c=>B5(c.root),$emit:c=>c.emit,$options:c=>o9(c),$forceUpdate:c=>c.f||(c.f=()=>p0(c.update)),$nextTick:c=>c.n||(c.n=I6.bind(c.proxy)),$watch:c=>Dp.bind(c)}),h5=(c,e)=>c!==d1&&!c.__isScriptSetup&&o1(c,e),U5={get({_:c},e){const{ctx:a,setupState:r,data:t,props:n,accessCache:s,type:i,appContext:o}=c;let l;if(e[0]!=="$"){const p=s[e];if(p!==void 0)switch(p){case 1:return r[e];case 2:return t[e];case 4:return a[e];case 3:return n[e]}else{if(h5(r,e))return s[e]=1,r[e];if(t!==d1&&o1(t,e))return s[e]=2,t[e];if((l=c.propsOptions[0])&&o1(l,e))return s[e]=3,n[e];if(a!==d1&&o1(a,e))return s[e]=4,a[e];q5&&(s[e]=0)}}const f=e6[e];let u,h;if(f)return e==="$attrs"&&K1(c,"get",e),f(c);if((u=i.__cssModules)&&(u=u[e]))return u;if(a!==d1&&o1(a,e))return s[e]=4,a[e];if(h=o.config.globalProperties,o1(h,e))return h[e]},set({_:c},e,a){const{data:r,setupState:t,ctx:n}=c;return h5(t,e)?(t[e]=a,!0):r!==d1&&o1(r,e)?(r[e]=a,!0):o1(c.props,e)||e[0]==="$"&&e.slice(1)in c?!1:(n[e]=a,!0)},has({_:{data:c,setupState:e,accessCache:a,ctx:r,appContext:t,propsOptions:n}},s){let i;return!!a[s]||c!==d1&&o1(c,s)||h5(e,s)||(i=n[0])&&o1(i,s)||o1(r,s)||o1(e6,s)||o1(t.config.globalProperties,s)},defineProperty(c,e,a){return a.get!=null?c._.accessCache[e]=0:o1(a,"value")&&this.set(c,e,a.value,null),Reflect.defineProperty(c,e,a)}},Yp=V1({},U5,{get(c,e){if(e!==Symbol.unscopables)return U5.get(c,e,c)},has(c,e){return e[0]!=="_"&&!Vd(e)}});function Xp(){return null}function Qp(){return null}function cz(c){}function ez(c){}function az(){return null}function rz(){}function tz(c,e){return null}function nz(){return et().slots}function sz(){return et().attrs}function iz(c,e,a){const r=G2();if(a&&a.local){const t=x1(c[e]);return g2(()=>c[e],n=>t.value=n),g2(t,n=>{n!==c[e]&&r.emit(`update:${e}`,n)}),t}else return{__v_isRef:!0,get value(){return c[e]},set value(t){r.emit(`update:${e}`,t)}}}function et(){const c=G2();return c.setupContext||(c.setupContext=Lt(c))}function C6(c){return j(c)?c.reduce((e,a)=>(e[a]=null,e),{}):c}function oz(c,e){const a=C6(c);for(const r in e){if(r.startsWith("__skip"))continue;let t=a[r];t?j(t)||a1(t)?t=a[r]={type:t,default:e[r]}:t.default=e[r]:t===null&&(t=a[r]={default:e[r]}),t&&e[`__skip_${r}`]&&(t.skipFactory=!0)}return a}function lz(c,e){return!c||!e?c||e:j(c)&&j(e)?c.concat(e):V1({},C6(c),C6(e))}function fz(c,e){const a={};for(const r in c)e.includes(r)||Object.defineProperty(a,r,{enumerable:!0,get:()=>c[r]});return a}function uz(c){const e=G2();let a=c();return v3(),R7(a)&&(a=a.catch(r=>{throw M3(e),r})),[a,()=>M3(e)]}let q5=!0;function hz(c){const e=o9(c),a=c.proxy,r=c.ctx;q5=!1,e.beforeCreate&&oe(e.beforeCreate,c,"bc");const{data:t,computed:n,methods:s,watch:i,provide:o,inject:l,created:f,beforeMount:u,mounted:h,beforeUpdate:p,updated:H,activated:M,deactivated:x,beforeDestroy:d,beforeUnmount:m,destroyed:g,unmounted:C,render:b,renderTracked:T,renderTriggered:E,errorCaptured:L,serverPrefetch:A,expose:I,inheritAttrs:$,components:F,directives:X,filters:q}=e;if(l&&mz(l,r,null),s)for(const f1 in s){const u1=s[f1];a1(u1)&&(r[f1]=u1.bind(a))}if(t){const f1=t.call(a,a);p1(f1)&&(c.data=T4(f1))}if(q5=!0,n)for(const f1 in n){const u1=n[f1],N2=a1(u1)?u1.bind(a,a):a1(u1.get)?u1.get.bind(a,a):h2,Z2=!a1(u1)&&a1(u1.set)?u1.set.bind(a):h2,d2=S1({get:N2,set:Z2});Object.defineProperty(r,f1,{enumerable:!0,configurable:!0,get:()=>d2.value,set:U1=>d2.value=U1})}if(i)for(const f1 in i)at(i[f1],r,a,f1);if(o){const f1=a1(o)?o.call(a):o;Reflect.ownKeys(f1).forEach(u1=>{a6(u1,f1[u1])})}f&&oe(f,c,"c");function c1(f1,u1){j(u1)?u1.forEach(N2=>f1(N2.bind(a))):u1&&f1(u1.bind(a))}if(c1($r,u),c1(R4,h),c1(Gr,p),c1(M0,H),c1(r9,M),c1(t9,x),c1(Yr,L),c1(Jr,T),c1(Zr,E),c1(g0,m),c1(I4,C),c1(Kr,A),j(I))if(I.length){const f1=c.exposed||(c.exposed={});I.forEach(u1=>{Object.defineProperty(f1,u1,{get:()=>a[u1],set:N2=>a[u1]=N2})})}else c.exposed||(c.exposed={});b&&c.render===h2&&(c.render=b),$!=null&&(c.inheritAttrs=$),F&&(c.components=F),X&&(c.directives=X)}function mz(c,e,a=h2){j(c)&&(c=W5(c));for(const r in c){const t=c[r];let n;p1(t)?"default"in t?n=G1(t.from||r,t.default,!0):n=G1(t.from||r):n=G1(t),b1(n)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>n.value,set:s=>n.value=s}):e[r]=n}}function oe(c,e,a){c2(j(c)?c.map(r=>r.bind(e.proxy)):c.bind(e.proxy),e,a)}function at(c,e,a,r){const t=r.includes(".")?Ur(a,r):()=>a[r];if(L1(c)){const n=e[c];a1(n)&&g2(t,n)}else if(a1(c))g2(t,c.bind(a));else if(p1(c))if(j(c))c.forEach(n=>at(n,e,a,r));else{const n=a1(c.handler)?c.handler.bind(a):e[c.handler];a1(n)&&g2(t,n,c)}}function o9(c){const e=c.type,{mixins:a,extends:r}=e,{mixins:t,optionsCache:n,config:{optionMergeStrategies:s}}=c.appContext,i=n.get(e);let o;return i?o=i:!t.length&&!a&&!r?o=e:(o={},t.length&&t.forEach(l=>j8(o,l,s,!0)),j8(o,e,s)),p1(e)&&n.set(e,o),o}function j8(c,e,a,r=!1){const{mixins:t,extends:n}=e;n&&j8(c,n,a,!0),t&&t.forEach(s=>j8(c,s,a,!0));for(const s in e)if(!(r&&s==="expose")){const i=vz[s]||a&&a[s];c[s]=i?i(c[s],e[s]):e[s]}return c}const vz={data:le,props:fe,emits:fe,methods:Z4,computed:Z4,beforeCreate:B1,created:B1,beforeMount:B1,mounted:B1,beforeUpdate:B1,updated:B1,beforeDestroy:B1,beforeUnmount:B1,destroyed:B1,unmounted:B1,activated:B1,deactivated:B1,errorCaptured:B1,serverPrefetch:B1,components:Z4,directives:Z4,watch:pz,provide:le,inject:dz};function le(c,e){return e?c?function(){return V1(a1(c)?c.call(this,this):c,a1(e)?e.call(this,this):e)}:e:c}function dz(c,e){return Z4(W5(c),W5(e))}function W5(c){if(j(c)){const e={};for(let a=0;a<c.length;a++)e[c[a]]=c[a];return e}return c}function B1(c,e){return c?[...new Set([].concat(c,e))]:e}function Z4(c,e){return c?V1(Object.create(null),c,e):e}function fe(c,e){return c?j(c)&&j(e)?[...new Set([...c,...e])]:V1(Object.create(null),C6(c),C6(e??{})):e}function pz(c,e){if(!c)return e;if(!e)return c;const a=V1(Object.create(null),c);for(const r in e)a[r]=B1(c[r],e[r]);return a}function rt(){return{app:null,config:{isNativeTag:hd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zz=0;function Hz(c,e){return function(r,t=null){a1(r)||(r=V1({},r)),t!=null&&!p1(t)&&(t=null);const n=rt(),s=new Set;let i=!1;const o=n.app={_uid:zz++,_component:r,_props:t,_container:null,_context:n,_instance:null,version:Nt,get config(){return n.config},set config(l){},use(l,...f){return s.has(l)||(l&&a1(l.install)?(s.add(l),l.install(o,...f)):a1(l)&&(s.add(l),l(o,...f))),o},mixin(l){return n.mixins.includes(l)||n.mixins.push(l),o},component(l,f){return f?(n.components[l]=f,o):n.components[l]},directive(l,f){return f?(n.directives[l]=f,o):n.directives[l]},mount(l,f,u){if(!i){const h=e1(r,t);return h.appContext=n,f&&e?e(h,l):c(h,l,u),i=!0,o._container=l,l.__vue_app__=o,b0(h.component)||h.component.proxy}},unmount(){i&&(c(null,o._container),delete o._container.__vue_app__)},provide(l,f){return n.provides[l]=f,o},runWithContext(l){V6=o;try{return l()}finally{V6=null}}};return o}}let V6=null;function a6(c,e){if(A1){let a=A1.provides;const r=A1.parent&&A1.parent.provides;r===a&&(a=A1.provides=Object.create(r)),a[c]=e}}function G1(c,e,a=!1){const r=A1||T1;if(r||V6){const t=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:V6._context.provides;if(t&&c in t)return t[c];if(arguments.length>1)return a&&a1(e)?e.call(r&&r.proxy):e}}function tt(){return!!(A1||T1||V6)}function Cz(c,e,a,r=!1){const t={},n={};F8(n,L0,1),c.propsDefaults=Object.create(null),nt(c,e,t,n);for(const s in c.propsOptions[0])s in t||(t[s]=void 0);a?c.props=r?t:q7(t):c.type.props?c.props=t:c.props=n,c.attrs=n}function Vz(c,e,a,r){const{props:t,attrs:n,vnode:{patchFlag:s}}=c,i=n1(t),[o]=c.propsOptions;let l=!1;if((r||s>0)&&!(s&16)){if(s&8){const f=c.vnode.dynamicProps;for(let u=0;u<f.length;u++){let h=f[u];if(z0(c.emitsOptions,h))continue;const p=e[h];if(o)if(o1(n,h))p!==n[h]&&(n[h]=p,l=!0);else{const H=$1(h);t[H]=j5(o,i,H,p,c,!1)}else p!==n[h]&&(n[h]=p,l=!0)}}}else{nt(c,e,t,n)&&(l=!0);let f;for(const u in i)(!e||!o1(e,u)&&((f=t2(u))===u||!o1(e,f)))&&(o?a&&(a[u]!==void 0||a[f]!==void 0)&&(t[u]=j5(o,i,u,void 0,c,!0)):delete t[u]);if(n!==i)for(const u in n)(!e||!o1(e,u))&&(delete n[u],l=!0)}l&&O2(c,"set","$attrs")}function nt(c,e,a,r){const[t,n]=c.propsOptions;let s=!1,i;if(e)for(let o in e){if(Q4(o))continue;const l=e[o];let f;t&&o1(t,f=$1(o))?!n||!n.includes(f)?a[f]=l:(i||(i={}))[f]=l:z0(c.emitsOptions,o)||(!(o in r)||l!==r[o])&&(r[o]=l,s=!0)}if(n){const o=n1(a),l=i||d1;for(let f=0;f<n.length;f++){const u=n[f];a[u]=j5(t,o,u,l[u],c,!o1(l,u))}}return s}function j5(c,e,a,r,t,n){const s=c[a];if(s!=null){const i=o1(s,"default");if(i&&r===void 0){const o=s.default;if(s.type!==Function&&!s.skipFactory&&a1(o)){const{propsDefaults:l}=t;a in l?r=l[a]:(M3(t),r=l[a]=o.call(null,e),v3())}else r=o}s[0]&&(n&&!i?r=!1:s[1]&&(r===""||r===t2(a))&&(r=!0))}return r}function st(c,e,a=!1){const r=e.propsCache,t=r.get(c);if(t)return t;const n=c.props,s={},i=[];let o=!1;if(!a1(c)){const f=u=>{o=!0;const[h,p]=st(u,e,!0);V1(s,h),p&&i.push(...p)};!a&&e.mixins.length&&e.mixins.forEach(f),c.extends&&f(c.extends),c.mixins&&c.mixins.forEach(f)}if(!n&&!o)return p1(c)&&r.set(c,o4),o4;if(j(n))for(let f=0;f<n.length;f++){const u=$1(n[f]);ue(u)&&(s[u]=d1)}else if(n)for(const f in n){const u=$1(f);if(ue(u)){const h=n[f],p=s[u]=j(h)||a1(h)?{type:h}:V1({},h);if(p){const H=ve(Boolean,p.type),M=ve(String,p.type);p[0]=H>-1,p[1]=M<0||H<M,(H>-1||o1(p,"default"))&&i.push(u)}}}const l=[s,i];return p1(c)&&r.set(c,l),l}function ue(c){return c[0]!=="$"}function he(c){const e=c&&c.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:c===null?"null":""}function me(c,e){return he(c)===he(e)}function ve(c,e){return j(e)?e.findIndex(a=>me(a,c)):a1(e)&&me(e,c)?0:-1}const it=c=>c[0]==="_"||c==="$stable",l9=c=>j(c)?c.map(Q1):[Q1(c)],Mz=(c,e,a)=>{if(e._n)return e;const r=Y1((...t)=>l9(e(...t)),a);return r._c=!1,r},ot=(c,e,a)=>{const r=c._ctx;for(const t in c){if(it(t))continue;const n=c[t];if(a1(n))e[t]=Mz(t,n,r);else if(n!=null){const s=l9(n);e[t]=()=>s}}},lt=(c,e)=>{const a=l9(e);c.slots.default=()=>a},gz=(c,e)=>{if(c.vnode.shapeFlag&32){const a=e._;a?(c.slots=n1(e),F8(e,"_",a)):ot(e,c.slots={})}else c.slots={},e&&lt(c,e);F8(c.slots,L0,1)},Lz=(c,e,a)=>{const{vnode:r,slots:t}=c;let n=!0,s=d1;if(r.shapeFlag&32){const i=e._;i?a&&i===1?n=!1:(V1(t,e),!a&&i===1&&delete t._):(n=!e.$stable,ot(e,t)),s=e}else e&&(lt(c,e),s={default:1});if(n)for(const i in t)!it(i)&&!(i in s)&&delete t[i]};function $8(c,e,a,r,t=!1){if(j(c)){c.forEach((h,p)=>$8(h,e&&(j(e)?e[p]:e),a,r,t));return}if(O3(r)&&!t)return;const n=r.shapeFlag&4?b0(r.component)||r.component.proxy:r.el,s=t?null:n,{i,r:o}=c,l=e&&e.r,f=i.refs===d1?i.refs={}:i.refs,u=i.setupState;if(l!=null&&l!==o&&(L1(l)?(f[l]=null,o1(u,l)&&(u[l]=null)):b1(l)&&(l.value=null)),a1(o))I2(o,i,12,[s,f]);else{const h=L1(o),p=b1(o);if(h||p){const H=()=>{if(c.f){const M=h?o1(u,o)?u[o]:f[o]:o.value;t?j(M)&&P7(M,n):j(M)?M.includes(n)||M.push(n):h?(f[o]=[n],o1(u,o)&&(u[o]=f[o])):(o.value=[n],c.k&&(f[c.k]=o.value))}else h?(f[o]=s,o1(u,o)&&(u[o]=s)):p&&(o.value=s,c.k&&(f[c.k]=s))};s?(H.id=-1,P1(H,a)):H()}}}let Y2=!1;const h8=c=>/svg/.test(c.namespaceURI)&&c.tagName!=="foreignObject",m8=c=>c.nodeType===8;function bz(c){const{mt:e,p:a,o:{patchProp:r,createText:t,nextSibling:n,parentNode:s,remove:i,insert:o,createComment:l}}=c,f=(d,m)=>{if(!m.hasChildNodes()){a(null,d,m),W8(),m._vnode=d;return}Y2=!1,u(m.firstChild,d,null,null,null),W8(),m._vnode=d,Y2&&console.error("Hydration completed but contains mismatches.")},u=(d,m,g,C,b,T=!1)=>{const E=m8(d)&&d.data==="[",L=()=>M(d,m,g,C,b,E),{type:A,ref:I,shapeFlag:$,patchFlag:F}=m;let X=d.nodeType;m.el=d,F===-2&&(T=!1,m.dynamicChildren=null);let q=null;switch(A){case q3:X!==3?m.children===""?(o(m.el=t(""),s(d),d),q=d):q=L():(d.data!==m.children&&(Y2=!0,d.data=m.children),q=n(d));break;case D1:X!==8||E?q=L():q=n(d);break;case F3:if(E&&(d=n(d),X=d.nodeType),X===1||X===3){q=d;const H1=!m.children.length;for(let c1=0;c1<m.staticCount;c1++)H1&&(m.children+=q.nodeType===1?q.outerHTML:q.data),c1===m.staticCount-1&&(m.anchor=q),q=n(q);return E?n(q):q}else L();break;case E1:E?q=H(d,m,g,C,b,T):q=L();break;default:if($&1)X!==1||m.type.toLowerCase()!==d.tagName.toLowerCase()?q=L():q=h(d,m,g,C,b,T);else if($&6){m.slotScopeIds=b;const H1=s(d);if(e(m,H1,null,g,C,h8(H1),T),q=E?x(d):n(d),q&&m8(q)&&q.data==="teleport end"&&(q=n(q)),O3(m)){let c1;E?(c1=e1(E1),c1.anchor=q?q.previousSibling:H1.lastChild):c1=d.nodeType===3?r2(""):e1("div"),c1.el=d,m.component.subTree=c1}}else $&64?X!==8?q=L():q=m.type.hydrate(d,m,g,C,b,T,c,p):$&128&&(q=m.type.hydrate(d,m,g,C,h8(s(d)),b,T,c,u))}return I!=null&&$8(I,null,C,m),q},h=(d,m,g,C,b,T)=>{T=T||!!m.dynamicChildren;const{type:E,props:L,patchFlag:A,shapeFlag:I,dirs:$}=m,F=E==="input"&&$||E==="option";if(F||A!==-1){if($&&H2(m,null,g,"created"),L)if(F||!T||A&48)for(const q in L)(F&&q.endsWith("value")||E6(q)&&!Q4(q))&&r(d,q,null,L[q],!1,void 0,g);else L.onClick&&r(d,"onClick",null,L.onClick,!1,void 0,g);let X;if((X=L&&L.onVnodeBeforeMount)&&W1(X,g,m),$&&H2(m,null,g,"beforeMount"),((X=L&&L.onVnodeMounted)||$)&&Fr(()=>{X&&W1(X,g,m),$&&H2(m,null,g,"mounted")},C),I&16&&!(L&&(L.innerHTML||L.textContent))){let q=p(d.firstChild,m,d,g,C,b,T);for(;q;){Y2=!0;const H1=q;q=q.nextSibling,i(H1)}}else I&8&&d.textContent!==m.children&&(Y2=!0,d.textContent=m.children)}return d.nextSibling},p=(d,m,g,C,b,T,E)=>{E=E||!!m.dynamicChildren;const L=m.children,A=L.length;for(let I=0;I<A;I++){const $=E?L[I]:L[I]=Q1(L[I]);if(d)d=u(d,$,C,b,T,E);else{if($.type===q3&&!$.children)continue;Y2=!0,a(null,$,g,null,C,b,h8(g),T)}}return d},H=(d,m,g,C,b,T)=>{const{slotScopeIds:E}=m;E&&(b=b?b.concat(E):E);const L=s(d),A=p(n(d),m,L,g,C,b,T);return A&&m8(A)&&A.data==="]"?n(m.anchor=A):(Y2=!0,o(m.anchor=l("]"),L,A),A)},M=(d,m,g,C,b,T)=>{if(Y2=!0,m.el=null,T){const A=x(d);for(;;){const I=n(d);if(I&&I!==A)i(I);else break}}const E=n(d),L=s(d);return i(d),a(null,m,L,E,g,C,h8(L),b),E},x=d=>{let m=0;for(;d;)if(d=n(d),d&&m8(d)&&(d.data==="["&&m++,d.data==="]")){if(m===0)return n(d);m--}return d};return[f,u]}const P1=Fr;function ft(c){return ht(c)}function ut(c){return ht(c,bz)}function ht(c,e){const a=R5();a.__VUE__=!0;const{insert:r,remove:t,patchProp:n,createElement:s,createText:i,createComment:o,setText:l,setElementText:f,parentNode:u,nextSibling:h,setScopeId:p=h2,insertStaticContent:H}=c,M=(v,z,V,y=null,w=null,_=null,B=!1,P=null,D=!!z.dynamicChildren)=>{if(v===z)return;v&&!l2(v,z)&&(y=S(v),U1(v,w,_,!0),v=null),z.patchFlag===-2&&(D=!1,z.dynamicChildren=null);const{type:k,ref:J,shapeFlag:G}=z;switch(k){case q3:x(v,z,V,y);break;case D1:d(v,z,V,y);break;case F3:v==null&&m(z,V,y,B);break;case E1:F(v,z,V,y,w,_,B,P,D);break;default:G&1?b(v,z,V,y,w,_,B,P,D):G&6?X(v,z,V,y,w,_,B,P,D):(G&64||G&128)&&k.process(v,z,V,y,w,_,B,P,D,O)}J!=null&&w&&$8(J,v&&v.ref,_,z||v,!z)},x=(v,z,V,y)=>{if(v==null)r(z.el=i(z.children),V,y);else{const w=z.el=v.el;z.children!==v.children&&l(w,z.children)}},d=(v,z,V,y)=>{v==null?r(z.el=o(z.children||""),V,y):z.el=v.el},m=(v,z,V,y)=>{[v.el,v.anchor]=H(v.children,z,V,y,v.el,v.anchor)},g=({el:v,anchor:z},V,y)=>{let w;for(;v&&v!==z;)w=h(v),r(v,V,y),v=w;r(z,V,y)},C=({el:v,anchor:z})=>{let V;for(;v&&v!==z;)V=h(v),t(v),v=V;t(z)},b=(v,z,V,y,w,_,B,P,D)=>{B=B||z.type==="svg",v==null?T(z,V,y,w,_,B,P,D):A(v,z,w,_,B,P,D)},T=(v,z,V,y,w,_,B,P)=>{let D,k;const{type:J,props:G,shapeFlag:Y,transition:r1,dirs:t1}=v;if(D=v.el=s(v.type,_,G&&G.is,G),Y&8?f(D,v.children):Y&16&&L(v.children,D,null,y,w,_&&J!=="foreignObject",B,P),t1&&H2(v,null,y,"created"),E(D,v,v.scopeId,B,y),G){for(const v1 in G)v1!=="value"&&!Q4(v1)&&n(D,v1,null,G[v1],_,v.children,y,w,R1);"value"in G&&n(D,"value",null,G.value),(k=G.onVnodeBeforeMount)&&W1(k,y,v)}t1&&H2(v,null,y,"beforeMount");const C1=(!w||w&&!w.pendingBranch)&&r1&&!r1.persisted;C1&&r1.beforeEnter(D),r(D,z,V),((k=G&&G.onVnodeMounted)||C1||t1)&&P1(()=>{k&&W1(k,y,v),C1&&r1.enter(D),t1&&H2(v,null,y,"mounted")},w)},E=(v,z,V,y,w)=>{if(V&&p(v,V),y)for(let _=0;_<y.length;_++)p(v,y[_]);if(w){let _=w.subTree;if(z===_){const B=w.vnode;E(v,B,B.scopeId,B.slotScopeIds,w.parent)}}},L=(v,z,V,y,w,_,B,P,D=0)=>{for(let k=D;k<v.length;k++){const J=v[k]=P?n3(v[k]):Q1(v[k]);M(null,J,z,V,y,w,_,B,P)}},A=(v,z,V,y,w,_,B)=>{const P=z.el=v.el;let{patchFlag:D,dynamicChildren:k,dirs:J}=z;D|=v.patchFlag&16;const G=v.props||d1,Y=z.props||d1;let r1;V&&w3(V,!1),(r1=Y.onVnodeBeforeUpdate)&&W1(r1,V,z,v),J&&H2(z,v,V,"beforeUpdate"),V&&w3(V,!0);const t1=w&&z.type!=="foreignObject";if(k?I(v.dynamicChildren,k,P,V,y,t1,_):B||u1(v,z,P,null,V,y,t1,_,!1),D>0){if(D&16)$(P,z,G,Y,V,y,w);else if(D&2&&G.class!==Y.class&&n(P,"class",null,Y.class,w),D&4&&n(P,"style",G.style,Y.style,w),D&8){const C1=z.dynamicProps;for(let v1=0;v1<C1.length;v1++){const w1=C1[v1],i2=G[w1],e4=Y[w1];(e4!==i2||w1==="value")&&n(P,w1,i2,e4,w,v.children,V,y,R1)}}D&1&&v.children!==z.children&&f(P,z.children)}else!B&&k==null&&$(P,z,G,Y,V,y,w);((r1=Y.onVnodeUpdated)||J)&&P1(()=>{r1&&W1(r1,V,z,v),J&&H2(z,v,V,"updated")},y)},I=(v,z,V,y,w,_,B)=>{for(let P=0;P<z.length;P++){const D=v[P],k=z[P],J=D.el&&(D.type===E1||!l2(D,k)||D.shapeFlag&70)?u(D.el):V;M(D,k,J,null,y,w,_,B,!0)}},$=(v,z,V,y,w,_,B)=>{if(V!==y){if(V!==d1)for(const P in V)!Q4(P)&&!(P in y)&&n(v,P,V[P],null,B,z.children,w,_,R1);for(const P in y){if(Q4(P))continue;const D=y[P],k=V[P];D!==k&&P!=="value"&&n(v,P,k,D,B,z.children,w,_,R1)}"value"in y&&n(v,"value",V.value,y.value)}},F=(v,z,V,y,w,_,B,P,D)=>{const k=z.el=v?v.el:i(""),J=z.anchor=v?v.anchor:i("");let{patchFlag:G,dynamicChildren:Y,slotScopeIds:r1}=z;r1&&(P=P?P.concat(r1):r1),v==null?(r(k,V,y),r(J,V,y),L(z.children,V,J,w,_,B,P,D)):G>0&&G&64&&Y&&v.dynamicChildren?(I(v.dynamicChildren,Y,V,w,_,B,P),(z.key!=null||w&&z===w.subTree)&&f9(v,z,!0)):u1(v,z,V,J,w,_,B,P,D)},X=(v,z,V,y,w,_,B,P,D)=>{z.slotScopeIds=P,v==null?z.shapeFlag&512?w.ctx.activate(z,V,y,B,D):q(z,V,y,w,_,B,D):H1(v,z,D)},q=(v,z,V,y,w,_,B)=>{const P=v.component=Ct(v,y,w);if(O6(v)&&(P.ctx.renderer=O),Mt(P),P.asyncDep){if(w&&w.registerDep(P,c1),!v.el){const D=P.subTree=e1(D1);d(null,D,z,V)}return}c1(P,v,z,V,w,_,B)},H1=(v,z,V)=>{const y=z.component=v.component;if(Sp(v,z,V))if(y.asyncDep&&!y.asyncResolved){f1(y,z,V);return}else y.next=z,Mp(y.update),y.update();else z.el=v.el,y.vnode=z},c1=(v,z,V,y,w,_,B)=>{const P=()=>{if(v.isMounted){let{next:J,bu:G,u:Y,parent:r1,vnode:t1}=v,C1=J,v1;w3(v,!1),J?(J.el=t1.el,f1(v,J,B)):J=t1,G&&f4(G),(v1=J.props&&J.props.onVnodeBeforeUpdate)&&W1(v1,r1,J,t1),w3(v,!0);const w1=N8(v),i2=v.subTree;v.subTree=w1,M(i2,w1,u(i2.el),S(i2),v,w,_),J.el=w1.el,C1===null&&Q7(v,w1.el),Y&&P1(Y,w),(v1=J.props&&J.props.onVnodeUpdated)&&P1(()=>W1(v1,r1,J,t1),w)}else{let J;const{el:G,props:Y}=z,{bm:r1,m:t1,parent:C1}=v,v1=O3(z);if(w3(v,!1),r1&&f4(r1),!v1&&(J=Y&&Y.onVnodeBeforeMount)&&W1(J,C1,z),w3(v,!0),G&&h1){const w1=()=>{v.subTree=N8(v),h1(G,v.subTree,v,w,null)};v1?z.type.__asyncLoader().then(()=>!v.isUnmounted&&w1()):w1()}else{const w1=v.subTree=N8(v);M(null,w1,V,y,v,w,_),z.el=w1.el}if(t1&&P1(t1,w),!v1&&(J=Y&&Y.onVnodeMounted)){const w1=z;P1(()=>W1(J,C1,w1),w)}(z.shapeFlag&256||C1&&O3(C1.vnode)&&C1.vnode.shapeFlag&256)&&v.a&&P1(v.a,w),v.isMounted=!0,z=V=y=null}},D=v.effect=new P6(P,()=>p0(k),v.scope),k=v.update=()=>D.run();k.id=v.uid,w3(v,!0),k()},f1=(v,z,V)=>{z.component=v;const y=v.vnode.props;v.vnode=z,v.next=null,Vz(v,z.props,y,V),Lz(v,z.children,V),k4(),re(),E4()},u1=(v,z,V,y,w,_,B,P,D=!1)=>{const k=v&&v.children,J=v?v.shapeFlag:0,G=z.children,{patchFlag:Y,shapeFlag:r1}=z;if(Y>0){if(Y&128){Z2(k,G,V,y,w,_,B,P,D);return}else if(Y&256){N2(k,G,V,y,w,_,B,P,D);return}}r1&8?(J&16&&R1(k,w,_),G!==k&&f(V,G)):J&16?r1&16?Z2(k,G,V,y,w,_,B,P,D):R1(k,w,_,!0):(J&8&&f(V,""),r1&16&&L(G,V,y,w,_,B,P,D))},N2=(v,z,V,y,w,_,B,P,D)=>{v=v||o4,z=z||o4;const k=v.length,J=z.length,G=Math.min(k,J);let Y;for(Y=0;Y<G;Y++){const r1=z[Y]=D?n3(z[Y]):Q1(z[Y]);M(v[Y],r1,V,null,w,_,B,P,D)}k>J?R1(v,w,_,!0,!1,G):L(z,V,y,w,_,B,P,D,G)},Z2=(v,z,V,y,w,_,B,P,D)=>{let k=0;const J=z.length;let G=v.length-1,Y=J-1;for(;k<=G&&k<=Y;){const r1=v[k],t1=z[k]=D?n3(z[k]):Q1(z[k]);if(l2(r1,t1))M(r1,t1,V,null,w,_,B,P,D);else break;k++}for(;k<=G&&k<=Y;){const r1=v[G],t1=z[Y]=D?n3(z[Y]):Q1(z[Y]);if(l2(r1,t1))M(r1,t1,V,null,w,_,B,P,D);else break;G--,Y--}if(k>G){if(k<=Y){const r1=Y+1,t1=r1<J?z[r1].el:y;for(;k<=Y;)M(null,z[k]=D?n3(z[k]):Q1(z[k]),V,t1,w,_,B,P,D),k++}}else if(k>Y)for(;k<=G;)U1(v[k],w,_,!0),k++;else{const r1=k,t1=k,C1=new Map;for(k=t1;k<=Y;k++){const Z1=z[k]=D?n3(z[k]):Q1(z[k]);Z1.key!=null&&C1.set(Z1.key,k)}let v1,w1=0;const i2=Y-t1+1;let e4=!1,jc=0;const U4=new Array(i2);for(k=0;k<i2;k++)U4[k]=0;for(k=r1;k<=G;k++){const Z1=v[k];if(w1>=i2){U1(Z1,w,_,!0);continue}let p2;if(Z1.key!=null)p2=C1.get(Z1.key);else for(v1=t1;v1<=Y;v1++)if(U4[v1-t1]===0&&l2(Z1,z[v1])){p2=v1;break}p2===void 0?U1(Z1,w,_,!0):(U4[p2-t1]=k+1,p2>=jc?jc=p2:e4=!0,M(Z1,z[p2],V,null,w,_,B,P,D),w1++)}const $c=e4?xz(U4):o4;for(v1=$c.length-1,k=i2-1;k>=0;k--){const Z1=t1+k,p2=z[Z1],Gc=Z1+1<J?z[Z1+1].el:y;U4[k]===0?M(null,p2,V,Gc,w,_,B,P,D):e4&&(v1<0||k!==$c[v1]?d2(p2,V,Gc,2):v1--)}}},d2=(v,z,V,y,w=null)=>{const{el:_,type:B,transition:P,children:D,shapeFlag:k}=v;if(k&6){d2(v.component.subTree,z,V,y);return}if(k&128){v.suspense.move(z,V,y);return}if(k&64){B.move(v,z,V,O);return}if(B===E1){r(_,z,V);for(let G=0;G<D.length;G++)d2(D[G],z,V,y);r(v.anchor,z,V);return}if(B===F3){g(v,z,V);return}if(y!==2&&k&1&&P)if(y===0)P.beforeEnter(_),r(_,z,V),P1(()=>P.enter(_),w);else{const{leave:G,delayLeave:Y,afterLeave:r1}=P,t1=()=>r(_,z,V),C1=()=>{G(_,()=>{t1(),r1&&r1()})};Y?Y(_,t1,C1):C1()}else r(_,z,V)},U1=(v,z,V,y=!1,w=!1)=>{const{type:_,props:B,ref:P,children:D,dynamicChildren:k,shapeFlag:J,patchFlag:G,dirs:Y}=v;if(P!=null&&$8(P,null,V,v,!0),J&256){z.ctx.deactivate(v);return}const r1=J&1&&Y,t1=!O3(v);let C1;if(t1&&(C1=B&&B.onVnodeBeforeUnmount)&&W1(C1,z,v),J&6)t8(v.component,V,y);else{if(J&128){v.suspense.unmount(V,y);return}r1&&H2(v,null,z,"beforeUnmount"),J&64?v.type.remove(v,z,V,w,O,y):k&&(_!==E1||G>0&&G&64)?R1(k,z,V,!1,!0):(_===E1&&G&384||!w&&J&16)&&R1(D,z,V),y&&Q3(v)}(t1&&(C1=B&&B.onVnodeUnmounted)||r1)&&P1(()=>{C1&&W1(C1,z,v),r1&&H2(v,null,z,"unmounted")},V)},Q3=v=>{const{type:z,el:V,anchor:y,transition:w}=v;if(z===E1){c4(V,y);return}if(z===F3){C(v);return}const _=()=>{t(V),w&&!w.persisted&&w.afterLeave&&w.afterLeave()};if(v.shapeFlag&1&&w&&!w.persisted){const{leave:B,delayLeave:P}=w,D=()=>B(V,_);P?P(v.el,_,D):D()}else _()},c4=(v,z)=>{let V;for(;v!==z;)V=h(v),t(v),v=V;t(z)},t8=(v,z,V)=>{const{bum:y,scope:w,update:_,subTree:B,um:P}=v;y&&f4(y),w.stop(),_&&(_.active=!1,U1(B,v,z,V)),P&&P1(P,z),P1(()=>{v.isUnmounted=!0},z),z&&z.pendingBranch&&!z.isUnmounted&&v.asyncDep&&!v.asyncResolved&&v.suspenseId===z.pendingId&&(z.deps--,z.deps===0&&z.resolve())},R1=(v,z,V,y=!1,w=!1,_=0)=>{for(let B=_;B<v.length;B++)U1(v[B],z,V,y,w)},S=v=>v.shapeFlag&6?S(v.component.subTree):v.shapeFlag&128?v.suspense.next():h(v.anchor||v.el),W=(v,z,V)=>{v==null?z._vnode&&U1(z._vnode,null,null,!0):M(z._vnode||null,v,z,null,null,null,V),re(),W8(),z._vnode=v},O={p:M,um:U1,m:d2,r:Q3,mt:q,mc:L,pc:u1,pbc:I,n:S,o:c};let Z,h1;return e&&([Z,h1]=e(O)),{render:W,hydrate:Z,createApp:Hz(W,Z)}}function w3({effect:c,update:e},a){c.allowRecurse=e.allowRecurse=a}function f9(c,e,a=!1){const r=c.children,t=e.children;if(j(r)&&j(t))for(let n=0;n<r.length;n++){const s=r[n];let i=t[n];i.shapeFlag&1&&!i.dynamicChildren&&((i.patchFlag<=0||i.patchFlag===32)&&(i=t[n]=n3(t[n]),i.el=s.el),a||f9(s,i)),i.type===q3&&(i.el=s.el)}}function xz(c){const e=c.slice(),a=[0];let r,t,n,s,i;const o=c.length;for(r=0;r<o;r++){const l=c[r];if(l!==0){if(t=a[a.length-1],c[t]<l){e[r]=t,a.push(r);continue}for(n=0,s=a.length-1;n<s;)i=n+s>>1,c[a[i]]<l?n=i+1:s=i;l<c[a[n]]&&(n>0&&(e[r]=a[n-1]),a[n]=r)}}for(n=a.length,s=a[n-1];n-- >0;)a[n]=s,s=e[s];return a}const yz=c=>c.__isTeleport,r6=c=>c&&(c.disabled||c.disabled===""),de=c=>typeof SVGElement<"u"&&c instanceof SVGElement,$5=(c,e)=>{const a=c&&c.to;return L1(a)?e?e(a):null:a},Nz={__isTeleport:!0,process(c,e,a,r,t,n,s,i,o,l){const{mc:f,pc:u,pbc:h,o:{insert:p,querySelector:H,createText:M,createComment:x}}=l,d=r6(e.props);let{shapeFlag:m,children:g,dynamicChildren:C}=e;if(c==null){const b=e.el=M(""),T=e.anchor=M("");p(b,a,r),p(T,a,r);const E=e.target=$5(e.props,H),L=e.targetAnchor=M("");E&&(p(L,E),s=s||de(E));const A=(I,$)=>{m&16&&f(g,I,$,t,n,s,i,o)};d?A(a,T):E&&A(E,L)}else{e.el=c.el;const b=e.anchor=c.anchor,T=e.target=c.target,E=e.targetAnchor=c.targetAnchor,L=r6(c.props),A=L?a:T,I=L?b:E;if(s=s||de(T),C?(h(c.dynamicChildren,C,A,t,n,s,i),f9(c,e,!0)):o||u(c,e,A,I,t,n,s,i,!1),d)L||v8(e,a,b,l,1);else if((e.props&&e.props.to)!==(c.props&&c.props.to)){const $=e.target=$5(e.props,H);$&&v8(e,$,null,l,0)}else L&&v8(e,T,E,l,1)}mt(e)},remove(c,e,a,r,{um:t,o:{remove:n}},s){const{shapeFlag:i,children:o,anchor:l,targetAnchor:f,target:u,props:h}=c;if(u&&n(f),(s||!r6(h))&&(n(l),i&16))for(let p=0;p<o.length;p++){const H=o[p];t(H,e,a,!0,!!H.dynamicChildren)}},move:v8,hydrate:Sz};function v8(c,e,a,{o:{insert:r},m:t},n=2){n===0&&r(c.targetAnchor,e,a);const{el:s,anchor:i,shapeFlag:o,children:l,props:f}=c,u=n===2;if(u&&r(s,e,a),(!u||r6(f))&&o&16)for(let h=0;h<l.length;h++)t(l[h],e,a,2);u&&r(i,e,a)}function Sz(c,e,a,r,t,n,{o:{nextSibling:s,parentNode:i,querySelector:o}},l){const f=e.target=$5(e.props,o);if(f){const u=f._lpa||f.firstChild;if(e.shapeFlag&16)if(r6(e.props))e.anchor=l(s(c),e,i(c),a,r,t,n),e.targetAnchor=u;else{e.anchor=s(c);let h=u;for(;h;)if(h=s(h),h&&h.nodeType===8&&h.data==="teleport anchor"){e.targetAnchor=h,f._lpa=e.targetAnchor&&s(e.targetAnchor);break}l(u,e,f,a,r,t,n)}mt(e)}return e.anchor&&s(e.anchor)}const wz=Nz;function mt(c){const e=c.ctx;if(e&&e.ut){let a=c.children[0].el;for(;a!==c.targetAnchor;)a.nodeType===1&&a.setAttribute("data-v-owner",e.uid),a=a.nextSibling;e.ut()}}const E1=Symbol.for("v-fgt"),q3=Symbol.for("v-txt"),D1=Symbol.for("v-cmt"),F3=Symbol.for("v-stc"),t6=[];let j1=null;function O1(c=!1){t6.push(j1=c?null:[])}function vt(){t6.pop(),j1=t6[t6.length-1]||null}let W3=1;function G5(c){W3+=c}function dt(c){return c.dynamicChildren=W3>0?j1||o4:null,vt(),W3>0&&j1&&j1.push(c),c}function F2(c,e,a,r,t,n){return dt(s1(c,e,a,r,t,n,!0))}function j3(c,e,a,r,t){return dt(e1(c,e,a,r,t,!0))}function V3(c){return c?c.__v_isVNode===!0:!1}function l2(c,e){return c.type===e.type&&c.key===e.key}function Az(c){}const L0="__vInternal",pt=({key:c})=>c??null,S8=({ref:c,ref_key:e,ref_for:a})=>(typeof c=="number"&&(c=""+c),c!=null?L1(c)||b1(c)||a1(c)?{i:T1,r:c,k:e,f:!!a}:c:null);function s1(c,e=null,a=null,r=0,t=null,n=c===E1?0:1,s=!1,i=!1){const o={__v_isVNode:!0,__v_skip:!0,type:c,props:e,key:e&&pt(e),ref:e&&S8(e),scopeId:H0,slotScopeIds:null,children:a,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:n,patchFlag:r,dynamicProps:t,dynamicChildren:null,appContext:null,ctx:T1};return i?(h9(o,a),n&128&&c.normalize(o)):a&&(o.shapeFlag|=L1(a)?8:16),W3>0&&!s&&j1&&(o.patchFlag>0||n&6)&&o.patchFlag!==32&&j1.push(o),o}const e1=_z;function _z(c,e=null,a=null,r=0,t=null,n=!1){if((!c||c===Xr)&&(c=D1),V3(c)){const i=b2(c,e,!0);return a&&h9(i,a),W3>0&&!n&&j1&&(i.shapeFlag&6?j1[j1.indexOf(c)]=i:j1.push(i)),i.patchFlag|=-2,i}if(Dz(c)&&(c=c.__vccOpts),e){e=zt(e);let{class:i,style:o}=e;i&&!L1(i)&&(e.class=X1(i)),p1(o)&&(j7(o)&&!j(o)&&(o=V1({},o)),e.style=_4(o))}const s=L1(c)?1:Or(c)?128:yz(c)?64:p1(c)?4:a1(c)?2:0;return s1(c,e,a,r,t,s,n,!0)}function zt(c){return c?j7(c)||L0 in c?V1({},c):c:null}function b2(c,e,a=!1){const{props:r,ref:t,patchFlag:n,children:s}=c,i=e?Ht(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:c.type,props:i,key:i&&pt(i),ref:e&&e.ref?a&&t?j(t)?t.concat(S8(e)):[t,S8(e)]:S8(e):t,scopeId:c.scopeId,slotScopeIds:c.slotScopeIds,children:s,target:c.target,targetAnchor:c.targetAnchor,staticCount:c.staticCount,shapeFlag:c.shapeFlag,patchFlag:e&&c.type!==E1?n===-1?16:n|16:n,dynamicProps:c.dynamicProps,dynamicChildren:c.dynamicChildren,appContext:c.appContext,dirs:c.dirs,transition:c.transition,component:c.component,suspense:c.suspense,ssContent:c.ssContent&&b2(c.ssContent),ssFallback:c.ssFallback&&b2(c.ssFallback),el:c.el,anchor:c.anchor,ctx:c.ctx,ce:c.ce}}function r2(c=" ",e=0){return e1(q3,null,c,e)}function u9(c,e){const a=e1(F3,null,c);return a.staticCount=e,a}function K5(c="",e=!1){return e?(O1(),j3(D1,null,c)):e1(D1,null,c)}function Q1(c){return c==null||typeof c=="boolean"?e1(D1):j(c)?e1(E1,null,c.slice()):typeof c=="object"?n3(c):e1(q3,null,String(c))}function n3(c){return c.el===null&&c.patchFlag!==-1||c.memo?c:b2(c)}function h9(c,e){let a=0;const{shapeFlag:r}=c;if(e==null)e=null;else if(j(e))a=16;else if(typeof e=="object")if(r&65){const t=e.default;t&&(t._c&&(t._d=!1),h9(c,t()),t._c&&(t._d=!0));return}else{a=32;const t=e._;!t&&!(L0 in e)?e._ctx=T1:t===3&&T1&&(T1.slots._===1?e._=1:(e._=2,c.patchFlag|=1024))}else a1(e)?(e={default:e,_ctx:T1},a=32):(e=String(e),r&64?(a=16,e=[r2(e)]):a=8);c.children=e,c.shapeFlag|=a}function Ht(...c){const e={};for(let a=0;a<c.length;a++){const r=c[a];for(const t in r)if(t==="class")e.class!==r.class&&(e.class=X1([e.class,r.class]));else if(t==="style")e.style=_4([e.style,r.style]);else if(E6(t)){const n=e[t],s=r[t];s&&n!==s&&!(j(n)&&n.includes(s))&&(e[t]=n?[].concat(n,s):s)}else t!==""&&(e[t]=r[t])}return e}function W1(c,e,a,r=null){c2(c,e,7,[a,r])}const kz=rt();let Ez=0;function Ct(c,e,a){const r=c.type,t=(e?e.appContext:c.appContext)||kz,n={uid:Ez++,vnode:c,type:r,parent:e,appContext:t,root:null,next:null,subTree:null,effect:null,update:null,scope:new D7(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(t.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:st(r,t),emitsOptions:Dr(r,t),emit:null,emitted:null,propsDefaults:d1,inheritAttrs:r.inheritAttrs,ctx:d1,data:d1,props:d1,attrs:d1,slots:d1,refs:d1,setupState:d1,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:a,suspenseId:a?a.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return n.ctx={_:n},n.root=e?e.root:n,n.emit=Lp.bind(null,n),c.ce&&c.ce(n),n}let A1=null;const G2=()=>A1||T1;let m9,a4,pe="__VUE_INSTANCE_SETTERS__";(a4=R5()[pe])||(a4=R5()[pe]=[]),a4.push(c=>A1=c),m9=c=>{a4.length>1?a4.forEach(e=>e(c)):a4[0](c)};const M3=c=>{m9(c),c.scope.on()},v3=()=>{A1&&A1.scope.off(),m9(null)};function Vt(c){return c.vnode.shapeFlag&4}let M4=!1;function Mt(c,e=!1){M4=e;const{props:a,children:r}=c.vnode,t=Vt(c);Cz(c,a,t,e),gz(c,r);const n=t?Tz(c,e):void 0;return M4=!1,n}function Tz(c,e){const a=c.type;c.accessCache=Object.create(null),c.proxy=R6(new Proxy(c.ctx,U5));const{setup:r}=a;if(r){const t=c.setupContext=r.length>1?Lt(c):null;M3(c),k4();const n=I2(r,c,0,[c.props,t]);if(E4(),v3(),R7(n)){if(n.then(v3,v3),e)return n.then(s=>{Z5(c,s,e)}).catch(s=>{J3(s,c,0)});c.asyncDep=n}else Z5(c,n,e)}else gt(c,e)}function Z5(c,e,a){a1(e)?c.type.__ssrInlineRender?c.ssrRender=e:c.render=e:p1(e)&&(c.setupState=K7(e)),gt(c,a)}let G8,J5;function Pz(c){G8=c,J5=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,Yp))}}const Rz=()=>!G8;function gt(c,e,a){const r=c.type;if(!c.render){if(!e&&G8&&!r.render){const t=r.template||o9(c).template;if(t){const{isCustomElement:n,compilerOptions:s}=c.appContext.config,{delimiters:i,compilerOptions:o}=r,l=V1(V1({isCustomElement:n,delimiters:i},s),o);r.render=G8(t,l)}}c.render=r.render||h2,J5&&J5(c)}M3(c),k4(),hz(c),E4(),v3()}function Iz(c){return c.attrsProxy||(c.attrsProxy=new Proxy(c.attrs,{get(e,a){return K1(c,"get","$attrs"),e[a]}}))}function Lt(c){const e=a=>{c.exposed=a||{}};return{get attrs(){return Iz(c)},slots:c.slots,emit:c.emit,expose:e}}function b0(c){if(c.exposed)return c.exposeProxy||(c.exposeProxy=new Proxy(K7(R6(c.exposed)),{get(e,a){if(a in e)return e[a];if(a in e6)return e6[a](c)},has(e,a){return a in e||a in e6}}))}function Y5(c,e=!0){return a1(c)?c.displayName||c.name:c.name||e&&c.__name}function Dz(c){return a1(c)&&"__vccOpts"in c}const S1=(c,e)=>pp(c,e,M4);function F6(c,e,a){const r=arguments.length;return r===2?p1(e)&&!j(e)?V3(e)?e1(c,null,[e]):e1(c,e):e1(c,null,e):(r>3?a=Array.prototype.slice.call(arguments,2):r===3&&V3(a)&&(a=[a]),e1(c,e,a))}const bt=Symbol.for("v-scx"),xt=()=>G1(bt);function Oz(){}function Fz(c,e,a,r){const t=a[r];if(t&&yt(t,c))return t;const n=e();return n.memo=c.slice(),a[r]=n}function yt(c,e){const a=c.memo;if(a.length!=e.length)return!1;for(let r=0;r<a.length;r++)if(C4(a[r],e[r]))return!1;return W3>0&&j1&&j1.push(c),!0}const Nt="3.3.4",Bz={createComponentInstance:Ct,setupComponent:Mt,renderComponentRoot:N8,setCurrentRenderingInstance:z6,isVNode:V3,normalizeVNode:Q1},Uz=Bz,qz=null,Wz=null,jz="http://www.w3.org/2000/svg",E3=typeof document<"u"?document:null,ze=E3&&E3.createElement("template"),$z={insert:(c,e,a)=>{e.insertBefore(c,a||null)},remove:c=>{const e=c.parentNode;e&&e.removeChild(c)},createElement:(c,e,a,r)=>{const t=e?E3.createElementNS(jz,c):E3.createElement(c,a?{is:a}:void 0);return c==="select"&&r&&r.multiple!=null&&t.setAttribute("multiple",r.multiple),t},createText:c=>E3.createTextNode(c),createComment:c=>E3.createComment(c),setText:(c,e)=>{c.nodeValue=e},setElementText:(c,e)=>{c.textContent=e},parentNode:c=>c.parentNode,nextSibling:c=>c.nextSibling,querySelector:c=>E3.querySelector(c),setScopeId(c,e){c.setAttribute(e,"")},insertStaticContent(c,e,a,r,t,n){const s=a?a.previousSibling:e.lastChild;if(t&&(t===n||t.nextSibling))for(;e.insertBefore(t.cloneNode(!0),a),!(t===n||!(t=t.nextSibling)););else{ze.innerHTML=r?`<svg>${c}</svg>`:c;const i=ze.content;if(r){const o=i.firstChild;for(;o.firstChild;)i.appendChild(o.firstChild);i.removeChild(o)}e.insertBefore(i,a)}return[s?s.nextSibling:e.firstChild,a?a.previousSibling:e.lastChild]}};function Gz(c,e,a){const r=c._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?c.removeAttribute("class"):a?c.setAttribute("class",e):c.className=e}function Kz(c,e,a){const r=c.style,t=L1(a);if(a&&!t){if(e&&!L1(e))for(const n in e)a[n]==null&&X5(r,n,"");for(const n in a)X5(r,n,a[n])}else{const n=r.display;t?e!==a&&(r.cssText=a):e&&c.removeAttribute("style"),"_vod"in c&&(r.display=n)}}const He=/\s*!important$/;function X5(c,e,a){if(j(a))a.forEach(r=>X5(c,e,r));else if(a==null&&(a=""),e.startsWith("--"))c.setProperty(e,a);else{const r=Zz(c,e);He.test(a)?c.setProperty(t2(r),a.replace(He,""),"important"):c[r]=a}}const Ce=["Webkit","Moz","ms"],m5={};function Zz(c,e){const a=m5[e];if(a)return a;let r=$1(e);if(r!=="filter"&&r in c)return m5[e]=r;r=T6(r);for(let t=0;t<Ce.length;t++){const n=Ce[t]+r;if(n in c)return m5[e]=n}return e}const Ve="http://www.w3.org/1999/xlink";function Jz(c,e,a,r,t){if(r&&e.startsWith("xlink:"))a==null?c.removeAttributeNS(Ve,e.slice(6,e.length)):c.setAttributeNS(Ve,e,a);else{const n=Nd(e);a==null||n&&!mr(a)?c.removeAttribute(e):c.setAttribute(e,n?"":a)}}function Yz(c,e,a,r,t,n,s){if(e==="innerHTML"||e==="textContent"){r&&s(r,t,n),c[e]=a??"";return}const i=c.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){c._value=a;const l=i==="OPTION"?c.getAttribute("value"):c.value,f=a??"";l!==f&&(c.value=f),a==null&&c.removeAttribute(e);return}let o=!1;if(a===""||a==null){const l=typeof c[e];l==="boolean"?a=mr(a):a==null&&l==="string"?(a="",o=!0):l==="number"&&(a=0,o=!0)}try{c[e]=a}catch{}o&&c.removeAttribute(e)}function _2(c,e,a,r){c.addEventListener(e,a,r)}function Xz(c,e,a,r){c.removeEventListener(e,a,r)}function Qz(c,e,a,r,t=null){const n=c._vei||(c._vei={}),s=n[e];if(r&&s)s.value=r;else{const[i,o]=cH(e);if(r){const l=n[e]=rH(r,t);_2(c,i,l,o)}else s&&(Xz(c,i,s,o),n[e]=void 0)}}const Me=/(?:Once|Passive|Capture)$/;function cH(c){let e;if(Me.test(c)){e={};let r;for(;r=c.match(Me);)c=c.slice(0,c.length-r[0].length),e[r[0].toLowerCase()]=!0}return[c[2]===":"?c.slice(3):t2(c.slice(2)),e]}let v5=0;const eH=Promise.resolve(),aH=()=>v5||(eH.then(()=>v5=0),v5=Date.now());function rH(c,e){const a=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=a.attached)return;c2(tH(r,a.value),e,5,[r])};return a.value=c,a.attached=aH(),a}function tH(c,e){if(j(e)){const a=c.stopImmediatePropagation;return c.stopImmediatePropagation=()=>{a.call(c),c._stopped=!0},e.map(r=>t=>!t._stopped&&r&&r(t))}else return e}const ge=/^on[a-z]/,nH=(c,e,a,r,t=!1,n,s,i,o)=>{e==="class"?Gz(c,r,t):e==="style"?Kz(c,a,r):E6(e)?T7(e)||Qz(c,e,a,r,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):sH(c,e,r,t))?Yz(c,e,r,n,s,i,o):(e==="true-value"?c._trueValue=r:e==="false-value"&&(c._falseValue=r),Jz(c,e,r,t))};function sH(c,e,a,r){return r?!!(e==="innerHTML"||e==="textContent"||e in c&&ge.test(e)&&a1(a)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&c.tagName==="INPUT"||e==="type"&&c.tagName==="TEXTAREA"||ge.test(e)&&L1(a)?!1:e in c}function St(c,e){const a=P4(c);class r extends x0{constructor(n){super(a,n,e)}}return r.def=a,r}const iH=c=>St(c,Wt),oH=typeof HTMLElement<"u"?HTMLElement:class{};class x0 extends oH{constructor(e,a={},r){super(),this._def=e,this._props=a,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this.shadowRoot&&r?r(this._createVNode(),this.shadowRoot):(this.attachShadow({mode:"open"}),this._def.__asyncLoader||this._resolveProps(this._def))}connectedCallback(){this._connected=!0,this._instance||(this._resolved?this._update():this._resolveDef())}disconnectedCallback(){this._connected=!1,I6(()=>{this._connected||(e7(null,this.shadowRoot),this._instance=null)})}_resolveDef(){this._resolved=!0;for(let r=0;r<this.attributes.length;r++)this._setAttr(this.attributes[r].name);new MutationObserver(r=>{for(const t of r)this._setAttr(t.attributeName)}).observe(this,{attributes:!0});const e=(r,t=!1)=>{const{props:n,styles:s}=r;let i;if(n&&!j(n))for(const o in n){const l=n[o];(l===Number||l&&l.type===Number)&&(o in this._props&&(this._props[o]=U8(this._props[o])),(i||(i=Object.create(null)))[$1(o)]=!0)}this._numberProps=i,t&&this._resolveProps(r),this._applyStyles(s),this._update()},a=this._def.__asyncLoader;a?a().then(r=>e(r,!0)):e(this._def)}_resolveProps(e){const{props:a}=e,r=j(a)?a:Object.keys(a||{});for(const t of Object.keys(this))t[0]!=="_"&&r.includes(t)&&this._setProp(t,this[t],!0,!1);for(const t of r.map($1))Object.defineProperty(this,t,{get(){return this._getProp(t)},set(n){this._setProp(t,n)}})}_setAttr(e){let a=this.getAttribute(e);const r=$1(e);this._numberProps&&this._numberProps[r]&&(a=U8(a)),this._setProp(r,a,!1)}_getProp(e){return this._props[e]}_setProp(e,a,r=!0,t=!0){a!==this._props[e]&&(this._props[e]=a,t&&this._instance&&this._update(),r&&(a===!0?this.setAttribute(t2(e),""):typeof a=="string"||typeof a=="number"?this.setAttribute(t2(e),a+""):a||this.removeAttribute(t2(e))))}_update(){e7(this._createVNode(),this.shadowRoot)}_createVNode(){const e=e1(this._def,V1({},this._props));return this._instance||(e.ce=a=>{this._instance=a,a.isCE=!0;const r=(n,s)=>{this.dispatchEvent(new CustomEvent(n,{detail:s}))};a.emit=(n,...s)=>{r(n,s),t2(n)!==n&&r(t2(n),s)};let t=this;for(;t=t&&(t.parentNode||t.host);)if(t instanceof x0){a.parent=t._instance,a.provides=t._instance.provides;break}}),e}_applyStyles(e){e&&e.forEach(a=>{const r=document.createElement("style");r.textContent=a,this.shadowRoot.appendChild(r)})}}function lH(c="$style"){{const e=G2();if(!e)return d1;const a=e.type.__cssModules;if(!a)return d1;const r=a[c];return r||d1}}function fH(c){const e=G2();if(!e)return;const a=e.ut=(t=c(e.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${e.uid}"]`)).forEach(n=>c7(n,t))},r=()=>{const t=c(e.proxy);Q5(e.subTree,t),a(t)};Br(r),R4(()=>{const t=new MutationObserver(r);t.observe(e.subTree.el.parentNode,{childList:!0}),I4(()=>t.disconnect())})}function Q5(c,e){if(c.shapeFlag&128){const a=c.suspense;c=a.activeBranch,a.pendingBranch&&!a.isHydrating&&a.effects.push(()=>{Q5(a.activeBranch,e)})}for(;c.component;)c=c.component.subTree;if(c.shapeFlag&1&&c.el)c7(c.el,e);else if(c.type===E1)c.children.forEach(a=>Q5(a,e));else if(c.type===F3){let{el:a,anchor:r}=c;for(;a&&(c7(a,e),a!==r);)a=a.nextSibling}}function c7(c,e){if(c.nodeType===1){const a=c.style;for(const r in e)a.setProperty(`--${r}`,e[r])}}const X2="transition",q4="animation",y0=(c,{slots:e})=>F6(qr,At(c),e);y0.displayName="Transition";const wt={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},uH=y0.props=V1({},a9,wt),A3=(c,e=[])=>{j(c)?c.forEach(a=>a(...e)):c&&c(...e)},Le=c=>c?j(c)?c.some(e=>e.length>1):c.length>1:!1;function At(c){const e={};for(const F in c)F in wt||(e[F]=c[F]);if(c.css===!1)return e;const{name:a="v",type:r,duration:t,enterFromClass:n=`${a}-enter-from`,enterActiveClass:s=`${a}-enter-active`,enterToClass:i=`${a}-enter-to`,appearFromClass:o=n,appearActiveClass:l=s,appearToClass:f=i,leaveFromClass:u=`${a}-leave-from`,leaveActiveClass:h=`${a}-leave-active`,leaveToClass:p=`${a}-leave-to`}=c,H=hH(t),M=H&&H[0],x=H&&H[1],{onBeforeEnter:d,onEnter:m,onEnterCancelled:g,onLeave:C,onLeaveCancelled:b,onBeforeAppear:T=d,onAppear:E=m,onAppearCancelled:L=g}=e,A=(F,X,q)=>{r3(F,X?f:i),r3(F,X?l:s),q&&q()},I=(F,X)=>{F._isLeaving=!1,r3(F,u),r3(F,p),r3(F,h),X&&X()},$=F=>(X,q)=>{const H1=F?E:m,c1=()=>A(X,F,q);A3(H1,[X,c1]),be(()=>{r3(X,F?o:n),w2(X,F?f:i),Le(H1)||xe(X,r,M,c1)})};return V1(e,{onBeforeEnter(F){A3(d,[F]),w2(F,n),w2(F,s)},onBeforeAppear(F){A3(T,[F]),w2(F,o),w2(F,l)},onEnter:$(!1),onAppear:$(!0),onLeave(F,X){F._isLeaving=!0;const q=()=>I(F,X);w2(F,u),kt(),w2(F,h),be(()=>{F._isLeaving&&(r3(F,u),w2(F,p),Le(C)||xe(F,r,x,q))}),A3(C,[F,q])},onEnterCancelled(F){A(F,!1),A3(g,[F])},onAppearCancelled(F){A(F,!0),A3(L,[F])},onLeaveCancelled(F){I(F),A3(b,[F])}})}function hH(c){if(c==null)return null;if(p1(c))return[d5(c.enter),d5(c.leave)];{const e=d5(c);return[e,e]}}function d5(c){return U8(c)}function w2(c,e){e.split(/\s+/).forEach(a=>a&&c.classList.add(a)),(c._vtc||(c._vtc=new Set)).add(e)}function r3(c,e){e.split(/\s+/).forEach(r=>r&&c.classList.remove(r));const{_vtc:a}=c;a&&(a.delete(e),a.size||(c._vtc=void 0))}function be(c){requestAnimationFrame(()=>{requestAnimationFrame(c)})}let mH=0;function xe(c,e,a,r){const t=c._endId=++mH,n=()=>{t===c._endId&&r()};if(a)return setTimeout(n,a);const{type:s,timeout:i,propCount:o}=_t(c,e);if(!s)return r();const l=s+"end";let f=0;const u=()=>{c.removeEventListener(l,h),n()},h=p=>{p.target===c&&++f>=o&&u()};setTimeout(()=>{f<o&&u()},i+1),c.addEventListener(l,h)}function _t(c,e){const a=window.getComputedStyle(c),r=H=>(a[H]||"").split(", "),t=r(`${X2}Delay`),n=r(`${X2}Duration`),s=ye(t,n),i=r(`${q4}Delay`),o=r(`${q4}Duration`),l=ye(i,o);let f=null,u=0,h=0;e===X2?s>0&&(f=X2,u=s,h=n.length):e===q4?l>0&&(f=q4,u=l,h=o.length):(u=Math.max(s,l),f=u>0?s>l?X2:q4:null,h=f?f===X2?n.length:o.length:0);const p=f===X2&&/\b(transform|all)(,|$)/.test(r(`${X2}Property`).toString());return{type:f,timeout:u,propCount:h,hasTransform:p}}function ye(c,e){for(;c.length<e.length;)c=c.concat(c);return Math.max(...e.map((a,r)=>Ne(a)+Ne(c[r])))}function Ne(c){return Number(c.slice(0,-1).replace(",","."))*1e3}function kt(){return document.body.offsetHeight}const Et=new WeakMap,Tt=new WeakMap,Pt={name:"TransitionGroup",props:V1({},uH,{tag:String,moveClass:String}),setup(c,{slots:e}){const a=G2(),r=e9();let t,n;return M0(()=>{if(!t.length)return;const s=c.moveClass||`${c.name||"v"}-move`;if(!CH(t[0].el,a.vnode.el,s))return;t.forEach(pH),t.forEach(zH);const i=t.filter(HH);kt(),i.forEach(o=>{const l=o.el,f=l.style;w2(l,s),f.transform=f.webkitTransform=f.transitionDuration="";const u=l._moveCb=h=>{h&&h.target!==l||(!h||/transform$/.test(h.propertyName))&&(l.removeEventListener("transitionend",u),l._moveCb=null,r3(l,s))};l.addEventListener("transitionend",u)})}),()=>{const s=n1(c),i=At(s);let o=s.tag||E1;t=n,n=e.default?C0(e.default()):[];for(let l=0;l<n.length;l++){const f=n[l];f.key!=null&&U3(f,V4(f,i,r,a))}if(t)for(let l=0;l<t.length;l++){const f=t[l];U3(f,V4(f,i,r,a)),Et.set(f,f.el.getBoundingClientRect())}return e1(o,null,n)}}},vH=c=>delete c.mode;Pt.props;const dH=Pt;function pH(c){const e=c.el;e._moveCb&&e._moveCb(),e._enterCb&&e._enterCb()}function zH(c){Tt.set(c,c.el.getBoundingClientRect())}function HH(c){const e=Et.get(c),a=Tt.get(c),r=e.left-a.left,t=e.top-a.top;if(r||t){const n=c.el.style;return n.transform=n.webkitTransform=`translate(${r}px,${t}px)`,n.transitionDuration="0s",c}}function CH(c,e,a){const r=c.cloneNode();c._vtc&&c._vtc.forEach(s=>{s.split(/\s+/).forEach(i=>i&&r.classList.remove(i))}),a.split(/\s+/).forEach(s=>s&&r.classList.add(s)),r.style.display="none";const t=e.nodeType===1?e:e.parentNode;t.appendChild(r);const{hasTransform:n}=_t(r);return t.removeChild(r),n}const g3=c=>{const e=c.props["onUpdate:modelValue"]||!1;return j(e)?a=>f4(e,a):e};function VH(c){c.target.composing=!0}function Se(c){const e=c.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const K8={created(c,{modifiers:{lazy:e,trim:a,number:r}},t){c._assign=g3(t);const n=r||t.props&&t.props.type==="number";_2(c,e?"change":"input",s=>{if(s.target.composing)return;let i=c.value;a&&(i=i.trim()),n&&(i=B8(i)),c._assign(i)}),a&&_2(c,"change",()=>{c.value=c.value.trim()}),e||(_2(c,"compositionstart",VH),_2(c,"compositionend",Se),_2(c,"change",Se))},mounted(c,{value:e}){c.value=e??""},beforeUpdate(c,{value:e,modifiers:{lazy:a,trim:r,number:t}},n){if(c._assign=g3(n),c.composing||document.activeElement===c&&c.type!=="range"&&(a||r&&c.value.trim()===e||(t||c.type==="number")&&B8(c.value)===e))return;const s=e??"";c.value!==s&&(c.value=s)}},v9={deep:!0,created(c,e,a){c._assign=g3(a),_2(c,"change",()=>{const r=c._modelValue,t=g4(c),n=c.checked,s=c._assign;if(j(r)){const i=f0(r,t),o=i!==-1;if(n&&!o)s(r.concat(t));else if(!n&&o){const l=[...r];l.splice(i,1),s(l)}}else if(Z3(r)){const i=new Set(r);n?i.add(t):i.delete(t),s(i)}else s(It(c,n))})},mounted:we,beforeUpdate(c,e,a){c._assign=g3(a),we(c,e,a)}};function we(c,{value:e,oldValue:a},r){c._modelValue=e,j(e)?c.checked=f0(e,r.props.value)>-1:Z3(e)?c.checked=e.has(r.props.value):e!==a&&(c.checked=H3(e,It(c,!0)))}const d9={created(c,{value:e},a){c.checked=H3(e,a.props.value),c._assign=g3(a),_2(c,"change",()=>{c._assign(g4(c))})},beforeUpdate(c,{value:e,oldValue:a},r){c._assign=g3(r),e!==a&&(c.checked=H3(e,r.props.value))}},Rt={deep:!0,created(c,{value:e,modifiers:{number:a}},r){const t=Z3(e);_2(c,"change",()=>{const n=Array.prototype.filter.call(c.options,s=>s.selected).map(s=>a?B8(g4(s)):g4(s));c._assign(c.multiple?t?new Set(n):n:n[0])}),c._assign=g3(r)},mounted(c,{value:e}){Ae(c,e)},beforeUpdate(c,e,a){c._assign=g3(a)},updated(c,{value:e}){Ae(c,e)}};function Ae(c,e){const a=c.multiple;if(!(a&&!j(e)&&!Z3(e))){for(let r=0,t=c.options.length;r<t;r++){const n=c.options[r],s=g4(n);if(a)j(e)?n.selected=f0(e,s)>-1:n.selected=e.has(s);else if(H3(g4(n),e)){c.selectedIndex!==r&&(c.selectedIndex=r);return}}!a&&c.selectedIndex!==-1&&(c.selectedIndex=-1)}}function g4(c){return"_value"in c?c._value:c.value}function It(c,e){const a=e?"_trueValue":"_falseValue";return a in c?c[a]:e}const Dt={created(c,e,a){d8(c,e,a,null,"created")},mounted(c,e,a){d8(c,e,a,null,"mounted")},beforeUpdate(c,e,a,r){d8(c,e,a,r,"beforeUpdate")},updated(c,e,a,r){d8(c,e,a,r,"updated")}};function Ot(c,e){switch(c){case"SELECT":return Rt;case"TEXTAREA":return K8;default:switch(e){case"checkbox":return v9;case"radio":return d9;default:return K8}}}function d8(c,e,a,r,t){const s=Ot(c.tagName,a.props&&a.props.type)[t];s&&s(c,e,a,r)}function MH(){K8.getSSRProps=({value:c})=>({value:c}),d9.getSSRProps=({value:c},e)=>{if(e.props&&H3(e.props.value,c))return{checked:!0}},v9.getSSRProps=({value:c},e)=>{if(j(c)){if(e.props&&f0(c,e.props.value)>-1)return{checked:!0}}else if(Z3(c)){if(e.props&&c.has(e.props.value))return{checked:!0}}else if(c)return{checked:!0}},Dt.getSSRProps=(c,e)=>{if(typeof e.type!="string")return;const a=Ot(e.type.toUpperCase(),e.props&&e.props.type);if(a.getSSRProps)return a.getSSRProps(c,e)}}const gH=["ctrl","shift","alt","meta"],LH={stop:c=>c.stopPropagation(),prevent:c=>c.preventDefault(),self:c=>c.target!==c.currentTarget,ctrl:c=>!c.ctrlKey,shift:c=>!c.shiftKey,alt:c=>!c.altKey,meta:c=>!c.metaKey,left:c=>"button"in c&&c.button!==0,middle:c=>"button"in c&&c.button!==1,right:c=>"button"in c&&c.button!==2,exact:(c,e)=>gH.some(a=>c[`${a}Key`]&&!e.includes(a))},bH=(c,e)=>(a,...r)=>{for(let t=0;t<e.length;t++){const n=LH[e[t]];if(n&&n(a,e))return}return c(a,...r)},xH={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},yH=(c,e)=>a=>{if(!("key"in a))return;const r=t2(a.key);if(e.some(t=>t===r||xH[t]===r))return c(a)},Ft={beforeMount(c,{value:e},{transition:a}){c._vod=c.style.display==="none"?"":c.style.display,a&&e?a.beforeEnter(c):W4(c,e)},mounted(c,{value:e},{transition:a}){a&&e&&a.enter(c)},updated(c,{value:e,oldValue:a},{transition:r}){!e!=!a&&(r?e?(r.beforeEnter(c),W4(c,!0),r.enter(c)):r.leave(c,()=>{W4(c,!1)}):W4(c,e))},beforeUnmount(c,{value:e}){W4(c,e)}};function W4(c,e){c.style.display=e?c._vod:"none"}function NH(){Ft.getSSRProps=({value:c})=>{if(!c)return{style:{display:"none"}}}}const Bt=V1({patchProp:nH},$z);let n6,_e=!1;function Ut(){return n6||(n6=ft(Bt))}function qt(){return n6=_e?n6:ut(Bt),_e=!0,n6}const e7=(...c)=>{Ut().render(...c)},Wt=(...c)=>{qt().hydrate(...c)},jt=(...c)=>{const e=Ut().createApp(...c),{mount:a}=e;return e.mount=r=>{const t=$t(r);if(!t)return;const n=e._component;!a1(n)&&!n.render&&!n.template&&(n.template=t.innerHTML),t.innerHTML="";const s=a(t,!1,t instanceof SVGElement);return t instanceof Element&&(t.removeAttribute("v-cloak"),t.setAttribute("data-v-app","")),s},e},SH=(...c)=>{const e=qt().createApp(...c),{mount:a}=e;return e.mount=r=>{const t=$t(r);if(t)return a(t,!0,t instanceof SVGElement)},e};function $t(c){return L1(c)?document.querySelector(c):c}let ke=!1;const wH=()=>{ke||(ke=!0,MH(),NH())},AH=()=>{},_H=Object.freeze(Object.defineProperty({__proto__:null,BaseTransition:qr,BaseTransitionPropsValidators:a9,Comment:D1,EffectScope:D7,Fragment:E1,KeepAlive:qp,ReactiveEffect:P6,Static:F3,Suspense:Ap,Teleport:wz,Text:q3,Transition:y0,TransitionGroup:dH,VueElement:x0,assertNumber:Hp,callWithAsyncErrorHandling:c2,callWithErrorHandling:I2,camelize:$1,capitalize:T6,cloneVNode:b2,compatUtils:Wz,compile:AH,computed:S1,createApp:jt,createBlock:j3,createCommentVNode:K5,createElementBlock:F2,createElementVNode:s1,createHydrationRenderer:ut,createPropsRestProxy:fz,createRenderer:ft,createSSRApp:SH,createSlots:Kp,createStaticVNode:u9,createTextVNode:r2,createVNode:e1,customRef:up,defineAsyncComponent:Bp,defineComponent:P4,defineCustomElement:St,defineEmits:Qp,defineExpose:cz,defineModel:rz,defineOptions:ez,defineProps:Xp,defineSSRCustomElement:iH,defineSlots:az,get devtools(){return t4},effect:_d,effectScope:O7,getCurrentInstance:G2,getCurrentScope:F7,getTransitionRawChildren:C0,guardReactiveProps:zt,h:F6,handleError:J3,hasInjectionContext:tt,hydrate:Wt,initCustomFormatter:Oz,initDirectivesForSSR:wH,inject:G1,isMemoSame:yt,isProxy:j7,isReactive:R2,isReadonly:B3,isRef:b1,isRuntimeOnly:Rz,isShallow:m6,isVNode:V3,markRaw:R6,mergeDefaults:oz,mergeModels:lz,mergeProps:Ht,nextTick:I6,normalizeClass:X1,normalizeProps:xd,normalizeStyle:_4,onActivated:r9,onBeforeMount:$r,onBeforeUnmount:g0,onBeforeUpdate:Gr,onDeactivated:t9,onErrorCaptured:Yr,onMounted:R4,onRenderTracked:Jr,onRenderTriggered:Zr,onScopeDispose:zr,onServerPrefetch:Kr,onUnmounted:I4,onUpdated:M0,openBlock:O1,popScopeId:X7,provide:a6,proxyRefs:K7,pushScopeId:Y7,queuePostFlushCb:J7,reactive:T4,readonly:W7,ref:x1,registerRuntimeCompiler:Pz,render:e7,renderList:Qr,renderSlot:Zp,resolveComponent:s9,resolveDirective:Gp,resolveDynamicComponent:$p,resolveFilter:qz,resolveTransitionHooks:V4,setBlockTracking:G5,setDevtoolsHook:Ir,setTransitionHooks:U3,shallowReactive:q7,shallowReadonly:np,shallowRef:Ar,ssrContextKey:bt,ssrUtils:Uz,stop:kd,toDisplayString:vr,toHandlerKey:c6,toHandlers:Jp,toRaw:n1,toRef:vp,toRefs:kr,toValue:op,transformVNodeArgs:Az,triggerRef:ip,unref:N1,useAttrs:sz,useCssModule:lH,useCssVars:fH,useModel:iz,useSSRContext:xt,useSlots:nz,useTransitionState:e9,vModelCheckbox:v9,vModelDynamic:Dt,vModelRadio:d9,vModelSelect:Rt,vModelText:K8,vShow:Ft,version:Nt,warn:zp,watch:g2,watchEffect:Rp,watchPostEffect:Br,watchSyncEffect:Ip,withAsyncContext:uz,withCtx:Y1,withDefaults:tz,withDirectives:Op,withKeys:yH,withMemo:Fz,withModifiers:bH,withScopeId:bp},Symbol.toStringTag,{value:"Module"}));var kH=!1;/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */let Gt;const N0=c=>Gt=c,Kt=Symbol();function a7(c){return c&&typeof c=="object"&&Object.prototype.toString.call(c)==="[object Object]"&&typeof c.toJSON!="function"}var s6;(function(c){c.direct="direct",c.patchObject="patch object",c.patchFunction="patch function"})(s6||(s6={}));function EH(){const c=O7(!0),e=c.run(()=>x1({}));let a=[],r=[];const t=R6({install(n){N0(t),t._a=n,n.provide(Kt,t),n.config.globalProperties.$pinia=t,r.forEach(s=>a.push(s)),r=[]},use(n){return!this._a&&!kH?r.push(n):a.push(n),this},_p:a,_a:null,_e:c,_s:new Map,state:e});return t}const Zt=()=>{};function Ee(c,e,a,r=Zt){c.push(e);const t=()=>{const n=c.indexOf(e);n>-1&&(c.splice(n,1),r())};return!a&&F7()&&zr(t),t}function r4(c,...e){c.slice().forEach(a=>{a(...e)})}const TH=c=>c();function r7(c,e){c instanceof Map&&e instanceof Map&&e.forEach((a,r)=>c.set(r,a)),c instanceof Set&&e instanceof Set&&e.forEach(c.add,c);for(const a in e){if(!e.hasOwnProperty(a))continue;const r=e[a],t=c[a];a7(t)&&a7(r)&&c.hasOwnProperty(a)&&!b1(r)&&!R2(r)?c[a]=r7(t,r):c[a]=r}return c}const PH=Symbol();function RH(c){return!a7(c)||!c.hasOwnProperty(PH)}const{assign:t3}=Object;function IH(c){return!!(b1(c)&&c.effect)}function DH(c,e,a,r){const{state:t,actions:n,getters:s}=e,i=a.state.value[c];let o;function l(){i||(a.state.value[c]=t?t():{});const f=kr(a.state.value[c]);return t3(f,n,Object.keys(s||{}).reduce((u,h)=>(u[h]=R6(S1(()=>{N0(a);const p=a._s.get(c);return s[h].call(p,p)})),u),{}))}return o=Jt(c,l,e,a,r,!0),o}function Jt(c,e,a={},r,t,n){let s;const i=t3({actions:{}},a),o={deep:!0};let l,f,u=[],h=[],p;const H=r.state.value[c];!n&&!H&&(r.state.value[c]={}),x1({});let M;function x(L){let A;l=f=!1,typeof L=="function"?(L(r.state.value[c]),A={type:s6.patchFunction,storeId:c,events:p}):(r7(r.state.value[c],L),A={type:s6.patchObject,payload:L,storeId:c,events:p});const I=M=Symbol();I6().then(()=>{M===I&&(l=!0)}),f=!0,r4(u,A,r.state.value[c])}const d=n?function(){const{state:A}=a,I=A?A():{};this.$patch($=>{t3($,I)})}:Zt;function m(){s.stop(),u=[],h=[],r._s.delete(c)}function g(L,A){return function(){N0(r);const I=Array.from(arguments),$=[],F=[];function X(c1){$.push(c1)}function q(c1){F.push(c1)}r4(h,{args:I,name:L,store:b,after:X,onError:q});let H1;try{H1=A.apply(this&&this.$id===c?this:b,I)}catch(c1){throw r4(F,c1),c1}return H1 instanceof Promise?H1.then(c1=>(r4($,c1),c1)).catch(c1=>(r4(F,c1),Promise.reject(c1))):(r4($,H1),H1)}}const C={_p:r,$id:c,$onAction:Ee.bind(null,h),$patch:x,$reset:d,$subscribe(L,A={}){const I=Ee(u,L,A.detached,()=>$()),$=s.run(()=>g2(()=>r.state.value[c],F=>{(A.flush==="sync"?f:l)&&L({storeId:c,type:s6.direct,events:p},F)},t3({},o,A)));return I},$dispose:m},b=T4(C);r._s.set(c,b);const T=r._a&&r._a.runWithContext||TH,E=r._e.run(()=>(s=O7(),T(()=>s.run(e))));for(const L in E){const A=E[L];if(b1(A)&&!IH(A)||R2(A))n||(H&&RH(A)&&(b1(A)?A.value=H[L]:r7(A,H[L])),r.state.value[c][L]=A);else if(typeof A=="function"){const I=g(L,A);E[L]=I,i.actions[L]=A}}return t3(b,E),t3(n1(b),E),Object.defineProperty(b,"$state",{get:()=>r.state.value[c],set:L=>{x(A=>{t3(A,L)})}}),r._p.forEach(L=>{t3(b,s.run(()=>L({store:b,app:r._a,pinia:r,options:i})))}),H&&n&&a.hydrate&&a.hydrate(b.$state,H),l=!0,f=!0,b}function Yt(c,e,a){let r,t;const n=typeof e=="function";typeof c=="string"?(r=c,t=n?a:e):(t=c,r=c.id);function s(i,o){const l=tt();return i=i||(l?G1(Kt,null):null),i&&N0(i),i=Gt,i._s.has(r)||(n?Jt(r,e,t,i):DH(r,t,i)),i._s.get(r)}return s.$id=r,s}var L3=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function nc1(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}function OH(c){if(c.__esModule)return c;var e=c.default;if(typeof e=="function"){var a=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};a.prototype=e.prototype}else a={};return Object.defineProperty(a,"__esModule",{value:!0}),Object.keys(c).forEach(function(r){var t=Object.getOwnPropertyDescriptor(c,r);Object.defineProperty(a,r,t.get?t:{enumerable:!0,get:function(){return c[r]}})}),a}var M6={},Xt={},L4={},B6={},FH=L3&&L3.__awaiter||function(c,e,a,r){function t(n){return n instanceof a?n:new a(function(s){s(n)})}return new(a||(a=Promise))(function(n,s){function i(f){try{l(r.next(f))}catch(u){s(u)}}function o(f){try{l(r.throw(f))}catch(u){s(u)}}function l(f){f.done?n(f.value):t(f.value).then(i,o)}l((r=r.apply(c,e||[])).next())})},BH=L3&&L3.__generator||function(c,e){var a={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},r,t,n,s;return s={next:i(0),throw:i(1),return:i(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function i(l){return function(f){return o([l,f])}}function o(l){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,t&&(n=l[0]&2?t.return:l[0]?t.throw||((n=t.return)&&n.call(t),0):t.next)&&!(n=n.call(t,l[1])).done)return n;switch(t=0,n&&(l=[l[0]&2,n.value]),l[0]){case 0:case 1:n=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,t=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(n=a.trys,!(n=n.length>0&&n[n.length-1])&&(l[0]===6||l[0]===2)){a=0;continue}if(l[0]===3&&(!n||l[1]>n[0]&&l[1]<n[3])){a.label=l[1];break}if(l[0]===6&&a.label<n[1]){a.label=n[1],n=l;break}if(n&&a.label<n[2]){a.label=n[2],a.ops.push(l);break}n[2]&&a.ops.pop(),a.trys.pop();continue}l=e.call(c,a)}catch(f){l=[6,f],t=0}finally{r=n=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}};Object.defineProperty(B6,"__esModule",{value:!0});B6.ReCaptchaInstance=void 0;var UH=function(){function c(e,a,r){this.siteKey=e,this.recaptchaID=a,this.recaptcha=r,this.styleContainer=null}return c.prototype.execute=function(e){return FH(this,void 0,void 0,function(){return BH(this,function(a){return[2,this.recaptcha.enterprise?this.recaptcha.enterprise.execute(this.recaptchaID,{action:e}):this.recaptcha.execute(this.recaptchaID,{action:e})]})})},c.prototype.getSiteKey=function(){return this.siteKey},c.prototype.hideBadge=function(){this.styleContainer===null&&(this.styleContainer=document.createElement("style"),this.styleContainer.innerHTML=".grecaptcha-badge{visibility:hidden !important;}",document.head.appendChild(this.styleContainer))},c.prototype.showBadge=function(){this.styleContainer!==null&&(document.head.removeChild(this.styleContainer),this.styleContainer=null)},c}();B6.ReCaptchaInstance=UH;Object.defineProperty(L4,"__esModule",{value:!0});L4.getInstance=L4.load=void 0;var qH=B6,s3;(function(c){c[c.NOT_LOADED=0]="NOT_LOADED",c[c.LOADING=1]="LOADING",c[c.LOADED=2]="LOADED"})(s3||(s3={}));var Qt=function(){function c(){}return c.load=function(e,a){if(a===void 0&&(a={}),typeof document>"u")return Promise.reject(new Error("This is a library for the browser!"));if(c.getLoadingState()===s3.LOADED)return c.instance.getSiteKey()===e?Promise.resolve(c.instance):Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));if(c.getLoadingState()===s3.LOADING)return e!==c.instanceSiteKey?Promise.reject(new Error("reCAPTCHA already loaded with different site key!")):new Promise(function(t,n){c.successfulLoadingConsumers.push(function(s){return t(s)}),c.errorLoadingRunnable.push(function(s){return n(s)})});c.instanceSiteKey=e,c.setLoadingState(s3.LOADING);var r=new c;return new Promise(function(t,n){r.loadScript(e,a.useRecaptchaNet||!1,a.useEnterprise||!1,a.renderParameters?a.renderParameters:{},a.customUrl).then(function(){c.setLoadingState(s3.LOADED);var s=r.doExplicitRender(grecaptcha,e,a.explicitRenderParameters?a.explicitRenderParameters:{},a.useEnterprise||!1),i=new qH.ReCaptchaInstance(e,s,grecaptcha);c.successfulLoadingConsumers.forEach(function(o){return o(i)}),c.successfulLoadingConsumers=[],a.autoHideBadge&&i.hideBadge(),c.instance=i,t(i)}).catch(function(s){c.errorLoadingRunnable.forEach(function(i){return i(s)}),c.errorLoadingRunnable=[],n(s)})})},c.getInstance=function(){return c.instance},c.setLoadingState=function(e){c.loadingState=e},c.getLoadingState=function(){return c.loadingState===null?s3.NOT_LOADED:c.loadingState},c.prototype.loadScript=function(e,a,r,t,n){var s=this;a===void 0&&(a=!1),r===void 0&&(r=!1),t===void 0&&(t={}),n===void 0&&(n="");var i=document.createElement("script");i.setAttribute("recaptcha-v3-script","");var o="https://www.google.com/recaptcha/api.js";a&&(r?o="https://recaptcha.net/recaptcha/enterprise.js":o="https://recaptcha.net/recaptcha/api.js"),r&&(o="https://www.google.com/recaptcha/enterprise.js"),n&&(o=n),t.render&&(t.render=void 0);var l=this.buildQueryString(t);return i.src=o+"?render=explicit"+l,new Promise(function(f,u){i.addEventListener("load",s.waitForScriptToLoad(function(){f(i)},r),!1),i.onerror=function(h){c.setLoadingState(s3.NOT_LOADED),u(h)},document.head.appendChild(i)})},c.prototype.buildQueryString=function(e){var a=Object.keys(e);return a.length<1?"":"&"+Object.keys(e).filter(function(r){return!!e[r]}).map(function(r){return r+"="+e[r]}).join("&")},c.prototype.waitForScriptToLoad=function(e,a){var r=this;return function(){window.grecaptcha===void 0?setTimeout(function(){r.waitForScriptToLoad(e,a)},c.SCRIPT_LOAD_DELAY):a?window.grecaptcha.enterprise.ready(function(){e()}):window.grecaptcha.ready(function(){e()})}},c.prototype.doExplicitRender=function(e,a,r,t){var n={sitekey:a,badge:r.badge,size:r.size,tabindex:r.tabindex};return r.container?t?e.enterprise.render(r.container,n):e.render(r.container,n):t?e.enterprise.render(n):e.render(n)},c.loadingState=null,c.instance=null,c.instanceSiteKey=null,c.successfulLoadingConsumers=[],c.errorLoadingRunnable=[],c.SCRIPT_LOAD_DELAY=25,c}();L4.load=Qt.load;L4.getInstance=Qt.getInstance;(function(c){Object.defineProperty(c,"__esModule",{value:!0}),c.ReCaptchaInstance=c.getInstance=c.load=void 0;var e=L4;Object.defineProperty(c,"load",{enumerable:!0,get:function(){return e.load}}),Object.defineProperty(c,"getInstance",{enumerable:!0,get:function(){return e.getInstance}});var a=B6;Object.defineProperty(c,"ReCaptchaInstance",{enumerable:!0,get:function(){return a.ReCaptchaInstance}})})(Xt);const WH=OH(_H);var cn=L3&&L3.__awaiter||function(c,e,a,r){function t(n){return n instanceof a?n:new a(function(s){s(n)})}return new(a||(a=Promise))(function(n,s){function i(f){try{l(r.next(f))}catch(u){s(u)}}function o(f){try{l(r.throw(f))}catch(u){s(u)}}function l(f){f.done?n(f.value):t(f.value).then(i,o)}l((r=r.apply(c,e||[])).next())})},en=L3&&L3.__generator||function(c,e){var a={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},r,t,n,s;return s={next:i(0),throw:i(1),return:i(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function i(l){return function(f){return o([l,f])}}function o(l){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,t&&(n=l[0]&2?t.return:l[0]?t.throw||((n=t.return)&&n.call(t),0):t.next)&&!(n=n.call(t,l[1])).done)return n;switch(t=0,n&&(l=[l[0]&2,n.value]),l[0]){case 0:case 1:n=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,t=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(n=a.trys,!(n=n.length>0&&n[n.length-1])&&(l[0]===6||l[0]===2)){a=0;continue}if(l[0]===3&&(!n||l[1]>n[0]&&l[1]<n[3])){a.label=l[1];break}if(l[0]===6&&a.label<n[1]){a.label=n[1],n=l;break}if(n&&a.label<n[2]){a.label=n[2],a.ops.push(l);break}n[2]&&a.ops.pop(),a.trys.pop();continue}l=e.call(c,a)}catch(f){l=[6,f],t=0}finally{r=n=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}};Object.defineProperty(M6,"__esModule",{value:!0});var jH=M6.useReCaptcha=rn=M6.VueReCaptcha=void 0,$H=Xt,t7=WH,an=Symbol("VueReCaptchaInjectKey"),m4={loadedWaiters:[],error:null},rn=M6.VueReCaptcha={install:function(c,e){var a=t7.ref(!1),r=t7.ref(void 0);c.config.globalProperties.$recaptchaLoaded=Te(a),KH(e).then(function(t){a.value=!0,r.value=t,c.config.globalProperties.$recaptcha=Pe(r),c.config.globalProperties.$recaptchaInstance=r,m4.loadedWaiters.forEach(function(n){return n.resolve(!0)})}).catch(function(t){m4.error=t,m4.loadedWaiters.forEach(function(n){return n.reject(t)})}),c.provide(an,{instance:r,isLoaded:a,executeRecaptcha:Pe(r),recaptchaLoaded:Te(a)})}};function GH(){return t7.inject(an)}jH=M6.useReCaptcha=GH;function KH(c){return cn(this,void 0,void 0,function(){return en(this,function(e){switch(e.label){case 0:return[4,$H.load(c.siteKey,c.loaderOptions)];case 1:return[2,e.sent()]}})})}function Te(c){return function(){return new Promise(function(e,a){if(m4.error!==null)return a(m4.error);if(c.value)return e(!0);m4.loadedWaiters.push({resolve:e,reject:a})})}}function Pe(c){var e=this;return function(a){return cn(e,void 0,void 0,function(){var r;return en(this,function(t){switch(t.label){case 0:return[4,(r=c.value)===null||r===void 0?void 0:r.execute(a)];case 1:return[2,t.sent()]}})})}}/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const n4=typeof window<"u";function ZH(c){return c.__esModule||c[Symbol.toStringTag]==="Module"}const m1=Object.assign;function p5(c,e){const a={};for(const r in e){const t=e[r];a[r]=v2(t)?t.map(c):c(t)}return a}const i6=()=>{},v2=Array.isArray,JH=/\/$/,YH=c=>c.replace(JH,"");function z5(c,e,a="/"){let r,t={},n="",s="";const i=e.indexOf("#");let o=e.indexOf("?");return i<o&&i>=0&&(o=-1),o>-1&&(r=e.slice(0,o),n=e.slice(o+1,i>-1?i:e.length),t=c(n)),i>-1&&(r=r||e.slice(0,i),s=e.slice(i,e.length)),r=eC(r??e,a),{fullPath:r+(n&&"?")+n+s,path:r,query:t,hash:s}}function XH(c,e){const a=e.query?c(e.query):"";return e.path+(a&&"?")+a+(e.hash||"")}function Re(c,e){return!e||!c.toLowerCase().startsWith(e.toLowerCase())?c:c.slice(e.length)||"/"}function QH(c,e,a){const r=e.matched.length-1,t=a.matched.length-1;return r>-1&&r===t&&b4(e.matched[r],a.matched[t])&&tn(e.params,a.params)&&c(e.query)===c(a.query)&&e.hash===a.hash}function b4(c,e){return(c.aliasOf||c)===(e.aliasOf||e)}function tn(c,e){if(Object.keys(c).length!==Object.keys(e).length)return!1;for(const a in c)if(!cC(c[a],e[a]))return!1;return!0}function cC(c,e){return v2(c)?Ie(c,e):v2(e)?Ie(e,c):c===e}function Ie(c,e){return v2(e)?c.length===e.length&&c.every((a,r)=>a===e[r]):c.length===1&&c[0]===e}function eC(c,e){if(c.startsWith("/"))return c;if(!c)return e;const a=e.split("/"),r=c.split("/"),t=r[r.length-1];(t===".."||t===".")&&r.push("");let n=a.length-1,s,i;for(s=0;s<r.length;s++)if(i=r[s],i!==".")if(i==="..")n>1&&n--;else break;return a.slice(0,n).join("/")+"/"+r.slice(s-(s===r.length?1:0)).join("/")}var g6;(function(c){c.pop="pop",c.push="push"})(g6||(g6={}));var o6;(function(c){c.back="back",c.forward="forward",c.unknown=""})(o6||(o6={}));function aC(c){if(!c)if(n4){const e=document.querySelector("base");c=e&&e.getAttribute("href")||"/",c=c.replace(/^\w+:\/\/[^\/]+/,"")}else c="/";return c[0]!=="/"&&c[0]!=="#"&&(c="/"+c),YH(c)}const rC=/^[^#]+#/;function tC(c,e){return c.replace(rC,"#")+e}function nC(c,e){const a=document.documentElement.getBoundingClientRect(),r=c.getBoundingClientRect();return{behavior:e.behavior,left:r.left-a.left-(e.left||0),top:r.top-a.top-(e.top||0)}}const S0=()=>({left:window.pageXOffset,top:window.pageYOffset});function sC(c){let e;if("el"in c){const a=c.el,r=typeof a=="string"&&a.startsWith("#"),t=typeof a=="string"?r?document.getElementById(a.slice(1)):document.querySelector(a):a;if(!t)return;e=nC(t,c)}else e=c;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function De(c,e){return(history.state?history.state.position-e:-1)+c}const n7=new Map;function iC(c,e){n7.set(c,e)}function oC(c){const e=n7.get(c);return n7.delete(c),e}let lC=()=>location.protocol+"//"+location.host;function nn(c,e){const{pathname:a,search:r,hash:t}=e,n=c.indexOf("#");if(n>-1){let i=t.includes(c.slice(n))?c.slice(n).length:1,o=t.slice(i);return o[0]!=="/"&&(o="/"+o),Re(o,"")}return Re(a,c)+r+t}function fC(c,e,a,r){let t=[],n=[],s=null;const i=({state:h})=>{const p=nn(c,location),H=a.value,M=e.value;let x=0;if(h){if(a.value=p,e.value=h,s&&s===H){s=null;return}x=M?h.position-M.position:0}else r(p);t.forEach(d=>{d(a.value,H,{delta:x,type:g6.pop,direction:x?x>0?o6.forward:o6.back:o6.unknown})})};function o(){s=a.value}function l(h){t.push(h);const p=()=>{const H=t.indexOf(h);H>-1&&t.splice(H,1)};return n.push(p),p}function f(){const{history:h}=window;h.state&&h.replaceState(m1({},h.state,{scroll:S0()}),"")}function u(){for(const h of n)h();n=[],window.removeEventListener("popstate",i),window.removeEventListener("beforeunload",f)}return window.addEventListener("popstate",i),window.addEventListener("beforeunload",f,{passive:!0}),{pauseListeners:o,listen:l,destroy:u}}function Oe(c,e,a,r=!1,t=!1){return{back:c,current:e,forward:a,replaced:r,position:window.history.length,scroll:t?S0():null}}function uC(c){const{history:e,location:a}=window,r={value:nn(c,a)},t={value:e.state};t.value||n(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function n(o,l,f){const u=c.indexOf("#"),h=u>-1?(a.host&&document.querySelector("base")?c:c.slice(u))+o:lC()+c+o;try{e[f?"replaceState":"pushState"](l,"",h),t.value=l}catch(p){console.error(p),a[f?"replace":"assign"](h)}}function s(o,l){const f=m1({},e.state,Oe(t.value.back,o,t.value.forward,!0),l,{position:t.value.position});n(o,f,!0),r.value=o}function i(o,l){const f=m1({},t.value,e.state,{forward:o,scroll:S0()});n(f.current,f,!0);const u=m1({},Oe(r.value,o,null),{position:f.position+1},l);n(o,u,!1),r.value=o}return{location:r,state:t,push:i,replace:s}}function hC(c){c=aC(c);const e=uC(c),a=fC(c,e.state,e.location,e.replace);function r(n,s=!0){s||a.pauseListeners(),history.go(n)}const t=m1({location:"",base:c,go:r,createHref:tC.bind(null,c)},e,a);return Object.defineProperty(t,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(t,"state",{enumerable:!0,get:()=>e.state.value}),t}function mC(c){return typeof c=="string"||c&&typeof c=="object"}function sn(c){return typeof c=="string"||typeof c=="symbol"}const Q2={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},on=Symbol("");var Fe;(function(c){c[c.aborted=4]="aborted",c[c.cancelled=8]="cancelled",c[c.duplicated=16]="duplicated"})(Fe||(Fe={}));function x4(c,e){return m1(new Error,{type:c,[on]:!0},e)}function S2(c,e){return c instanceof Error&&on in c&&(e==null||!!(c.type&e))}const Be="[^/]+?",vC={sensitive:!1,strict:!1,start:!0,end:!0},dC=/[.+*?^${}()[\]/\\]/g;function pC(c,e){const a=m1({},vC,e),r=[];let t=a.start?"^":"";const n=[];for(const l of c){const f=l.length?[]:[90];a.strict&&!l.length&&(t+="/");for(let u=0;u<l.length;u++){const h=l[u];let p=40+(a.sensitive?.25:0);if(h.type===0)u||(t+="/"),t+=h.value.replace(dC,"\\$&"),p+=40;else if(h.type===1){const{value:H,repeatable:M,optional:x,regexp:d}=h;n.push({name:H,repeatable:M,optional:x});const m=d||Be;if(m!==Be){p+=10;try{new RegExp(`(${m})`)}catch(C){throw new Error(`Invalid custom RegExp for param "${H}" (${m}): `+C.message)}}let g=M?`((?:${m})(?:/(?:${m}))*)`:`(${m})`;u||(g=x&&l.length<2?`(?:/${g})`:"/"+g),x&&(g+="?"),t+=g,p+=20,x&&(p+=-8),M&&(p+=-20),m===".*"&&(p+=-50)}f.push(p)}r.push(f)}if(a.strict&&a.end){const l=r.length-1;r[l][r[l].length-1]+=.7000000000000001}a.strict||(t+="/?"),a.end?t+="$":a.strict&&(t+="(?:/|$)");const s=new RegExp(t,a.sensitive?"":"i");function i(l){const f=l.match(s),u={};if(!f)return null;for(let h=1;h<f.length;h++){const p=f[h]||"",H=n[h-1];u[H.name]=p&&H.repeatable?p.split("/"):p}return u}function o(l){let f="",u=!1;for(const h of c){(!u||!f.endsWith("/"))&&(f+="/"),u=!1;for(const p of h)if(p.type===0)f+=p.value;else if(p.type===1){const{value:H,repeatable:M,optional:x}=p,d=H in l?l[H]:"";if(v2(d)&&!M)throw new Error(`Provided param "${H}" is an array but it is not repeatable (* or + modifiers)`);const m=v2(d)?d.join("/"):d;if(!m)if(x)h.length<2&&(f.endsWith("/")?f=f.slice(0,-1):u=!0);else throw new Error(`Missing required param "${H}"`);f+=m}}return f||"/"}return{re:s,score:r,keys:n,parse:i,stringify:o}}function zC(c,e){let a=0;for(;a<c.length&&a<e.length;){const r=e[a]-c[a];if(r)return r;a++}return c.length<e.length?c.length===1&&c[0]===40+40?-1:1:c.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function HC(c,e){let a=0;const r=c.score,t=e.score;for(;a<r.length&&a<t.length;){const n=zC(r[a],t[a]);if(n)return n;a++}if(Math.abs(t.length-r.length)===1){if(Ue(r))return 1;if(Ue(t))return-1}return t.length-r.length}function Ue(c){const e=c[c.length-1];return c.length>0&&e[e.length-1]<0}const CC={type:0,value:""},VC=/[a-zA-Z0-9_]/;function MC(c){if(!c)return[[]];if(c==="/")return[[CC]];if(!c.startsWith("/"))throw new Error(`Invalid path "${c}"`);function e(p){throw new Error(`ERR (${a})/"${l}": ${p}`)}let a=0,r=a;const t=[];let n;function s(){n&&t.push(n),n=[]}let i=0,o,l="",f="";function u(){l&&(a===0?n.push({type:0,value:l}):a===1||a===2||a===3?(n.length>1&&(o==="*"||o==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),n.push({type:1,value:l,regexp:f,repeatable:o==="*"||o==="+",optional:o==="*"||o==="?"})):e("Invalid state to consume buffer"),l="")}function h(){l+=o}for(;i<c.length;){if(o=c[i++],o==="\\"&&a!==2){r=a,a=4;continue}switch(a){case 0:o==="/"?(l&&u(),s()):o===":"?(u(),a=1):h();break;case 4:h(),a=r;break;case 1:o==="("?a=2:VC.test(o)?h():(u(),a=0,o!=="*"&&o!=="?"&&o!=="+"&&i--);break;case 2:o===")"?f[f.length-1]=="\\"?f=f.slice(0,-1)+o:a=3:f+=o;break;case 3:u(),a=0,o!=="*"&&o!=="?"&&o!=="+"&&i--,f="";break;default:e("Unknown state");break}}return a===2&&e(`Unfinished custom RegExp for param "${l}"`),u(),s(),t}function gC(c,e,a){const r=pC(MC(c.path),a),t=m1(r,{record:c,parent:e,children:[],alias:[]});return e&&!t.record.aliasOf==!e.record.aliasOf&&e.children.push(t),t}function LC(c,e){const a=[],r=new Map;e=je({strict:!1,end:!0,sensitive:!1},e);function t(f){return r.get(f)}function n(f,u,h){const p=!h,H=bC(f);H.aliasOf=h&&h.record;const M=je(e,f),x=[H];if("alias"in f){const g=typeof f.alias=="string"?[f.alias]:f.alias;for(const C of g)x.push(m1({},H,{components:h?h.record.components:H.components,path:C,aliasOf:h?h.record:H}))}let d,m;for(const g of x){const{path:C}=g;if(u&&C[0]!=="/"){const b=u.record.path,T=b[b.length-1]==="/"?"":"/";g.path=u.record.path+(C&&T+C)}if(d=gC(g,u,M),h?h.alias.push(d):(m=m||d,m!==d&&m.alias.push(d),p&&f.name&&!We(d)&&s(f.name)),H.children){const b=H.children;for(let T=0;T<b.length;T++)n(b[T],d,h&&h.children[T])}h=h||d,(d.record.components&&Object.keys(d.record.components).length||d.record.name||d.record.redirect)&&o(d)}return m?()=>{s(m)}:i6}function s(f){if(sn(f)){const u=r.get(f);u&&(r.delete(f),a.splice(a.indexOf(u),1),u.children.forEach(s),u.alias.forEach(s))}else{const u=a.indexOf(f);u>-1&&(a.splice(u,1),f.record.name&&r.delete(f.record.name),f.children.forEach(s),f.alias.forEach(s))}}function i(){return a}function o(f){let u=0;for(;u<a.length&&HC(f,a[u])>=0&&(f.record.path!==a[u].record.path||!ln(f,a[u]));)u++;a.splice(u,0,f),f.record.name&&!We(f)&&r.set(f.record.name,f)}function l(f,u){let h,p={},H,M;if("name"in f&&f.name){if(h=r.get(f.name),!h)throw x4(1,{location:f});M=h.record.name,p=m1(qe(u.params,h.keys.filter(m=>!m.optional).map(m=>m.name)),f.params&&qe(f.params,h.keys.map(m=>m.name))),H=h.stringify(p)}else if("path"in f)H=f.path,h=a.find(m=>m.re.test(H)),h&&(p=h.parse(H),M=h.record.name);else{if(h=u.name?r.get(u.name):a.find(m=>m.re.test(u.path)),!h)throw x4(1,{location:f,currentLocation:u});M=h.record.name,p=m1({},u.params,f.params),H=h.stringify(p)}const x=[];let d=h;for(;d;)x.unshift(d.record),d=d.parent;return{name:M,path:H,params:p,matched:x,meta:yC(x)}}return c.forEach(f=>n(f)),{addRoute:n,resolve:l,removeRoute:s,getRoutes:i,getRecordMatcher:t}}function qe(c,e){const a={};for(const r of e)r in c&&(a[r]=c[r]);return a}function bC(c){return{path:c.path,redirect:c.redirect,name:c.name,meta:c.meta||{},aliasOf:void 0,beforeEnter:c.beforeEnter,props:xC(c),children:c.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in c?c.components||null:c.component&&{default:c.component}}}function xC(c){const e={},a=c.props||!1;if("component"in c)e.default=a;else for(const r in c.components)e[r]=typeof a=="object"?a[r]:a;return e}function We(c){for(;c;){if(c.record.aliasOf)return!0;c=c.parent}return!1}function yC(c){return c.reduce((e,a)=>m1(e,a.meta),{})}function je(c,e){const a={};for(const r in c)a[r]=r in e?e[r]:c[r];return a}function ln(c,e){return e.children.some(a=>a===c||ln(c,a))}const fn=/#/g,NC=/&/g,SC=/\//g,wC=/=/g,AC=/\?/g,un=/\+/g,_C=/%5B/g,kC=/%5D/g,hn=/%5E/g,EC=/%60/g,mn=/%7B/g,TC=/%7C/g,vn=/%7D/g,PC=/%20/g;function p9(c){return encodeURI(""+c).replace(TC,"|").replace(_C,"[").replace(kC,"]")}function RC(c){return p9(c).replace(mn,"{").replace(vn,"}").replace(hn,"^")}function s7(c){return p9(c).replace(un,"%2B").replace(PC,"+").replace(fn,"%23").replace(NC,"%26").replace(EC,"`").replace(mn,"{").replace(vn,"}").replace(hn,"^")}function IC(c){return s7(c).replace(wC,"%3D")}function DC(c){return p9(c).replace(fn,"%23").replace(AC,"%3F")}function OC(c){return c==null?"":DC(c).replace(SC,"%2F")}function Z8(c){try{return decodeURIComponent(""+c)}catch{}return""+c}function FC(c){const e={};if(c===""||c==="?")return e;const r=(c[0]==="?"?c.slice(1):c).split("&");for(let t=0;t<r.length;++t){const n=r[t].replace(un," "),s=n.indexOf("="),i=Z8(s<0?n:n.slice(0,s)),o=s<0?null:Z8(n.slice(s+1));if(i in e){let l=e[i];v2(l)||(l=e[i]=[l]),l.push(o)}else e[i]=o}return e}function $e(c){let e="";for(let a in c){const r=c[a];if(a=IC(a),r==null){r!==void 0&&(e+=(e.length?"&":"")+a);continue}(v2(r)?r.map(n=>n&&s7(n)):[r&&s7(r)]).forEach(n=>{n!==void 0&&(e+=(e.length?"&":"")+a,n!=null&&(e+="="+n))})}return e}function BC(c){const e={};for(const a in c){const r=c[a];r!==void 0&&(e[a]=v2(r)?r.map(t=>t==null?null:""+t):r==null?r:""+r)}return e}const dn=Symbol(""),Ge=Symbol(""),w0=Symbol(""),z9=Symbol(""),i7=Symbol("");function j4(){let c=[];function e(r){return c.push(r),()=>{const t=c.indexOf(r);t>-1&&c.splice(t,1)}}function a(){c=[]}return{add:e,list:()=>c.slice(),reset:a}}function UC(c,e,a){const r=()=>{c[e].delete(a)};I4(r),t9(r),r9(()=>{c[e].add(a)}),c[e].add(a)}function sc1(c){const e=G1(dn,{}).value;e&&UC(e,"leaveGuards",c)}function i3(c,e,a,r,t){const n=r&&(r.enterCallbacks[t]=r.enterCallbacks[t]||[]);return()=>new Promise((s,i)=>{const o=u=>{u===!1?i(x4(4,{from:a,to:e})):u instanceof Error?i(u):mC(u)?i(x4(2,{from:e,to:u})):(n&&r.enterCallbacks[t]===n&&typeof u=="function"&&n.push(u),s())},l=c.call(r&&r.instances[t],e,a,o);let f=Promise.resolve(l);c.length<3&&(f=f.then(o)),f.catch(u=>i(u))})}function H5(c,e,a,r){const t=[];for(const n of c)for(const s in n.components){let i=n.components[s];if(!(e!=="beforeRouteEnter"&&!n.instances[s]))if(qC(i)){const l=(i.__vccOpts||i)[e];l&&t.push(i3(l,a,r,n,s))}else{let o=i();t.push(()=>o.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${n.path}"`));const f=ZH(l)?l.default:l;n.components[s]=f;const h=(f.__vccOpts||f)[e];return h&&i3(h,a,r,n,s)()}))}}return t}function qC(c){return typeof c=="object"||"displayName"in c||"props"in c||"__vccOpts"in c}function Ke(c){const e=G1(w0),a=G1(z9),r=S1(()=>e.resolve(N1(c.to))),t=S1(()=>{const{matched:o}=r.value,{length:l}=o,f=o[l-1],u=a.matched;if(!f||!u.length)return-1;const h=u.findIndex(b4.bind(null,f));if(h>-1)return h;const p=Ze(o[l-2]);return l>1&&Ze(f)===p&&u[u.length-1].path!==p?u.findIndex(b4.bind(null,o[l-2])):h}),n=S1(()=>t.value>-1&&$C(a.params,r.value.params)),s=S1(()=>t.value>-1&&t.value===a.matched.length-1&&tn(a.params,r.value.params));function i(o={}){return jC(o)?e[N1(c.replace)?"replace":"push"](N1(c.to)).catch(i6):Promise.resolve()}return{route:r,href:S1(()=>r.value.href),isActive:n,isExactActive:s,navigate:i}}const WC=P4({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ke,setup(c,{slots:e}){const a=T4(Ke(c)),{options:r}=G1(w0),t=S1(()=>({[Je(c.activeClass,r.linkActiveClass,"router-link-active")]:a.isActive,[Je(c.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:a.isExactActive}));return()=>{const n=e.default&&e.default(a);return c.custom?n:F6("a",{"aria-current":a.isExactActive?c.ariaCurrentValue:null,href:a.href,onClick:a.navigate,class:t.value},n)}}}),z2=WC;function jC(c){if(!(c.metaKey||c.altKey||c.ctrlKey||c.shiftKey)&&!c.defaultPrevented&&!(c.button!==void 0&&c.button!==0)){if(c.currentTarget&&c.currentTarget.getAttribute){const e=c.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return c.preventDefault&&c.preventDefault(),!0}}function $C(c,e){for(const a in e){const r=e[a],t=c[a];if(typeof r=="string"){if(r!==t)return!1}else if(!v2(t)||t.length!==r.length||r.some((n,s)=>n!==t[s]))return!1}return!0}function Ze(c){return c?c.aliasOf?c.aliasOf.path:c.path:""}const Je=(c,e,a)=>c??e??a,GC=P4({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(c,{attrs:e,slots:a}){const r=G1(i7),t=S1(()=>c.route||r.value),n=G1(Ge,0),s=S1(()=>{let l=N1(n);const{matched:f}=t.value;let u;for(;(u=f[l])&&!u.components;)l++;return l}),i=S1(()=>t.value.matched[s.value]);a6(Ge,S1(()=>s.value+1)),a6(dn,i),a6(i7,t);const o=x1();return g2(()=>[o.value,i.value,c.name],([l,f,u],[h,p,H])=>{f&&(f.instances[u]=l,p&&p!==f&&l&&l===h&&(f.leaveGuards.size||(f.leaveGuards=p.leaveGuards),f.updateGuards.size||(f.updateGuards=p.updateGuards))),l&&f&&(!p||!b4(f,p)||!h)&&(f.enterCallbacks[u]||[]).forEach(M=>M(l))},{flush:"post"}),()=>{const l=t.value,f=c.name,u=i.value,h=u&&u.components[f];if(!h)return Ye(a.default,{Component:h,route:l});const p=u.props[f],H=p?p===!0?l.params:typeof p=="function"?p(l):p:null,x=F6(h,m1({},H,e,{onVnodeUnmounted:d=>{d.component.isUnmounted&&(u.instances[f]=null)},ref:o}));return Ye(a.default,{Component:x,route:l})||x}}});function Ye(c,e){if(!c)return null;const a=c(e);return a.length===1?a[0]:a}const H9=GC;function KC(c){const e=LC(c.routes,c),a=c.parseQuery||FC,r=c.stringifyQuery||$e,t=c.history,n=j4(),s=j4(),i=j4(),o=Ar(Q2);let l=Q2;n4&&c.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const f=p5.bind(null,S=>""+S),u=p5.bind(null,OC),h=p5.bind(null,Z8);function p(S,W){let O,Z;return sn(S)?(O=e.getRecordMatcher(S),Z=W):Z=S,e.addRoute(Z,O)}function H(S){const W=e.getRecordMatcher(S);W&&e.removeRoute(W)}function M(){return e.getRoutes().map(S=>S.record)}function x(S){return!!e.getRecordMatcher(S)}function d(S,W){if(W=m1({},W||o.value),typeof S=="string"){const V=z5(a,S,W.path),y=e.resolve({path:V.path},W),w=t.createHref(V.fullPath);return m1(V,y,{params:h(y.params),hash:Z8(V.hash),redirectedFrom:void 0,href:w})}let O;if("path"in S)O=m1({},S,{path:z5(a,S.path,W.path).path});else{const V=m1({},S.params);for(const y in V)V[y]==null&&delete V[y];O=m1({},S,{params:u(V)}),W.params=u(W.params)}const Z=e.resolve(O,W),h1=S.hash||"";Z.params=f(h(Z.params));const v=XH(r,m1({},S,{hash:RC(h1),path:Z.path})),z=t.createHref(v);return m1({fullPath:v,hash:h1,query:r===$e?BC(S.query):S.query||{}},Z,{redirectedFrom:void 0,href:z})}function m(S){return typeof S=="string"?z5(a,S,o.value.path):m1({},S)}function g(S,W){if(l!==S)return x4(8,{from:W,to:S})}function C(S){return E(S)}function b(S){return C(m1(m(S),{replace:!0}))}function T(S){const W=S.matched[S.matched.length-1];if(W&&W.redirect){const{redirect:O}=W;let Z=typeof O=="function"?O(S):O;return typeof Z=="string"&&(Z=Z.includes("?")||Z.includes("#")?Z=m(Z):{path:Z},Z.params={}),m1({query:S.query,hash:S.hash,params:"path"in Z?{}:S.params},Z)}}function E(S,W){const O=l=d(S),Z=o.value,h1=S.state,v=S.force,z=S.replace===!0,V=T(O);if(V)return E(m1(m(V),{state:typeof V=="object"?m1({},h1,V.state):h1,force:v,replace:z}),W||O);const y=O;y.redirectedFrom=W;let w;return!v&&QH(r,Z,O)&&(w=x4(16,{to:y,from:Z}),d2(Z,Z,!0,!1)),(w?Promise.resolve(w):I(y,Z)).catch(_=>S2(_)?S2(_,2)?_:Z2(_):u1(_,y,Z)).then(_=>{if(_){if(S2(_,2))return E(m1({replace:z},m(_.to),{state:typeof _.to=="object"?m1({},h1,_.to.state):h1,force:v}),W||y)}else _=F(y,Z,!0,z,h1);return $(y,Z,_),_})}function L(S,W){const O=g(S,W);return O?Promise.reject(O):Promise.resolve()}function A(S){const W=c4.values().next().value;return W&&typeof W.runWithContext=="function"?W.runWithContext(S):S()}function I(S,W){let O;const[Z,h1,v]=ZC(S,W);O=H5(Z.reverse(),"beforeRouteLeave",S,W);for(const V of Z)V.leaveGuards.forEach(y=>{O.push(i3(y,S,W))});const z=L.bind(null,S,W);return O.push(z),R1(O).then(()=>{O=[];for(const V of n.list())O.push(i3(V,S,W));return O.push(z),R1(O)}).then(()=>{O=H5(h1,"beforeRouteUpdate",S,W);for(const V of h1)V.updateGuards.forEach(y=>{O.push(i3(y,S,W))});return O.push(z),R1(O)}).then(()=>{O=[];for(const V of v)if(V.beforeEnter)if(v2(V.beforeEnter))for(const y of V.beforeEnter)O.push(i3(y,S,W));else O.push(i3(V.beforeEnter,S,W));return O.push(z),R1(O)}).then(()=>(S.matched.forEach(V=>V.enterCallbacks={}),O=H5(v,"beforeRouteEnter",S,W),O.push(z),R1(O))).then(()=>{O=[];for(const V of s.list())O.push(i3(V,S,W));return O.push(z),R1(O)}).catch(V=>S2(V,8)?V:Promise.reject(V))}function $(S,W,O){i.list().forEach(Z=>A(()=>Z(S,W,O)))}function F(S,W,O,Z,h1){const v=g(S,W);if(v)return v;const z=W===Q2,V=n4?history.state:{};O&&(Z||z?t.replace(S.fullPath,m1({scroll:z&&V&&V.scroll},h1)):t.push(S.fullPath,h1)),o.value=S,d2(S,W,O,z),Z2()}let X;function q(){X||(X=t.listen((S,W,O)=>{if(!t8.listening)return;const Z=d(S),h1=T(Z);if(h1){E(m1(h1,{replace:!0}),Z).catch(i6);return}l=Z;const v=o.value;n4&&iC(De(v.fullPath,O.delta),S0()),I(Z,v).catch(z=>S2(z,12)?z:S2(z,2)?(E(z.to,Z).then(V=>{S2(V,20)&&!O.delta&&O.type===g6.pop&&t.go(-1,!1)}).catch(i6),Promise.reject()):(O.delta&&t.go(-O.delta,!1),u1(z,Z,v))).then(z=>{z=z||F(Z,v,!1),z&&(O.delta&&!S2(z,8)?t.go(-O.delta,!1):O.type===g6.pop&&S2(z,20)&&t.go(-1,!1)),$(Z,v,z)}).catch(i6)}))}let H1=j4(),c1=j4(),f1;function u1(S,W,O){Z2(S);const Z=c1.list();return Z.length?Z.forEach(h1=>h1(S,W,O)):console.error(S),Promise.reject(S)}function N2(){return f1&&o.value!==Q2?Promise.resolve():new Promise((S,W)=>{H1.add([S,W])})}function Z2(S){return f1||(f1=!S,q(),H1.list().forEach(([W,O])=>S?O(S):W()),H1.reset()),S}function d2(S,W,O,Z){const{scrollBehavior:h1}=c;if(!n4||!h1)return Promise.resolve();const v=!O&&oC(De(S.fullPath,0))||(Z||!O)&&history.state&&history.state.scroll||null;return I6().then(()=>h1(S,W,v)).then(z=>z&&sC(z)).catch(z=>u1(z,S,W))}const U1=S=>t.go(S);let Q3;const c4=new Set,t8={currentRoute:o,listening:!0,addRoute:p,removeRoute:H,hasRoute:x,getRoutes:M,resolve:d,options:c,push:C,replace:b,go:U1,back:()=>U1(-1),forward:()=>U1(1),beforeEach:n.add,beforeResolve:s.add,afterEach:i.add,onError:c1.add,isReady:N2,install(S){const W=this;S.component("RouterLink",z2),S.component("RouterView",H9),S.config.globalProperties.$router=W,Object.defineProperty(S.config.globalProperties,"$route",{enumerable:!0,get:()=>N1(o)}),n4&&!Q3&&o.value===Q2&&(Q3=!0,C(t.location).catch(h1=>{}));const O={};for(const h1 in Q2)Object.defineProperty(O,h1,{get:()=>o.value[h1],enumerable:!0});S.provide(w0,W),S.provide(z9,q7(O)),S.provide(i7,o);const Z=S.unmount;c4.add(S),S.unmount=function(){c4.delete(S),c4.size<1&&(l=Q2,X&&X(),X=null,o.value=Q2,Q3=!1,f1=!1),Z()}}};function R1(S){return S.reduce((W,O)=>W.then(()=>A(O)),Promise.resolve())}return t8}function ZC(c,e){const a=[],r=[],t=[],n=Math.max(e.matched.length,c.matched.length);for(let s=0;s<n;s++){const i=e.matched[s];i&&(c.matched.find(l=>b4(l,i))?r.push(i):a.push(i));const o=c.matched[s];o&&(e.matched.find(l=>b4(l,o))||t.push(o))}return[a,r,t]}function pn(){return G1(w0)}function JC(){return G1(z9)}const p8=x1([]);function YC(){const c=(r,t={})=>{const n=Date.now(),s={id:n,message:r,type:t.type||"info",duration:t.duration||3e3,dismissible:t.dismissible!==void 0?t.dismissible:!0};return p8.value.push(s),n},e=r=>{const t=p8.value.findIndex(n=>n.id===r);t!==-1&&p8.value.splice(t,1)},a=S1(()=>p8.value);return{addToast:c,removeToast:e,visibleToasts:a}}const A0=(c,e)=>{const a=c.__vccOpts||c;for(const[r,t]of e)a[r]=t;return a},XC={class:"toast__content"},QC={__name:"Toast",props:{message:{type:String,required:!0},type:{type:String,default:"info",validator:c=>["info","success","warning","error"].includes(c)},duration:{type:Number,default:3e3},dismissible:{type:Boolean,default:!0}},emits:["dismiss"],setup(c,{emit:e}){const a=c,r=x1(!0);let t=null;const n=()=>{r.value=!1,e("dismiss")};return R4(()=>{a.duration>0&&(t=setTimeout(n,a.duration))}),I4(()=>{t&&clearTimeout(t)}),(s,i)=>(O1(),j3(y0,{name:"fade"},{default:Y1(()=>[r.value?(O1(),F2("div",{key:0,class:X1(["toast",`toast--${c.type}`])},[s1("div",XC,vr(c.message),1),c.dismissible?(O1(),F2("button",{key:0,onClick:n,class:"toast__close"},"×")):K5("",!0)],2)):K5("",!0)]),_:1}))}},cV=A0(QC,[["__scopeId","data-v-8223592e"]]);const eV={class:"toast-container"},aV={__name:"ToastContainer",setup(c){const{visibleToasts:e,removeToast:a}=YC();return(r,t)=>(O1(),F2("div",eV,[(O1(!0),F2(E1,null,Qr(N1(e),n=>(O1(),j3(cV,{key:n.id,message:n.message,type:n.type,duration:n.duration,dismissible:n.dismissible,onDismiss:s=>N1(a)(n.id)},null,8,["message","type","duration","dismissible","onDismiss"]))),128))]))}},rV=A0(aV,[["__scopeId","data-v-4ed778dc"]]);const tV={__name:"App",setup(c){return(e,a)=>(O1(),F2("main",null,[e1(N1(H9)),e1(rV)]))}},nV="modulepreload",sV=function(c){return"/"+c},Xe={},i1=function(e,a,r){if(!a||a.length===0)return e();const t=document.getElementsByTagName("link");return Promise.all(a.map(n=>{if(n=sV(n),n in Xe)return;Xe[n]=!0;const s=n.endsWith(".css"),i=s?'[rel="stylesheet"]':"";if(!!r)for(let f=t.length-1;f>=0;f--){const u=t[f];if(u.href===n&&(!s||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${i}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":nV,s||(l.as="script",l.crossOrigin=""),l.href=n,document.head.appendChild(l),s)return new Promise((f,u)=>{l.addEventListener("load",f),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>e()).catch(n=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=n,window.dispatchEvent(s),!s.defaultPrevented)throw n})},zn="/icons/sara.png";function Hn(c,e){return function(){return c.apply(e,arguments)}}const{toString:iV}=Object.prototype,{getPrototypeOf:C9}=Object,_0=(c=>e=>{const a=iV.call(e);return c[a]||(c[a]=a.slice(8,-1).toLowerCase())})(Object.create(null)),x2=c=>(c=c.toLowerCase(),e=>_0(e)===c),k0=c=>e=>typeof e===c,{isArray:D4}=Array,L6=k0("undefined");function oV(c){return c!==null&&!L6(c)&&c.constructor!==null&&!L6(c.constructor)&&n2(c.constructor.isBuffer)&&c.constructor.isBuffer(c)}const Cn=x2("ArrayBuffer");function lV(c){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(c):e=c&&c.buffer&&Cn(c.buffer),e}const fV=k0("string"),n2=k0("function"),Vn=k0("number"),E0=c=>c!==null&&typeof c=="object",uV=c=>c===!0||c===!1,w8=c=>{if(_0(c)!=="object")return!1;const e=C9(c);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in c)&&!(Symbol.iterator in c)},hV=x2("Date"),mV=x2("File"),vV=x2("Blob"),dV=x2("FileList"),pV=c=>E0(c)&&n2(c.pipe),zV=c=>{let e;return c&&(typeof FormData=="function"&&c instanceof FormData||n2(c.append)&&((e=_0(c))==="formdata"||e==="object"&&n2(c.toString)&&c.toString()==="[object FormData]"))},HV=x2("URLSearchParams"),CV=c=>c.trim?c.trim():c.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function U6(c,e,{allOwnKeys:a=!1}={}){if(c===null||typeof c>"u")return;let r,t;if(typeof c!="object"&&(c=[c]),D4(c))for(r=0,t=c.length;r<t;r++)e.call(null,c[r],r,c);else{const n=a?Object.getOwnPropertyNames(c):Object.keys(c),s=n.length;let i;for(r=0;r<s;r++)i=n[r],e.call(null,c[i],i,c)}}function Mn(c,e){e=e.toLowerCase();const a=Object.keys(c);let r=a.length,t;for(;r-- >0;)if(t=a[r],e===t.toLowerCase())return t;return null}const gn=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Ln=c=>!L6(c)&&c!==gn;function o7(){const{caseless:c}=Ln(this)&&this||{},e={},a=(r,t)=>{const n=c&&Mn(e,t)||t;w8(e[n])&&w8(r)?e[n]=o7(e[n],r):w8(r)?e[n]=o7({},r):D4(r)?e[n]=r.slice():e[n]=r};for(let r=0,t=arguments.length;r<t;r++)arguments[r]&&U6(arguments[r],a);return e}const VV=(c,e,a,{allOwnKeys:r}={})=>(U6(e,(t,n)=>{a&&n2(t)?c[n]=Hn(t,a):c[n]=t},{allOwnKeys:r}),c),MV=c=>(c.charCodeAt(0)===65279&&(c=c.slice(1)),c),gV=(c,e,a,r)=>{c.prototype=Object.create(e.prototype,r),c.prototype.constructor=c,Object.defineProperty(c,"super",{value:e.prototype}),a&&Object.assign(c.prototype,a)},LV=(c,e,a,r)=>{let t,n,s;const i={};if(e=e||{},c==null)return e;do{for(t=Object.getOwnPropertyNames(c),n=t.length;n-- >0;)s=t[n],(!r||r(s,c,e))&&!i[s]&&(e[s]=c[s],i[s]=!0);c=a!==!1&&C9(c)}while(c&&(!a||a(c,e))&&c!==Object.prototype);return e},bV=(c,e,a)=>{c=String(c),(a===void 0||a>c.length)&&(a=c.length),a-=e.length;const r=c.indexOf(e,a);return r!==-1&&r===a},xV=c=>{if(!c)return null;if(D4(c))return c;let e=c.length;if(!Vn(e))return null;const a=new Array(e);for(;e-- >0;)a[e]=c[e];return a},yV=(c=>e=>c&&e instanceof c)(typeof Uint8Array<"u"&&C9(Uint8Array)),NV=(c,e)=>{const r=(c&&c[Symbol.iterator]).call(c);let t;for(;(t=r.next())&&!t.done;){const n=t.value;e.call(c,n[0],n[1])}},SV=(c,e)=>{let a;const r=[];for(;(a=c.exec(e))!==null;)r.push(a);return r},wV=x2("HTMLFormElement"),AV=c=>c.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(a,r,t){return r.toUpperCase()+t}),Qe=(({hasOwnProperty:c})=>(e,a)=>c.call(e,a))(Object.prototype),_V=x2("RegExp"),bn=(c,e)=>{const a=Object.getOwnPropertyDescriptors(c),r={};U6(a,(t,n)=>{let s;(s=e(t,n,c))!==!1&&(r[n]=s||t)}),Object.defineProperties(c,r)},kV=c=>{bn(c,(e,a)=>{if(n2(c)&&["arguments","caller","callee"].indexOf(a)!==-1)return!1;const r=c[a];if(n2(r)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+a+"'")})}})},EV=(c,e)=>{const a={},r=t=>{t.forEach(n=>{a[n]=!0})};return D4(c)?r(c):r(String(c).split(e)),a},TV=()=>{},PV=(c,e)=>(c=+c,Number.isFinite(c)?c:e),C5="abcdefghijklmnopqrstuvwxyz",ca="0123456789",xn={DIGIT:ca,ALPHA:C5,ALPHA_DIGIT:C5+C5.toUpperCase()+ca},RV=(c=16,e=xn.ALPHA_DIGIT)=>{let a="";const{length:r}=e;for(;c--;)a+=e[Math.random()*r|0];return a};function IV(c){return!!(c&&n2(c.append)&&c[Symbol.toStringTag]==="FormData"&&c[Symbol.iterator])}const DV=c=>{const e=new Array(10),a=(r,t)=>{if(E0(r)){if(e.indexOf(r)>=0)return;if(!("toJSON"in r)){e[t]=r;const n=D4(r)?[]:{};return U6(r,(s,i)=>{const o=a(s,t+1);!L6(o)&&(n[i]=o)}),e[t]=void 0,n}}return r};return a(c,0)},OV=x2("AsyncFunction"),FV=c=>c&&(E0(c)||n2(c))&&n2(c.then)&&n2(c.catch),N={isArray:D4,isArrayBuffer:Cn,isBuffer:oV,isFormData:zV,isArrayBufferView:lV,isString:fV,isNumber:Vn,isBoolean:uV,isObject:E0,isPlainObject:w8,isUndefined:L6,isDate:hV,isFile:mV,isBlob:vV,isRegExp:_V,isFunction:n2,isStream:pV,isURLSearchParams:HV,isTypedArray:yV,isFileList:dV,forEach:U6,merge:o7,extend:VV,trim:CV,stripBOM:MV,inherits:gV,toFlatObject:LV,kindOf:_0,kindOfTest:x2,endsWith:bV,toArray:xV,forEachEntry:NV,matchAll:SV,isHTMLForm:wV,hasOwnProperty:Qe,hasOwnProp:Qe,reduceDescriptors:bn,freezeMethods:kV,toObjectSet:EV,toCamelCase:AV,noop:TV,toFiniteNumber:PV,findKey:Mn,global:gn,isContextDefined:Ln,ALPHABET:xn,generateString:RV,isSpecCompliantForm:IV,toJSONObject:DV,isAsyncFn:OV,isThenable:FV};function l1(c,e,a,r,t){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=c,this.name="AxiosError",e&&(this.code=e),a&&(this.config=a),r&&(this.request=r),t&&(this.response=t)}N.inherits(l1,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:N.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const yn=l1.prototype,Nn={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(c=>{Nn[c]={value:c}});Object.defineProperties(l1,Nn);Object.defineProperty(yn,"isAxiosError",{value:!0});l1.from=(c,e,a,r,t,n)=>{const s=Object.create(yn);return N.toFlatObject(c,s,function(o){return o!==Error.prototype},i=>i!=="isAxiosError"),l1.call(s,c.message,e,a,r,t),s.cause=c,s.name=c.name,n&&Object.assign(s,n),s};const BV=null;function l7(c){return N.isPlainObject(c)||N.isArray(c)}function Sn(c){return N.endsWith(c,"[]")?c.slice(0,-2):c}function ea(c,e,a){return c?c.concat(e).map(function(t,n){return t=Sn(t),!a&&n?"["+t+"]":t}).join(a?".":""):e}function UV(c){return N.isArray(c)&&!c.some(l7)}const qV=N.toFlatObject(N,{},null,function(e){return/^is[A-Z]/.test(e)});function T0(c,e,a){if(!N.isObject(c))throw new TypeError("target must be an object");e=e||new FormData,a=N.toFlatObject(a,{metaTokens:!0,dots:!1,indexes:!1},!1,function(M,x){return!N.isUndefined(x[M])});const r=a.metaTokens,t=a.visitor||f,n=a.dots,s=a.indexes,o=(a.Blob||typeof Blob<"u"&&Blob)&&N.isSpecCompliantForm(e);if(!N.isFunction(t))throw new TypeError("visitor must be a function");function l(H){if(H===null)return"";if(N.isDate(H))return H.toISOString();if(!o&&N.isBlob(H))throw new l1("Blob is not supported. Use a Buffer instead.");return N.isArrayBuffer(H)||N.isTypedArray(H)?o&&typeof Blob=="function"?new Blob([H]):Buffer.from(H):H}function f(H,M,x){let d=H;if(H&&!x&&typeof H=="object"){if(N.endsWith(M,"{}"))M=r?M:M.slice(0,-2),H=JSON.stringify(H);else if(N.isArray(H)&&UV(H)||(N.isFileList(H)||N.endsWith(M,"[]"))&&(d=N.toArray(H)))return M=Sn(M),d.forEach(function(g,C){!(N.isUndefined(g)||g===null)&&e.append(s===!0?ea([M],C,n):s===null?M:M+"[]",l(g))}),!1}return l7(H)?!0:(e.append(ea(x,M,n),l(H)),!1)}const u=[],h=Object.assign(qV,{defaultVisitor:f,convertValue:l,isVisitable:l7});function p(H,M){if(!N.isUndefined(H)){if(u.indexOf(H)!==-1)throw Error("Circular reference detected in "+M.join("."));u.push(H),N.forEach(H,function(d,m){(!(N.isUndefined(d)||d===null)&&t.call(e,d,N.isString(m)?m.trim():m,M,h))===!0&&p(d,M?M.concat(m):[m])}),u.pop()}}if(!N.isObject(c))throw new TypeError("data must be an object");return p(c),e}function aa(c){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(c).replace(/[!'()~]|%20|%00/g,function(r){return e[r]})}function V9(c,e){this._pairs=[],c&&T0(c,this,e)}const wn=V9.prototype;wn.append=function(e,a){this._pairs.push([e,a])};wn.toString=function(e){const a=e?function(r){return e.call(this,r,aa)}:aa;return this._pairs.map(function(t){return a(t[0])+"="+a(t[1])},"").join("&")};function WV(c){return encodeURIComponent(c).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function An(c,e,a){if(!e)return c;const r=a&&a.encode||WV,t=a&&a.serialize;let n;if(t?n=t(e,a):n=N.isURLSearchParams(e)?e.toString():new V9(e,a).toString(r),n){const s=c.indexOf("#");s!==-1&&(c=c.slice(0,s)),c+=(c.indexOf("?")===-1?"?":"&")+n}return c}class jV{constructor(){this.handlers=[]}use(e,a,r){return this.handlers.push({fulfilled:e,rejected:a,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){N.forEach(this.handlers,function(r){r!==null&&e(r)})}}const ra=jV,_n={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},$V=typeof URLSearchParams<"u"?URLSearchParams:V9,GV=typeof FormData<"u"?FormData:null,KV=typeof Blob<"u"?Blob:null,ZV=(()=>{let c;return typeof navigator<"u"&&((c=navigator.product)==="ReactNative"||c==="NativeScript"||c==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),JV=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),f2={isBrowser:!0,classes:{URLSearchParams:$V,FormData:GV,Blob:KV},isStandardBrowserEnv:ZV,isStandardBrowserWebWorkerEnv:JV,protocols:["http","https","file","blob","url","data"]};function YV(c,e){return T0(c,new f2.classes.URLSearchParams,Object.assign({visitor:function(a,r,t,n){return f2.isNode&&N.isBuffer(a)?(this.append(r,a.toString("base64")),!1):n.defaultVisitor.apply(this,arguments)}},e))}function XV(c){return N.matchAll(/\w+|\[(\w*)]/g,c).map(e=>e[0]==="[]"?"":e[1]||e[0])}function QV(c){const e={},a=Object.keys(c);let r;const t=a.length;let n;for(r=0;r<t;r++)n=a[r],e[n]=c[n];return e}function kn(c){function e(a,r,t,n){let s=a[n++];const i=Number.isFinite(+s),o=n>=a.length;return s=!s&&N.isArray(t)?t.length:s,o?(N.hasOwnProp(t,s)?t[s]=[t[s],r]:t[s]=r,!i):((!t[s]||!N.isObject(t[s]))&&(t[s]=[]),e(a,r,t[s],n)&&N.isArray(t[s])&&(t[s]=QV(t[s])),!i)}if(N.isFormData(c)&&N.isFunction(c.entries)){const a={};return N.forEachEntry(c,(r,t)=>{e(XV(r),t,a,0)}),a}return null}function cM(c,e,a){if(N.isString(c))try{return(e||JSON.parse)(c),N.trim(c)}catch(r){if(r.name!=="SyntaxError")throw r}return(a||JSON.stringify)(c)}const M9={transitional:_n,adapter:f2.isNode?"http":"xhr",transformRequest:[function(e,a){const r=a.getContentType()||"",t=r.indexOf("application/json")>-1,n=N.isObject(e);if(n&&N.isHTMLForm(e)&&(e=new FormData(e)),N.isFormData(e))return t&&t?JSON.stringify(kn(e)):e;if(N.isArrayBuffer(e)||N.isBuffer(e)||N.isStream(e)||N.isFile(e)||N.isBlob(e))return e;if(N.isArrayBufferView(e))return e.buffer;if(N.isURLSearchParams(e))return a.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let i;if(n){if(r.indexOf("application/x-www-form-urlencoded")>-1)return YV(e,this.formSerializer).toString();if((i=N.isFileList(e))||r.indexOf("multipart/form-data")>-1){const o=this.env&&this.env.FormData;return T0(i?{"files[]":e}:e,o&&new o,this.formSerializer)}}return n||t?(a.setContentType("application/json",!1),cM(e)):e}],transformResponse:[function(e){const a=this.transitional||M9.transitional,r=a&&a.forcedJSONParsing,t=this.responseType==="json";if(e&&N.isString(e)&&(r&&!this.responseType||t)){const s=!(a&&a.silentJSONParsing)&&t;try{return JSON.parse(e)}catch(i){if(s)throw i.name==="SyntaxError"?l1.from(i,l1.ERR_BAD_RESPONSE,this,null,this.response):i}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:f2.classes.FormData,Blob:f2.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};N.forEach(["delete","get","head","post","put","patch"],c=>{M9.headers[c]={}});const g9=M9,eM=N.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),aM=c=>{const e={};let a,r,t;return c&&c.split(`
`).forEach(function(s){t=s.indexOf(":"),a=s.substring(0,t).trim().toLowerCase(),r=s.substring(t+1).trim(),!(!a||e[a]&&eM[a])&&(a==="set-cookie"?e[a]?e[a].push(r):e[a]=[r]:e[a]=e[a]?e[a]+", "+r:r)}),e},ta=Symbol("internals");function $4(c){return c&&String(c).trim().toLowerCase()}function A8(c){return c===!1||c==null?c:N.isArray(c)?c.map(A8):String(c)}function rM(c){const e=Object.create(null),a=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=a.exec(c);)e[r[1]]=r[2];return e}const tM=c=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(c.trim());function V5(c,e,a,r,t){if(N.isFunction(r))return r.call(this,e,a);if(t&&(e=a),!!N.isString(e)){if(N.isString(r))return e.indexOf(r)!==-1;if(N.isRegExp(r))return r.test(e)}}function nM(c){return c.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,a,r)=>a.toUpperCase()+r)}function sM(c,e){const a=N.toCamelCase(" "+e);["get","set","has"].forEach(r=>{Object.defineProperty(c,r+a,{value:function(t,n,s){return this[r].call(this,e,t,n,s)},configurable:!0})})}class P0{constructor(e){e&&this.set(e)}set(e,a,r){const t=this;function n(i,o,l){const f=$4(o);if(!f)throw new Error("header name must be a non-empty string");const u=N.findKey(t,f);(!u||t[u]===void 0||l===!0||l===void 0&&t[u]!==!1)&&(t[u||o]=A8(i))}const s=(i,o)=>N.forEach(i,(l,f)=>n(l,f,o));return N.isPlainObject(e)||e instanceof this.constructor?s(e,a):N.isString(e)&&(e=e.trim())&&!tM(e)?s(aM(e),a):e!=null&&n(a,e,r),this}get(e,a){if(e=$4(e),e){const r=N.findKey(this,e);if(r){const t=this[r];if(!a)return t;if(a===!0)return rM(t);if(N.isFunction(a))return a.call(this,t,r);if(N.isRegExp(a))return a.exec(t);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,a){if(e=$4(e),e){const r=N.findKey(this,e);return!!(r&&this[r]!==void 0&&(!a||V5(this,this[r],r,a)))}return!1}delete(e,a){const r=this;let t=!1;function n(s){if(s=$4(s),s){const i=N.findKey(r,s);i&&(!a||V5(r,r[i],i,a))&&(delete r[i],t=!0)}}return N.isArray(e)?e.forEach(n):n(e),t}clear(e){const a=Object.keys(this);let r=a.length,t=!1;for(;r--;){const n=a[r];(!e||V5(this,this[n],n,e,!0))&&(delete this[n],t=!0)}return t}normalize(e){const a=this,r={};return N.forEach(this,(t,n)=>{const s=N.findKey(r,n);if(s){a[s]=A8(t),delete a[n];return}const i=e?nM(n):String(n).trim();i!==n&&delete a[n],a[i]=A8(t),r[i]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const a=Object.create(null);return N.forEach(this,(r,t)=>{r!=null&&r!==!1&&(a[t]=e&&N.isArray(r)?r.join(", "):r)}),a}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,a])=>e+": "+a).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...a){const r=new this(e);return a.forEach(t=>r.set(t)),r}static accessor(e){const r=(this[ta]=this[ta]={accessors:{}}).accessors,t=this.prototype;function n(s){const i=$4(s);r[i]||(sM(t,s),r[i]=!0)}return N.isArray(e)?e.forEach(n):n(e),this}}P0.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);N.reduceDescriptors(P0.prototype,({value:c},e)=>{let a=e[0].toUpperCase()+e.slice(1);return{get:()=>c,set(r){this[a]=r}}});N.freezeMethods(P0);const D2=P0;function M5(c,e){const a=this||g9,r=e||a,t=D2.from(r.headers);let n=r.data;return N.forEach(c,function(i){n=i.call(a,n,t.normalize(),e?e.status:void 0)}),t.normalize(),n}function En(c){return!!(c&&c.__CANCEL__)}function q6(c,e,a){l1.call(this,c??"canceled",l1.ERR_CANCELED,e,a),this.name="CanceledError"}N.inherits(q6,l1,{__CANCEL__:!0});function iM(c,e,a){const r=a.config.validateStatus;!a.status||!r||r(a.status)?c(a):e(new l1("Request failed with status code "+a.status,[l1.ERR_BAD_REQUEST,l1.ERR_BAD_RESPONSE][Math.floor(a.status/100)-4],a.config,a.request,a))}const oM=f2.isStandardBrowserEnv?function(){return{write:function(a,r,t,n,s,i){const o=[];o.push(a+"="+encodeURIComponent(r)),N.isNumber(t)&&o.push("expires="+new Date(t).toGMTString()),N.isString(n)&&o.push("path="+n),N.isString(s)&&o.push("domain="+s),i===!0&&o.push("secure"),document.cookie=o.join("; ")},read:function(a){const r=document.cookie.match(new RegExp("(^|;\\s*)("+a+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(a){this.write(a,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function lM(c){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(c)}function fM(c,e){return e?c.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):c}function Tn(c,e){return c&&!lM(e)?fM(c,e):e}const uM=f2.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),a=document.createElement("a");let r;function t(n){let s=n;return e&&(a.setAttribute("href",s),s=a.href),a.setAttribute("href",s),{href:a.href,protocol:a.protocol?a.protocol.replace(/:$/,""):"",host:a.host,search:a.search?a.search.replace(/^\?/,""):"",hash:a.hash?a.hash.replace(/^#/,""):"",hostname:a.hostname,port:a.port,pathname:a.pathname.charAt(0)==="/"?a.pathname:"/"+a.pathname}}return r=t(window.location.href),function(s){const i=N.isString(s)?t(s):s;return i.protocol===r.protocol&&i.host===r.host}}():function(){return function(){return!0}}();function hM(c){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(c);return e&&e[1]||""}function mM(c,e){c=c||10;const a=new Array(c),r=new Array(c);let t=0,n=0,s;return e=e!==void 0?e:1e3,function(o){const l=Date.now(),f=r[n];s||(s=l),a[t]=o,r[t]=l;let u=n,h=0;for(;u!==t;)h+=a[u++],u=u%c;if(t=(t+1)%c,t===n&&(n=(n+1)%c),l-s<e)return;const p=f&&l-f;return p?Math.round(h*1e3/p):void 0}}function na(c,e){let a=0;const r=mM(50,250);return t=>{const n=t.loaded,s=t.lengthComputable?t.total:void 0,i=n-a,o=r(i),l=n<=s;a=n;const f={loaded:n,total:s,progress:s?n/s:void 0,bytes:i,rate:o||void 0,estimated:o&&s&&l?(s-n)/o:void 0,event:t};f[e?"download":"upload"]=!0,c(f)}}const vM=typeof XMLHttpRequest<"u",dM=vM&&function(c){return new Promise(function(a,r){let t=c.data;const n=D2.from(c.headers).normalize(),s=c.responseType;let i;function o(){c.cancelToken&&c.cancelToken.unsubscribe(i),c.signal&&c.signal.removeEventListener("abort",i)}N.isFormData(t)&&(f2.isStandardBrowserEnv||f2.isStandardBrowserWebWorkerEnv?n.setContentType(!1):n.setContentType("multipart/form-data;",!1));let l=new XMLHttpRequest;if(c.auth){const p=c.auth.username||"",H=c.auth.password?unescape(encodeURIComponent(c.auth.password)):"";n.set("Authorization","Basic "+btoa(p+":"+H))}const f=Tn(c.baseURL,c.url);l.open(c.method.toUpperCase(),An(f,c.params,c.paramsSerializer),!0),l.timeout=c.timeout;function u(){if(!l)return;const p=D2.from("getAllResponseHeaders"in l&&l.getAllResponseHeaders()),M={data:!s||s==="text"||s==="json"?l.responseText:l.response,status:l.status,statusText:l.statusText,headers:p,config:c,request:l};iM(function(d){a(d),o()},function(d){r(d),o()},M),l=null}if("onloadend"in l?l.onloadend=u:l.onreadystatechange=function(){!l||l.readyState!==4||l.status===0&&!(l.responseURL&&l.responseURL.indexOf("file:")===0)||setTimeout(u)},l.onabort=function(){l&&(r(new l1("Request aborted",l1.ECONNABORTED,c,l)),l=null)},l.onerror=function(){r(new l1("Network Error",l1.ERR_NETWORK,c,l)),l=null},l.ontimeout=function(){let H=c.timeout?"timeout of "+c.timeout+"ms exceeded":"timeout exceeded";const M=c.transitional||_n;c.timeoutErrorMessage&&(H=c.timeoutErrorMessage),r(new l1(H,M.clarifyTimeoutError?l1.ETIMEDOUT:l1.ECONNABORTED,c,l)),l=null},f2.isStandardBrowserEnv){const p=(c.withCredentials||uM(f))&&c.xsrfCookieName&&oM.read(c.xsrfCookieName);p&&n.set(c.xsrfHeaderName,p)}t===void 0&&n.setContentType(null),"setRequestHeader"in l&&N.forEach(n.toJSON(),function(H,M){l.setRequestHeader(M,H)}),N.isUndefined(c.withCredentials)||(l.withCredentials=!!c.withCredentials),s&&s!=="json"&&(l.responseType=c.responseType),typeof c.onDownloadProgress=="function"&&l.addEventListener("progress",na(c.onDownloadProgress,!0)),typeof c.onUploadProgress=="function"&&l.upload&&l.upload.addEventListener("progress",na(c.onUploadProgress)),(c.cancelToken||c.signal)&&(i=p=>{l&&(r(!p||p.type?new q6(null,c,l):p),l.abort(),l=null)},c.cancelToken&&c.cancelToken.subscribe(i),c.signal&&(c.signal.aborted?i():c.signal.addEventListener("abort",i)));const h=hM(f);if(h&&f2.protocols.indexOf(h)===-1){r(new l1("Unsupported protocol "+h+":",l1.ERR_BAD_REQUEST,c));return}l.send(t||null)})},_8={http:BV,xhr:dM};N.forEach(_8,(c,e)=>{if(c){try{Object.defineProperty(c,"name",{value:e})}catch{}Object.defineProperty(c,"adapterName",{value:e})}});const Pn={getAdapter:c=>{c=N.isArray(c)?c:[c];const{length:e}=c;let a,r;for(let t=0;t<e&&(a=c[t],!(r=N.isString(a)?_8[a.toLowerCase()]:a));t++);if(!r)throw r===!1?new l1(`Adapter ${a} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(N.hasOwnProp(_8,a)?`Adapter '${a}' is not available in the build`:`Unknown adapter '${a}'`);if(!N.isFunction(r))throw new TypeError("adapter is not a function");return r},adapters:_8};function g5(c){if(c.cancelToken&&c.cancelToken.throwIfRequested(),c.signal&&c.signal.aborted)throw new q6(null,c)}function sa(c){return g5(c),c.headers=D2.from(c.headers),c.data=M5.call(c,c.transformRequest),["post","put","patch"].indexOf(c.method)!==-1&&c.headers.setContentType("application/x-www-form-urlencoded",!1),Pn.getAdapter(c.adapter||g9.adapter)(c).then(function(r){return g5(c),r.data=M5.call(c,c.transformResponse,r),r.headers=D2.from(r.headers),r},function(r){return En(r)||(g5(c),r&&r.response&&(r.response.data=M5.call(c,c.transformResponse,r.response),r.response.headers=D2.from(r.response.headers))),Promise.reject(r)})}const ia=c=>c instanceof D2?c.toJSON():c;function y4(c,e){e=e||{};const a={};function r(l,f,u){return N.isPlainObject(l)&&N.isPlainObject(f)?N.merge.call({caseless:u},l,f):N.isPlainObject(f)?N.merge({},f):N.isArray(f)?f.slice():f}function t(l,f,u){if(N.isUndefined(f)){if(!N.isUndefined(l))return r(void 0,l,u)}else return r(l,f,u)}function n(l,f){if(!N.isUndefined(f))return r(void 0,f)}function s(l,f){if(N.isUndefined(f)){if(!N.isUndefined(l))return r(void 0,l)}else return r(void 0,f)}function i(l,f,u){if(u in e)return r(l,f);if(u in c)return r(void 0,l)}const o={url:n,method:n,data:n,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(l,f)=>t(ia(l),ia(f),!0)};return N.forEach(Object.keys(Object.assign({},c,e)),function(f){const u=o[f]||t,h=u(c[f],e[f],f);N.isUndefined(h)&&u!==i||(a[f]=h)}),a}const Rn="1.5.0",L9={};["object","boolean","number","function","string","symbol"].forEach((c,e)=>{L9[c]=function(r){return typeof r===c||"a"+(e<1?"n ":" ")+c}});const oa={};L9.transitional=function(e,a,r){function t(n,s){return"[Axios v"+Rn+"] Transitional option '"+n+"'"+s+(r?". "+r:"")}return(n,s,i)=>{if(e===!1)throw new l1(t(s," has been removed"+(a?" in "+a:"")),l1.ERR_DEPRECATED);return a&&!oa[s]&&(oa[s]=!0,console.warn(t(s," has been deprecated since v"+a+" and will be removed in the near future"))),e?e(n,s,i):!0}};function pM(c,e,a){if(typeof c!="object")throw new l1("options must be an object",l1.ERR_BAD_OPTION_VALUE);const r=Object.keys(c);let t=r.length;for(;t-- >0;){const n=r[t],s=e[n];if(s){const i=c[n],o=i===void 0||s(i,n,c);if(o!==!0)throw new l1("option "+n+" must be "+o,l1.ERR_BAD_OPTION_VALUE);continue}if(a!==!0)throw new l1("Unknown option "+n,l1.ERR_BAD_OPTION)}}const f7={assertOptions:pM,validators:L9},c3=f7.validators;class J8{constructor(e){this.defaults=e,this.interceptors={request:new ra,response:new ra}}request(e,a){typeof e=="string"?(a=a||{},a.url=e):a=e||{},a=y4(this.defaults,a);const{transitional:r,paramsSerializer:t,headers:n}=a;r!==void 0&&f7.assertOptions(r,{silentJSONParsing:c3.transitional(c3.boolean),forcedJSONParsing:c3.transitional(c3.boolean),clarifyTimeoutError:c3.transitional(c3.boolean)},!1),t!=null&&(N.isFunction(t)?a.paramsSerializer={serialize:t}:f7.assertOptions(t,{encode:c3.function,serialize:c3.function},!0)),a.method=(a.method||this.defaults.method||"get").toLowerCase();let s=n&&N.merge(n.common,n[a.method]);n&&N.forEach(["delete","get","head","post","put","patch","common"],H=>{delete n[H]}),a.headers=D2.concat(s,n);const i=[];let o=!0;this.interceptors.request.forEach(function(M){typeof M.runWhen=="function"&&M.runWhen(a)===!1||(o=o&&M.synchronous,i.unshift(M.fulfilled,M.rejected))});const l=[];this.interceptors.response.forEach(function(M){l.push(M.fulfilled,M.rejected)});let f,u=0,h;if(!o){const H=[sa.bind(this),void 0];for(H.unshift.apply(H,i),H.push.apply(H,l),h=H.length,f=Promise.resolve(a);u<h;)f=f.then(H[u++],H[u++]);return f}h=i.length;let p=a;for(u=0;u<h;){const H=i[u++],M=i[u++];try{p=H(p)}catch(x){M.call(this,x);break}}try{f=sa.call(this,p)}catch(H){return Promise.reject(H)}for(u=0,h=l.length;u<h;)f=f.then(l[u++],l[u++]);return f}getUri(e){e=y4(this.defaults,e);const a=Tn(e.baseURL,e.url);return An(a,e.params,e.paramsSerializer)}}N.forEach(["delete","get","head","options"],function(e){J8.prototype[e]=function(a,r){return this.request(y4(r||{},{method:e,url:a,data:(r||{}).data}))}});N.forEach(["post","put","patch"],function(e){function a(r){return function(n,s,i){return this.request(y4(i||{},{method:e,headers:r?{"Content-Type":"multipart/form-data"}:{},url:n,data:s}))}}J8.prototype[e]=a(),J8.prototype[e+"Form"]=a(!0)});const k8=J8;class b9{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let a;this.promise=new Promise(function(n){a=n});const r=this;this.promise.then(t=>{if(!r._listeners)return;let n=r._listeners.length;for(;n-- >0;)r._listeners[n](t);r._listeners=null}),this.promise.then=t=>{let n;const s=new Promise(i=>{r.subscribe(i),n=i}).then(t);return s.cancel=function(){r.unsubscribe(n)},s},e(function(n,s,i){r.reason||(r.reason=new q6(n,s,i),a(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const a=this._listeners.indexOf(e);a!==-1&&this._listeners.splice(a,1)}static source(){let e;return{token:new b9(function(t){e=t}),cancel:e}}}const zM=b9;function HM(c){return function(a){return c.apply(null,a)}}function CM(c){return N.isObject(c)&&c.isAxiosError===!0}const u7={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(u7).forEach(([c,e])=>{u7[e]=c});const VM=u7;function In(c){const e=new k8(c),a=Hn(k8.prototype.request,e);return N.extend(a,k8.prototype,e,{allOwnKeys:!0}),N.extend(a,e,null,{allOwnKeys:!0}),a.create=function(t){return In(y4(c,t))},a}const _1=In(g9);_1.Axios=k8;_1.CanceledError=q6;_1.CancelToken=zM;_1.isCancel=En;_1.VERSION=Rn;_1.toFormData=T0;_1.AxiosError=l1;_1.Cancel=_1.CanceledError;_1.all=function(e){return Promise.all(e)};_1.spread=HM;_1.isAxiosError=CM;_1.mergeConfig=y4;_1.AxiosHeaders=D2;_1.formToJSON=c=>kn(N.isHTMLForm(c)?new FormData(c):c);_1.getAdapter=Pn.getAdapter;_1.HttpStatusCode=VM;_1.default=_1;const MM=_1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn=function(c){const e=[];let a=0;for(let r=0;r<c.length;r++){let t=c.charCodeAt(r);t<128?e[a++]=t:t<2048?(e[a++]=t>>6|192,e[a++]=t&63|128):(t&64512)===55296&&r+1<c.length&&(c.charCodeAt(r+1)&64512)===56320?(t=65536+((t&1023)<<10)+(c.charCodeAt(++r)&1023),e[a++]=t>>18|240,e[a++]=t>>12&63|128,e[a++]=t>>6&63|128,e[a++]=t&63|128):(e[a++]=t>>12|224,e[a++]=t>>6&63|128,e[a++]=t&63|128)}return e},gM=function(c){const e=[];let a=0,r=0;for(;a<c.length;){const t=c[a++];if(t<128)e[r++]=String.fromCharCode(t);else if(t>191&&t<224){const n=c[a++];e[r++]=String.fromCharCode((t&31)<<6|n&63)}else if(t>239&&t<365){const n=c[a++],s=c[a++],i=c[a++],o=((t&7)<<18|(n&63)<<12|(s&63)<<6|i&63)-65536;e[r++]=String.fromCharCode(55296+(o>>10)),e[r++]=String.fromCharCode(56320+(o&1023))}else{const n=c[a++],s=c[a++];e[r++]=String.fromCharCode((t&15)<<12|(n&63)<<6|s&63)}}return e.join("")},On={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(c,e){if(!Array.isArray(c))throw Error("encodeByteArray takes an array as a parameter");this.init_();const a=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<c.length;t+=3){const n=c[t],s=t+1<c.length,i=s?c[t+1]:0,o=t+2<c.length,l=o?c[t+2]:0,f=n>>2,u=(n&3)<<4|i>>4;let h=(i&15)<<2|l>>6,p=l&63;o||(p=64,s||(h=64)),r.push(a[f],a[u],a[h],a[p])}return r.join("")},encodeString(c,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(c):this.encodeByteArray(Dn(c),e)},decodeString(c,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(c):gM(this.decodeStringToByteArray(c,e))},decodeStringToByteArray(c,e){this.init_();const a=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<c.length;){const n=a[c.charAt(t++)],i=t<c.length?a[c.charAt(t)]:0;++t;const l=t<c.length?a[c.charAt(t)]:64;++t;const u=t<c.length?a[c.charAt(t)]:64;if(++t,n==null||i==null||l==null||u==null)throw new LM;const h=n<<2|i>>4;if(r.push(h),l!==64){const p=i<<4&240|l>>2;if(r.push(p),u!==64){const H=l<<6&192|u;r.push(H)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let c=0;c<this.ENCODED_VALS.length;c++)this.byteToCharMap_[c]=this.ENCODED_VALS.charAt(c),this.charToByteMap_[this.byteToCharMap_[c]]=c,this.byteToCharMapWebSafe_[c]=this.ENCODED_VALS_WEBSAFE.charAt(c),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[c]]=c,c>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(c)]=c,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(c)]=c)}}};class LM extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bM=function(c){const e=Dn(c);return On.encodeByteArray(e,!0)},Fn=function(c){return bM(c).replace(/\./g,"")},Bn=function(c){try{return On.decodeString(c,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xM(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yM=()=>xM().__FIREBASE_DEFAULTS__,NM=()=>{if(typeof process>"u"||typeof process.env>"u")return;const c={}.__FIREBASE_DEFAULTS__;if(c)return JSON.parse(c)},SM=()=>{if(typeof document>"u")return;let c;try{c=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=c&&Bn(c[1]);return e&&JSON.parse(e)},x9=()=>{try{return yM()||NM()||SM()}catch(c){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${c}`);return}},wM=c=>{var e,a;return(a=(e=x9())===null||e===void 0?void 0:e.emulatorHosts)===null||a===void 0?void 0:a[c]},Un=()=>{var c;return(c=x9())===null||c===void 0?void 0:c.config},qn=c=>{var e;return(e=x9())===null||e===void 0?void 0:e[`_${c}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AM{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,a)=>{this.resolve=e,this.reject=a})}wrapCallback(e){return(a,r)=>{a?this.reject(a):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(a):e(a,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F1(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _M(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(F1())}function kM(){const c=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof c=="object"&&c.id!==void 0}function EM(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function TM(){const c=F1();return c.indexOf("MSIE ")>=0||c.indexOf("Trident/")>=0}function PM(){try{return typeof indexedDB=="object"}catch{return!1}}function RM(){return new Promise((c,e)=>{try{let a=!0;const r="validate-browser-context-for-indexeddb-analytics-module",t=self.indexedDB.open(r);t.onsuccess=()=>{t.result.close(),a||self.indexedDB.deleteDatabase(r),c(!0)},t.onupgradeneeded=()=>{a=!1},t.onerror=()=>{var n;e(((n=t.error)===null||n===void 0?void 0:n.message)||"")}}catch(a){e(a)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IM="FirebaseError";class N3 extends Error{constructor(e,a,r){super(a),this.code=e,this.customData=r,this.name=IM,Object.setPrototypeOf(this,N3.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,W6.prototype.create)}}class W6{constructor(e,a,r){this.service=e,this.serviceName=a,this.errors=r}create(e,...a){const r=a[0]||{},t=`${this.service}/${e}`,n=this.errors[e],s=n?DM(n,r):"Error",i=`${this.serviceName}: ${s} (${t}).`;return new N3(t,i,r)}}function DM(c,e){return c.replace(OM,(a,r)=>{const t=e[r];return t!=null?String(t):`<${r}?>`})}const OM=/\{\$([^}]+)}/g;function FM(c){for(const e in c)if(Object.prototype.hasOwnProperty.call(c,e))return!1;return!0}function Y8(c,e){if(c===e)return!0;const a=Object.keys(c),r=Object.keys(e);for(const t of a){if(!r.includes(t))return!1;const n=c[t],s=e[t];if(la(n)&&la(s)){if(!Y8(n,s))return!1}else if(n!==s)return!1}for(const t of r)if(!a.includes(t))return!1;return!0}function la(c){return c!==null&&typeof c=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j6(c){const e=[];for(const[a,r]of Object.entries(c))Array.isArray(r)?r.forEach(t=>{e.push(encodeURIComponent(a)+"="+encodeURIComponent(t))}):e.push(encodeURIComponent(a)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function J4(c){const e={};return c.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[t,n]=r.split("=");e[decodeURIComponent(t)]=decodeURIComponent(n)}}),e}function Y4(c){const e=c.indexOf("?");if(!e)return"";const a=c.indexOf("#",e);return c.substring(e,a>0?a:void 0)}function BM(c,e){const a=new UM(c,e);return a.subscribe.bind(a)}class UM{constructor(e,a){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=a,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(a=>{a.next(e)})}error(e){this.forEachObserver(a=>{a.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,a,r){let t;if(e===void 0&&a===void 0&&r===void 0)throw new Error("Missing Observer.");qM(e,["next","error","complete"])?t=e:t={next:e,error:a,complete:r},t.next===void 0&&(t.next=L5),t.error===void 0&&(t.error=L5),t.complete===void 0&&(t.complete=L5);const n=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?t.error(this.finalError):t.complete()}catch{}}),this.observers.push(t),n}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let a=0;a<this.observers.length;a++)this.sendOne(a,e)}sendOne(e,a){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{a(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function qM(c,e){if(typeof c!="object"||c===null)return!1;for(const a of e)if(a in c&&typeof c[a]=="function")return!0;return!1}function L5(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y2(c){return c&&c._delegate?c._delegate:c}class N4{constructor(e,a,r){this.name=e,this.instanceFactory=a,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _3="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WM{constructor(e,a){this.name=e,this.container=a,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const a=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(a)){const r=new AM;if(this.instancesDeferred.set(a,r),this.isInitialized(a)||this.shouldAutoInitialize())try{const t=this.getOrInitializeService({instanceIdentifier:a});t&&r.resolve(t)}catch{}}return this.instancesDeferred.get(a).promise}getImmediate(e){var a;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),t=(a=e==null?void 0:e.optional)!==null&&a!==void 0?a:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(n){if(t)return null;throw n}else{if(t)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($M(e))try{this.getOrInitializeService({instanceIdentifier:_3})}catch{}for(const[a,r]of this.instancesDeferred.entries()){const t=this.normalizeInstanceIdentifier(a);try{const n=this.getOrInitializeService({instanceIdentifier:t});r.resolve(n)}catch{}}}}clearInstance(e=_3){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(a=>"INTERNAL"in a).map(a=>a.INTERNAL.delete()),...e.filter(a=>"_delete"in a).map(a=>a._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_3){return this.instances.has(e)}getOptions(e=_3){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:a={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const t=this.getOrInitializeService({instanceIdentifier:r,options:a});for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);r===i&&s.resolve(t)}return t}onInit(e,a){var r;const t=this.normalizeInstanceIdentifier(a),n=(r=this.onInitCallbacks.get(t))!==null&&r!==void 0?r:new Set;n.add(e),this.onInitCallbacks.set(t,n);const s=this.instances.get(t);return s&&e(s,t),()=>{n.delete(e)}}invokeOnInitCallbacks(e,a){const r=this.onInitCallbacks.get(a);if(r)for(const t of r)try{t(e,a)}catch{}}getOrInitializeService({instanceIdentifier:e,options:a={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:jM(e),options:a}),this.instances.set(e,r),this.instancesOptions.set(e,a),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=_3){return this.component?this.component.multipleInstances?e:_3:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jM(c){return c===_3?void 0:c}function $M(c){return c.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GM{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const a=this.getProvider(e.name);if(a.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);a.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const a=new WM(e,this);return this.providers.set(e,a),a}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z1;(function(c){c[c.DEBUG=0]="DEBUG",c[c.VERBOSE=1]="VERBOSE",c[c.INFO=2]="INFO",c[c.WARN=3]="WARN",c[c.ERROR=4]="ERROR",c[c.SILENT=5]="SILENT"})(z1||(z1={}));const KM={debug:z1.DEBUG,verbose:z1.VERBOSE,info:z1.INFO,warn:z1.WARN,error:z1.ERROR,silent:z1.SILENT},ZM=z1.INFO,JM={[z1.DEBUG]:"log",[z1.VERBOSE]:"log",[z1.INFO]:"info",[z1.WARN]:"warn",[z1.ERROR]:"error"},YM=(c,e,...a)=>{if(e<c.logLevel)return;const r=new Date().toISOString(),t=JM[e];if(t)console[t](`[${r}]  ${c.name}:`,...a);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Wn{constructor(e){this.name=e,this._logLevel=ZM,this._logHandler=YM,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z1))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?KM[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z1.DEBUG,...e),this._logHandler(this,z1.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z1.VERBOSE,...e),this._logHandler(this,z1.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z1.INFO,...e),this._logHandler(this,z1.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z1.WARN,...e),this._logHandler(this,z1.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z1.ERROR,...e),this._logHandler(this,z1.ERROR,...e)}}const XM=(c,e)=>e.some(a=>c instanceof a);let fa,ua;function QM(){return fa||(fa=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function cg(){return ua||(ua=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const jn=new WeakMap,h7=new WeakMap,$n=new WeakMap,b5=new WeakMap,y9=new WeakMap;function eg(c){const e=new Promise((a,r)=>{const t=()=>{c.removeEventListener("success",n),c.removeEventListener("error",s)},n=()=>{a(d3(c.result)),t()},s=()=>{r(c.error),t()};c.addEventListener("success",n),c.addEventListener("error",s)});return e.then(a=>{a instanceof IDBCursor&&jn.set(a,c)}).catch(()=>{}),y9.set(e,c),e}function ag(c){if(h7.has(c))return;const e=new Promise((a,r)=>{const t=()=>{c.removeEventListener("complete",n),c.removeEventListener("error",s),c.removeEventListener("abort",s)},n=()=>{a(),t()},s=()=>{r(c.error||new DOMException("AbortError","AbortError")),t()};c.addEventListener("complete",n),c.addEventListener("error",s),c.addEventListener("abort",s)});h7.set(c,e)}let m7={get(c,e,a){if(c instanceof IDBTransaction){if(e==="done")return h7.get(c);if(e==="objectStoreNames")return c.objectStoreNames||$n.get(c);if(e==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return d3(c[e])},set(c,e,a){return c[e]=a,!0},has(c,e){return c instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in c}};function rg(c){m7=c(m7)}function tg(c){return c===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...a){const r=c.call(x5(this),e,...a);return $n.set(r,e.sort?e.sort():[e]),d3(r)}:cg().includes(c)?function(...e){return c.apply(x5(this),e),d3(jn.get(this))}:function(...e){return d3(c.apply(x5(this),e))}}function ng(c){return typeof c=="function"?tg(c):(c instanceof IDBTransaction&&ag(c),XM(c,QM())?new Proxy(c,m7):c)}function d3(c){if(c instanceof IDBRequest)return eg(c);if(b5.has(c))return b5.get(c);const e=ng(c);return e!==c&&(b5.set(c,e),y9.set(e,c)),e}const x5=c=>y9.get(c);function sg(c,e,{blocked:a,upgrade:r,blocking:t,terminated:n}={}){const s=indexedDB.open(c,e),i=d3(s);return r&&s.addEventListener("upgradeneeded",o=>{r(d3(s.result),o.oldVersion,o.newVersion,d3(s.transaction),o)}),a&&s.addEventListener("blocked",o=>a(o.oldVersion,o.newVersion,o)),i.then(o=>{n&&o.addEventListener("close",()=>n()),t&&o.addEventListener("versionchange",l=>t(l.oldVersion,l.newVersion,l))}).catch(()=>{}),i}const ig=["get","getKey","getAll","getAllKeys","count"],og=["put","add","delete","clear"],y5=new Map;function ha(c,e){if(!(c instanceof IDBDatabase&&!(e in c)&&typeof e=="string"))return;if(y5.get(e))return y5.get(e);const a=e.replace(/FromIndex$/,""),r=e!==a,t=og.includes(a);if(!(a in(r?IDBIndex:IDBObjectStore).prototype)||!(t||ig.includes(a)))return;const n=async function(s,...i){const o=this.transaction(s,t?"readwrite":"readonly");let l=o.store;return r&&(l=l.index(i.shift())),(await Promise.all([l[a](...i),t&&o.done]))[0]};return y5.set(e,n),n}rg(c=>({...c,get:(e,a,r)=>ha(e,a)||c.get(e,a,r),has:(e,a)=>!!ha(e,a)||c.has(e,a)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(a=>{if(fg(a)){const r=a.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(a=>a).join(" ")}}function fg(c){const e=c.getComponent();return(e==null?void 0:e.type)==="VERSION"}const v7="@firebase/app",ma="0.10.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $3=new Wn("@firebase/app"),ug="@firebase/app-compat",hg="@firebase/analytics-compat",mg="@firebase/analytics",vg="@firebase/app-check-compat",dg="@firebase/app-check",pg="@firebase/auth",zg="@firebase/auth-compat",Hg="@firebase/database",Cg="@firebase/database-compat",Vg="@firebase/functions",Mg="@firebase/functions-compat",gg="@firebase/installations",Lg="@firebase/installations-compat",bg="@firebase/messaging",xg="@firebase/messaging-compat",yg="@firebase/performance",Ng="@firebase/performance-compat",Sg="@firebase/remote-config",wg="@firebase/remote-config-compat",Ag="@firebase/storage",_g="@firebase/storage-compat",kg="@firebase/firestore",Eg="@firebase/vertexai-preview",Tg="@firebase/firestore-compat",Pg="firebase",Rg="10.12.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d7="[DEFAULT]",Ig={[v7]:"fire-core",[ug]:"fire-core-compat",[mg]:"fire-analytics",[hg]:"fire-analytics-compat",[dg]:"fire-app-check",[vg]:"fire-app-check-compat",[pg]:"fire-auth",[zg]:"fire-auth-compat",[Hg]:"fire-rtdb",[Cg]:"fire-rtdb-compat",[Vg]:"fire-fn",[Mg]:"fire-fn-compat",[gg]:"fire-iid",[Lg]:"fire-iid-compat",[bg]:"fire-fcm",[xg]:"fire-fcm-compat",[yg]:"fire-perf",[Ng]:"fire-perf-compat",[Sg]:"fire-rc",[wg]:"fire-rc-compat",[Ag]:"fire-gcs",[_g]:"fire-gcs-compat",[kg]:"fire-fst",[Tg]:"fire-fst-compat",[Eg]:"fire-vertex","fire-js":"fire-js",[Pg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X8=new Map,Dg=new Map,p7=new Map;function va(c,e){try{c.container.addComponent(e)}catch(a){$3.debug(`Component ${e.name} failed to register with FirebaseApp ${c.name}`,a)}}function b6(c){const e=c.name;if(p7.has(e))return $3.debug(`There were multiple attempts to register component ${e}.`),!1;p7.set(e,c);for(const a of X8.values())va(a,c);for(const a of Dg.values())va(a,c);return!0}function Gn(c,e){const a=c.container.getProvider("heartbeat").getImmediate({optional:!0});return a&&a.triggerHeartbeat(),c.container.getProvider(e)}function V2(c){return c.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},p3=new W6("app","Firebase",Og);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{constructor(e,a,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},a),this._name=a.name,this._automaticDataCollectionEnabled=a.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new N4("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw p3.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $6=Rg;function Kn(c,e={}){let a=c;typeof e!="object"&&(e={name:e});const r=Object.assign({name:d7,automaticDataCollectionEnabled:!1},e),t=r.name;if(typeof t!="string"||!t)throw p3.create("bad-app-name",{appName:String(t)});if(a||(a=Un()),!a)throw p3.create("no-options");const n=X8.get(t);if(n){if(Y8(a,n.options)&&Y8(r,n.config))return n;throw p3.create("duplicate-app",{appName:t})}const s=new GM(t);for(const o of p7.values())s.addComponent(o);const i=new Fg(a,r,s);return X8.set(t,i),i}function Bg(c=d7){const e=X8.get(c);if(!e&&c===d7&&Un())return Kn();if(!e)throw p3.create("no-app",{appName:c});return e}function v4(c,e,a){var r;let t=(r=Ig[c])!==null&&r!==void 0?r:c;a&&(t+=`-${a}`);const n=t.match(/\s|\//),s=e.match(/\s|\//);if(n||s){const i=[`Unable to register library "${t}" with version "${e}":`];n&&i.push(`library name "${t}" contains illegal characters (whitespace or "/")`),n&&s&&i.push("and"),s&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),$3.warn(i.join(" "));return}b6(new N4(`${t}-version`,()=>({library:t,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ug="firebase-heartbeat-database",qg=1,x6="firebase-heartbeat-store";let N5=null;function Zn(){return N5||(N5=sg(Ug,qg,{upgrade:(c,e)=>{switch(e){case 0:try{c.createObjectStore(x6)}catch(a){console.warn(a)}}}}).catch(c=>{throw p3.create("idb-open",{originalErrorMessage:c.message})})),N5}async function Wg(c){try{const a=(await Zn()).transaction(x6),r=await a.objectStore(x6).get(Jn(c));return await a.done,r}catch(e){if(e instanceof N3)$3.warn(e.message);else{const a=p3.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});$3.warn(a.message)}}}async function da(c,e){try{const r=(await Zn()).transaction(x6,"readwrite");await r.objectStore(x6).put(e,Jn(c)),await r.done}catch(a){if(a instanceof N3)$3.warn(a.message);else{const r=p3.create("idb-set",{originalErrorMessage:a==null?void 0:a.message});$3.warn(r.message)}}}function Jn(c){return`${c.name}!${c.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg=1024,$g=30*24*60*60*1e3;class Gg{constructor(e){this.container=e,this._heartbeatsCache=null;const a=this.container.getProvider("app").getImmediate();this._storage=new Zg(a),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,a;const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=pa();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((a=this._heartbeatsCache)===null||a===void 0?void 0:a.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(s=>s.date===n)))return this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=$g}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const a=pa(),{heartbeatsToSend:r,unsentEntries:t}=Kg(this._heartbeatsCache.heartbeats),n=Fn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=a,t.length>0?(this._heartbeatsCache.heartbeats=t,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),n}}function pa(){return new Date().toISOString().substring(0,10)}function Kg(c,e=jg){const a=[];let r=c.slice();for(const t of c){const n=a.find(s=>s.agent===t.agent);if(n){if(n.dates.push(t.date),za(a)>e){n.dates.pop();break}}else if(a.push({agent:t.agent,dates:[t.date]}),za(a)>e){a.pop();break}r=r.slice(1)}return{heartbeatsToSend:a,unsentEntries:r}}class Zg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return PM()?RM().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const a=await Wg(this.app);return a!=null&&a.heartbeats?a:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var a;if(await this._canUseIndexedDBPromise){const t=await this.read();return da(this.app,{lastSentHeartbeatDate:(a=e.lastSentHeartbeatDate)!==null&&a!==void 0?a:t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var a;if(await this._canUseIndexedDBPromise){const t=await this.read();return da(this.app,{lastSentHeartbeatDate:(a=e.lastSentHeartbeatDate)!==null&&a!==void 0?a:t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}else return}}function za(c){return Fn(JSON.stringify({version:2,heartbeats:c})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jg(c){b6(new N4("platform-logger",e=>new lg(e),"PRIVATE")),b6(new N4("heartbeat",e=>new Gg(e),"PRIVATE")),v4(v7,ma,c),v4(v7,ma,"esm2017"),v4("fire-js","")}Jg("");var Yg="firebase",Xg="10.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */v4(Yg,Xg,"app");function N9(c,e){var a={};for(var r in c)Object.prototype.hasOwnProperty.call(c,r)&&e.indexOf(r)<0&&(a[r]=c[r]);if(c!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,r=Object.getOwnPropertySymbols(c);t<r.length;t++)e.indexOf(r[t])<0&&Object.prototype.propertyIsEnumerable.call(c,r[t])&&(a[r[t]]=c[r[t]]);return a}function Yn(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Qg=Yn,Xn=new W6("auth","Firebase",Yn());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q8=new Wn("@firebase/auth");function cL(c,...e){Q8.logLevel<=z1.WARN&&Q8.warn(`Auth (${$6}): ${c}`,...e)}function E8(c,...e){Q8.logLevel<=z1.ERROR&&Q8.error(`Auth (${$6}): ${c}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function s2(c,...e){throw w9(c,...e)}function m2(c,...e){return w9(c,...e)}function S9(c,e,a){const r=Object.assign(Object.assign({},Qg()),{[e]:a});return new W6("auth","Firebase",r).create(e,{appName:c.name})}function z3(c){return S9(c,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function eL(c,e,a){const r=a;if(!(e instanceof r))throw r.name!==e.constructor.name&&s2(c,"argument-error"),S9(c,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function w9(c,...e){if(typeof c!="string"){const a=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=c.name),c._errorFactory.create(a,...r)}return Xn.create(c,...e)}function Q(c,e,...a){if(!c)throw w9(e,...a)}function E2(c){const e="INTERNAL ASSERTION FAILED: "+c;throw E8(e),new Error(e)}function B2(c,e){c||E2(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z7(){var c;return typeof self<"u"&&((c=self.location)===null||c===void 0?void 0:c.href)||""}function aL(){return Ha()==="http:"||Ha()==="https:"}function Ha(){var c;return typeof self<"u"&&((c=self.location)===null||c===void 0?void 0:c.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rL(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(aL()||kM()||"connection"in navigator)?navigator.onLine:!0}function tL(){if(typeof navigator>"u")return null;const c=navigator;return c.languages&&c.languages[0]||c.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G6{constructor(e,a){this.shortDelay=e,this.longDelay=a,B2(a>e,"Short delay should be less than long delay!"),this.isMobile=_M()||EM()}get(){return rL()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A9(c,e){B2(c.emulator,"Emulator should always be set here");const{url:a}=c.emulator;return e?`${a}${e.startsWith("/")?e.slice(1):e}`:a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{static initialize(e,a,r){this.fetchImpl=e,a&&(this.headersImpl=a),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;E2("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;E2("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;E2("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nL={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sL=new G6(3e4,6e4);function Y3(c,e){return c.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:c.tenantId}):e}async function S3(c,e,a,r,t={}){return cs(c,t,async()=>{let n={},s={};r&&(e==="GET"?s=r:n={body:JSON.stringify(r)});const i=j6(Object.assign({key:c.config.apiKey},s)).slice(1),o=await c._getAdditionalHeaders();return o["Content-Type"]="application/json",c.languageCode&&(o["X-Firebase-Locale"]=c.languageCode),Qn.fetch()(es(c,c.config.apiHost,a,i),Object.assign({method:e,headers:o,referrerPolicy:"no-referrer"},n))})}async function cs(c,e,a){c._canInitEmulator=!1;const r=Object.assign(Object.assign({},nL),e);try{const t=new oL(c),n=await Promise.race([a(),t.promise]);t.clearNetworkTimeout();const s=await n.json();if("needConfirmation"in s)throw z8(c,"account-exists-with-different-credential",s);if(n.ok&&!("errorMessage"in s))return s;{const i=n.ok?s.errorMessage:s.error.message,[o,l]=i.split(" : ");if(o==="FEDERATED_USER_ID_ALREADY_LINKED")throw z8(c,"credential-already-in-use",s);if(o==="EMAIL_EXISTS")throw z8(c,"email-already-in-use",s);if(o==="USER_DISABLED")throw z8(c,"user-disabled",s);const f=r[o]||o.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw S9(c,f,l);s2(c,f)}}catch(t){if(t instanceof N3)throw t;s2(c,"network-request-failed",{message:String(t)})}}async function R0(c,e,a,r,t={}){const n=await S3(c,e,a,r,t);return"mfaPendingCredential"in n&&s2(c,"multi-factor-auth-required",{_serverResponse:n}),n}function es(c,e,a,r){const t=`${e}${a}?${r}`;return c.config.emulator?A9(c.config,t):`${c.config.apiScheme}://${t}`}function iL(c){switch(c){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class oL{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((a,r)=>{this.timer=setTimeout(()=>r(m2(this.auth,"network-request-failed")),sL.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function z8(c,e,a){const r={appName:c.name};a.email&&(r.email=a.email),a.phoneNumber&&(r.phoneNumber=a.phoneNumber);const t=m2(c,e,r);return t.customData._tokenResponse=a,t}function Ca(c){return c!==void 0&&c.enterprise!==void 0}class lL{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const a of this.recaptchaEnforcementState)if(a.provider&&a.provider===e)return iL(a.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function fL(c,e){return S3(c,"GET","/v2/recaptchaConfig",Y3(c,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uL(c,e){return S3(c,"POST","/v1/accounts:delete",e)}async function as(c,e){return S3(c,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l6(c){if(c)try{const e=new Date(Number(c));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function hL(c,e=!1){const a=y2(c),r=await a.getIdToken(e),t=_9(r);Q(t&&t.exp&&t.auth_time&&t.iat,a.auth,"internal-error");const n=typeof t.firebase=="object"?t.firebase:void 0,s=n==null?void 0:n.sign_in_provider;return{claims:t,token:r,authTime:l6(S5(t.auth_time)),issuedAtTime:l6(S5(t.iat)),expirationTime:l6(S5(t.exp)),signInProvider:s||null,signInSecondFactor:(n==null?void 0:n.sign_in_second_factor)||null}}function S5(c){return Number(c)*1e3}function _9(c){const[e,a,r]=c.split(".");if(e===void 0||a===void 0||r===void 0)return E8("JWT malformed, contained fewer than 3 sections"),null;try{const t=Bn(a);return t?JSON.parse(t):(E8("Failed to decode base64 JWT payload"),null)}catch(t){return E8("Caught error parsing JWT payload as JSON",t==null?void 0:t.toString()),null}}function Va(c){const e=_9(c);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function y6(c,e,a=!1){if(a)return e;try{return await e}catch(r){throw r instanceof N3&&mL(r)&&c.auth.currentUser===c&&await c.auth.signOut(),r}}function mL({code:c}){return c==="auth/user-disabled"||c==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vL{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var a;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const t=((a=this.user.stsTokenManager.expirationTime)!==null&&a!==void 0?a:0)-Date.now()-3e5;return Math.max(0,t)}}schedule(e=!1){if(!this.isRunning)return;const a=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},a)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H7{constructor(e,a){this.createdAt=e,this.lastLoginAt=a,this._initializeTime()}_initializeTime(){this.lastSignInTime=l6(this.lastLoginAt),this.creationTime=l6(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function c0(c){var e;const a=c.auth,r=await c.getIdToken(),t=await y6(c,as(a,{idToken:r}));Q(t==null?void 0:t.users.length,a,"internal-error");const n=t.users[0];c._notifyReloadListener(n);const s=!((e=n.providerUserInfo)===null||e===void 0)&&e.length?rs(n.providerUserInfo):[],i=pL(c.providerData,s),o=c.isAnonymous,l=!(c.email&&n.passwordHash)&&!(i!=null&&i.length),f=o?l:!1,u={uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:i,metadata:new H7(n.createdAt,n.lastLoginAt),isAnonymous:f};Object.assign(c,u)}async function dL(c){const e=y2(c);await c0(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function pL(c,e){return[...c.filter(r=>!e.some(t=>t.providerId===r.providerId)),...e]}function rs(c){return c.map(e=>{var{providerId:a}=e,r=N9(e,["providerId"]);return{providerId:a,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zL(c,e){const a=await cs(c,{},async()=>{const r=j6({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:t,apiKey:n}=c.config,s=es(c,t,"/v1/token",`key=${n}`),i=await c._getAdditionalHeaders();return i["Content-Type"]="application/x-www-form-urlencoded",Qn.fetch()(s,{method:"POST",headers:i,body:r})});return{accessToken:a.access_token,expiresIn:a.expires_in,refreshToken:a.refresh_token}}async function HL(c,e){return S3(c,"POST","/v2/accounts:revokeToken",Y3(c,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d4{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const a="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Va(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,a)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const a=Va(e);this.updateTokensAndExpiration(e,null,a)}async getToken(e,a=!1){return!a&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,a){const{accessToken:r,refreshToken:t,expiresIn:n}=await zL(e,a);this.updateTokensAndExpiration(r,t,Number(n))}updateTokensAndExpiration(e,a,r){this.refreshToken=a||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,a){const{refreshToken:r,accessToken:t,expirationTime:n}=a,s=new d4;return r&&(Q(typeof r=="string","internal-error",{appName:e}),s.refreshToken=r),t&&(Q(typeof t=="string","internal-error",{appName:e}),s.accessToken=t),n&&(Q(typeof n=="number","internal-error",{appName:e}),s.expirationTime=n),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new d4,this.toJSON())}_performRefresh(){return E2("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e3(c,e){Q(typeof c=="string"||typeof c>"u","internal-error",{appName:e})}class T2{constructor(e){var{uid:a,auth:r,stsTokenManager:t}=e,n=N9(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vL(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=a,this.auth=r,this.stsTokenManager=t,this.accessToken=t.accessToken,this.displayName=n.displayName||null,this.email=n.email||null,this.emailVerified=n.emailVerified||!1,this.phoneNumber=n.phoneNumber||null,this.photoURL=n.photoURL||null,this.isAnonymous=n.isAnonymous||!1,this.tenantId=n.tenantId||null,this.providerData=n.providerData?[...n.providerData]:[],this.metadata=new H7(n.createdAt||void 0,n.lastLoginAt||void 0)}async getIdToken(e){const a=await y6(this,this.stsTokenManager.getToken(this.auth,e));return Q(a,this.auth,"internal-error"),this.accessToken!==a&&(this.accessToken=a,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),a}getIdTokenResult(e){return hL(this,e)}reload(){return dL(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(a=>Object.assign({},a)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const a=new T2(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return a.metadata._copy(this.metadata),a}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,a=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),a&&await c0(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(V2(this.auth.app))return Promise.reject(z3(this.auth));const e=await this.getIdToken();return await y6(this,uL(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,a){var r,t,n,s,i,o,l,f;const u=(r=a.displayName)!==null&&r!==void 0?r:void 0,h=(t=a.email)!==null&&t!==void 0?t:void 0,p=(n=a.phoneNumber)!==null&&n!==void 0?n:void 0,H=(s=a.photoURL)!==null&&s!==void 0?s:void 0,M=(i=a.tenantId)!==null&&i!==void 0?i:void 0,x=(o=a._redirectEventId)!==null&&o!==void 0?o:void 0,d=(l=a.createdAt)!==null&&l!==void 0?l:void 0,m=(f=a.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:g,emailVerified:C,isAnonymous:b,providerData:T,stsTokenManager:E}=a;Q(g&&E,e,"internal-error");const L=d4.fromJSON(this.name,E);Q(typeof g=="string",e,"internal-error"),e3(u,e.name),e3(h,e.name),Q(typeof C=="boolean",e,"internal-error"),Q(typeof b=="boolean",e,"internal-error"),e3(p,e.name),e3(H,e.name),e3(M,e.name),e3(x,e.name),e3(d,e.name),e3(m,e.name);const A=new T2({uid:g,auth:e,email:h,emailVerified:C,displayName:u,isAnonymous:b,photoURL:H,phoneNumber:p,tenantId:M,stsTokenManager:L,createdAt:d,lastLoginAt:m});return T&&Array.isArray(T)&&(A.providerData=T.map(I=>Object.assign({},I))),x&&(A._redirectEventId=x),A}static async _fromIdTokenResponse(e,a,r=!1){const t=new d4;t.updateFromServerResponse(a);const n=new T2({uid:a.localId,auth:e,stsTokenManager:t,isAnonymous:r});return await c0(n),n}static async _fromGetAccountInfoResponse(e,a,r){const t=a.users[0];Q(t.localId!==void 0,"internal-error");const n=t.providerUserInfo!==void 0?rs(t.providerUserInfo):[],s=!(t.email&&t.passwordHash)&&!(n!=null&&n.length),i=new d4;i.updateFromIdToken(r);const o=new T2({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:s}),l={uid:t.localId,displayName:t.displayName||null,photoURL:t.photoUrl||null,email:t.email||null,emailVerified:t.emailVerified||!1,phoneNumber:t.phoneNumber||null,tenantId:t.tenantId||null,providerData:n,metadata:new H7(t.createdAt,t.lastLoginAt),isAnonymous:!(t.email&&t.passwordHash)&&!(n!=null&&n.length)};return Object.assign(o,l),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma=new Map;function P2(c){B2(c instanceof Function,"Expected a class definition");let e=Ma.get(c);return e?(B2(e instanceof c,"Instance stored in cache mismatched with class"),e):(e=new c,Ma.set(c,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,a){this.storage[e]=a}async _get(e){const a=this.storage[e];return a===void 0?null:a}async _remove(e){delete this.storage[e]}_addListener(e,a){}_removeListener(e,a){}}ts.type="NONE";const ga=ts;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T8(c,e,a){return`firebase:${c}:${e}:${a}`}class p4{constructor(e,a,r){this.persistence=e,this.auth=a,this.userKey=r;const{config:t,name:n}=this.auth;this.fullUserKey=T8(this.userKey,t.apiKey,n),this.fullPersistenceKey=T8("persistence",t.apiKey,n),this.boundEventHandler=a._onStorageEvent.bind(a),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?T2._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const a=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,a)return this.setCurrentUser(a)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,a,r="authUser"){if(!a.length)return new p4(P2(ga),e,r);const t=(await Promise.all(a.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let n=t[0]||P2(ga);const s=T8(r,e.config.apiKey,e.name);let i=null;for(const l of a)try{const f=await l._get(s);if(f){const u=T2._fromJSON(e,f);l!==n&&(i=u),n=l;break}}catch{}const o=t.filter(l=>l._shouldAllowMigration);return!n._shouldAllowMigration||!o.length?new p4(n,e,r):(n=o[0],i&&await n._set(s,i.toJSON()),await Promise.all(a.map(async l=>{if(l!==n)try{await l._remove(s)}catch{}})),new p4(n,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function La(c){const e=c.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(is(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ns(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ls(e))return"Blackberry";if(fs(e))return"Webos";if(k9(e))return"Safari";if((e.includes("chrome/")||ss(e))&&!e.includes("edge/"))return"Chrome";if(os(e))return"Android";{const a=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=c.match(a);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ns(c=F1()){return/firefox\//i.test(c)}function k9(c=F1()){const e=c.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ss(c=F1()){return/crios\//i.test(c)}function is(c=F1()){return/iemobile/i.test(c)}function os(c=F1()){return/android/i.test(c)}function ls(c=F1()){return/blackberry/i.test(c)}function fs(c=F1()){return/webos/i.test(c)}function I0(c=F1()){return/iphone|ipad|ipod/i.test(c)||/macintosh/i.test(c)&&/mobile/i.test(c)}function CL(c=F1()){var e;return I0(c)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function VL(){return TM()&&document.documentMode===10}function us(c=F1()){return I0(c)||os(c)||fs(c)||ls(c)||/windows phone/i.test(c)||is(c)}function ML(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hs(c,e=[]){let a;switch(c){case"Browser":a=La(F1());break;case"Worker":a=`${La(F1())}-${c}`;break;default:a=c}const r=e.length?e.join(","):"FirebaseCore-web";return`${a}/JsCore/${$6}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gL{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,a){const r=n=>new Promise((s,i)=>{try{const o=e(n);s(o)}catch(o){i(o)}});r.onAbort=a,this.queue.push(r);const t=this.queue.length-1;return()=>{this.queue[t]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const a=[];try{for(const r of this.queue)await r(e),r.onAbort&&a.push(r.onAbort)}catch(r){a.reverse();for(const t of a)try{t()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LL(c,e={}){return S3(c,"GET","/v2/passwordPolicy",Y3(c,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bL=6;class xL{constructor(e){var a,r,t,n;const s=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(a=s.minPasswordLength)!==null&&a!==void 0?a:bL,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),s.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),s.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),s.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),s.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(t=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&t!==void 0?t:"",this.forceUpgradeOnSignin=(n=e.forceUpgradeOnSignin)!==null&&n!==void 0?n:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var a,r,t,n,s,i;const o={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,o),this.validatePasswordCharacterOptions(e,o),o.isValid&&(o.isValid=(a=o.meetsMinPasswordLength)!==null&&a!==void 0?a:!0),o.isValid&&(o.isValid=(r=o.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),o.isValid&&(o.isValid=(t=o.containsLowercaseLetter)!==null&&t!==void 0?t:!0),o.isValid&&(o.isValid=(n=o.containsUppercaseLetter)!==null&&n!==void 0?n:!0),o.isValid&&(o.isValid=(s=o.containsNumericCharacter)!==null&&s!==void 0?s:!0),o.isValid&&(o.isValid=(i=o.containsNonAlphanumericCharacter)!==null&&i!==void 0?i:!0),o}validatePasswordLengthOptions(e,a){const r=this.customStrengthOptions.minPasswordLength,t=this.customStrengthOptions.maxPasswordLength;r&&(a.meetsMinPasswordLength=e.length>=r),t&&(a.meetsMaxPasswordLength=e.length<=t)}validatePasswordCharacterOptions(e,a){this.updatePasswordCharacterOptionsStatuses(a,!1,!1,!1,!1);let r;for(let t=0;t<e.length;t++)r=e.charAt(t),this.updatePasswordCharacterOptionsStatuses(a,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,a,r,t,n){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=a)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=t)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yL{constructor(e,a,r,t){this.app=e,this.heartbeatServiceProvider=a,this.appCheckServiceProvider=r,this.config=t,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ba(this),this.idTokenSubscription=new ba(this),this.beforeStateQueue=new gL(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Xn,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=t.sdkClientVersion}_initializeWithPersistence(e,a){return a&&(this._popupRedirectResolver=P2(a)),this._initializationPromise=this.queue(async()=>{var r,t;if(!this._deleted&&(this.persistenceManager=await p4.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(a),this.lastNotifiedUid=((t=this.currentUser)===null||t===void 0?void 0:t.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const a=await as(this,{idToken:e}),r=await T2._fromGetAccountInfoResponse(this,a,e);await this.directlySetCurrentUser(r)}catch(a){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",a),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var a;if(V2(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(i=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(i,i))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let t=r,n=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(a=this.redirectUser)===null||a===void 0?void 0:a._redirectEventId,i=t==null?void 0:t._redirectEventId,o=await this.tryRedirectSignIn(e);(!s||s===i)&&(o!=null&&o.user)&&(t=o.user,n=!0)}if(!t)return this.directlySetCurrentUser(null);if(!t._redirectEventId){if(n)try{await this.beforeStateQueue.runMiddleware(t)}catch(s){t=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return t?this.reloadAndSetCurrentUserOrClear(t):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===t._redirectEventId?this.directlySetCurrentUser(t):this.reloadAndSetCurrentUserOrClear(t)}async tryRedirectSignIn(e){let a=null;try{a=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return a}async reloadAndSetCurrentUserOrClear(e){try{await c0(e)}catch(a){if((a==null?void 0:a.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=tL()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(V2(this.app))return Promise.reject(z3(this));const a=e?y2(e):null;return a&&Q(a.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(a&&a._clone(this))}async _updateCurrentUser(e,a=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),a||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return V2(this.app)?Promise.reject(z3(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return V2(this.app)?Promise.reject(z3(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(P2(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const a=this._getPasswordPolicyInternal();return a.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):a.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await LL(this),a=new xL(e);this.tenantId===null?this._projectPasswordPolicy=a:this._tenantPasswordPolicies[this.tenantId]=a}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new W6("auth","Firebase",e())}onAuthStateChanged(e,a,r){return this.registerStateListener(this.authStateSubscription,e,a,r)}beforeAuthStateChanged(e,a){return this.beforeStateQueue.pushCallback(e,a)}onIdTokenChanged(e,a,r){return this.registerStateListener(this.idTokenSubscription,e,a,r)}authStateReady(){return new Promise((e,a)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},a)}})}async revokeAccessToken(e){if(this.currentUser){const a=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:a};this.tenantId!=null&&(r.tenantId=this.tenantId),await HL(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,a){const r=await this.getOrInitRedirectPersistenceManager(a);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const a=e&&P2(e)||this._popupRedirectResolver;Q(a,this,"argument-error"),this.redirectPersistenceManager=await p4.create(this,[P2(a._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var a,r;return this._isInitialized&&await this.queue(async()=>{}),((a=this._currentUser)===null||a===void 0?void 0:a._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,a;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(a=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&a!==void 0?a:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,a,r,t){if(this._deleted)return()=>{};const n=typeof a=="function"?a:a.next.bind(a);let s=!1;const i=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(i,this,"internal-error"),i.then(()=>{s||n(this.currentUser)}),typeof a=="function"){const o=e.addObserver(a,r,t);return()=>{s=!0,o()}}else{const o=e.addObserver(a);return()=>{s=!0,o()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=hs(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const a={"X-Client-Version":this.clientVersion};this.app.options.appId&&(a["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(a["X-Firebase-Client"]=r);const t=await this._getAppCheckToken();return t&&(a["X-Firebase-AppCheck"]=t),a}async _getAppCheckToken(){var e;const a=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return a!=null&&a.error&&cL(`Error while retrieving App Check token: ${a.error}`),a==null?void 0:a.token}}function X3(c){return y2(c)}class ba{constructor(e){this.auth=e,this.observer=null,this.addObserver=BM(a=>this.observer=a)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let D0={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function NL(c){D0=c}function ms(c){return D0.loadJS(c)}function SL(){return D0.recaptchaEnterpriseScript}function wL(){return D0.gapiScript}function AL(c){return`__${c}${Math.floor(Math.random()*1e6)}`}const _L="recaptcha-enterprise",kL="NO_RECAPTCHA";class EL{constructor(e){this.type=_L,this.auth=X3(e)}async verify(e="verify",a=!1){async function r(n){if(!a){if(n.tenantId==null&&n._agentRecaptchaConfig!=null)return n._agentRecaptchaConfig.siteKey;if(n.tenantId!=null&&n._tenantRecaptchaConfigs[n.tenantId]!==void 0)return n._tenantRecaptchaConfigs[n.tenantId].siteKey}return new Promise(async(s,i)=>{fL(n,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(o=>{if(o.recaptchaKey===void 0)i(new Error("recaptcha Enterprise site key undefined"));else{const l=new lL(o);return n.tenantId==null?n._agentRecaptchaConfig=l:n._tenantRecaptchaConfigs[n.tenantId]=l,s(l.siteKey)}}).catch(o=>{i(o)})})}function t(n,s,i){const o=window.grecaptcha;Ca(o)?o.enterprise.ready(()=>{o.enterprise.execute(n,{action:e}).then(l=>{s(l)}).catch(()=>{s(kL)})}):i(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((n,s)=>{r(this.auth).then(i=>{if(!a&&Ca(window.grecaptcha))t(i,n,s);else{if(typeof window>"u"){s(new Error("RecaptchaVerifier is only supported in browser"));return}let o=SL();o.length!==0&&(o+=i),ms(o).then(()=>{t(i,n,s)}).catch(l=>{s(l)})}}).catch(i=>{s(i)})})}}async function xa(c,e,a,r=!1){const t=new EL(c);let n;try{n=await t.verify(a)}catch{n=await t.verify(a,!0)}const s=Object.assign({},e);return r?Object.assign(s,{captchaResp:n}):Object.assign(s,{captchaResponse:n}),Object.assign(s,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(s,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),s}async function ya(c,e,a,r){var t;if(!((t=c._getRecaptchaConfig())===null||t===void 0)&&t.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const n=await xa(c,e,a,a==="getOobCode");return r(c,n)}else return r(c,e).catch(async n=>{if(n.code==="auth/missing-recaptcha-token"){console.log(`${a} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const s=await xa(c,e,a,a==="getOobCode");return r(c,s)}else return Promise.reject(n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TL(c,e){const a=Gn(c,"auth");if(a.isInitialized()){const t=a.getImmediate(),n=a.getOptions();if(Y8(n,e??{}))return t;s2(t,"already-initialized")}return a.initialize({options:e})}function PL(c,e){const a=(e==null?void 0:e.persistence)||[],r=(Array.isArray(a)?a:[a]).map(P2);e!=null&&e.errorMap&&c._updateErrorMap(e.errorMap),c._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function RL(c,e,a){const r=X3(c);Q(r._canInitEmulator,r,"emulator-config-failed"),Q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const t=!!(a!=null&&a.disableWarnings),n=vs(e),{host:s,port:i}=IL(e),o=i===null?"":`:${i}`;r.config.emulator={url:`${n}//${s}${o}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:s,port:i,protocol:n.replace(":",""),options:Object.freeze({disableWarnings:t})}),t||DL()}function vs(c){const e=c.indexOf(":");return e<0?"":c.substr(0,e+1)}function IL(c){const e=vs(c),a=/(\/\/)?([^?#/]+)/.exec(c.substr(e.length));if(!a)return{host:"",port:null};const r=a[2].split("@").pop()||"",t=/^(\[[^\]]+\])(:|$)/.exec(r);if(t){const n=t[1];return{host:n,port:Na(r.substr(n.length+1))}}else{const[n,s]=r.split(":");return{host:n,port:Na(s)}}}function Na(c){if(!c)return null;const e=Number(c);return isNaN(e)?null:e}function DL(){function c(){const e=document.createElement("p"),a=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",a.position="fixed",a.width="100%",a.backgroundColor="#ffffff",a.border=".1em solid #000000",a.color="#b50000",a.bottom="0px",a.left="0px",a.margin="0px",a.zIndex="10000",a.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",c):c())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E9{constructor(e,a){this.providerId=e,this.signInMethod=a}toJSON(){return E2("not implemented")}_getIdTokenResponse(e){return E2("not implemented")}_linkToIdToken(e,a){return E2("not implemented")}_getReauthenticationResolver(e){return E2("not implemented")}}async function OL(c,e){return S3(c,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FL(c,e){return R0(c,"POST","/v1/accounts:signInWithPassword",Y3(c,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BL(c,e){return R0(c,"POST","/v1/accounts:signInWithEmailLink",Y3(c,e))}async function UL(c,e){return R0(c,"POST","/v1/accounts:signInWithEmailLink",Y3(c,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N6 extends E9{constructor(e,a,r,t=null){super("password",r),this._email=e,this._password=a,this._tenantId=t}static _fromEmailAndPassword(e,a){return new N6(e,a,"password")}static _fromEmailAndCode(e,a,r=null){return new N6(e,a,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const a=typeof e=="string"?JSON.parse(e):e;if(a!=null&&a.email&&(a!=null&&a.password)){if(a.signInMethod==="password")return this._fromEmailAndPassword(a.email,a.password);if(a.signInMethod==="emailLink")return this._fromEmailAndCode(a.email,a.password,a.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const a={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ya(e,a,"signInWithPassword",FL);case"emailLink":return BL(e,{email:this._email,oobCode:this._password});default:s2(e,"internal-error")}}async _linkToIdToken(e,a){switch(this.signInMethod){case"password":const r={idToken:a,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ya(e,r,"signUpPassword",OL);case"emailLink":return UL(e,{idToken:a,email:this._email,oobCode:this._password});default:s2(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z4(c,e){return R0(c,"POST","/v1/accounts:signInWithIdp",Y3(c,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qL="http://localhost";class U2 extends E9{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const a=new U2(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(a.idToken=e.idToken),e.accessToken&&(a.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(a.nonce=e.nonce),e.pendingToken&&(a.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(a.accessToken=e.oauthToken,a.secret=e.oauthTokenSecret):s2("argument-error"),a}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const a=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:t}=a,n=N9(a,["providerId","signInMethod"]);if(!r||!t)return null;const s=new U2(r,t);return s.idToken=n.idToken||void 0,s.accessToken=n.accessToken||void 0,s.secret=n.secret,s.nonce=n.nonce,s.pendingToken=n.pendingToken||null,s}_getIdTokenResponse(e){const a=this.buildRequest();return z4(e,a)}_linkToIdToken(e,a){const r=this.buildRequest();return r.idToken=a,z4(e,r)}_getReauthenticationResolver(e){const a=this.buildRequest();return a.autoCreate=!1,z4(e,a)}buildRequest(){const e={requestUri:qL,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const a={};this.idToken&&(a.id_token=this.idToken),this.accessToken&&(a.access_token=this.accessToken),this.secret&&(a.oauth_token_secret=this.secret),a.providerId=this.providerId,this.nonce&&!this.pendingToken&&(a.nonce=this.nonce),e.postBody=j6(a)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WL(c){switch(c){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function jL(c){const e=J4(Y4(c)).link,a=e?J4(Y4(e)).deep_link_id:null,r=J4(Y4(c)).deep_link_id;return(r?J4(Y4(r)).link:null)||r||a||e||c}class T9{constructor(e){var a,r,t,n,s,i;const o=J4(Y4(e)),l=(a=o.apiKey)!==null&&a!==void 0?a:null,f=(r=o.oobCode)!==null&&r!==void 0?r:null,u=WL((t=o.mode)!==null&&t!==void 0?t:null);Q(l&&f&&u,"argument-error"),this.apiKey=l,this.operation=u,this.code=f,this.continueUrl=(n=o.continueUrl)!==null&&n!==void 0?n:null,this.languageCode=(s=o.languageCode)!==null&&s!==void 0?s:null,this.tenantId=(i=o.tenantId)!==null&&i!==void 0?i:null}static parseLink(e){const a=jL(e);try{return new T9(a)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O4{constructor(){this.providerId=O4.PROVIDER_ID}static credential(e,a){return N6._fromEmailAndPassword(e,a)}static credentialWithLink(e,a){const r=T9.parseLink(a);return Q(r,"argument-error"),N6._fromEmailAndCode(e,r.code,r.tenantId)}}O4.PROVIDER_ID="password";O4.EMAIL_PASSWORD_SIGN_IN_METHOD="password";O4.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P9{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F4 extends P9{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class P8 extends F4{static credentialFromJSON(e){const a=typeof e=="string"?JSON.parse(e):e;return Q("providerId"in a&&"signInMethod"in a,"argument-error"),U2._fromParams(a)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return Q(e.idToken||e.accessToken,"argument-error"),U2._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return P8.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return P8.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:a,oauthAccessToken:r,oauthTokenSecret:t,pendingToken:n,nonce:s,providerId:i}=e;if(!r&&!t&&!a&&!n||!i)return null;try{return new P8(i)._credential({idToken:a,accessToken:r,nonce:s,pendingToken:n})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o3 extends F4{constructor(){super("facebook.com")}static credential(e){return U2._fromParams({providerId:o3.PROVIDER_ID,signInMethod:o3.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return o3.credentialFromTaggedObject(e)}static credentialFromError(e){return o3.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return o3.credential(e.oauthAccessToken)}catch{return null}}}o3.FACEBOOK_SIGN_IN_METHOD="facebook.com";o3.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l3 extends F4{constructor(){super("google.com"),this.addScope("profile")}static credential(e,a){return U2._fromParams({providerId:l3.PROVIDER_ID,signInMethod:l3.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:a})}static credentialFromResult(e){return l3.credentialFromTaggedObject(e)}static credentialFromError(e){return l3.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:a,oauthAccessToken:r}=e;if(!a&&!r)return null;try{return l3.credential(a,r)}catch{return null}}}l3.GOOGLE_SIGN_IN_METHOD="google.com";l3.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f3 extends F4{constructor(){super("github.com")}static credential(e){return U2._fromParams({providerId:f3.PROVIDER_ID,signInMethod:f3.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return f3.credentialFromTaggedObject(e)}static credentialFromError(e){return f3.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return f3.credential(e.oauthAccessToken)}catch{return null}}}f3.GITHUB_SIGN_IN_METHOD="github.com";f3.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u3 extends F4{constructor(){super("twitter.com")}static credential(e,a){return U2._fromParams({providerId:u3.PROVIDER_ID,signInMethod:u3.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:a})}static credentialFromResult(e){return u3.credentialFromTaggedObject(e)}static credentialFromError(e){return u3.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:a,oauthTokenSecret:r}=e;if(!a||!r)return null;try{return u3.credential(a,r)}catch{return null}}}u3.TWITTER_SIGN_IN_METHOD="twitter.com";u3.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S4{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,a,r,t=!1){const n=await T2._fromIdTokenResponse(e,r,t),s=Sa(r);return new S4({user:n,providerId:s,_tokenResponse:r,operationType:a})}static async _forOperation(e,a,r){await e._updateTokensIfNecessary(r,!0);const t=Sa(r);return new S4({user:e,providerId:t,_tokenResponse:r,operationType:a})}}function Sa(c){return c.providerId?c.providerId:"phoneNumber"in c?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0 extends N3{constructor(e,a,r,t){var n;super(a.code,a.message),this.operationType=r,this.user=t,Object.setPrototypeOf(this,e0.prototype),this.customData={appName:e.name,tenantId:(n=e.tenantId)!==null&&n!==void 0?n:void 0,_serverResponse:a.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,a,r,t){return new e0(e,a,r,t)}}function ds(c,e,a,r){return(e==="reauthenticate"?a._getReauthenticationResolver(c):a._getIdTokenResponse(c)).catch(n=>{throw n.code==="auth/multi-factor-auth-required"?e0._fromErrorAndOperation(c,n,e,r):n})}async function $L(c,e,a=!1){const r=await y6(c,e._linkToIdToken(c.auth,await c.getIdToken()),a);return S4._forOperation(c,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GL(c,e,a=!1){const{auth:r}=c;if(V2(r.app))return Promise.reject(z3(r));const t="reauthenticate";try{const n=await y6(c,ds(r,t,e,c),a);Q(n.idToken,r,"internal-error");const s=_9(n.idToken);Q(s,r,"internal-error");const{sub:i}=s;return Q(c.uid===i,r,"user-mismatch"),S4._forOperation(c,t,n)}catch(n){throw(n==null?void 0:n.code)==="auth/user-not-found"&&s2(r,"user-mismatch"),n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ps(c,e,a=!1){if(V2(c.app))return Promise.reject(z3(c));const r="signIn",t=await ds(c,r,e),n=await S4._fromIdTokenResponse(c,r,t);return a||await c._updateCurrentUser(n.user),n}async function KL(c,e){return ps(X3(c),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZL(c){const e=X3(c);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function JL(c,e,a){return V2(c.app)?Promise.reject(z3(c)):KL(y2(c),O4.credential(e,a)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&ZL(c),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YL(c,e){return y2(c).setPersistence(e)}function XL(c,e,a,r){return y2(c).onIdTokenChanged(e,a,r)}function QL(c,e,a){return y2(c).beforeAuthStateChanged(e,a)}function cb(c,e,a,r){return y2(c).onAuthStateChanged(e,a,r)}function eb(c){return y2(c).signOut()}const a0="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,a){this.storageRetriever=e,this.type=a}_isAvailable(){try{return this.storage?(this.storage.setItem(a0,"1"),this.storage.removeItem(a0),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,a){return this.storage.setItem(e,JSON.stringify(a)),Promise.resolve()}_get(e){const a=this.storage.getItem(e);return Promise.resolve(a?JSON.parse(a):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ab(){const c=F1();return k9(c)||I0(c)}const rb=1e3,tb=10;class Hs extends zs{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,a)=>this.onStorageEvent(e,a),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=ab()&&ML(),this.fallbackToPolling=us(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const a of Object.keys(this.listeners)){const r=this.storage.getItem(a),t=this.localCache[a];r!==t&&e(a,t,r)}}onStorageEvent(e,a=!1){if(!e.key){this.forAllChangedKeys((s,i,o)=>{this.notifyListeners(s,o)});return}const r=e.key;if(a?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const s=this.storage.getItem(r);if(e.newValue!==s)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!a)return}const t=()=>{const s=this.storage.getItem(r);!a&&this.localCache[r]===s||this.notifyListeners(r,s)},n=this.storage.getItem(r);VL()&&n!==e.newValue&&e.newValue!==e.oldValue?setTimeout(t,tb):t()}notifyListeners(e,a){this.localCache[e]=a;const r=this.listeners[e];if(r)for(const t of Array.from(r))t(a&&JSON.parse(a))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,a,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:a,newValue:r}),!0)})},rb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,a){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(a)}_removeListener(e,a){this.listeners[e]&&(this.listeners[e].delete(a),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,a){await super._set(e,a),this.localCache[e]=JSON.stringify(a)}async _get(e){const a=await super._get(e);return this.localCache[e]=JSON.stringify(a),a}async _remove(e){await super._remove(e),delete this.localCache[e]}}Hs.type="LOCAL";const nb=Hs;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs extends zs{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,a){}_removeListener(e,a){}}Cs.type="SESSION";const R9=Cs;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sb(c){return Promise.all(c.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(a){return{fulfilled:!1,reason:a}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O0{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const a=this.receivers.find(t=>t.isListeningto(e));if(a)return a;const r=new O0(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const a=e,{eventId:r,eventType:t,data:n}=a.data,s=this.handlersMap[t];if(!(s!=null&&s.size))return;a.ports[0].postMessage({status:"ack",eventId:r,eventType:t});const i=Array.from(s).map(async l=>l(a.origin,n)),o=await sb(i);a.ports[0].postMessage({status:"done",eventId:r,eventType:t,response:o})}_subscribe(e,a){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(a)}_unsubscribe(e,a){this.handlersMap[e]&&a&&this.handlersMap[e].delete(a),(!a||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}O0.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I9(c="",e=10){let a="";for(let r=0;r<e;r++)a+=Math.floor(Math.random()*10);return c+a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ib{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,a,r=50){const t=typeof MessageChannel<"u"?new MessageChannel:null;if(!t)throw new Error("connection_unavailable");let n,s;return new Promise((i,o)=>{const l=I9("",20);t.port1.start();const f=setTimeout(()=>{o(new Error("unsupported_event"))},r);s={messageChannel:t,onMessage(u){const h=u;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(f),n=setTimeout(()=>{o(new Error("timeout"))},3e3);break;case"done":clearTimeout(n),i(h.data.response);break;default:clearTimeout(f),clearTimeout(n),o(new Error("invalid_response"));break}}},this.handlers.add(s),t.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:l,data:a},[t.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L2(){return window}function ob(c){L2().location.href=c}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(){return typeof L2().WorkerGlobalScope<"u"&&typeof L2().importScripts=="function"}async function lb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function fb(){var c;return((c=navigator==null?void 0:navigator.serviceWorker)===null||c===void 0?void 0:c.controller)||null}function ub(){return Vs()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ms="firebaseLocalStorageDb",hb=1,r0="firebaseLocalStorage",gs="fbase_key";class K6{constructor(e){this.request=e}toPromise(){return new Promise((e,a)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{a(this.request.error)})})}}function F0(c,e){return c.transaction([r0],e?"readwrite":"readonly").objectStore(r0)}function mb(){const c=indexedDB.deleteDatabase(Ms);return new K6(c).toPromise()}function C7(){const c=indexedDB.open(Ms,hb);return new Promise((e,a)=>{c.addEventListener("error",()=>{a(c.error)}),c.addEventListener("upgradeneeded",()=>{const r=c.result;try{r.createObjectStore(r0,{keyPath:gs})}catch(t){a(t)}}),c.addEventListener("success",async()=>{const r=c.result;r.objectStoreNames.contains(r0)?e(r):(r.close(),await mb(),e(await C7()))})})}async function wa(c,e,a){const r=F0(c,!0).put({[gs]:e,value:a});return new K6(r).toPromise()}async function vb(c,e){const a=F0(c,!1).get(e),r=await new K6(a).toPromise();return r===void 0?null:r.value}function Aa(c,e){const a=F0(c,!0).delete(e);return new K6(a).toPromise()}const db=800,pb=3;class Ls{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await C7(),this.db)}async _withRetries(e){let a=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(a++>pb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Vs()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=O0._getInstance(ub()),this.receiver._subscribe("keyChanged",async(e,a)=>({keyProcessed:(await this._poll()).includes(a.key)})),this.receiver._subscribe("ping",async(e,a)=>["keyChanged"])}async initializeSender(){var e,a;if(this.activeServiceWorker=await lb(),!this.activeServiceWorker)return;this.sender=new ib(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((a=r[0])===null||a===void 0)&&a.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||fb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await C7();return await wa(e,a0,"1"),await Aa(e,a0),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,a){return this._withPendingWrite(async()=>(await this._withRetries(r=>wa(r,e,a)),this.localCache[e]=a,this.notifyServiceWorker(e)))}async _get(e){const a=await this._withRetries(r=>vb(r,e));return this.localCache[e]=a,a}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(a=>Aa(a,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(t=>{const n=F0(t,!1).getAll();return new K6(n).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const a=[],r=new Set;if(e.length!==0)for(const{fbase_key:t,value:n}of e)r.add(t),JSON.stringify(this.localCache[t])!==JSON.stringify(n)&&(this.notifyListeners(t,n),a.push(t));for(const t of Object.keys(this.localCache))this.localCache[t]&&!r.has(t)&&(this.notifyListeners(t,null),a.push(t));return a}notifyListeners(e,a){this.localCache[e]=a;const r=this.listeners[e];if(r)for(const t of Array.from(r))t(a)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),db)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,a){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(a)}_removeListener(e,a){this.listeners[e]&&(this.listeners[e].delete(a),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ls.type="LOCAL";const zb=Ls;new G6(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bs(c,e){return e?P2(e):(Q(c._popupRedirectResolver,c,"argument-error"),c._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D9 extends E9{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return z4(e,this._buildIdpRequest())}_linkToIdToken(e,a){return z4(e,this._buildIdpRequest(a))}_getReauthenticationResolver(e){return z4(e,this._buildIdpRequest())}_buildIdpRequest(e){const a={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(a.idToken=e),a}}function Hb(c){return ps(c.auth,new D9(c),c.bypassAuthState)}function Cb(c){const{auth:e,user:a}=c;return Q(a,e,"internal-error"),GL(a,new D9(c),c.bypassAuthState)}async function Vb(c){const{auth:e,user:a}=c;return Q(a,e,"internal-error"),$L(a,new D9(c),c.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e,a,r,t,n=!1){this.auth=e,this.resolver=r,this.user=t,this.bypassAuthState=n,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(a)?a:[a]}execute(){return new Promise(async(e,a)=>{this.pendingPromise={resolve:e,reject:a};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:a,sessionId:r,postBody:t,tenantId:n,error:s,type:i}=e;if(s){this.reject(s);return}const o={auth:this.auth,requestUri:a,sessionId:r,tenantId:n||void 0,postBody:t||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(i)(o))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Hb;case"linkViaPopup":case"linkViaRedirect":return Vb;case"reauthViaPopup":case"reauthViaRedirect":return Cb;default:s2(this.auth,"internal-error")}}resolve(e){B2(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){B2(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb=new G6(2e3,1e4);async function ic1(c,e,a){if(V2(c.app))return Promise.reject(m2(c,"operation-not-supported-in-this-environment"));const r=X3(c);eL(c,e,P9);const t=bs(r,a);return new P3(r,"signInViaPopup",e,t).executeNotNull()}class P3 extends xs{constructor(e,a,r,t,n){super(e,a,t,n),this.provider=r,this.authWindow=null,this.pollId=null,P3.currentPopupAction&&P3.currentPopupAction.cancel(),P3.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){B2(this.filter.length===1,"Popup operations only handle one event");const e=I9();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(a=>{this.reject(a)}),this.resolver._isIframeWebStorageSupported(this.auth,a=>{a||this.reject(m2(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(m2(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,P3.currentPopupAction=null}pollUserCancellation(){const e=()=>{var a,r;if(!((r=(a=this.authWindow)===null||a===void 0?void 0:a.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(m2(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Mb.get())};e()}}P3.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gb="pendingRedirect",R8=new Map;class Lb extends xs{constructor(e,a,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],a,void 0,r),this.eventId=null}async execute(){let e=R8.get(this.auth._key());if(!e){try{const r=await bb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(a){e=()=>Promise.reject(a)}R8.set(this.auth._key(),e)}return this.bypassAuthState||R8.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const a=await this.auth._redirectUserForId(e.eventId);if(a)return this.user=a,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function bb(c,e){const a=Nb(e),r=yb(c);if(!await r._isAvailable())return!1;const t=await r._get(a)==="true";return await r._remove(a),t}function xb(c,e){R8.set(c._key(),e)}function yb(c){return P2(c._redirectPersistence)}function Nb(c){return T8(gb,c.config.apiKey,c.name)}async function Sb(c,e,a=!1){if(V2(c.app))return Promise.reject(z3(c));const r=X3(c),t=bs(r,e),s=await new Lb(r,t,a).execute();return s&&!a&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,e)),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wb=10*60*1e3;class Ab{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let a=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(a=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!_b(e)||(this.hasHandledPotentialRedirect=!0,a||(this.queuedRedirectEvent=e,a=!0)),a}sendToConsumer(e,a){var r;if(e.error&&!ys(e)){const t=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";a.onError(m2(this.auth,t))}else a.onAuthEvent(e)}isEventForConsumer(e,a){const r=a.eventId===null||!!e.eventId&&e.eventId===a.eventId;return a.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=wb&&this.cachedEventUids.clear(),this.cachedEventUids.has(_a(e))}saveEventToCache(e){this.cachedEventUids.add(_a(e)),this.lastProcessedEventTime=Date.now()}}function _a(c){return[c.type,c.eventId,c.sessionId,c.tenantId].filter(e=>e).join("-")}function ys({type:c,error:e}){return c==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function _b(c){switch(c.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ys(c);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kb(c,e={}){return S3(c,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Tb=/^https?/;async function Pb(c){if(c.config.emulator)return;const{authorizedDomains:e}=await kb(c);for(const a of e)try{if(Rb(a))return}catch{}s2(c,"unauthorized-domain")}function Rb(c){const e=z7(),{protocol:a,hostname:r}=new URL(e);if(c.startsWith("chrome-extension://")){const s=new URL(c);return s.hostname===""&&r===""?a==="chrome-extension:"&&c.replace("chrome-extension://","")===e.replace("chrome-extension://",""):a==="chrome-extension:"&&s.hostname===r}if(!Tb.test(a))return!1;if(Eb.test(c))return r===c;const t=c.replace(/\./g,"\\.");return new RegExp("^(.+\\."+t+"|"+t+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ib=new G6(3e4,6e4);function ka(){const c=L2().___jsl;if(c!=null&&c.H){for(const e of Object.keys(c.H))if(c.H[e].r=c.H[e].r||[],c.H[e].L=c.H[e].L||[],c.H[e].r=[...c.H[e].L],c.CP)for(let a=0;a<c.CP.length;a++)c.CP[a]=null}}function Db(c){return new Promise((e,a)=>{var r,t,n;function s(){ka(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ka(),a(m2(c,"network-request-failed"))},timeout:Ib.get()})}if(!((t=(r=L2().gapi)===null||r===void 0?void 0:r.iframes)===null||t===void 0)&&t.Iframe)e(gapi.iframes.getContext());else if(!((n=L2().gapi)===null||n===void 0)&&n.load)s();else{const i=AL("iframefcb");return L2()[i]=()=>{gapi.load?s():a(m2(c,"network-request-failed"))},ms(`${wL()}?onload=${i}`).catch(o=>a(o))}}).catch(e=>{throw I8=null,e})}let I8=null;function Ob(c){return I8=I8||Db(c),I8}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fb=new G6(5e3,15e3),Bb="__/auth/iframe",Ub="emulator/auth/iframe",qb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Wb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jb(c){const e=c.config;Q(e.authDomain,c,"auth-domain-config-required");const a=e.emulator?A9(e,Ub):`https://${c.config.authDomain}/${Bb}`,r={apiKey:e.apiKey,appName:c.name,v:$6},t=Wb.get(c.config.apiHost);t&&(r.eid=t);const n=c._getFrameworks();return n.length&&(r.fw=n.join(",")),`${a}?${j6(r).slice(1)}`}async function $b(c){const e=await Ob(c),a=L2().gapi;return Q(a,c,"internal-error"),e.open({where:document.body,url:jb(c),messageHandlersFilter:a.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:qb,dontclear:!0},r=>new Promise(async(t,n)=>{await r.restyle({setHideOnLeave:!1});const s=m2(c,"network-request-failed"),i=L2().setTimeout(()=>{n(s)},Fb.get());function o(){L2().clearTimeout(i),t(r)}r.ping(o).then(o,()=>{n(s)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Kb=500,Zb=600,Jb="_blank",Yb="http://localhost";class Ea{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Xb(c,e,a,r=Kb,t=Zb){const n=Math.max((window.screen.availHeight-t)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let i="";const o=Object.assign(Object.assign({},Gb),{width:r.toString(),height:t.toString(),top:n,left:s}),l=F1().toLowerCase();a&&(i=ss(l)?Jb:a),ns(l)&&(e=e||Yb,o.scrollbars="yes");const f=Object.entries(o).reduce((h,[p,H])=>`${h}${p}=${H},`,"");if(CL(l)&&i!=="_self")return Qb(e||"",i),new Ea(null);const u=window.open(e||"",i,f);Q(u,c,"popup-blocked");try{u.focus()}catch{}return new Ea(u)}function Qb(c,e){const a=document.createElement("a");a.href=c,a.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),a.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cx="__/auth/handler",ex="emulator/auth/handler",ax=encodeURIComponent("fac");async function Ta(c,e,a,r,t,n){Q(c.config.authDomain,c,"auth-domain-config-required"),Q(c.config.apiKey,c,"invalid-api-key");const s={apiKey:c.config.apiKey,appName:c.name,authType:a,redirectUrl:r,v:$6,eventId:t};if(e instanceof P9){e.setDefaultLanguage(c.languageCode),s.providerId=e.providerId||"",FM(e.getCustomParameters())||(s.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,u]of Object.entries(n||{}))s[f]=u}if(e instanceof F4){const f=e.getScopes().filter(u=>u!=="");f.length>0&&(s.scopes=f.join(","))}c.tenantId&&(s.tid=c.tenantId);const i=s;for(const f of Object.keys(i))i[f]===void 0&&delete i[f];const o=await c._getAppCheckToken(),l=o?`#${ax}=${encodeURIComponent(o)}`:"";return`${rx(c)}?${j6(i).slice(1)}${l}`}function rx({config:c}){return c.emulator?A9(c,ex):`https://${c.authDomain}/${cx}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w5="webStorageSupport";class tx{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=R9,this._completeRedirectFn=Sb,this._overrideRedirectResult=xb}async _openPopup(e,a,r,t){var n;B2((n=this.eventManagers[e._key()])===null||n===void 0?void 0:n.manager,"_initialize() not called before _openPopup()");const s=await Ta(e,a,r,z7(),t);return Xb(e,s,I9())}async _openRedirect(e,a,r,t){await this._originValidation(e);const n=await Ta(e,a,r,z7(),t);return ob(n),new Promise(()=>{})}_initialize(e){const a=e._key();if(this.eventManagers[a]){const{manager:t,promise:n}=this.eventManagers[a];return t?Promise.resolve(t):(B2(n,"If manager is not set, promise should be"),n)}const r=this.initAndGetManager(e);return this.eventManagers[a]={promise:r},r.catch(()=>{delete this.eventManagers[a]}),r}async initAndGetManager(e){const a=await $b(e),r=new Ab(e);return a.register("authEvent",t=>(Q(t==null?void 0:t.authEvent,e,"invalid-auth-event"),{status:r.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=a,r}_isIframeWebStorageSupported(e,a){this.iframes[e._key()].send(w5,{type:w5},t=>{var n;const s=(n=t==null?void 0:t[0])===null||n===void 0?void 0:n[w5];s!==void 0&&a(!!s),s2(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const a=e._key();return this.originValidationPromises[a]||(this.originValidationPromises[a]=Pb(e)),this.originValidationPromises[a]}get _shouldInitProactively(){return us()||k9()||I0()}}const nx=tx;var Pa="@firebase/auth",Ra="1.7.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sx{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const a=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,a),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const a=this.internalListeners.get(e);a&&(this.internalListeners.delete(e),a(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ix(c){switch(c){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ox(c){b6(new N4("auth",(e,{options:a})=>{const r=e.getProvider("app").getImmediate(),t=e.getProvider("heartbeat"),n=e.getProvider("app-check-internal"),{apiKey:s,authDomain:i}=r.options;Q(s&&!s.includes(":"),"invalid-api-key",{appName:r.name});const o={apiKey:s,authDomain:i,clientPlatform:c,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:hs(c)},l=new yL(r,t,n,o);return PL(l,a),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,a,r)=>{e.getProvider("auth-internal").initialize()})),b6(new N4("auth-internal",e=>{const a=X3(e.getProvider("auth").getImmediate());return(r=>new sx(r))(a)},"PRIVATE").setInstantiationMode("EXPLICIT")),v4(Pa,Ra,ix(c)),v4(Pa,Ra,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lx=5*60,fx=qn("authIdTokenMaxAge")||lx;let Ia=null;const ux=c=>async e=>{const a=e&&await e.getIdTokenResult(),r=a&&(new Date().getTime()-Date.parse(a.issuedAtTime))/1e3;if(r&&r>fx)return;const t=a==null?void 0:a.token;Ia!==t&&(Ia=t,await fetch(c,{method:t?"POST":"DELETE",headers:t?{Authorization:`Bearer ${t}`}:{}}))};function hx(c=Bg()){const e=Gn(c,"auth");if(e.isInitialized())return e.getImmediate();const a=TL(c,{popupRedirectResolver:nx,persistence:[zb,nb,R9]}),r=qn("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const n=new URL(r,location.origin);if(location.origin===n.origin){const s=ux(n.toString());QL(a,s,()=>s(a.currentUser)),XL(a,i=>s(i))}}const t=wM("auth");return t&&RL(a,`http://${t}`),a}function mx(){var c,e;return(e=(c=document.getElementsByTagName("head"))===null||c===void 0?void 0:c[0])!==null&&e!==void 0?e:document}NL({loadJS(c){return new Promise((e,a)=>{const r=document.createElement("script");r.setAttribute("src",c),r.onload=e,r.onerror=t=>{const n=m2("internal-error");n.customData=t,a(n)},r.type="text/javascript",r.charset="UTF-8",mx().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ox("Browser");const vx={apiKey:"AIzaSyDV0iiG9EJlf_hi-8viLx9dHhQX-JAF8ro",authDomain:"sara-aa130.firebaseapp.com",projectId:"sara-aa130",storageBucket:"sara-aa130.appspot.com",messagingSenderId:"749310641305",appId:"1:749310641305:web:6d477a92273c57a246a408",measurementId:"G-EZ6WNEXEVJ"},dx=Kn(vx),h3=hx(dx);YL(h3,R9);const R=MM.create({baseURL:"https://apisara.corpoamazonia.gov.co/api"});let A5=!1,V7=[];const px=c=>V7.push(c),zx=c=>{V7.map(e=>e(c)),V7=[]};R.interceptors.request.use(async c=>{const e=Hx("csrftoken");e&&(c.headers["X-CSRFToken"]=e),await new Promise(r=>{const t=h3.onAuthStateChanged(n=>{t(),r()})});const a=h3.currentUser;if(a){const r=await a.getIdToken(!0);c.headers.Authorization=`Bearer ${r}`}return c},c=>Promise.reject(c));R.interceptors.response.use(c=>c,async c=>{const e=c.config;if(c.response&&c.response.status===401&&!e._retry){if(A5)return new Promise(r=>{px(t=>{e.headers.Authorization="Bearer "+t,r(R(e))})});e._retry=!0,A5=!0;const a=h3.currentUser;if(a)try{const r=await a.getIdToken(!0);return zx(r),e.headers.Authorization="Bearer "+r,R(e)}catch(r){console.error("Error renovando token",r)}finally{A5=!1}}return Promise.reject(c)});function Hx(c){const a=`; ${document.cookie}`.split(`; ${c}=`);if(a.length===2)return a.pop().split(";").shift()}const Cx=Yt("authToken",()=>{const c=x1(null),e=x1(null),a=x1(null),r=x1(!1),t=x1(null),n=x1(!1),s=x1(null),i=pn(),o=()=>new Promise(x=>{cb(h3,async d=>{if(s.value=!0,d)try{c.value=await d.getIdToken(!0),r.value=!0,await l(c.value)}catch(m){console.error("Error al obtener el token:",m),p()}else p();s.value=!1,x()})}),l=async(x,d)=>{try{const m=await M7.loginFirebase(x,d);m.status===200&&(e.value=m.data.user_data,localStorage.setItem("user_data",JSON.stringify(m.data.user_data)),await f(e.value.email))}catch(m){console.error("Error al obtener datos del usuario:",m),p()}},f=async x=>{if(x){n.value=!0;try{const d=await M7.modulesUser(x);d.status===200?(t.value=d.data,localStorage.setItem("user_permissions",JSON.stringify(d.data))):console.error("Error al cargar los permisos del usuario:",d.statusText)}catch(d){console.error("Error al realizar la solicitud de permisos:",d)}finally{n.value=!1}}},u=async(x,d,m)=>{try{s.value=!0;const g=await JL(h3,x,d);return c.value=await g.user.getIdToken(),await l(c.value,m),{success:!0}}catch(g){return console.error("Error durante el inicio de sesión:",g),a.value=g.message,{success:!1,error:g.message}}finally{s.value=!1}},h=async()=>{try{await eb(h3),p(),i.push("/auth")}catch(x){console.error("Error durante el cierre de sesión:",x)}},p=()=>{c.value=null,e.value=null,r.value=!1,t.value=null,localStorage.removeItem("user_data"),localStorage.removeItem("user_permissions")},H=async()=>{const x=h3.currentUser;if(x)try{return await x.getIdToken(!0)}catch(d){return console.error("Error al obtener el token:",d),null}return null};return{userData:e,errorAuth:a,authActive:r,logout:h,userPermissions:t,isLoadingPermissions:n,loadUserPermissions:f,loginFirebase:u,checkAuth:async()=>{if(s.value&&await new Promise(x=>{const d=setInterval(()=>{s.value||(clearInterval(d),x())},100)}),!r.value){const x=await H();x&&(c.value=x,r.value=!0,await l(x))}return r.value},loading:s,initializeAuthListener:o,getToken:H}}),M7={getAuthToken(c,e){const a={...c,authType:e};return R.post("/auth/token/",a)},refreshAuthToken(c){return R.post("/auth/token/refresh/",c)},socialAuth(c){return R.post("/auth/callback",{code:c})},loginFirebase(c,e){return R.post("/auth/login",{token:c,recaptcha_token:e})},getRoles(){return R.get("/users/roles")},verifyTokenAuth(c){return R.post("/auth/verify-token",{token:c})},getSpecies(){return R.get("/species/")},addForestSpecies(c){return R.post("/species/",c)},updateForestSpecies(c,e){return R.put(`/species/${c}`,e)},deleteSpecies(c){return R.delete(`/species/${c}`)},lookSpecie(c){return R.get(`/species/search/code/${c}`)},getFamilies(){return R.get("/species/family/filter")},getFamiliesData(){return R.get("/species/families/")},lookFamily(c){return R.get(`/species/search/family/${c}`)},getDownloadDataSpecie(c){return R.get(`/species/profile/export/${c}`)},getSpeciesData(){return R.get("/species/report/general")},lookCandidateSpecie(c){return R.get(`/species/candidates/search/${c}`)},getGeoCandidateTrees(){return R.get("/candidates/geolocation")},getAverageCandidateTrees(){return R.get("/candidates/average")},getAssessmentData(){return R.get("/candidates/trees")},addCandidate(c){return R.post("/candidates/trees",c)},candidateExportXLSX(){return R.get("/candidates/export/all")},getMonitoringData(){return R.get("/monitoring/report/data")},getValuesByDepartment(){return R.get("/monitoring/report/general/total")},lookMonitoringCandidate(c){return R.get(`/monitoring/candidate/search/${c}`)},lookMonitoringSpecie(c){return R.get(`/monitoring/specie/search/${c}`)},getMonitoringCalendar(){return R.get("/monitoring/report/dataFlowerAndFruit")},getGlossary(){return R.get("/glossary")},getPageContent(){return R.get("/page/content")},pageContentGet(c){return R.get(`/page/content/${c}`)},pageContentCreate(c){return R.post("/page/content",c)},pageContentUpdate(c){return R.put(`/page/content/${c}`)},pageContentDelete(c){return R.delete(`/page/content/${c}`)},pageCountVisit(c){return R.get(`/page/count/${c}`)},pageTopSpecies(){return R.get("/page/top_species")},pagesGet(){return R.get("/page")},pagesUpdate(c){return R.put(`/page/${c}`)},pagesCreate(c){return R.post("/page",c)},pagesDelete(c){return R.delete(`/page/${c}`)},sectionGet(){return R.get("/page/section")},sectionUpdate(c,e){return R.put(`/page/section/${c}`,e)},sectionCreate(c){return R.post("/page/section",c)},sectionDelete(c){return R.delete(`/page/section/${c}`)},getSamplesData(){return R.get("/samples/report/data")},getUsers(){return R.get("/users/")},createUsers(c,e){return R.post("/users/",c,e)},updateUsers(c,e){return R.put(`/users/${c}`,e)},deleteUsers(c){return R.delete(`/users/${c}`)},modulesUser(c){return R.get("/users/modules",{params:{email:c}})},stateUsers(c,e){return R.put(`/users/state/${c}`,e)},getDepartments(){return R.get("/departments/")},getCities(){return R.get("/cities/")},getSisa(){return R.get("/utils/sisa/")},sendEmail(c){return R.post("/utils/send-email/",c)},listNurseries(){return R.get("/nurseries")},listNurseriesId(c){return R.get(`/nurseries/search/${c}`)},createNurseries(c){return R.post("/nurseries/",c)},updateNurseries(c,e){return R.put(`/nurseries/${c}`,e)},deleteNurseries(c){return R.delete(`/nurseries/${c}`)},listNurseriesAdmin(){return R.get("/nurseries/admin")},createNurseriesAssign(c){return R.post("/nurseries/admin",c)},updateNurseriesAssign(c,e){return R.put(`/nurseries/admin/${c}`,e)},deleteNurseriesAssign(c){return R.delete(`/nurseries/admin/${c}`)},getEmpiricalKnowledge(){return R.get("/empiricalknowledge")},listProperty(){return R.get("/property")},listPropertyId(c){return R.get(`/property/search/${c}`)},createProperty(c){return R.post("/property/",c)},updateProperty(c,e){return R.put(`/property/${c}`,e)},deleteProperty(c){return R.delete(`/property/${c}`)},listUsersProperty(){return R.get("/property/users/")},listUserSpeciesId(c){return R.get(`/property/users/${c}`)},createUsersProperty(c){return R.post("/property/users",c)},updateUsersProperty(c,e){return R.put(`/property/users/${c}`,e)},deleteUsersProperty(c){return R.delete(`/property/users/${c}`)}},oc1=Yt("home",()=>{const c=x1([]),e=x1(!1),a=pn();return{colaboradores:x1([{enlace:"https://minciencias.gov.co/",img:"/logos/mc-vida.png"},{enlace:"https://www.sgr.gov.co/",img:"/logos/sgr.png"},{enlace:"https://www.putumayo.gov.co/index.php/mi-departamento/presentacion",img:"/logos/gp.png"},{enlace:"https://itp.edu.co/ITP2022/",img:"/logos/itp.png"},{enlace:"https://www.caqueta.gov.co/",img:"/logos/gob_caqueta.png"}]),topSpecies:c,fetchData:async()=>{const{data:s}=await M7.pageTopSpecies();c.value=s},switchMaintenance:()=>{e.value=!e.value,e.value?a.push("/maintenance"):a.push("/")},maintenance:e}});const Vx="/logos/log_corpoamazonia_black.png";const Mx={},B0=c=>(Y7("data-v-4de78350"),c=c(),X7(),c),gx={class:"footer"},Lx={class:"contenedor"},bx={class:"footer__contenido"},xx={class:"footer__grid"},yx=B0(()=>s1("div",{class:"footer__logo"},[s1("img",{src:Vx,alt:"Logo de la empresa"})],-1)),Nx={class:"footer__info"},Sx={class:"footer__sedes"},wx={class:"footer__heading"},Ax=u9('<p class="footer__texto footer__texto--titulo" data-v-4de78350> Sede Principal Mocoa - Putumayo: </p><p class="footer__texto" data-v-4de78350>Cra. 17 14-85</p><p class="footer__texto" data-v-4de78350><span class="footer__texto footer__texto--titulo" data-v-4de78350>Tel: </span> +57 608 4201535, 4296642. </p><p class="footer__texto footer__texto--titulo" data-v-4de78350> Sede Territorial Amazonas: </p><p class="footer__texto" data-v-4de78350>Leticia, Cra. 11 12-45</p><p class="footer__texto footer__texto--titulo" data-v-4de78350> Sede Territorial Caqueta: </p><p class="footer__texto" data-v-4de78350> Florencia, Cra. 11 No. 5-67 Km 3 vía aeropuerto. </p>',7),_x={class:"footer__contacto"},kx={class:"footer__heading"},Ex=u9('<p class="footer__texto" data-v-4de78350> Línea directa nacional: <br data-v-4de78350>018000-930506 </p><p class="footer__texto" data-v-4de78350>Celular: 3152370176</p><p class="footer__texto" data-v-4de78350>Teléfono: (123) 456-7890</p><p class="footer__texto footer__texto--titulo" data-v-4de78350> Correo Electrónico: </p><p class="footer__texto" data-v-4de78350> correspondencia@corpoamazonia.gov.co </p>',5),Tx={class:"footer__ubicacion"},Px={class:"footer__heading"},Rx=B0(()=>s1("p",{class:"footer__texto footer__texto--titulo"},null,-1)),Ix=B0(()=>s1("p",{class:"footer__texto"}," Lunes a Viernes de 8:00 am a 12:00 m y de 2:00 a 6:00 pm ",-1)),Dx={class:"footer__social"},Ox={href:"https://www.facebook.com/Corpoamazonia/?ref=embed_page",target:"_blank"},Fx={href:"https://www.instagram.com/corpoamazonia1/",target:"_blank"},Bx={href:"https://x.com/Corpoamazonia1",target:"_blank"},Ux={href:"https://www.youtube.com/@corpoamazonia7563",target:"_blank"},qx=B0(()=>s1("p",{class:"copyright"},"todos los derechos reservados ©",-1));function Wx(c,e){const a=s9("font-awesome-icon");return O1(),F2("footer",gx,[s1("div",Lx,[s1("div",bx,[s1("div",xx,[yx,s1("div",Nx,[s1("div",Sx,[s1("h3",wx,[e1(a,{icon:["fas","building-wheat"]}),r2(" Sedes ")]),Ax]),s1("div",_x,[s1("h3",kx,[e1(a,{icon:["fas","phone-volume"]}),r2(" Contactos ")]),Ex]),s1("div",Tx,[s1("h3",Px,[e1(a,{icon:["fas","clock"],class:"mr-2"}),r2("Horario de atención ")]),Rx,Ix])]),s1("div",Dx,[s1("a",Ox,[e1(a,{icon:["fab","facebook"],class:"mr-2 s-icon"})]),s1("a",Fx,[e1(a,{icon:["fab","instagram"],class:"mr-2 s-icon"})]),s1("a",Bx,[e1(a,{icon:["fab","x-twitter"]})]),s1("a",Ux,[e1(a,{icon:["fab","youtube"],class:"s-icon"})])])])])]),qx])}const jx=A0(Mx,[["render",Wx],["__scopeId","data-v-4de78350"]]);const Ns=c=>(Y7("data-v-c401401f"),c=c(),X7(),c),$x={class:"nav__movil"},Gx={class:"navegacion__logo--movil"},Kx={class:"navegacion__logo"},Zx=Ns(()=>s1("img",{src:zn,alt:"Logotipo"},null,-1)),Jx={class:"navegacion__barra"},Yx=Ns(()=>s1("span",null,"Ingresar",-1)),Xx={__name:"NavBar",setup(c){const e=JC(),a=S1(()=>e.name==="glossary"||e.name==="auth"||e.name==="register"||e.name==="nursery"||e.name==="authVerify"||e.name==="signUpSuccess");console.log("current path",e.name);const r=x1(!0),t=()=>{r.value=!r.value};window.addEventListener("scroll",function(){n()});const n=()=>{var s=document.querySelector(".navegacion"),i=document.querySelectorAll(".navegacion__enlace");window.scrollY>70?(s.classList.add("background__ver"),i.forEach(function(o){o.classList.add("cambiar__fuente")})):(s.classList.remove("background__ver"),i.forEach(function(o){o.classList.remove("cambiar__fuente")}))};return(s,i)=>{const o=s9("font-awesome-icon");return O1(),F2("div",null,[s1("div",$x,[s1("div",Gx,[e1(N1(z2),{to:{name:"home"}},{default:Y1(()=>[s1("img",{src:zn,alt:"Logotipo",style:_4({display:r.value?"none":"block"})},null,4)]),_:1})]),s1("button",{onClick:t,id:"menu__movil",class:"menu__movil"},[r.value?(O1(),j3(o,{key:1,icon:["fas","x"]})):(O1(),j3(o,{key:0,icon:["fas","bars"]}))])]),s1("div",{id:"navegacion",class:X1(["navegacion",{navegacion__show:r.value}])},[s1("div",Kx,[e1(N1(z2),{to:{name:"home"}},{default:Y1(()=>[Zx]),_:1})]),s1("nav",Jx,[e1(N1(z2),{to:{name:"home"},class:X1(["navegacion__enlace",{glosario:a.value}]),onClick:t},{default:Y1(()=>[r2(" Inicio ")]),_:1},8,["class"]),e1(N1(z2),{to:{name:"especies"},class:X1(["navegacion__enlace",{glosario:a.value}]),onClick:t},{default:Y1(()=>[r2(" Especies ")]),_:1},8,["class"]),e1(N1(z2),{to:{name:"familias"},class:X1(["navegacion__enlace",{glosario:a.value}]),onClick:t},{default:Y1(()=>[r2(" Familias ")]),_:1},8,["class"]),e1(N1(z2),{to:{name:"glossary"},class:X1(["navegacion__enlace",{glosario:a.value}]),onClick:t},{default:Y1(()=>[r2(" Glosario ")]),_:1},8,["class"]),e1(N1(z2),{to:{name:"nurseries"},class:X1(["navegacion__enlace",{glosario:a.value}]),onClick:t},{default:Y1(()=>[r2(" Viveros ")]),_:1},8,["class"]),e1(N1(z2),{to:{name:"aboutus"},class:X1(["navegacion__enlace",{glosario:a.value}]),onClick:t},{default:Y1(()=>[r2(" Acerca de ")]),_:1},8,["class"]),e1(N1(z2),{onClick:t,to:{name:"auth"},class:"navegacion__enlace--loging"},{default:Y1(()=>[e1(o,{icon:["far","circle-user"]}),Yx]),_:1})])],2)])}}},Qx=A0(Xx,[["__scopeId","data-v-c401401f"]]),cy={__name:"GuestLayoutView",setup(c){return(e,a)=>(O1(),F2("div",null,[e1(Qx),s1("main",null,[e1(N1(H9))]),e1(jx)]))}},Ss=KC({history:hC("/"),routes:[{path:"/maintenance",name:"maintenance",component:()=>i1(()=>import("./MaintenanceView-f433c6c8.js"),[])},{path:"/",name:"guest",component:cy,meta:{isMaintenance:!0},children:[{path:"",name:"home",component:()=>i1(()=>import("./HomeView-95586de0.js"),["assets/HomeView-95586de0.js","assets/page-a6e96ceb.js","assets/modal-07ceaae3.js","assets/ButtonTop-90692b96.js","assets/ButtonTop-414694c0.css","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/consulta-e9495bee.js","assets/HomeView-de9a7abb.css"])},{path:"especies",name:"especies",component:()=>i1(()=>import("./SpeciesView-5ed5d159.js"),["assets/SpeciesView-5ed5d159.js","assets/species-f69c1e72.js","assets/modal-07ceaae3.js","assets/speciesData-733ef29c.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/ButtonTop-90692b96.js","assets/ButtonTop-414694c0.css","assets/consulta-e9495bee.js","assets/calendarMonitoring-65f3789f.js","assets/SpeciesView-270e6193.css"])},{path:"busqueda",name:"busqueda",component:()=>i1(()=>import("./specieSoughtView-d2f2599c.js"),["assets/specieSoughtView-d2f2599c.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/candidate-bb7863ad.js","assets/consulta-e9495bee.js","assets/modal-07ceaae3.js","assets/icon_tree_palm_pink-32875086.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/calendarMonitoring-65f3789f.js","assets/specieSoughtView-d238da41.css"])},{path:"familias",name:"familias",component:()=>i1(()=>import("./FamiliesView-54a32ee1.js"),["assets/FamiliesView-54a32ee1.js","assets/consulta-e9495bee.js","assets/modal-07ceaae3.js","assets/ButtonTop-90692b96.js","assets/ButtonTop-414694c0.css","assets/FamiliesView-ab8ae54b.css"])},{path:"glossary",name:"glossary",component:()=>i1(()=>import("./GlossaryView-9ced1a4b.js"),["assets/GlossaryView-9ced1a4b.js","assets/ButtonTop-90692b96.js","assets/ButtonTop-414694c0.css","assets/GlossaryView-0d9713b8.css"])},{path:"nurseries",name:"nurseries",component:()=>i1(()=>import("./NurseriesView-15f9ebb8.js"),["assets/NurseriesView-15f9ebb8.js","assets/nurseries-41941f5a.js","assets/ButtonTop-90692b96.js","assets/ButtonTop-414694c0.css","assets/NurseriesView-836c3fb3.css"])},{path:"nursery",name:"nursery",component:()=>i1(()=>import("./NurserySoughtView-0eed85a8.js"),["assets/NurserySoughtView-0eed85a8.js","assets/nurseries-41941f5a.js","assets/consulta-e9495bee.js","assets/modal-07ceaae3.js","assets/NurserySoughtView-9f9e38ce.css"])},{path:"acercade",name:"aboutus",component:()=>i1(()=>import("./AboutUsView-5eae7828.js"),["assets/AboutUsView-5eae7828.js","assets/page-a6e96ceb.js","assets/modal-07ceaae3.js","assets/ButtonTop-90692b96.js","assets/ButtonTop-414694c0.css","assets/AboutUsView-295b6e21.css"]),meta:{auth:!1}},{path:"auth",name:"auth",component:()=>i1(()=>import("./AuthView-bf651044.js"),["assets/AuthView-bf651044.js","assets/users-3018045e.js","assets/modal-07ceaae3.js","assets/locates-b3be1fc3.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/AuthView-83750531.css"])},{path:"auth/verify-Account",name:"authVerify",component:()=>i1(()=>import("./AuthVerifyView-95597ec4.js"),["assets/AuthVerifyView-95597ec4.js","assets/AuthVerifyView-902ad579.css"])},{path:"auth/signUp-success",name:"signUpSuccess",component:()=>i1(()=>import("./SingUpSuccess-875fe3ec.js"),["assets/SingUpSuccess-875fe3ec.js","assets/SingUpSuccess-6c70e7d6.css"])}]},{path:"/panel",name:"panel",component:()=>i1(()=>import("./PanelLayoutView-0e352661.js"),["assets/PanelLayoutView-0e352661.js","assets/SideBar-d660bd19.js","assets/SideBar-8bef3b9d.css","assets/PanelLayoutView-e53f4061.css"]),meta:{auth:!0,roles:["ADMINISTRADOR","is_superuser","is_staff"]},children:[{path:"home-panel",name:"home-panel",component:()=>i1(()=>import("./HomePanelView-44a66874.js"),["assets/HomePanelView-44a66874.js","assets/consulta-e9495bee.js","assets/modal-07ceaae3.js","assets/species-f69c1e72.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/HomePanelView-57050071.css"])},{path:"panel-especies",name:"panel-especies",component:()=>i1(()=>import("./SpeciesView-5ed5d159.js"),["assets/SpeciesView-5ed5d159.js","assets/species-f69c1e72.js","assets/modal-07ceaae3.js","assets/speciesData-733ef29c.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/ButtonTop-90692b96.js","assets/ButtonTop-414694c0.css","assets/consulta-e9495bee.js","assets/calendarMonitoring-65f3789f.js","assets/SpeciesView-270e6193.css"])},{path:"panel-busqueda",name:"panel-busqueda",component:()=>i1(()=>import("./specieSoughtView-d2f2599c.js"),["assets/specieSoughtView-d2f2599c.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/candidate-bb7863ad.js","assets/consulta-e9495bee.js","assets/modal-07ceaae3.js","assets/icon_tree_palm_pink-32875086.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/calendarMonitoring-65f3789f.js","assets/specieSoughtView-d238da41.css"])},{path:"panel-familias",name:"panel-familias",component:()=>i1(()=>import("./FamiliesView-54a32ee1.js"),["assets/FamiliesView-54a32ee1.js","assets/consulta-e9495bee.js","assets/modal-07ceaae3.js","assets/ButtonTop-90692b96.js","assets/ButtonTop-414694c0.css","assets/FamiliesView-ab8ae54b.css"])},{path:"assessment",name:"assessment",component:()=>i1(()=>import("./AssessmentListView-26cd2092.js"),["assets/AssessmentListView-26cd2092.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/modal-07ceaae3.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/species-f69c1e72.js","assets/candidate-bb7863ad.js","assets/AssessmentListView-184c7732.css"])},{path:"monitoring_data",name:"monitoring_data",component:()=>i1(()=>import("./MonitoringListView-71820bcb.js"),["assets/MonitoringListView-71820bcb.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/modal-07ceaae3.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/Alert-ecd7952e.js","assets/Alert-8a52daa4.css","assets/MonitoringListView-5f84e05d.css"])},{path:"samples_data",name:"samples_data",component:()=>i1(()=>import("./SamplesListView-ab7ea249.js"),["assets/SamplesListView-ab7ea249.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/SamplesListView-c8816bb1.css"])},{path:"list-species",name:"list-species",component:()=>i1(()=>import("./ListSpeciesView-3a202a3e.js"),["assets/ListSpeciesView-3a202a3e.js","assets/species-f69c1e72.js","assets/modal-07ceaae3.js","assets/SpecieCandidates-f37bba62.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/SpecieMonitoring-51e7251a.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/ListSpeciesView-e0b2ca8c.css"])},{path:"monitoring-species",name:"monitoring-species",component:()=>i1(()=>import("./MonitoringSpecieView-763ccc2d.js"),["assets/MonitoringSpecieView-763ccc2d.js","assets/Alert-ecd7952e.js","assets/Alert-8a52daa4.css","assets/SpecieMonitoring-51e7251a.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/MonitoringSpecieView-c4627fac.css"])},{path:"candidates-species",name:"candidates-species",component:()=>i1(()=>import("./ListCandidatesSpecie-22dfd7c5.js"),["assets/ListCandidatesSpecie-22dfd7c5.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/SpecieCandidates-f37bba62.js","assets/modal-07ceaae3.js","assets/ListCandidatesSpecie-fdae7dc8.css"])},{path:"species-data",name:"species-data",component:()=>i1(()=>import("./SpeciesDataView-6e80e2e8.js"),["assets/SpeciesDataView-6e80e2e8.js","assets/speciesData-733ef29c.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/SpeciesDataView-5445594a.css"])},{path:"map-general",name:"map-general",component:()=>i1(()=>import("./MapGeneralView-48ecbb04.js"),["assets/MapGeneralView-48ecbb04.js","assets/icon_tree_palm_pink-32875086.js","assets/candidate-bb7863ad.js","assets/species-f69c1e72.js","assets/modal-07ceaae3.js","assets/locates-b3be1fc3.js","assets/MapGeneralView-c975b17b.css"])}]},{path:"/admin",name:"admin",component:()=>i1(()=>import("./AdminLayoutView-69e75c51.js"),["assets/AdminLayoutView-69e75c51.js","assets/SideBar-d660bd19.js","assets/SideBar-8bef3b9d.css","assets/AdminLayoutView-da11b536.css"]),meta:{auth:!0,roles:["ADMINISTRADOR","is_superuser","is_staff"]},children:[{path:"users",name:"users",component:()=>i1(()=>import("./UsersView-889b4364.js"),["assets/UsersView-889b4364.js","assets/users-3018045e.js","assets/modal-07ceaae3.js","assets/locates-b3be1fc3.js","assets/ModalProperty-fbd8cf14.js","assets/ModalProperty-ac181eae.css","assets/nurseries-645ef53f.js","assets/species-f69c1e72.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/UsersView-f0b5cd4a.css"])},{path:"species",name:"species",component:()=>i1(()=>import("./ForestSpeciesView-5c83c1ab.js"),["assets/ForestSpeciesView-5c83c1ab.js","assets/species-f69c1e72.js","assets/modal-07ceaae3.js","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/ForestSpeciesView-eabd0743.css"])},{path:"add-candidates",name:"add-candidates",component:()=>i1(()=>import("./AddCandidateView-2f554ef4.js"),["assets/AddCandidateView-2f554ef4.js","assets/species-f69c1e72.js","assets/modal-07ceaae3.js","assets/candidate-bb7863ad.js","assets/AddCandidateView-a2729086.css"])},{path:"pages",name:"pages",component:()=>i1(()=>import("./PagesListView-293c554e.js"),["assets/PagesListView-293c554e.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/page-a6e96ceb.js","assets/modal-07ceaae3.js","assets/icon-design-page-565f52eb.js","assets/PagesListView-e5d6f7e2.css","assets/LoadingData-1627378f.css"])},{path:"sections",name:"sections",component:()=>i1(()=>import("./SectionsListView-f5c92999.js"),["assets/SectionsListView-f5c92999.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/page-a6e96ceb.js","assets/modal-07ceaae3.js","assets/icon-design-page-565f52eb.js","assets/SectionsListView-19c1fce6.css","assets/LoadingData-1627378f.css"])},{path:"nurseries_adm",name:"nurseries_adm",component:()=>i1(()=>import("./NurseriesView-b5bff84e.js"),["assets/NurseriesView-b5bff84e.js","assets/nurseries-645ef53f.js","assets/modal-07ceaae3.js","assets/users-3018045e.js","assets/locates-b3be1fc3.js","assets/species-f69c1e72.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/NurseriesView-96032086.css"])},{path:"property",name:"property",component:()=>i1(()=>import("./PropertyView-5aca2393.js"),["assets/PropertyView-5aca2393.js","assets/ModalProperty-fbd8cf14.js","assets/modal-07ceaae3.js","assets/locates-b3be1fc3.js","assets/ModalProperty-ac181eae.css","assets/index-8422d5f6.js","assets/jspdf.plugin.autotable-7b5e9f4b.js","assets/LoadingData-b11b812f.js","assets/LoadingData-1627378f.css","assets/PropertyView-b6d420f9.css"])}]}]});Ss.beforeEach(async(c,e,a)=>{const r=Cx();c.matched.some(n=>n.meta.requiresAuth)?await r.checkAuth()?a():a("/auth"):a()});function Da(c,e){var a=Object.keys(c);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(c);e&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(c,t).enumerable})),a.push.apply(a,r)}return a}function U(c){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?Da(Object(a),!0).forEach(function(r){k1(c,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(a)):Da(Object(a)).forEach(function(r){Object.defineProperty(c,r,Object.getOwnPropertyDescriptor(a,r))})}return c}function t0(c){"@babel/helpers - typeof";return t0=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t0(c)}function ey(c,e){if(!(c instanceof e))throw new TypeError("Cannot call a class as a function")}function Oa(c,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(c,r.key,r)}}function ay(c,e,a){return e&&Oa(c.prototype,e),a&&Oa(c,a),Object.defineProperty(c,"prototype",{writable:!1}),c}function k1(c,e,a){return e in c?Object.defineProperty(c,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):c[e]=a,c}function O9(c,e){return ty(c)||sy(c,e)||ws(c,e)||oy()}function Z6(c){return ry(c)||ny(c)||ws(c)||iy()}function ry(c){if(Array.isArray(c))return g7(c)}function ty(c){if(Array.isArray(c))return c}function ny(c){if(typeof Symbol<"u"&&c[Symbol.iterator]!=null||c["@@iterator"]!=null)return Array.from(c)}function sy(c,e){var a=c==null?null:typeof Symbol<"u"&&c[Symbol.iterator]||c["@@iterator"];if(a!=null){var r=[],t=!0,n=!1,s,i;try{for(a=a.call(c);!(t=(s=a.next()).done)&&(r.push(s.value),!(e&&r.length===e));t=!0);}catch(o){n=!0,i=o}finally{try{!t&&a.return!=null&&a.return()}finally{if(n)throw i}}return r}}function ws(c,e){if(c){if(typeof c=="string")return g7(c,e);var a=Object.prototype.toString.call(c).slice(8,-1);if(a==="Object"&&c.constructor&&(a=c.constructor.name),a==="Map"||a==="Set")return Array.from(c);if(a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return g7(c,e)}}function g7(c,e){(e==null||e>c.length)&&(e=c.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=c[a];return r}function iy(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oy(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Fa=function(){},F9={},As={},_s=null,ks={mark:Fa,measure:Fa};try{typeof window<"u"&&(F9=window),typeof document<"u"&&(As=document),typeof MutationObserver<"u"&&(_s=MutationObserver),typeof performance<"u"&&(ks=performance)}catch{}var ly=F9.navigator||{},Ba=ly.userAgent,Ua=Ba===void 0?"":Ba,b3=F9,g1=As,qa=_s,H8=ks;b3.document;var K2=!!g1.documentElement&&!!g1.head&&typeof g1.addEventListener=="function"&&typeof g1.createElement=="function",Es=~Ua.indexOf("MSIE")||~Ua.indexOf("Trident/"),C8,V8,M8,g8,L8,q2="___FONT_AWESOME___",L7=16,Ts="fa",Ps="svg-inline--fa",G3="data-fa-i2svg",b7="data-fa-pseudo-element",fy="data-fa-pseudo-element-pending",B9="data-prefix",U9="data-icon",Wa="fontawesome-i2svg",uy="async",hy=["HTML","HEAD","STYLE","SCRIPT"],Rs=function(){try{return!0}catch{return!1}}(),M1="classic",y1="sharp",q9=[M1,y1];function J6(c){return new Proxy(c,{get:function(a,r){return r in a?a[r]:a[M1]}})}var S6=J6((C8={},k1(C8,M1,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),k1(C8,y1,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),C8)),w6=J6((V8={},k1(V8,M1,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),k1(V8,y1,{solid:"fass",regular:"fasr",light:"fasl"}),V8)),A6=J6((M8={},k1(M8,M1,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),k1(M8,y1,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),M8)),my=J6((g8={},k1(g8,M1,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),k1(g8,y1,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),g8)),vy=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,Is="fa-layers-text",dy=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,py=J6((L8={},k1(L8,M1,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),k1(L8,y1,{900:"fass",400:"fasr",300:"fasl"}),L8)),Ds=[1,2,3,4,5,6,7,8,9,10],zy=Ds.concat([11,12,13,14,15,16,17,18,19,20]),Hy=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],R3={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},_6=new Set;Object.keys(w6[M1]).map(_6.add.bind(_6));Object.keys(w6[y1]).map(_6.add.bind(_6));var Cy=[].concat(q9,Z6(_6),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",R3.GROUP,R3.SWAP_OPACITY,R3.PRIMARY,R3.SECONDARY]).concat(Ds.map(function(c){return"".concat(c,"x")})).concat(zy.map(function(c){return"w-".concat(c)})),f6=b3.FontAwesomeConfig||{};function Vy(c){var e=g1.querySelector("script["+c+"]");if(e)return e.getAttribute(c)}function My(c){return c===""?!0:c==="false"?!1:c==="true"?!0:c}if(g1&&typeof g1.querySelector=="function"){var gy=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];gy.forEach(function(c){var e=O9(c,2),a=e[0],r=e[1],t=My(Vy(a));t!=null&&(f6[r]=t)})}var Os={styleDefault:"solid",familyDefault:"classic",cssPrefix:Ts,replacementClass:Ps,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};f6.familyPrefix&&(f6.cssPrefix=f6.familyPrefix);var w4=U(U({},Os),f6);w4.autoReplaceSvg||(w4.observeMutations=!1);var K={};Object.keys(Os).forEach(function(c){Object.defineProperty(K,c,{enumerable:!0,set:function(a){w4[c]=a,u6.forEach(function(r){return r(K)})},get:function(){return w4[c]}})});Object.defineProperty(K,"familyPrefix",{enumerable:!0,set:function(e){w4.cssPrefix=e,u6.forEach(function(a){return a(K)})},get:function(){return w4.cssPrefix}});b3.FontAwesomeConfig=K;var u6=[];function Ly(c){return u6.push(c),function(){u6.splice(u6.indexOf(c),1)}}var a3=L7,M2={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function by(c){if(!(!c||!K2)){var e=g1.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=c;for(var a=g1.head.childNodes,r=null,t=a.length-1;t>-1;t--){var n=a[t],s=(n.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=n)}return g1.head.insertBefore(e,r),c}}var xy="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function k6(){for(var c=12,e="";c-- >0;)e+=xy[Math.random()*62|0];return e}function B4(c){for(var e=[],a=(c||[]).length>>>0;a--;)e[a]=c[a];return e}function W9(c){return c.classList?B4(c.classList):(c.getAttribute("class")||"").split(" ").filter(function(e){return e})}function Fs(c){return"".concat(c).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function yy(c){return Object.keys(c||{}).reduce(function(e,a){return e+"".concat(a,'="').concat(Fs(c[a]),'" ')},"").trim()}function U0(c){return Object.keys(c||{}).reduce(function(e,a){return e+"".concat(a,": ").concat(c[a].trim(),";")},"")}function j9(c){return c.size!==M2.size||c.x!==M2.x||c.y!==M2.y||c.rotate!==M2.rotate||c.flipX||c.flipY}function Ny(c){var e=c.transform,a=c.containerWidth,r=c.iconWidth,t={transform:"translate(".concat(a/2," 256)")},n="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),i="rotate(".concat(e.rotate," 0 0)"),o={transform:"".concat(n," ").concat(s," ").concat(i)},l={transform:"translate(".concat(r/2*-1," -256)")};return{outer:t,inner:o,path:l}}function Sy(c){var e=c.transform,a=c.width,r=a===void 0?L7:a,t=c.height,n=t===void 0?L7:t,s=c.startCentered,i=s===void 0?!1:s,o="";return i&&Es?o+="translate(".concat(e.x/a3-r/2,"em, ").concat(e.y/a3-n/2,"em) "):i?o+="translate(calc(-50% + ".concat(e.x/a3,"em), calc(-50% + ").concat(e.y/a3,"em)) "):o+="translate(".concat(e.x/a3,"em, ").concat(e.y/a3,"em) "),o+="scale(".concat(e.size/a3*(e.flipX?-1:1),", ").concat(e.size/a3*(e.flipY?-1:1),") "),o+="rotate(".concat(e.rotate,"deg) "),o}var wy=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Bs(){var c=Ts,e=Ps,a=K.cssPrefix,r=K.replacementClass,t=wy;if(a!==c||r!==e){var n=new RegExp("\\.".concat(c,"\\-"),"g"),s=new RegExp("\\--".concat(c,"\\-"),"g"),i=new RegExp("\\.".concat(e),"g");t=t.replace(n,".".concat(a,"-")).replace(s,"--".concat(a,"-")).replace(i,".".concat(r))}return t}var ja=!1;function _5(){K.autoAddCss&&!ja&&(by(Bs()),ja=!0)}var Ay={mixout:function(){return{dom:{css:Bs,insertCss:_5}}},hooks:function(){return{beforeDOMElementCreation:function(){_5()},beforeI2svg:function(){_5()}}}},W2=b3||{};W2[q2]||(W2[q2]={});W2[q2].styles||(W2[q2].styles={});W2[q2].hooks||(W2[q2].hooks={});W2[q2].shims||(W2[q2].shims=[]);var u2=W2[q2],Us=[],_y=function c(){g1.removeEventListener("DOMContentLoaded",c),n0=1,Us.map(function(e){return e()})},n0=!1;K2&&(n0=(g1.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(g1.readyState),n0||g1.addEventListener("DOMContentLoaded",_y));function ky(c){K2&&(n0?setTimeout(c,0):Us.push(c))}function Y6(c){var e=c.tag,a=c.attributes,r=a===void 0?{}:a,t=c.children,n=t===void 0?[]:t;return typeof c=="string"?Fs(c):"<".concat(e," ").concat(yy(r),">").concat(n.map(Y6).join(""),"</").concat(e,">")}function $a(c,e,a){if(c&&c[e]&&c[e][a])return{prefix:e,iconName:a,icon:c[e][a]}}var Ey=function(e,a){return function(r,t,n,s){return e.call(a,r,t,n,s)}},k5=function(e,a,r,t){var n=Object.keys(e),s=n.length,i=t!==void 0?Ey(a,t):a,o,l,f;for(r===void 0?(o=1,f=e[n[0]]):(o=0,f=r);o<s;o++)l=n[o],f=i(f,e[l],l,e);return f};function Ty(c){for(var e=[],a=0,r=c.length;a<r;){var t=c.charCodeAt(a++);if(t>=55296&&t<=56319&&a<r){var n=c.charCodeAt(a++);(n&64512)==56320?e.push(((t&1023)<<10)+(n&1023)+65536):(e.push(t),a--)}else e.push(t)}return e}function x7(c){var e=Ty(c);return e.length===1?e[0].toString(16):null}function Py(c,e){var a=c.length,r=c.charCodeAt(e),t;return r>=55296&&r<=56319&&a>e+1&&(t=c.charCodeAt(e+1),t>=56320&&t<=57343)?(r-55296)*1024+t-56320+65536:r}function Ga(c){return Object.keys(c).reduce(function(e,a){var r=c[a],t=!!r.icon;return t?e[r.iconName]=r.icon:e[a]=r,e},{})}function y7(c,e){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,t=r===void 0?!1:r,n=Ga(e);typeof u2.hooks.addPack=="function"&&!t?u2.hooks.addPack(c,Ga(e)):u2.styles[c]=U(U({},u2.styles[c]||{}),n),c==="fas"&&y7("fa",e)}var b8,x8,y8,s4=u2.styles,Ry=u2.shims,Iy=(b8={},k1(b8,M1,Object.values(A6[M1])),k1(b8,y1,Object.values(A6[y1])),b8),$9=null,qs={},Ws={},js={},$s={},Gs={},Dy=(x8={},k1(x8,M1,Object.keys(S6[M1])),k1(x8,y1,Object.keys(S6[y1])),x8);function Oy(c){return~Cy.indexOf(c)}function Fy(c,e){var a=e.split("-"),r=a[0],t=a.slice(1).join("-");return r===c&&t!==""&&!Oy(t)?t:null}var Ks=function(){var e=function(n){return k5(s4,function(s,i,o){return s[o]=k5(i,n,{}),s},{})};qs=e(function(t,n,s){if(n[3]&&(t[n[3]]=s),n[2]){var i=n[2].filter(function(o){return typeof o=="number"});i.forEach(function(o){t[o.toString(16)]=s})}return t}),Ws=e(function(t,n,s){if(t[s]=s,n[2]){var i=n[2].filter(function(o){return typeof o=="string"});i.forEach(function(o){t[o]=s})}return t}),Gs=e(function(t,n,s){var i=n[2];return t[s]=s,i.forEach(function(o){t[o]=s}),t});var a="far"in s4||K.autoFetchSvg,r=k5(Ry,function(t,n){var s=n[0],i=n[1],o=n[2];return i==="far"&&!a&&(i="fas"),typeof s=="string"&&(t.names[s]={prefix:i,iconName:o}),typeof s=="number"&&(t.unicodes[s.toString(16)]={prefix:i,iconName:o}),t},{names:{},unicodes:{}});js=r.names,$s=r.unicodes,$9=q0(K.styleDefault,{family:K.familyDefault})};Ly(function(c){$9=q0(c.styleDefault,{family:K.familyDefault})});Ks();function G9(c,e){return(qs[c]||{})[e]}function By(c,e){return(Ws[c]||{})[e]}function I3(c,e){return(Gs[c]||{})[e]}function Zs(c){return js[c]||{prefix:null,iconName:null}}function Uy(c){var e=$s[c],a=G9("fas",c);return e||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function x3(){return $9}var K9=function(){return{prefix:null,iconName:null,rest:[]}};function q0(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.family,r=a===void 0?M1:a,t=S6[r][c],n=w6[r][c]||w6[r][t],s=c in u2.styles?c:null;return n||s||null}var Ka=(y8={},k1(y8,M1,Object.keys(A6[M1])),k1(y8,y1,Object.keys(A6[y1])),y8);function W0(c){var e,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.skipLookups,t=r===void 0?!1:r,n=(e={},k1(e,M1,"".concat(K.cssPrefix,"-").concat(M1)),k1(e,y1,"".concat(K.cssPrefix,"-").concat(y1)),e),s=null,i=M1;(c.includes(n[M1])||c.some(function(l){return Ka[M1].includes(l)}))&&(i=M1),(c.includes(n[y1])||c.some(function(l){return Ka[y1].includes(l)}))&&(i=y1);var o=c.reduce(function(l,f){var u=Fy(K.cssPrefix,f);if(s4[f]?(f=Iy[i].includes(f)?my[i][f]:f,s=f,l.prefix=f):Dy[i].indexOf(f)>-1?(s=f,l.prefix=q0(f,{family:i})):u?l.iconName=u:f!==K.replacementClass&&f!==n[M1]&&f!==n[y1]&&l.rest.push(f),!t&&l.prefix&&l.iconName){var h=s==="fa"?Zs(l.iconName):{},p=I3(l.prefix,l.iconName);h.prefix&&(s=null),l.iconName=h.iconName||p||l.iconName,l.prefix=h.prefix||l.prefix,l.prefix==="far"&&!s4.far&&s4.fas&&!K.autoFetchSvg&&(l.prefix="fas")}return l},K9());return(c.includes("fa-brands")||c.includes("fab"))&&(o.prefix="fab"),(c.includes("fa-duotone")||c.includes("fad"))&&(o.prefix="fad"),!o.prefix&&i===y1&&(s4.fass||K.autoFetchSvg)&&(o.prefix="fass",o.iconName=I3(o.prefix,o.iconName)||o.iconName),(o.prefix==="fa"||s==="fa")&&(o.prefix=x3()||"fas"),o}var qy=function(){function c(){ey(this,c),this.definitions={}}return ay(c,[{key:"add",value:function(){for(var a=this,r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];var s=t.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(i){a.definitions[i]=U(U({},a.definitions[i]||{}),s[i]),y7(i,s[i]);var o=A6[M1][i];o&&y7(o,s[i]),Ks()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var t=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(t).map(function(n){var s=t[n],i=s.prefix,o=s.iconName,l=s.icon,f=l[2];a[i]||(a[i]={}),f.length>0&&f.forEach(function(u){typeof u=="string"&&(a[i][u]=l)}),a[i][o]=l}),a}}]),c}(),Za=[],i4={},H4={},Wy=Object.keys(H4);function jy(c,e){var a=e.mixoutsTo;return Za=c,i4={},Object.keys(H4).forEach(function(r){Wy.indexOf(r)===-1&&delete H4[r]}),Za.forEach(function(r){var t=r.mixout?r.mixout():{};if(Object.keys(t).forEach(function(s){typeof t[s]=="function"&&(a[s]=t[s]),t0(t[s])==="object"&&Object.keys(t[s]).forEach(function(i){a[s]||(a[s]={}),a[s][i]=t[s][i]})}),r.hooks){var n=r.hooks();Object.keys(n).forEach(function(s){i4[s]||(i4[s]=[]),i4[s].push(n[s])})}r.provides&&r.provides(H4)}),a}function N7(c,e){for(var a=arguments.length,r=new Array(a>2?a-2:0),t=2;t<a;t++)r[t-2]=arguments[t];var n=i4[c]||[];return n.forEach(function(s){e=s.apply(null,[e].concat(r))}),e}function K3(c){for(var e=arguments.length,a=new Array(e>1?e-1:0),r=1;r<e;r++)a[r-1]=arguments[r];var t=i4[c]||[];t.forEach(function(n){n.apply(null,a)})}function j2(){var c=arguments[0],e=Array.prototype.slice.call(arguments,1);return H4[c]?H4[c].apply(null,e):void 0}function S7(c){c.prefix==="fa"&&(c.prefix="fas");var e=c.iconName,a=c.prefix||x3();if(e)return e=I3(a,e)||e,$a(Js.definitions,a,e)||$a(u2.styles,a,e)}var Js=new qy,$y=function(){K.autoReplaceSvg=!1,K.observeMutations=!1,K3("noAuto")},Gy={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return K2?(K3("beforeI2svg",e),j2("pseudoElements2svg",e),j2("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=e.autoReplaceSvgRoot;K.autoReplaceSvg===!1&&(K.autoReplaceSvg=!0),K.observeMutations=!0,ky(function(){Zy({autoReplaceSvgRoot:a}),K3("watch",e)})}},Ky={icon:function(e){if(e===null)return null;if(t0(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:I3(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var a=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],r=q0(e[0]);return{prefix:r,iconName:I3(r,a)||a}}if(typeof e=="string"&&(e.indexOf("".concat(K.cssPrefix,"-"))>-1||e.match(vy))){var t=W0(e.split(" "),{skipLookups:!0});return{prefix:t.prefix||x3(),iconName:I3(t.prefix,t.iconName)||t.iconName}}if(typeof e=="string"){var n=x3();return{prefix:n,iconName:I3(n,e)||e}}}},e2={noAuto:$y,config:K,dom:Gy,parse:Ky,library:Js,findIconDefinition:S7,toHtml:Y6},Zy=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=e.autoReplaceSvgRoot,r=a===void 0?g1:a;(Object.keys(u2.styles).length>0||K.autoFetchSvg)&&K2&&K.autoReplaceSvg&&e2.dom.i2svg({node:r})};function j0(c,e){return Object.defineProperty(c,"abstract",{get:e}),Object.defineProperty(c,"html",{get:function(){return c.abstract.map(function(r){return Y6(r)})}}),Object.defineProperty(c,"node",{get:function(){if(K2){var r=g1.createElement("div");return r.innerHTML=c.html,r.children}}}),c}function Jy(c){var e=c.children,a=c.main,r=c.mask,t=c.attributes,n=c.styles,s=c.transform;if(j9(s)&&a.found&&!r.found){var i=a.width,o=a.height,l={x:i/o/2,y:.5};t.style=U0(U(U({},n),{},{"transform-origin":"".concat(l.x+s.x/16,"em ").concat(l.y+s.y/16,"em")}))}return[{tag:"svg",attributes:t,children:e}]}function Yy(c){var e=c.prefix,a=c.iconName,r=c.children,t=c.attributes,n=c.symbol,s=n===!0?"".concat(e,"-").concat(K.cssPrefix,"-").concat(a):n;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:U(U({},t),{},{id:s}),children:r}]}]}function Z9(c){var e=c.icons,a=e.main,r=e.mask,t=c.prefix,n=c.iconName,s=c.transform,i=c.symbol,o=c.title,l=c.maskId,f=c.titleId,u=c.extra,h=c.watchable,p=h===void 0?!1:h,H=r.found?r:a,M=H.width,x=H.height,d=t==="fak",m=[K.replacementClass,n?"".concat(K.cssPrefix,"-").concat(n):""].filter(function(A){return u.classes.indexOf(A)===-1}).filter(function(A){return A!==""||!!A}).concat(u.classes).join(" "),g={children:[],attributes:U(U({},u.attributes),{},{"data-prefix":t,"data-icon":n,class:m,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(M," ").concat(x)})},C=d&&!~u.classes.indexOf("fa-fw")?{width:"".concat(M/x*16*.0625,"em")}:{};p&&(g.attributes[G3]=""),o&&(g.children.push({tag:"title",attributes:{id:g.attributes["aria-labelledby"]||"title-".concat(f||k6())},children:[o]}),delete g.attributes.title);var b=U(U({},g),{},{prefix:t,iconName:n,main:a,mask:r,maskId:l,transform:s,symbol:i,styles:U(U({},C),u.styles)}),T=r.found&&a.found?j2("generateAbstractMask",b)||{children:[],attributes:{}}:j2("generateAbstractIcon",b)||{children:[],attributes:{}},E=T.children,L=T.attributes;return b.children=E,b.attributes=L,i?Yy(b):Jy(b)}function Ja(c){var e=c.content,a=c.width,r=c.height,t=c.transform,n=c.title,s=c.extra,i=c.watchable,o=i===void 0?!1:i,l=U(U(U({},s.attributes),n?{title:n}:{}),{},{class:s.classes.join(" ")});o&&(l[G3]="");var f=U({},s.styles);j9(t)&&(f.transform=Sy({transform:t,startCentered:!0,width:a,height:r}),f["-webkit-transform"]=f.transform);var u=U0(f);u.length>0&&(l.style=u);var h=[];return h.push({tag:"span",attributes:l,children:[e]}),n&&h.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),h}function Xy(c){var e=c.content,a=c.title,r=c.extra,t=U(U(U({},r.attributes),a?{title:a}:{}),{},{class:r.classes.join(" ")}),n=U0(r.styles);n.length>0&&(t.style=n);var s=[];return s.push({tag:"span",attributes:t,children:[e]}),a&&s.push({tag:"span",attributes:{class:"sr-only"},children:[a]}),s}var E5=u2.styles;function w7(c){var e=c[0],a=c[1],r=c.slice(4),t=O9(r,1),n=t[0],s=null;return Array.isArray(n)?s={tag:"g",attributes:{class:"".concat(K.cssPrefix,"-").concat(R3.GROUP)},children:[{tag:"path",attributes:{class:"".concat(K.cssPrefix,"-").concat(R3.SECONDARY),fill:"currentColor",d:n[0]}},{tag:"path",attributes:{class:"".concat(K.cssPrefix,"-").concat(R3.PRIMARY),fill:"currentColor",d:n[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:n}},{found:!0,width:e,height:a,icon:s}}var Qy={found:!1,width:512,height:512};function cN(c,e){!Rs&&!K.showMissingIcons&&c&&console.error('Icon with name "'.concat(c,'" and prefix "').concat(e,'" is missing.'))}function A7(c,e){var a=e;return e==="fa"&&K.styleDefault!==null&&(e=x3()),new Promise(function(r,t){if(j2("missingIconAbstract"),a==="fa"){var n=Zs(c)||{};c=n.iconName||c,e=n.prefix||e}if(c&&e&&E5[e]&&E5[e][c]){var s=E5[e][c];return r(w7(s))}cN(c,e),r(U(U({},Qy),{},{icon:K.showMissingIcons&&c?j2("missingIconAbstract")||{}:{}}))})}var Ya=function(){},_7=K.measurePerformance&&H8&&H8.mark&&H8.measure?H8:{mark:Ya,measure:Ya},X4='FA "6.4.2"',eN=function(e){return _7.mark("".concat(X4," ").concat(e," begins")),function(){return Ys(e)}},Ys=function(e){_7.mark("".concat(X4," ").concat(e," ends")),_7.measure("".concat(X4," ").concat(e),"".concat(X4," ").concat(e," begins"),"".concat(X4," ").concat(e," ends"))},J9={begin:eN,end:Ys},D8=function(){};function Xa(c){var e=c.getAttribute?c.getAttribute(G3):null;return typeof e=="string"}function aN(c){var e=c.getAttribute?c.getAttribute(B9):null,a=c.getAttribute?c.getAttribute(U9):null;return e&&a}function rN(c){return c&&c.classList&&c.classList.contains&&c.classList.contains(K.replacementClass)}function tN(){if(K.autoReplaceSvg===!0)return O8.replace;var c=O8[K.autoReplaceSvg];return c||O8.replace}function nN(c){return g1.createElementNS("http://www.w3.org/2000/svg",c)}function sN(c){return g1.createElement(c)}function Xs(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.ceFn,r=a===void 0?c.tag==="svg"?nN:sN:a;if(typeof c=="string")return g1.createTextNode(c);var t=r(c.tag);Object.keys(c.attributes||[]).forEach(function(s){t.setAttribute(s,c.attributes[s])});var n=c.children||[];return n.forEach(function(s){t.appendChild(Xs(s,{ceFn:r}))}),t}function iN(c){var e=" ".concat(c.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var O8={replace:function(e){var a=e[0];if(a.parentNode)if(e[1].forEach(function(t){a.parentNode.insertBefore(Xs(t),a)}),a.getAttribute(G3)===null&&K.keepOriginalSource){var r=g1.createComment(iN(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(e){var a=e[0],r=e[1];if(~W9(a).indexOf(K.replacementClass))return O8.replace(e);var t=new RegExp("".concat(K.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var n=r[0].attributes.class.split(" ").reduce(function(i,o){return o===K.replacementClass||o.match(t)?i.toSvg.push(o):i.toNode.push(o),i},{toNode:[],toSvg:[]});r[0].attributes.class=n.toSvg.join(" "),n.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",n.toNode.join(" "))}var s=r.map(function(i){return Y6(i)}).join(`
`);a.setAttribute(G3,""),a.innerHTML=s}};function Qa(c){c()}function Qs(c,e){var a=typeof e=="function"?e:D8;if(c.length===0)a();else{var r=Qa;K.mutateApproach===uy&&(r=b3.requestAnimationFrame||Qa),r(function(){var t=tN(),n=J9.begin("mutate");c.map(t),n(),a()})}}var Y9=!1;function ci(){Y9=!0}function k7(){Y9=!1}var s0=null;function cr(c){if(qa&&K.observeMutations){var e=c.treeCallback,a=e===void 0?D8:e,r=c.nodeCallback,t=r===void 0?D8:r,n=c.pseudoElementsCallback,s=n===void 0?D8:n,i=c.observeMutationsRoot,o=i===void 0?g1:i;s0=new qa(function(l){if(!Y9){var f=x3();B4(l).forEach(function(u){if(u.type==="childList"&&u.addedNodes.length>0&&!Xa(u.addedNodes[0])&&(K.searchPseudoElements&&s(u.target),a(u.target)),u.type==="attributes"&&u.target.parentNode&&K.searchPseudoElements&&s(u.target.parentNode),u.type==="attributes"&&Xa(u.target)&&~Hy.indexOf(u.attributeName))if(u.attributeName==="class"&&aN(u.target)){var h=W0(W9(u.target)),p=h.prefix,H=h.iconName;u.target.setAttribute(B9,p||f),H&&u.target.setAttribute(U9,H)}else rN(u.target)&&t(u.target)})}}),K2&&s0.observe(o,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function oN(){s0&&s0.disconnect()}function lN(c){var e=c.getAttribute("style"),a=[];return e&&(a=e.split(";").reduce(function(r,t){var n=t.split(":"),s=n[0],i=n.slice(1);return s&&i.length>0&&(r[s]=i.join(":").trim()),r},{})),a}function fN(c){var e=c.getAttribute("data-prefix"),a=c.getAttribute("data-icon"),r=c.innerText!==void 0?c.innerText.trim():"",t=W0(W9(c));return t.prefix||(t.prefix=x3()),e&&a&&(t.prefix=e,t.iconName=a),t.iconName&&t.prefix||(t.prefix&&r.length>0&&(t.iconName=By(t.prefix,c.innerText)||G9(t.prefix,x7(c.innerText))),!t.iconName&&K.autoFetchSvg&&c.firstChild&&c.firstChild.nodeType===Node.TEXT_NODE&&(t.iconName=c.firstChild.data)),t}function uN(c){var e=B4(c.attributes).reduce(function(t,n){return t.name!=="class"&&t.name!=="style"&&(t[n.name]=n.value),t},{}),a=c.getAttribute("title"),r=c.getAttribute("data-fa-title-id");return K.autoA11y&&(a?e["aria-labelledby"]="".concat(K.replacementClass,"-title-").concat(r||k6()):(e["aria-hidden"]="true",e.focusable="false")),e}function hN(){return{iconName:null,title:null,titleId:null,prefix:null,transform:M2,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function er(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=fN(c),r=a.iconName,t=a.prefix,n=a.rest,s=uN(c),i=N7("parseNodeAttributes",{},c),o=e.styleParser?lN(c):[];return U({iconName:r,title:c.getAttribute("title"),titleId:c.getAttribute("data-fa-title-id"),prefix:t,transform:M2,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:n,styles:o,attributes:s}},i)}var mN=u2.styles;function ei(c){var e=K.autoReplaceSvg==="nest"?er(c,{styleParser:!1}):er(c);return~e.extra.classes.indexOf(Is)?j2("generateLayersText",c,e):j2("generateSvgReplacementMutation",c,e)}var y3=new Set;q9.map(function(c){y3.add("fa-".concat(c))});Object.keys(S6[M1]).map(y3.add.bind(y3));Object.keys(S6[y1]).map(y3.add.bind(y3));y3=Z6(y3);function ar(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!K2)return Promise.resolve();var a=g1.documentElement.classList,r=function(u){return a.add("".concat(Wa,"-").concat(u))},t=function(u){return a.remove("".concat(Wa,"-").concat(u))},n=K.autoFetchSvg?y3:q9.map(function(f){return"fa-".concat(f)}).concat(Object.keys(mN));n.includes("fa")||n.push("fa");var s=[".".concat(Is,":not([").concat(G3,"])")].concat(n.map(function(f){return".".concat(f,":not([").concat(G3,"])")})).join(", ");if(s.length===0)return Promise.resolve();var i=[];try{i=B4(c.querySelectorAll(s))}catch{}if(i.length>0)r("pending"),t("complete");else return Promise.resolve();var o=J9.begin("onTree"),l=i.reduce(function(f,u){try{var h=ei(u);h&&f.push(h)}catch(p){Rs||p.name==="MissingIcon"&&console.error(p)}return f},[]);return new Promise(function(f,u){Promise.all(l).then(function(h){Qs(h,function(){r("active"),r("complete"),t("pending"),typeof e=="function"&&e(),o(),f()})}).catch(function(h){o(),u(h)})})}function vN(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;ei(c).then(function(a){a&&Qs([a],e)})}function dN(c){return function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(e||{}).icon?e:S7(e||{}),t=a.mask;return t&&(t=(t||{}).icon?t:S7(t||{})),c(r,U(U({},a),{},{mask:t}))}}var pN=function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,t=r===void 0?M2:r,n=a.symbol,s=n===void 0?!1:n,i=a.mask,o=i===void 0?null:i,l=a.maskId,f=l===void 0?null:l,u=a.title,h=u===void 0?null:u,p=a.titleId,H=p===void 0?null:p,M=a.classes,x=M===void 0?[]:M,d=a.attributes,m=d===void 0?{}:d,g=a.styles,C=g===void 0?{}:g;if(e){var b=e.prefix,T=e.iconName,E=e.icon;return j0(U({type:"icon"},e),function(){return K3("beforeDOMElementCreation",{iconDefinition:e,params:a}),K.autoA11y&&(h?m["aria-labelledby"]="".concat(K.replacementClass,"-title-").concat(H||k6()):(m["aria-hidden"]="true",m.focusable="false")),Z9({icons:{main:w7(E),mask:o?w7(o.icon):{found:!1,width:null,height:null,icon:{}}},prefix:b,iconName:T,transform:U(U({},M2),t),symbol:s,title:h,maskId:f,titleId:H,extra:{attributes:m,styles:C,classes:x}})})}},zN={mixout:function(){return{icon:dN(pN)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=ar,a.nodeCallback=vN,a}}},provides:function(e){e.i2svg=function(a){var r=a.node,t=r===void 0?g1:r,n=a.callback,s=n===void 0?function(){}:n;return ar(t,s)},e.generateSvgReplacementMutation=function(a,r){var t=r.iconName,n=r.title,s=r.titleId,i=r.prefix,o=r.transform,l=r.symbol,f=r.mask,u=r.maskId,h=r.extra;return new Promise(function(p,H){Promise.all([A7(t,i),f.iconName?A7(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(M){var x=O9(M,2),d=x[0],m=x[1];p([a,Z9({icons:{main:d,mask:m},prefix:i,iconName:t,transform:o,symbol:l,maskId:u,title:n,titleId:s,extra:h,watchable:!0})])}).catch(H)})},e.generateAbstractIcon=function(a){var r=a.children,t=a.attributes,n=a.main,s=a.transform,i=a.styles,o=U0(i);o.length>0&&(t.style=o);var l;return j9(s)&&(l=j2("generateAbstractTransformGrouping",{main:n,transform:s,containerWidth:n.width,iconWidth:n.width})),r.push(l||n.icon),{children:r,attributes:t}}}},HN={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=r.classes,n=t===void 0?[]:t;return j0({type:"layer"},function(){K3("beforeDOMElementCreation",{assembler:a,params:r});var s=[];return a(function(i){Array.isArray(i)?i.map(function(o){s=s.concat(o.abstract)}):s=s.concat(i.abstract)}),[{tag:"span",attributes:{class:["".concat(K.cssPrefix,"-layers")].concat(Z6(n)).join(" ")},children:s}]})}}}},CN={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=r.title,n=t===void 0?null:t,s=r.classes,i=s===void 0?[]:s,o=r.attributes,l=o===void 0?{}:o,f=r.styles,u=f===void 0?{}:f;return j0({type:"counter",content:a},function(){return K3("beforeDOMElementCreation",{content:a,params:r}),Xy({content:a.toString(),title:n,extra:{attributes:l,styles:u,classes:["".concat(K.cssPrefix,"-layers-counter")].concat(Z6(i))}})})}}}},VN={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=r.transform,n=t===void 0?M2:t,s=r.title,i=s===void 0?null:s,o=r.classes,l=o===void 0?[]:o,f=r.attributes,u=f===void 0?{}:f,h=r.styles,p=h===void 0?{}:h;return j0({type:"text",content:a},function(){return K3("beforeDOMElementCreation",{content:a,params:r}),Ja({content:a,transform:U(U({},M2),n),title:i,extra:{attributes:u,styles:p,classes:["".concat(K.cssPrefix,"-layers-text")].concat(Z6(l))}})})}}},provides:function(e){e.generateLayersText=function(a,r){var t=r.title,n=r.transform,s=r.extra,i=null,o=null;if(Es){var l=parseInt(getComputedStyle(a).fontSize,10),f=a.getBoundingClientRect();i=f.width/l,o=f.height/l}return K.autoA11y&&!t&&(s.attributes["aria-hidden"]="true"),Promise.resolve([a,Ja({content:a.innerHTML,width:i,height:o,transform:n,title:t,extra:s,watchable:!0})])}}},MN=new RegExp('"',"ug"),rr=[1105920,1112319];function gN(c){var e=c.replace(MN,""),a=Py(e,0),r=a>=rr[0]&&a<=rr[1],t=e.length===2?e[0]===e[1]:!1;return{value:x7(t?e[0]:e),isSecondary:r||t}}function tr(c,e){var a="".concat(fy).concat(e.replace(":","-"));return new Promise(function(r,t){if(c.getAttribute(a)!==null)return r();var n=B4(c.children),s=n.filter(function(E){return E.getAttribute(b7)===e})[0],i=b3.getComputedStyle(c,e),o=i.getPropertyValue("font-family").match(dy),l=i.getPropertyValue("font-weight"),f=i.getPropertyValue("content");if(s&&!o)return c.removeChild(s),r();if(o&&f!=="none"&&f!==""){var u=i.getPropertyValue("content"),h=~["Sharp"].indexOf(o[2])?y1:M1,p=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(o[2])?w6[h][o[2].toLowerCase()]:py[h][l],H=gN(u),M=H.value,x=H.isSecondary,d=o[0].startsWith("FontAwesome"),m=G9(p,M),g=m;if(d){var C=Uy(M);C.iconName&&C.prefix&&(m=C.iconName,p=C.prefix)}if(m&&!x&&(!s||s.getAttribute(B9)!==p||s.getAttribute(U9)!==g)){c.setAttribute(a,g),s&&c.removeChild(s);var b=hN(),T=b.extra;T.attributes[b7]=e,A7(m,p).then(function(E){var L=Z9(U(U({},b),{},{icons:{main:E,mask:K9()},prefix:p,iconName:g,extra:T,watchable:!0})),A=g1.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?c.insertBefore(A,c.firstChild):c.appendChild(A),A.outerHTML=L.map(function(I){return Y6(I)}).join(`