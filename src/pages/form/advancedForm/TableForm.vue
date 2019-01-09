<template>
  <form :autoFormCreate="(form) => this.form = form">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
    >
      <template  v-for="(col, i) in ['name', 'workId', 'department']" :slot="col" slot-scope="text, record, index">
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columns[i].title"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
      </template>
    </a-table>
    <!--<a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMeber">新增成员</a-button>-->
  </form>
</template>

<script>
const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
    width: '70%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '时长',
    dataIndex: 'workId',
    key: 'workId',
    width: '15%',
    scopedSlots: { customRender: 'workId' }
  },
  {
    title: '歌手',
    dataIndex: 'department',
    key: 'department',
    width: '15%',
    scopedSlots: { customRender: 'department' }
  }
]

const dataSource = [
  {
    key: '1',
    name: '第三人称',
    workId: '买辣椒也用卷',
    editable: false,
    department: '5M'
  },
  {
    key: '2',
    name: '相反的我',
    workId: '张芸京',
    editable: false,
    department: '4M'
  },
  {
    key: '3',
    name: '去年夏天',
    workId: '王大毛',
    editable: false,
    department: '7M'
  }
]

export default {
  name: 'TableForm',
  data () {
    return {
      columns,
      dataSource
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
    },
    newMeber () {
      this.dataSource.push({
        key: '99',
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    remove (key) {
      const newData = this.dataSource.filter(item => item.key !== key)
      this.dataSource = newData
    },
    saveRow (key) {
      let target = this.dataSource.filter(item => item.key === key)[0]
      target.editable = false
      target.isNew = false
    },
    toggle (key) {
      let target = this.dataSource.filter(item => item.key === key)[0]
      target.editable = !target.editable
    },
    getRowByKey (key, newData) {
      const data = this.dataSource
      return (newData || data).filter(item => item.key === key)[0]
    },
    cancle (key) {
      let target = this.dataSource.filter(item => item.key === key)[0]
      target.editable = false
    },
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
    }
  }
}
</script>

<style scoped>

</style>
