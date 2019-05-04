<template>
  <div>
    <a-table border :columns="getColumns()" :dataSource="musicList" ellipsis>
      <router-link slot="play" slot-scope="text" :to="{path:'/music/musicPlay', query:{music_id: text}}">
        <a-icon type="play-circle" style="margin-left: 7px"/>
      </router-link>
      <a slot="download" slot-scope="text" :href="'https://music.163.com/song/media/outer/url?id=' + text + '.mp3'">
        <a-icon type="download" style="margin-left: 7px"/>
      </a>
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
        {title: '播放', dataIndex: 'id', sortable: 'true', scopedSlots: {customRender: 'play'}},
        {title: '标题', dataIndex: 'name', sortable: 'true'},
        {title: '专辑', dataIndex: 'alia[0]', minWidth: '60%', sortable: 'true'},
        {title: '歌手', dataIndex: 'ar[0].name', sortable: 'true'},
        {title: '时长', dataIndex: 'dt', sortable: 'true', customRender: this.musicTimeFormatRender},
        {title: '下载', dataIndex: 'id', sortable: 'true', scopedSlots: {customRender: 'download'}}
      ]
    }
  },
  methods: {
    getColumns () {
      return this.musicListColumns.filter((column) => {
        return this.executionColumns.indexOf(column.dataIndex) === -1
      })
    }
    // downloadMusic (id) {
    //   window.open(`https://music.163.com/song/media/outer/url?id=${id}`)
    //   var $form = $('<form method="GET"></form>')
    //   $form.attr('action', '/download/papers/1')
    //   $form.appendTo($('body'))
    //   $form.submit()
    // }
  }
}

</script>
