(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{67:function(e,t,r){"use strict";r.r(t);var s=r(5),a=r(8),n=r.n(a),c=r(17),l=r(2),o=r(0),d=r(4),i=r(16),u=r(21),m=r(18),b=function(){var e=Object(o.useState)(""),t=Object(l.a)(e,2),r=t[0],s=t[1];return{value:r,valueChangeHandler:function(e){s(e.target.value)},setEnteredValue:s}},p=r(1);t.default=function(){var e=Object(o.useContext)(u.a).handleModalText,t=Object(d.g)(),r=Object(o.useState)(!1),a=Object(l.a)(r,2),g=a[0],j=a[1],h=Object(o.useState)(!1),f=Object(l.a)(h,2),x=f[0],y=f[1];Object(o.useEffect)((function(){localStorage.getItem("token")||t.push("/")}),[t]);var v=Object(o.useState)(["Loading..."]),O=Object(l.a)(v,2),w=O[0],k=O[1];Object(o.useEffect)((function(){fetch("https://restcountries.eu/rest/v2/all").then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){return[e.name,e.alpha3Code]}));k(t)})).catch((function(e){console.log("En error ocurred: "+e)}))}),[]);var N=Object(o.useState)(Object(c.a)(n.a.mark((function e(){var t,r,s,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),console.log("fetched user data"),e.prev=2,t=Object(i.a)(localStorage.getItem("token")),r=t._id,e.next=6,fetch("/api/users/".concat(r));case 6:return s=e.sent,e.next=9,s.json();case 9:if(!(a=e.sent).resultsFound){e.next=15;break}S(a.result),y(!1),e.next=16;break;case 15:throw new Error;case 16:e.next=21;break;case 18:return e.prev=18,e.t0=e.catch(2),e.abrupt("return",{});case 21:case"end":return e.stop()}}),e,null,[[2,18]])})))),C=Object(l.a)(N,2),E=C[0],S=C[1],_=Object(o.useState)(Object(c.a)(n.a.mark((function e(){var t,r,s,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),e.prev=1,t=Object(i.a)(localStorage.getItem("token")),r=t._id,e.next=5,fetch("/api/users/".concat(r));case 5:return s=e.sent,e.next=8,s.json();case 8:if(!(a=e.sent).resultsFound||!a.result.address){e.next=15;break}console.log(a.result.address),H(a.result.address),y(!1),e.next=16;break;case 15:throw new Error;case 16:e.next=21;break;case 18:return e.prev=18,e.t0=e.catch(1),e.abrupt("return",{});case 21:case"end":return e.stop()}}),e,null,[[1,18]])})))),F=Object(l.a)(_,2),V=F[0],H=F[1],q=b(E.name),P=q.value,z=q.setEnteredValue,I=q.valueChangeHandler,J=b(E.surname),T=J.value,G=J.setEnteredValue,L=J.valueChangeHandler,M=b(V.street),A=M.value,D=M.valueChangeHandler,R=M.setEnteredValue,U=b(V.province),W=U.value,Z=U.valueChangeHandler,B=U.setEnteredValue,K=b(V.city),Q=K.value,X=K.valueChangeHandler,Y=K.setEnteredValue,$=b(V.country),ee=$.value,te=$.setEnteredValue,re=b(V.zip),se=re.value,ae=re.valueChangeHandler,ne=re.setEnteredValue,ce=function(){z(E.name),G(E.surname),R(V.street),B(V.province),Y(V.city),te(V.country),ne(V.zip)};Object(o.useEffect)((function(){ce()}),[V,E]);var le=Object(o.useState)([]),oe=Object(l.a)(le,2),de=oe[0],ie=oe[1],ue=function(){var r=Object(c.a)(n.a.mark((function r(a){var l,o,d;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a.preventDefault(),r.prev=1,r.next=4,fetch("/api/users/".concat(E._id));case 4:return o=r.sent,r.next=7,o.json();case 7:l=r.sent,r.next=13;break;case 10:r.prev=10,r.t0=r.catch(1),e("Something went wrong");case 13:d=Object(s.a)(Object(s.a)({},l.result),{},{name:P,surname:T,address:{countryCode:ee,province:W,city:Q,zip:se,street:A}}),ie([]),y(!0),console.log("putting"),fetch("/api/users/".concat(E._id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}).then((function(e){return console.log("json"),e.json()})).then(function(){var r=Object(c.a)(n.a.mark((function r(s){return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(console.log(s),!s.error){r.next=3;break}throw new Error(s.error);case 3:ie([]),j(!1),y(!1),t.push("/"),e("Personal data changed successfully!");case 8:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()).catch((function(e){console.log(e.message),y(!1),ie(e.message.split(",")),console.log("An error ocurred: "+e.message)}));case 18:case"end":return r.stop()}}),r,null,[[1,10]])})));return function(e){return r.apply(this,arguments)}}(),me=de.map((function(e){return Object(p.jsx)("li",{children:e})}));Object(o.useEffect)((function(){ie([])}),[]);var be=w.map((function(e){return V.countryCode&&e[1]===V.countryCode||!V.countryCode&&"Spain"===e[0]?Object(p.jsx)("option",{selected:!0,id:e[1],value:e[1],children:e[0]}):Object(p.jsx)("option",{id:e[1],value:e[1],children:e[0]})}));return Object(p.jsxs)(p.Fragment,{children:[x&&Object(p.jsx)(m.a,{}),Object(p.jsx)("form",{onSubmit:ue,children:Object(p.jsxs)("div",{className:"overflow-hidden sm:rounded-md",children:[Object(p.jsx)("div",{className:"px-4 py-5 sm:p-6",children:Object(p.jsxs)("div",{className:"grid grid-cols-6 gap-6",children:[Object(p.jsxs)("div",{className:"col-span-6 sm:col-span-3",children:[Object(p.jsx)("label",{htmlFor:"first_name",className:"block text-sm font-medium text-gray-700",children:"First name"}),Object(p.jsx)("input",{type:"text",name:"first_name",id:"first_name",autoComplete:"given-name",disabled:!g,value:g?P:E.name,onChange:I,className:"mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),Object(p.jsxs)("div",{className:"col-span-6 sm:col-span-3",children:[Object(p.jsx)("label",{htmlFor:"last_name",className:"block text-sm font-medium text-gray-700",children:"Last name"}),Object(p.jsx)("input",{type:"text",name:"last_name",id:"last_name",autoComplete:"family-name",disabled:!g,value:g?T:E.surname,onChange:L,className:"mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),Object(p.jsxs)("div",{className:"col-span-6 sm:col-span-4",children:[Object(p.jsx)("label",{htmlFor:"email_address",className:"block text-sm font-medium text-gray-700",children:"Email address"}),Object(p.jsx)("input",{value:E.email,readOnly:!0,type:"text",name:"email_address",id:"email_address",autoComplete:"email",className:"bg-gray-100 mt-2 p-1 ring-1 ring-gray-300 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),Object(p.jsxs)("div",{className:"col-span-6 sm:col-span-3",children:[Object(p.jsx)("label",{htmlFor:"gender",className:"block text-sm font-medium text-gray-700",children:"Gender"}),Object(p.jsxs)("select",{id:"gender",name:"gender",autoComplete:"sex",required:!0,placeholder:"Gender",value:E.gender,disabled:!g,className:"".concat(!g&&"bg-gray-100"," mt-1 block w-full py-2 px-3 border placeholder-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"),children:[Object(p.jsx)("option",{selected:!0,value:"f",children:"Female"}),Object(p.jsx)("option",{value:"m",children:"Male"}),Object(p.jsx)("option",{value:"o",children:"Other"})]})]}),Object(p.jsxs)("div",{className:"col-span-6 sm:col-span-3",children:[Object(p.jsx)("label",{htmlFor:"country",className:"block text-sm font-medium text-gray-700",children:"Country / Region"}),Object(p.jsx)("select",{id:"country",name:"country",autoComplete:"country",required:!0,disabled:!g,className:"".concat(!g&&"bg-gray-100"," mt-1 block w-full py-2 px-3 border  placeholder-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"),children:be})]}),Object(p.jsxs)("div",{className:"col-span-6",children:[Object(p.jsx)("label",{htmlFor:"street",className:"block text-sm font-medium text-gray-700",children:"Street address"}),Object(p.jsx)("input",{type:"text",name:"street",id:"street",required:!0,autoComplete:"street-address",disabled:!g,value:g?A:V.street,onChange:D,className:"mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),Object(p.jsxs)("div",{className:"col-span-6 sm:col-span-6 lg:col-span-2",children:[Object(p.jsx)("label",{htmlFor:"city",className:"block text-sm font-medium text-gray-700",children:"City"}),Object(p.jsx)("input",{type:"text",name:"city",id:"city",required:!0,disabled:!g,value:g?Q:V.city,onChange:X,className:"mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),Object(p.jsxs)("div",{className:"col-span-6 sm:col-span-3 lg:col-span-2",children:[Object(p.jsx)("label",{htmlFor:"state",className:"block text-sm font-medium text-gray-700",children:"State / Province"}),Object(p.jsx)("input",{type:"text",name:"state",id:"state",required:!0,disabled:!g,value:g?W:V.province,onChange:Z,className:"mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),Object(p.jsxs)("div",{className:"col-span-6 sm:col-span-3 lg:col-span-2",children:[Object(p.jsx)("label",{htmlFor:"postal_code",className:"block text-sm font-medium text-gray-700",children:"ZIP / Postal"}),Object(p.jsx)("input",{type:"text",name:"postal_code",id:"postal_code",autoComplete:"postal-code",required:!0,disabled:!g,value:g?se:V.zip,onChange:ae,className:"mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]})]})}),de.length>0&&Object(p.jsxs)("div",{class:"mx-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4",role:"alert",children:[Object(p.jsx)("h4",{className:"font-bold text-xl",children:"Wrong data"}),Object(p.jsx)("ul",{className:"ml-5 list-disc",children:me})]}),Object(p.jsxs)("div",{className:"px-4 text-right sm:px-6",children:[!g&&Object(p.jsx)("button",{type:"button",className:"inline-flex justify-center py-2 px-4 my-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",onClick:function(){j(!0)},children:"Edit"}),g&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("button",{type:"button",className:"inline-flex justify-center py-2 px-4 my-2 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500",onClick:function(){j(!1),ce()},children:"Cancel"}),Object(p.jsx)("button",{type:"submit",className:"inline-flex justify-center py-2 px-4 my-2  ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",children:"Save"})]})]})]})})]})}}}]);
//# sourceMappingURL=9.cb514cd5.chunk.js.map