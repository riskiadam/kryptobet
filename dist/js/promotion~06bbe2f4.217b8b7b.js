(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["promotion~06bbe2f4"],{"053a":function(t,a,o){"use strict";o.r(a);var e=function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("BaseLayout",[o("div",{staticStyle:{padding:"0px",margin:"0px"}},[o("div",{staticClass:"promotion"},[o("div",{staticClass:"desktopPromotion text-light center"},[o("div",{staticStyle:{"background-color":"#000"}},[o("b-row",{staticClass:"align-center center justify-content-center",staticStyle:{"background-color":"#000","padding-top":"20px","padding-bottom":"20px"}},[o("b-button",{staticClass:"text-menu-bottom",attrs:{to:{name:"Promotion"}}},[t._v("Promosi")]),o("b-button",{staticClass:"text-menu-bottom",attrs:{to:{name:"Blog"}}},[t._v("Berita")]),o("b-button",{staticClass:"text-menu-bottom",attrs:{to:{name:"Refferal"}}},[t._v("Referral")]),o("b-button",{staticClass:"text-menu-bottom",attrs:{to:{name:"Help"}}},[t._v("Bantuan")]),o("b-button",{staticClass:"text-menu-bottom",attrs:{target:"_blank",href:"http://165.22.253.162/keluaran-togel.amp"}},[t._v("Live Score")])],1)],1),o("h1",{staticClass:"ql align-center",staticStyle:{"font-size":"25px","margin-bottom":"0.5%"}},[t._v(" Join Isobet to win special prizes. ")]),o("span",{staticClass:"ql align-center",staticStyle:{"font-size":"18px","margin-bottom":"2%"}},[t._v(" Banyak Promo Cashback dan Hadiah lainnya yang bisa dinikmati di Isobet ")]),t._l(t.data,(function(a){return o("div",{key:a.code,staticClass:"row-desktop ml-auto mr-auto"},[o("b-row",{staticClass:" mt-4"},[o("b-col",[o("b-img",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:"accordion-"+a.code,expression:"`accordion-${promo.code}`"}],staticClass:"p-0",attrs:{"fluid-grow":"",src:a.imageUrl}})],1)],1),o("b-row",{staticClass:" mb-2"},[o("b-col",[o("b-collapse",{staticClass:"collapse-promotion ",attrs:{id:"accordion-"+a.code,accordion:"",role:"tabpanel"}},[o("b-card-body",[o("b-row",[o("b-col",[o("h6",{staticClass:"collapse-title"},[t._v(t._s(a.title))])]),o("hr",{staticClass:"hr-sidemenu"})],1),o("b-row",[o("b-col",[o("div",{staticClass:"promotion-horizontal",domProps:{innerHTML:t._s(a.content)}})])],1)],1)],1)],1)],1)],1)}))],2)])])])},s=[],n=(o("d3b7"),o("6fea")),i={components:{BaseLayout:n["a"]},data:function(){return{data:null}},mounted:function(){this.loadPromo()},methods:{loadPromo:function(){var t=this;this.changeLoader(!0),this.ApiService.get("promotion").then((function(a){t.data=a.data})).finally((function(){t.changeLoader(!1)}))}}},r=i,c=o("2877"),l=Object(c["a"])(r,e,s,!1,null,null,null);a["default"]=l.exports}}]);
//# sourceMappingURL=promotion~06bbe2f4.217b8b7b.js.map