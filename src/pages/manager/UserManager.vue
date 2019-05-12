<template>
  <div>
    <a-card>
      <a-input-search
        style="width: 230px"
        placeholder="请输入账号名"
        @search="onSearch"
        enterButton
      />
      <a-button type="primary" style="float:right" @click="showModal">增加用户</a-button>
      <a-modal width="700px" :scrollable="true" :styles="{top: '60px', height:'500px'}"
        title="增加用户"
        v-model="createUserAddModal"
      >
        <div :style="{textAlign: 'center'}">
          <a-form :autoFormCreate="(from) => {this.form = from}">
            <a-row>
              <a-col>
                <a-form-item label="账号：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" fieldDecoratorId="username"
                             :fieldDecoratorOptions="{rules: [{ required: true, message: '账号不能为空', whitespace: true}]}" >
                  <a-input placeholder="请输入账号" :maxlength=175 />

                </a-form-item>
              </a-col>
              <a-col>
                <a-form-item label="昵称：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" fieldDecoratorId="nickname"
                             :fieldDecoratorOptions="{rules: [{ required: true, message: '昵称不能为空', whitespace: true}]}" >
                  <a-input placeholder="请输入昵称" :maxlength=175 />

                </a-form-item>
              </a-col>
              <a-col>
                <a-form-item label="密码：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" fieldDecoratorId="password"
                             :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能为空', whitespace: true}]}" >
                  <a-input type="password" placeholder="请输入密码" :maxlength=36 />

                </a-form-item>
              </a-col>
              <a-col>
                <a-form-item label="是否管理员：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" fieldDecoratorId="haveAuthority"
                             :fieldDecoratorOptions="{rules: [{ required: true, message: '是否管理员不能为空', whitespace: true}]}" >
                  <a-select placeholder="请选择是否管理员">
                    <a-select-option value="Y">管理员</a-select-option>
                    <a-select-option value="N">普通用户</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div slot="footer">
          <a-button @click="handleOk" type="primary" size="large">确定</a-button>
          <a-button type="danger" @click="closeModal" size="large">取消</a-button>
        </div>
      </a-modal>
      <a-card title="所有用户" :bordered="false">
        <UserDisplay :allUserState="allUserState.datas"></UserDisplay>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserDisplay from './UserDisplay'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import AInput from 'ant-design-vue/es/input/Input'
import ARow from 'ant-design-vue/es/grid/Row'
import ACol from 'ant-design-vue/es/grid/Col'
import ASelect from 'ant-design-vue/es/select/index'
import AButton from 'ant-design-vue/es/button/button'
export default {
  name: 'UserList',
  components: {AButton, ASelect, ACol, ARow, AInput, AFormItem, UserDisplay},
  data () {
    return {
      createUserAddModal: false
    }
  },
  computed: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapState({
      allUserState: state => state.user_store.AllUser,
      updateUserState: state => state.user_store.updateUser,
      userSavingState: state => state.user_store.savingState,
      userSavingErrorMessage: state => state.user_store.savingErrorMessage,
      userUpdateState: state => state.user_store.updatingState,
      userUpdateErrorMessage: state => state.user_store.updateErrorMessage,
      userUpdateObjectsState: state => state.user_store.updateObjects,
      userDestroyingState: state => state.user_store.destroyingState,
      userDestroyingErrorMessage: state => state.user_store.destroyingErrorMessage
    })
  },
  methods: {
    initializeFetch () {
      this.$store.dispatch('music_login_store/GET_USER_LOGIN')
      this.$store.dispatch('user_store/FETCH_All_USER')
    },
    onSearch (value) {
      let userSearch = {
        likeUsername: value
      }
      this.$store.dispatch('user_store/SEARCH_USER', userSearch)
    },
    showModal () {
      this.createUserAddModal = true
      this.form.setFieldsValue({
        username: null,
        nickname: null,
        password: null,
        haveAuthority: null
      })
    },
    closeModal () {
      this.createUserAddModal = false
    },
    handleOk (e) {
      e.preventDefault()
      debugger
      this.form.validateFields((err, values) => {
        if (!err) {
          debugger
          let context = {
            username: this.form.getFieldValue('username'),
            nickname: this.form.getFieldValue('nickname'),
            password: this.form.getFieldValue('password'),
            haveAuthority: this.form.getFieldValue('haveAuthority')
          }
          this.$store.dispatch('user_store/SAVE_USER', context)
          this.createUserAddModal = false
        } else {
          this.createUserAddModal = true
        }
      })
    }
  },
  watch: {
    userSavingState (state) {
      if (state === 'success') {
        this.$message.success('用户添加成功')
        this.initializeFetch()
      }
      if (state === 'error') {
        this.$message.error(this.userSavingErrorMessage)
      }
    },
    userUpdateState (state) {
      if (state === 'success') {
        this.$message.success('用户修改成功')
        this.initializeFetch()
        // this.$store.dispatch('user_store/FETCH_All_USER')
      }
      if (state === 'error') {
        this.$message.error(this.userUpdateErrorMessage)
      }
    },
    userDestroyingState (state) {
      if (state === 'success') {
        this.$message.success('用户删除成功')
        this.initializeFetch()
        // this.$store.dispatch('user_store/FETCH_All_USER')
      }
      if (state === 'error') {
        this.$message.error(this.userDestroyingErrorMessage)
      }
    }
  },
  // mounted () {
  //   this.initializeFetch()
  // },
  activated () {
    this.initializeFetch()
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
