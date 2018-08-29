webpackJsonp([2],{"0724":function(t,n,e){var a=e("aXXj");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("8bSs")("c17dbb5e",a,!0)},ARoL:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("4YfN"),r=e.n(a),i=e("9rMa"),o=e("7VF+"),s=e.n(o),l=e("0xDb");e("TW58");var d={props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"350px"},autoResize:{type:Boolean,default:!0},chartData:{type:Object}},data:function(){return{chart:null}},mounted:function(){var t=this;this.initChart(),this.autoResize&&(this.__resizeHanlder=Object(l.a)(function(){t.chart&&t.chart.resize()},100),window.addEventListener("resize",this.__resizeHanlder)),document.getElementsByClassName("sidebar-container")[0].addEventListener("transitionend",this.__resizeHanlder)},beforeDestroy:function(){this.chart&&(this.autoResize&&window.removeEventListener("resize",this.__resizeHanlder),document.getElementsByClassName("sidebar-container")[0].removeEventListener("transitionend",this.__resizeHanlder),this.chart.dispose(),this.chart=null)},watch:{chartData:{deep:!0,handler:function(t){this.setOptions(t)}}},methods:{setOptions:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.expectedData,e=t.actualData;this.chart.setOption({xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],boundaryGap:!1,axisTick:{show:!1}},grid:{left:10,right:10,bottom:20,top:30,containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"},padding:[5,10]},yAxis:{axisTick:{show:!1}},legend:{data:["expected","actual"]},series:[{name:"expected",itemStyle:{normal:{color:"#FF005A",lineStyle:{color:"#FF005A",width:2}}},smooth:!0,type:"line",data:n,animationDuration:2800,animationEasing:"cubicInOut"},{name:"actual",smooth:!0,type:"line",itemStyle:{normal:{color:"#3888fa",lineStyle:{color:"#3888fa",width:2},areaStyle:{color:"#f3f8ff"}}},data:e,animationDuration:2800,animationEasing:"quadraticOut"}]})},initChart:function(){this.chart=s.a.init(this.$el,"macarons"),this.setOptions(this.chartData)}}},c={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{class:this.className,style:{height:this.height,width:this.width}})},staticRenderFns:[]},u=e("vSla")(d,c,!1,null,null,null).exports,p=e("qI/l"),f=(e("KC6+"),e("TIfe")),h=e("6ROu"),m={data:function(){return{user_list:[],visible:!1}},filters:{statusFilter:function(t){return{success:"success",pending:"danger"}[t]}},created:function(){var t=this,n=Object(p.c)(),e=Object(f.a)()._id;n.subscribe("leaders.all",e),console.log("leader sub id: "+n.subscribe("leaders.all",e).id),n.ddp.on("added",function(n){n.collection;var e=n.id,a=n.fields;console.log("added"),console.log(a),t.user_list.includes(function(t){t.id})||(a.id=e,t.user_list.push(a))}),n.ddp.on("changed",function(n){n.collection;var e=n.id,a=n.fields;console.log("changed"),console.log(a);var r=t.user_list.findIndex(function(t){return t.id==e});(console.log(r),r>=0)&&(a.id=e,t.user_list[r].profile.benefit=a.profile.benefit)}),n.ddp.on("removed",function(n){n.collection;var e=n.id;console.log("removed"),t.user_list=t.user_list.filter(function(t){return t.id!==e})})},methods:{handleClick:function(t){console.log(t);var n={logDate:h().format("YYYY-MM-DD"),userID:t.id,username:t.username,platform_id:t.profile.platform_id,platform_name:t.profile.platform_name,community_id:t.profile.community_id,community_name:t.profile.community_name,cashBenefit:t.profile.benefit};Object(p.b)(n).then(function(t){console.log(t)}),this.visible=!1}}},b={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("el-table",{staticStyle:{width:"100%","padding-top":"15px"},attrs:{data:t.user_list,height:"250"}},[e("el-table-column",{attrs:{prop:"username",label:"用户名",width:"150"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n            "+t._s(n.row.username)+"\n        ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"community_name",label:"平台",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n            "+t._s(n.row.profile.platform_name)+"\n        ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"community_name",label:"所在社区",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n            "+t._s(n.row.profile.community_name)+"\n        ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"benefit",label:"佣金",width:"200"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n            "+t._s(n.row.profile.benefit)+"\n        ")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"在月底结算时点击，如果佣金到账，请点击按钮",placement:"top"}},[e("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.handleClick(n.row)}}},[t._v("发放佣金")])],1)]}}])})],1)},staticRenderFns:[]},g=e("vSla")(m,b,!1,null,null,null).exports,v=e("T452");function _(t,n){return v.a.getAsteroid().call("getCashLogs",t,n)}var x=e("6ROu"),y={data:function(){return{log_list:[],date_range:"",filename:"test"}},created:function(){var t=this,n=(v.a.getAsteroid(),Object(f.a)()._id),e=x().format("YYYY-MM-DD"),a=x().month(),r=x().year();_(n,{logDate:{$gte:x([r,a]).format("YYYY-MM-DD"),$lte:e}}).then(function(n){0===n.code&&(t.log_list=n.list)})},methods:{handleDownload:function(){var t=this;Promise.all([e.e(17),e.e(16)]).then(e.bind(null,"zWO4")).then(function(n){var e=t.log_list,a=t.formatJson(["logDate","username","platform_name","community_name","cashBenefit"],e);n.export_json_to_excel({header:["日期","用户名","平台","所在社区","提取佣金"],data:a,filename:t.filename,autoWidth:t.autoWidth})})},formatJson:function(t,n){return n.map(function(n){return t.map(function(t){return"cashBenefit"===t?parseFloat(n[t]):n[t]})})},handleSearch:function(){var t=this,n={logDate:{$gte:this.date_range[0],$lte:this.date_range[1]}};_(Object(f.a)()._id,n).then(function(n){console.log(n.list),t.log_list=n.list})}}},w={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("el-row",{staticClass:"filter-container",attrs:{gutter:20}},[e("el-col",{attrs:{span:8}},[e("div",{staticClass:"block"},[e("span",{staticClass:"demonstration"},[t._v("按日期检索")]),t._v(" "),e("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:t.date_range,callback:function(n){t.date_range=n},expression:"date_range"}})],1)]),t._v(" "),e("el-col",{attrs:{span:1}},[e("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleSearch}},[t._v("检索")])],1),t._v(" "),e("el-col",{attrs:{span:1}},[e("el-button",{staticStyle:{margin:"0 0 20px 20px"},attrs:{type:"primary",icon:"document"},on:{click:t.handleDownload}},[t._v("\n                "+t._s(t.$t("excel.export"))+" excel\n            ")])],1)],1),t._v(" "),e("el-table",{attrs:{data:t.log_list,border:"",height:"250"}},[e("el-table-column",{attrs:{prop:"logDate",label:"日期",width:"150"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n                "+t._s(n.row.logDate)+"\n            ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"username",label:"用户名",width:"150"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n                "+t._s(n.row.username)+"\n            ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"platform_name",label:"平台",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n                "+t._s(n.row.platform_name)+"\n            ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"community_name",label:"所在社区",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n                "+t._s(n.row.community_name)+"\n            ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"cashBenefit",label:"提取佣金",width:"200"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n                "+t._s(n.row.cashBenefit)+"\n            ")]}}])})],1)],1)},staticRenderFns:[]},k={newVisitis:{expectedData:[100,120,161,134,105,160,165],actualData:[120,82,91,154,162,140,145]},messages:{expectedData:[200,192,120,144,160,130,140],actualData:[180,160,151,106,145,150,130]},purchases:{expectedData:[80,100,121,104,105,90,100],actualData:[120,90,100,138,142,130,130]},shoppings:{expectedData:[130,140,141,142,145,150,160],actualData:[120,82,91,154,162,140,130]}},S={name:"dashboard-admin",components:{LineChart:u,TransactionTable:g,BenefitTable:e("vSla")(y,w,!1,null,null,null).exports},data:function(){return{lineChartData:k.newVisitis}},methods:{handleSetLineChartData:function(t){this.lineChartData=k[t]}}},D={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"dashboard-editor-container"},[n("el-row",{staticStyle:{background:"#fff",padding:"16px 16px 0","margin-bottom":"32px"}},[n("line-chart",{attrs:{"chart-data":this.lineChartData}})],1),this._v(" "),n("el-row",{staticStyle:{background:"#fff",padding:"16px 16px 0","margin-bottom":"32px"}},[n("transaction-table")],1),this._v(" "),n("el-row",{staticStyle:{background:"#fff",padding:"16px 16px 0","margin-bottom":"32px"}},[n("benefit-table")],1)],1)},staticRenderFns:[]};var C=e("vSla")(S,D,!1,function(t){e("ixib")},"data-v-2835041b",null).exports,O={name:"PanThumb",props:{image:{type:String,required:!0},zIndex:{type:Number,default:1},width:{type:String,default:"150px"},height:{type:String,default:"150px"}}},z={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"pan-item",style:{zIndex:this.zIndex,height:this.height,width:this.width}},[n("div",{staticClass:"pan-info"},[n("div",{staticClass:"pan-info-roles-container"},[this._t("default")],2)]),this._v(" "),n("img",{staticClass:"pan-thumb",attrs:{src:this.image}})])},staticRenderFns:[]};var F={name:"dashboard-editor",components:{PanThumb:e("vSla")(O,z,!1,function(t){e("FoeH")},"data-v-7f618764",null).exports},data:function(){return{emptyGif:"https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"}},computed:r()({},Object(i.b)(["name","avatar","roles"]))},R={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"dashboard-editor-container"},[e("div",{staticClass:" clearfix"},[e("pan-thumb",{staticStyle:{float:"left"},attrs:{image:t.avatar}},[t._v(" Your roles:\n      "),t._l(t.roles,function(n){return e("span",{key:n,staticClass:"pan-info-roles"},[t._v(t._s(n))])})],2),t._v(" "),e("div",{staticClass:"info-container"},[e("span",{staticClass:"display_name"},[t._v(t._s(t.name))]),t._v(" "),e("span",{staticStyle:{"font-size":"20px","padding-top":"20px",display:"inline-block"}},[t._v("editor : dashboard")])])],1),t._v(" "),e("div",[e("img",{staticClass:"emptyGif",attrs:{src:t.emptyGif}})])])},staticRenderFns:[]};var T={name:"dashboard",components:{adminDashboard:C,editorDashboard:e("vSla")(F,R,!1,function(t){e("0724")},"data-v-790692c0",null).exports},data:function(){return{currentRole:"adminDashboard"}},computed:r()({},Object(i.b)(["roles"])),created:function(){this.roles.includes("admin")||(this.currentRole="editorDashboard")}},A={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"dashboard-container"},[n(this.currentRole,{tag:"component"})],1)},staticRenderFns:[]},E=e("vSla")(T,A,!1,null,null,null);n.default=E.exports},FoeH:function(t,n,e){var a=e("Xi+I");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("8bSs")("071b1dd4",a,!0)},"Xi+I":function(t,n,e){(t.exports=e("BkJT")(!1)).push([t.i,"\n.pan-item[data-v-7f618764] {\r\n  width: 200px;\r\n  height: 200px;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n  position: relative;\r\n  cursor: default;\r\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r\n          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.pan-info-roles-container[data-v-7f618764] {\r\n  padding: 20px;\r\n  text-align: center;\n}\n.pan-thumb[data-v-7f618764] {\r\n  width: 100%;\r\n  height: 100%;\r\n  background-size: 100%;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  position: absolute;\r\n  -webkit-transform-origin: 95% 40%;\r\n          transform-origin: 95% 40%;\r\n  -webkit-transition: all 0.3s ease-in-out;\r\n  transition: all 0.3s ease-in-out;\n}\n.pan-thumb[data-v-7f618764]:after {\r\n  content: '';\r\n  width: 8px;\r\n  height: 8px;\r\n  position: absolute;\r\n  border-radius: 50%;\r\n  top: 40%;\r\n  left: 95%;\r\n  margin: -4px 0 0 -4px;\r\n  background: radial-gradient(ellipse at center, rgba(14, 14, 14, 1) 0%, rgba(125, 126, 125, 1) 100%);\r\n  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);\r\n          box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);\n}\n.pan-info[data-v-7f618764] {\r\n  position: absolute;\r\n  width: inherit;\r\n  height: inherit;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  -webkit-box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);\r\n          box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);\n}\n.pan-info h3[data-v-7f618764] {\r\n  color: #fff;\r\n  text-transform: uppercase;\r\n  position: relative;\r\n  letter-spacing: 2px;\r\n  font-size: 18px;\r\n  margin: 0 60px;\r\n  padding: 22px 0 0 0;\r\n  height: 85px;\r\n  font-family: 'Open Sans', Arial, sans-serif;\r\n  text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);\n}\n.pan-info p[data-v-7f618764] {\r\n  color: #fff;\r\n  padding: 10px 5px;\r\n  font-style: italic;\r\n  margin: 0 30px;\r\n  font-size: 12px;\r\n  border-top: 1px solid rgba(255, 255, 255, 0.5);\n}\n.pan-info p a[data-v-7f618764] {\r\n  display: block;\r\n  color: #333;\r\n  width: 80px;\r\n  height: 80px;\r\n  background: rgba(255, 255, 255, 0.3);\r\n  border-radius: 50%;\r\n  color: #fff;\r\n  font-style: normal;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n  font-size: 9px;\r\n  letter-spacing: 1px;\r\n  padding-top: 24px;\r\n  margin: 7px auto 0;\r\n  font-family: 'Open Sans', Arial, sans-serif;\r\n  opacity: 0;\r\n  -webkit-transition: opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s, -webkit-transform 0.3s ease-in-out 0.2s;\r\n  transition: opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s, -webkit-transform 0.3s ease-in-out 0.2s;\r\n  transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;\r\n  transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s, -webkit-transform 0.3s ease-in-out 0.2s;\r\n  -webkit-transform: translateX(60px) rotate(90deg);\r\n          transform: translateX(60px) rotate(90deg);\n}\n.pan-info p a[data-v-7f618764]:hover {\r\n  background: rgba(255, 255, 255, 0.5);\n}\n.pan-item:hover .pan-thumb[data-v-7f618764] {\r\n  -webkit-transform: rotate(-110deg);\r\n          transform: rotate(-110deg);\n}\n.pan-item:hover .pan-info p a[data-v-7f618764] {\r\n  opacity: 1;\r\n  -webkit-transform: translateX(0px) rotate(0deg);\r\n          transform: translateX(0px) rotate(0deg);\n}\r\n",""])},aXXj:function(t,n,e){(t.exports=e("BkJT")(!1)).push([t.i,"\n.emptyGif[data-v-790692c0] {\n  display: block;\n  width: 45%;\n  margin: 0 auto;\n}\n.dashboard-editor-container[data-v-790692c0] {\n  background-color: #e3e3e3;\n  min-height: 100vh;\n  padding: 50px 60px 0px;\n}\n.dashboard-editor-container .pan-info-roles[data-v-790692c0] {\n    font-size: 12px;\n    font-weight: 700;\n    color: #333;\n    display: block;\n}\n.dashboard-editor-container .info-container[data-v-790692c0] {\n    position: relative;\n    margin-left: 190px;\n    height: 150px;\n    line-height: 200px;\n}\n.dashboard-editor-container .info-container .display_name[data-v-790692c0] {\n      font-size: 48px;\n      line-height: 48px;\n      color: #212121;\n      position: absolute;\n      top: 25px;\n}\n",""])},"i+vO":function(t,n,e){(t.exports=e("BkJT")(!1)).push([t.i,"\n.dashboard-editor-container[data-v-2835041b] {\n  padding: 32px;\n  background-color: #f0f2f5;\n}\n.dashboard-editor-container .chart-wrapper[data-v-2835041b] {\n    background: #fff;\n    padding: 16px 16px 0;\n    margin-bottom: 32px;\n}\n",""])},ixib:function(t,n,e){var a=e("i+vO");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("8bSs")("45e2a522",a,!0)},"qI/l":function(t,n,e){"use strict";n.c=function(){return a.a.getAsteroid()},n.a=function(t){return a.a.getAsteroid().call("leaders.add",t)},n.e=function(t){return a.a.getAsteroid().call("leaders.remove",t)},n.f=function(t){return a.a.getAsteroid().call("leaders.update",t)},n.d=function(t){return a.a.getAsteroid().call("getCommunityList",t)},n.b=function(t){return a.a.getAsteroid().call("cashlogs.add",t)};var a=e("T452")}});