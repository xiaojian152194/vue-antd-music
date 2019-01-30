<template>
  <div>
    <a-table border :columns="getColumns()" :dataSource="musicList" ellipsis>
      <router-link slot="play" slot-scope="text" :to="{path:'/music/musicPlay', query:{music_id: text}}">
        播放
      </router-link>
      <!--<a slot="play" slot-scope="text" @click="getMusicUrl(text)">{{text}}-->
      <!--</a>-->
    </a-table>
  </div>
</template>

<script>
import AIcon from 'ant-design-vue/es/icon/icon'
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
        {title: '标题', dataIndex: 'name', width: '43%', sortable: 'true'},
        {title: '专辑', dataIndex: 'alia[0]', width: '30%', sortable: 'true'},
        {title: '歌手', dataIndex: 'ar[0].name', width: '27%', sortable: 'true'}
      ]
    }
  },
  methods: {
    getColumns () {
      return this.musicListColumns.filter((column) => {
        return this.executionColumns.indexOf(column.dataIndex) === -1
      })
    }
  }
}

</script>
