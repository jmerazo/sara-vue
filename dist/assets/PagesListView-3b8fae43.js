import{_ as S,J as y,T as x,v as P,b as m,o as r,c as u,a as o,M,x as i,y as v,N as f,k as C,p as $,e as A,z as V,w as k,r as w,F as z,i as T,j as b,d as h,t as g}from"./index-fa7bc976.js";import{_ as I}from"./icon-design-page-565f52eb.js";const a=l=>($("data-v-409e4bdc"),l=l(),A(),l),N={key:0,class:"modal"},D={class:"modal__contenido"},U=a(()=>o("div",{class:"modal__encabezado"},[o("div",{class:"modal__imagen"},[o("img",{src:I,alt:"modal-icono"})]),o("h4",{class:"modal__titulo"},"Crear nueva página")],-1)),F=a(()=>o("hr",null,null,-1)),q=["onSubmit"],B={class:"formulario__campo"},L=a(()=>o("label",{for:"codigo",class:"formulario__label"},"Vista",-1)),E=V('<option value="" selected disabled data-v-409e4bdc>Seleccionar una opción...</option><option value="home" data-v-409e4bdc>Inicio</option><option value="family" data-v-409e4bdc>Familias</option><option value="glosary" data-v-409e4bdc>Glosario</option><option value="aboutus" data-v-409e4bdc>Acerca de nosotros</option>',5),j=[E],G={class:"formulario__campo"},J=a(()=>o("label",{for:"comun",class:"formulario__label"},"Título",-1)),R={class:"formulario__campo"},H=a(()=>o("label",{for:"fontStyle",class:"formulario__label"},"Estilo de Fuente",-1)),K=a(()=>o("option",{value:"",selected:"",disabled:""},"Seleccionar una opción...",-1)),O=a(()=>o("option",{value:"normal"},"Normal",-1)),Q=a(()=>o("option",{value:"italic"},"Cursiva",-1)),W=a(()=>o("option",{value:"bold"},"Negrita",-1)),X=[K,O,Q,W],Y={class:"formulario__campo"},Z=a(()=>o("label",{for:"fontSize",class:"formulario__label"},"Tamaño de Fuente",-1)),oo={class:"formulario__campo"},to=a(()=>o("label",{for:"textColor",class:"formulario__label"},"Color de Texto",-1)),eo={class:"formulario__campo"},ao=a(()=>o("label",{for:"textAlignment",class:"formulario__label"},"Alineación del Texto",-1)),so=V('<option value="" selected disabled data-v-409e4bdc>Seleccionar una opción...</option><option value="left" data-v-409e4bdc>Izquierda</option><option value="center" data-v-409e4bdc>Centro</option><option value="right" data-v-409e4bdc>Derecha</option><option value="justify" data-v-409e4bdc>Justificado</option>',5),lo=[so],no={class:"formulario__botones"},io=a(()=>o("button",{type:"submit",class:"formulario__boton"},"Guardar",-1)),_o={__name:"ModalPageAdd",setup(l){const d=y(),_=x(),e=P({router:"",title:"",fontStyle:"",fontSize:"",textColor:"#000000",textAlignment:""});async function n(){const c={fontStyle:e.value.fontStyle,fontSize:e.value.fontSize+"px",color:e.value.textColor,textAlign:e.value.textAlignment},t={router:e.value.router,title:e.value.title,styles:c};d.addPage(t),_.handleClickModalPageAdd()}return(c,t)=>m(_).modalPageAdd?(r(),u("div",N,[o("div",D,[U,F,o("form",{onSubmit:M(n,["prevent"]),class:"formulario"},[o("div",B,[L,i(o("select",{"onUpdate:modelValue":t[0]||(t[0]=s=>e.value.router=s),id:"fontStyle",class:"formulario__input"},j,512),[[v,e.value.router]])]),o("div",G,[J,i(o("input",{"onUpdate:modelValue":t[1]||(t[1]=s=>e.value.title=s),id:"comun",type:"text",class:"formulario__input",required:""},null,512),[[f,e.value.title]])]),o("div",R,[H,i(o("select",{"onUpdate:modelValue":t[2]||(t[2]=s=>e.value.fontStyle=s),id:"fontStyle",class:"formulario__input"},X,512),[[v,e.value.fontStyle]])]),o("div",Y,[Z,i(o("input",{type:"number","onUpdate:modelValue":t[3]||(t[3]=s=>e.value.fontSize=s),id:"fontSize",class:"formulario__input"},null,512),[[f,e.value.fontSize]])]),o("div",oo,[to,i(o("input",{type:"color","onUpdate:modelValue":t[4]||(t[4]=s=>e.value.textColor=s),id:"textColor",class:"formulario__input"},null,512),[[f,e.value.textColor]])]),o("div",eo,[ao,i(o("select",{"onUpdate:modelValue":t[5]||(t[5]=s=>e.value.textAlignment=s),id:"textAlignment",class:"formulario__input"},lo,512),[[v,e.value.textAlignment]])]),o("div",no,[io,o("button",{onClick:t[6]||(t[6]=s=>m(_).handleClickModalPageAdd()),type:"button",class:"formulario__boton formulario__boton--cerrar"}," Cerrar ")])],40,q)])])):C("",!0)}},co=S(_o,[["__scopeId","data-v-409e4bdc"]]);const p=l=>($("data-v-a60c67dd"),l=l(),A(),l),ro={class:"contenedor"},uo=p(()=>o("h1",{class:"reporte__heading"},"Páginas",-1)),po={class:"contenido__header"},mo={class:"buscador"},vo=p(()=>o("div",{class:"buscador__contenido"},null,-1)),fo=p(()=>o("label",{class:"buscador__label"},"Buscar: ",-1)),bo=p(()=>o("div",{class:"botones__descarga"},null,-1)),ho=p(()=>o("hr",null,null,-1)),go={class:"reporte__grid"},So={key:0,class:"card__grid"},yo={class:"card__contenido"},xo={class:"card__subtitulo"},Co={class:"card__dato"},$o={class:"card__subtitulo"},Ao={class:"card__dato"},Vo={class:"card__botones"},Po={class:"boton__primario"},Mo={class:"boton__primario"},ko={__name:"PagesListView",setup(l){const d=y(),_=x();return console.log("pages sc: ",d),k(()=>{d.pagesData()}),(e,n)=>{const c=w("font-awesome-icon");return r(),u("div",ro,[uo,o("div",po,[o("div",mo,[vo,fo,o("input",{class:"buscador__input",type:"text",placeholder:"Escríbe un término de búsqueda",onInput:n[0]||(n[0]=t=>e.especies.buscarTermino(t.target.value))},null,32)]),bo]),ho,o("div",null,[o("main",go,[(r(!0),u(z,null,T(m(d).pageData,t=>(r(),u("div",{class:"card",key:t.id},[t.id?(r(),u("div",So,[o("div",yo,[o("p",xo,[h(" Título: "),o("span",Co,g(t.title),1)]),o("p",$o,[h(" Router: "),o("span",Ao,g(t.router),1)]),o("div",Vo,[o("button",Po,[b(c,{icon:["fas","pen-to-square"]})]),o("button",Mo,[b(c,{icon:["fas","trash"]})])])])])):C("",!0)]))),128))])]),o("div",{onClick:n[1]||(n[1]=t=>m(_).handleClickModalPageAdd()),class:"agregar"}),b(co)])}}},To=S(ko,[["__scopeId","data-v-a60c67dd"]]);export{To as default};
