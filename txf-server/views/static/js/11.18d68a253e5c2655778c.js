webpackJsonp([11],{"0AuE":function(t,e,o){(t.exports=o("BkJT")(!1)).push([t.i,"\n.el-tag + .el-tag {\r\n  margin-left: 10px;\n}\r\n",""])},WqN3:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("ZLEe"),n=o.n(i),r=o("T452");var c=o("KC6+"),l=o("TIfe"),m={components:{},data:function(){return{community_list:[],community_row:{},pickup:"",communityForm:{community_name:"",province:"",city:"",description:"",pickups:[]},rules:{community_name:[{required:!0,message:"请输入社区名称",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],province:[{required:!0,message:"请输入省份",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],description:[{required:!0,message:"请填写社区介绍",trigger:"blur"}],city:[{required:!0,message:"请输入城市",trigger:"blur"}]},search:"",dialogVisible:!1}},created:function(){var t=this,e=r.a.getAsteroid(),o=Object(l.a)()._id;e.subscribe("communitis.all",o),console.log("sub id: "+e.subscribe("communitis.all",o).id),e.ddp.on("added",function(e){e.collection;var o=e.id,i=e.fields;console.log("added"),console.log(i),t.community_list.includes(function(t){t.id})||(i.id=o,t.community_list.push(i))}),e.ddp.on("changed",function(e){e.collection;var o=e.id,i=e.fields;console.log("changed"),console.log(i);var r=t.community_list.findIndex(function(t){return t.id==o});if(console.log(r),r>=0){i.id=o;var c=t.community_list[r];for(var l in n()(i))c[""+l]=i[""+l]}}),e.ddp.on("removed",function(e){e.collection;var o=e.id;console.log("removed"),t.community_list=t.community_list.filter(function(t){return t.id!==o})})},methods:{addPickup:function(){""!=this.pickup&&(this.communityForm.pickups.push(this.pickup),this.pickup="")},handleClose:function(t){this.communityForm.pickups.splice(this.communityForm.pickups.indexOf(t),1)},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return Object(c.a)("社区信息填写不合格","error"),!1;var o;e.communityForm.platform_id=Object(l.a)()._id,(o=e.communityForm,r.a.getAsteroid().call("communities.add",o)).then(function(t){0===t.code&&(Object(c.a)("社区添加成功","success"),e.resetForm("communityForm"),e.communityForm.pickups=[]),-1===t.code&&Object(c.a)("社区添加失败","error")})})},resetForm:function(t){this.$refs[t].resetFields()},handleClick:function(t){this.community_row=t,this.dialogVisible=!0},handleUpdate:function(){var t,e=this;(t=this.community_row,r.a.getAsteroid().call("communities.update",t)).then(function(t){0===t.code&&(Object(c.a)("社区修改成功","success"),e.community_row={},e.dialogVisible=!1),-1===t.code&&Object(c.a)("社区修改失败","error")})},handleDelete:function(t,e){(function(t){return r.a.getAsteroid().call("communities.remove",t)})(e.id).then(function(t){0===t.code&&Object(c.a)("社区删除成功","success"),-1===t.code&&Object(c.a)("社区删除失败","error")})}}},s={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container tab-container"},[o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:8}},[o("el-form",{ref:"communityForm",staticClass:"demo-ruleForm",attrs:{model:t.communityForm,rules:t.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"社区名称",prop:"community_name"}},[o("el-input",{model:{value:t.communityForm.community_name,callback:function(e){t.$set(t.communityForm,"community_name",e)},expression:"communityForm.community_name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"省份",prop:"province"}},[o("el-input",{model:{value:t.communityForm.province,callback:function(e){t.$set(t.communityForm,"province",e)},expression:"communityForm.province"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"城市",prop:"city"}},[o("el-input",{model:{value:t.communityForm.city,callback:function(e){t.$set(t.communityForm,"city",e)},expression:"communityForm.city"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"社区介绍",prop:"description"}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.communityForm.description,callback:function(e){t.$set(t.communityForm,"description",e)},expression:"communityForm.description"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"添加自提点"}},[o("el-row",[o("el-col",{attrs:{span:12}},[o("el-input",{model:{value:t.pickup,callback:function(e){t.pickup=e},expression:"pickup"}})],1),t._v(" "),o("el-col",{attrs:{span:8,offset:4}},[o("el-button",{attrs:{type:"primary",icon:"el-icon-plus",circle:""},on:{click:t.addPickup}})],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"自提点",prop:"description"}},t._l(t.communityForm.pickups,function(e){return o("el-tag",{key:e,attrs:{closable:"",type:"warning"},on:{close:function(o){t.handleClose(e)}}},[t._v("\r\n                        "+t._s(e)+"\r\n                    ")])})),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("communityForm")}}},[t._v("立即创建")]),t._v(" "),o("el-button",{on:{click:function(e){t.resetForm("communityForm")}}},[t._v("重置")])],1)],1)],1),t._v(" "),o("el-col",{attrs:{span:14,offset:2}},[o("el-row",{staticClass:"filter-container",attrs:{gutter:20}},[o("el-col",{attrs:{span:14}},[o("el-input",{attrs:{placeholder:"输入社区名称进行搜索"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),o("el-col",{attrs:{span:10}},[o("el-button",{attrs:{type:"primary",icon:"el-icon-search"}},[t._v("搜索")])],1)],1),t._v(" "),o("el-row",[o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.community_list,stripe:"",border:"","max-height":"500"}},[o("el-table-column",{attrs:{fixed:"",prop:"community_name",label:"社区名称",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\r\n                            "+t._s(e.row.community_name)+"\r\n                        ")]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"province",label:"省份",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\r\n                            "+t._s(e.row.province)+"\r\n                        ")]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"city",label:"城市",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\r\n                            "+t._s(e.row.city)+"\r\n                        ")]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"description",label:"社区介绍",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\r\n                            "+t._s(e.row.description)+"\r\n                        ")]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini"},on:{click:function(o){t.handleClick(e.row)}}},[t._v("编辑\r\n                            ")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){t.handleDelete(e.$index,e.row)}}},[t._v("删除\r\n                            ")])]}}])})],1)],1)],1),t._v(" "),o("el-dialog",{attrs:{title:"修改社区",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.handleUpdate}},[t._v("确 定")])],1),t._v(" "),o("el-form",{ref:"community_row",staticClass:"demo-ruleForm",attrs:{model:t.community_row,rules:t.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"社区名称",prop:"community_name"}},[o("el-input",{model:{value:t.community_row.community_name,callback:function(e){t.$set(t.community_row,"community_name",e)},expression:"community_row.community_name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"省份",prop:"province"}},[o("el-input",{model:{value:t.community_row.province,callback:function(e){t.$set(t.community_row,"province",e)},expression:"community_row.province"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"城市",prop:"city"}},[o("el-input",{model:{value:t.community_row.city,callback:function(e){t.$set(t.community_row,"city",e)},expression:"community_row.city"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"社区介绍",prop:"description"}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.community_row.description,callback:function(e){t.$set(t.community_row,"description",e)},expression:"community_row.description"}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var a=o("vSla")(m,s,!1,function(t){o("j/xM")},null,null);e.default=a.exports},"j/xM":function(t,e,o){var i=o("0AuE");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("8bSs")("3daa0c68",i,!0)}});