<template>
  <div>
    <a-table border :columns="getColumns()" :dataSource="musicList" ellipsis>
      <router-link slot="play" slot-scope="text" :to="{path:'/personal/myMusicPlay', query:{music_id: text}}">
        <a-icon type="play-circle" style="margin-left: 7px"/>
      </router-link>
      <!--<router-link slot="download" slot-scope="text" :to="'../fg/music/download/' + text">-->
        <!--<a-icon type="download" style="margin-left: 7px"/>-->
      <!--</router-link>-->
      <a slot="download" slot-scope="text" @click="downloadMusic(text)">
        <a-icon type="download" style="margin-left: 7px"/>
      </a>
      <!--<a slot="delete" slot-scope="text" @click="deleteMusic(text)">-->

      <!--</a>-->
      <a-popconfirm slot="delete" slot-scope="text" placement="top" okText="确认" cancelText="取消" @confirm="deleteMusic(text)">
        <template slot="title">
          <p>确认删除此音乐？</p>
        </template>
        <a-icon type="delete" style="margin-left: 7px"/>
      </a-popconfirm>
    </a-table>
  </div>
</template>

<script>
import AIcon from 'ant-design-vue/es/icon/icon'
export default {
  name: 'MyMusicListTable',
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
        {title: '播放', dataIndex: 'id', sortable: 'true', scopedSlots: {customRender: 'play'}},
        {title: '标题', dataIndex: 'musicName', minWidth: '70%', sortable: 'true'},
        {title: '大小', dataIndex: 'musicSize', sortable: 'true'},
        {title: '下载', dataIndex: 'id', sortable: 'true', scopedSlots: {customRender: 'download'}},
        {title: '删除', dataIndex: 'id', sortable: 'true', scopedSlots: {customRender: 'delete'}}
      ]
    }
  },
  methods: {
    getColumns () {
      return this.musicListColumns.filter((column) => {
        return this.executionColumns.indexOf(column.dataIndex) === -1
      })
    },
    downloadMusic (id) {
      window.location.href = `http://localhost:9090/fg/music/download/${id}`
    },
    deleteMusic (id) {
      // debugger
      let music = {
        id: id
      }
      this.$store.dispatch('my_music_store/DELETE_MUSIC', music)
    }
  }
}

</script>
