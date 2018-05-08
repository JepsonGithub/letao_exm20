// 配置关闭小圆环
NProgress.configure({ showSpinner: false });





/*
* ajax 全局函数
* (1) ajaxComplete  每次 ajax 完成时调用, 不管成功还是失败
* (2) ajaxError  每次 ajax 失败时调用
* (3) ajaxSend   每次 ajax 提交时调用
* (4) ajaxStart  ajax 开始时调用
* (5) ajaxStop   ajax 停止时调用
* (6) ajaxSuccess ajax 成功时调用
* */
$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
});
$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done();
  }, 500);
});





