/**
 * Created by Jepson on 2018/5/9.
 */


$(function() {

  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $("#form").bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置校验字段
    fields: {
      username: {
        // 校验规则
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度要求 2-6位
          stringLength: {
            min: 2,
            max: 6,
            message: "长度要求2-6位"
          },
          callback: {
            message: "用户名不存在"
          }
        },

      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "长度为6-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });


  /*
  * 2. 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进行提交
  *    表单校验插件有一个特点, 会在表单提交时进行校验
  *    如果校验成功, 就继续提交, 需要手动阻止提交, 通过 ajax 请求提交
  *    如果校验失败, 阻止本次提交
  * */
  $('#form').on("success.form.bv", function( e ) {
    // 阻止默认的表单提交
    e.preventDefault();

    // 使用 ajax 进行提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      data: $('#form').serialize(),
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          alert("登录成功")
        }

        if ( info.error === 1000 ) {
          //alert( "用户名不存在" )
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }

        if ( info.error === 1001 ) {
          // 三个参数
          // 校验字段, 校验状态, 校验规则
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
      }
    })
  });


  /*
  * 3. 重置表单bug解决
  * */
  $('[type="reset"]').click(function() {
    // 让表单重置
    // 除了重置文本, 还要重置校验状态
    $('#form').data("bootstrapValidator").resetForm(true);
  });

})
