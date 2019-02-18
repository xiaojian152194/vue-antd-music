<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="static/img/logo2.png" />
          <span class="title">{{systemName}}</span>
        </div>
        <div class="desc">个人云音乐中心</div>
      </div>
      <div class="login">
        <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'left'}" style="padding: 0 2px;">
            <a-tab-pane tab="账户密码登录" key="1">
              <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
              <a-form-item
                fieldDecoratorId="name"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名', whitespace: true}]}"
              >
                <a-input size="large" placeholder="用户名" >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item
                fieldDecoratorId="password"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}"
              >
                <a-input size="large" placeholder="密码" type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
            <!--<a-tab-pane tab="手机号登录" key="2">-->
              <!--<a-form-item>-->
                <!--<a-input size="large" placeholder="手机号" >-->
                  <!--<a-icon slot="prefix" type="mobile" />-->
                <!--</a-input>-->
              <!--</a-form-item>-->
              <!--<a-form-item>-->
                <!--<a-row :gutter="8" style="margin: 0 -4px">-->
                  <!--<a-col :span="16">-->
                    <!--<a-input size="large" placeholder="验证码">-->
                    <!--<a-icon slot="prefix" type="mail" />-->
                  <!--</a-input>-->
                  <!--</a-col>-->
                  <!--<a-col :span="8" style="padding-left: 4px">-->
                    <!--<a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>-->
                  <!--</a-col>-->
                <!--</a-row>-->
              <!--</a-form-item>-->
            <!--</a-tab-pane>-->
          </a-tabs>
          <!--<div>-->
            <!--<a-checkbox :checked="true" >自动登录</a-checkbox>-->
            <!--<a style="float: right">忘记密码</a>-->
          <!--</div>-->
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
          <div>
            <!--其他登录方式-->
            <!--<a-icon class="icon" type="alipay-circle" />-->
            <!--<a-icon class="icon" type="taobao-circle" />-->
            <!--<a-icon class="icon" type="weibo-circle" />-->
            <router-link style="float: right" to="/register" >注册账户</router-link>
          </div>
        </a-form>
      </div>
    </div>
    <global-footer :design="design" />
  </div>
</template>

<script>
import GlobalFooter from '../../layouts/GlobalFooter'
// import dataService from '@/services/dataService'
import { mapState } from 'vuex'
export default {
  name: 'Login',
  components: {GlobalFooter},
  data () {
    return {
      user: {
        username: null,
        password: null
      },
      logging: false,
      error: ''
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    },
    linkList () {
      return this.$store.state.setting.footerLinks
    },
    copyright () {
      return this.$store.state.setting.copyright
    },
    design () {
      return this.$store.state.setting.design
    },
    ...mapState({
      loginState: state => state.music_login_store.currentUser
    })
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          // let token = dataService.getToken()
          let context = {
            username: this.form.getFieldValue('name'),
            password: this.form.getFieldValue('password')
          }
          this.$store.dispatch('music_login_store/GET_USER_LOGIN', context)
          // this.$axios.post('fg/login', {
          //   username: this.form.getFieldValue('name'),
          //   password: this.form.getFieldValue('password')
          // }).then((res) => {
          //   debugger
          //   this.logging = false
          //   const result = res.data
          //   if (result.id !== null) {
          //     this.$message.success('登陆成功!')
          //     this.$router.push('/music/musicList')
          //   } else {
          //     this.error = result.message
          //   }
          // })
          this.logging = false
        }
      })
    }
  },
  watch: {
    loginState (state) {
      if (state.state === 'error') {
        this.$message.warning('登陆错误！！')
      } else if (state.state === 'success') {
        this.$router.push('/music/musicList')
        this.$message.success('登陆成功！欢迎回来 ' + state.nickname)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>
