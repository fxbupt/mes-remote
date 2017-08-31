/**
 * fx 20170831 create
 */

$(function() {
  $('.calendar').calendar({
    customDayRenderer : function(element, date) {
      // 双休日用灰框表示，工作日用绿字表示
      if (date.getDay() == 0 || date.getDay() == 6) {
        $(element).css('border', '1px solid grey');
      } else {
        $(element).css('color', 'green');
      }
    },
    // 此选项设置当鼠标移动到某个日期上时执行的动作（此处动作为弹出信息框）
    mouseOnDay : function(e) {
      var content = '';
      // 0->周日 6->周六
      if (e.date.getDay() == 0 || e.date.getDay() == 6) {
        content = '<div><span>班次：</span><span><i>休息日</i></span></div>';
      } else {
        content = '<div><span>班次：</span><span>双班</span></div>';
      }
      console.log(e.element.children().html() + '号');
      console.log('周' + e.date.getDay());
      console.log(e);
      $(e.element).popover({
        trigger : 'manual',
        container : 'body',
        html : true,
        content : content
      });
      $(e.element).popover('show');
    },
    mouseOutDay : function(e) {
      $(e.element).popover('hide');
    }
  });
  // false->不显示每周的编号
  $('.calendar').data('calendar').setDisplayWeekNumber(false);
});
