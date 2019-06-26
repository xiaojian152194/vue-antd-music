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
        <a-form @submit="onSubmit" :autoFormCreate="(form)=>{this.form = form}" :options="{onValuesChange}">
          <a-form-item
            fieldDecoratorId="username"
            :fieldDecoratorOptions="{
                    rules: [
                        {
                            required: true,
                            message: '请输入邮箱地址！',
                        },
                        {
                            type: 'email',
                            message: '邮箱地址格式错误！',
                        },
                    ],
                }"
          >
            <a-input size="large" placeholder="邮箱">
              <a-icon slot="prefix" type="mail" />
            </a-input>
          </a-form-item>
          <a-form-item
          fieldDecoratorId="nickname"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入昵称', whitespace: true}]}"
          >
          <a-input size="large" placeholder="昵称" >
            <a-icon slot="prefix" type="user" />
          </a-input>
          </a-form-item>
          <a-popover :overlayStyle="{ width: 240 }" placement="right" :visible="visible">
            <template slot="content">
              <div style="padding: 4px 0;">
                <div v-if="passwordStatus == 'ok'" class="success">强度：强</div>
                <div v-if="passwordStatus == 'pass'" class="warning">强度：中</div>
                <div v-if="passwordStatus == 'poor'" class="error">强度：太短</div>
                <div :class="`progress-${passwordStatus}`" v-if="passwordValue && passwordValue.length">
                  <Progress
                    v-if="passwordProgressMap[passwordStatus]"
                    :status="passwordProgressMap[passwordStatus]"
                    class="progress"
                    :strokeWidth="6"
                    :percent="passwordValue.length * 10 > 100 ? 100 : passwordValue.length * 10"
                    :showInfo="false"
                  />
                  <Progress
                    v-else
                    class="progress"
                    :strokeWidth="6"
                    :percent="passwordValue.length * 10 > 100 ? 100 : passwordValue.length * 10"
                    :showInfo="false"
                  />
                </div>
                <div style="margin-top: 10px;">
                  请至少输入 6 个字符。请不要使用容易被猜到的密码。
                </div>
              </div>
            </template>
            <a-form-item
              :help="help"
              fieldDecoratorId="password"
              :fieldDecoratorOptions="{
                        rules: [
                            {
                                validator: checkPassword,
                            },
                        ],
                    }"
            >
              <a-input size="large" type="password" placeholder="至少6位密码，区分大小写" >
                <a-icon slot="prefix" type="key" />
              </a-input>
            </a-form-item>
          </a-popover>
          <a-form-item
            fieldDecoratorId="confirm"
            :fieldDecoratorOptions="{
                    rules: [
                        {
                            required: true,
                            message: '请确认密码！',
                        },
                        {
                            validator: checkConfirm,
                        },
                    ],
                }"
          >
            <a-input size="large" type="password" placeholder="确认密码" >
              <a-icon slot="prefix" type="key" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              :loading="logging"
              class="submit"
              type="primary"
              htmlType="submit"
              style="width: 100%;margin-top: 24px"
            >
              注册
            </a-button>
            <router-link class="login" to="/login" >
              使用已有账户登录
            </router-link>
          </a-form-item>
        </a-form>
        <!--<a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">-->
          <!--<a-tabs size="large" :tabBarStyle="{textAlign: 'left'}" style="padding: 0 2px;">-->
            <!--<a-tab-pane tab="用户注册" key="1">-->
              <!--<a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />-->
              <!--<a-form-item-->
                <!--fieldDecoratorId="name"-->
                <!--:fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账号', whitespace: true}]}"-->
              <!--&gt;-->
                <!--<a-input size="large" placeholder="账号" type="email">-->
                  <!--<a-icon slot="prefix" type="user" />-->
                <!--</a-input>-->
              <!--</a-form-item>-->
              <!--<a-form-item-->
                <!--fieldDecoratorId="nickname"-->
                <!--:fieldDecoratorOptions="{rules: [{ required: true, message: '请输入昵称', whitespace: true}]}"-->
              <!--&gt;-->
                <!--<a-input size="large" placeholder="昵称" >-->
                  <!--<a-icon slot="prefix" type="user" />-->
                <!--</a-input>-->
              <!--</a-form-item>-->
              <!--<a-form-item-->
                <!--fieldDecoratorId="password"-->
                <!--:fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}"-->
              <!--&gt;-->
                <!--<a-input size="large" placeholder="密码" type="password">-->
                  <!--<a-icon slot="prefix" type="lock" />-->
                <!--</a-input>-->
              <!--</a-form-item>-->
            <!--</a-tab-pane>-->
            <!--&lt;!&ndash;<a-tab-pane tab="手机号登录" key="2">&ndash;&gt;-->
            <!--&lt;!&ndash;<a-form-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<a-input size="large" placeholder="手机号" >&ndash;&gt;-->
            <!--&lt;!&ndash;<a-icon slot="prefix" type="mobile" />&ndash;&gt;-->
            <!--&lt;!&ndash;</a-input>&ndash;&gt;-->
            <!--&lt;!&ndash;</a-form-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<a-form-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<a-row :gutter="8" style="margin: 0 -4px">&ndash;&gt;-->
            <!--&lt;!&ndash;<a-col :span="16">&ndash;&gt;-->
            <!--&lt;!&ndash;<a-input size="large" placeholder="验证码">&ndash;&gt;-->
            <!--&lt;!&ndash;<a-icon slot="prefix" type="mail" />&ndash;&gt;-->
            <!--&lt;!&ndash;</a-input>&ndash;&gt;-->
            <!--&lt;!&ndash;</a-col>&ndash;&gt;-->
            <!--&lt;!&ndash;<a-col :span="8" style="padding-left: 4px">&ndash;&gt;-->
            <!--&lt;!&ndash;<a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</a-col>&ndash;&gt;-->
            <!--&lt;!&ndash;</a-row>&ndash;&gt;-->
            <!--&lt;!&ndash;</a-form-item>&ndash;&gt;-->
            <!--&lt;!&ndash;</a-tab-pane>&ndash;&gt;-->
          <!--</a-tabs>-->
          <!--&lt;!&ndash;<div>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-checkbox :checked="true" >自动登录</a-checkbox>&ndash;&gt;-->
          <!--&lt;!&ndash;<a style="float: right">忘记密码</a>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<a-form-item>-->
            <!--<a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">注册</a-button>-->
          <!--</a-form-item>-->
          <!--<div>-->
            <!--&lt;!&ndash;其他登录方式&ndash;&gt;-->
            <!--&lt;!&ndash;<a-icon class="icon" type="alipay-circle" />&ndash;&gt;-->
            <!--&lt;!&ndash;<a-icon class="icon" type="taobao-circle" />&ndash;&gt;-->
            <!--&lt;!&ndash;<a-icon class="icon" type="weibo-circle" />&ndash;&gt;-->
            <!--<router-link style="float: right" to="/login" >返回登陆</router-link>-->
          <!--</div>-->
        <!--</a-form>-->
      </div>
    </div>
    <global-footer :design="design" />
  </div>
</template>

<script>
import AButton from 'ant-design-vue/es/button/button'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import GlobalFooter from '../../layouts/GlobalFooter'
import { Input, Progress } from 'ant-design-vue'
export default {
  name: 'register',
  components: {GlobalFooter, Progress, AButton, AFormItem, InputGroup: Input.Group},
  data () {
    const passwordProgressMap = {
      ok: 'success',
      pass: '',
      poor: 'exception'
    }
    return {
      user: {
        username: null,
        password: null
      },
      logging: false,
      error: '',
      passwordValue: '',
      passwordStatus: '',
      visible: false,
      passwordProgressMap,
      help: '',
      confirmDirty: false
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
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        // debugger
        if (!err) {
          this.logging = true
          this.$axios.post('fg/user/register', {
            username: this.form.getFieldValue('username'),
            nickname: this.form.getFieldValue('nickname'),
            password: this.form.getFieldValue('password')
          }).then((res) => {
            // debugger
            this.logging = false
            const result = res.data
            if (result.code === 200) {
              this.$message.success('注册成功!')
              this.$router.push('/login')
            } else {
              this.$message.warning(result.message)
            }
          })
          this.logging = false
        }
      })
    },
    onValuesChange (props, values) {
      if (values.password) {
        this.passwordValue = values.password
      }
      // console.log(props, values)
    },
    checkPassword (rule, value, callback) {
      if (!value) {
        this.help = '请输入密码！'
        this.visible = !!value
        callback(new Error('error'))
      } else {
        this.help = ''
        if (!this.visible) {
          this.visible = !!value
        }
        if (value.length < 6) {
          callback(new Error('error'))
        } else {
          if (value && this.confirmDirty) {
            this.form.validateFields(['confirm'], { force: true })
          }
          callback()
        }
      }
    },
    checkConfirm (rule, value, callback) {
      if (value && value !== this.form.getFieldValue('password')) {
        callback(new Error('两次输入的密码不匹配!'))
      } else {
        callback()
      }
    }
  },
  watch: {
    passwordValue (val, oldVal) {
      if (val && val.length > 9) {
        return (this.passwordStatus = 'ok')
      }
      if (val && val.length > 5) {
        return (this.passwordStatus = 'pass')
      }
      this.passwordStatus = 'poor'
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
