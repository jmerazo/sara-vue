import{B as q,r as t,h as f,o as B,C as r,E as F}from"./index-58a73ee5.js";import{u as N}from"./modal-07ceaae3.js";const j=q("useUsersStore",()=>{const h=N(),o=t([]),n=t({}),u=t([]),w=t(0),m=t(),p=t(),c=t([]),i=t(!1),C=f(()=>o.value.length===0),U=t([]),d=t(1),l=t(12);B(async()=>{i.value=!0;const{data:a}=await r.getUsers();o.value=a,n.value=a,w.value=n.value.length;const e=await r.getRoles();U.value=e.data,i.value=!1});function y(){o.value.forEach(a=>{c.value.push(a)})}F(()=>o.value,()=>{c.value=[],y()},{deep:!0});async function S(a,e){try{const s=await r.createUsers(a,e);s.status===201?(o.value.push(s.data),n.value.push(s.data)):console.error("Error al agregar el usuario: ",s.statusText)}catch(s){console.error("Error al comunicarse con el servidor: ",s)}}function x(a){u.value=n.value.filter(e=>e.id===a),h.handleClickModalUserUpdate(u.value)}const L=async(a,e)=>{const s=o.value.findIndex(v=>v.id===a);s!==-1?(o.value[s].is_active=e,await r.stateUsers(a,{nuevoEstado:e})):console.error(`Usuario con ID ${a} no encontrado.`)},g=f(()=>Math.ceil(o.value.length/l.value)),I=f(()=>{const a=(d.value-1)*l.value,e=a+l.value;return o.value.slice(a,e)});function P(a){a>=1&&a<=g.value&&(d.value=a)}function E(){n.value&&(o.value=n.value)}function _(a){o.value=n.value.filter(e=>{const s=a.toLowerCase(),v=e.first_name?e.first_name.toLowerCase():"",M=e.last_name?e.last_name.toLowerCase():"",T=e.entity?e.entity.toLowerCase():"",R=e.name?e.name.toLowerCase():"",b=e.rol?e.rol.toLowerCase():"",A=e.email?e.email.toLowerCase():"";return v.includes(s)||M.includes(s)||T.includes(s)||R.includes(s)||b.includes(s)||A.includes(s)})}async function D(a){const e=o.value.findIndex(s=>s.id===a);return e===-1?{message:"Usuario no encontrado"}:(o.value.splice(e,1),await r.deleteUsers(a),{message:"Usuario eliminado con éxito"})}return{currentPage:d,itemsPerPage:l,totalPages:g,displayedUsers:I,users:o,userSelected:u,idUser:m,newState:p,totalUsers:w,noResultados:C,datosImport:c,cargando:i,buscarTermino:_,quitarFiltroUsuario:E,changePage:P,selectedUserUpdate:x,changeStateUser:L,deleteUser:D,roles:U,createUser:S}});export{j as u};
