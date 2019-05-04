<template>
  <div>
    <a-table border :columns="getColumns()" :dataSource="allUserState" ellipsis>
      <!--<router-link slot="play" slot-scope="text" :to="{path:'/personal/myMusicPlay', query:{music_id: text}}">-->
        <!--<a-icon type="play-circle" style="margin-left: 7px"/>-->
      <!--</router-link>-->
      <!--<router-link slot="download" slot-scope="text" :to="'../fg/music/download/' + text">-->
      <!--<a-icon type="download" style="margin-left: 7px"/>-->
      <!--</router-link>-->
      <a slot="update" slot-scope="text" @click="showModal(text)">
        <a-button type="primary">修改</a-button>
      </a>
      <a slot="delete" slot-scope="text" @click="deleteUser(text)">
        <a-button type="danger">删除</a-button>
      </a>
    </a-table>
    <a-modal width="700px" :scrollable="true" :styles="{top: '60px', height:'500px'}"
             title="增加用户"
             v-model="createUserUpdateModal"
    >
      <div :style="{textAlign: 'center'}">
        <a-form :autoFormCreate="(updatefrom) => this.form = updatefrom" :model="userUpdateInformation">
          <a-row>
            <a-col>
              <a-form-item label="账号：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"
                           :fieldDecoratorOptions="{rules: [{ required: true, message: '账号不能为空', whitespace: true}]}" >
                <a-input v-model="userUpdateInformation.username" placeholder="请输入账号" :maxlength=175 />

              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item label="昵称：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"
                           :fieldDecoratorOptions="{rules: [{ required: true, message: '昵称不能为空', whitespace: true}]}" >
                <a-input v-model="userUpdateInformation.nickname" placeholder="请输入昵称" :maxlength=175 />

              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item label="密码：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"
                           :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能为空', whitespace: true}]}" >
                <a-input v-model="userUpdateInformation.password" type="password" placeholder="请输入密码" :maxlength=36 />

              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item label="是否管理员：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"
                           :fieldDecoratorOptions="{rules: [{ required: true, message: '是否管理员不能为空', whitespace: true}]}" >
                <a-select v-model="userUpdateInformation.haveAuthority" placeholder="请选择是否管理员">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AIcon from 'ant-design-vue/es/icon/icon'
import AButton from 'ant-design-vue/es/button/button'
export default {
  name: 'MyMusicListTable',
  props: {
    'allUserState': {
      default: function () {
        return []
      }
    },
    'executionColumns': {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    AButton,
    AIcon
  },
  data () {
    return {
      createUserUpdateModal: false,
      userUpdateInformation: {
        id: null,
        username: null,
        password: null,
        haveAuthority: null
      },
      allMusicListColumns: [
        // {
        //   title: '更多',
        //   type: 'expand',
        //   width: 65,
        //   render: (h, params) => {
        //     return h(OpportunityExpandGrid, {
        //       props: {
        //         row: params.row
        //       }
        //     })
        //   }
        // },
        // {title: '播放', dataIndex: 'id', sortable: 'true', scopedSlots: {customRender: 'play'}},
        {title: '账号', dataIndex: 'username', minWidth: '60%', sortable: 'true'},
        {title: '昵称', dataIndex: 'nickname', sortable: 'true'},
        {title: '是否管理员', dataIndex: 'haveAuthority', sortable: 'true', customRender: this.haveAuthorityRender},
        {title: '创建时间', dataIndex: 'createDate', sortable: 'true', customRender: this.longTimestampRender},
        {title: '修改', dataIndex: 'id', width: '10px', sortable: 'true', scopedSlots: {customRender: 'update'}},
        {title: '删除', dataIndex: 'id', width: '10px', sortable: 'true', scopedSlots: {customRender: 'delete'}}
      ]
    }
  },
  computed: {
    ...mapState({
      updateUserState: state => state.user_store.updateUser
    })
  },
  methods: {
    getColumns () {
      return this.allMusicListColumns.filter((column) => {
        return this.executionColumns.indexOf(column.dataIndex) === -1
      })
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          debugger
          let formDate = {
            ...this.userUpdateInformation
          }
          this.$store.dispatch('user_store/UPDATE_USER', formDate)
          this.createUserUpdateModal = false
        } else {
          this.createUserUpdateModal = true
        }
      })
    },
    showModal (id) {
      this.createUserUpdateModal = true
      this.$store.dispatch('user_store/FETCH_USER', id)
      this.userUpdateInformation.id = id
    },
    closeModal () {
      this.createUserUpdateModal = false
    },
    deleteUser (id) {
      let user = {
        id: id
      }
      this.$store.dispatch('user_store/DELETE_USER', user)
    }
  },
  watch: {
    updateUserState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.userUpdateInformation = Object.assign({}, curVal)
        }
      },
      deep: true
    }
  }
}

</script>
