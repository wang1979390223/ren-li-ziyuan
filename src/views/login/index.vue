<template>
  <div class="login-container">
    <div class="box">
      <img class="logo-png" src="@/assets/common/logo.png" alt="">
      <div class="login-2">
        <el-form
          auto-complete="on"
          label-position="left"
          :rules="rules"
          :model="loginForm"
        >
          <div class="title-container">
            <h3 class="title">
              <!-- <img src="@/assets/common/login-logo.png" alt=""> -->
            </h3>
          </div>
          <el-form-item prop="mobile">
            <span
              class="svg-container el-icon-mobile-phone"
            />
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <!-- <span class="svg-container el-icon-user-solid" /> -->
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" />
            <span class="svg-container" @click="showPwd">
              <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
            </span>
            <!-- <span class="svg-container el-icon-user-solid" /> -->
          </el-form-item>
          <el-form-item>
            <!-- <span
              class="svg-container el-icon-mobile-phone"
            /> -->
            <!-- <el-input placeholder="请输入验证码" type="" /> -->
            <el-row :gutter="20">
              <el-col :span="16" el-icon-mobile-phone>
                <div class="grid-content bg-purple">
                  <span
                    class="svg-container el-icon-mobile-phone"
                  />
                  <el-input v-model="loginForm.verification" placeholder="请输入验证码" type="" />
                </div>
              </el-col>
              <el-col pl :span="8"><div class="grid-content bg-purple" @click="changeimg">
                <img :src="imgurl" alt="">
              </div></el-col>
            </el-row>

          </el-form-item>

          <el-button :loading="loading" class="loginBtn" @click="login">登录</el-button>
          <div class="tips">
            <!-- <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span> -->
          </div>

        </el-form>
      </div>
    </div>
  </div>
  <!-- 环境变量的作用
  1. 正常公司中 有几个环境 4 开发 dev 测试 test 预发 uat 线上 pro
  2. 在项目里如何配置这几个环境  通过 .env 配置 base api
  开发环境的接口前缀 /api
  线上环境的接口前缀 /prod-api
   -->
</template>
<script>
import { validPhone } from '@/utils/validate'
import { getimgAPI } from '@/api/login'
export default {

  name: 'Login',
  data() {
    const phonevalid = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      passwordType: 'password',
      loginForm: {
        mobile: 'admin',
        password: 'admin',
        verification: '',
        clientToken: ''
      },
      imgurl: '',
      rules: {
        mobile: [{
          required: true, message: '请输入手机号', trigger: 'blur'
        },
        {
          validator: phonevalid, trigger: 'blur'
        }],
        password: [{
          required: true, message: '手机号必填', trigger: 'blur'
        },
        {
          min: 5, max: 16, message: '密码必填', trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.changeimg()
  },
  methods: {
    async  changeimg() {
      this.loginForm.clientToken = Math.random()
      const res = await getimgAPI(this.loginForm.clientToken)
      console.log(res)
      this.imgurl = window.URL.createObjectURL(res.data)
      // console.log(1)
    },
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async  login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/loginAction', this.loginForm)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    background-color: #ffffff;
    display: inline-block;
    height: 47px;
    width: 85%;
    // border: 2px black solid;
    border-radius: 3px ;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {

    border: 1px solid rgba(132, 47, 47, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    width: 85%;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    margin-left:  7.5%;
  }
  .el-form-item__error {
    color: #fff
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
 .bg-purple{
    background: #d3dce6;
    height: 47px;
}

  .box{
    padding: 20px;
    border-radius: 8px;
    background-color:#ffffff;
    width: 518px;
    height: 388px;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
   .logo-png{
      width: 96px;
      position: absolute;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
.loginBtn {
    background:#6679ed;
    height: 52px;
    line-height: 32px;
    font-size: 24px;
    width:85%;
    margin-left: 7.5%;
    margin-bottom:30px;
     border:none;
     color: #fff;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background:  #cd3636
  }
  .bg-purple {
    background: #ffffff
  }
  .bg-purple-light {
    background: #ffffff
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
