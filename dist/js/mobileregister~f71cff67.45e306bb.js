(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mobileregister~f71cff67"],{8114:function(t,a,s){t.exports=s.p+"img/long-banner-6.fc07dd72.jpg"},e9f4:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("BaseLayout",[e("div",{staticClass:"register"},[e("div",{staticClass:"DesktopRegister",staticStyle:{padding:"0px",margin:"0px"}},[e("div",[e("b-img",{staticClass:"center align-center max-width",staticStyle:{width:"100%","border-bottom":"0px solid white",padding:"1% 10%"},attrs:{src:s("8114"),alt:"banner",fluid:""}})],1),e("div",{staticClass:"desktopPromotion",staticStyle:{"background-color":"#000"}},[e("b-row",{staticClass:"align-center center justify-content-center",staticStyle:{"background-color":"#000","padding-top":"20px","padding-bottom":"20px"}},[e("b-button",{staticClass:"text-menu-bottom",attrs:{to:{name:"Promotion"}}},[t._v("Promosi")]),e("b-button",{staticClass:"text-menu-bottom",attrs:{to:{name:"Blog"}}},[t._v("Berita")]),e("b-button",{staticClass:"text-menu-bottom",attrs:{to:{name:"Refferal"}}},[t._v("Referral")]),e("b-button",{staticClass:"text-menu-bottom",attrs:{to:{name:"Help"}}},[t._v("Bantuan")]),e("b-button",{staticClass:"text-menu-bottom",attrs:{target:"_blank",href:"http://165.22.253.162/keluaran-togel.amp"}},[t._v("Live Score")])],1)],1),e("b-form",{on:{submit:function(a){return a.preventDefault(),t.register(a)}}},[e("div",{staticClass:"register-content"},[e("div",{staticClass:"register-section-container"},[e("div",{staticClass:"register-section-title",staticStyle:{"padding-left":"30px"}},[t._v(" REGISTRASI ")]),e("div",{staticClass:"register-section-content"},[e("b-container",{attrs:{fluid:""}},[e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" Nama "),e("div",{staticClass:"small-note",staticStyle:{"margin-top":"0.1px"}},[t._v(" Sesuai dengan Rekening Bank ")])]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"text",placeholder:"Nama Lengkap*",size:"sm",fluid:""},model:{value:t.payload.accountName,callback:function(a){t.$set(t.payload,"accountName",a)},expression:"payload.accountName"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" BANK ")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("v-select",{staticClass:"bg-white text-grey",attrs:{options:t.params.bankList,reduce:function(t){return t.code},label:"name",placeholder:"Pilih Bank*",block:"",required:""},model:{value:t.payload.bankCode,callback:function(a){t.$set(t.payload,"bankCode",a)},expression:"payload.bankCode"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" NOMOR REKENING BANK "),e("div",{staticClass:"small-note",staticStyle:{"margin-top":"0.1px"}},[t._v(" Must be Valid for Deposit / Withdrawal ")])]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"number",placeholder:"Nomor Rekening Bank*",size:"sm",fluid:""},model:{value:t.payload.accountNo,callback:function(a){t.$set(t.payload,"accountNo",a)},expression:"payload.accountNo"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v("NO. HANDPHONE/WA/LINE")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"number",placeholder:"No. Handphone/WA/Line*",size:"sm",fluid:""},model:{value:t.payload.phone,callback:function(a){t.$set(t.payload,"phone",a)},expression:"payload.phone"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" USERNAME ")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"text",placeholder:"Username*",size:"sm",fluid:""},on:{keypress:t.checkAlphaNumeric},model:{value:t.payload.username,callback:function(a){t.$set(t.payload,"username",a)},expression:"payload.username"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" EMAIL ")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"email",placeholder:"Alamat Email*",size:"sm",fluid:""},model:{value:t.payload.email,callback:function(a){t.$set(t.payload,"email",a)},expression:"payload.email"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" PASSWORD ")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"password",placeholder:"Setidaknya 6 Huruf / Angka untuk Kata Sandi*",size:"sm",fluid:""},model:{value:t.payload.password,callback:function(a){t.$set(t.payload,"password",a)},expression:"payload.password"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" KONFIRMASI PASSWORD ")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"password",placeholder:"Masukkan kembali Password*",size:"sm",fluid:""},model:{value:t.payload.conPassword,callback:function(a){t.$set(t.payload,"conPassword",a)},expression:"payload.conPassword"}})],1)],1),e("b-row",{staticClass:"register-form-row-last"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" KODE REFERRAL "),e("div",{staticClass:"small-note",staticStyle:{"margin-top":"0.1px"}},[t._v(" Opsional (jika Anda memilikinya) ")])]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"text",placeholder:"Kode Referral",size:"sm",fluid:"",value:t.refCode}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}}),e("b-col",{staticClass:"register-form-input checkbox-col",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-checkbox",{attrs:{id:"checkbox-1",name:"checkbox-1",value:"1","unchecked-value":"0",size:"lg"},model:{value:t.status,callback:function(a){t.status=a},expression:"status"}},[e("div",{staticClass:"small-checkbox-text"},[t._v(" Dengan ini saya menyatakan telah dewasa berumur lebih dari 18 tahun dan secara sadar membaca, mengerti, dan menyetujui peraturan yang ada di website ini ")])])],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}}),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-button",{staticClass:"submit-button",attrs:{type:"submit",disabled:"0"==t.status}},[t._v(" SUBMIT ")])],1)],1)],1)],1)])])])],1),e("div",{staticClass:"MobileRegister",staticStyle:{padding:"0px",margin:"0px"}},[e("b-img",{staticClass:"center align-center max-width",staticStyle:{width:"100%","border-bottom":"1px solid white"},attrs:{src:s("75ca"),alt:"Banner Promotion Isobet"}}),e("MenuMobile"),e("b-form",{on:{submit:function(a){return a.preventDefault(),t.register(a)}}},[e("div",{staticClass:"register-content"},[e("div",{staticClass:"register-section-container"},[e("div",{staticClass:"register-section-title"},[t._v("REGISTRASI")]),e("div",{staticClass:"register-section-content"},[e("b-container",{attrs:{fluid:""}},[e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v("Nama "),e("div",{staticClass:"small-note",staticStyle:{"margin-top":"0.1px"}},[t._v(" Sesuai dengan Rekening Bank ")])]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"text",placeholder:"Nama Lengkap*",size:"sm",fluid:""},model:{value:t.payload.accountName,callback:function(a){t.$set(t.payload,"accountName",a)},expression:"payload.accountName"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v("BANK")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-select",{staticClass:"bg-white text-grey",attrs:{label:"name",placeholder:"Pilih Bank*",block:"",required:""},model:{value:t.payload.bankCode,callback:function(a){t.$set(t.payload,"bankCode",a)},expression:"payload.bankCode"}},[e("b-form-select-option",{attrs:{value:null}},[t._v("Pilih Bank*")]),t._l(t.params.bankList,(function(a){return e("b-form-select-option",{key:a.code,attrs:{value:a.code}},[t._v(t._s(a.name))])}))],2)],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v("NOMOR REKENING BANK "),e("div",{staticClass:"small-note",staticStyle:{"margin-top":"0.1px"}},[t._v(" Must be Valid for Deposit / Withdrawal ")])]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"number",placeholder:"Nomor Rekening Bank*",size:"sm",fluid:""},model:{value:t.payload.accountNo,callback:function(a){t.$set(t.payload,"accountNo",a)},expression:"payload.accountNo"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v("NO. HANDPHONE/WA/LINE")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"number",placeholder:"No. Handphone/WA/Line*",size:"sm",fluid:""},model:{value:t.payload.phone,callback:function(a){t.$set(t.payload,"phone",a)},expression:"payload.phone"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" USERNAME ")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"text",placeholder:"Username*",size:"sm",fluid:""},on:{keypress:t.checkAlphaNumeric},model:{value:t.payload.username,callback:function(a){t.$set(t.payload,"username",a)},expression:"payload.username"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" EMAIL ")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"email",placeholder:"Alamat Email*",size:"sm",fluid:""},model:{value:t.payload.email,callback:function(a){t.$set(t.payload,"email",a)},expression:"payload.email"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" PASSWORD ")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"password",placeholder:"Setidaknya 6 Huruf / Angka untuk Kata Sandi*",size:"sm",fluid:""},model:{value:t.payload.password,callback:function(a){t.$set(t.payload,"password",a)},expression:"payload.password"}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v("KONFIRMASI PASSWORD")]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"password",placeholder:"Masukkan kembali Password*",size:"sm",fluid:""},model:{value:t.payload.conPassword,callback:function(a){t.$set(t.payload,"conPassword",a)},expression:"payload.conPassword"}})],1)],1),e("b-row",{staticClass:"register-form-row-last"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}},[t._v(" KODE REFERRAL "),e("div",{staticClass:"small-note",staticStyle:{"margin-top":"0.1px"}},[t._v(" Opsional (jika Anda memilikinya) ")])]),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-input",{attrs:{type:"text",placeholder:"Kode Referral",size:"sm",fluid:"",disabled:"",value:t.refCode}})],1)],1),e("b-row",{staticClass:"register-form-row"},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}}),e("b-col",{staticClass:"register-form-input checkbox-col",attrs:{col:"",cols:"12",md:"8"}},[e("b-form-checkbox",{attrs:{id:"checkbox-1",name:"checkbox-1",value:"1","unchecked-value":"0",size:"lg"},model:{value:t.status,callback:function(a){t.status=a},expression:"status"}},[e("div",{staticClass:"small-checkbox-text"},[t._v(" Dengan ini saya menyatakan telah dewasa berumur lebih dari 18 tahun dan secara sadar membaca, mengerti, dan menyetujui peraturan di website ini ")])])],1)],1),e("b-row",{staticClass:"register-form-row center text-center justify-content-center",attrs:{"align-h":"center"}},[e("b-col",{staticClass:"register-form-label",attrs:{col:"",cols:"12",md:"4"}}),e("b-col",{staticClass:"register-form-input",attrs:{col:"",cols:"12",md:"8"}},[e("b-button",{staticClass:"submit-button",attrs:{type:"submit",disabled:"0"==t.status}},[t._v("SUBMIT")])],1)],1)],1)],1)])])])],1)])])},o=[],l=(s("d3b7"),s("2b0e")),r=s("edc2"),i=s("6fea"),c=s("7a2d"),n={name:"MobileRegister",head:{link:[{rel:"canonical",href:"http://158.255.47.199/mobile/register"}]},props:{refCode:{type:String,default:null}},components:{BaseLayout:i["a"],MenuMobile:c["a"]},data:function(){return{params:{bankList:[]},bank:{code:""},isLoading:!1,payload:{username:null,password:null,conPassword:null,email:null,phone:null,accountNo:null,bankCode:null,accountName:null,refferalCode:null},status:"0"}},mounted:function(){this.loadBank(),this.refCode&&(this.payload.ReferralCode=this.refCode)},methods:{loadBank:function(){var t=this;this.changeLoader(!0),this.ApiService.get("param/bank").then((function(a){for(var s=[],e=0;e<a.data.length;e++)"PULSA"!=a.data[e].type&&s.push(a.data[e]);t.params.bankList=s})).finally((function(){t.changeLoader(!1)}))},checkAlphaNumeric:function(t){var a=[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122],s=t.keyCode?t.keyCode:t.which;-1===a.indexOf(s)&&(t.preventDefault(),console.log(t.which))},register:function(){var t=this,a=/^[A-Za-z0-9 ]+$/,s=a.test(this.payload.username);s?(this.changeLoader(!0),this.refCode&&(this.payload.ReferralCode=this.refCode),""==this.payload.email&&(this.payload.email=null),this.ApiService.post("member/register",this.payload).then((function(){l["default"].notify({group:"SuccessMessage",title:"Registrasi Berhasil",text:"Selamat Bergabung bersama Kami",type:"success",closeOnClick:!0,max:1,ignoreDuplicates:!0});var a={username:t.payload.username,password:"".concat(t.payload.password)};t.$store.dispatch(r["u"],a).then((function(){t.$router.push({name:"home"})})),t.clearForm(),t.$router.push({name:"home"})})).catch((function(t){l["default"].notify({group:"ErrorMessage",title:"Kesalahan Terjadi",text:t,type:"error",closeOnClick:!0,max:1,ignoreDuplicates:!0})})).finally((function(){t.changeLoader(!1)}))):l["default"].notify({group:"ErrorMessage",title:"Kesalahan Terjadi",text:"Username tidak boleh menggunakan karakter spesial",type:"error",closeOnClick:!0,max:1,ignoreDuplicates:!0})},clearForm:function(){this.payload.username=null,this.payload.password=null,this.payload.conPassword=null,this.payload.email=null,this.payload.phone=null,this.payload.accountNo=null,this.payload.bankCode=null,this.payload.accountName=null,this.payload.refferalCode=null}}},d=n,m=s("2877"),u=Object(m["a"])(d,e,o,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=mobileregister~f71cff67.45e306bb.js.map