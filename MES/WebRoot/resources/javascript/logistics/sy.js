/**
 * 
 */
var sy = $.extend({}, sy);/*定义一个全局变量*/

sy.serializeObject = function (form) { /*将form表单内的元素序列化为对象，扩展Jquery的一个方法*/
    var o = {};
    $.each(form.serializeArray(), function (index) {
     
    	if (this['value'] && this['value'].length > 0){
	        if (o[this['name']]) {
	            o[this['name']] = o[this['name']] + "," + this['value'];
	        } else {
	            o[this['name']] = this['value'];
	        }
    	}
    });
    return o;
};

//时间格式化
Date.prototype.format = function (format) {
	if (!format) {
		format = "yyyy-MM-dd HH:mm:ss";
	}
	var o = {
		"M+": this.getMonth() + 1, // month
		"d+": this.getDate(), // day
		"h+": this.getHours(), // hour
		"m+": this.getMinutes(), // minute
		"s+": this.getSeconds(), // second
		"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
		"S": this.getMilliseconds()
		// millisecond
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
function formatDateTime(str) {
	return (new Date(parseInt(str.substring(str.indexOf('(') + 1, str.indexOf(')'))))).format("yyyy-MM-dd hh:mm:ss");
}
function formatDateTime2(dt){
	if (!dt){
		return "";
	}
	return (new Date(dt)).format("yyyy-MM-dd hh:mm:ss");
}

function formatDate2(dt) {
	if(!dt){
		return "";
	}
	return (new Date(dt)).format("yyyy-MM-dd");
}

function formatDate_h2(dt){
	if(!dt){
		return "";
	}
	return (new Date(dt)).format("yyyy-MM-dd hh");
}
function formatDate_hm2(dt){
	if(!dt){
		return "";
	}
	return (new Date(dt)).format("yyyy-MM-dd hh:mm");
}
