<template>
  <div>
    <a-table border :columns="getColumns()" :dataSource="musicList" ellipsis>
        <!--<a slot="name" slot-scope="text" :onclick="getMusicId(text)">{{text}}</a>-->
      <router-link slot="id" slot-scope="text" :to="{path:'/music/musicPlay', query:{music_id: text}}">{{text}}
      </router-link>
      <!--<a slot="id" slot-scope="text" @click="getMusicUrl(text)">{{text}}-->
      <!--</a>-->
    </a-table>
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'

export default {
  name: 'MusicListTable',
  props: {
    'musicList': {
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
    Aplayer
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
        {title: '标题', dataIndex: 'id', width: '65%', sortable: 'true', scopedSlots: {customRender: 'id'}},
        {title: '时长', dataIndex: 'dt', width: '15%', sortable: 'true', render: this.musicTimeFormatRender},
        {title: '歌手', dataIndex: 'ar[0].name', width: '20%', sortable: 'true'}
      ]
    }
  },
  methods: {
    getColumns () {
      return this.musicListColumns.filter((column) => {
        return this.executionColumns.indexOf(column.dataIndex) === -1
      })
    }
  },
  mounted () {
    // this.initTableColumn(this.musicListColumns)
  }
}

</script>

<style scoped>

</style>
