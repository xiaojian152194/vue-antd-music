<template>
  <a-table border :columns="getColumns()" :dataSource="musicList" ellipsis>
      <!--<a slot="name" slot-scope="text" :onclick="getMusicId(text)">{{text}}</a>-->
    <router-link slot="name" slot-scope="text" :to="{path:'/music/musicPlay', query:{music_id: text}}">{{text}}
    </router-link>
  </a-table>
</template>

<script>
export default {
  name: 'MusicListTable',
  props: {
    'musicList': {
      default: function () { return [] }
    },
    'executionColumns': {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      musicListColumns: [
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
        { title: '标题', dataIndex: 'id', width: '65%', sortable: 'true', scopedSlots: { customRender: 'name' } },
        { title: '时长', dataIndex: 'dt', width: '15%', sortable: 'true' },
        { title: '歌手', dataIndex: 'ar[0].name', width: '20%', sortable: 'true' }
      ]
    }
  },
  methods: {
    getColumns () {
      return this.musicListColumns.filter((column) => {
        return this.executionColumns.indexOf(column.dataIndex) === -1
      })
    }
    // initTableColumn (columnName) {
    //   for (let i = 0; i < columnName.length; i++) {
    //     if (!columnName[i].render) {
    //       this.$set(columnName[i], 'render', (h, params) => {
    //         this.$set(columnName[i], 'ellipsis', true)
    //         return h('span', {attrs: {title: params.row[params.column.key]}}, params.row[params.column.key])
    //       })
    //     }
    //   }
    // }
  },
  mounted () {
    // this.initTableColumn(this.musicListColumns)
  }
}
</script>

<style scoped>

</style>
