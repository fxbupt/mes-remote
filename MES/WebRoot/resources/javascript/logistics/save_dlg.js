/**
 * 新增修改对话框
 * business：业务名称，英文
 * title：动作标题
 * table：字段数组
 * type：请求类型，add或者edit
 */

var lg_save_dialog = function(business, title, type, table, option, after){
	var _self = this;
	var _div = null;
	this._dlg = null;
	this._obj_id;
	this._obj_index;
	
 
	this.onOpen = function(){
		var ajax = option[type].ajax && true; // 默认为true
		 if (_self._obj_id && ajax){
			// 查询该对象
			var param = {};
			param[option.grid.idField] = _self._obj_id;
			$.ajax({
				url:option.action.detail,
				data:param,
				type:"POST",
				dataType:'json',  		       
		        error: function(){   
		            $.messager.alert('提示',"查询明细失败!!");   
		        },
		        success: function(data){
		            if(data.message=="success"){
		            	// 更新信息到输入框
		            	$("#" + option[type].form).form("load", data[option.detail.root]);
		            	$("#" + option[type].form + " select").trigger("change");
		            }else if(data.message=="session timeout"){
		        	    window.parent.location.href='/views/login.jsp';
		        	}else{
		        		$.messager.alert("失败", "查询明细失败");
		            }
		        }
			});
	 	}
	};
	this.onCommit = function(){
		var form = $("#" + option[type].form);
		var isvalid = form.form('validate');
		if (!isvalid){
			return;
		}
		var param = sy.serializeObject(form.form());
		var fnvalid = option[type].validate;
 
		if (fnvalid){
			if (!fnvalid(form,param)){
				return;
			}
		}
 
		var url = option.action[type];
		var submit = option[type].submit;
		if (submit && submit == "form"){
			form.form("submit",{
				url: url,
				success:function(data){
					ret = eval("(" + data + ")");
					if (ret.message == "success"){
						// 成功了
						alert(title + "成功");
						_self._dlg.dialog("close");
						if (after){
							after(param, ret, _self._obj_index);
						}
					}else if(ret.message == "session timeout"){
						// session超时 
						_self._dlg.dialog("close");
						window.parent.location.href = '/views/login.jsp';
					}else{
						$.messager.alert("失败", title + "失败");
					}
				},
				error: function(){
					$.messager.alert("错误", title + "失败");
				}
			});
		}else{
			$.ajax({
				url: url,
				data:param,
				type:"post",
				dataType:"json",
				success:function(data){
					if (data.message == "success"){
						// 成功了
						alert(title + "成功");
						_self._dlg.dialog("close");
						if (after){
							after(param, data, _self._obj_index);
						}
					}else if(data.message == "session timeout"){
						// session超时 
						_self._dlg.dialog("close");
						window.parent.location.href = '/views/login.jsp';
					}else{
						$.messager.alert("失败", title + "失败");
					}
				},
				error: function(){
					$.messager.alert("错误", title + "失败");
				}
			});
		}
	};
	/**
	 * 打开对话框
	 */
	this.open = function(id, index, exparam){
		_self._obj_id = id;
		_self._obj_index = index;
		var height = option[type].height;
		if ($(document).height() < height){
			height = $(document).height();
		}
		var width = option[type].width;
		if ($(document).width() < width){
			width = $(document).width();
		}
		var ref = option[type].url;
		if (id){
			if (ref.indexOf("?") > -1){
				ref += "&";
			}else{
				ref += "?"
			}
			var k = option[type].key || option.grid.idField;
			ref += k + "=" + id;
		}
		if (exparam){
			if (ref.indexOf("?") > -1){
				ref += "&";
			}else{
				ref += "?"
			}
			ref += exparam;
		}
		_self._div = document.createElement("div");
		_self._div.id = business + "_save_dialog";
		document.body.appendChild(_self._div);
		_self._dlg = $("#" + _self._div.id);
		_self._dlg.dialog({
			title: title,
			resizable: true,
			width:width,
			height:height,
			modal: true,
			href: ref,
			buttons: [
			    { 
					text: '提交', 
					iconCls: 'icon-ok', 
					handler: _self.onCommit
				},
				{ 
					text: '取消', 
					handler: function() { 
						_self._dlg.dialog('close'); 
					} 
				}
			],
			onClose: function(){
				// 关闭
				document.getElementById(option[type].form).reset();
				$("#" + option[type].form + " select").trigger("change");
				$(_self._div).remove();
			},
			onOpen: _self.onOpen
		});
	};
	
	/*赋权操作
	*/
	this.tipopen = function(id, index, param){
		 //option[type].url;
		 openRightsWindow(id);
	};
};
