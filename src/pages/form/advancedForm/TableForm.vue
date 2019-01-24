<template>
  <div>
    <a-table border :columns="getColumns()" :dataSource="musicList" ellipsis>
        <!--<a slot="name" slot-scope="text" :onclick="getMusicId(text)">{{text}}</a>-->
      <!-- <router-link slot="name" slot-scope="text" :to="{path:'/music/musicPlay', query:{music_id: text}}">{{text}}
      </router-link> -->
      <a slot="name" slot-scope="text" >{{text}}
      </a>
    </a-table>
    <aplayer :list="[]"
             :music="{
              title: '第三人称（Cover Hush！）',
              artist: '买辣椒也用券',
              src: 'http://music.163.com/song/media/outer/url?id=529668356',
              pic: 'https://p1.music.126.net/gZ4VUKzlS5Nk1DTmlicb7w==/109951163013152269.jpg?param=34y34'
              }"
    />
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  name: 'MusicListTable',
  components: { Aplayer },
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
        { title: '标题', dataIndex: 'name', width: '65%', sortable: 'true', scopedSlots: { customRender: 'name' } },
        { title: '时长', dataIndex: 'dt', width: '15%', sortable: 'true', render: this.musicTimeFormatRender },
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
