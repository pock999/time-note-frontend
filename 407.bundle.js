(self.webpackChunktime_note_frontend=self.webpackChunktime_note_frontend||[]).push([[407],{1903:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>A});var n=r(7294),s=r(5998),a=r(7307),o=r(9580),i=(r(7484),r(381),r(6486)),c=r.n(i),u=r(458),l=r(733),m=r.n(l),f=r(5755),j=r(7650),d=(r(5666),r(876)),p=r(1728),h=r(6043),g=r(3393),y=r(9269),b=r(383),v=r(1754),x=(r(397),r(9501)),w=x.Ry().shape({title:x.Z_().test("len","標題不得為空",(function(e){return e.length>0})).required(),content:x.Z_().required(),type:x.nK().oneOf([1,2,3]).required("請選擇類型"),CategoryId:x.Rx().nullable(!0),timePoint:x.hT().nullable(!0)}),k=x.Ry().shape({id:x.Rx().required().positive().integer(),title:x.Z_().test("len","標題不得為空",(function(e){return e.length>0})).required(),content:x.Z_().required(),type:x.nK().oneOf([1,2,3]).required("請選擇類型"),CategoryId:x.Rx().nullable(!0),timePoint:x.hT().nullable(!0)});function E(){return E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},E.apply(this,arguments)}function z(e,t,r,n,s,a,o){try{var i=e[a](o),c=i.value}catch(e){return void r(e)}i.done?t(c):Promise.resolve(c).then(n,s)}function O(e){return function(){var t=this,r=arguments;return new Promise((function(n,s){var a=e.apply(t,r);function o(e){z(a,n,s,o,i,"next",e)}function i(e){z(a,n,s,o,i,"throw",e)}o(void 0)}))}}function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(Object(r),!0).forEach((function(t){C(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,s,a=[],o=!0,i=!1;try{for(r=r.call(e);!(o=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);o=!0);}catch(e){i=!0,s=e}finally{try{o||null==r.return||r.return()}finally{if(i)throw s}}return a}}(e,t)||I(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,t){if(e){if("string"==typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?P(e,t):void 0}}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var T={title:"",content:"",CategoryId:null,type:null,timePoint:null};function A(){var e=(0,o.UO)().type,t=R((0,f.Wd)("CategoryId",f.yz),2),r=t[0],i=(t[1],(0,o.k6)(),(0,s.I0)()),l=(0,o.TH)(),x=R((0,d.i)(),1)[0],z=(0,s.v9)((function(e){return e.note.list})),S=(0,s.v9)((function(e){return e.note.pagination})),A=(0,s.v9)((function(e){return e.note.noteTypes})),_=R((0,f.Kx)({startAt:f.Zp,endAt:f.Zp}),2),Z=(_[0],_[1],R(n.useState(!1),2)),q=Z[0],B=Z[1],U=R(n.useState(D({},T)),2),J=U[0],K=U[1],F=function(){var t=O(regeneratorRuntime.mark((function t(r){var n,s,o,c,u,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.rowId,s=void 0===n?null:n,o=r.dateTime,c=void 0===o?null:o,!s){t.next=11;break}return t.next=4,i((0,b.xj)({id:s}));case 4:return u=t.sent,t.next=7,(0,a.SI)(u);case 7:l=t.sent,B((function(e){return K(l),!0})),t.next=12;break;case 11:B((function(t){return K(D(D({},T),{},{type:e||null,timePoint:c})),!0}));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),H=function(){var e=O(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:B(!1),K(D({},T));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=function(){var t=O(regeneratorRuntime.mark((function t(){var n,s,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,2!==J.type||J.timePoint){t.next=3;break}throw Error("請填寫提示時間");case 3:if(!J.id){t.next=12;break}return t.next=6,k.validate(J);case 6:return s=t.sent,t.next=9,i((0,b.Qk)(D(D({},s),{},{currentType:e||null,currentCategoryId:r||null})));case 9:n=t.sent,t.next=18;break;case 12:return t.next=14,w.validate(J);case 14:return o=t.sent,t.next=17,i((0,b.kT)(D(D({},o),{},{search:l.search,currentType:e||null,currentCategoryId:r||null})));case 17:n=t.sent;case 18:return t.next=20,(0,a.SI)(n);case 20:y.Z.success("".concat(J.id?"更新":"新增","成功")),H(),t.next=28;break;case 24:t.prev=24,t.t0=t.catch(0),console.log("================================ e, ",t.t0),y.Z.fail(c().get(t.t0,"message")||c().get(t.t0,"payload.error"));case 28:case"end":return t.stop()}}),t,null,[[0,24]])})));return function(){return t.apply(this,arguments)}}();n.useEffect((function(){O(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i((0,b.y9)());case 2:return e.next=4,i((0,v.pE)());case 4:case"end":return e.stop()}}),e)})))()}),[]);var N=R(n.useState(!1),2),Q=N[0],W=N[1],L=function(){var t=O(regeneratorRuntime.mark((function t(){var r,n,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=null!=e?"type=".concat(e):"",t.next=4,i((0,b.wT)({searchAry:[].concat((o=l.search.includes("?")?[l.search.split("?")[1]]:[],function(e){if(Array.isArray(e))return P(e)}(o)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(o)||I(o)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),[r])}));case 4:n=t.sent,(s=(0,a.SI)(n)).data&&!c().isEmpty(s.data)||W(!0),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),y.Z.error("錯誤",c().get(t.t0,"message")||c().get(t.t0,"payload.error"));case 12:case"end":return t.stop()}var o}),t,null,[[0,9]])})));return function(){return t.apply(this,arguments)}}(),V=(0,j.YD)({threshold:0}),Y=V.ref,$=V.inView;return V.entry,n.useEffect((function(){O(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return W(!1),e.next=3,i((0,b.Jr)({page:1}));case 3:return e.next=5,L();case 5:return e.next=7,i((0,b.Jr)({page:2}));case 7:case"end":return e.stop()}}),e)})))()}),[l.search,l.pathname]),n.useEffect((function(){$&&O(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1===S.page){e.next=7;break}return e.next=3,(0,g._v)(350);case 3:return e.next=5,L();case 5:return e.next=7,i((0,b.Jr)({page:S.page+1}));case 7:case"end":return e.stop()}}),e)})))()}),[$]),n.createElement(h.I,null,n.createElement(u.Container,{p:{t:"1.5em",b:"2em"},m:{b:"2em"},d:"flex",flexDir:"column"},n.createElement(u.Div,{d:"flex",flexDir:"row",m:{b:"2em",r:".75em",l:".75em"},p:{b:".75em",t:".75em",r:".5em",l:".5em"},bg:"gray200",rounded:"sm",shadow:"2",justify:"flex-end",align:"center"},n.createElement(u.Button,{bg:"warning700",hoverBg:"warning800",rounded:"circle",p:{r:"1.5rem",l:"1.5rem"},shadow:"3",hoverShadow:"4",onClick:function(){return F({})}},"新增")),n.createElement(p.uB,{isOpen:q,note:J,handleClose:function(){return H()},editForm:function(e,t){K(D(D({},J),{},C({},t,e)))},handleSave:function(){return M()}}),n.createElement(u.Row,{d:"flex",flexDir:"row",m:{b:"2em"}},z&&c().isArray(z)&&z.map((function(e){return n.createElement(u.Col,{size:{xs:"12",md:"6"}},n.createElement(p.Zb,{key:e.id,bg:"gray100",hoverBg:"gray300",rounded:"md",shadow:"3",hoverShadow:"4",w:"100%",p:{r:"1em",l:"1em",t:".5em"},m:{t:".5em",b:".5em"},minH:"200px"},n.createElement(u.Div,{d:"flex",flexDir:"row",justify:"space-between",align:"center",m:{b:".5em"}},n.createElement(u.Div,{d:"flex",flexDir:"row",justify:"flex-start",align:"center"},n.createElement(u.Text,{m:{r:".5em"},textSize:"paragraph",textWeight:"800"},(t=e.type,c().isArray(A)?A.find((function(e){return e.value===t})).name:null)),n.createElement("div",{style:D({backgroundColor:c().get(e,"Category.color"),width:15,height:15,borderRadius:"50%"},!c().get(e,"Category.color")&&{border:"1px dashed black"})})),n.createElement(u.Text,{textColor:"gray800",textSize:"caption"},e.timePoint)),n.createElement("hr",null),n.createElement(u.Div,null,n.createElement(u.Text,{textSize:"heading"},e.title)),n.createElement(u.Div,null,e.content),n.createElement(u.Div,{d:"flex",flexDir:"row",justify:"flex-end",m:{t:"2em"}},n.createElement(u.Button,E({},x<=648&&{h:"2.5rem",w:"2.5rem"},{bg:"danger700",hoverBg:"danger600",rounded:"circle",m:{r:"1rem"}},x>648&&{p:{r:"1.5rem",l:"1.5rem"}},{shadow:"2",hoverShadow:"4",onClick:O(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.Z.awiatQuestion("確定要刪除?",e.title);case 2:t.sent.isConfirmed&&i((0,b.f_)({id:e.id}));case 4:case"end":return t.stop()}}),t)})))}),n.createElement(u.Icon,{name:"DeleteSolid",size:"20px",color:"white"}),x>648&&"刪除"),n.createElement(u.Button,E({},x<=648&&{h:"2.5rem",w:"2.5rem"},{bg:"info700",hoverBg:"info600",rounded:"circle",m:{r:"1rem"}},x>648&&{p:{r:"1.5rem",l:"1.5rem"}},{shadow:"2",hoverShadow:"4",onClick:function(){return F({rowId:e.id})}}),n.createElement(u.Icon,{name:"EditSolid",size:"20px",color:"white"}),x>648&&"編輯"))));var t}))),Q?n.createElement(u.Div,{bg:"success600",w:"100%",d:"flex",flexDir:"column",justify:"center",align:"center",p:"5em",rounded:"md"},n.createElement(m(),{type:"cubes",color:"#fff",width:"200px",height:"200px",delay:2}),n.createElement(u.Text,{textColor:"white",textSize:"heading"},"- 到底了 -")):n.createElement("div",{ref:Y},n.createElement(u.Div,{bg:"success600",w:"100%",d:"flex",flexDir:"column",justify:"center",align:"center",p:"5em",rounded:"md"},n.createElement(m(),{type:"cubes",color:"#fff",width:"200px",height:"200px",delay:2}),n.createElement(u.Text,{textColor:"white",textSize:"heading"},"- 載入更多，沒有就到底了 -")))))}},6700:(e,t,r)=>{var n={"./af":2786,"./af.js":2786,"./ar":867,"./ar-dz":4130,"./ar-dz.js":4130,"./ar-kw":6135,"./ar-kw.js":6135,"./ar-ly":6440,"./ar-ly.js":6440,"./ar-ma":7702,"./ar-ma.js":7702,"./ar-sa":6040,"./ar-sa.js":6040,"./ar-tn":7100,"./ar-tn.js":7100,"./ar.js":867,"./az":1083,"./az.js":1083,"./be":9808,"./be.js":9808,"./bg":8338,"./bg.js":8338,"./bm":7438,"./bm.js":7438,"./bn":8905,"./bn-bd":6225,"./bn-bd.js":6225,"./bn.js":8905,"./bo":1560,"./bo.js":1560,"./br":1278,"./br.js":1278,"./bs":622,"./bs.js":622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":877,"./cv.js":877,"./cy":7373,"./cy.js":7373,"./da":4780,"./da.js":4780,"./de":9740,"./de-at":217,"./de-at.js":217,"./de-ch":894,"./de-ch.js":894,"./de.js":9740,"./dv":5300,"./dv.js":5300,"./el":837,"./el.js":837,"./en-au":8348,"./en-au.js":8348,"./en-ca":7925,"./en-ca.js":7925,"./en-gb":2243,"./en-gb.js":2243,"./en-ie":6436,"./en-ie.js":6436,"./en-il":7207,"./en-il.js":7207,"./en-in":4175,"./en-in.js":4175,"./en-nz":6319,"./en-nz.js":6319,"./en-sg":1662,"./en-sg.js":1662,"./eo":2915,"./eo.js":2915,"./es":5655,"./es-do":5251,"./es-do.js":5251,"./es-mx":6112,"./es-mx.js":6112,"./es-us":1146,"./es-us.js":1146,"./es.js":5655,"./et":5603,"./et.js":5603,"./eu":7763,"./eu.js":7763,"./fa":6959,"./fa.js":6959,"./fi":1897,"./fi.js":1897,"./fil":2549,"./fil.js":2549,"./fo":4694,"./fo.js":4694,"./fr":4470,"./fr-ca":3049,"./fr-ca.js":3049,"./fr-ch":2330,"./fr-ch.js":2330,"./fr.js":4470,"./fy":5044,"./fy.js":5044,"./ga":9295,"./ga.js":9295,"./gd":2101,"./gd.js":2101,"./gl":8794,"./gl.js":8794,"./gom-deva":7884,"./gom-deva.js":7884,"./gom-latn":3168,"./gom-latn.js":3168,"./gu":5349,"./gu.js":5349,"./he":4206,"./he.js":4206,"./hi":94,"./hi.js":94,"./hr":316,"./hr.js":316,"./hu":2138,"./hu.js":2138,"./hy-am":1423,"./hy-am.js":1423,"./id":9218,"./id.js":9218,"./is":135,"./is.js":135,"./it":626,"./it-ch":150,"./it-ch.js":150,"./it.js":626,"./ja":9183,"./ja.js":9183,"./jv":8311,"./jv.js":8311,"./ka":2105,"./ka.js":2105,"./kk":7772,"./kk.js":7772,"./km":8758,"./km.js":8758,"./kn":9282,"./kn.js":9282,"./ko":3730,"./ko.js":3730,"./ku":1408,"./ku.js":1408,"./ky":3291,"./ky.js":3291,"./lb":6841,"./lb.js":6841,"./lo":5466,"./lo.js":5466,"./lt":7010,"./lt.js":7010,"./lv":7595,"./lv.js":7595,"./me":9861,"./me.js":9861,"./mi":5493,"./mi.js":5493,"./mk":5966,"./mk.js":5966,"./ml":7341,"./ml.js":7341,"./mn":5115,"./mn.js":5115,"./mr":370,"./mr.js":370,"./ms":9847,"./ms-my":1237,"./ms-my.js":1237,"./ms.js":9847,"./mt":2126,"./mt.js":2126,"./my":6165,"./my.js":6165,"./nb":4924,"./nb.js":4924,"./ne":6744,"./ne.js":6744,"./nl":3901,"./nl-be":9814,"./nl-be.js":9814,"./nl.js":3901,"./nn":3877,"./nn.js":3877,"./oc-lnc":2135,"./oc-lnc.js":2135,"./pa-in":5858,"./pa-in.js":5858,"./pl":4495,"./pl.js":4495,"./pt":9520,"./pt-br":7971,"./pt-br.js":7971,"./pt.js":9520,"./ro":6459,"./ro.js":6459,"./ru":238,"./ru.js":238,"./sd":950,"./sd.js":950,"./se":490,"./se.js":490,"./si":124,"./si.js":124,"./sk":4249,"./sk.js":4249,"./sl":4985,"./sl.js":4985,"./sq":1104,"./sq.js":1104,"./sr":9131,"./sr-cyrl":9915,"./sr-cyrl.js":9915,"./sr.js":9131,"./ss":5893,"./ss.js":5893,"./sv":6415,"./sv.js":6415,"./sw":1172,"./sw.js":1172,"./ta":7333,"./ta.js":7333,"./te":3110,"./te.js":3110,"./tet":2095,"./tet.js":2095,"./tg":7321,"./tg.js":7321,"./th":9041,"./th.js":9041,"./tk":9005,"./tk.js":9005,"./tl-ph":5768,"./tl-ph.js":5768,"./tlh":9444,"./tlh.js":9444,"./tr":2397,"./tr.js":2397,"./tzl":8254,"./tzl.js":8254,"./tzm":1106,"./tzm-latn":699,"./tzm-latn.js":699,"./tzm.js":1106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":7691,"./uk.js":7691,"./ur":3795,"./ur.js":3795,"./uz":6791,"./uz-latn":588,"./uz-latn.js":588,"./uz.js":6791,"./vi":9822,"./vi.js":9822,"./x-pseudo":4378,"./x-pseudo.js":4378,"./yo":5805,"./yo.js":5805,"./zh-cn":3839,"./zh-cn.js":3839,"./zh-hk":1500,"./zh-hk.js":1500,"./zh-mo":9807,"./zh-mo.js":9807,"./zh-tw":4152,"./zh-tw.js":4152};function s(e){var t=a(e);return r(t)}function a(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}s.keys=function(){return Object.keys(n)},s.resolve=a,e.exports=s,s.id=6700}}]);