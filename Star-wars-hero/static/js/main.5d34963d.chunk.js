(this["webpackJsonpstar-wars"]=this["webpackJsonpstar-wars"]||[]).push([[0],{19:function(e,t,a){e.exports=a.p+"static/media/loader.32fe4dc6.svg"},20:function(e,t,a){e.exports=a(59)},25:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){var n={"./BeruWhitesunlars.jpg":29,"./BiggsDarklighter.jpg":30,"./C-3PO.jpg":31,"./DarthVader.jpg":32,"./LeiaOrgana.jpg":33,"./LukeSkywalker.jpg":34,"./Obi-WanKenobi.jpg":35,"./OwenLars.jpg":36,"./R2-D2.jpg":37,"./R5-D4.jpg":38};function r(e){var t=o(e);return a(t)}function o(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=o,e.exports=r,r.id=28},29:function(e,t,a){e.exports=a.p+"static/media/BeruWhitesunlars.8f4b4f89.jpg"},30:function(e,t,a){e.exports=a.p+"static/media/BiggsDarklighter.daac3de8.jpg"},31:function(e,t,a){e.exports=a.p+"static/media/C-3PO.ce3e6047.jpg"},32:function(e,t,a){e.exports=a.p+"static/media/DarthVader.0f26e915.jpg"},33:function(e,t,a){e.exports=a.p+"static/media/LeiaOrgana.53c0b037.jpg"},34:function(e,t,a){e.exports=a.p+"static/media/LukeSkywalker.c5857f7d.jpg"},35:function(e,t,a){e.exports=a.p+"static/media/Obi-WanKenobi.74aeb9f8.jpg"},36:function(e,t,a){e.exports=a.p+"static/media/OwenLars.dac79974.jpg"},37:function(e,t,a){e.exports=a.p+"static/media/R2-D2.79c869ee.jpg"},38:function(e,t,a){e.exports=a.p+"static/media/R5-D4.210c16d2.jpg"},40:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(17),c=a.n(o),i=(a(25),a(2)),s=a(3),l=a(5),u=a(4),p=a(6),m=(a(26),a(27),function(e){var t=function(e){var t={};return e.keys().map((function(a,n){t[a.replace("./","")]=e(a)})),t}(a(28)),n="".concat(e.hero.name.split(" ").join(""),".jpg");return r.a.createElement("div",{className:"ItemHero"},r.a.createElement("img",{className:"ItemHero__img",src:t[n],alt:e.hero.name}),r.a.createElement("div",{className:"ItemHero__content"},r.a.createElement("h4",{className:"ItemHero__title"},e.hero.name),r.a.createElement("ul",{className:"ItemHero__list"},r.a.createElement("li",null,"Gender ",e.hero.gender),r.a.createElement("li",null,"Brith Year ",e.hero.birth_year),r.a.createElement("li",null,"Eye Color ",e.hero.eye_color))))}),h=a(7),g=a.n(h),d=(a(40),a(18)),f=a.n(d).a.create({baseURL:"https://swapi.co/api/people/"}),j=a(19),v=a.n(j),b=(a(58),function(){return r.a.createElement("div",{className:"Loader"},r.a.createElement("img",{src:v.a,className:"Loader-img",alt:"Loading..."}))}),k=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={hesous:[],loading:!0},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"renderHesous",value:function(){var e=this;return this.state.hesous.map((function(t){return r.a.createElement("li",{key:t.name,onClick:function(){e.props.changeHero(t)}},t.name)}))}},{key:"componentDidMount",value:function(){var e,t;return g.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,g.a.awrap(f.get());case 3:e=a.sent,t=e.data.results,this.setState({hesous:t,loading:!1}),console.log(e),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(0),console.error(a.t0);case 12:case"end":return a.stop()}}),null,this,[[0,9]])}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.state.loading?r.a.createElement(b,null):r.a.createElement("ul",{className:"ListHeroes"},this.renderHesous()))}}]),t}(n.Component),E=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).changeHero=function(t){e.setState({hero:t})},e.state={},e}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(k,{changeHero:this.changeHero}),this.state.hero?r.a.createElement(m,{hero:this.state.hero}):null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[20,1,2]]]);
//# sourceMappingURL=main.5d34963d.chunk.js.map