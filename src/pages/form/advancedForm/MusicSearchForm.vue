<template>
  <div>
    <a-table border :columns="getColumns()" :dataSource="musicList" ellipsis>
      <!--<a slot="name" slot-scope="text" :onclick="getMusicId(text)">{{text}}</a>-->
      <router-link slot="play" slot-scope="text" :to="{path:'/music/musicPlay', query:{music_id: text}}">
        播放
      </router-link>
      <!--<a slot="id" slot-scope="text" @click="getMusicUrl(text)">{{text}}-->
      <!--</a>-->
    </a-table>
  </div>
</template>

<script>
// import Aplayer from 'vue-aplayer'
import AIcon from 'ant-design-vue/es/icon/icon'
// import util from '@/utils/utils'

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
    AIcon
    // Aplayer
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
        {title: '播放', dataIndex: 'id', width: '10%', sortable: 'true', scopedSlots: {customRender: 'play'}},
        {title: '标题', dataIndex: 'name', width: '70%', sortable: 'true'},
        // {title: '时长', dataIndex: 'dt', width: '10%', sortable: 'true', render: this.musicTimeFormatRender},
        {title: '歌手', dataIndex: 'artists[0].name', width: '20%', sortable: 'true'}
      ]
    }
  },
  methods: {
    getColumns () {
      return this.musicListColumns.filter((column) => {
        return this.executionColumns.indexOf(column.dataIndex) === -1
      })
    }
    // musicTimeFormatRender (h, params) {
    //   debugger
    //   let musicDt = params.row[params.column.dataIndex]
    //   return h('span', util.musicTimeFormat(musicDt))
    // }
  },
  mounted () {
    // this.initTableColumn(this.musicListColumns)
  }
}

</script>

<style scoped>

</style>
