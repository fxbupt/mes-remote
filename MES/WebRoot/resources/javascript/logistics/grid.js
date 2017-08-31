/**
 * 表格模板
 * business：业务名称，英文
 * table：业务表格字段说明，格式如下：
 * [
 *   {name:'id',alias:'主键',sort:true,formatter:function},
 *   {...}
 * ]
 * option：配置项，格式如下：
 * {
 * grid:{id:'',layout:{width:[100,160,100,80,80,80,80,80,100],
 * 	op:{show:true,field:'no',handler:function}}),
 * add:{url:'xxx.html'},
 * edit:{url:'xxx.html'},
 * authorize:[{name:'COMPANY_ADD',icon:'icon-add',text:'新增',type:'add',op:true,handler:function},COMPANY_EDIT,COMPANY_DEL],
 * action:{query:'',add:'',edit:'',del:''}
 * }
 *   grid：表格的配置，id为表格的id,layout为布局，width为表格的字段宽度
 *   add：新增界面
 *   edit：修改界面
 *   authorize：权限
 *   action：定义具体功能的接口地址
 */
var lg_grid = function(business, table, option){
	var _self = this;
	this._grid = null;
	this._exparam = null; // 扩展参数
	
	this.exparam = function(){
		return this._exparam;
	}
	/**
	 * 获取当前选中的行内容
	 */
	this.selections = function(){
		return _self._grid.datagrid('getSelections');
	}
	/**
	 * 获取行的索引
	 */
	this.rowIndex = function(row){
		return _self._grid.datagrid('getRowIndex', row[0][option.grid.idField]);
	}
	this.pk = function(row){
		return row[0][option.grid.idField];
	}
	
	this.search = function(param){
		_self._grid.datagrid("load", param);
	};
	/**
	 * 新增记录成功
	 */
	this.onNewBusinessSuccess = function(param, data, index){
		_self._grid.datagrid('appendRow', data[option.detail.root]);
	};
	/**
	 * 修改记录成功
	 */
	this.onEditBusinessSuccess = function(param, data, index){
		var dat = param;
		if (option.detail && option.detail.root && data[option.detail.root]){
			dat = data[option.detail.root];
		}
		_self._grid.datagrid('updateRow',{index:index,row:dat});
	};
	
	this.updateRow = function(param, data, index){
		_self._grid.datagrid('updateRow',{index:index,row:param});
	};
	this.appendRow = function(param, data, index){
		_self._grid.datagrid('appendRow', data[option.detail.root]);
	};
	
	/**
	 * 工具条的新增业务按钮功能
	 */
	this._onNewBusiness = function(){		
		var title = $(this).text();
		var dialog = new lg_save_dialog(business, title, "add", table, option, _self.onNewBusinessSuccess);
		dialog.open(null,null,_self._exparam);
	};
	/**
	 * 查询按钮：显示隐藏查询条件
	 */
	this._onToggleQueryForm = function(){
		var qry = $("#" + option.id + "_queryTable");
		qry.toggle();
	};
	/**
	 * 工具条上的修改业务按钮功能
	 */
	this._onEditBusiness = function(){
		var title = $(this).text();
		var row = _self._grid.datagrid('getSelections');
		if(row == null || row.length < 1){
		    $.messager.alert('提示','请选择需要修改的记录');
		}else{
			// 弹出该业务的对话框
			var rowindex = _self._grid.datagrid('getRowIndex', row[0][option.grid.idField]);
			_self._onRowEditBusiness(row[0][option.grid.idField], rowindex, title);
		}
	};
	
 
	
	this._onTipBusiness = function(){
		var row = _self._grid.datagrid('getSelections');
		if(row == null || row.length < 1){
		    $.messager.alert('提示','请选择需要赋权的记录');
		}else{
			// 弹出该业务的对话框
			var rowindex = _self._grid.datagrid('getRowIndex', row[0][option.grid.idField]);
			_self._onRowTipBusiness(row[0][option.grid.idField], rowindex);
		}
	};
	
	
	/**
	 * 工具条上的删除业务按钮功能
	 */
	this._onDelBusiness = function(){
		var row = _self._grid.datagrid('getSelections');
		if(row == null || row.length < 1){
		    $.messager.alert('提示','请选择需要删除的记录');
		}else{
			var rowindex = _self._grid.datagrid('getRowIndex', row[0][option.grid.idField]);
			_self._onRowDelBusiness(row[0][option.grid.idField], rowindex);
		}
	};
	/**
	 * 行操作上的删除功能
	 */
	this._onRowDelBusiness = function(id, index){
		if(confirm("确认删除该条信息?")){
			var param = {};
			param[option.grid.idField] = id;
			$.ajax({        
		        url:option.action.del,               
				//异步传递参数给服务器	
		        data:param,
				type:"POST",
				//预期服务器返回的数据类型  				
		        dataType:'json',  		       
		        error: function(){   
		            $.messager.alert('提示',"删除记录失败!!");   
		        },
		        success: function(data){
		            if(data.message=="success"){
		            	_self._grid.datagrid("deleteRow", index);
		            	alert("删除记录成功");
		            }else if(data.message=="session timeout"){
	            	    window.parent.location.href='/views/login.jsp';
	            	}else{
	            		$.messager.alert("失败", "删除记录失败");
		            }
		        }
		    });
		}
	};
	/**
	 * 在每行的操作列中进行的修改操作
	 */
	this._onRowEditBusiness = function(id, index, title){
		var dialog = new lg_save_dialog(business, title, "edit", table, option, _self.onEditBusinessSuccess);
		dialog.open(id, index, _self._exparam);
	};
	
		this._onRowTipBusiness= function(id, index){
		var dialog = new lg_save_dialog(business, "赋权", "tip", table, option, _self.onTipBusinessSuccess);
		dialog.tipopen(id, index, _self._exparam);
	};
	
	/**
	 * 打开对象对话框
	 */
	this.openObjectDialog = function(id, index, title, type, handler){
		var fn = handler || _self.updateRow;
		var dialog = new lg_save_dialog(business, title, type, table, option, fn);
		dialog.open(id, index, _self._exparam);
	}
	
	this.onClickOperator = function(i, id, index,title){
		var authorize = option.authorize[i];
		var handler = authorize.handlerRow;
		if (!handler){
			if (authorize.type == "edit"){
				// 这是编辑（修改）按钮
				handler = _self._onRowEditBusiness;
				if (title == null){
					title = "修改";
				}
			}else if (authorize.type == "del"){
				// 这是删除按钮
				handler = _self._onRowDelBusiness;
				if (title == null){
					title = "删除";
				}
			}
		}
		if (handler){
			handler(id, index,title);
		}
	};
	this.formatter_date = function(val,row,index){
		return formatDate2(val);
	};
	this.formatter_date_hh = function(val,row,index){
		return formatDate_h2(val);
	};
	this.formatter_date_hhmm = function(val,row,index){
		return formatDate_hm2(val);
	}
	this.formatter_datetime = function(val,row,index){
		return formatDateTime2(val);
	}
	this._formatter = {"formatter_date":_self.formatter_date,
			"formatter_datetime":_self.formatter_datetime,
			"formatter_date_hh":_self.formatter_date_hh,
			"formatter_date_hhmm":_self.formatter_date_hhmm};
	this.make_operator = function(val,row,index){
		var op = "";
		if (option.authorize){
			for (var i = 0; i < option.authorize.length; ++ i){
				var authorize = option.authorize[i];
				var f = $("#authority_" + authorize.name);
				if (authorize.op && f && f.length > 0){
					if (op.length > 0){
						op = op + '&nbsp;';
					}
					var k = authorize.key;
					if (k == null){
						k = option.grid.idField;
					}
					op = op + '<a href="#" onclick="' + option.grid.layout.op.handler + '(' + i +
						',\'' + row[k] + '\',' + index + ',\'' + authorize.text + '\');return false;"'
					+'>' + 
							authorize.text + '</a>';
				}
			}
		}
		return op;
	};
	var make_columns = function(){
		var columns = [];
		var icol = 0;
		for (var i = 0; i < table.length; ++ i){
			var col = table[i];
			if (col.column){
				var formatter = col.formatter;
				if (typeof formatter != "function"){
					formatter = _self._formatter[formatter];
				}
				var column = {field:col.name,title:col.alias,sortable:col.sort,formatter:formatter};
				if (option.grid.layout.width && option.grid.layout.width.length > icol){
					column.width = option.grid.layout.width[icol];
				}
				if (col.hidden){
					column.hidden = true;
				}
				columns.push(column);
				++ icol;
			}
		}
		if (option.grid.layout.op.show){
			columns.push({field:option.grid.layout.op.field,title:'操作',formatter:_self.make_operator});
		}
		return [columns];
	};
	var make_toolbar = function(){
		var grid_tb = [];
		grid_tb.push({text:"查询",handler:_self._onToggleQueryForm});
		if (option.authorize){
			for (var i = 0; i < option.authorize.length; ++ i){
				var authorize = option.authorize[i];
				var f = $("#authority_" + authorize.name);
				if (f && f.length > 0){
					// 拥有权限
					if (grid_tb.length > 0){
						grid_tb.push("-");
					}
					var handler = authorize.handler;
					if (!handler){
						if (authorize.type == "add"){
							// 这是新增按钮
							handler = _self._onNewBusiness;
						}else if (authorize.type == "edit"){
							// 这是编辑（修改）按钮
							handler = _self._onEditBusiness;
						}else if (authorize.type == "del"){
							// 这是删除按钮
							handler = _self._onDelBusiness;
						}else if (authorize.type == "tip"){
							// 这是赋权按钮
							handler = _self._onTipBusiness;
						}
					}
					grid_tb.push({iconCls:authorize.icon,text:authorize.text,handler:handler});
				}
			}
		}
		if (grid_tb.length == 0){
			grid_tb = null;
		}
		return grid_tb;
	};
	/**
	 * 初始化业务界面
	 */
	this.init = function(){
		var param = sy.serializeObject($("#" + option.id + "SearchForm").form());
		var tb = make_toolbar();
		var columns = null;
		if (option.grid.manual){
			columns = make_columns();
		}
		this._grid = $("#" + option.grid.id);
		var extend = $(this._grid)[0].getAttribute("extend");
		var url = option.action.query;
		if (extend){
			url = url + "&" + extend;
			this._exparam = extend;
		}
		this._grid.datagrid({
			remoteSort: false,
			pagination:true,//分页控件
			rownumbers:true,//行号
			queryParams:param, // 查询参数
			selectOnCheck:false,// 点击复选框不会选择该行
			url:url, // 查询地址
			columns: columns,
			idField:option.grid.idField,
			toolbar: tb,
			loadFilter: function(data){
	        	if(data.message=="session timeout"){
	        		alert("session timeout!");
	        	    window.parent.location.href='/views/login.jsp';
	        	    return null;
	        	}else{
	        		return data;
	        	}
	        }
		});
	};
};
