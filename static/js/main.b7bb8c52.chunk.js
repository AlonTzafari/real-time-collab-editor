(this["webpackJsonpreal-time-collab-editor"]=this["webpackJsonpreal-time-collab-editor"]||[]).push([[0],{64:function(t,e,n){},65:function(t,e,n){},66:function(t,e,n){},73:function(t,e,n){},75:function(t,e,n){},77:function(t,e,n){},78:function(t,e,n){},79:function(t,e,n){},80:function(t,e,n){"use strict";n.r(e);var r=n(16),o=n.n(r),a=n(41),c=n.n(a),i=(n(64),n(65),n(17)),s=(n(66),n(6)),u=n(56),d=new s.d,l=new u.a("ws://localhost:1234","prosemirror",d,{}),m=d.getXmlFragment("prosemirror"),f=l.awareness.getLocalState();f&&f.user&&f.user.color&&f.user.name||l.awareness.setLocalStateField("user",{color:function(){var t=["#b61010","#0d0dbb","#096809","#9b9b08","#914091","#9c620b"];return t[Math.floor(t.length*Math.random())]}(),name:function(){var t=["Jhon","Roy","Raje","Olaf","Jake","Bolt"];return t[Math.floor(t.length*Math.random())]}()});var v=Object(r.createContext)({yProvider:l,yType:m});n(73);var b=n(8);var h=function(t){var e=t.user;return Object(b.jsx)("div",{className:"userAvatar",style:{borderColor:e.color},children:e.name})};var j=function(){var t=Object(r.useState)([]),e=Object(i.a)(t,2),n=e[0],o=e[1],a=Object(r.useContext)(v).yProvider;return Object(r.useEffect)((function(){var t=function(t){var e=Array.from(a.awareness.getStates()).map((function(t){var e=Object(i.a)(t,2),n=e[0],r=e[1];return Object.assign(r.user,{id:n})}));o(e)};return a.awareness.on("change",t),function(){return a.awareness.off("change",t)}}),[]),Object(b.jsx)("header",{className:"header",children:Array.from(n).map((function(t){return Object(b.jsx)("div",{className:"avaterItem",children:Object(b.jsx)(h,{user:t})},t.id)}))})},p=n(30),O=(n(75),n(76),n(77),n(85));n(78);var g=function(t){var e=t.onClose,n=Object(r.useRef)(null),o=Object(r.useContext)(v).yProvider;return Object(a.createPortal)(Object(b.jsx)("div",{className:"commentEditorCover",children:Object(b.jsxs)("div",{className:"commentEditor",children:[Object(b.jsx)(h,{user:o.awareness.getLocalState().user}),Object(b.jsxs)("form",{onSubmit:function(t){var r;e((null===(r=n.current)||void 0===r?void 0:r.value)||""),t.preventDefault()},children:[Object(b.jsx)("input",{ref:n,type:"text"}),Object(b.jsx)("button",{type:"submit",children:"\u27a4"})]})]})}),document.body)};var y=function(t){var e=t.editorActions,n=(t.view,Object(r.useState)("#ffff00")),o=Object(i.a)(n,2),a=o[0],c=o[1],s=Object(r.useState)(!1),u=Object(i.a)(s,2),d=u[0],l=u[1],m=Object(r.useContext)(v).yProvider;return Object(b.jsxs)("div",{className:"menuBar",children:[Object(b.jsx)("button",{title:"Bold",style:{fontWeight:"bold"},className:"menuBtn",onClick:function(t){e.current.setMark("strong"),t.preventDefault()},children:"B"}),Object(b.jsx)("button",{title:"Italic",style:{fontStyle:"italic"},className:"menuBtn",onClick:function(t){e.current.setMark("em"),t.preventDefault()},children:"I"}),Object(b.jsx)("button",{title:"Paragraph",className:"menuBtn",onClick:function(t){e.current.setBlock("paragraph"),t.preventDefault()},children:"P"}),Object(b.jsx)("button",{title:"Header",className:"menuBtn",onClick:function(t){e.current.setBlock("heading"),t.preventDefault()},children:"H"}),Object(b.jsx)("button",{title:"Marker",className:"menuBtn",onClick:function(t){e.current.setMark("highlight",{color:a}),t.preventDefault()},children:"\ud83d\udd8c"}),Object(b.jsxs)("select",{onChange:function(t){return c(t.target.value)},style:{backgroundColor:a},children:[Object(b.jsx)("option",{value:"yellow",style:{backgroundColor:"yellow"}}),Object(b.jsx)("option",{value:"green",style:{backgroundColor:"green"}}),Object(b.jsx)("option",{value:"cyan",style:{backgroundColor:"cyan"}})]}),Object(b.jsx)("button",{title:"Comment",className:"menuBtn",onClick:function(t){l(!0),t.preventDefault()},children:"\ud83d\udcac"}),d&&Object(b.jsx)(g,{onClose:function(t){var n=Object(O.a)(),r=m.awareness.getLocalState().user;e.current.comment(n,r,t),l(!1)}})]})},C=n(26),x=n(4),k=n(53),w=n(1),S=n(3),N=n(5),M=n(13),B=n(28),D=new x.e("comments");var E=function(){function t(e){Object(S.a)(this,t),this.map=void 0,this.decorations=C.b.empty,this.map=e}return Object(N.a)(t,[{key:"getCommentPos",value:function(t,e){for(var n=0;n<e.doc.nodeSize;n++){var r=e.doc.nodeAt(n);if(r&&"comment"===r.type.name&&r.attrs.id===t.data.id)return n}return-1}},{key:"findCommentNodes",value:function(t){var e=[];return function t(n){"comment"===n.type.name?e.push(n):n.content.forEach((function(e){return t(e)}))}(t.doc),e}},{key:"addComment",value:function(t,e){var n=M.b.getState(e),r=n.type,o=n.binding,a={from:Object(B.a)(t.from,r,null===o||void 0===o?void 0:o.mapping),to:Object(B.a)(t.to,r,null===o||void 0===o?void 0:o.mapping),data:Object(p.a)({},t.data)},c=a.data.id;this.map.set(c,a)}},{key:"deleteComment",value:function(t){this.map.delete(t)}},{key:"createDecorations",value:function(t){var e=this,n=M.b.getState(t),r=n.doc,o=n.type,a=n.binding;if(!a)return this.decorations;var c=this.findCommentNodes(t),i=[];return c.forEach((function(t){var n=JSON.parse(t.attrs["data-comment"]),c=e.map.get(n.data.id);if(c){var s=Object(B.b)(r,o,c.from,null===a||void 0===a?void 0:a.mapping),u=Object(B.b)(r,o,c.to,null===a||void 0===a?void 0:a.mapping);if(s&&u){n.from=s,n.to=u;var d=function(t){var e=t.from,n=t.to,r=t.data.user.color+"80";return C.a.inline(e,n,{style:"background-color: ".concat(r)})}(n);i.push(d)}}})),this.decorations=C.b.create(t.doc,i),this.decorations}},{key:"apply",value:function(t,e){var n=t.getMeta(D),r=n&&n.type;return n&&r&&("newComment"===r?this.addComment(n.comment,e):"deleteComment"===r&&this.deleteComment(n.id)),this}}],[{key:"init",value:function(e){return new t(e)}}]),t}();n(79);var P=function(t){var e=t.parent,n=t.comment,o=t.close,a=Object(r.useState)(d()),c=Object(i.a)(a,2),s=c[0],u=c[1];return Object(r.useEffect)((function(){u(d());var t=function(t){u(d())};return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),Object(b.jsxs)("div",{style:s,className:"commentCard",children:[Object(b.jsx)(h,{user:n.data.user}),Object(b.jsx)("button",{onClick:function(){return o()},children:"\u2716"}),Object(b.jsx)("div",{className:"content",children:n.data.text})]});function d(){try{return{top:e.getBoundingClientRect().top,right:document.querySelector(".editor").getBoundingClientRect().right-990}}catch(t){return s||{top:0,right:0}}}},A=function(){function t(e,n,r,o,a){Object(S.a)(this,t),this.node=void 0,this.dom=void 0,this.contentDOM=void 0,this.view=void 0,this.portal=void 0,this.addComment=void 0,this.removeComment=void 0,this.getPos=void 0,this.node=e,this.view=n,this.addComment=o,this.removeComment=a,this.getPos=r}return Object(N.a)(t,[{key:"init",value:function(){var t=this,e=JSON.parse(this.node.attrs["data-comment"]);this.dom=document.createElement("comment"),this.dom.classList.add("comment-ref"),this.dom.setAttribute("data-comment",this.node.attrs["data-comment"]);var n=document.createElement("div");n.classList.add("comment-anchor"),n.id=e.data.id,document.body.appendChild(n);var r=Object(a.createPortal)(Object(b.jsx)(P,{parent:this.dom,comment:e,close:function(){var n=t.getPos(),r=t.view.state.tr.delete(n,n+1).setMeta(D,{type:"deleteComment",id:e.data.id});t.view.dispatch(r)}.bind(this)}),n,e.data.id);return this.portal=r,this.addComment(r),this}},{key:"destroy",value:function(){var t,e,n=JSON.parse(this.node.attrs["data-comment"]),r='[id="'.concat(n.data.id,'"]');null===(t=document.querySelector(r))||void 0===t||t.remove(),(null===(e=this.portal)||void 0===e?void 0:e.key)&&this.removeComment(this.portal.key);var o=this.view.state.tr.setMeta(D,{type:"deleteComment",id:n.data.id});this.view.dispatch(o)}}]),t}(),L=function(t,e,n){var r=t.getMap("prosemirror-comments");return new x.d({key:D,state:{init:function(){return E.init(r)},apply:function(t,e,n){return e.apply(t,n)}},props:{nodeViews:{comment:function(t,r,o){return new A(t,r,o,e,n).init()}},decorations:function(t){return this.getState(t).createDecorations(t)}}})},F={group:"inline",inline:!0,atom:!0,selectable:!1,content:"",attrs:{"data-comment":{default:""}},toDOM:function(t){return["span",{class:"comment-ref","data-comment":t.attrs["data-comment"]}]},parseDOM:[{tag:"span.comment-ref",getAttrs:function(t){return{"data-comment":t.getAttribute("data-comment")}}}]};var J={group:"inline",content:"inline* text*",inline:!0,selectable:!0,attrs:{color:{default:"#ff0000"}},toDOM:function(t,e){var n=document.createElement("span");return n.classList.add("highlight"),n.id=t.attrs.id,n.style.backgroundColor=t.attrs.color,n},parseDOM:[{tag:"span.highlight"}]},R=k.a.spec.nodes,I=k.a.spec.marks,z=R.append({comment:F}),T=I.append({highlight:J}),q=new w.h({nodes:z,marks:T}),H=n(54),V=n(49),W=n(48),X=n(83),G=n(84),K=function(t,e,n){var r=x.b.create({schema:q,plugins:[Object(W.c)(m),Object(X.a)(l.awareness),Object(G.c)(),Object(H.a)({"mod-z":G.b,"mod-y":G.a}),Object(H.a)(V.a),L(d,e,n)]}),o=new C.c(t,{state:r});o.focus();var a={setMark:function(t,e){o.focus(),Object(V.c)(q.marks[t],e)(o.state,o.dispatch)},setBlock:function(t,e){o.focus(),Object(V.b)(q.nodes[t],e)(o.state,o.dispatch)},comment:function(t,e,n){o.focus(),function(t,e,n){return function(r){var o=r.state.selection,a=o.from,c=o.to;if(c<=a||!a||!c)return!1;var i={from:a,to:c,data:{id:t,user:e,text:n}},s=r.state.tr.insert(a,r.state.schema.node("comment",{"data-comment":JSON.stringify(i)}));r.dispatch(s);var u=r.state.tr.setMeta(D,{type:"newComment",comment:i});r.dispatch(u)}}(t,e,n)(o)}};return{view:o,editorActions:a}};var Q=function(){var t=Object(r.useRef)(),e=Object(r.useRef)(),n=Object(r.useRef)({}),o=Object(r.useState)({}),a=Object(i.a)(o,2),c=a[0],s=a[1],u=function(t){c[t.key]=t,s(Object(p.a)({},c))},d=function(t){delete c[t],s(Object(p.a)({},c))};return Object(r.useEffect)((function(){var r=K(t.current,u,d),o=r.view,a=r.editorActions;return e.current=o,n.current=a,function(){return o.destroy()}}),[]),Object(r.useEffect)((function(){}),[c]),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(y,{editorActions:n,view:e}),Object(b.jsx)("div",{className:"editor",ref:t}),Object.values(c)]})};var U=function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(Q,{})})};function Y(){return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(j,{}),Object(b.jsx)(U,{})]})}var Z=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,86)).then((function(e){var n=e.getCLS,r=e.getFID,o=e.getFCP,a=e.getLCP,c=e.getTTFB;n(t),r(t),o(t),a(t),c(t)}))};c.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(Y,{})}),document.getElementById("root")),Z()}},[[80,1,2]]]);
//# sourceMappingURL=main.b7bb8c52.chunk.js.map