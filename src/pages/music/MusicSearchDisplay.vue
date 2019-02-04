<template>
  <div>
    <a-table border :columns="getColumns()" :dataSource="musicList" ellipsis>
      <router-link slot="play" slot-scope="text" :to="{path:'/music/musicPlay', query:{music_id: text}}">
        <a-icon type="play-circle" style="margin-left: 7px" />
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
        {title: '播放', dataIndex: 'id', width: '8%', sortable: 'true', scopedSlots: {customRender: 'play'}},
        {title: '标题', dataIndex: 'name', width: '72%', sortable: 'true'},
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
  }
}

</script>
