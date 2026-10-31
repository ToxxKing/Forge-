(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t)=>t.some(t=>e instanceof t),t,n;function r(){return t||(t=[IDBIndex,IDBObjectStore,IDBCursor,IDBDatabase,IDBTransaction])}function i(){return n||(n=[`advance`,`continue`,`continuePrimaryKey`].map(e=>IDBCursor.prototype[e]))}var a=new WeakMap,o=new WeakMap,s=new WeakMap;function c(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(p(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return s.set(t,e),t}function l(e){if(a.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});a.set(e,t)}var u={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return a.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)||t in e}};function d(e){u=e(u)}function f(e){return i().includes(e)?function(...t){return e.apply(m(this),t),p(this.request)}:function(...t){return p(e.apply(m(this),t))}}function ee(t){return typeof t==`function`?f(t):(t instanceof IDBTransaction&&l(t),e(t,r())?new Proxy(t,u):t)}function p(e){if(e instanceof IDBRequest)return c(e);if(o.has(e))return o.get(e);let t=ee(e);return Object.is(t,e)||(o.set(e,t),s.set(t,e)),t}var m=e=>s.get(e);function te(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=p(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(p(o.result),e.oldVersion,e.newVersion,p(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var ne=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],re=[`put`,`add`,`delete`,`clear`],ie={};function ae(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(ie[t])return ie[t];let n=t.replace(/FromIndex$/,``),r=t!==n,i=re.includes(n);return!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||ne.includes(n))?void 0:ie[t]=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]}}d(e=>({...e,get:(t,n,r)=>ae(t,n)||e.get(t,n,r),has:(t,n)=>!!ae(t,n)||e.has(t,n)}));var oe=[`advance`,`continue`,`continuePrimaryKey`],se={},ce=new WeakMap,le=new WeakMap,ue={get(e,t){if(!oe.includes(t))return e[t];let n=se[t];return n||(n=se[t]=function(...e){ce.set(this,le.get(this)[t](...e))}),n}};async function*de(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,ue);for(le.set(n,t),s.set(n,m(t));t;)yield n,t=await(ce.get(n)||t.continue()),ce.delete(n)}function fe(t,n){return n===Symbol.asyncIterator&&e(t,[IDBIndex,IDBObjectStore,IDBCursor])||n===`iterate`&&e(t,[IDBIndex,IDBObjectStore])}d(e=>({...e,get(t,n,r){return fe(t,n)?de:e.get(t,n,r)},has(t,n){return fe(t,n)||e.has(t,n)}}));var pe=`forge`,me=1,he=null;function ge(){return he||(he=te(pe,me,{upgrade(e){e.objectStoreNames.contains(`kv`)||e.createObjectStore(`kv`),e.objectStoreNames.contains(`photos`)||e.createObjectStore(`photos`)}})),he}async function _e(e){return(await ge()).get(`kv`,e)}async function ve(e,t){return(await ge()).put(`kv`,t,e)}async function ye(e){return(await ge()).get(`photos`,e)}async function be(e,t){return(await ge()).put(`photos`,t,e)}async function xe(e){return(await ge()).delete(`photos`,e)}async function Se(){return(await ge()).getAllKeys(`photos`)}async function Ce(){let e=(await ge()).transaction([`kv`,`photos`],`readwrite`);await Promise.all([e.objectStore(`kv`).clear(),e.objectStore(`photos`).clear(),e.done])}async function we(){try{if(navigator.storage&&navigator.storage.persist)return await navigator.storage.persisted()?!0:await navigator.storage.persist()}catch{}return!1}var Te=`forge90_state_v1`,Ee=`forge_state_mirror_v4`,De=`state`,Oe=Promise.resolve(),ke=()=>{},h=new Map;function Ae(e){ke=e}function je(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}async function Me(e,t){let n=null;try{n=await _e(De)}catch(e){console.error(`Lecture IndexedDB impossible`,e)}let r=[n,je(Ee)].filter(Boolean).sort((e,t)=>(t._savedAt||0)-(e._savedAt||0))[0]||je(Te);if(!r)return{state:e(),isFresh:!0};let{state:i,photoMigrations:a}=t(r);for(let{id:e,dataUrl:t}of a||[])try{await be(e,Ve(t))}catch(e){console.error(`Migration photo`,e)}return(r!==n||a?.length)&&await Pe(i),await Ie(i),{state:i,isFresh:!1}}function Ne(e){return e._savedAt=Date.now(),JSON.parse(JSON.stringify(e))}async function Pe(e){let t=Ne(e);try{localStorage.setItem(Ee,JSON.stringify(t))}catch{}await ve(De,t)}function Fe(e){let t=Ne(e);try{localStorage.setItem(Ee,JSON.stringify(t))}catch{}return Oe=Oe.then(()=>ve(De,t)).catch(e=>{console.error(`Erreur de sauvegarde`,e),ke(e)}),Oe}async function Ie(e){h.forEach(e=>URL.revokeObjectURL(e)),h.clear();let t=[];try{t=await Se()}catch{return}let n=new Set((e.photos||[]).map(e=>e.id));for(let e of t){if(!n.has(e))continue;let t=await ye(e);t&&h.set(e,URL.createObjectURL(t))}}function Le(e){return h.get(e)||null}async function Re(e,t=1600,n=.85){try{let r=await createImageBitmap(e),i=Math.min(1,t/Math.max(r.width,r.height)),a=document.createElement(`canvas`);return a.width=Math.round(r.width*i),a.height=Math.round(r.height*i),a.getContext(`2d`).drawImage(r,0,0,a.width,a.height),r.close&&r.close(),await new Promise(e=>a.toBlob(e,`image/jpeg`,n))||e}catch{return e}}async function ze(e,t){let n=await Re(t);await be(e,n);let r=h.get(e);r&&URL.revokeObjectURL(r),h.set(e,URL.createObjectURL(n))}async function Be(e){await xe(e);let t=h.get(e);t&&URL.revokeObjectURL(t),h.delete(e)}function Ve(e){let[t,n]=e.split(`,`),r=(t.match(/data:([^;]+)/)||[])[1]||`image/jpeg`,i=atob(n),a=new Uint8Array(i.length);for(let e=0;e<i.length;e++)a[e]=i.charCodeAt(e);return new Blob([a],{type:r})}function He(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)})}async function Ue(e){let t=JSON.parse(JSON.stringify(e));t._photoData={};for(let n of e.photos||[]){let e=await ye(n.id);e&&(t._photoData[n.id]=await He(e))}return t._export={app:`FORGE`,version:e.version,at:new Date().toISOString()},t}async function We(e,t){let n={...e},r=n._photoData||{};delete n._photoData,delete n._export,await Ce();let{state:i,photoMigrations:a}=t(n);for(let[e,t]of Object.entries(r))await be(e,Ve(t));for(let{id:e,dataUrl:t}of a||[])await be(e,Ve(t));return await Pe(i),await Ie(i),i}async function Ge(){await Ce();try{localStorage.removeItem(Ee),localStorage.removeItem(Te)}catch{}h.forEach(e=>URL.revokeObjectURL(e)),h.clear()}var g={state:null,ui:{tab:`home`,view:null,sheet:null,workoutOpen:!1,toast:null,lib:{q:``,group:`all`,equip:`all`},progress:{seg:`body`,period:90,exId:`bench_bb`}}},Ke=()=>{},qe=!1;function Je(e){Ke=e}function Ye(){qe||(qe=!0,requestAnimationFrame(()=>{qe=!1,Ke()}))}function _(e){e(g.state),Fe(g.state),Ye()}function v(e){e(g.ui),Ye()}var Xe=null;function y(e,t=`info`){g.ui.toast={text:e,kind:t,id:Date.now()},Ye(),clearTimeout(Xe),Xe=setTimeout(()=>{g.ui.toast=null,Ye()},2600)}function Ze(e){v(t=>{t.tab=e,t.view=null,t.sheet=null}),window.scrollTo({top:0})}function Qe(e,t={}){v(n=>{n.view={name:e,...t},n.sheet=null}),window.scrollTo({top:0})}function $e(){v(e=>{e.view=null})}function b(e,t={}){v(n=>{n.sheet={name:e,...t}})}function x(){v(e=>{e.sheet=null})}var et=0,S=(e,t,n,r,i={})=>({uid:`t${++et}`,exId:e,sets:t,reps:n,rest:r,...i});function tt(){return et=0,{id:`forge-recomp-12`,name:`Recomposition 12 semaines`,level:`Intermédiaire`,weeks:12,blockLength:4,custom:!1,days:[{id:`A`,title:`Haut A`,subtitle:`Force · Pectoraux`,tagline:`Les mouvements lourds de poussée en premier, quand tu es frais.`,items:[S(`bench_bb`,4,`6-8`,150,{prio:!0}),S(`lat_pulldown`,4,`8-10`,120,{prio:!0}),S(`incline_db`,3,`8-10`,120,{prio:!0}),S(`row_db`,3,`8-10`,90),S(`lateral_cable`,3,`12-15`,60),S(`cable_fly_low`,3,`12-15`,60),S(`pushdown`,2,`10-12`,60),S(`rower`,1,`10`,0,{note:`Intervalles : 8 × (30 s fort / 30 s facile) + 2 min retour au calme`})]},{id:`B`,title:`Bas du corps`,subtitle:`Jambes · Explosivité`,tagline:`Sauts en début de séance pour l’explosivité de gardien, puis force et gainage.`,items:[S(`box_jump`,4,`4`,90,{note:`Après 5 min d’échauffement. Qualité maximale, jamais en fatigue.`}),S(`lateral_bound`,3,`6`,60,{note:`6 bonds par côté avec réception stabilisée`}),S(`squat_bb`,4,`6-8`,150,{prio:!0,note:`Alternative si la barre est prise : Hack Squat`}),S(`rdl_bb`,3,`8-10`,120,{prio:!0}),S(`bulgarian_split`,3,`8-10`,90),S(`leg_curl_seated`,3,`10-12`,60),S(`calf_standing`,3,`12-15`,60),S(`pallof_press`,3,`10-12`,45),S(`ab_wheel`,3,`8-12`,60)]},{id:`C`,title:`Haut B`,subtitle:`Volume · Dos & épaules`,tagline:`Plus de répétitions, temps de repos courts, cardio pour finir.`,items:[S(`ohp_db`,3,`8-10`,120,{prio:!0}),S(`seated_row`,4,`10-12`,90,{prio:!0}),S(`chest_press`,3,`10-12`,90,{prio:!0}),S(`assisted_pullup`,3,`8-10`,90),S(`lateral_db`,3,`12-15`,60),S(`face_pull`,3,`15-20`,60),S(`incline_curl`,3,`10-12`,60),S(`overhead_cable`,3,`10-12`,60),S(`incline_walk`,1,`20`,0,{note:`Tapis à 10–12 %, 5 km/h. Tu transpires mais tu peux parler.`})]}]}}var nt=[{n:1,name:`Accumulation`,goal:`Installer la technique et le volume.`},{n:2,name:`Intensification`,goal:`Une série de plus sur les exercices prioritaires.`},{n:3,name:`Réalisation`,goal:`Charges plus lourdes sur les mouvements de base.`}],rt=[`Dim`,`Lun`,`Mar`,`Mer`,`Jeu`,`Ven`,`Sam`],it=[`Dimanche`,`Lundi`,`Mardi`,`Mercredi`,`Jeudi`,`Vendredi`,`Samedi`],at=[`D`,`L`,`M`,`M`,`J`,`V`,`S`];function ot(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function C(){return ot(new Date)}function w(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function T(e,t){let n=w(e);return n.setDate(n.getDate()+t),ot(n)}function st(e,t){return Math.round((w(t)-w(e))/864e5)}function ct(e){return w(e).getDay()}function E(e){let t=ct(e);return T(e,t===0?-6:1-t)}function D(e){return w(e).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`short`})}function lt(e){return w(e).toLocaleDateString(`fr-FR`,{weekday:`long`,day:`numeric`,month:`long`})}function ut(e){return w(e).toLocaleDateString(`fr-FR`,{month:`long`,year:`numeric`})}var dt=2.20462;function O(e,t){return t===`lb`?e*dt:e}function ft(e,t){return t===`lb`?e/dt:e}function k(e,t=1){return e==null||isNaN(e)?`–`:(Math.round(e*10**t)/10**t).toLocaleString(`fr-FR`,{maximumFractionDigits:t})}function pt(e,t=`kg`,n=1){return e==null?`–`:`${k(O(e,t),n)} ${t}`}function mt(e){return e==null?`–`:e>=1e4?`${k(e/1e3,1)} k`:Math.round(e).toLocaleString(`fr-FR`)}function ht(e){e=Math.max(0,Math.round(e));let t=Math.floor(e/3600),n=Math.floor(e%3600/60);return e%60,t?`${t} h ${String(n).padStart(2,`0`)}`:`${n} min`}function gt(e){e=Math.max(0,Math.round(e));let t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=e%60,i=String(n).padStart(2,`0`),a=String(r).padStart(2,`0`);return t?`${t}:${i}:${a}`:`${i}:${a}`}function A(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4)}function _t(){let e=tt();return{version:5,onboarded:!1,profile:{name:``,sex:`M`,age:22,heightCm:195,startWeight:112.9,goalWeight:100,goal:`recomp`,gym:`Basic-Fit`,trainDays:[2,4,6],sport:`Football (gardien de but)`,injuries:``,avoid:[]},settings:{unit:`kg`,theme:`dark`,sound:!0,vibration:!0,notifications:!0,keepAwake:!0,defaultRest:90},programs:[e],activeProgramId:e.id,programStart:E(C()),startedOn:C(),workouts:[],body:{weight:[{date:C(),kg:112.9}],measures:[]},photos:[],legacy:null}}function vt(e){if(e&&e.version===5){let t=_t();return{state:{...t,...e,profile:{...t.profile,...e.profile},settings:{...t.settings,...e.settings},body:{...t.body,...e.body}},photoMigrations:[]}}let t=_t(),n=[];if(e&&typeof e==`object`){t.onboarded=!0,Array.isArray(e.weight)&&e.weight.length&&(t.body.weight=e.weight.filter(e=>e&&e.date&&e.kg).map(e=>({date:e.date,kg:Number(e.kg)})),t.profile.startWeight=t.body.weight[0].kg),Array.isArray(e.waist)&&(t.body.measures=e.waist.filter(e=>e&&e.cm).map(e=>({date:e.date,waist:Number(e.cm)})));let r=e.startDate||C();t.startedOn=r;for(let[i,a]of Object.entries(e.photos||{})){let e=/^d(\d+)-(\w+)$/.exec(i),o=e?T(r,Number(e[1])-1):r,s=e?e[2]:``;if(typeof a==`string`&&a.startsWith(`data:`)){let e=`p_${A()}`;n.push({id:e,dataUrl:a}),t.photos.push({id:e,date:o,label:s})}else a&&t.photos.push({id:i,date:o,label:s})}let i={...e};delete i.photos,t.legacy=i}return{state:t,photoMigrations:n}}function yt(){let e=document.getElementById(`netStatus`);if(!e)return;let t=()=>{e.hidden=navigator.onLine};window.addEventListener(`online`,t),window.addEventListener(`offline`,t),t()}var bt=globalThis,xt=e=>e,St=bt.trustedTypes,Ct=St?St.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,wt=`$lit$`,j=`lit$${Math.random().toFixed(9).slice(2)}$`,Tt=`?`+j,Et=`<${Tt}>`,Dt=document,Ot=()=>Dt.createComment(``),kt=e=>e===null||typeof e!=`object`&&typeof e!=`function`,At=Array.isArray,jt=e=>At(e)||typeof e?.[Symbol.iterator]==`function`,Mt=`[ 	
\f\r]`,Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pt=/-->/g,Ft=/>/g,It=RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Lt=/'/g,Rt=/"/g,zt=/^(?:script|style|textarea|title)$/i,Bt=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),M=Bt(1),N=Bt(2),P=Symbol.for(`lit-noChange`),F=Symbol.for(`lit-nothing`),Vt=new WeakMap,Ht=Dt.createTreeWalker(Dt,129);function Ut(e,t){if(!At(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Ct===void 0?t:Ct.createHTML(t)}var Wt=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=Nt;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===Nt?c[1]===`!--`?o=Pt:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=It):(zt.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=It):o=Ft:o===It?c[0]===`>`?(o=i??Nt,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?It:c[3]===`"`?Rt:Lt):o===Rt||o===Lt?o=It:o===Pt||o===Ft?o=Nt:(o=It,i=void 0);let d=o===It&&e[t+1].startsWith(`/>`)?` `:``;a+=o===Nt?n+Et:l>=0?(r.push(s),n.slice(0,l)+wt+n.slice(l)+j+d):n+j+(l===-2?t:d)}return[Ut(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Gt=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Wt(t,n);if(this.el=e.createElement(l,r),Ht.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Ht.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(wt)){let t=u[o++],n=i.getAttribute(e).split(j),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Xt:r[1]===`?`?Zt:r[1]===`@`?Qt:Yt}),i.removeAttribute(e)}else e.startsWith(j)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(zt.test(i.tagName)){let e=i.textContent.split(j),t=e.length-1;if(t>0){i.textContent=St?St.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],Ot()),Ht.nextNode(),c.push({type:2,index:++a});i.append(e[t],Ot())}}}else if(i.nodeType===8){if(i.data===Tt)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(j,e+1))!==-1;)c.push({type:7,index:a}),e+=j.length-1}}a++}}static createElement(e,t){let n=Dt.createElement(`template`);return n.innerHTML=e,n}};function Kt(e,t,n=e,r){if(t===P)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=kt(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??(n._$Co=[]))[r]=i),i!==void 0&&(t=Kt(e,i._$AS(e,t.values),i,r)),t}var qt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Dt).importNode(t,!0);Ht.currentNode=r;let i=Ht.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Jt(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new $t(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Ht.nextNode(),a++)}return Ht.currentNode=Dt,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Jt=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Kt(this,e,t),kt(e)?e===F||e==null||e===``?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==P&&this._(e):e._$litType$===void 0?e.nodeType===void 0?jt(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&kt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Dt.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Gt.createElement(Ut(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new qt(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Vt.get(e.strings);return t===void 0&&Vt.set(e.strings,t=new Gt(e)),t}k(t){At(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(Ot()),this.O(Ot()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=xt(e).nextSibling;xt(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Yt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=F}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Kt(this,e,t,0),a=!kt(e)||e!==this._$AH&&e!==P,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Kt(this,r[n+o],t,o),s===P&&(s=this._$AH[o]),a||(a=!kt(s)||s!==this._$AH[o]),s===F?e=F:e!==F&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Xt=class extends Yt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},Zt=class extends Yt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}},Qt=class extends Yt{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Kt(this,e,t,0)??F)===P)return;let n=this._$AH,r=e===F&&n!==F||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==F&&(n===F||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},$t=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Kt(this,e)}},en={M:wt,P:j,A:Tt,C:1,L:Wt,R:qt,D:jt,V:Kt,I:Jt,H:Yt,N:Zt,U:Qt,B:Xt,F:$t},tn=bt.litHtmlPolyfillSupport;tn?.(Gt,Jt),(bt.litHtmlVersions??(bt.litHtmlVersions=[])).push(`3.3.3`);var nn=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Jt(t.insertBefore(Ot(),e),e,void 0,n??{})}return i._$AI(e),i},rn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},an=e=>(...t)=>({_$litDirective$:e,values:t}),on=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},sn=class extends on{constructor(e){if(super(e),this.it=F,e.type!==rn.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===F||e==null)return this._t=void 0,this.it=e;if(e===P)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};sn.directiveName=`unsafeHTML`,sn.resultType=1;var cn=class extends sn{};cn.directiveName=`unsafeSVG`,cn.resultType=2;var ln=an(cn),un={home:`
<svg
  class="lucide lucide-house"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
</svg>
`,dumbbell:`
<svg
  class="lucide lucide-dumbbell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
  <path d="m2.5 21.5 1.4-1.4" />
  <path d="m20.1 3.9 1.4-1.4" />
  <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
  <path d="m9.6 14.4 4.8-4.8" />
</svg>
`,book:`
<svg
  class="lucide lucide-book-open"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v16" />
  <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
</svg>
`,chart:`
<svg
  class="lucide lucide-chart-line"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
  <path d="m19 9-5 5-4-4-3 3" />
</svg>
`,user:`
<svg
  class="lucide lucide-user"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</svg>
`,play:`
<svg
  class="lucide lucide-play"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
</svg>
`,pause:`
<svg
  class="lucide lucide-pause"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="14" y="3" width="5" height="18" rx="1" />
  <rect x="5" y="3" width="5" height="18" rx="1" />
</svg>
`,timer:`
<svg
  class="lucide lucide-timer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="10" x2="14" y1="2" y2="2" />
  <line x1="12" x2="15" y1="14" y2="11" />
  <circle cx="12" cy="14" r="8" />
</svg>
`,flame:`
<svg
  class="lucide lucide-flame"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
</svg>
`,search:`
<svg
  class="lucide lucide-search"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</svg>
`,swap:`
<svg
  class="lucide lucide-repeat-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m2 9 3-3 3 3" />
  <path d="M13 18H7a2 2 0 0 1-2-2V6" />
  <path d="m22 15-3 3-3-3" />
  <path d="M11 6h6a2 2 0 0 1 2 2v10" />
</svg>
`,skip:`
<svg
  class="lucide lucide-skip-forward"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 4v16" />
  <path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" />
</svg>
`,plus:`
<svg
  class="lucide lucide-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="M12 5v14" />
</svg>
`,minus:`
<svg
  class="lucide lucide-minus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
</svg>
`,check:`
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,x:`
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`,right:`
<svg
  class="lucide lucide-chevron-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
`,left:`
<svg
  class="lucide lucide-chevron-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
`,down:`
<svg
  class="lucide lucide-chevron-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m6 9 6 6 6-6" />
</svg>
`,trophy:`
<svg
  class="lucide lucide-trophy"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" />
  <path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" />
  <path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" />
  <path d="M4 22h16" />
  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
  <path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />
</svg>
`,scale:`
<svg
  class="lucide lucide-scale"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3v18" />
  <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
  <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
  <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
  <path d="M7 21h10" />
</svg>
`,calendar:`
<svg
  class="lucide lucide-calendar"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2v3" />
  <path d="M16 2v3" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
  <path d="M3 9h18" />
</svg>
`,settings:`
<svg
  class="lucide lucide-settings"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
  <circle cx="12" cy="12" r="3" />
</svg>
`,download:`
<svg
  class="lucide lucide-download"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15V3" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  <path d="m7 10 5 5 5-5" />
</svg>
`,upload:`
<svg
  class="lucide lucide-upload"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3v12" />
  <path d="m17 8-5-5-5 5" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
</svg>
`,trash:`
<svg
  class="lucide lucide-trash"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`,info:`
<svg
  class="lucide lucide-info"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4" />
  <path d="M12 8h.01" />
</svg>
`,zap:`
<svg
  class="lucide lucide-zap"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />
</svg>
`,target:`
<svg
  class="lucide lucide-target"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <circle cx="12" cy="12" r="6" />
  <circle cx="12" cy="12" r="2" />
</svg>
`,clock:`
<svg
  class="lucide lucide-clock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>
`,up:`
<svg
  class="lucide lucide-trending-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 7h6v6" />
  <path d="m22 7-8.5 8.5-5-5L2 17" />
</svg>
`,downtrend:`
<svg
  class="lucide lucide-trending-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 17h6v-6" />
  <path d="m22 17-8.5-8.5-5 5L2 7" />
</svg>
`,moon:`
<svg
  class="lucide lucide-moon"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
</svg>
`,sun:`
<svg
  class="lucide lucide-sun"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2" />
  <path d="M12 20v2" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="m17.66 17.66 1.41 1.41" />
  <path d="M2 12h2" />
  <path d="M20 12h2" />
  <path d="m6.34 17.66-1.41 1.41" />
  <path d="m19.07 4.93-1.41 1.41" />
</svg>
`,sound:`
<svg
  class="lucide lucide-volume-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
  <path d="M16 9a5 5 0 0 1 0 6" />
  <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
</svg>
`,vibrate:`
<svg
  class="lucide lucide-vibrate"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m2 8 2 2-2 2 2 2-2 2" />
  <path d="m22 8-2 2 2 2-2 2 2 2" />
  <rect width="8" height="14" x="8" y="5" rx="1" />
</svg>
`,bell:`
<svg
  class="lucide lucide-bell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
</svg>
`,ruler:`
<svg
  class="lucide lucide-ruler"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
  <path d="m14.5 12.5 2-2" />
  <path d="m11.5 9.5 2-2" />
  <path d="m8.5 6.5 2-2" />
  <path d="m17.5 15.5 2-2" />
</svg>
`,camera:`
<svg
  class="lucide lucide-camera"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
  <circle cx="12" cy="13" r="3" />
</svg>
`,lr:`
<svg
  class="lucide lucide-arrow-left-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 3 4 7l4 4" />
  <path d="M4 7h16" />
  <path d="m16 21 4-4-4-4" />
  <path d="M20 17H4" />
</svg>
`,listplus:`
<svg
  class="lucide lucide-list-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 5H3" />
  <path d="M11 12H3" />
  <path d="M16 19H3" />
  <path d="M18 9v6" />
  <path d="M21 12h-6" />
</svg>
`,history:`
<svg
  class="lucide lucide-rotate-ccw-clock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
  <path d="M3 3v5h5" />
  <path d="M12 7v5l4 2" />
</svg>
`,activity:`
<svg
  class="lucide lucide-activity"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
</svg>
`,heart:`
<svg
  class="lucide lucide-heart-pulse"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
  <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
</svg>
`,offline:`
<svg
  class="lucide lucide-wifi-off"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20h.01" />
  <path d="M8.5 16.429a5 5 0 0 1 7 0" />
  <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
  <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
  <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
  <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
  <path d="m2 2 20 20" />
</svg>
`,done:`
<svg
  class="lucide lucide-circle-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="m16 9-5.5 5.5L8 12" />
</svg>
`,bulb:`
<svg
  class="lucide lucide-lightbulb"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
  <path d="M9 18h6" />
  <path d="M10 22h4" />
</svg>
`,alert:`
<svg
  class="lucide lucide-triangle-alert"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
  <path d="M12 9v4" />
  <path d="M12 17h.01" />
</svg>
`,wind:`
<svg
  class="lucide lucide-wind"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
  <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
  <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
</svg>
`,steps:`
<svg
  class="lucide lucide-footprints"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
  <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
  <path d="M16 17h4" />
  <path d="M4 13h4" />
</svg>
`,layers:`
<svg
  class="lucide lucide-layers"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
  <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
  <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
</svg>
`,edit:`
<svg
  class="lucide lucide-pencil"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  <path d="m15 5 4 4" />
</svg>
`,copy:`
<svg
  class="lucide lucide-copy"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
`,more:`
<svg
  class="lucide lucide-ellipsis"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="1" />
  <circle cx="19" cy="12" r="1" />
  <circle cx="5" cy="12" r="1" />
</svg>
`,arrowup:`
<svg
  class="lucide lucide-arrow-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m5 12 7-7 7 7" />
  <path d="M12 19V5" />
</svg>
`,arrowdown:`
<svg
  class="lucide lucide-arrow-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v14" />
  <path d="m19 12-7 7-7-7" />
</svg>
`,reset:`
<svg
  class="lucide lucide-rotate-ccw"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
  <path d="M3 3v5h5" />
</svg>
`,award:`
<svg
  class="lucide lucide-award"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
  <circle cx="12" cy="8" r="6" />
</svg>
`,minimize:`
<svg
  class="lucide lucide-minimize-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m14 10 7-7" />
  <path d="M20 10h-6V4" />
  <path d="m3 21 7-7" />
  <path d="M4 14h6v6" />
</svg>
`,flag:`
<svg
  class="lucide lucide-flag"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
</svg>
`,phone:`
<svg
  class="lucide lucide-smartphone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
  <path d="M12 18h.01" />
</svg>
`,shield:`
<svg
  class="lucide lucide-shield-alert"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="M12 8v4" />
  <path d="M12 16h.01" />
</svg>
`,image:`
<svg
  class="lucide lucide-image"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  <circle cx="9" cy="9" r="2" />
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
</svg>
`,sparkles:`
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`},dn=new Map;function I(e,t=20){let n=e+t;if(!dn.has(n)){let r=(un[e]||un.info).replace(/width="24"/,`width="${t}"`).replace(/height="24"/,`height="${t}"`).replace(/class="[^"]*"/,`class="ic" aria-hidden="true"`);dn.set(n,r)}return ln(dn.get(n))}function fn(e,{eyebrow:t=``,back:n=!1,actions:r=F}={}){return M`
    <header class="screen-head">
      ${n?M`<button class="icon-btn" @click=${$e} aria-label="Retour">${I(`left`,22)}</button>`:F}
      <div class="screen-head-t">
        ${t?M`<p class="eyebrow">${t}</p>`:F}
        <h1 class="display-l">${e}</h1>
      </div>
      <div class="screen-head-a">${r}</div>
    </header>`}function L(e,t,{action:n=F}={}){return M`
    <section class="sec">
      <div class="sec-head"><h2 class="sec-t">${e}</h2>${n}</div>
      ${t}
    </section>`}function R(e,t,{footer:n=F,tall:r=!1}={}){return M`
    <div class="sheet-backdrop" @click=${e=>{e.target===e.currentTarget&&x()}}>
      <div class="sheet ${r?`sheet-tall`:``}" role="dialog" aria-modal="true" aria-label=${e}>
        <div class="sheet-grip"></div>
        <div class="sheet-head">
          <h2 class="display-m">${e}</h2>
          <button class="icon-btn" @click=${x} aria-label="Fermer">${I(`x`,20)}</button>
        </div>
        <div class="sheet-body">${t}</div>
        ${n===F?F:M`<div class="sheet-foot">${n}</div>`}
      </div>
    </div>`}function pn(e,t,n,{small:r=!1}={}){return M`
    <div class="seg ${r?`seg-s`:``}" role="tablist">
      ${e.map(([e,r])=>M`
        <button role="tab" aria-selected=${e===t} class=${e===t?`on`:``} @click=${()=>n(e)}>${r}</button>`)}
    </div>`}function mn(e,t,n){return M`
    <div class="chips" role="listbox">
      ${e.map(([e,r])=>M`
        <button class="chip ${e===t?`on`:``}" aria-pressed=${e===t} @click=${()=>n(e)}>${r}</button>`)}
    </div>`}function z(e,t,{sub:n=F,ic:r=null,tone:i=``}={}){return M`
    <div class="stat ${i}">
      <div class="stat-l">${r?I(r,15):F}<span>${e}</span></div>
      <div class="stat-v">${t}</div>
      ${n===F?F:M`<div class="stat-s">${n}</div>`}
    </div>`}function hn(e,t,n,r=F){return M`
    <div class="empty">
      <div class="empty-ic">${I(e,26)}</div>
      <p class="empty-t">${t}</p>
      <p class="empty-x">${n}</p>
      ${r}
    </div>`}function gn(e,t,n,r,i=``){return M`
    <label class="row-toggle" for=${e}>
      <span class="rt-text"><span>${r}</span>${i?M`<small>${i}</small>`:F}</span>
      <input id=${e} type="checkbox" class="switch" .checked=${t} @change=${e=>n(e.target.checked)}>
    </label>`}function _n(e){return M`<span class="lv" aria-label="Niveau ${e} sur 3">${[1,2,3].map(t=>M`<i class=${t<=e?`on`:``}></i>`)}</span>`}var vn=e=>e.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g,(e,t,n)=>`${(100-Number(t)).toFixed(1)} ${n}`),yn=[[`traps`,`M44 31 Q37 33 31 37 L44 35 Z`],[`delts_front`,`M31 37 Q25 39 24 49 Q28 51 31 49 Q32 43 36 39 Z`],[`delts_side`,`M28 37 Q21 39 20 48 L23.5 49.5 Q24.5 42 30 38.5 Z`],[`chest`,`M49 37 L36 39.5 Q31 44 31.5 52 Q34 58 42 59 Q48 59 49 55 Z`],[`biceps`,`M24 52 Q21 60 22 70 Q25 72 28 70 Q30 61 30 53 Z`],[`forearms`,`M21.5 73 Q17 84 17 95 Q20 97 22 95 Q26 85 27.5 74 Z`],[`obliques`,`M42 61 Q36 63 35 71 L37 92 L43 96 Z`],[`abductors`,`M35 93 Q31.5 99 32.5 106 L37 101 Z`],[`quads`,`M37 101 Q31 118 33 139 Q37 145 43 143 Q47 127 47 109 L44 100 Z`],[`adductors`,`M47.5 105 L49.5 105 L49.5 127 Q47.5 131 45.5 129 Q47.5 117 47.5 105 Z`],[`calves`,`M34 152 Q32 168 35 185 L40 185 Q42 168 41 152 Z`]],bn=[[`abs`,`M43.5 60.5 L56.5 60.5 L56 95 Q50 99 44 95 Z`]],xn=[[`delts_rear`,`M31 38 Q23 40 21.5 50 Q26 52 30 49 Q31 43 34.5 40 Z`],[`lats`,`M34.5 41 L42.5 43 L43 56 L48.5 64 L46.5 77 Q40 75 37 67 Q33 57 32 46 Z`],[`triceps`,`M22 51.5 Q19.5 60 21.5 70 Q25.5 71.5 28 69.5 Q30 60 29.5 51.5 Z`],[`forearms`,`M21.5 73 Q17 84 17 95 Q20 97 22 95 Q26 85 27.5 74 Z`],[`abductors`,`M36 86 Q32.5 92 34 98.5 L39 91 Z`],[`glutes`,`M39 89 Q33.5 96 34.5 106 Q40.5 112 49.5 108 L49.5 89.5 Z`],[`hamstrings`,`M35 110 Q33 127 36 142 L44 142 Q47 126 48.5 111 Z`],[`calves`,`M34 150 Q30.5 162 34 176 Q38 180 42 176 Q44 162 41 150 Z`]],Sn=[[`traps`,`M50 26 L43 31 L32 37 L44 40 L50 44 L56 40 L68 37 L57 31 Z`],[`upper_back`,`M44 41 L50 45 L56 41 L57.5 54 L50 60 L42.5 54 Z`],[`lower_back`,`M44.5 70 L55.5 70 L57 88 L43 88 Z`]];function Cn(e,t,n){return t.includes(e)?`mm-p`:n.includes(e)?`mm-s`:`mm-b`}function wn(e,t,n,r,i){return N`
    <ellipse class="mm-n" cx="50" cy="15" rx="8.5" ry="10.5"></ellipse>
    <path class="mm-n" d="M45 25 L55 25 L56 32 L44 32 Z"></path>
    ${e.map(([e,t])=>N`
      <path class=${Cn(e,n,r)} d=${t}></path>
      <path class=${Cn(e,n,r)} d=${vn(t)}></path>`)}
    ${t.map(([e,t])=>N`<path class=${Cn(e,n,r)} d=${t}></path>`)}
    ${i?``:N`<path class="mm-n" d="M44 97 Q50 100 56 97 L53 103 L47 103 Z"></path>`}
    <circle class="mm-n" cx="38.5" cy="147.5" r="3.6"></circle><circle class="mm-n" cx="61.5" cy="147.5" r="3.6"></circle>
    <ellipse class="mm-n" cx="18.5" cy="100.5" rx="3.2" ry="4.6"></ellipse><ellipse class="mm-n" cx="81.5" cy="100.5" rx="3.2" ry="4.6"></ellipse>
    <ellipse class="mm-n" cx="37.5" cy="190" rx="5" ry="3"></ellipse><ellipse class="mm-n" cx="62.5" cy="190" rx="5" ry="3"></ellipse>`}function Tn(e=[],t=[],{compact:n=!1}={}){return M`
    <div class="mm ${n?`mm-compact`:``}">
      <figure>
        <svg viewBox="12 2 76 194" role="img" aria-label="Muscles sollicités, vue de face">${wn(yn,bn,e,t,!1)}</svg>
        ${n?``:M`<figcaption>Face</figcaption>`}
      </figure>
      <figure>
        <svg viewBox="12 2 76 194" role="img" aria-label="Muscles sollicités, vue de dos">${wn(xn,Sn,e,t,!0)}</svg>
        ${n?``:M`<figcaption>Dos</figcaption>`}
      </figure>
    </div>`}var En=[];function B(e,t,n){En.push({id:e,name:t,...n})}B(`bench_bb`,`Développé couché barre`,{g:`pecs`,p:[`chest`],s:[`delts_front`,`triceps`],eq:`barbell`,lv:2,mech:`compound`,rec:[4,`6-8`,150],inc:2.5,track:`wr`,goals:[`force`,`hypertrophie`],setup:`Allongé sur le banc, yeux sous la barre. Pieds à plat, omoplates serrées et abaissées, légère cambrure naturelle. Mains un peu plus larges que les épaules.`,how:`Descends la barre de façon contrôlée jusqu’au bas des pectoraux, puis pousse vers le haut et légèrement vers l’arrière jusqu’au-dessus des épaules.`,cues:[`Omoplates « rangées dans les poches arrière » du début à la fin`,`Avant-bras verticaux en bas du mouvement`,`Coudes à environ 45–70° du buste, pas à 90°`,`Pousse le sol avec les pieds pour rester stable`],errors:[`Faire rebondir la barre sur la poitrine`,`Décoller les fesses du banc`,`Coudes ouverts à 90° (stress sur l’épaule)`],breath:`Grande inspiration bloquée avant la descente, expire en fin de poussée.`}),B(`bench_db`,`Développé couché haltères`,{g:`pecs`,p:[`chest`],s:[`delts_front`,`triceps`],eq:`dumbbell`,lv:1,mech:`compound`,rec:[3,`8-12`,120],inc:2,track:`wr`,goals:[`hypertrophie`],setup:`Assis au bout du banc, haltères sur les cuisses. Allonge-toi en les ramenant à la poitrine. Omoplates serrées, pieds au sol.`,how:`Pousse les haltères au-dessus de la poitrine en les rapprochant légèrement, puis redescends jusqu’à sentir l’étirement des pectoraux.`,cues:[`Amplitude plus grande qu’à la barre : profite de l’étirement`,`Poignets droits, au-dessus des coudes`,`Haltères qui se rapprochent sans se cogner en haut`],errors:[`Descendre trop bas au point de perdre la position des épaules`,`Laisser tomber les haltères en fin de série`],breath:`Inspire en descendant, expire en poussant.`}),B(`incline_bb`,`Développé incliné barre`,{g:`pecs`,p:[`chest`],s:[`delts_front`,`triceps`],eq:`barbell`,lv:2,mech:`compound`,rec:[4,`6-10`,150],inc:2.5,track:`wr`,goals:[`force`,`hypertrophie`],setup:`Banc incliné à 30°. Omoplates serrées, prise légèrement plus large que les épaules.`,how:`Descends la barre vers le haut de la poitrine (sous les clavicules), puis pousse à la verticale.`,cues:[`30° suffisent : au-delà, les épaules prennent le relais`,`Garde la poitrine haute`,`Contrôle 2 secondes à la descente`],errors:[`Banc trop incliné`,`Barre qui descend vers le cou`],breath:`Inspire et bloque avant la descente, expire en fin de poussée.`}),B(`incline_db`,`Développé incliné haltères`,{g:`pecs`,p:[`chest`],s:[`delts_front`,`triceps`],eq:`dumbbell`,lv:1,mech:`compound`,rec:[3,`8-10`,120],inc:2,track:`wr`,goals:[`hypertrophie`],setup:`Banc à 30°, haltères posés sur les cuisses puis ramenés à hauteur de poitrine. Omoplates serrées.`,how:`Pousse les haltères au-dessus du haut de la poitrine, redescends lentement jusqu’à l’étirement.`,cues:[`Coudes légèrement sous les poignets`,`Trajectoire en léger arc vers l’intérieur`,`Le haut des pectoraux travaille : sens-le s’étirer`],errors:[`Cambrer fortement pour « tricher »`,`Rebondir en bas`],breath:`Inspire en descendant, expire en poussant.`}),B(`decline_bb`,`Développé décliné`,{g:`pecs`,p:[`chest`],s:[`triceps`,`delts_front`],eq:`barbell`,lv:2,mech:`compound`,rec:[3,`8-10`,120],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`Banc décliné, jambes bloquées sous les boudins. Omoplates serrées, prise un peu plus large que les épaules.`,how:`Descends la barre vers le bas des pectoraux, puis pousse à la verticale.`,cues:[`Fais-toi aider pour décrocher la barre`,`Amplitude contrôlée`,`Tête bien posée sur le banc`],errors:[`Descendre trop vite`,`Décrocher seul une charge lourde`],breath:`Inspire avant la descente, expire en poussant.`}),B(`fly_db`,`Écartés haltères`,{g:`pecs`,p:[`chest`],s:[`delts_front`],eq:`dumbbell`,lv:1,mech:`isolation`,rec:[3,`10-15`,75],inc:2,track:`wr`,goals:[`hypertrophie`],setup:`Allongé sur banc plat, haltères au-dessus de la poitrine, paumes face à face, coudes légèrement fléchis.`,how:`Ouvre les bras en arc de cercle jusqu’à l’étirement des pectoraux, puis referme comme pour enlacer un arbre.`,cues:[`Angle des coudes figé pendant tout le mouvement`,`Descends jusqu’à hauteur des épaules, pas plus`,`Serre les pectoraux en haut`],errors:[`Plier puis tendre les bras (ça devient un développé)`,`Charge trop lourde qui force l’épaule`],breath:`Inspire en ouvrant, expire en refermant.`}),B(`cable_fly`,`Écartés poulie vis-à-vis`,{g:`pecs`,p:[`chest`],s:[`delts_front`],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`Poulies réglées à hauteur d’épaules. Un pas en avant, buste légèrement penché, coudes un peu fléchis.`,how:`Ramène les mains devant toi en arc de cercle jusqu’à ce qu’elles se croisent presque, puis reviens lentement.`,cues:[`Tension constante : ne laisse jamais les charges se reposer`,`Mouvement des bras, pas du buste`,`Pause d’une seconde mains jointes`],errors:[`Basculer le buste pour finir le mouvement`,`Bras tendus verrouillés`],breath:`Expire en rapprochant les mains, inspire au retour.`}),B(`cable_fly_low`,`Écartés poulie bas vers haut`,{g:`pecs`,p:[`chest`],s:[`delts_front`],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`Poulies en position basse, poignées en main, un pas en avant. Bras le long du corps, coudes légèrement fléchis.`,how:`Monte les mains en arc vers le haut et vers le centre jusqu’à hauteur du menton, puis redescends lentement.`,cues:[`Cible le haut des pectoraux, la zone à développer en priorité`,`Paumes vers le haut`,`Contrôle la descente en 2 secondes`],errors:[`Hausser les épaules`,`Tirer avec les biceps`],breath:`Expire en montant, inspire en redescendant.`}),B(`chest_press`,`Chest Press (machine)`,{g:`pecs`,p:[`chest`],s:[`delts_front`,`triceps`],eq:`machine`,lv:1,mech:`compound`,rec:[3,`10-12`,90],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Règle le siège pour que les poignées soient à hauteur du milieu des pectoraux. Dos plaqué, omoplates serrées.`,how:`Pousse les poignées devant toi sans verrouiller les coudes, puis reviens jusqu’à sentir l’étirement.`,cues:[`Siège réglé = poignées au niveau du sternum`,`Garde le dos collé au dossier`,`Pousse avec la poitrine, pas avec les épaules`],errors:[`Siège trop haut ou trop bas`,`Laisser les charges claquer entre deux reps`],breath:`Expire en poussant, inspire au retour.`}),B(`incline_chest_press`,`Incline Chest Press (machine)`,{g:`pecs`,p:[`chest`],s:[`delts_front`,`triceps`],eq:`machine`,lv:1,mech:`compound`,rec:[3,`10-12`,90],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Siège réglé pour que les poignées partent du haut de la poitrine. Dos plaqué, omoplates serrées.`,how:`Pousse vers le haut et l’avant sans verrouiller, redescends lentement.`,cues:[`Poitrine haute`,`Coudes sous les poignets`,`Cible le haut des pectoraux`],errors:[`Décoller le dos du dossier`,`Amplitude réduite par une charge trop lourde`],breath:`Expire en poussant, inspire au retour.`}),B(`pec_deck`,`Pec Deck / Butterfly`,{g:`pecs`,p:[`chest`],s:[`delts_front`],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Siège réglé pour que les coudes soient à hauteur d’épaules. Dos plaqué.`,how:`Rapproche les bras devant toi jusqu’au contact, marque une pause, puis reviens lentement.`,cues:[`Coudes légèrement fléchis et fixes`,`Pense « coudes vers le centre »`,`Étire sans forcer en position ouverte`],errors:[`Ouvrir au-delà de la ligne des épaules`,`Mouvement en à-coups`],breath:`Expire en fermant, inspire en ouvrant.`}),B(`pushup`,`Pompes`,{g:`pecs`,p:[`chest`],s:[`triceps`,`delts_front`,`abs`],eq:`bodyweight`,lv:1,mech:`compound`,rec:[3,`max`,60],inc:0,track:`r`,goals:[`endurance`,`hypertrophie`],setup:`Mains un peu plus larges que les épaules, corps gainé de la tête aux talons.`,how:`Descends la poitrine jusqu’à quelques centimètres du sol, puis pousse en gardant le corps aligné.`,cues:[`Fessiers et abdos serrés`,`Coudes à 45° du buste`,`Version facile : mains sur un banc`],errors:[`Bassin qui s’affaisse`,`Amplitude partielle`],breath:`Inspire en descendant, expire en poussant.`}),B(`dips_chest`,`Dips (buste penché)`,{g:`pecs`,p:[`chest`],s:[`triceps`,`delts_front`],eq:`bodyweight`,lv:2,mech:`compound`,rec:[3,`6-12`,120],inc:0,track:`r`,goals:[`hypertrophie`,`force`],setup:`Mains sur les barres parallèles, bras tendus, buste incliné vers l’avant, jambes légèrement en arrière.`,how:`Descends jusqu’à ce que les épaules passent un peu sous les coudes, puis remonte en poussant.`,cues:[`Buste penché = plus de pectoraux`,`Épaules basses, loin des oreilles`,`Utilise la machine assistée si besoin`],errors:[`Descendre trop bas avec des épaules raides`,`Balancer les jambes`],breath:`Inspire en descendant, expire en remontant.`}),B(`pullup`,`Tractions`,{g:`dos`,p:[`lats`],s:[`biceps`,`upper_back`,`forearms`],eq:`bodyweight`,lv:3,mech:`compound`,rec:[4,`5-8`,150],inc:0,track:`r`,goals:[`force`,`hypertrophie`],setup:`Suspendu à la barre, prise pronation un peu plus large que les épaules, bras tendus, abdos gainés.`,how:`Tire les coudes vers les hanches jusqu’à passer le menton au-dessus de la barre, puis redescends bras tendus.`,cues:[`Commence par abaisser les omoplates`,`Poitrine vers la barre`,`Descente lente et complète`],errors:[`Balancer le corps (kipping)`,`Demi-répétitions`],breath:`Expire en montant, inspire en descendant.`}),B(`assisted_pullup`,`Tractions assistées (machine)`,{g:`dos`,p:[`lats`],s:[`biceps`,`upper_back`],eq:`machine`,lv:1,mech:`compound`,rec:[3,`8-10`,120],inc:-5,track:`wr`,goals:[`force`,`hypertrophie`],bf:!0,assisted:!0,setup:`Genoux sur le plateau, prise un peu plus large que les épaules. La charge sélectionnée t’aide : moins de charge = plus difficile.`,how:`Tire les coudes vers les hanches jusqu’au menton au-dessus de la barre, redescends bras tendus.`,cues:[`Objectif : baisser l’assistance de semaine en semaine`,`Omoplates abaissées avant de tirer`,`Contrôle la descente`],errors:[`Trop d’assistance pour finir trop facilement`,`Hausser les épaules`],breath:`Expire en montant, inspire en descendant.`}),B(`lat_pulldown`,`Tirage vertical`,{g:`dos`,p:[`lats`],s:[`biceps`,`upper_back`,`delts_rear`],eq:`cable`,lv:1,mech:`compound`,rec:[4,`8-10`,120],inc:2.5,track:`wr`,goals:[`hypertrophie`,`force`],bf:!0,setup:`Cuisses bloquées sous les boudins, prise large en pronation, buste légèrement incliné en arrière.`,how:`Tire la barre vers le haut de la poitrine en amenant les coudes vers les hanches, puis remonte bras tendus.`,cues:[`Pense « coudes dans les poches »`,`Poitrine vers la barre`,`Étire complètement en haut`],errors:[`Tirer derrière la nuque`,`Se balancer en arrière pour arracher la charge`],breath:`Expire en tirant, inspire en remontant.`}),B(`seated_row`,`Tirage horizontal (poulie)`,{g:`dos`,p:[`upper_back`,`lats`],s:[`biceps`,`delts_rear`],eq:`cable`,lv:1,mech:`compound`,rec:[4,`10-12`,90],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Assis, pieds sur les cales, genoux légèrement fléchis, dos droit, poignée triangle.`,how:`Tire la poignée vers le bas du ventre en serrant les omoplates, puis reviens bras tendus en laissant les épaules avancer.`,cues:[`Buste quasi immobile`,`Serre les omoplates 1 seconde`,`Étire le dos en avant au retour`],errors:[`Basculer le buste d’avant en arrière`,`Hausser les épaules`],breath:`Expire en tirant, inspire au retour.`}),B(`row_bb`,`Rowing barre`,{g:`dos`,p:[`upper_back`,`lats`],s:[`biceps`,`delts_rear`,`lower_back`],eq:`barbell`,lv:2,mech:`compound`,rec:[4,`6-10`,120],inc:2.5,track:`wr`,goals:[`force`,`hypertrophie`],setup:`Debout, barre en mains, genoux fléchis, buste penché à environ 45°, dos plat.`,how:`Tire la barre vers le nombril en ramenant les coudes en arrière, puis redescends bras tendus.`,cues:[`Dos plat et gainé du début à la fin`,`Coudes près du corps`,`Le buste ne remonte pas pour aider`],errors:[`Dos arrondi`,`Se redresser à chaque répétition`],breath:`Expire en tirant, inspire en descendant.`}),B(`row_db`,`Rowing haltère unilatéral`,{g:`dos`,p:[`lats`,`upper_back`],s:[`biceps`,`delts_rear`],eq:`dumbbell`,lv:1,mech:`compound`,rec:[3,`8-10`,90],inc:2,track:`wr`,goals:[`hypertrophie`],uni:!0,setup:`Une main et un genou sur le banc, dos plat, haltère dans l’autre main bras tendu.`,how:`Tire l’haltère vers la hanche en gardant le coude près du corps, puis redescends en étirant.`,cues:[`Tire vers la hanche, pas vers l’épaule`,`Épaules parallèles au sol`,`Étirement complet en bas`],errors:[`Faire tourner le buste`,`Tirer avec le biceps`],breath:`Expire en tirant, inspire en descendant.`}),B(`row_machine`,`Rowing machine`,{g:`dos`,p:[`upper_back`,`lats`],s:[`biceps`,`delts_rear`],eq:`machine`,lv:1,mech:`compound`,rec:[3,`10-12`,90],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Poitrine contre l’appui, siège réglé pour que les poignées soient à hauteur du bas des pectoraux.`,how:`Tire les poignées en arrière en serrant les omoplates, puis reviens bras tendus.`,cues:[`Poitrine collée à l’appui`,`Coudes vers l’arrière`,`Pause en contraction`],errors:[`Décoller la poitrine`,`Amplitude raccourcie`],breath:`Expire en tirant, inspire au retour.`}),B(`cable_pullover`,`Pull-over poulie`,{g:`dos`,p:[`lats`],s:[`triceps`,`chest`],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`Face à la poulie haute, corde ou barre droite, un pas en arrière, buste penché, bras quasi tendus.`,how:`Abaisse les mains en arc de cercle jusqu’aux cuisses en gardant les bras tendus, puis remonte lentement.`,cues:[`Bras tendus, coudes légèrement souples`,`Pense « coudes vers les hanches »`,`Étire bien en haut`],errors:[`Plier les bras (ça devient un triceps)`,`Hausser les épaules`],breath:`Expire en descendant, inspire en remontant.`}),B(`deadlift`,`Soulevé de terre`,{g:`dos`,p:[`lower_back`,`glutes`,`hamstrings`],s:[`quads`,`upper_back`,`traps`,`forearms`],eq:`barbell`,lv:3,mech:`compound`,rec:[3,`5-6`,180],inc:5,track:`wr`,goals:[`force`],setup:`Barre au-dessus du milieu du pied, prise juste à l’extérieur des jambes, dos plat, hanches entre genoux et épaules.`,how:`Pousse le sol avec les jambes en gardant la barre contre les tibias puis les cuisses, termine debout hanches tendues. Redescends en reculant les hanches.`,cues:[`Barre collée au corps tout le long`,`Dos neutre, jamais arrondi`,`Gainage maximal avant chaque répétition`],errors:[`Dos rond`,`Tirer avec les bras`,`Hyper-extension en haut`],breath:`Inspire et bloque au sol, expire en haut.`}),B(`back_extension`,`Extensions lombaires`,{g:`dos`,p:[`lower_back`],s:[`glutes`,`hamstrings`],eq:`bodyweight`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:0,track:`r`,goals:[`endurance`],setup:`Sur le banc à 45°, hanches juste au-dessus du coussin, bras croisés sur la poitrine.`,how:`Descends le buste en gardant le dos plat, puis remonte jusqu’à l’alignement jambes-buste.`,cues:[`Remonte jusqu’à l’alignement, pas au-delà`,`Serre les fessiers en haut`,`Ajoute un disque contre la poitrine pour progresser`],errors:[`Hyper-extension en haut`,`Mouvement rapide en balancier`],breath:`Inspire en descendant, expire en remontant.`}),B(`shrug_db`,`Haussements d’épaules haltères`,{g:`dos`,p:[`traps`],s:[`forearms`],eq:`dumbbell`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2,track:`wr`,goals:[`hypertrophie`],setup:`Debout, haltères le long du corps, bras tendus.`,how:`Monte les épaules vers les oreilles, tiens 1 seconde, redescends lentement.`,cues:[`Mouvement vertical, sans rouler les épaules`,`Bras détendus comme des crochets`,`Pause en haut`],errors:[`Plier les coudes`,`Faire des rotations d’épaules`],breath:`Expire en montant, inspire en descendant.`}),B(`ohp_bb`,`Développé militaire barre`,{g:`epaules`,p:[`delts_front`],s:[`delts_side`,`triceps`,`abs`],eq:`barbell`,lv:2,mech:`compound`,rec:[4,`6-8`,150],inc:2.5,track:`wr`,goals:[`force`],setup:`Debout, barre posée sur le haut de la poitrine, prise à largeur d’épaules, fessiers et abdos serrés.`,how:`Pousse la barre à la verticale en reculant légèrement la tête, puis passe la tête sous la barre en haut. Redescends sous contrôle.`,cues:[`Gainage total : fessiers serrés`,`Barre au-dessus du milieu du pied en haut`,`Avant-bras verticaux`],errors:[`Cambrer le bas du dos`,`Pousser la barre vers l’avant`],breath:`Inspire et bloque avant de pousser, expire en haut.`}),B(`ohp_db`,`Développé haltères assis`,{g:`epaules`,p:[`delts_front`],s:[`delts_side`,`triceps`],eq:`dumbbell`,lv:1,mech:`compound`,rec:[3,`8-10`,120],inc:2,track:`wr`,goals:[`hypertrophie`],setup:`Banc à 80–90°, dos plaqué, haltères à hauteur des oreilles, paumes vers l’avant.`,how:`Pousse les haltères au-dessus de la tête sans les cogner, redescends à hauteur des oreilles.`,cues:[`Dos collé au dossier`,`Coudes légèrement vers l’avant`,`Ne verrouille pas en haut`],errors:[`Cambrer pour finir les reps`,`Descendre trop bas en forçant l’épaule`],breath:`Expire en poussant, inspire en descendant.`}),B(`shoulder_press`,`Shoulder Press (machine)`,{g:`epaules`,p:[`delts_front`],s:[`delts_side`,`triceps`],eq:`machine`,lv:1,mech:`compound`,rec:[3,`10-12`,90],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Siège réglé pour que les poignées soient à hauteur d’épaules. Dos plaqué.`,how:`Pousse vers le haut sans verrouiller les coudes, redescends lentement.`,cues:[`Dos collé au dossier`,`Coudes sous les poignées`,`Tempo contrôlé`],errors:[`Siège mal réglé`,`Charges qui claquent`],breath:`Expire en poussant, inspire en descendant.`}),B(`lateral_db`,`Élévations latérales haltères`,{g:`epaules`,p:[`delts_side`],s:[`traps`],eq:`dumbbell`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:1,track:`wr`,goals:[`hypertrophie`],setup:`Debout, haltères le long du corps, buste légèrement penché vers l’avant, coudes légèrement fléchis.`,how:`Monte les bras sur les côtés jusqu’à hauteur d’épaules, comme pour verser deux carafes, puis redescends en 2 secondes.`,cues:[`Le coude guide, pas la main`,`Pas plus haut que les épaules`,`Charge légère, exécution stricte`],errors:[`Balancer le buste`,`Hausser les épaules vers les oreilles`],breath:`Expire en montant, inspire en descendant.`}),B(`lateral_cable`,`Élévations latérales poulie`,{g:`epaules`,p:[`delts_side`],s:[],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:1.25,track:`wr`,goals:[`hypertrophie`],uni:!0,setup:`Poulie basse, poignée dans la main opposée, câble devant le corps, l’autre main en appui.`,how:`Monte le bras sur le côté jusqu’à hauteur d’épaule, puis redescends lentement.`,cues:[`Tension continue, même en bas`,`Coude légèrement fléchi`,`Buste immobile`],errors:[`Utiliser l’élan`,`Monter au-delà de l’épaule`],breath:`Expire en montant, inspire en descendant.`}),B(`rear_fly_db`,`Oiseau haltères`,{g:`epaules`,p:[`delts_rear`],s:[`upper_back`],eq:`dumbbell`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:1,track:`wr`,goals:[`hypertrophie`],setup:`Assis au bout du banc, buste penché sur les cuisses, haltères sous les jambes, coudes légèrement fléchis.`,how:`Écarte les bras sur les côtés jusqu’à l’horizontale, puis redescends lentement.`,cues:[`Pense « écarter », pas « tirer »`,`Pouces légèrement vers le bas`,`Charge légère`],errors:[`Se redresser pendant le mouvement`,`Plier les bras pour tricher`],breath:`Expire en écartant, inspire en descendant.`}),B(`reverse_pec_deck`,`Reverse Pec Deck`,{g:`epaules`,p:[`delts_rear`],s:[`upper_back`],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Face au dossier, poignées à hauteur d’épaules, bras devant toi.`,how:`Écarte les bras vers l’arrière jusqu’à l’alignement avec les épaules, puis reviens lentement.`,cues:[`Coudes légèrement fléchis et fixes`,`Poitrine contre le dossier`,`Pause en position ouverte`],errors:[`Hausser les épaules`,`Ouvrir trop loin derrière`],breath:`Expire en ouvrant, inspire au retour.`}),B(`face_pull`,`Face Pull`,{g:`epaules`,p:[`delts_rear`],s:[`upper_back`,`traps`],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`15-20`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`Poulie haute à hauteur du visage, corde en mains, un pas en arrière.`,how:`Tire la corde vers le front en écartant les mains et en ouvrant les coudes, puis reviens bras tendus.`,cues:[`Coudes hauts, au niveau des épaules`,`Termine pouces vers l’arrière`,`Excellent pour la santé des épaules`],errors:[`Tirer vers le cou ou la poitrine`,`Charge trop lourde`],breath:`Expire en tirant, inspire au retour.`}),B(`curl_bb`,`Curl barre`,{g:`biceps`,p:[`biceps`],s:[`forearms`],eq:`barbell`,lv:1,mech:`isolation`,rec:[3,`8-12`,75],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`Debout, barre en supination à largeur d’épaules, coudes contre le buste.`,how:`Fléchis les coudes pour monter la barre jusqu’aux épaules, puis redescends complètement.`,cues:[`Coudes fixes contre le corps`,`Descente en 2 secondes`,`Bras tendus en bas`],errors:[`Balancer le dos`,`Avancer les coudes en haut`],breath:`Expire en montant, inspire en descendant.`}),B(`curl_db`,`Curl haltères`,{g:`biceps`,p:[`biceps`],s:[`forearms`],eq:`dumbbell`,lv:1,mech:`isolation`,rec:[3,`10-12`,60],inc:1,track:`wr`,goals:[`hypertrophie`],setup:`Debout ou assis, haltères le long du corps, paumes vers l’avant.`,how:`Monte les haltères en tournant légèrement les poignets vers l’extérieur, redescends lentement.`,cues:[`Coudes fixes`,`Serre le biceps en haut`,`En alterné si tu veux plus de concentration`],errors:[`Utiliser l’élan`,`Amplitude partielle`],breath:`Expire en montant, inspire en descendant.`}),B(`hammer_curl`,`Curl marteau`,{g:`biceps`,p:[`biceps`,`forearms`],s:[],eq:`dumbbell`,lv:1,mech:`isolation`,rec:[3,`10-12`,60],inc:1,track:`wr`,goals:[`hypertrophie`],setup:`Debout, haltères le long du corps, paumes face au corps.`,how:`Monte les haltères sans tourner les poignets, redescends lentement.`,cues:[`Prise neutre tout le long`,`Coudes collés`,`Travaille aussi l’avant-bras`],errors:[`Balancer`,`Écarter les coudes`],breath:`Expire en montant, inspire en descendant.`}),B(`preacher_curl`,`Curl pupitre`,{g:`biceps`,p:[`biceps`],s:[],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`10-12`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Assis, aisselles calées en haut du pupitre, bras posés à plat.`,how:`Fléchis les coudes jusqu’en haut, puis redescends presque jusqu’à l’extension complète.`,cues:[`Les bras ne quittent jamais le pupitre`,`Descente lente : c’est là que tout se joue`,`Ne verrouille pas brutalement en bas`],errors:[`Décoller les coudes`,`Lâcher la charge en bas`],breath:`Expire en montant, inspire en descendant.`}),B(`cable_curl`,`Curl poulie`,{g:`biceps`,p:[`biceps`],s:[`forearms`],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Face à la poulie basse, barre droite ou EZ, coudes contre le buste.`,how:`Monte la barre jusqu’aux épaules, redescends en gardant la tension.`,cues:[`Tension constante`,`Coudes immobiles`,`Pause en haut`],errors:[`Reculer le buste`,`Avancer les coudes`],breath:`Expire en montant, inspire en descendant.`}),B(`incline_curl`,`Curl incliné`,{g:`biceps`,p:[`biceps`],s:[],eq:`dumbbell`,lv:2,mech:`isolation`,rec:[3,`10-12`,60],inc:1,track:`wr`,goals:[`hypertrophie`],setup:`Banc incliné à 45–60°, dos plaqué, bras tendus vers le sol en arrière du buste.`,how:`Monte les haltères sans avancer les coudes, redescends jusqu’à l’étirement complet.`,cues:[`Le biceps est étiré : charge plus légère qu’un curl debout`,`Coudes pointés vers le sol`,`Pas d’élan`],errors:[`Avancer les épaules`,`Charge trop lourde`],breath:`Expire en montant, inspire en descendant.`}),B(`pushdown`,`Extension poulie (corde)`,{g:`triceps`,p:[`triceps`],s:[],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`10-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Face à la poulie haute, corde en main, coudes collés au buste, buste légèrement penché.`,how:`Pousse la corde vers le bas en écartant les mains en fin de mouvement, puis remonte jusqu’à 90°.`,cues:[`Seuls les avant-bras bougent`,`Écarte la corde en bas`,`Pause bras tendus`],errors:[`Coudes qui avancent et reculent`,`S’appuyer de tout son poids`],breath:`Expire en poussant, inspire en remontant.`}),B(`overhead_cable`,`Extension poulie au-dessus de la tête`,{g:`triceps`,p:[`triceps`],s:[],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`10-12`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`Dos à la poulie haute, corde derrière la tête, un pied en avant, coudes vers le haut.`,how:`Tends les bras vers l’avant et le haut, puis reviens lentement derrière la tête.`,cues:[`Étirement maximal du long chef du triceps`,`Coudes serrés et fixes`,`Buste gainé`],errors:[`Coudes qui s’écartent`,`Cambrer le dos`],breath:`Expire en tendant, inspire au retour.`}),B(`skullcrusher`,`Barre au front`,{g:`triceps`,p:[`triceps`],s:[],eq:`barbell`,lv:2,mech:`isolation`,rec:[3,`8-12`,75],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`Allongé sur banc plat, barre EZ bras tendus au-dessus des épaules.`,how:`Fléchis les coudes pour descendre la barre vers le front ou juste derrière la tête, puis tends les bras.`,cues:[`Coudes pointés vers le plafond`,`Descente contrôlée`,`Bras légèrement inclinés vers l’arrière`],errors:[`Coudes qui s’ouvrent`,`Charge trop lourde pour les coudes`],breath:`Inspire en descendant, expire en tendant.`}),B(`overhead_db`,`Extension haltère au-dessus de la tête`,{g:`triceps`,p:[`triceps`],s:[],eq:`dumbbell`,lv:1,mech:`isolation`,rec:[3,`10-12`,60],inc:2,track:`wr`,goals:[`hypertrophie`],setup:`Assis dos droit, un haltère tenu à deux mains au-dessus de la tête.`,how:`Descends l’haltère derrière la tête en fléchissant les coudes, puis remonte bras tendus.`,cues:[`Coudes près de la tête`,`Dos plaqué`,`Étire bien en bas`],errors:[`Cambrer le bas du dos`,`Coudes écartés`],breath:`Inspire en descendant, expire en remontant.`}),B(`dips`,`Dips (triceps)`,{g:`triceps`,p:[`triceps`],s:[`chest`,`delts_front`],eq:`bodyweight`,lv:2,mech:`compound`,rec:[3,`8-12`,90],inc:0,track:`r`,goals:[`hypertrophie`],setup:`Mains sur les barres parallèles, buste droit, bras tendus.`,how:`Descends jusqu’à environ 90° aux coudes en gardant le buste vertical, puis remonte.`,cues:[`Buste vertical = plus de triceps`,`Coudes vers l’arrière`,`Utilise l’assistance si besoin`],errors:[`Descendre trop bas`,`Épaules qui remontent`],breath:`Inspire en descendant, expire en remontant.`}),B(`assisted_dips`,`Dips assistés (machine)`,{g:`triceps`,p:[`triceps`],s:[`chest`,`delts_front`],eq:`machine`,lv:1,mech:`compound`,rec:[3,`8-12`,90],inc:-5,track:`wr`,goals:[`hypertrophie`],bf:!0,assisted:!0,setup:`Genoux sur le plateau, mains sur les poignées. La charge t’aide : moins de charge = plus difficile.`,how:`Descends jusqu’à environ 90° aux coudes, puis pousse jusqu’aux bras tendus.`,cues:[`Baisse l’assistance quand tu atteins le haut de la fourchette`,`Buste droit`,`Épaules basses`],errors:[`Descendre trop bas`,`Rebondir en bas`],breath:`Inspire en descendant, expire en poussant.`}),B(`close_grip_bench`,`Développé serré`,{g:`triceps`,p:[`triceps`],s:[`chest`,`delts_front`],eq:`barbell`,lv:2,mech:`compound`,rec:[3,`6-10`,120],inc:2.5,track:`wr`,goals:[`force`,`hypertrophie`],setup:`Allongé sur banc plat, prise à largeur d’épaules, omoplates serrées.`,how:`Descends la barre vers le bas des pectoraux, coudes proches du corps, puis pousse.`,cues:[`Prise largeur d’épaules, pas plus serrée`,`Coudes rentrés`,`Poignets droits`],errors:[`Prise trop serrée qui fait mal aux poignets`,`Coudes qui s’ouvrent`],breath:`Inspire et bloque, expire en poussant.`}),B(`squat_bb`,`Squat barre`,{g:`quadri`,p:[`quads`,`glutes`],s:[`adductors`,`lower_back`,`abs`],eq:`barbell`,lv:2,mech:`compound`,rec:[4,`6-8`,150],inc:5,track:`wr`,goals:[`force`,`hypertrophie`],setup:`Barre sur le haut des trapèzes, pieds largeur d’épaules légèrement ouverts, regard devant.`,how:`Descends en poussant les genoux vers l’extérieur et les hanches vers l’arrière jusqu’à ce que les cuisses passent l’horizontale, puis remonte en poussant le sol.`,cues:[`Gainage maximal avant de descendre`,`Genoux dans l’axe des pieds`,`Poids sur le milieu du pied`],errors:[`Genoux qui rentrent`,`Talons qui décollent`,`Dos qui s’arrondit en bas`],breath:`Grande inspiration bloquée en haut, expire après le passage difficile.`}),B(`goblet_squat`,`Squat goblet`,{g:`quadri`,p:[`quads`,`glutes`],s:[`adductors`,`abs`],eq:`dumbbell`,lv:1,mech:`compound`,rec:[3,`10-12`,90],inc:2,track:`wr`,goals:[`hypertrophie`],setup:`Debout, un haltère tenu verticalement contre la poitrine, pieds largeur d’épaules.`,how:`Descends entre les genoux en gardant le buste droit, puis remonte.`,cues:[`Coudes à l’intérieur des genoux en bas`,`Buste droit`,`Idéal pour apprendre le squat`],errors:[`Talons qui décollent`,`Dos rond`],breath:`Inspire en descendant, expire en remontant.`}),B(`leg_press`,`Presse à cuisses`,{g:`quadri`,p:[`quads`,`glutes`],s:[`adductors`,`hamstrings`],eq:`machine`,lv:1,mech:`compound`,rec:[4,`10-12`,120],inc:5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Dos et bassin plaqués, pieds largeur de hanches au milieu du plateau.`,how:`Descends le plateau jusqu’à environ 90° aux genoux sans décoller le bassin, puis pousse sans verrouiller.`,cues:[`Le bassin ne décolle jamais`,`Genoux dans l’axe des pieds`,`Ne verrouille pas les genoux en haut`],errors:[`Descendre au point d’enrouler le bas du dos`,`Pousser avec les mains sur les genoux`],breath:`Inspire en descendant, expire en poussant.`}),B(`hack_squat`,`Hack Squat`,{g:`quadri`,p:[`quads`],s:[`glutes`,`adductors`],eq:`machine`,lv:2,mech:`compound`,rec:[4,`8-10`,120],inc:5,track:`wr`,goals:[`hypertrophie`,`force`],setup:`Dos et épaules contre les appuis, pieds largeur d’épaules au milieu de la plateforme.`,how:`Descends le plus bas possible en gardant le dos plaqué, puis remonte.`,cues:[`Amplitude complète`,`Pieds plus bas = plus de quadriceps`,`Contrôle la descente`],errors:[`Talons qui décollent`,`Bassin qui s’enroule`],breath:`Inspire en descendant, expire en remontant.`}),B(`leg_extension`,`Leg Extension`,{g:`quadri`,p:[`quads`],s:[],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Dos plaqué, genoux alignés avec l’axe de la machine, boudin au-dessus des chevilles.`,how:`Tends les jambes jusqu’à l’extension, tiens 1 seconde, redescends lentement.`,cues:[`Axe des genoux = axe de la machine`,`Pause en haut`,`Tiens les poignées pour rester assis`],errors:[`Donner des coups de jambes`,`Décoller les fesses`],breath:`Expire en tendant, inspire en descendant.`}),B(`lunge_db`,`Fentes haltères`,{g:`quadri`,p:[`quads`,`glutes`],s:[`adductors`,`hamstrings`],eq:`dumbbell`,lv:1,mech:`compound`,rec:[3,`10-12`,90],inc:2,track:`wr`,goals:[`hypertrophie`,`athletique`],uni:!0,setup:`Debout, haltères le long du corps, buste droit.`,how:`Fais un grand pas en avant et descends jusqu’à ce que le genou arrière frôle le sol, puis repousse pour revenir.`,cues:[`Genou avant au-dessus du pied`,`Buste droit`,`Pousse avec le talon avant`],errors:[`Pas trop court`,`Genou avant qui rentre`],breath:`Inspire en descendant, expire en remontant.`}),B(`bulgarian_split`,`Bulgarian Split Squat`,{g:`quadri`,p:[`quads`,`glutes`],s:[`adductors`,`hamstrings`],eq:`dumbbell`,lv:2,mech:`compound`,rec:[3,`8-10`,90],inc:2,track:`wr`,goals:[`hypertrophie`,`athletique`],uni:!0,setup:`Pied arrière posé sur un banc, pied avant à environ un grand pas devant, haltères en main.`,how:`Descends verticalement jusqu’à ce que la cuisse avant soit à l’horizontale, puis remonte.`,cues:[`Le pied avant porte tout le poids`,`Buste légèrement penché = plus de fessiers`,`Commence par ta jambe la plus faible`],errors:[`Pied avant trop proche du banc`,`Perdre l’équilibre en allant trop vite`],breath:`Inspire en descendant, expire en remontant.`}),B(`rdl_bb`,`Soulevé de terre roumain`,{g:`ischios`,p:[`hamstrings`,`glutes`],s:[`lower_back`,`forearms`],eq:`barbell`,lv:2,mech:`compound`,rec:[3,`8-10`,120],inc:5,track:`wr`,goals:[`force`,`hypertrophie`],setup:`Debout, barre en mains à largeur d’épaules, genoux légèrement fléchis, dos plat.`,how:`Recule les hanches en faisant glisser la barre le long des cuisses jusqu’à mi-tibias ou à l’étirement des ischios, puis remonte en poussant les hanches vers l’avant.`,cues:[`Mouvement de charnière : les hanches reculent`,`Barre collée aux jambes`,`Genoux fixes, légèrement fléchis`],errors:[`Dos rond`,`Plier les genoux comme un squat`],breath:`Inspire en descendant, expire en remontant.`}),B(`leg_curl_seated`,`Leg Curl assis`,{g:`ischios`,p:[`hamstrings`],s:[`calves`],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`10-12`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Genoux alignés avec l’axe, boudin au-dessus des talons, cale de cuisses bien serrée.`,how:`Fléchis les jambes au maximum, tiens 1 seconde, remonte lentement.`,cues:[`Penche légèrement le buste en avant pour plus d’étirement`,`Pause en contraction`,`Remontée en 2 secondes`],errors:[`Cale de cuisses trop lâche`,`Mouvement en à-coups`],breath:`Expire en fléchissant, inspire au retour.`}),B(`leg_curl_lying`,`Leg Curl couché`,{g:`ischios`,p:[`hamstrings`],s:[`calves`],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`10-12`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Allongé à plat ventre, genoux juste après le bord du banc, boudin au-dessus des talons.`,how:`Ramène les talons vers les fessiers, puis redescends lentement.`,cues:[`Bassin plaqué contre le banc`,`Pause en haut`,`Pieds fléchis (orteils vers les tibias)`],errors:[`Décoller les hanches`,`Laisser retomber la charge`],breath:`Expire en montant, inspire en descendant.`}),B(`hip_thrust`,`Hip Thrust`,{g:`ischios`,p:[`glutes`],s:[`hamstrings`,`quads`],eq:`barbell`,lv:2,mech:`compound`,rec:[3,`8-12`,90],inc:5,track:`wr`,goals:[`hypertrophie`,`athletique`],setup:`Haut du dos appuyé contre un banc, barre (avec mousse) sur les hanches, pieds à plat largeur de hanches.`,how:`Pousse les hanches vers le haut jusqu’à l’alignement épaules-genoux, serre les fessiers, puis redescends.`,cues:[`Menton rentré, regard vers l’avant`,`Tibias verticaux en haut`,`Pause de 1 seconde fessiers serrés`],errors:[`Cambrer le bas du dos au lieu de serrer les fessiers`,`Pieds trop loin`],breath:`Expire en montant, inspire en descendant.`}),B(`glute_bridge`,`Glute Bridge`,{g:`ischios`,p:[`glutes`],s:[`hamstrings`],eq:`bodyweight`,lv:1,mech:`isolation`,rec:[3,`15-20`,45],inc:0,track:`r`,goals:[`endurance`],setup:`Allongé sur le dos, genoux fléchis, pieds à plat près des fessiers.`,how:`Monte le bassin en serrant les fessiers jusqu’à l’alignement, redescends lentement.`,cues:[`Pousse avec les talons`,`Serre fort en haut`,`Ajoute un disque sur les hanches pour progresser`],errors:[`Cambrer le dos`,`Pousser avec la pointe des pieds`],breath:`Expire en montant, inspire en descendant.`}),B(`abductor`,`Abducteurs (machine)`,{g:`ischios`,p:[`abductors`],s:[`glutes`],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`15-20`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Assis, dos plaqué, coussins contre l’extérieur des genoux.`,how:`Écarte les cuisses au maximum, tiens 1 seconde, reviens sans laisser les charges claquer.`,cues:[`Buste légèrement penché en avant = plus de fessiers`,`Contrôle le retour`,`Stabilise la hanche, utile au gardien`],errors:[`Mouvement rapide`,`Amplitude partielle`],breath:`Expire en écartant, inspire au retour.`}),B(`adductor`,`Adducteurs (machine)`,{g:`quadri`,p:[`adductors`],s:[],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Assis, dos plaqué, coussins contre l’intérieur des genoux, écartement confortable.`,how:`Resserre les cuisses, tiens 1 seconde, reviens lentement.`,cues:[`Ouverture de départ sans douleur`,`Mouvement lent`,`Protège l’aine lors des plongeons`],errors:[`Ouvrir trop large au départ`,`Claquer les charges`],breath:`Expire en serrant, inspire au retour.`}),B(`calf_standing`,`Mollets debout`,{g:`mollets`,p:[`calves`],s:[],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Épaules sous les appuis, avant des pieds sur la marche, talons dans le vide.`,how:`Descends les talons au maximum, puis monte sur la pointe des pieds le plus haut possible.`,cues:[`Pause de 1 seconde étiré en bas`,`Pause en haut`,`Genoux tendus mais pas verrouillés`],errors:[`Rebondir en bas`,`Amplitude réduite`],breath:`Expire en montant, inspire en descendant.`}),B(`calf_seated`,`Mollets assis`,{g:`mollets`,p:[`calves`],s:[],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`15-20`,45],inc:5,track:`wr`,goals:[`hypertrophie`],setup:`Assis, genoux sous les appuis, avant des pieds sur la marche.`,how:`Descends les talons au maximum, monte sur la pointe des pieds.`,cues:[`Cible le soléaire (genoux fléchis)`,`Amplitude complète`,`Tempo lent`],errors:[`Rebondir`,`Demi-répétitions`],breath:`Expire en montant, inspire en descendant.`}),B(`calf_leg_press`,`Mollets à la presse`,{g:`mollets`,p:[`calves`],s:[],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Sur la presse, avant des pieds sur le bas du plateau, jambes quasi tendues, sécurités en place.`,how:`Pousse le plateau avec la pointe des pieds, puis laisse les talons revenir vers toi.`,cues:[`Garde les sécurités engagées`,`Amplitude complète`,`Genoux fixes`],errors:[`Plier les genoux`,`Pieds qui glissent`],breath:`Expire en poussant, inspire au retour.`}),B(`crunch`,`Crunch`,{g:`abdos`,p:[`abs`],s:[],eq:`bodyweight`,lv:1,mech:`isolation`,rec:[3,`15-20`,45],inc:0,track:`r`,goals:[`endurance`],setup:`Allongé sur le dos, genoux fléchis, mains derrière les oreilles sans tirer sur la nuque.`,how:`Enroule le haut du dos en rapprochant les côtes du bassin, puis redescends lentement.`,cues:[`Enroule, ne te redresse pas`,`Bas du dos au sol`,`Expire à fond en haut`],errors:[`Tirer sur la nuque`,`Mouvement rapide`],breath:`Expire en enroulant, inspire en redescendant.`}),B(`cable_crunch`,`Crunch poulie`,{g:`abdos`,p:[`abs`],s:[`obliques`],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],setup:`À genoux face à la poulie haute, corde tenue de chaque côté de la tête.`,how:`Enroule le buste vers le bas en rapprochant les coudes des cuisses, puis remonte lentement.`,cues:[`Les hanches ne bougent pas`,`Enroule la colonne`,`Charge progressive comme un vrai exercice`],errors:[`Tirer avec les bras`,`S’asseoir sur les talons`],breath:`Expire en enroulant, inspire en remontant.`}),B(`crunch_machine`,`Crunch machine`,{g:`abdos`,p:[`abs`],s:[],eq:`machine`,lv:1,mech:`isolation`,rec:[3,`12-15`,60],inc:2.5,track:`wr`,goals:[`hypertrophie`],bf:!0,setup:`Assis, pieds calés, poignées ou coussins contre la poitrine.`,how:`Enroule le buste vers l’avant, tiens 1 seconde, reviens lentement.`,cues:[`Nombril rentré`,`N’arrache pas avec les bras`,`Contrôle le retour`],errors:[`Utiliser l’élan`,`Charge trop lourde`],breath:`Expire en enroulant, inspire au retour.`}),B(`plank`,`Gainage`,{g:`abdos`,p:[`abs`],s:[`obliques`,`delts_front`,`glutes`],eq:`bodyweight`,lv:1,mech:`isolation`,rec:[3,`30-60`,45],inc:0,track:`t`,goals:[`endurance`],setup:`Sur les avant-bras et la pointe des pieds, coudes sous les épaules.`,how:`Maintiens le corps aligné de la tête aux talons pendant toute la durée.`,cues:[`Serre fessiers et abdos`,`Rentre légèrement le bassin`,`Respire calmement`],errors:[`Bassin trop haut ou qui s’affaisse`,`Bloquer la respiration`],breath:`Respiration courte et régulière, sans bloquer.`}),B(`leg_raise`,`Relevés de jambes`,{g:`abdos`,p:[`abs`],s:[`obliques`],eq:`bodyweight`,lv:2,mech:`isolation`,rec:[3,`10-15`,60],inc:0,track:`r`,goals:[`hypertrophie`],setup:`Sur la chaise romaine, avant-bras sur les appuis, dos plaqué, jambes pendantes.`,how:`Monte les genoux vers la poitrine en enroulant le bassin, redescends lentement.`,cues:[`Enroule le bassin en haut`,`Pas de balancier`,`Version difficile : jambes tendues`],errors:[`Balancer les jambes`,`Cambrer en bas`],breath:`Expire en montant, inspire en descendant.`}),B(`russian_twist`,`Russian Twist`,{g:`abdos`,p:[`obliques`],s:[`abs`],eq:`bodyweight`,lv:1,mech:`isolation`,rec:[3,`20`,45],inc:0,track:`r`,goals:[`endurance`],setup:`Assis, buste incliné à 45°, pieds au sol ou décollés, mains jointes ou disque en main.`,how:`Tourne le buste d’un côté à l’autre en gardant le dos droit.`,cues:[`Rotation du buste, pas des bras`,`Dos droit`,`Compte 1 répétition par côté`],errors:[`Dos rond`,`Aller trop vite`],breath:`Expire à chaque rotation.`}),B(`ab_wheel`,`Ab Wheel`,{g:`abdos`,p:[`abs`],s:[`lats`,`obliques`],eq:`bodyweight`,lv:3,mech:`isolation`,rec:[3,`8-12`,60],inc:0,track:`r`,goals:[`force`],setup:`À genoux, mains sur la roue sous les épaules, bassin légèrement rentré.`,how:`Fais rouler la roue vers l’avant aussi loin que possible sans cambrer, puis reviens.`,cues:[`Bassin rentré tout le long`,`Amplitude progressive au fil des semaines`,`Bras quasi tendus`],errors:[`Cambrer le bas du dos`,`Revenir avec les hanches en premier`],breath:`Inspire en allant, expire en revenant.`}),B(`pallof_press`,`Pallof Press`,{g:`abdos`,p:[`obliques`],s:[`abs`],eq:`cable`,lv:1,mech:`isolation`,rec:[3,`10-12`,45],inc:2.5,track:`wr`,goals:[`athletique`],uni:!0,setup:`De profil à la poulie réglée à hauteur de poitrine, poignée contre le sternum, pieds largeur d’épaules.`,how:`Tends les bras devant toi en résistant à la rotation, tiens 2 secondes, ramène.`,cues:[`Le buste ne doit pas tourner`,`Fessiers serrés`,`Anti-rotation : clé pour le gardien`],errors:[`Se laisser tourner`,`Charge trop lourde`],breath:`Expire en tendant les bras.`}),B(`box_jump`,`Box Jump`,{g:`athle`,p:[`quads`,`glutes`],s:[`calves`,`hamstrings`],eq:`bodyweight`,lv:2,mech:`compound`,rec:[4,`4`,90],inc:0,track:`r`,goals:[`athletique`],setup:`Debout face à une box stable (50–60 cm pour commencer), pieds largeur de hanches.`,how:`Fléchis rapidement les jambes en lançant les bras, saute sur la box, réceptionne-toi en douceur. Redescends en marchant.`,cues:[`Qualité maximale, jamais en fatigue`,`Réception silencieuse, genoux dans l’axe`,`Redescends en marchant, pas en sautant`],errors:[`Box trop haute`,`Enchaîner sans récupérer`],breath:`Expire au moment du saut.`}),B(`lateral_bound`,`Bonds latéraux`,{g:`athle`,p:[`glutes`,`abductors`],s:[`quads`,`calves`,`adductors`],eq:`bodyweight`,lv:2,mech:`compound`,rec:[3,`6`,60],inc:0,track:`r`,goals:[`athletique`],uni:!0,setup:`En appui sur une jambe, légèrement fléchie, buste penché vers l’avant.`,how:`Pousse latéralement pour bondir sur l’autre jambe, stabilise 1 seconde, repars.`,cues:[`Réception stable avant de repartir`,`Genou dans l’axe du pied`,`Reproduit le déplacement du gardien`],errors:[`Genou qui rentre à la réception`,`Enchaîner sans contrôle`],breath:`Expire à chaque poussée.`}),B(`broad_jump`,`Saut en longueur`,{g:`athle`,p:[`glutes`,`quads`],s:[`hamstrings`,`calves`],eq:`bodyweight`,lv:2,mech:`compound`,rec:[3,`4`,90],inc:0,track:`r`,goals:[`athletique`],setup:`Debout, pieds largeur de hanches, espace dégagé devant toi.`,how:`Lance les bras, saute le plus loin possible vers l’avant et réceptionne-toi genoux fléchis.`,cues:[`Extension complète hanches-genoux-chevilles`,`Réception équilibrée`,`Récupère entre chaque saut`],errors:[`Réception jambes tendues`,`Manque d’échauffement`],breath:`Expire au saut.`}),B(`treadmill`,`Tapis de course`,{g:`cardio`,p:[],s:[`quads`,`calves`,`hamstrings`],eq:`cardio`,lv:1,mech:`compound`,rec:[1,`20`,0],inc:0,track:`c`,goals:[`endurance`],bf:!0,setup:`Monte sur le tapis à l’arrêt, attache la clé de sécurité.`,how:`Course ou marche rapide à allure régulière. Augmente progressivement la vitesse.`,cues:[`Allure où tu peux encore parler par phrases courtes`,`Foulée courte et légère`,`Ne t’accroche pas aux barres`],errors:[`Démarrer trop vite`,`Courir trop près de l’avant du tapis`],breath:`Respiration régulière, par le nez et la bouche.`}),B(`incline_walk`,`Marche inclinée`,{g:`cardio`,p:[],s:[`glutes`,`calves`,`hamstrings`],eq:`cardio`,lv:1,mech:`compound`,rec:[1,`20`,0],inc:0,track:`c`,goals:[`endurance`],bf:!0,setup:`Tapis à 10–12 % d’inclinaison, vitesse 4,5–5,5 km/h.`,how:`Marche à rythme soutenu sans te tenir aux barres.`,cues:[`Brûle des calories sans impact sur les articulations`,`Buste droit`,`Tu dois transpirer mais pouvoir parler`],errors:[`Se tenir aux barres (le travail disparaît)`,`Pente trop forte dès le début`],breath:`Respiration régulière.`}),B(`bike`,`Vélo`,{g:`cardio`,p:[],s:[`quads`,`glutes`],eq:`cardio`,lv:1,mech:`compound`,rec:[1,`20`,0],inc:0,track:`c`,goals:[`endurance`],bf:!0,setup:`Selle à hauteur de hanche, jambe presque tendue en bas du pédalage.`,how:`Pédale à cadence régulière (80–90 tours/min) en ajustant la résistance.`,cues:[`Bonne option les jours de fatigue articulaire`,`Augmente la résistance, pas seulement la cadence`,`Dos droit`],errors:[`Selle trop basse`,`Résistance nulle`],breath:`Respiration régulière.`}),B(`elliptical`,`Vélo elliptique`,{g:`cardio`,p:[],s:[`quads`,`glutes`,`chest`],eq:`cardio`,lv:1,mech:`compound`,rec:[1,`20`,0],inc:0,track:`c`,goals:[`endurance`],bf:!0,setup:`Pieds au centre des pédales, mains sur les poignées mobiles.`,how:`Mouvement fluide, pousse et tire avec les bras pour engager le haut du corps.`,cues:[`Sans impact`,`Utilise les bras`,`Varie la résistance par intervalles`],errors:[`Se laisser porter par l’élan`,`Résistance trop faible`],breath:`Respiration régulière.`}),B(`rower`,`Rameur`,{g:`cardio`,p:[],s:[`lats`,`upper_back`,`quads`,`glutes`],eq:`cardio`,lv:1,mech:`compound`,rec:[1,`10`,0],inc:0,track:`c`,goals:[`endurance`,`athletique`],bf:!0,setup:`Pieds sanglés, genoux fléchis, bras tendus, dos droit.`,how:`Pousse d’abord avec les jambes, puis bascule le buste et tire la poignée vers le bas des côtes. Reviens dans l’ordre inverse.`,cues:[`Jambes, buste, bras… puis bras, buste, jambes`,`60 % de la puissance vient des jambes`,`En intervalles : 30 s fort / 30 s facile`],errors:[`Tirer avec les bras d’abord`,`Dos rond`],breath:`Expire pendant la poussée, inspire au retour.`}),B(`stairmaster`,`Stairmaster`,{g:`cardio`,p:[],s:[`glutes`,`quads`,`calves`],eq:`cardio`,lv:2,mech:`compound`,rec:[1,`15`,0],inc:0,track:`c`,goals:[`endurance`],bf:!0,setup:`Monte sur les marches, mains posées légèrement sur les poignées.`,how:`Monte les marches à rythme régulier, pied entier sur chaque marche.`,cues:[`Ne t’appuie pas sur les poignées`,`Buste droit`,`Rythme tenable sur toute la durée`],errors:[`Se pencher sur les poignées`,`Vitesse trop élevée`],breath:`Respiration régulière.`});var Dn=En,V=Object.fromEntries(En.map(e=>[e.id,e]));function On(e,t=8){let n=V[e];if(!n)return[];let r=new Set(n.p);return En.filter(t=>t.id!==e&&t.g===n.g).map(e=>{let t=e.p.filter(e=>r.has(e)).length;return{o:e,shared:t,score:t*3+(e.mech===n.mech?2:0)+(e.eq===n.eq?0:1)}}).filter(({shared:e})=>e>0||n.g===`cardio`||n.g===`athle`).sort((e,t)=>t.score-e.score).slice(0,t).map(({o:e})=>e)}function H(e){return e.programs.find(t=>t.id===e.activeProgramId)||e.programs[0]}function kn(e){let t=String(e);if(t===`max`)return{min:null,max:null,label:`max`};let[n,r]=t.split(`-`).map(Number);return{min:n,max:r||n,label:t}}function U(e,t=C()){let n=H(e),r=e.programStart||E(C()),i=Math.floor(st(r,t)/7)+1;return{week:i,total:n.weeks,started:i>=1,finished:i>n.weeks}}function An(e,t){let n=H(e),r=n.blockLength||4,i=Math.min(Math.max(t,1),n.weeks),a=Math.ceil(i/r),o=(i-1)%r+1,s=o===r;return{block:a,weekInBlock:o,deload:s,rir:s?4:Math.max(1,4-o),blockInfo:nt[a-1]||nt[nt.length-1]}}function jn(e,t,n){let r=An(e,n),i=V[t.exId],a=H(e),o=t.sets,{min:s,max:c}=kn(t.reps);(!a.custom||a.adaptive)&&i&&i.track===`wr`&&(r.block>=2&&t.prio&&(o+=1),r.block>=3&&t.prio&&i.mech===`compound`&&s>3&&(--s,--c)),r.deload&&i&&i.track!==`c`&&(o=Math.max(1,o-1));let l=s==null?`max`:s===c?String(s):`${s}-${c}`;return{sets:o,repMin:s,repMax:c,reps:l,rest:t.rest,rir:i&&i.track===`wr`?r.rir:null,deload:r.deload}}function Mn(e,t){let n=e.profile.trainDays.slice().sort((e,t)=>(e+6)%7-(t+6)%7).indexOf(ct(t));if(n<0)return null;let r=H(e);return r.days[n%r.days.length]||null}function Nn(e,t){return e.workouts.filter(e=>e.date===t&&e.status===`done`)}function Pn(e,t){let n=Nn(e,t).length>0,r=Mn(e,t),i=C();if(n)return`done`;if(!r)return`rest`;let{week:a}=U(e,t);return a<1||t<(e.startedOn||`0000`)?`rest`:t<i?`missed`:t===i?`today`:`planned`}function Fn(e){let t=C();for(let n=0;n<14;n++){let r=T(t,n),i=Mn(e,r);if(i&&Nn(e,r).length===0&&U(e,r).week>=1)return{iso:r,day:i,inDays:n}}return null}function In(e,t){let n=[],r=e.workouts.filter(e=>e.status===`done`).sort((e,t)=>t.endedAt-e.endedAt);for(let e of r)for(let r of e.exercises){if(r.exId!==t)continue;let i=r.sets.filter(e=>e.done&&!e.skipped);i.length&&n.push({date:e.date,workoutId:e.id,target:r.target,sets:i})}return n}function Ln(e,t){return!e||!t?0:t===1?e:e*(1+Math.min(t,12)/30)}function Rn(e,t){return!t||t<=0?Math.round(e*2)/2:Math.round(e/t)*t}function zn(e,t,n){let r=V[t];if(!r)return null;let i=In(e,t),a=i[0],o=e.settings.unit;if(r.track===`c`)return{kind:`info`,kg:null,reps:null,text:`Note la durée et, si tu veux, la distance ou le niveau.`};if(r.track===`t`){let e=a?Math.max(...a.sets.map(e=>e.reps||0)):null;return e?{kind:`up`,kg:null,reps:e+5,text:`Dernière fois : ${e} s. Vise ${e+5} s.`}:{kind:`new`,kg:null,reps:n.repMin,text:`Tiens la position avec une technique parfaite.`}}if(r.track===`r`){let e=a?Math.max(...a.sets.map(e=>e.reps||0)):null;if(!e)return{kind:`new`,kg:null,reps:n.repMin,text:`Exécution propre et contrôlée à chaque répétition.`};let t=n.repMax?Math.min(e+1,n.repMax):e+1;return{kind:`up`,kg:null,reps:t,text:`Meilleure série : ${e} reps. Vise ${t}.`}}if(!a)return{kind:`new`,kg:null,reps:n.repMax,text:n.rir==null?`Première fois : commence léger et soigne la technique.`:`Première fois : choisis une charge qui te laisse ${n.rir} répétition${n.rir>1?`s`:``} en réserve à la dernière série.`};let s=a.target?.repMin??n.repMin,c=a.target?.repMax??n.repMax,l=Math.max(...a.sets.map(e=>e.kg||0)),u=a.sets.filter(e=>(e.kg||0)===l),d=c!=null&&u.length>=Math.min(a.sets.length,a.target?.sets||1)&&u.every(e=>e.reps>=c),f=s!=null&&u.some(e=>e.reps<s),ee=i[1]&&i[1].target&&i[1].sets.some(e=>e.reps<i[1].target.repMin),p=Math.abs(r.inc||2.5),m=e=>`${(Math.round(e*10)/10).toLocaleString(`fr-FR`)} ${o}`;if(n.deload){let e=r.assisted?Rn(l*1.1,p):Rn(l*.9,p);return{kind:`deload`,kg:e,reps:n.repMax,text:`Semaine allégée : ${m(e)}, technique parfaite, aucune série à l’échec.`}}if(d){let e=r.assisted?Math.max(0,l-p):l+p;return{kind:`up`,kg:e,reps:n.repMin,text:r.assisted?`${c} reps atteintes partout : assistance réduite à ${m(e)}.`:`${c} reps atteintes sur toutes les séries : passe à ${m(e)}.`}}if(f&&ee){let e=r.assisted?Rn(l*1.05,p):Rn(l*.95,p);return{kind:`down`,kg:e,reps:n.repMin,text:`Deux séances sous ${s} reps : ${m(e)} pour repartir proprement.`}}if(f)return{kind:`hold`,kg:l,reps:s,text:`Garde ${m(l)} et vise au moins ${s} reps sur chaque série.`};let te=Math.max(...u.map(e=>e.reps));return{kind:`hold`,kg:l,reps:Math.min(te+1,c||te+1),text:`Garde ${m(l)} et ajoute 1 rep sur au moins une série.`}}function Bn(e,t,n=1/0){let r=0,i=0,a=null,o=0;for(let s of e.workouts)if(!(s.status!==`done`||s.endedAt>=n)){for(let e of s.exercises)if(e.exId===t)for(let t of e.sets){if(!t.done||t.skipped)continue;(t.reps||0)>o&&(o=t.reps),(t.kg||0)>r&&(r=t.kg);let e=Ln(t.kg,t.reps);e>i&&(i=e,a={kg:t.kg,reps:t.reps,date:s.date})}}return{maxKg:r,bestE1rm:i,bestSet:a,maxReps:o}}function Vn(e,t){let n=[];for(let r of t.exercises){let i=V[r.exId];if(!i||i.track===`c`)continue;let a=Bn(e,r.exId,t.endedAt||Date.now()),o=r.sets.filter(e=>e.done&&!e.skipped);if(o.length&&(a.maxKg>0||a.maxReps>0)){if(i.track===`wr`&&!i.assisted){let e=Math.max(...o.map(e=>e.kg||0)),t=Math.max(...o.map(e=>Ln(e.kg,e.reps)));e>a.maxKg?n.push({exId:r.exId,type:`Charge max`,value:e,prev:a.maxKg,unit:`kg`}):t>a.bestE1rm+.01&&n.push({exId:r.exId,type:`1RM estimé`,value:t,prev:a.bestE1rm,unit:`kg`})}else{let e=Math.max(...o.map(e=>e.reps||0));e>a.maxReps&&n.push({exId:r.exId,type:i.track===`t`?`Durée max`:`Reps max`,value:e,prev:a.maxReps,unit:i.track===`t`?`s`:`reps`})}}}return n}function W(e){let t=0,n=0,r=0,i=0,a=0;for(let o of e.exercises){let e=o.sets.filter(e=>e.done&&!e.skipped);e.length&&i++;let s=V[o.exId];for(let i of e)s?.track===`c`?a+=i.reps||0:(t++,s?.track!==`t`&&(n+=i.reps||0),s?.track===`wr`&&!s.assisted&&(r+=(i.kg||0)*(i.reps||0)))}let o=e.endedAt&&e.startedAt?Math.max(0,(e.endedAt-e.startedAt-(e.pausedMs||0))/1e3):0;return{sets:t,reps:n,volume:r,exercises:i,cardioMin:a,durationSec:o}}function G(e){return e.workouts.filter(e=>e.status===`done`).sort((e,t)=>e.endedAt-t.endedAt)}function Hn(e){let t=new Set(G(e).map(e=>E(e.date))),n=0,r=E(C());for(t.has(r)||(r=T(r,-7));t.has(r);)n++,r=T(r,-7);return n}function Un(e,t){let n=T(t,6),r=G(e).filter(e=>e.date>=t&&e.date<=n),i=r.reduce((e,t)=>{let n=W(t);return e.volume+=n.volume,e.sets+=n.sets,e.duration+=n.durationSec,e.cardio+=n.cardioMin,e},{volume:0,sets:0,duration:0,cardio:0}),a=0;for(let n=0;n<7;n++){let r=T(t,n);Mn(e,r)&&U(e,r).week>=1&&a++}return{count:r.length,planned:a,...i}}function Wn(e,t,n){let r={};for(let i of G(e))if(!(i.date<t||i.date>n))for(let e of i.exercises){let t=V[e.exId];if(!t||t.track===`c`)continue;let n=e.sets.filter(e=>e.done&&!e.skipped).length;n&&(r[t.g]=(r[t.g]||0)+n)}return r}function Gn(e,t,n){let r=0;for(let i of t.items){let t=V[i.exId],a=jn(e,i,n);t?.track===`c`?r+=(parseInt(i.reps,10)||10)*60:r+=a.sets*40+Math.max(0,a.sets-1)*a.rest+60}return Math.round(r/60/5)*5}function Kn(e){let t=e.body.weight.slice().sort((e,t)=>e.date<t.date?-1:1);return t.length?t[t.length-1]:null}var K=null,qn=null,Jn=!1;function Yn(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;K||(K=new e),K.state===`suspended`&&K.resume()}catch{}}function Xn(){if(K)try{K.state===`suspended`&&K.resume();let e=K.currentTime;for(let[t,n]of[[0,.12],[.22,.12],[.44,.12],[.7,.45]]){let r=K.createOscillator(),i=K.createGain();r.type=`square`,r.frequency.value=t>=.7?1320:880,i.gain.setValueAtTime(1e-4,e+t),i.gain.exponentialRampToValueAtTime(.25,e+t+.01),i.gain.exponentialRampToValueAtTime(1e-4,e+t+n),r.connect(i).connect(K.destination),r.start(e+t),r.stop(e+t+n+.02)}}catch{}}function Zn(){try{navigator.vibrate&&navigator.vibrate([250,120,250,120,500])}catch{}}function Qn(){return`Notification`in window&&`serviceWorker`in navigator}function $n(){return Qn()?Notification.permission:`unsupported`}async function er(){if(!Qn())return`unsupported`;if(Notification.permission!=="default")return Notification.permission;try{return await Notification.requestPermission()}catch{return`denied`}}async function tr(e,t){if($n()===`granted`)try{let n=await navigator.serviceWorker.getRegistration(),r={body:t,tag:`forge-rest`,renotify:!0,vibrate:[250,120,250,120,500],icon:`icon-192.png`,badge:`icon-192.png`,requireInteraction:!1};n?await n.showNotification(e,r):new Notification(e,r)}catch{}}async function nr(){try{let e=await navigator.serviceWorker?.getRegistration();(e?await e.getNotifications({tag:`forge-rest`}):[]).forEach(e=>e.close())}catch{}}function rr(e,t={}){let{sound:n=!0,vibration:r=!0,notify:i=!0}=t;n&&Xn(),r&&Zn(),i&&document.visibilityState!==`visible`&&tr(`⏱️ Repos terminé`,e?`À toi : ${e}`:`Série suivante !`)}async function ir(e){Jn=e;try{e&&`wakeLock`in navigator&&!qn?(qn=await navigator.wakeLock.request(`screen`),qn.addEventListener(`release`,()=>{qn=null})):!e&&qn&&(await qn.release(),qn=null)}catch{}}document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&(nr(),Jn&&ir(!0))});function q(){return g.state?.workouts.find(e=>e.status===`active`)||null}function ar(e,t,n,r={}){let i=V[t],a=zn(e,t,n),o=Array.from({length:n.sets},()=>({kg:i.track===`wr`?a?.kg??null:null,reps:a?.reps??n.repMax??n.repMin??null,rir:null,done:!1,skipped:!1}));return{uid:A(),exId:t,target:n,sets:o,note:r.note||``,suggestion:a}}function or(e,{force:t=!1}={}){let n=g.state,r=q();if(r&&!t){v(t=>{t.sheet={name:`confirmReplaceWorkout`,dayId:e}});return}let i=H(n),a=i.days.find(t=>t.id===e)||i.days[0],{week:o}=U(n),s=Math.max(1,Math.min(o,i.weeks)),c=new Set(n.profile.avoid||[]);_(e=>{r&&(e.workouts=e.workouts.filter(e=>e.id!==r.id));let t=a.items.filter(e=>V[e.exId]&&!c.has(e.exId)).map(t=>ar(e,t.exId,jn(e,t,s),t));e.workouts.push({id:A(),status:`active`,programId:i.id,dayId:a.id,name:a.title,subtitle:a.subtitle,week:s,date:C(),startedAt:Date.now(),endedAt:null,pausedMs:0,pausedAt:null,exercises:t,cur:{ex:0},rest:null,feeling:null,notes:``})}),Yn(),sr()}function sr(){v(e=>{e.workoutOpen=!0,e.workoutMode=`log`,e.sheet=null,e.restHidden=!1}),g.state.settings.keepAwake&&ir(!0),Lr()}function cr(){v(e=>{e.workoutOpen=!1,e.sheet=null})}function J(e){_(t=>{let n=t.workouts.find(e=>e.status===`active`);n&&e(n,t)})}function lr(e,t,n,r){J(i=>{i.exercises[e].sets[t][n]=r})}function ur(e,t,n,r){J(i=>{let a=i.exercises[e].sets[t],o=Number(a[n])||0;a[n]=Math.max(0,Math.round((o+r)*100)/100)})}function dr(e){J(t=>{t.cur.ex=e}),v(e=>{e.restHidden=!0})}function fr(e){return e.sets.findIndex(e=>!e.done&&!e.skipped)}function pr(e){let t=e.exercises[e.cur.ex];if(!(t&&fr(t)>=0))for(let t=1;t<=e.exercises.length;t++){let n=(e.cur.ex+t)%e.exercises.length;if(fr(e.exercises[n])>=0){e.cur.ex=n;return}}}function mr(e){return e.exercises.every(e=>fr(e)<0)}function hr(e,t){Yn(),g.state.settings.notifications&&$n()==="default"&&er();let n=q().exercises[e],r=n.sets[t],i=V[n.exId];if(i.track===`wr`&&(r.kg==null||r.kg===``||isNaN(r.kg))){y(`Indique la charge utilisée`,`warn`);return}if(!r.reps||r.reps<=0){y(i.track===`c`?`Indique la durée`:`Indique le nombre de répétitions`,`warn`);return}J((n,r)=>{let a=n.exercises[e],o=a.sets[t];o.done=!0,o.skipped=!1,o.doneAt=Date.now();for(let e=t+1;e<a.sets.length;e++){let t=a.sets[e];!t.done&&!t.skipped&&(t.kg??(t.kg=o.kg),t.reps||(t.reps=o.reps))}pr(n);let s=mr(n),c=a.target.rest||r.settings.defaultRest;n.rest=!s&&i.track!==`c`&&c>0?{endAt:Date.now()+c*1e3,total:c,alerted:!1}:null}),v(e=>{e.restHidden=!1});let a=q();a&&mr(a)&&y(`Toutes les séries sont faites. Termine la séance quand tu veux.`,`success`)}function gr(e,t){J(n=>{let r=n.exercises[e].sets[t];r.done=!1,r.skipped=!1})}function _r(e,t){J(n=>{let r=n.exercises[e].sets[t];r.skipped=!0,r.done=!1,pr(n)})}function vr(e){J(t=>{let n=t.exercises[e],r=n.sets[n.sets.length-1]||{};n.sets.push({kg:r.kg??null,reps:r.reps??null,rir:null,done:!1,skipped:!1}),t.cur.ex=e})}function yr(e,t){J(n=>{let r=n.exercises[e];r.sets.length>1&&r.sets.splice(t,1)})}function br(e){J(t=>{t.exercises[e].sets.forEach(e=>{e.done||(e.skipped=!0)}),pr(t)}),y(`Exercice passé`)}function xr(e,t){J((n,r)=>{let i=n.exercises[e],a=V[t],[o,s,c]=a.rec,l=i.target.sets?{...i.target}:{sets:o,...kn(s),rest:c};if(a.track!==V[i.exId].track){let e=kn(s);l.repMin=e.min,l.repMax=e.max,l.reps=e.label,l.rir=a.track===`wr`?l.rir:null}let u=i.sets.filter(e=>e.done),d=ar(r,t,{...l,sets:Math.max(1,i.sets.length-u.length)});u.length?(i.sets=u,n.exercises.splice(e+1,0,d),n.cur.ex=e+1):n.exercises[e]={...d,replacedFrom:i.exId}}),v(e=>{e.sheet=null}),y(`Remplacé par ${V[t].name}`)}function Sr(e){J((t,n)=>{let r=V[e],[i,a,o]=r.rec,s=kn(a);t.exercises.push(ar(n,e,{sets:i,repMin:s.min,repMax:s.max,reps:s.label,rest:o,rir:r.track===`wr`?2:null,deload:!1})),t.cur.ex=t.exercises.length-1}),v(e=>{e.sheet=null,e.restHidden=!0}),y(`${V[e].name} ajouté`)}function Cr(e,t){J(n=>{let r=e+t;r<0||r>=n.exercises.length||([n.exercises[e],n.exercises[r]]=[n.exercises[r],n.exercises[e]],n.cur.ex=r)})}function wr(e){J(t=>{t.rest||(t.rest={endAt:Date.now(),total:0,alerted:!1}),t.rest.endAt=Math.max(Date.now()+1e3,t.rest.endAt+e*1e3),t.rest.total=Math.max(1,t.rest.total+e),t.rest.alerted=!1})}function Tr(){J(e=>{e.rest=null})}function Er(){v(e=>{e.restHidden=!0})}function Dr(){v(e=>{e.restHidden=!1})}function Or(e){return e?.rest?Math.max(0,Math.ceil((e.rest.endAt-Date.now())/1e3)):0}function kr(){J(e=>{if(e.pausedAt){let t=Date.now()-e.pausedAt;e.pausedMs+=t,e.rest&&(e.rest.endAt+=t),e.pausedAt=null}else e.pausedAt=Date.now()})}function Ar(e){if(!e)return 0;let t=e.pausedAt||e.endedAt||Date.now();return Math.max(0,(t-e.startedAt-(e.pausedMs||0))/1e3)}function jr(){let e=q();e&&(e.exercises.some(e=>e.sets.some(e=>e.done))?(J(e=>{e.pausedAt&&(e.pausedMs+=Date.now()-e.pausedAt,e.pausedAt=null),e.rest=null}),v(e=>{e.workoutMode=`summary`,e.sheet=null})):v(e=>{e.sheet={name:`confirmDiscard`}}))}function Mr(){v(e=>{e.workoutMode=`log`})}function Nr(e,t){J(n=>{n[e]=t})}function Pr(){let e=q()?.id;_(t=>{let n=t.workouts.find(t=>t.id===e);n&&(n.endedAt=Date.now(),n.status=`done`,n.exercises=n.exercises.filter(e=>e.sets.some(e=>e.done)),n.exercises.forEach(e=>{e.sets=e.sets.filter(e=>e.done),delete e.suggestion}),delete n.cur,delete n.rest)}),Rr(),ir(!1),v(e=>{e.workoutOpen=!1,e.workoutMode=`log`,e.sheet=null}),Ze(`home`),y(`Séance enregistrée. Bien joué.`,`success`)}function Fr(){let e=q()?.id;_(t=>{t.workouts=t.workouts.filter(t=>t.id!==e)}),Rr(),ir(!1),v(e=>{e.workoutOpen=!1,e.sheet=null,e.workoutMode=`log`}),y(`Séance abandonnée`)}var Ir=null;function Lr(){Ir||(Ir=setInterval(()=>{let e=q();if(!e)Rr();else{if(e.rest&&!e.rest.alerted&&!e.pausedAt&&Date.now()>=e.rest.endAt){let t=Date.now()-e.rest.endAt,n=e.exercises[e.cur.ex],r=n?fr(n):-1,i=n&&r>=0?`${V[n.exId].name} — série ${r+1}/${n.sets.length}`:``,a=g.state.settings;t<2e4&&rr(i,{sound:a.sound,vibration:a.vibration,notify:a.notifications}),e.rest.alerted=!0,e.rest.endedAt=e.rest.endAt,_(()=>{})}e.rest&&e.rest.alerted&&Date.now()-e.rest.endAt>4e3&&_(e=>{let t=e.workouts.find(e=>e.status===`active`);t&&(t.rest=null)}),g.ui.workoutOpen&&Ye()}},1e3))}function Rr(){clearInterval(Ir),Ir=null}function zr(e){let t=new Set,n=new Set;return e.items.forEach(e=>{let n=V[e.exId];n&&n.p.forEach(e=>t.add(e))}),e.items.forEach(e=>{let r=V[e.exId];r&&r.s.forEach(e=>{t.has(e)||n.add(e)})}),{primary:[...t],secondary:[...n]}}function Br(e){let t=C(),n=Nn(e,t),r=Mn(e,t),{week:i,total:a}=U(e,t),o=An(e,i);if(n.length){let e=n[n.length-1],t=W(e);return M`
      <article class="hero hero-done">
        <p class="eyebrow on-dark">Aujourd’hui · terminé</p>
        <h2 class="display-xl">${e.name}</h2>
        <div class="hero-meta">
          <span>${I(`clock`,15)} ${ht(t.durationSec)}</span>
          <span>${I(`layers`,15)} ${t.sets} séries</span>
          <span>${I(`dumbbell`,15)} ${mt(t.volume)} kg</span>
        </div>
        <button class="btn btn-ghost-light" @click=${()=>Qe(`workoutDetail`,{id:e.id})}>Voir le bilan ${I(`right`,18)}</button>
      </article>`}let s=r&&i>=1?{iso:t,day:r,inDays:0}:Fn(e);if(!s)return F;let{day:c,iso:l,inDays:u}=s,d=U(e,l).week,f=zr(c),ee=Gn(e,c,d),p=u===0;return M`
    <article class="hero ${p?``:`hero-rest`}">
      <div class="hero-bg-num" aria-hidden="true">${String(d).padStart(2,`0`)}</div>
      <div class="hero-grid">
        <div class="hero-main">
          <p class="eyebrow on-dark">${p?`Séance du jour`:`Prochaine séance · ${u===1?`demain`:it[ct(l)].toLowerCase()}`}</p>
          <h2 class="display-xl">${c.title}</h2>
          <p class="hero-sub">${c.subtitle}</p>
          <div class="hero-meta">
            <span>${I(`clock`,15)} ~${ee} min</span>
            <span>${I(`layers`,15)} ${c.items.length} exercices</span>
            ${o.deload?M`<span class="pill pill-info">Semaine allégée</span>`:M`<span>${I(`target`,15)} RIR ${o.rir}</span>`}
          </div>
        </div>
        <div class="hero-map">${Tn(f.primary,f.secondary,{compact:!0})}</div>
      </div>
      <div class="hero-actions">
        ${p?M`<button class="btn btn-primary btn-xl" @click=${()=>or(c.id)}>${I(`play`,20)} Démarrer la séance</button>`:M`
            <button class="btn btn-ghost-light" @click=${()=>Qe(`dayDetail`,{dayId:c.id})}>Voir la séance</button>
            <button class="btn btn-primary" @click=${()=>or(c.id)}>${I(`play`,18)} Faire maintenant</button>`}
      </div>
      <p class="hero-foot">Semaine ${Math.max(1,Math.min(d,a))}/${a} · Bloc ${o.block} ${o.blockInfo.name}</p>
    </article>`}function Vr(e){let t=e.exercises.reduce((e,t)=>e+t.sets.filter(e=>e.done).length,0),n=e.exercises.reduce((e,t)=>e+t.sets.length,0);return M`
    <button class="resume" @click=${sr}>
      <span class="resume-pulse"></span>
      <span class="resume-t">
        <strong>Séance en cours · ${e.name}</strong>
        <small>${t}/${n} séries validées · reprendre là où tu t’es arrêté</small>
      </span>
      ${I(`right`,22)}
    </button>`}function Hr(e){let t=E(C()),n=Un(e,t);return M`
    <div class="card week">
      <div class="week-head">
        <span class="sec-t">Cette semaine</span>
        <span class="week-count"><b>${n.count}</b>/${n.planned||3} séances</span>
      </div>
      <div class="week-days">
        ${[0,1,2,3,4,5,6].map(n=>{let r=T(t,n),i=Pn(e,r),a=Mn(e,r);return M`
            <button class="wd wd-${i}" @click=${()=>a?Qe(`dayDetail`,{dayId:a.id,date:r}):null}
              aria-label="${it[ct(r)]} : ${i}">
              <span class="wd-l">${at[ct(r)]}</span>
              <span class="wd-dot">${i===`done`?I(`check`,14):a?a.id:``}</span>
            </button>`})}
      </div>
    </div>`}function Ur(e){let t=T(E(C()),-7),n=Un(e,t);if(!n.count&&!G(e).length)return F;let r=G(e).filter(e=>e.date>=t&&e.date<=T(t,6)).reduce((t,n)=>t+Vn(e,n).length,0),i=n.count>=n.planned&&n.planned?`Semaine complète. Continue comme ça.`:n.count?`${n.planned-n.count} séance${n.planned-n.count>1?`s`:``} manquée${n.planned-n.count>1?`s`:``}. On repart cette semaine.`:`Aucune séance la semaine dernière. Une seule séance relance la machine.`;return L(`Résumé de la semaine dernière`,M`
    <div class="card recap">
      <div class="recap-grid">
        <div><b>${n.count}/${n.planned}</b><span>séances</span></div>
        <div><b>${mt(n.volume)}</b><span>kg soulevés</span></div>
        <div><b>${ht(n.duration)}</b><span>d’entraînement</span></div>
        <div><b>${r}</b><span>record${r>1?`s`:``}</span></div>
      </div>
      <p class="recap-v">${i}</p>
    </div>`)}function Wr(e){let t=Kn(e),n=e.profile.startWeight,r=e.profile.goalWeight,i=t?t.kg-n:0,a=e.settings.unit,o=G(e),s=o.reduce((e,t)=>{let n=W(t);return e.vol+=n.volume,e.time+=n.durationSec,e},{vol:0,time:0}),c=Hn(e),l=t&&r?t.kg-r:null;return M`
    <div class="stats-grid">
      <button class="stat-btn" @click=${()=>b(`weighIn`)}>
        ${z(`Poids actuel`,t?pt(t.kg,a):`–`,{ic:`scale`,sub:Math.abs(i)<.05?`Stable depuis le début`:M`<span class=${i<0?`good`:`bad`}>${i<0?`−`:`+`}${k(Math.abs(O(i,a)))} ${a}</span> depuis le début`})}
      </button>
      ${z(`Objectif`,r?pt(r,a):`–`,{ic:`target`,sub:l==null?`À définir dans le profil`:l>0?`encore ${k(l)} ${a}`:`Objectif atteint`})}
      ${z(`Séances`,String(o.length),{ic:`flame`,sub:`${ht(s.time)} au total`})}
      ${z(`Régularité`,`${c} sem.`,{ic:`calendar`,sub:c?`consécutives avec au moins 1 séance`:`lance ta série cette semaine`})}
      ${z(`Volume total`,`${mt(s.vol)} kg`,{ic:`dumbbell`,sub:`charge × répétitions`})}
      ${z(`Programme`,`S${Math.max(1,Math.min(U(e).week,H(e).weeks))}`,{ic:`layers`,sub:H(e).name})}
    </div>`}function Gr(e){let t=H(e),{week:n}=U(e);return M`
    <button class="card prog" @click=${()=>Ze(`training`)}>
      <div class="prog-head"><span class="sec-t">${t.name}</span><span class="muted">Semaine ${Math.max(1,Math.min(n,t.weeks))} sur ${t.weeks}</span></div>
      <div class="prog-bar">
        ${Array.from({length:t.weeks},(t,r)=>{let i=r+1,a=An(e,i);return M`<i class="${i<n?`past`:i===n?`cur`:``} ${a.deload?`deload`:``}"></i>`})}
      </div>
      <div class="prog-legend"><span><i class="lg-cur"></i>Semaine en cours</span><span><i class="lg-deload"></i>Semaine allégée</span></div>
    </button>`}function Kr(){let e=g.state,t=e.profile.name?.trim(),n=q();return M`
    <div class="screen">
      <header class="home-head">
        <div>
          <p class="eyebrow">${lt(C())}</p>
          <h1 class="display-l">${t?`Salut ${t}`:`Salut`}</h1>
        </div>
        <button class="avatar" @click=${()=>Ze(`profile`)} aria-label="Profil">${(t||`F`)[0].toUpperCase()}</button>
      </header>
      ${n?Vr(n):Br(e)}
      ${Hr(e)}
      ${L(`Tes chiffres`,Wr(e))}
      ${Gr(e)}
      ${Ur(e)}
      <div class="quick">
        <button class="quick-b" @click=${()=>b(`weighIn`)}>${I(`scale`,20)}<span>Pesée</span></button>
        <button class="quick-b" @click=${()=>b(`measures`)}>${I(`ruler`,20)}<span>Mensurations</span></button>
        <button class="quick-b" @click=${()=>Qe(`history`)}>${I(`history`,20)}<span>Historique</span></button>
      </div>
    </div>`}var{I:qr}=en,Jr=e=>e.strings===void 0,Yr={},Xr=(e,t=Yr)=>e._$AH=t,Y=an(class extends on{constructor(e){if(super(e),e.type!==rn.PROPERTY&&e.type!==rn.ATTRIBUTE&&e.type!==rn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Jr(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===P||t===F)return t;let n=e.element,r=e.name;if(e.type===rn.PROPERTY){if(t===n[r])return P}else if(e.type===rn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return P}else if(e.type===rn.ATTRIBUTE&&n.getAttribute(r)===t+``)return P;return Xr(e),t}}),Zr=[1,2,3,4,5,6,0];function Qr(e,t){return e.profile.trainDays.slice().sort((e,t)=>Zr.indexOf(e)-Zr.indexOf(t))[t]}function $r(e){let t=H(e),{week:n,finished:r}=U(e),i=Math.max(1,Math.min(n,t.weeks)),a=An(e,i),o=E(C());return M`
    <article class="card block-card">
      <div class="block-top">
        <div>
          <p class="eyebrow">Semaine ${i} sur ${t.weeks}</p>
          <h2 class="display-m">Bloc ${a.block} · ${a.blockInfo.name}</h2>
        </div>
        <span class="pill ${a.deload?`pill-info`:`pill-accent`}">${a.deload?`Semaine allégée`:`RIR ${a.rir}`}</span>
      </div>
      <p class="muted">${a.deload?`Une série de moins et charges à −10 % : le corps récupère et assimile les progrès des 3 dernières semaines.`:`${a.blockInfo.goal} Cette semaine, garde environ ${a.rir} répétition${a.rir>1?`s`:``} en réserve sur chaque série.`}</p>
      <div class="prog-bar">${Array.from({length:t.weeks},(t,n)=>M`<i class="${n+1<i?`past`:n+1===i?`cur`:``} ${An(e,n+1).deload?`deload`:``}"></i>`)}</div>
      ${r?M`<p class="note-box">${I(`award`,16)} Programme terminé. Relance un cycle depuis « Mes programmes » avec tes nouvelles charges.</p>`:F}
    </article>

    <div class="day-cards">
      ${t.days.map((t,n)=>{let r=Qr(e,n),a=T(o,Zr.indexOf(r)),s=r==null?`planned`:Pn(e,a),c=zr(t);return M`
          <button class="day-card" @click=${()=>Qe(`dayDetail`,{dayId:t.id})}>
            <span class="day-card-l">
              <span class="day-letter">${t.id}</span>
              <span class="day-wd">${r==null?`—`:it[r]}</span>
            </span>
            <span class="day-card-t">
              <strong class="display-s">${t.title}</strong>
              <small>${t.subtitle}</small>
              <small class="muted">${t.items.length} exercices · ~${Gn(e,t,i)} min</small>
            </span>
            <span class="day-card-map">${Tn(c.primary,c.secondary,{compact:!0})}</span>
            ${s===`done`?M`<span class="day-badge done">${I(`check`,14)}</span>`:s===`missed`?M`<span class="day-badge missed">!</span>`:F}
          </button>`})}
    </div>
    <button class="btn btn-ghost btn-block" @click=${()=>b(`programs`)}>${I(`layers`,18)} Mes programmes</button>`}function ei(e){let t=g.ui.calMonth||C().slice(0,7),n=E(ot(w(`${t}-01`))),r=Array.from({length:42},(e,t)=>T(n,t)),i=e=>{let n=w(`${t}-01`);n.setMonth(n.getMonth()+e),v(e=>{e.calMonth=ot(n).slice(0,7)})},a=C();return M`
    <div class="card cal">
      <div class="cal-head">
        <button class="icon-btn" @click=${()=>i(-1)} aria-label="Mois précédent">${I(`left`,20)}</button>
        <span class="display-s cal-m">${ut(`${t}-01`)}</span>
        <button class="icon-btn" @click=${()=>i(1)} aria-label="Mois suivant">${I(`right`,20)}</button>
      </div>
      <div class="cal-grid">
        ${Zr.map(e=>M`<span class="cal-dow">${at[e]}</span>`)}
        ${r.map(n=>{let r=n.slice(0,7)===t,i=Pn(e,n),o=Mn(e,n),s=Nn(e,n)[0];return M`
            <button class="cal-c cal-${i} ${r?``:`out`} ${n===a?`is-today`:``}"
              @click=${()=>s?Qe(`workoutDetail`,{id:s.id}):o?Qe(`dayDetail`,{dayId:o.id}):null}>
              <span>${Number(n.slice(8))}</span>
              ${i===`rest`?F:M`<i>${i===`done`?``:o?.id||``}</i>`}
            </button>`})}
      </div>
      <div class="cal-legend">
        <span><i class="lg lg-done"></i>Réalisée</span><span><i class="lg lg-planned"></i>Prévue</span>
        <span><i class="lg lg-missed"></i>Manquée</span><span><i class="lg lg-rest"></i>Repos</span>
      </div>
    </div>`}function ti(e){let t=G(e).slice().reverse();if(!t.length)return hn(`history`,`Aucune séance pour l’instant`,`Tes séances terminées apparaîtront ici avec tous leurs détails.`);let n=e.settings.unit;return M`<div class="hist-list">${t.map(e=>{let t=W(e);return M`
      <button class="hist-row" @click=${()=>Qe(`workoutDetail`,{id:e.id})}>
        <span class="hist-date"><b>${Number(e.date.slice(8))}</b><small>${w(e.date).toLocaleDateString(`fr-FR`,{month:`short`})}</small></span>
        <span class="hist-t"><strong>${e.name}</strong><small>${ht(t.durationSec)} · ${t.sets} séries · ${mt(O(t.volume,n))} ${n}</small></span>
        ${I(`right`,18)}
      </button>`})}</div>`}function ni(){return M`<div class="screen">${fn(`Historique`,{back:!0})}${ti(g.state)}</div>`}function ri(){let e=g.state,t=g.ui.trainSeg||`program`;return M`
    <div class="screen">
      ${fn(`Entraînement`,{eyebrow:H(e).name})}
      ${pn([[`program`,`Programme`],[`calendar`,`Calendrier`],[`history`,`Séances`]],t,e=>v(t=>{t.trainSeg=e}))}
      ${t===`program`?$r(e):t===`calendar`?ei(e):ti(e)}
    </div>`}function X(e,t){_(n=>{let r=n.programs.find(e=>e.id===n.activeProgramId),i=r?.days.find(t=>t.id===e);i&&(t(i,r),r.adaptive=!0)})}function ii({dayId:e}){let t=g.state,n=H(t),r=n.days.find(t=>t.id===e);if(!r)return F;let{week:i}=U(t),a=Math.max(1,Math.min(i,n.weeks)),o=g.ui.editDay===e,s=zr(r),c=Qr(t,n.days.indexOf(r));return M`
    <div class="screen">
      ${fn(r.title,{back:!0,eyebrow:`${c==null?``:it[c]} · semaine ${a}`,actions:M`<button class="btn btn-ghost btn-s" @click=${()=>v(t=>{t.editDay=o?null:e})}>${o?`Terminé`:M`${I(`edit`,16)} Modifier`}</button>`})}
      <div class="day-hero">
        <div>
          <p class="day-sub">${r.subtitle}</p>
          ${r.tagline?M`<p class="muted">${r.tagline}</p>`:F}
          <p class="day-meta">${I(`clock`,15)} ~${Gn(t,r,a)} min · ${I(`layers`,15)} ${r.items.length} exercices</p>
        </div>
        <div class="day-hero-map">${Tn(s.primary,s.secondary)}</div>
      </div>

      ${o?M`<label class="field"><span>Nom de la séance</span>
        <input id="day-title" .value=${Y(r.title)} @change=${t=>X(e,e=>{e.title=t.target.value.trim()||e.title})}></label>`:F}

      <ol class="plan">
        ${r.items.map((n,i)=>{let s=V[n.exId];if(!s)return F;let c=jn(t,n,a),l=(t.profile.avoid||[]).includes(n.exId);return M`
            <li class="plan-i ${l?`avoided`:``}">
              <span class="plan-n">${i+1}</span>
              <div class="plan-t">
                <button class="plan-name" @click=${()=>b(`exercise`,{exId:n.exId})}>${s.name}</button>
                <small>${s.track===`c`?`${n.reps} min`:`${c.sets} × ${c.reps}${s.track===`t`?` s`:``}${s.uni?` / côté`:``}${c.rest?` · repos ${gt(c.rest)}`:``}`}${n.prio?M` · <span class="accent">prioritaire</span>`:F}</small>
                ${n.note?M`<small class="plan-note">${n.note}</small>`:F}
                ${l?M`<small class="danger">Marqué à éviter : retiré de la séance</small>`:F}
                ${o?M`
                  <div class="plan-edit">
                    <label>Séries<input type="number" inputmode="numeric" min="1" max="10" .value=${Y(String(n.sets))}
                      @change=${t=>X(e,e=>{e.items[i].sets=Math.max(1,parseInt(t.target.value,10)||1)})}></label>
                    <label>Reps<input .value=${Y(n.reps)} @change=${t=>X(e,e=>{e.items[i].reps=t.target.value.replace(/\s/g,``)||e.items[i].reps})}></label>
                    <label>Repos (s)<input type="number" inputmode="numeric" min="0" step="15" .value=${Y(String(n.rest))}
                      @change=${t=>X(e,e=>{e.items[i].rest=Math.max(0,parseInt(t.target.value,10)||0)})}></label>
                  </div>
                  <div class="plan-tools">
                    <button class="icon-btn" ?disabled=${i===0} @click=${()=>X(e,e=>{[e.items[i-1],e.items[i]]=[e.items[i],e.items[i-1]]})} aria-label="Monter">${I(`arrowup`,18)}</button>
                    <button class="icon-btn" ?disabled=${i===r.items.length-1} @click=${()=>X(e,e=>{[e.items[i+1],e.items[i]]=[e.items[i],e.items[i+1]]})} aria-label="Descendre">${I(`arrowdown`,18)}</button>
                    <button class="icon-btn" @click=${()=>b(`pickExercise`,{mode:`program-replace`,dayId:e,itemIdx:i,baseExId:n.exId})} aria-label="Remplacer">${I(`swap`,18)}</button>
                    <button class="icon-btn" @click=${()=>X(e,e=>{e.items[i].prio=!e.items[i].prio})} aria-label="Prioritaire">${I(`flame`,18)}</button>
                    <button class="icon-btn danger" @click=${()=>X(e,e=>{e.items.splice(i,1)})} aria-label="Supprimer">${I(`trash`,18)}</button>
                  </div>`:F}
              </div>
            </li>`})}
      </ol>
      ${o?M`<button class="btn btn-ghost btn-block" @click=${()=>b(`pickExercise`,{mode:`program-add`,dayId:e})}>${I(`plus`,18)} Ajouter un exercice</button>`:F}
      <div class="sticky-cta">
        <button class="btn btn-primary btn-xl" @click=${()=>or(e)}>${I(`play`,20)} Démarrer ${r.title}</button>
      </div>
    </div>`}function ai(e,t){let n=V[t],[r,i,a]=n.rec;X(e.dayId,n=>{if(e.mode===`program-replace`){let r=n.items[e.itemIdx];n.items[e.itemIdx]={...r,exId:t,note:``}}else n.items.push({uid:A(),exId:t,sets:r,reps:i,rest:a})}),x(),y(e.mode===`program-replace`?`Remplacé par ${n.name}`:`${n.name} ajouté à la séance`)}function oi({id:e}){let t=g.state,n=t.workouts.find(t=>t.id===e);if(!n)return M`<div class="screen">${fn(`Séance`,{back:!0})}${hn(`history`,`Séance introuvable`,`Elle a peut-être été supprimée.`)}</div>`;let r=W(n),i=Vn(t,n),a=t.settings.unit,o=[``,`Très dur`,`Dur`,`Correct`,`Bien`,`Excellent`][n.feeling||0];return M`
    <div class="screen">
      ${fn(n.name,{back:!0,eyebrow:w(n.date).toLocaleDateString(`fr-FR`,{weekday:`long`,day:`numeric`,month:`long`})})}
      <div class="sum-grid">
        <div><b>${ht(r.durationSec)}</b><span>durée</span></div>
        <div><b>${r.sets}</b><span>séries</span></div>
        <div><b>${r.reps}</b><span>reps</span></div>
        <div class="wide"><b>${mt(O(r.volume,a))} ${a}</b><span>volume</span></div>
        ${o?M`<div class="wide"><b>${o}</b><span>ressenti</span></div>`:F}
      </div>
      ${i.length?L(`Records`,M`<ul class="pr-list">${i.map(e=>M`<li><span>${V[e.exId].name}</span><span class="pr-v">${e.type} · <b>${k(e.unit===`kg`?O(e.value,a):e.value)} ${e.unit===`kg`?a:e.unit}</b></span></li>`)}</ul>`):F}
      ${L(`Exercices`,M`
        <div class="wd-list">
          ${n.exercises.map(e=>{let t=V[e.exId];return M`
              <div class="card wd-ex">
                <button class="plan-name" @click=${()=>b(`exercise`,{exId:e.exId})}>${t?.name||e.exId}</button>
                <table class="wd-table">
                  <tbody>${e.sets.map((e,n)=>M`<tr><td>${n+1}</td>
                    <td>${t?.track===`wr`?`${k(O(e.kg,a))} ${a}`:``}</td>
                    <td>${e.reps} ${t?.track===`c`?`min`:t?.track===`t`?`s`:`reps`}</td>
                    <td>${e.rir==null?``:`RIR ${e.rir}`}</td></tr>`)}</tbody>
                </table>
              </div>`})}
        </div>`)}
      ${n.notes?L(`Commentaire`,M`<p class="card quote">${n.notes}</p>`):F}
      <button class="btn btn-ghost btn-block danger" @click=${()=>b(`confirmDeleteWorkout`,{id:e})}>${I(`trash`,18)} Supprimer cette séance</button>
    </div>`}function si(e){_(t=>{t.workouts=t.workouts.filter(t=>t.id!==e)}),x(),$e(),y(`Séance supprimée`)}function ci(){let e=g.state;return R(`Mes programmes`,M`
    <div class="prog-list">
      ${e.programs.map(t=>{let n=t.id===e.activeProgramId;return M`
          <div class="card prog-item ${n?`on`:``}">
            <div class="prog-item-t">
              <strong class="display-s">${t.name}</strong>
              <small>${t.days.length} séances · ${t.weeks} semaines${n?` · actif`:``}</small>
            </div>
            <div class="prog-item-a">
              ${n?M`<span class="pill pill-accent">Actif</span>`:M`<button class="btn btn-ghost btn-s" @click=${()=>li(t.id)}>Activer</button>`}
              <button class="icon-btn" @click=${()=>ui(t.id)} aria-label="Dupliquer">${I(`copy`,18)}</button>
              <button class="icon-btn" @click=${()=>b(`renameProgram`,{id:t.id})} aria-label="Renommer">${I(`edit`,18)}</button>
              ${e.programs.length>1?M`<button class="icon-btn danger" @click=${()=>di(t.id)} aria-label="Supprimer">${I(`trash`,18)}</button>`:F}
            </div>
          </div>`})}
    </div>
    <div class="stack">
      <button class="btn btn-ghost btn-block" @click=${fi}>${I(`plus`,18)} Nouveau programme FORGE 12 semaines</button>
      <button class="btn btn-ghost btn-block" @click=${pi}>${I(`plus`,18)} Programme vierge (3 séances à remplir)</button>
      <button class="btn btn-ghost btn-block" @click=${mi}>${I(`reset`,18)} Recommencer le programme actif à la semaine 1</button>
    </div>
    <p class="muted small">La progression des charges reste calculée sur tes séances réelles, quel que soit le programme.</p>
  `,{tall:!0})}function li(e){_(t=>{t.activeProgramId=e,t.programStart=E(C()),t.startedOn=C()}),y(`Programme activé à partir de cette semaine`)}function ui(e){_(t=>{let n=t.programs.find(t=>t.id===e),r=JSON.parse(JSON.stringify(n));r.id=`p_${A()}`,r.name=`${n.name} (copie)`,r.custom=!0,r.adaptive=!0,t.programs.push(r)}),y(`Programme dupliqué`)}function di(e){_(t=>{t.programs=t.programs.filter(t=>t.id!==e),t.activeProgramId===e&&(t.activeProgramId=t.programs[0].id)}),y(`Programme supprimé`)}function fi(){_(e=>{let t=tt();t.id=`p_${A()}`,e.programs.push(t)}),y(`Programme ajouté : active-le pour l’utiliser`)}function pi(){_(e=>{e.programs.push({id:`p_${A()}`,name:`Mon programme`,level:`Personnalisé`,weeks:8,blockLength:4,custom:!0,adaptive:!0,days:[`A`,`B`,`C`].map(e=>({id:e,title:`Séance ${e}`,subtitle:`Personnalisée`,tagline:``,items:[]}))})}),y(`Programme vierge créé`)}function mi(){_(e=>{e.programStart=E(C()),e.startedOn=C()}),y(`Programme relancé : semaine 1`),x()}function hi({id:e}){let t=g.state.programs.find(t=>t.id===e);if(!t)return F;let n=t.name;return R(`Renommer`,M`
    <label class="field"><span>Nom du programme</span><input id="prog-name" .value=${Y(t.name)} @input=${e=>{n=e.target.value}}></label>
    <label class="field"><span>Durée (semaines)</span><input id="prog-weeks" type="number" min="4" max="24" step="1" .value=${Y(String(t.weeks))}
      @change=${n=>_(r=>{r.programs.find(t=>t.id===e).weeks=Math.min(24,Math.max(4,parseInt(n.target.value,10)||t.weeks))})}></label>
  `,{footer:M`<button class="btn btn-primary btn-block" @click=${()=>{_(r=>{r.programs.find(t=>t.id===e).name=n.trim()||t.name}),b(`programs`)}}>Enregistrer</button>`})}var gi={chest:`Pectoraux`,delts_front:`Deltoïdes antérieurs`,delts_side:`Deltoïdes latéraux`,delts_rear:`Deltoïdes postérieurs`,biceps:`Biceps`,triceps:`Triceps`,forearms:`Avant-bras`,abs:`Grand droit`,obliques:`Obliques`,quads:`Quadriceps`,adductors:`Adducteurs`,abductors:`Moyen fessier`,hamstrings:`Ischio-jambiers`,glutes:`Grand fessier`,calves:`Mollets`,lats:`Grand dorsal`,upper_back:`Rhomboïdes / trapèzes moyens`,traps:`Trapèzes supérieurs`,lower_back:`Lombaires`},_i=[{id:`pecs`,label:`Pectoraux`,regions:[`chest`]},{id:`dos`,label:`Dos`,regions:[`lats`,`upper_back`,`traps`,`lower_back`]},{id:`epaules`,label:`Épaules`,regions:[`delts_front`,`delts_side`,`delts_rear`]},{id:`biceps`,label:`Biceps`,regions:[`biceps`,`forearms`]},{id:`triceps`,label:`Triceps`,regions:[`triceps`]},{id:`quadri`,label:`Quadriceps`,regions:[`quads`,`adductors`]},{id:`ischios`,label:`Ischios & fessiers`,regions:[`hamstrings`,`glutes`,`abductors`]},{id:`mollets`,label:`Mollets`,regions:[`calves`]},{id:`abdos`,label:`Abdominaux`,regions:[`abs`,`obliques`]},{id:`athle`,label:`Athlétique`,regions:[]},{id:`cardio`,label:`Cardio`,regions:[]}],vi={barbell:`Barre`,dumbbell:`Haltères`,machine:`Machine`,cable:`Poulie`,bodyweight:`Poids du corps`,cardio:`Cardio`},yi={1:`Débutant`,2:`Intermédiaire`,3:`Avancé`},bi=e=>e.toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``);function xi({q:e=``,group:t=`all`,equip:n=`all`}){let r=bi(e.trim());return Dn.filter(e=>(t===`all`||e.g===t)&&(n===`all`||e.eq===n)&&(!r||bi(e.name).includes(r)||e.p.concat(e.s).some(e=>bi(gi[e]).includes(r))))}function Si(e,t,n=I(`right`,18)){let r=(g.state.profile.avoid||[]).includes(e.id);return M`
    <button class="ex-row" @click=${t}>
      <span class="ex-row-map">${Tn(e.p,e.s,{compact:!0})}</span>
      <span class="ex-row-t">
        <strong>${e.name}</strong>
        <small>${e.p.length?gi[e.p[0]]:`Cardio`} · ${vi[e.eq]}${e.bf?` · Basic-Fit`:``}</small>
      </span>
      ${r?M`<span class="pill pill-danger">À éviter</span>`:_n(e.lv)}
      ${n}
    </button>`}function Ci(){let e=g.ui.lib,t=xi(e),n=(e,t)=>v(n=>{n.lib={...n.lib,[e]:t}});return M`
    <div class="screen">
      ${fn(`Exercices`,{eyebrow:`${Dn.length} exercices`})}
      <label class="search">
        ${I(`search`,18)}
        <input id="lib-search" type="search" placeholder="Rechercher un exercice ou un muscle" .value=${Y(e.q)}
          @input=${e=>n(`q`,e.target.value)}>
      </label>
      ${mn([[`all`,`Tous`],..._i.map(e=>[e.id,e.label])],e.group,e=>n(`group`,e))}
      ${mn([[`all`,`Tout matériel`],...Object.entries(vi)],e.equip,e=>n(`equip`,e))}
      <p class="muted list-count">${t.length} résultat${t.length>1?`s`:``}</p>
      <div class="ex-list">
        ${t.length?t.map(e=>Si(e,()=>b(`exercise`,{exId:e.id}))):hn(`search`,`Aucun exercice`,`Essaie un autre mot ou retire un filtre.`)}
      </div>
    </div>`}function wi({exId:e}){let t=V[e];if(!t)return F;let n=g.state.settings.unit,r=In(g.state,e).slice(0,5),i=Bn(g.state,e),a=On(e,6),[o,s,c]=t.rec,l=(g.state.profile.avoid||[]).includes(e);return R(t.name,M`
    <div class="exd">
      <div class="exd-tags">
        <span class="pill">${vi[t.eq]}</span>
        <span class="pill">${yi[t.lv]}</span>
        <span class="pill">${t.mech===`compound`?`Polyarticulaire`:`Isolation`}</span>
        ${t.bf?M`<span class="pill pill-accent">Dispo Basic-Fit</span>`:F}
      </div>
      <div class="exd-map">
        ${Tn(t.p,t.s)}
        <div class="exd-legend">
          <p><i class="dot-p"></i><span><b>Principal</b>${t.p.map(e=>gi[e]).join(`, `)||`Système cardio-vasculaire`}</span></p>
          ${t.s.length?M`<p><i class="dot-s"></i><span><b>Secondaire</b>${t.s.map(e=>gi[e]).join(`, `)}</span></p>`:F}
        </div>
      </div>

      <div class="exd-rec">
        <div><b>${o}</b><span>séries</span></div>
        <div><b>${s}</b><span>${t.track===`c`?`minutes`:t.track===`t`?`secondes`:`reps`}</span></div>
        <div><b>${c?gt(c):`–`}</b><span>repos</span></div>
      </div>

      <h3 class="exd-h">Position de départ</h3>
      <p class="exd-p">${t.setup}</p>
      <h3 class="exd-h">Exécution</h3>
      <p class="exd-p">${t.how}</p>
      <h3 class="exd-h">Consignes clés</h3>
      <ul class="exd-list good">${t.cues.map(e=>M`<li>${I(`check`,16)}<span>${e}</span></li>`)}</ul>
      <h3 class="exd-h">Erreurs à éviter</h3>
      <ul class="exd-list bad">${t.errors.map(e=>M`<li>${I(`x`,16)}<span>${e}</span></li>`)}</ul>
      <h3 class="exd-h">Respiration</h3>
      <p class="exd-p exd-breath">${I(`wind`,16)} ${t.breath}</p>

      ${r.length?M`
        <h3 class="exd-h">Ton historique</h3>
        ${t.track===`wr`&&i.maxKg?M`<p class="exd-rec-line">${I(`trophy`,15)} Record : <b>${k(O(i.maxKg,n))} ${n}</b>${i.bestSet?M` · meilleure série ${k(O(i.bestSet.kg,n))} × ${i.bestSet.reps}`:F}</p>`:F}
        <ul class="exd-hist">${r.map(e=>M`<li><span>${D(e.date)}</span><b>${e.sets.map(e=>t.track===`wr`?`${k(O(e.kg,n))}×${e.reps}`:e.reps).join(` · `)}</b></li>`)}</ul>`:F}

      ${a.length?M`
        <h3 class="exd-h">Exercices équivalents</h3>
        <div class="ex-list compact">${a.map(e=>Si(e,()=>b(`exercise`,{exId:e.id})))}</div>`:F}

      <button class="btn btn-ghost btn-block" @click=${()=>Ti(e)}>
        ${I(`shield`,18)} ${l?`Ne plus éviter cet exercice`:`Éviter cet exercice (blessure, gêne)`}
      </button>
    </div>`,{tall:!0})}function Ti(e){_(t=>{let n=new Set(t.profile.avoid||[]);n.has(e)?n.delete(e):n.add(e),t.profile.avoid=[...n]}),y((g.state.profile.avoid||[]).includes(e)?`Exercice marqué à éviter : il sera retiré des séances`:`Exercice de nouveau autorisé`)}function Ei(e,t){let n=g.ui.pick||{q:``,group:`all`},r=(e,t)=>v(r=>{r.pick={...n,[e]:t}}),i=e.baseExId,a=i?On(i,8):[],o=xi({q:n.q,group:n.group,equip:`all`});return R(e.mode.includes(`replace`)?`Remplacer l’exercice`:`Ajouter un exercice`,M`
    ${a.length&&!n.q?M`
      <h3 class="exd-h">Même muscles · recommandés</h3>
      <div class="ex-list compact">${a.map(e=>Si(e,()=>t(e.id),I(`plus`,18)))}</div>
      <h3 class="exd-h">Tous les exercices</h3>`:F}
    <label class="search">
      ${I(`search`,18)}
      <input id="pick-search" type="search" placeholder="Rechercher" .value=${Y(n.q)} @input=${e=>r(`q`,e.target.value)}>
    </label>
    ${mn([[`all`,`Tous`],..._i.map(e=>[e.id,e.label])],n.group,e=>r(`group`,e))}
    <div class="ex-list compact">${o.map(e=>Si(e,()=>t(e.id),I(`plus`,18)))}</div>
  `,{tall:!0})}var Z=340,Di=170,Q={l:34,r:12,t:14,b:24};function Oi(e,t){e===t&&(--e,t+=1);let n=t-e,r=10**Math.floor(Math.log10(n/3)),i=[1,2,2.5,5,10].map(e=>e*r).find(e=>n/e<=4)||r*10;return{lo:Math.floor(e/i)*i,hi:Math.ceil(t/i)*i,step:i}}function ki(e,{unit:t=``,goal:n=null,digits:r=1,empty:i=`Pas encore de données.`}={}){if(!e.length)return M`<div class="chart-empty">${i}</div>`;let a=e.map(e=>w(e.date).getTime()),o=e.map(e=>e.y),s=n==null?o:[...o,n],{lo:c,hi:l,step:u}=Oi(Math.min(...s),Math.max(...s)),d=Math.min(...a),f=Math.max(...a)||d+1,ee=e=>Q.l+(f===d?(Z-Q.l-Q.r)/2:(e-d)/(f-d)*(Z-Q.l-Q.r)),p=e=>Q.t+(1-(e-c)/(l-c))*(Di-Q.t-Q.b),m=e.map((e,t)=>[ee(a[t]),p(e.y)]),te=m.map(([e,t],n)=>`${n?`L`:`M`}${e.toFixed(1)} ${t.toFixed(1)}`).join(` `),ne=`${te} L${m[m.length-1][0].toFixed(1)} ${Di-Q.b} L${m[0][0].toFixed(1)} ${Di-Q.b} Z`,re=[];for(let e=c;e<=l+1e-9;e+=u)re.push(e);let ie=e=>(Math.round(e*10**r)/10**r).toLocaleString(`fr-FR`),ae=e=>new Date(e).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`short`}),oe=m[m.length-1];return M`
    <svg class="chart" viewBox="0 0 ${Z} ${Di}" role="img">
      <defs>
        <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="var(--accent)" stop-opacity=".32"></stop>
          <stop offset="1" stop-color="var(--accent)" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
      ${re.map(e=>N`
        <line class="ch-grid" x1=${Q.l} x2=${Z-Q.r} y1=${p(e)} y2=${p(e)}></line>
        <text class="ch-label" x=${Q.l-6} y=${p(e)+3.5} text-anchor="end">${ie(e)}</text>`)}
      ${n==null?``:N`
        <line class="ch-goal" x1=${Q.l} x2=${Z-Q.r} y1=${p(n)} y2=${p(n)}></line>
        <text class="ch-goal-t" x=${Z-Q.r} y=${p(n)-5} text-anchor="end">Objectif ${ie(n)} ${t}</text>`}
      <path d=${ne} fill="url(#areaGrad)"></path>
      <path class="ch-line" d=${te}></path>
      ${m.length<40?m.map(([e,t])=>N`<circle class="ch-dot" cx=${e} cy=${t} r="2.6"></circle>`):``}
      <circle class="ch-end" cx=${oe[0]} cy=${oe[1]} r="5"></circle>
      <text class="ch-label" x=${Q.l} y=${164}>${ae(d)}</text>
      ${f===d?``:N`<text class="ch-label" x=${Z-Q.r} y=${164} text-anchor="end">${ae(f)}</text>`}
    </svg>`}function Ai(e,{unit:t=``,digits:n=0}={}){if(!e.some(e=>e.value>0))return M`<div class="chart-empty">Pas encore de séance sur cette période.</div>`;let{hi:r}=Oi(0,Math.max(...e.map(e=>e.value))),i=e.length,a=(Z-Q.l-Q.r)/i,o=e=>Q.t+(1-e/r)*(Di-Q.t-Q.b),s=e=>e>=1e4?`${Math.round(e/1e3)} k`:(Math.round(e*10**n)/10**n).toLocaleString(`fr-FR`);return M`
    <svg class="chart" viewBox="0 0 ${Z} ${Di}" role="img">
      ${[0,r/2,r].map(e=>N`
        <line class="ch-grid" x1=${Q.l} x2=${Z-Q.r} y1=${o(e)} y2=${o(e)}></line>
        <text class="ch-label" x=${Q.l-6} y=${o(e)+3.5} text-anchor="end">${s(e)}</text>`)}
      ${e.map((e,t)=>{let n=Q.l+t*a+a*.18,r=a*.64,i=o(e.value);return N`
          <rect class=${e.highlight?`ch-bar ch-bar-hi`:`ch-bar`} x=${n} y=${i} width=${r} height=${Math.max(0,Di-Q.b-i)} rx="3"></rect>
          <text class="ch-label" x=${n+r/2} y=${163} text-anchor="middle">${e.label}</text>`})}
    </svg>`}var ji=[[7,`7 j`],[30,`30 j`],[90,`90 j`],[182,`6 m`],[365,`1 an`],[0,`Tout`]],Mi=[[`chest`,`Poitrine`],[`waist`,`Taille`],[`hips`,`Hanches`],[`thigh`,`Cuisse`],[`arm`,`Bras`],[`shoulders`,`Épaules`]];function Ni(e){return e?T(C(),-e):`0000-00-00`}function Pi(e,t){let n=e.settings.unit,r=Ni(t),i=e.body.weight.filter(e=>e.date>=r).sort((e,t)=>e.date<t.date?-1:1),a=Kn(e),o=e.profile.startWeight,s=i[0],c=e.body.measures.slice().sort((e,t)=>e.date<t.date?-1:1),l=g.ui.progress.measure||`waist`,u=c.filter(e=>e.date>=r&&e[l]!=null).map(e=>({date:e.date,y:e[l]})),d={};c.forEach(e=>Mi.forEach(([t])=>{e[t]!=null&&(d[t]={v:e[t],date:e.date})}));let f={};return c.slice().reverse().forEach(e=>Mi.forEach(([t])=>{e[t]!=null&&(f[t]=e[t])})),M`
    <div class="stats-grid">
      ${z(`Actuel`,a?`${k(O(a.kg,n))} ${n}`:`–`,{ic:`scale`,sub:a?D(a.date):``})}
      ${z(`Depuis le début`,a?Math.abs(a.kg-o)<.05?`Stable`:`${a.kg-o<0?`−`:`+`}${k(Math.abs(O(a.kg-o,n)))} ${n}`:`–`,{ic:`downtrend`,tone:a&&a.kg<o-.05?`tone-good`:``})}
    </div>
    ${L(`Poids corporel`,M`
      <div class="card chart-card">
        ${ki(i.map(e=>({date:e.date,y:O(e.kg,n)})),{unit:n,goal:e.profile.goalWeight?O(e.profile.goalWeight,n):null,empty:`Ajoute une pesée pour voir ta courbe.`})}
        ${s&&a&&i.length>1?M`<p class="chart-foot">Sur la période : <b>${a.kg-s.kg<=0?`−`:`+`}${k(Math.abs(O(a.kg-s.kg,n)))} ${n}</b>${st(s.date,a.date)>=7?M`, soit ${k(Math.abs(O((a.kg-s.kg)/(st(s.date,a.date)/7),n)),2)} ${n}/semaine`:F}</p>`:F}
      </div>`,{action:M`<button class="btn btn-ghost btn-s" @click=${()=>b(`weighIn`)}>${I(`plus`,16)} Pesée</button>`})}

    ${L(`Mensurations`,M`
      <div class="measure-grid">
        ${Mi.map(([e,t])=>M`
          <button class="measure ${l===e?`on`:``}" @click=${()=>v(t=>{t.progress={...t.progress,measure:e}})}>
            <span>${t}</span>
            <b>${d[e]?`${k(d[e].v)} cm`:`–`}</b>
            ${d[e]&&f[e]!=null&&f[e]!==d[e].v?M`<small class=${d[e].v-f[e]<0?`good`:`neutral`}>${d[e].v-f[e]>0?`+`:`−`}${k(Math.abs(d[e].v-f[e]))}</small>`:M`<small>&nbsp;</small>`}
          </button>`)}
      </div>
      <div class="card chart-card">${ki(u,{unit:`cm`,empty:`Pas encore de mesure pour cette zone.`})}</div>
      <p class="muted small">Mesure le matin, à jeun, au même endroit à chaque fois. Une fois toutes les 2 semaines suffit.</p>`,{action:M`<button class="btn btn-ghost btn-s" @click=${()=>b(`measures`)}>${I(`plus`,16)} Mesurer</button>`})}

    ${L(`Photos de progression`,Fi(e),{action:M`<label class="btn btn-ghost btn-s file-btn">${I(`camera`,16)} Ajouter
        <input type="file" accept="image/*" @change=${Ii}></label>`})}`}function Fi(e){let t=e.photos.slice().sort((e,t)=>e.date<t.date?1:-1);return t.length?M`<div class="photo-grid">${t.map(e=>{let t=Le(e.id);return M`<button class="photo" @click=${()=>b(`photo`,{id:e.id})}>
      ${t?M`<img src=${t} alt="Photo du ${D(e.date)}" loading="lazy">`:M`<span class="photo-missing">${I(`image`,22)}</span>`}
      <span class="photo-d">${D(e.date)}${e.label?` · ${e.label}`:``}</span>
    </button>`})}</div>`:M`<p class="muted small">Prends une photo de face, de profil et de dos toutes les 4 semaines, même lumière, même endroit. Elles restent uniquement sur ton téléphone.</p>`}async function Ii(e){let t=e.target.files[0];if(e.target.value=``,!t)return;let n=`p_${A()}`;try{await ze(n,t),_(e=>{e.photos.push({id:n,date:C(),label:``})}),y(`Photo enregistrée sur ton téléphone`,`success`)}catch(e){console.error(e),y(`Photo non enregistrée : espace de stockage insuffisant`,`warn`)}}function Li({id:e}){let t=g.state.photos.find(t=>t.id===e);if(!t)return F;let n=Le(e);return R(D(t.date),M`
    ${n?M`<img class="photo-full" src=${n} alt="Photo de progression">`:F}
    <label class="field"><span>Légende</span><input id="photo-label" placeholder="Face, profil, dos…" .value=${Y(t.label||``)}
      @change=${t=>_(n=>{n.photos.find(t=>t.id===e).label=t.target.value})}></label>
    <label class="field"><span>Date</span><input id="photo-date" type="date" .value=${Y(t.date)}
      @change=${t=>t.target.value&&_(n=>{n.photos.find(t=>t.id===e).date=t.target.value})}></label>
  `,{footer:M`<button class="btn btn-ghost btn-block danger" @click=${async()=>{await Be(e),_(t=>{t.photos=t.photos.filter(t=>t.id!==e)}),x(),y(`Photo supprimée`)}}>${I(`trash`,18)} Supprimer la photo</button>`})}function Ri(e,t){let n=e.settings.unit,r=Ni(t),i=G(e).filter(e=>e.date>=r),a=i.reduce((e,t)=>{let n=W(t);return e.vol+=n.volume,e.time+=n.durationSec,e.sets+=n.sets,e},{vol:0,time:0,sets:0}),o=t&&t<56?Math.max(2,Math.ceil(t/7)):8,s=E(C()),c=Array.from({length:o},(t,r)=>{let i=T(s,-7*(o-1-r)),a=G(e).filter(e=>e.date>=i&&e.date<=T(i,6)).reduce((e,t)=>e+W(t).volume,0);return{label:D(i).replace(`.`,``),value:O(a,n),highlight:r===o-1}}),l=g.ui.progress.exId,u=V[l],d=In(e,l).filter(e=>e.date>=r).reverse(),f=g.ui.progress.metric||`e1rm`,ee=d.map(e=>({date:e.date,y:u.track===`wr`?O(Math.max(...f===`e1rm`?e.sets.map(e=>Ln(e.kg,e.reps)):e.sets.map(e=>e.kg||0)),n):Math.max(...e.sets.map(e=>e.reps||0))})),p=new Set(G(e).flatMap(e=>e.exercises.map(e=>e.exId))),m=Dn.filter(e=>p.has(e.id)&&e.track!==`c`),te=Wn(e,T(C(),-6),C());return M`
    <div class="stats-grid three">
      ${z(`Séances`,String(i.length),{ic:`flame`})}
      ${z(`Volume`,`${mt(O(a.vol,n))}`,{ic:`dumbbell`,sub:n})}
      ${z(`Temps`,ht(a.time),{ic:`clock`})}
    </div>
    ${L(`Volume hebdomadaire`,M`<div class="card chart-card">${Ai(c,{unit:n})}</div>`)}
    ${L(`Progression par exercice`,M`
      <div class="card chart-card">
        <select id="perf-ex" class="select" @change=${e=>v(t=>{t.progress={...t.progress,exId:e.target.value}})}>
          ${(m.some(e=>e.id===l)?m:[u,...m]).map(e=>M`<option value=${e.id} ?selected=${e.id===l}>${e.name}</option>`)}
        </select>
        ${u.track===`wr`?M`<div class="chart-tabs">${pn([[`e1rm`,`1RM estimé`],[`max`,`Charge max`]],f,e=>v(t=>{t.progress={...t.progress,metric:e}}),{small:!0})}</div>`:F}
        ${ki(ee,{unit:u.track===`wr`?n:`reps`,empty:`Pas encore de séance avec cet exercice sur la période.`})}
        ${u.track===`wr`&&f===`e1rm`?M`<p class="chart-foot">Le 1RM estimé (formule d’Epley) compare des séries de reps différentes. Il ne t’oblige jamais à tester ton max.</p>`:F}
      </div>`)}
    ${L(`Séries par muscle · 7 derniers jours`,M`
      <div class="card group-bars">
        ${_i.filter(e=>e.id!==`cardio`).map(e=>{let t=te[e.id]||0;return M`<div class="gb"><span>${e.label}</span><i><b style="width:${Math.min(100,t/20*100)}%"></b></i><em>${t}</em></div>`})}
        <p class="muted small">Repère : 10 à 20 séries par semaine par groupe prioritaire pour progresser.</p>
      </div>`)}`}function zi(e){let t=e.settings.unit,n=[...new Set(G(e).flatMap(e=>e.exercises.map(e=>e.exId)))].map(t=>({ex:V[t],r:Bn(e,t)})).filter(e=>e.ex&&e.ex.track!==`c`).sort((e,t)=>t.r.bestE1rm-e.r.bestE1rm||t.r.maxReps-e.r.maxReps);return n.length?M`<div class="rec-list">${n.map(({ex:e,r:n})=>M`
    <button class="card rec" @click=${()=>b(`exercise`,{exId:e.id})}>
      <span class="rec-t"><strong>${e.name}</strong>
        <small>${n.bestSet?`Meilleure série ${k(O(n.bestSet.kg,t))} ${t} × ${n.bestSet.reps} · ${D(n.bestSet.date)}`:`${n.maxReps} ${e.track===`t`?`s`:`reps`}`}</small></span>
      <span class="rec-v">${e.track===`wr`&&!e.assisted?M`<b>${k(O(n.maxKg,t))}</b><small>${t} max</small>`:M`<b>${n.maxReps}</b><small>${e.track===`t`?`s`:e.assisted?`reps`:`reps max`}</small>`}</span>
    </button>`)}</div>`:hn(`trophy`,`Pas encore de record`,`Termine ta première séance : chaque meilleure performance sera enregistrée ici.`)}function Bi(){let e=g.state,t=g.ui.progress,n=(e,t)=>v(n=>{n.progress={...n.progress,[e]:t}});return M`
    <div class="screen">
      ${fn(`Progression`)}
      ${pn([[`body`,`Corps`],[`perf`,`Performances`],[`records`,`Records`]],t.seg,e=>n(`seg`,e))}
      ${t.seg===`records`?F:M`<div class="period">${pn(ji.map(([e,t])=>[e,t]),t.period,e=>n(`period`,e),{small:!0})}</div>`}
      ${t.seg===`body`?Pi(e,t.period):t.seg===`perf`?Ri(e,t.period):zi(e)}
    </div>`}function Vi(){let e=g.state.settings.unit,t=Kn(g.state),n=g.ui.weighDraft??(t?Math.round(O(t.kg,e)*10)/10:``),r=g.ui.weighDate||C(),i=e=>{g.ui.weighDraft=e};return R(`Nouvelle pesée`,M`
    <div class="big-input">
      <input id="weigh-v" type="number" inputmode="decimal" step="0.1" .value=${Y(String(n))} @input=${e=>i(e.target.value)} autofocus>
      <span>${e}</span>
    </div>
    <label class="field"><span>Date</span><input id="weigh-date" type="date" max=${C()} .value=${Y(r)} @change=${e=>{g.ui.weighDate=e.target.value}}></label>
    <p class="muted small">Pèse-toi le matin, après être allé aux toilettes, avant de manger. Regarde la tendance sur 2 semaines, pas le chiffre du jour.</p>
  `,{footer:M`<button class="btn btn-primary btn-block btn-xl" @click=${()=>{let t=parseFloat(String(g.ui.weighDraft??n).replace(`,`,`.`));if(!t||t<30||t>400){y(`Indique un poids valide`,`warn`);return}let i=Math.round(ft(t,e)*10)/10;_(e=>{e.body.weight=e.body.weight.filter(e=>e.date!==r),e.body.weight.push({date:r,kg:i})}),v(e=>{e.weighDraft=null,e.weighDate=null,e.sheet=null}),y(`Pesée enregistrée`,`success`)}}>Enregistrer</button>`})}function Hi(){let e=g.ui.measureDraft||{},t=(e,t)=>{g.ui.measureDraft={...g.ui.measureDraft||{},[e]:t}};return R(`Mensurations`,M`
    <div class="form-grid">
      ${Mi.map(([n,r])=>M`<label class="field"><span>${r} (cm)</span>
        <input id="m-${n}" type="number" inputmode="decimal" step="0.5" .value=${Y(e[n]??``)} @input=${e=>t(n,e.target.value)}></label>`)}
    </div>
    <p class="muted small">Cuisse et bras : côté droit, au point le plus large. Taille : au niveau du nombril, sans rentrer le ventre.</p>
  `,{footer:M`<button class="btn btn-primary btn-block btn-xl" @click=${()=>{let e=g.ui.measureDraft||{},t={date:C()},n=!1;for(let[r]of Mi){let i=parseFloat(String(e[r]??``).replace(`,`,`.`));i>10&&i<300&&(t[r]=i,n=!0)}n?(_(e=>{e.body.measures=e.body.measures.filter(e=>e.date!==t.date),e.body.measures.push(t)}),v(e=>{e.measureDraft=null,e.sheet=null}),y(`Mensurations enregistrées`,`success`)):y(`Renseigne au moins une mesure`,`warn`)}}>Enregistrer</button>`})}var Ui={recomp:`Perdre du gras et prendre du muscle`,fatloss:`Perte de gras en priorité`,muscle:`Prise de muscle en priorité`},Wi=[1,2,3,4,5,6,0];function $(e,t){_(n=>{n.profile[e]=t})}function Gi(e,t){_(n=>{n.settings[e]=t}),e===`theme`&&Ki(t)}function Ki(e){document.documentElement.dataset.theme=e,document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,e===`light`?`#F3F2EF`:`#0A0A0B`)}function qi(e){let t=Kn(e);return!t||!e.profile.heightCm?null:t.kg/(e.profile.heightCm/100)**2}function Ji(){let e=g.state,t=e.profile,n=e.settings,r=Kn(e),i=n.unit,a=qi(e);return M`
    <div class="screen">
      ${fn(`Profil`)}
      <article class="card profile-card">
        <div class="avatar avatar-l">${(t.name||`F`)[0].toUpperCase()}</div>
        <div class="profile-t">
          <h2 class="display-m">${t.name||`Ton profil`}</h2>
          <p class="muted">${t.age} ans · ${k(t.heightCm/100,2)} m · ${r?`${k(O(r.kg,i))} ${i}`:`–`}</p>
          <p class="muted small">${t.gym} · ${t.trainDays.slice().sort((e,t)=>Wi.indexOf(e)-Wi.indexOf(t)).map(e=>rt[e]).join(`, `)}</p>
        </div>
        <button class="icon-btn" @click=${()=>b(`editProfile`)} aria-label="Modifier le profil">${I(`edit`,18)}</button>
      </article>

      ${L(`Objectif`,M`
        <div class="card list">
          <div class="li"><span>Objectif</span><b>${Ui[t.goal]}</b></div>
          <div class="li"><span>Poids de départ</span><b>${k(O(t.startWeight,i))} ${i}</b></div>
          <div class="li"><span>Poids visé</span><b>${t.goalWeight?`${k(O(t.goalWeight,i))} ${i}`:`–`}</b></div>
          ${a?M`<div class="li"><span>IMC (indicatif)</span><b>${k(a)}</b></div>`:F}
          <div class="li"><span>Sport</span><b>${t.sport||`–`}</b></div>
        </div>
        <p class="muted small">On ne choisit pas où l’on perd la graisse : elle diminue partout avec un léger déficit calorique. Le programme développe en priorité pectoraux, épaules, dos et cuisses pour que la silhouette change là où tu le souhaites.</p>`)}

      ${L(`Blessures et exercices à éviter`,M`
        <div class="card">
          <label class="field"><span>Gênes ou blessures à signaler</span>
            <textarea id="injuries" rows="2" placeholder="Ex. : épaule droite sensible au développé militaire" .value=${Y(t.injuries||``)}
              @change=${e=>$(`injuries`,e.target.value)}></textarea></label>
          ${t.avoid?.length?M`<div class="chips wrap">${t.avoid.map(e=>M`<button class="chip on" @click=${()=>$(`avoid`,t.avoid.filter(t=>t!==e))}>${V[e]?.name||e} ${I(`x`,14)}</button>`)}</div>`:M`<p class="muted small">Pour éviter un exercice, ouvre sa fiche et touche « Éviter cet exercice ». Il sera retiré automatiquement de tes séances.</p>`}
        </div>`)}

      ${L(`Entraînement`,M`
        <div class="card list">
          <div class="li li-col">
            <span>Jours d’entraînement</span>
            <div class="days-pick">${Wi.map(e=>M`<button class="dp ${t.trainDays.includes(e)?`on`:``}" @click=${()=>Yi(e)} aria-pressed=${t.trainDays.includes(e)}>${rt[e]}</button>`)}</div>
          </div>
          <div class="li li-col">
            <span>Repos par défaut</span>
            ${pn([[60,`1:00`],[90,`1:30`],[120,`2:00`],[150,`2:30`],[180,`3:00`]],n.defaultRest,e=>Gi(`defaultRest`,e),{small:!0})}
          </div>
          <div class="li li-col"><span>Unités</span>${pn([[`kg`,`Kilogrammes`],[`lb`,`Livres`]],n.unit,e=>Gi(`unit`,e),{small:!0})}</div>
        </div>`)}

      ${L(`Séance et alertes`,M`
        <div class="card list">
          ${gn(`set-sound`,n.sound,e=>Gi(`sound`,e),`Son de fin de repos`,`Trois bips puis un bip long`)}
          ${gn(`set-vib`,n.vibration,e=>Gi(`vibration`,e),`Vibration`,`Android uniquement : iOS ne le permet pas aux applis web`)}
          ${gn(`set-notif`,n.notifications,async e=>{Gi(`notifications`,e),e&&await er()===`denied`&&y(`Notifications bloquées : autorise-les dans les réglages du téléphone`,`warn`)},`Notification de fin de repos`,`Quand FORGE est en arrière-plan`)}
          ${gn(`set-awake`,n.keepAwake,e=>Gi(`keepAwake`,e),`Écran toujours allumé en séance`,`Le chrono reste actif entre les séries`)}
          <button class="li li-btn" @click=${Xi}>${I(`bell`,18)}<span>Tester l’alerte</span>${I(`right`,18)}</button>
        </div>`)}

      ${L(`Apparence`,M`<div class="card">${pn([[`dark`,`Sombre`],[`light`,`Clair`]],n.theme,e=>Gi(`theme`,e))}</div>`)}

      ${L(`Données`,M`
        <div class="card list">
          <div class="li"><span>Séances enregistrées</span><b>${G(e).length}</b></div>
          <div class="li"><span>Stockage</span><b>${I(`phone`,15)} Sur cet appareil</b></div>
          <button class="li li-btn" @click=${Zi}>${I(`download`,18)}<span>Exporter une sauvegarde</span>${I(`right`,18)}</button>
          <label class="li li-btn">${I(`upload`,18)}<span>Restaurer une sauvegarde</span>${I(`right`,18)}
            <input type="file" accept="application/json,.json" hidden @change=${Qi}></label>
          <button class="li li-btn danger" @click=${()=>b(`confirmReset`)}>${I(`trash`,18)}<span>Effacer toutes les données</span>${I(`right`,18)}</button>
        </div>
        <p class="muted small">Tout fonctionne sans connexion. Exporte une sauvegarde de temps en temps : si tu changes de téléphone, elle te permet de tout récupérer.</p>`)}

      <p class="app-version">FORGE 5.0 · données 100 % locales</p>
    </div>`}function Yi(e){let t=new Set(g.state.profile.trainDays);if(t.has(e)){if(t.size<=1)return;t.delete(e)}else t.add(e);$(`trainDays`,[...t])}function Xi(){Yn();let e=g.state.settings;rr(`Test de l’alerte`,{sound:e.sound,vibration:e.vibration,notify:!1}),y(`Alerte de fin de repos jouée`)}async function Zi(){try{let e=await Ue(g.state),t=new Blob([JSON.stringify(e)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`forge-sauvegarde-${C()}.json`,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),2e3),y(`Sauvegarde téléchargée`,`success`)}catch(e){console.error(e),y(`Export impossible`,`warn`)}}function Qi(e){let t=e.target.files[0];if(e.target.value=``,!t)return;let n=new FileReader;n.onload=()=>{let e;try{e=JSON.parse(n.result)}catch{y(`Ce fichier n’est pas une sauvegarde lisible`,`warn`);return}e&&typeof e==`object`&&[`version`,`workouts`,`weight`,`sessions`,`startDate`,`profile`].some(t=>t in e)?v(t=>{t.sheet={name:`confirmImport`,parsed:e}}):y(`Ce fichier ne correspond pas à une sauvegarde FORGE`,`warn`)},n.readAsText(t)}async function $i(e){try{g.state=await We(e,vt),g.state.onboarded=!0,Fe(g.state),Ki(g.state.settings.theme),v(e=>{e.sheet=null,e.tab=`home`,e.view=null}),y(`Sauvegarde restaurée`,`success`)}catch(e){console.error(e),y(`Restauration impossible`,`warn`)}}async function ea(){await Ge(),g.state=_t(),Fe(g.state),Ki(`dark`),v(e=>{e.sheet=null,e.tab=`home`,e.view=null,e.workoutOpen=!1}),y(`Données effacées`)}function ta(){let e=g.state.profile,t=g.state.settings.unit,n=e=>parseFloat(String(e).replace(`,`,`.`));return R(`Modifier le profil`,M`
    <label class="field"><span>Prénom</span><input id="pf-name" .value=${Y(e.name)} @change=${e=>$(`name`,e.target.value.trim())}></label>
    <div class="form-grid">
      <label class="field"><span>Âge</span><input id="pf-age" type="number" inputmode="numeric" .value=${Y(String(e.age))} @change=${t=>$(`age`,parseInt(t.target.value,10)||e.age)}></label>
      <label class="field"><span>Taille (cm)</span><input id="pf-h" type="number" inputmode="numeric" .value=${Y(String(e.heightCm))} @change=${t=>$(`heightCm`,n(t.target.value)||e.heightCm)}></label>
      <label class="field"><span>Poids de départ (${t})</span><input id="pf-sw" type="number" inputmode="decimal" step="0.1" .value=${Y(String(k(O(e.startWeight,t)).replace(`,`,`.`)))} @change=${r=>$(`startWeight`,ft(n(r.target.value),t)||e.startWeight)}></label>
      <label class="field"><span>Poids visé (${t})</span><input id="pf-gw" type="number" inputmode="decimal" step="0.1" .value=${Y(e.goalWeight?String(k(O(e.goalWeight,t)).replace(`,`,`.`)):``)} @change=${e=>$(`goalWeight`,e.target.value?ft(n(e.target.value),t):null)}></label>
    </div>
    <label class="field"><span>Objectif</span>
      <select id="pf-goal" class="select" @change=${e=>$(`goal`,e.target.value)}>
        ${Object.entries(Ui).map(([t,n])=>M`<option value=${t} ?selected=${e.goal===t}>${n}</option>`)}
      </select></label>
    <label class="field"><span>Salle</span><input id="pf-gym" .value=${Y(e.gym)} @change=${e=>$(`gym`,e.target.value)}></label>
    <label class="field"><span>Sport pratiqué</span><input id="pf-sport" .value=${Y(e.sport||``)} @change=${e=>$(`sport`,e.target.value)}></label>
  `,{footer:M`<button class="btn btn-primary btn-block" @click=${()=>{x(),y(`Profil mis à jour`,`success`)}}>Terminé</button>`})}var na=[1,2,3,4,5,6,0];function ra(){let e=g.ui.obStep||0,t=g.state.profile,n=()=>v(t=>{t.obStep=e+1}),r=()=>v(t=>{t.obStep=Math.max(0,e-1)}),i=(e,t)=>_(n=>{n.profile[e]=t}),a=e=>parseFloat(String(e).replace(`,`,`.`)),o=[M`
      <div class="ob-hero">
        <div class="ob-mark">F</div>
        <h1 class="display-xxl">Forge<br>ton corps</h1>
        <p class="ob-lead">Un programme de 12 semaines pensé pour toi, une séance guidée série par série, et tout ton suivi. Même sans réseau à la salle.</p>
        <ul class="ob-points">
          <li>${I(`dumbbell`,18)} 3 séances par semaine, poids libres et machines Basic-Fit</li>
          <li>${I(`up`,18)} Charges ajustées selon tes vraies performances</li>
          <li>${I(`offline`,18)} Fonctionne hors connexion, données sur ton téléphone</li>
        </ul>
      </div>
      <button class="btn btn-primary btn-xl btn-block" @click=${n}>Commencer ${I(`right`,20)}</button>`,M`
      <div class="ob-body">
        <p class="eyebrow">Étape 1 sur 2</p>
        <h1 class="display-l">Ton profil</h1>
        <p class="muted">Prérempli avec ce que tu as indiqué. Tu pourras tout modifier dans Profil.</p>
        <label class="field"><span>Prénom</span><input id="ob-name" placeholder="Ton prénom" .value=${Y(t.name)} @input=${e=>{g.state.profile.name=e.target.value}} @change=${e=>i(`name`,e.target.value.trim())}></label>
        <div class="form-grid">
          <label class="field"><span>Âge</span><input id="ob-age" type="number" inputmode="numeric" .value=${Y(String(t.age))} @change=${e=>i(`age`,parseInt(e.target.value,10)||t.age)}></label>
          <label class="field"><span>Taille (cm)</span><input id="ob-h" type="number" inputmode="numeric" .value=${Y(String(t.heightCm))} @change=${e=>i(`heightCm`,a(e.target.value)||t.heightCm)}></label>
          <label class="field"><span>Poids actuel (kg)</span><input id="ob-w" type="number" inputmode="decimal" step="0.1" .value=${Y(String(t.startWeight))} @change=${e=>i(`startWeight`,a(e.target.value)||t.startWeight)}></label>
          <label class="field"><span>Poids visé (kg)</span><input id="ob-gw" type="number" inputmode="decimal" step="0.1" .value=${Y(String(t.goalWeight??``))} @change=${e=>i(`goalWeight`,a(e.target.value)||null)}></label>
        </div>
      </div>
      <div class="ob-nav">
        <button class="btn btn-ghost" @click=${r}>Retour</button>
        <button class="btn btn-primary btn-xl" @click=${n}>Continuer</button>
      </div>`,M`
      <div class="ob-body">
        <p class="eyebrow">Étape 2 sur 2</p>
        <h1 class="display-l">Tes jours</h1>
        <p class="muted">Le programme place la séance A, B puis C sur ces jours, dans l’ordre de la semaine. Garde au moins un jour de repos entre deux séances.</p>
        <div class="days-pick days-pick-l">
          ${na.map(e=>M`<button class="dp ${t.trainDays.includes(e)?`on`:``}" aria-pressed=${t.trainDays.includes(e)}
            @click=${()=>{let n=new Set(t.trainDays);n.has(e)?n.size>1&&n.delete(e):n.add(e),i(`trainDays`,[...n])}}>${rt[e]}</button>`)}
        </div>
        <div class="card ob-plan">
          <p><b>A · Haut A</b> Force, pectoraux en priorité</p>
          <p><b>B · Bas du corps</b> Jambes, explosivité de gardien, gainage</p>
          <p><b>C · Haut B</b> Volume, dos et épaules, cardio</p>
        </div>
      </div>
      <div class="ob-nav">
        <button class="btn btn-ghost" @click=${r}>Retour</button>
        <button class="btn btn-primary btn-xl" @click=${()=>{_(e=>{e.onboarded=!0,e.programStart=E(C()),e.startedOn=C(),e.body.weight=[{date:C(),kg:e.profile.startWeight}]}),v(e=>{e.obStep=0,e.tab=`home`})}}>C’est parti</button>
      </div>`];return M`<div class="ob">${o[Math.min(e,o.length-1)]}</div>`}var ia=[0,1,2,3,4];function aa(e){return Math.abs(e.inc||2.5)||2.5}function oa(e,t,n){return e.map(e=>t.track===`wr`?`${k(O(e.kg,n))}×${e.reps}`:t.track===`t`?`${e.reps} s`:t.track===`c`?`${e.reps} min`:`${e.reps}`).join(` · `)}function sa(e,t){if(t.track===`c`)return`${e.reps} min`;let n=t.track===`t`?`${e.reps} s`:`${e.reps} reps${t.uni?` / côté`:``}`;return[`${e.sets} × ${n}`,e.rir==null?null:`RIR ${e.rir}`,e.rest?`repos ${gt(e.rest)}`:null].filter(Boolean).join(` · `)}function ca(e){let t=!!e.pausedAt;return M`
    <header class="wo-top">
      <button class="icon-btn" @click=${cr} aria-label="Réduire la séance">${I(`down`,22)}</button>
      <div class="wo-top-c">
        <span class="wo-name">${e.name}</span>
        <span class="wo-clock ${t?`paused`:``}">${t?`En pause · `:``}${gt(Ar(e))}</span>
      </div>
      <button class="icon-btn" @click=${kr} aria-label=${t?`Reprendre`:`Pause`}>${I(t?`play`:`pause`,20)}</button>
      <button class="btn btn-finish" @click=${jr}>Terminer</button>
    </header>`}function la(e){return M`
    <nav class="wo-strip" aria-label="Exercices de la séance">
      ${e.exercises.map((t,n)=>{let r=t.sets.filter(e=>e.done).length,i=t.sets.every(e=>e.done||e.skipped);return M`
          <button class="wo-pill ${n===e.cur.ex?`on`:``} ${i?`closed`:``}" @click=${()=>dr(n)}>
            <span class="wo-pill-n">${i?I(`check`,13):n+1}</span>
            <span class="wo-pill-t">${V[t.exId].name}</span>
            <span class="wo-pill-c">${r}/${t.sets.length}</span>
          </button>`})}
      <button class="wo-pill wo-pill-add" @click=${()=>b(`pickExercise`,{mode:`add`})}>${I(`plus`,16)} Ajouter</button>
    </nav>`}function ua(e,t,n,r,i,a,o,s,c){let l=i.done?`done`:i.skipped?`skipped`:c?`active`:``,u=o?r.track===`wr`?`${k(O(o.kg,s))}×${o.reps}`:`${o.reps}`:`–`;return M`
    <div class="set-row ${l}">
      <span class="set-n">${i.skipped?`–`:a+1}</span>
      <span class="set-prev">${u}</span>
      ${r.track===`wr`?M`
        <input class="set-in" type="number" inputmode="decimal" step="0.5" min="0" aria-label="Charge série ${a+1}"
          .value=${Y(i.kg==null?``:String(Math.round(O(i.kg,s)*10)/10))}
          @change=${e=>lr(t,a,`kg`,e.target.value===``?null:ft(parseFloat(e.target.value.replace(`,`,`.`)),s))}>`:M`<span class="set-na"></span>`}
      <input class="set-in" type="number" inputmode="numeric" min="0" aria-label="Répétitions série ${a+1}"
        .value=${Y(i.reps==null?``:String(i.reps))}
        @change=${e=>lr(t,a,`reps`,e.target.value===``?null:parseInt(e.target.value,10))}>
      <span class="set-rir">${i.rir==null?``:i.rir}</span>
      <button class="set-check ${i.done?`on`:``}" aria-label=${i.done?`Annuler la validation`:`Valider la série`}
        @click=${()=>i.done?gr(t,a):hr(t,a)}>${I(`check`,18)}</button>
    </div>`}function da(e,t,n,r,i,{suffix:a=``,mode:o=`decimal`}={}){return M`
    <div class="stepper">
      <span class="stepper-l">${e}</span>
      <div class="stepper-c">
        <button class="step-b" @click=${n} aria-label="Diminuer ${e}">${I(`minus`,22)}</button>
        <label class="step-v">
          <input type="number" inputmode=${o} .value=${Y(t==null?``:String(t))} @change=${i} aria-label=${e}>
          ${a?M`<small>${a}</small>`:F}
        </label>
        <button class="step-b" @click=${r} aria-label="Augmenter ${e}">${I(`plus`,22)}</button>
      </div>
    </div>`}function fa(e,t,n,r,i,a){if(i<0){let n=e.exercises.findIndex(e=>e.sets.some(e=>!e.done&&!e.skipped));return M`
      <div class="panel panel-done">
        <p>${I(`done`,20)} Exercice terminé</p>
        ${n>=0?M`<button class="btn btn-primary btn-xl" @click=${()=>dr(n)}>Exercice suivant ${I(`right`,20)}</button>`:M`<button class="btn btn-primary btn-xl" @click=${jr}>${I(`flag`,20)} Terminer la séance</button>`}
        <button class="btn btn-ghost" @click=${()=>vr(t)}>${I(`plus`,18)} Ajouter une série</button>
      </div>`}let o=n.sets[i],s=aa(r),c=o.kg==null?null:Math.round(O(o.kg,a)*10)/10,l=r.track===`t`?5:1;return M`
    <div class="panel">
      <div class="panel-head">
        <span class="display-s">Série ${i+1}<small>/${n.sets.length}</small></span>
        <button class="link-btn" @click=${()=>_r(t,i)}>${I(`skip`,16)} Passer la série</button>
      </div>
      <div class="steppers ${r.track===`wr`?``:`single`}">
        ${r.track===`wr`?da(r.assisted?`Assistance`:`Charge`,c,()=>ur(t,i,`kg`,-ft(s,a)),()=>ur(t,i,`kg`,ft(s,a)),e=>lr(t,i,`kg`,e.target.value===``?null:ft(parseFloat(e.target.value),a)),{suffix:a}):F}
        ${da(r.track===`c`||r.track===`t`?`Durée`:`Répétitions`,o.reps,()=>ur(t,i,`reps`,-l),()=>ur(t,i,`reps`,l),e=>lr(t,i,`reps`,e.target.value===``?null:parseInt(e.target.value,10)),{suffix:r.track===`c`?`min`:r.track===`t`?`s`:``,mode:`numeric`})}
      </div>
      ${r.track===`wr`?M`
        <div class="rir">
          <span class="rir-l">Reps en réserve <button class="tip" @click=${()=>b(`rirHelp`)} aria-label="Qu’est-ce que le RIR ?">${I(`info`,14)}</button></span>
          <div class="rir-o">
            ${ia.map(e=>M`<button class="rir-b ${o.rir===e?`on`:``} ${n.target.rir===e?`target`:``}"
              @click=${()=>lr(t,i,`rir`,o.rir===e?null:e)}>${e===4?`4+`:e}</button>`)}
          </div>
        </div>`:F}
      ${r.track===`c`?M`
        <label class="field-inline">Distance (km, facultatif)
          <input type="number" inputmode="decimal" step="0.1" .value=${Y(o.dist==null?``:String(o.dist))}
            @change=${e=>lr(t,i,`dist`,e.target.value===``?null:parseFloat(e.target.value))}>
        </label>`:F}
      <button class="btn btn-primary btn-xl btn-validate" @click=${()=>hr(t,i)}>
        ${I(`check`,22)} Valider la série
      </button>
    </div>`}function pa(e){let t=g.state.settings.unit,n=Math.min(e.cur.ex,e.exercises.length-1),r=e.exercises[n];if(!r)return F;let i=V[r.exId],a=In(g.state,r.exId)[0],o=r.sets.findIndex(e=>!e.done&&!e.skipped),s=r.suggestion;return M`
    <section class="wo-ex">
      <div class="wo-ex-head">
        <div class="wo-ex-t">
          <p class="eyebrow">Exercice ${n+1}/${e.exercises.length} · ${i.p.map(e=>gi[e]).join(`, `)||`Cardio`}</p>
          <h2 class="display-m">${i.name}</h2>
          <p class="wo-target">${sa(r.target,i)}${r.target.deload?M` <span class="pill pill-info">allégée</span>`:F}</p>
        </div>
        <div class="wo-ex-a">
          <button class="icon-btn" @click=${()=>b(`exercise`,{exId:r.exId})} aria-label="Fiche de l’exercice">${I(`info`,20)}</button>
          <button class="icon-btn" @click=${()=>b(`pickExercise`,{mode:`replace`,exIdx:n})} aria-label="Remplacer l’exercice">${I(`swap`,20)}</button>
          <button class="icon-btn" @click=${()=>b(`exerciseMenu`,{exIdx:n})} aria-label="Plus d’options">${I(`more`,20)}</button>
        </div>
      </div>

      ${s?M`<div class="sug sug-${s.kind}">${I(s.kind===`up`?`up`:s.kind===`down`||s.kind===`deload`?`downtrend`:s.kind===`new`?`sparkles`:`target`,16)}<span>${s.text}</span></div>`:F}
      ${a?M`<p class="wo-last">${I(`history`,14)} Dernière fois (${D(a.date)}) : <b>${oa(a.sets,i,t)}</b></p>`:F}
      ${r.note?M`<p class="wo-note">${I(`bulb`,14)} ${r.note}</p>`:F}

      <div class="sets">
        <div class="set-row set-head">
          <span>Série</span><span>Préc.</span>
          <span>${i.track===`wr`?i.assisted?`Assist.`:t:``}</span>
          <span>${i.track===`c`?`min`:i.track===`t`?`s`:`Reps`}</span><span>RIR</span><span></span>
        </div>
        ${r.sets.map((s,c)=>ua(e,n,r,i,s,c,a?.sets[c],t,c===o))}
      </div>

      ${fa(e,n,r,i,o,t)}
    </section>`}function ma(e){let t=Or(e),n=t/(e.rest.total||1),r=2*Math.PI*112,i=e.exercises[e.cur.ex],a=i?V[i.exId]:null,o=i?i.sets.findIndex(e=>!e.done&&!e.skipped):-1,s=o>=0?i.sets[o]:null,c=g.state.settings.unit,l=t<=0;return g.ui.restHidden?M`
      <button class="rest-bar ${l?`finished`:``}" @click=${Dr}>
        ${I(`timer`,18)} <span>${l?`Repos terminé`:`Repos ${gt(t)}`}</span>
        <i style="transform:scaleX(${n})"></i>
      </button>`:M`
    <div class="rest ${l?`finished`:``}" role="timer" aria-live="polite">
      <p class="eyebrow on-dark">${l?`C’est reparti`:`Récupération`}</p>
      <div class="rest-ring">
        <svg viewBox="0 0 260 260">
          <circle cx="130" cy="130" r=${112} class="rest-bg"></circle>
          <circle cx="130" cy="130" r=${112} class="rest-fg" stroke-dasharray="${(r*n).toFixed(1)} ${r.toFixed(1)}" transform="rotate(-90 130 130)"></circle>
        </svg>
        <div class="rest-time">${l?`GO`:gt(t)}</div>
      </div>
      <div class="rest-adjust">
        <button class="btn btn-ghost-light" @click=${()=>wr(-15)}>−15 s</button>
        <button class="btn btn-ghost-light" @click=${()=>wr(15)}>+15 s</button>
        <button class="btn btn-light" @click=${Tr}>${I(`skip`,18)} Passer</button>
      </div>
      ${s&&a?M`
        <div class="rest-next">
          <span class="eyebrow on-dark">À suivre</span>
          <strong>${a.name} · série ${o+1}/${i.sets.length}</strong>
          <span>${a.track===`wr`&&s.kg!=null?`${k(O(s.kg,c))} ${c} × `:``}${s.reps??`–`}${a.track===`t`?` s`:a.track===`c`?` min`:` reps`}</span>
        </div>`:F}
      <button class="link-btn on-dark" @click=${Er}>${I(`edit`,15)} Modifier la série pendant le repos</button>
    </div>`}var ha=[[1,`Très dur`],[2,`Dur`],[3,`Correct`],[4,`Bien`],[5,`Excellent`]];function ga(e){let t=g.state,n={...e,endedAt:Date.now(),status:`done`},r=W(n),i=Vn(t,n),a=G(t).filter(t=>t.dayId===e.dayId).pop(),o=a?W(a):null,s=o&&o.volume?(r.volume-o.volume)/o.volume*100:null,c=t.settings.unit;return M`
    <div class="sum">
      <header class="sum-head">
        <button class="icon-btn" @click=${Mr} aria-label="Retour à la séance">${I(`left`,22)}</button>
        <span class="eyebrow">Bilan de séance</span>
        <span></span>
      </header>
      <div class="sum-hero">
        <p class="eyebrow">${e.name} · semaine ${e.week}</p>
        <h1 class="display-xl">Séance terminée</h1>
      </div>
      <div class="sum-grid">
        <div><b>${ht(r.durationSec)}</b><span>durée</span></div>
        <div><b>${r.exercises}</b><span>exercices</span></div>
        <div><b>${r.sets}</b><span>séries</span></div>
        <div><b>${r.reps}</b><span>répétitions</span></div>
        <div class="wide"><b>${mt(O(r.volume,c))} ${c}</b><span>volume soulevé
          ${s==null?F:M`<em class=${s>=0?`good`:`bad`}>${s>=0?`+`:``}${k(s,0)} % vs ${D(a.date)}</em>`}</span></div>
        ${r.cardioMin?M`<div class="wide"><b>${r.cardioMin} min</b><span>de cardio</span></div>`:F}
      </div>

      ${i.length?M`
        <section class="sec">
          <h2 class="sec-t">${I(`trophy`,16)} Records personnels</h2>
          <ul class="pr-list">
            ${i.map(e=>M`<li><span>${V[e.exId].name}</span><span class="pr-v">${e.type} · <b>${k(e.unit===`kg`?O(e.value,c):e.value)} ${e.unit===`kg`?c:e.unit}</b></span></li>`)}
          </ul>
        </section>`:F}

      <section class="sec">
        <h2 class="sec-t">Détail</h2>
        <ul class="sum-list">
          ${e.exercises.filter(e=>e.sets.some(e=>e.done)).map(e=>{let t=V[e.exId];return M`<li><span>${t.name}</span><small>${oa(e.sets.filter(e=>e.done),t,c)}</small></li>`})}
        </ul>
      </section>

      <section class="sec">
        <h2 class="sec-t">Ressenti général</h2>
        <div class="feel">
          ${ha.map(([t,n])=>M`<button class="feel-b ${e.feeling===t?`on`:``}" @click=${()=>Nr(`feeling`,t)}><b>${t}</b><span>${n}</span></button>`)}
        </div>
        <label class="field">
          <span>Commentaire</span>
          <textarea id="wo-notes" rows="3" placeholder="Énergie, douleurs, réglages de machine…" .value=${Y(e.notes||``)}
            @change=${e=>Nr(`notes`,e.target.value)}></textarea>
        </label>
      </section>

      <div class="sum-actions">
        <button class="btn btn-primary btn-xl" @click=${Pr}>${I(`check`,20)} Enregistrer la séance</button>
        <button class="btn btn-ghost" @click=${()=>b(`confirmDiscard`)}>Abandonner sans enregistrer</button>
      </div>
    </div>`}function _a(){let e=q();return e?g.ui.workoutMode===`summary`?M`<div class="wo">${ga(e)}</div>`:M`
    <div class="wo ${e.pausedAt?`is-paused`:``}">
      ${ca(e)}
      ${la(e)}
      <div class="wo-body">${pa(e)}</div>
      ${e.pausedAt?M`
        <div class="pause-veil">
          <p class="display-l">En pause</p>
          <button class="btn btn-primary btn-xl" @click=${kr}>${I(`play`,20)} Reprendre</button>
        </div>`:F}
      ${e.rest&&!e.pausedAt?ma(e):F}
    </div>`:F}var va=[[`home`,`Accueil`,`home`],[`training`,`Entraînement`,`dumbbell`],[`library`,`Exercices`,`book`],[`progress`,`Progression`,`chart`],[`profile`,`Profil`,`user`]],ya={dayDetail:ii,workoutDetail:oi,history:ni};function ba(){let e=g.ui.view;if(e&&ya[e.name])return ya[e.name](e);switch(g.ui.tab){case`training`:return ri();case`library`:return Ci();case`progress`:return Bi();case`profile`:return Ji();default:return Kr()}}function xa(){let e=q();return M`
    ${e&&!g.ui.workoutOpen?M`
      <button class="mini-wo" @click=${sr}>
        <span class="resume-pulse"></span>
        <span><b>${e.name}</b> · ${e.rest&&Or(e)>0?`repos ${Math.floor(Or(e)/60)}:${String(Or(e)%60).padStart(2,`0`)}`:`séance en cours`}</span>
        ${I(`right`,18)}
      </button>`:F}
    <nav class="tabbar" aria-label="Navigation principale">
      ${va.map(([e,t,n])=>M`
        <button class="tab ${g.ui.tab===e?`on`:``}" @click=${()=>Ze(e)} aria-current=${g.ui.tab===e?`page`:`false`}>
          ${I(n,22)}<span>${t}</span>
        </button>`)}
    </nav>`}function Sa(e,t,n,r,{danger:i=!1}={}){return R(e,M`<p class="confirm-text">${t}</p>`,{footer:M`
      <button class="btn btn-ghost" @click=${x}>Annuler</button>
      <button class="btn ${i?`btn-danger`:`btn-primary`}" @click=${r}>${n}</button>`})}function Ca({exIdx:e}){let t=q(),n=t?.exercises[e];if(!n)return F;let r=e=>()=>{x(),e()};return R(V[n.exId].name,M`
    <div class="menu">
      <button @click=${r(()=>vr(e))}>${I(`plus`,20)}<span>Ajouter une série</span></button>
      <button @click=${r(()=>yr(e,n.sets.length-1))} ?disabled=${n.sets.length<=1||n.sets[n.sets.length-1].done}>${I(`minus`,20)}<span>Retirer la dernière série</span></button>
      <button @click=${()=>b(`pickExercise`,{mode:`replace`,exIdx:e})}>${I(`swap`,20)}<span>Remplacer par un exercice équivalent</span></button>
      <button @click=${r(()=>Cr(e,-1))} ?disabled=${e===0}>${I(`arrowup`,20)}<span>Déplacer plus tôt</span></button>
      <button @click=${r(()=>Cr(e,1))} ?disabled=${e===t.exercises.length-1}>${I(`arrowdown`,20)}<span>Déplacer plus tard</span></button>
      <button @click=${()=>b(`exercise`,{exId:n.exId})}>${I(`info`,20)}<span>Fiche et historique</span></button>
      <button class="danger" @click=${r(()=>br(e))}>${I(`skip`,20)}<span>Sauter cet exercice</span></button>
    </div>`)}function wa(){return R(`Reps en réserve (RIR)`,M`
    <p class="exd-p">Le RIR, c’est le nombre de répétitions que tu aurais encore pu faire proprement à la fin de la série.</p>
    <ul class="rir-help">
      <li><b>0</b><span>Échec : impossible d’en faire une de plus</span></li>
      <li><b>1</b><span>Une seule de plus, et c’était dur</span></li>
      <li><b>2</b><span>Deux de plus possibles : zone idéale pour progresser</span></li>
      <li><b>3</b><span>Effort solide mais contrôlé</span></li>
      <li><b>4+</b><span>Facile : la charge peut monter</span></li>
    </ul>
    <p class="muted small">Le programme te donne un RIR cible chaque semaine (3, puis 2, puis 1). Le noter permet d’ajuster tes charges plus finement.</p>`)}function Ta(){let e=g.ui.sheet;if(!e)return F;switch(e.name){case`exercise`:return wi(e);case`pickExercise`:{let t=q(),n=e.baseExId||(e.mode===`replace`&&t?t.exercises[e.exIdx]?.exId:null);return Ei({...e,baseExId:n},t=>{v(e=>{e.pick=null}),e.mode===`replace`?xr(e.exIdx,t):e.mode===`add`?Sr(t):ai(e,t)})}case`exerciseMenu`:return Ca(e);case`rirHelp`:return wa();case`programs`:return ci();case`renameProgram`:return hi(e);case`weighIn`:return Vi();case`measures`:return Hi();case`photo`:return Li(e);case`editProfile`:return ta();case`confirmReplaceWorkout`:return Sa(`Une séance est en cours`,`Tu as déjà commencé « ${q()?.name} ». La remplacer effacera les séries non enregistrées.`,`Remplacer`,()=>{x(),or(e.dayId,{force:!0})},{danger:!0});case`confirmDiscard`:return Sa(`Abandonner la séance ?`,`Les séries de cette séance ne seront pas enregistrées.`,`Abandonner`,()=>{x(),Fr()},{danger:!0});case`confirmDeleteWorkout`:return Sa(`Supprimer cette séance ?`,`Elle disparaîtra de ton historique et de tes statistiques.`,`Supprimer`,()=>si(e.id),{danger:!0});case`confirmReset`:return Sa(`Tout effacer ?`,`Séances, pesées, mensurations, photos et programmes seront supprimés de ce téléphone. Exporte une sauvegarde avant si tu veux les garder.`,`Tout effacer`,ea,{danger:!0});case`confirmImport`:return Sa(`Restaurer cette sauvegarde ?`,`Toutes les données actuelles de ce téléphone seront remplacées par celles du fichier.`,`Restaurer`,()=>$i(e.parsed));default:return F}}function Ea(){let e=g.ui.toast;return e?M`<div class="toast toast-${e.kind}" role="status">${e.text}</div>`:F}function Da(){if(!g.state.onboarded)return M`${ra()}${Ea()}`;let e=g.ui.workoutOpen&&q();return M`
    <div class="app ${e?`app-hidden`:``}" aria-hidden=${e?`true`:`false`}>
      <main class="main">${ba()}</main>
      ${xa()}
    </div>
    ${e?_a():F}
    ${Ta()}
    ${Ea()}`}function Oa(e){e.textContent=``,Je(()=>nn(Da(),e)),nn(Da(),e)}var ka=`modulepreload`,Aa=function(e){return`/Forge-/`+e},ja={},Ma=function(e){return e.pathname.endsWith(`.css`)},Na=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Pa=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Aa(t,n);let r=s(t),i=Ma(r);return Na(ja,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:ka,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Fa=`true`,Ia=`false`,La=Fa===`true`,Ra=Ia===`true`;function za(e={}){let{immediate:t=!1,onNeedReload:n,onNeedRefresh:r,onOfflineReady:i,onRegistered:a,onRegisteredSW:o,onRegisterError:s}=e,c,l,u,d=async(e=!0)=>{await l,La||u?.()};async function f(){if(`serviceWorker`in navigator){if(c=await Pa(async()=>{let{Workbox:e}=await import(`./workbox-window.prod.es5-Bd17z0YL.js`);return{Workbox:e}},[]).then(({Workbox:e})=>new e(`/Forge-/sw.js`,{scope:`/Forge-/`,type:`classic`})).catch(e=>{s?.(e)}),!c)return;if(u=()=>{c?.messageSkipWaiting()},!Ra){if(La)c.addEventListener(`activated`,e=>{(e.isUpdate||e.isExternal)&&(n?n():window.location.reload())}),c.addEventListener(`installed`,e=>{e.isUpdate||i?.()});else{let e=!1,t=()=>{e=!0,c?.addEventListener(`controlling`,e=>{e.isUpdate&&(n?n():window.location.reload())}),r?.()};c.addEventListener(`installed`,n=>{n.isUpdate===void 0?n.isExternal===void 0?!e&&i?.():n.isExternal?t():!e&&i?.():n.isUpdate||i?.()}),c.addEventListener(`waiting`,t)}}c.register({immediate:t}).then(e=>{o?o(`/Forge-/sw.js`,e):a?.(e)}).catch(e=>{s?.(e)})}}return l=f(),d}async function Ba(){let{state:e}=await Me(_t,vt);g.state=e,Ki(e.settings.theme),Ae(()=>y(`Sauvegarde impossible : stockage plein ?`,`warn`)),Oa(document.getElementById(`root`)),q()&&(sr(),Lr()),yt(),we()}document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&g.state&&Fe(g.state)}),Ba(),za({immediate:!0});