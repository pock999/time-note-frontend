"use strict";(self.webpackChunktime_note_frontend=self.webpackChunktime_note_frontend||[]).push([[713],{6713:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var n,a,o,i=r(7294),c=r(2909),s=r(5998),l=r(9669),u=r.n(l),p=r(6486),m=r.n(p),d=r(458),f=r(8804);function b(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var g=(0,f.F4)(n||(n=b(["\n  100% {\n    opacity: 1;\n    margin: 0;\n  }\n"]))),y=(0,f.iv)(a||(a=b(["\n  1s "," 1s forwards\n"])),g);const v=(0,f.ZP)("h1")(o||(o=b(["\n  opacity: 0;\n  animation: ",";\n  font-size: 60px;\n  margin-top: 100px;\n  color: white;\n"])),y);var w,h,x;function j(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var O=(0,f.F4)(w||(w=j(["\n  100% {\n    opacity: 1;\n  }\n"]))),k=(0,f.iv)(h||(h=j(["\n  1s "," 1s forwards\n"])),O);const E=(0,f.ZP)("div")(x||(x=j(["\n  opacity: 0;\n  animation: ",";\n"])),k);var P,S=r(1728);function z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?z(Object(r),!0).forEach((function(t){D(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):z(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function D(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function A(e,t,r,n,a,o,i){try{var c=e[o](i),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,a)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var C,I,B=r(4147).version,Z=(0,f.ZP)("div")(P||(C=['\n  width: 100vw;\n  height: 100vh;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  background-image: url("../assets/home-calendar-side.png");\n  background-repeat: no-repeat;\n  background-size: cover;\n\n'],I||(I=C.slice(0)),P=Object.freeze(Object.defineProperties(C,{raw:{value:Object.freeze(I)}}))));function q(){var e,t,r=(0,s.v9)((function(e){return e.auth.user})),n=(e=i.useState({api_ver:null}),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],i=!0,c=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(c)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=n[0],o=n[1];return i.useEffect((function(){var e;(e=regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u().get("/info");case 2:t=e.sent,r=t.data,o((function(e){return T(T({},e),{},{api_ver:m().get(r,"data.version")})}));case 5:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function i(e){A(o,n,a,i,c,"next",e)}function c(e){A(o,n,a,i,c,"throw",e)}i(void 0)}))})()}),[]),i.createElement(Z,null,i.createElement(v,null,"Time-Note"),i.createElement(E,null,i.createElement(S.Zb,{w:{xs:"calc(100vw-20px)",md:"500px"},m:{t:"50px",l:{xs:"10px",md:"0"},r:{xs:"10px",md:"0"}},p:"30px",rounded:"md"},i.createElement(d.Text,{tag:"h2",textSize:"display1"},"一個備忘紀錄的系統。"),i.createElement("hr",{style:{marginTop:"20px",marginBottom:"20px"}}),i.createElement(d.Text,{tag:"h3",textSize:"title"},"目標"),i.createElement(d.Text,{tag:"p",textSize:"subheader"},"期望打造一個行事曆 + 筆記功能的系統"),i.createElement(d.Text,{tag:"h3",textSize:"title"},"核心理念"),i.createElement(d.Text,{tag:"p",textSize:"subheader"},"想要讓紀錄與行事曆在同一個系統就能同時具備"),i.createElement("hr",{style:{marginTop:"20px",marginBottom:"20px"}}),i.createElement(d.Div,{m:"1rem",d:"flex",flexDir:"row",justify:"center"},i.createElement(c.rU,{to:r?"/notes":"/login"},i.createElement(d.Button,{bg:"warning700",hoverBg:"warning800",rounded:"circle",p:{r:"1.5rem",l:"1.5rem"},shadow:"3",hoverShadow:"4",type:"submit",m:{t:"20px"}},"前往體驗"))),i.createElement(d.Div,{m:"1rem",d:"flex",flexDir:"row",justify:"flex-end"},i.createElement(d.Text,{textColor:"gray700"},"前端:"," V".concat(B)),i.createElement(d.Text,{textColor:"gray700"},"  ","／","  "),i.createElement(d.Text,{textColor:"gray700"},a.api_ver?"API: V".concat(a.api_ver):"API未連線")))))}},4147:e=>{e.exports=JSON.parse('{"name":"time-note-frontend","version":"0.0.1","description":"","main":"index.js","scripts":{"build":"webpack","start":"webpack-dev-server","test":"jest","test:watch":"yarn test -- --watch","build:gh":"webpack --config ./webpack.production.config.js","predeploy":"yarn build:gh","deploy":"gh-pages -d dist"},"author":"","license":"ISC","dependencies":{"@babel/plugin-syntax-dynamic-import":"^7.8.3","@babel/runtime":"^7.17.9","@date-io/dayjs":"^2.14.0","@emotion/react":"^11.9.0","@emotion/styled":"^11.8.1","@fortawesome/fontawesome-svg-core":"^6.1.1","@fortawesome/free-brands-svg-icons":"^6.1.1","@fortawesome/free-solid-svg-icons":"^6.1.1","@fortawesome/react-fontawesome":"^0.1.18","@reduxjs/toolkit":"^1.8.1","@testing-library/jest-dom":"^5.16.4","@testing-library/react":"^13.2.0","add":"^2.0.6","atomize":"^1.0.28","axios":"^0.27.2","css-loader":"^6.7.1","dayjs":"^1.11.2","eslint":"^7.32.0 || ^8.2.0","gh-pages":"^3.2.3","history":"4.7.1","jest":"^28.1.0","jest-environment-jsdom":"^28.1.0","lodash":"^4.17.21","moment":"^2.29.4","prop-types":"^15.8.1","query-string":"^7.1.1","react":"^18.0.0","react-color":"^2.19.3","react-dom":"^18.0.0","react-icons":"^4.4.0","react-intersection-observer":"^9.4.0","react-loading":"^2.0.3","react-loading-skeleton":"^3.1.0","react-redux":"^8.0.1","react-router-dom":"5.3.1","react-sidebar":"^3.0.2","react-transition-group":"^4.4.5","react-vertical-timeline-component":"^3.5.2","redux":"^4.2.0","regenerator-runtime":"^0.13.9","sass":"^1.52.1","sass-loader":"^13.0.0","style-loader":"^3.3.1","styled-components":"^5.3.5","styletron-engine-atomic":"^1.5.0","styletron-react":"^6.1.0","sweetalert2":"^11.4.16","url-loader":"^4.1.1","use-query-params":"^1.2.3","yarn":"^1.22.19","yup":"^0.32.11"},"devDependencies":{"@babel/core":"^7.17.9","@babel/plugin-transform-runtime":"^7.17.10","@babel/preset-env":"^7.16.11","@babel/preset-react":"^7.16.7","babel-loader":"^8.2.4","copy-webpack-plugin":"^10.2.4","dotenv-webpack":"^7.1.0","eslint-config-airbnb":"^19.0.4","eslint-plugin-import":"^2.25.3","eslint-plugin-jsx-a11y":"^6.5.1","eslint-plugin-react":"^7.28.0","eslint-plugin-react-hooks":"^4.3.0","file-loader":"^6.2.0","html-webpack-plugin":"^5.5.0","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-dev-server":"^4.8.1"}}')}}]);