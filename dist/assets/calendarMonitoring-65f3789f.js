import{B as u,r as c,o as f,C as g}from"./index-58a73ee5.js";const _=u("species",()=>{const n=c([]),s=c([]),i=c([]);f(async()=>{try{const{data:o}=await g.getMonitoringCalendar();n.value=o}catch(o){console.error("Error getting data:",o)}});const d=o=>{const e={};return n.value.forEach(r=>{const a=new Date(r.fecha_monitoreo).getMonth()+1,t=r.flor_abierta;r.cod_especie_id===o&&(e[a]||(e[a]={}),e[a][t]||(e[a][t]=0),e[a][t]++)}),s.value=e,e},l=o=>{const e={};return n.value.forEach(r=>{const a=new Date(r.fecha_monitoreo).getMonth()+1,t=r.frutos_verdes;r.cod_especie_id===o&&(e[a]||(e[a]={}),e[a][t]||(e[a][t]=0),e[a][t]++)}),i.value=e,e};return{getCalendarSpecie:o=>{d(o),l(o)},dataFlower:s,dataFruit:i}});export{_ as u};
