webpackJsonp([12],{aZZ0:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("qI/l"),s=r("KC6+"),l=r("TIfe"),n={components:{},data:function(){return{selectedCommunity:{},community_list:[],user_roles:{admin:"超级管理员",leader:"社区管理员"},user_list:[],user_row:{},userBenefit:0,userForm:{username:"",password:"",role:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入一个密码",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}]},search:"",dialogVisible:!1}},created:function(){var e=this,t=Object(o.c)(),r=Object(l.a)()._id;t.subscribe("leaders.all",r),console.log("leader sub id: "+t.subscribe("leaders.all",r).id),t.ddp.on("added",function(t){t.collection;var r=t.id,o=t.fields;console.log("added"),console.log(o),e.user_list.includes(function(e){e.id})||(o.id=r,e.user_list.push(o))}),t.ddp.on("changed",function(t){t.collection;var r=t.id,o=t.fields;console.log("changed"),console.log(o);var s=e.user_list.findIndex(function(e){return e.id==r});(console.log(s),s>=0)&&(o.id=r,e.user_list[s].profile.benefit=o.profile.benefit)}),t.ddp.on("removed",function(t){t.collection;var r=t.id;console.log("removed"),e.user_list=e.user_list.filter(function(e){return e.id!==r})}),Object(o.d)(r).then(function(t){0===t.code&&(e.community_list=t.list)})},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return Object(s.a)("用户信息填写不合格","error"),!1;t.userForm.platform_id=Object(l.a)()._id,t.userForm.platform_name=Object(l.a)().platform_name,t.userForm.role="leader",t.userForm.community_id=t.selectedCommunity._id,t.userForm.community_name=t.selectedCommunity.community_name,t.userForm.pickups=t.selectedCommunity.pickups,Object(o.a)(t.userForm).then(function(e){0===e.code&&(Object(s.a)("用户添加成功","success"),t.resetForm("userForm"),t.userForm.username=""),-1===e.code&&Object(s.a)("用户添加失败","error")}).catch(function(e){403==e.error&&Object(s.a)("用户名已存在，请换个名字","error")})})},resetForm:function(e){this.$refs[e].resetFields()},handleClick:function(e){this.user_row=e,this.userBenefit=e.profile.benefit,this.dialogVisible=!0},handleUpdate:function(){var e=this;this.user_row.benefit=this.userBenefit,Object(o.f)(this.user_row).then(function(t){0===t.code&&(Object(s.a)("用户修改成功","success"),e.dialogVisible=!1,e.user_row={}),-1===t.code&&Object(s.a)("用户修改失败","error")})},handleDelete:function(e,t){Object(o.e)(t.id).then(function(e){0===e.code&&Object(s.a)("用户删除成功","success"),-1===e.code&&Object(s.a)("用户删除失败","error")})}}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container tab-container"},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:8}},[r("el-form",{ref:"userForm",staticClass:"demo-ruleForm",attrs:{model:e.userForm,rules:e.rules,"label-width":"100px"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"必选",placement:"bottom"}},[r("el-form-item",{attrs:{label:"社区",prop:"community"}},[r("el-select",{attrs:{placeholder:"请选择","value-key":"_id"},model:{value:e.selectedCommunity,callback:function(t){e.selectedCommunity=t},expression:"selectedCommunity"}},e._l(e.community_list,function(e){return r("el-option",{key:e._id,attrs:{label:e.community_name,value:e}})}))],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"用户名",prop:"user_name"}},[r("el-input",{model:{value:e.userForm.username,callback:function(t){e.$set(e.userForm,"username",t)},expression:"userForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{model:{value:e.userForm.password,callback:function(t){e.$set(e.userForm,"password",t)},expression:"userForm.password"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("userForm")}}},[e._v("立即创建")]),e._v(" "),r("el-button",{on:{click:function(t){e.resetForm("userForm")}}},[e._v("重置")])],1)],1)],1),e._v(" "),r("el-col",{attrs:{span:14,offset:2}},[r("el-row",{staticClass:"filter-container",attrs:{gutter:20}},[r("el-col",{attrs:{span:14}},[r("el-input",{attrs:{placeholder:"输入用户名称进行搜索"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e._v(" "),r("el-col",{attrs:{span:10}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"}},[e._v("搜索")])],1)],1),e._v(" "),r("el-row",[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.user_list,stripe:"",border:"","max-height":"500"}},[r("el-table-column",{attrs:{prop:"username",label:"用户名",width:"200"}}),e._v(" "),r("el-table-column",{attrs:{prop:"community_name",label:"所在社区",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\r\n                            "+e._s(t.row.profile.community_name)+"\r\n                        ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"benefit",label:"佣金",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\r\n                            "+e._s(t.row.profile.benefit)+"\r\n                        ")]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini"},on:{click:function(r){e.handleClick(t.row)}}},[e._v("编辑\r\n                            ")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){e.handleDelete(t.$index,t.row)}}},[e._v("删除\r\n                            ")])]}}])})],1)],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"修改用户佣金",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.handleUpdate}},[e._v("确 定")])],1),e._v(" "),r("el-form",{ref:"user_row",staticClass:"demo-ruleForm",attrs:{model:e.user_row,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"user_name"}},[r("el-input",{model:{value:e.user_row.username,callback:function(t){e.$set(e.user_row,"username",t)},expression:"user_row.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"佣金",prop:"user_benefit"}},[r("el-input",{model:{value:e.userBenefit,callback:function(t){e.userBenefit=t},expression:"userBenefit"}})],1)],1)],1)],1)],1)},staticRenderFns:[]},a=r("vSla")(n,i,!1,null,null,null);t.default=a.exports},"qI/l":function(e,t,r){"use strict";t.c=function(){return o.a.getAsteroid()},t.a=function(e){return o.a.getAsteroid().call("leaders.add",e)},t.e=function(e){return o.a.getAsteroid().call("leaders.remove",e)},t.f=function(e){return o.a.getAsteroid().call("leaders.update",e)},t.d=function(e){return o.a.getAsteroid().call("getCommunityList",e)},t.b=function(e){return o.a.getAsteroid().call("cashlogs.add",e)};var o=r("T452")}});