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
      <div>
        <div class="operator">
          <a-button @click="addNew" type="upload">上传音乐</a-button>
        </div>
      </div>
      <!--<a-back-top />-->
      <a-card title="音乐管理" :bordered="false">
        <table-form />
      </a-card>
    </a-card>
  </div>
</template>

<script>
import StandardTable from '../../components/table/StandardTable'
import TableForm from '../form/advancedForm/TableForm'
const columns = [
  {
    title: '音乐名',
    dataIndex: 'no'
  },
  {
    title: '大小',
    dataIndex: 'description'
  },
  {
    title: '下载量',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
    customRender: (text) => text + ' 次'
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   needTotal: true
  // },
  {
    title: '上传时间',
    dataIndex: 'updatedAt',
    sorter: true
  }
]

const dataSource = []

for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    no: '音乐 ' + i,
    description: '5M',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: '2018-07-26'
  })
}

export default {
  name: 'QueryList',
  components: {StandardTable, TableForm},
  data () {
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
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
