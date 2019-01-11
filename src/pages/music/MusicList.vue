<template>
  <div>
    <a-card>
      <!--<div :class="advanced ? 'search' : null">-->
        <!--<a-form layout="horizontal">-->
          <!--<div :class="advanced ? null: 'fold'">-->
            <!--<a-row >-->
              <!--<a-col :md="8" :sm="24" >-->
                <!--<a-form-item-->
                  <!--label="规则编号"-->
                  <!--:labelCol="{span: 5}"-->
                  <!--:wrapperCol="{span: 18, offset: 1}"-->
                <!--&gt;-->
                  <!--<a-input placeholder="请输入" />-->
                <!--</a-form-item>-->
              <!--</a-col>-->
              <!--<a-col :md="8" :sm="24" >-->
                <!--<a-form-item-->
                  <!--label="使用状态"-->
                  <!--:labelCol="{span: 5}"-->
                  <!--:wrapperCol="{span: 18, offset: 1}"-->
                <!--&gt;-->
                  <!--<a-select placeholder="请选择">-->
                    <!--<a-select-option value="1">关闭</a-select-option>-->
                    <!--<a-select-option value="2">运行中</a-select-option>-->
                  <!--</a-select>-->
                <!--</a-form-item>-->
              <!--</a-col>-->
              <!--<a-col :md="8" :sm="24" >-->
                <!--<a-form-item-->
                  <!--label="调用次数"-->
                  <!--:labelCol="{span: 5}"-->
                  <!--:wrapperCol="{span: 18, offset: 1}"-->
                <!--&gt;-->
                  <!--<a-input-number style="width: 100%" placeholder="请输入" />-->
                <!--</a-form-item>-->
              <!--</a-col>-->
            <!--</a-row>-->
            <!--<a-row v-if="advanced">-->
              <!--<a-col :md="8" :sm="24" >-->
                <!--<a-form-item-->
                  <!--label="更新日期"-->
                  <!--:labelCol="{span: 5}"-->
                  <!--:wrapperCol="{span: 18, offset: 1}"-->
                <!--&gt;-->
                  <!--<a-date-picker style="width: 100%" placeholder="请输入更新日期" />-->
                <!--</a-form-item>-->
              <!--</a-col>-->
              <!--<a-col :md="8" :sm="24" >-->
                <!--<a-form-item-->
                  <!--label="使用状态"-->
                  <!--:labelCol="{span: 5}"-->
                  <!--:wrapperCol="{span: 18, offset: 1}"-->
                <!--&gt;-->
                  <!--<a-select placeholder="请选择">-->
                    <!--<a-select-option value="1">关闭</a-select-option>-->
                    <!--<a-select-option value="2">运行中</a-select-option>-->
                  <!--</a-select>-->
                <!--</a-form-item>-->
              <!--</a-col>-->
              <!--<a-col :md="8" :sm="24" >-->
                <!--<a-form-item-->
                  <!--label="描述"-->
                  <!--:labelCol="{span: 5}"-->
                  <!--:wrapperCol="{span: 18, offset: 1}"-->
                <!--&gt;-->
                  <!--<a-input placeholder="请输入" />-->
                <!--</a-form-item>-->
              <!--</a-col>-->
            <!--</a-row>-->
          <!--</div>-->
          <!--<span style="float: right; margin-top: 3px;">-->
            <!--<a-button type="primary">查询</a-button>-->
            <!--<a-button style="margin-left: 8px">重置</a-button>-->
            <!--<a @click="toggleAdvanced" style="margin-left: 8px">-->
              <!--{{advanced ? '收起' : '展开'}}-->
              <!--<a-icon :type="advanced ? 'up' : 'down'" />-->
            <!--</a>-->
          <!--</span>-->
        <!--</a-form>-->
      <!--</div>-->
      <!--<div>-->
        <!--<div class="operator">-->
          <!--<a-button @click="addNew" type="upload">上传音乐</a-button>-->
        <!--</div>-->
      <!--</div>-->
      <!--<a-back-top />-->
      <a-input-search
        style="width: 200px"
        placeholder="音乐搜索"
        @search="onSearch"
        enterButton
      />
      <a-card title="云音乐热歌榜" :bordered="false">
        {{musicList.tracks[0].name}}
        {{musicList.tracks[0].ar[0].name}}
        <TableForm :musicList="musicList"></TableForm>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import StandardTable from '../../components/table/StandardTable'
import TableForm from '../form/advancedForm/TableForm'
export default {
  name: 'QueryList',
  components: {StandardTable, TableForm},
  computed: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapState({
      musicList: state => state.music_list_store.fetchedList
    })
  },
  methods: {
    initializeFetch () {
      this.$store.dispatch('music_list_store/FETCH_MUSIC_LIST')
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onchange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRowKeys.indexOf(item.key) < 0)
      this.selectedRows = this.selectedRows.filter(item => this.selectedRowKeys.indexOf(item.key) < 0)
    },
    addNew () {
      this.dataSource.unshift({
        key: this.dataSource.length,
        no: '音乐 ' + this.dataSource.length,
        description: '6M',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2018-07-26'
      })
    },
    handleMenuClick (e) {
      debugger
      if (e.key === 'delete') {
        this.remove()
      }
    }
  },
  mounted () {
    this.initializeFetch()
  },
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
