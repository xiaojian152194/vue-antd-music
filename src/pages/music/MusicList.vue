<template>
  <div>
    <a-card>
      <a-input-search
        style="width: 230px"
        placeholder="音乐搜索"
        @search="onSearch"
        enterButton
      />
      <a-card title="云音乐热歌榜" :bordered="false">
        <MusicListDisplay :musicList="musicList.tracks"></MusicListDisplay>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MusicListDisplay from './MusicListDisplay'
export default {
  name: 'MusicList',
  components: {MusicListDisplay},
  computed: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapState({
      musicList: state => state.music_list_store.fetchedList
    })
  },
  methods: {
    initializeFetch () {
      this.$store.dispatch('music_list_store/FETCH_MUSIC_LIST')
    },
    onSearch (value) {
      this.$router.push({path: '/music/musicSearch', query: {keyWorlds: value}})
    }
  },
  mounted () {
    this.initializeFetch()
  },
  activated () {
    this.initializeFetch()
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
