/**
 * 公司管理
 */
/**
 * 表格数据定义
 */
var company_table = [
   {name:'name',alias:'公司名称',sort:true,column:true},
   {name:'address',alias:'公司地址',sort:true,column:true},
   {name:'parent',alias:'上级公司',sort:true,column:true},
   {name:'contact',alias:'联系人',sort:true,column:true},
   {name:'phone',alias:'联系人电话',sort:true,column:true},
   {name:'officecall',alias:'办公室电话',sort:true,column:true},
   {name:'fax',alias:'传真',sort:true,column:true},
   {name:'mail',alias:'邮箱',sort:true,column:true},
   {name:'no',alias:'编号'}
];
var company_business = "business";
var company_option = {
  grid:{
	  manual:true, // true表示手动创建
	  id:'company_grid', // 表格的div对应的id
	  idField:'no', // 主键
	  layout:{
		  width:[200,260,100,80,80,80,80,80,100],
		  op:{show:true,field:'no',handler:"onClickCompanyRowOperator"}
	  }
  },
  action:{
	  query:'/companyController.do?select',
	  add:'/companyController.do?add',
	  edit:'/companyController.do?edit',
	  del:'/companyController.do?delete',
	  detail:'/companyController.do?detail'
  },
  authorize:[
     {name:'COMPANY_ADD',icon:'icon-add',text:'新增',type:'add'},
     {name:'COMPANY_EDIT',icon:'icon-edit',text:'修改',type:'edit',op:true},
     {name:'COMPANY_DEL',icon:'icon-remove',text:'删除',type:'del',op:true}
  ],
  add:{
	  url:'company_save.html',form:"company_form",width:300,height:240
  },
  edit:{
	  url:'company_save.html',form:"company_form",width:300,height:240
  },
  detail:{
	  root:'company' // 定义查询明细时，对象的名称
  }
};
var company_grid = null;
$(function(){
	$("#a_company_search_do").click(function(){ searchCompany();});
	$("#a_company_search_clear").click(function(){clearCompanySearch();});
	company_grid = new lg_grid(company_business, company_table, company_option);
	company_grid.init();
});
function onClickCompanyRowOperator(i, id, index){
	company_grid.onClickOperator(i, id, index);
}
function clearCompanySearch(){
	$("#searchCompanyForm").find("input").val("");//找到form表单下的所有input标签并清空
	company_grid.search({});
}
function searchCompany(){
	var param = sy.serializeObject($("#searchCompanyForm").form());
	company_grid.search(param);
}