<template>
  <div>
    <a-card>
      <a-input-search
        style="width: 230px"
        placeholder="请输入歌曲名"
        @search="onSearch"
        enterButton
      />
      <a-card title="所有音乐" :bordered="false">
        <MusicDisplay :allMusicState="allMusicState.datas"></MusicDisplay>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MusicDisplay from './MusicDisplay'
export default {
  name: 'MusicList',
  components: {MusicDisplay},
  computed: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapState({
      allMusicState: state => state.my_music_store.AllMusic,
      musicDestroyingState: state => state.my_music_store.destroyingState,
      musicDestroyingErrorMessage: state => state.my_music_store.destroyingErrorMessage
    })
  },
  methods: {
    initializeFetch () {
      // this.$store.dispatch('music_login_store/GET_USER_LOGIN')
      this.$store.dispatch('my_music_store/FETCH_All_MUSIC')
    },
    onSearch (value) {
      let musicSearch = {
        likeMusicName: value
      }
      debugger
      this.$store.dispatch('my_music_store/SEARCH_MUSIC', musicSearch)
      // this.$router.push({path: '/music/musicSearch', query: {keyWorlds: value}})
    }
  },
  watch: {
    musicDestroyingState (state) {
      if (state === 'success') {
        this.$message.success('音乐删除成功')
        this.$store.dispatch('my_music_store/FETCH_All_MUSIC')
      }
      if (state === 'error') {
        this.$message.error(this.musicDestroyingErrorMessage)
      }
    },
    allMusicState (state) {
      if (state === 'success') {
        this.$message.success('加载成功')
      }
      if (state === 'error') {
        this.$message.error(this.musicDestroyingErrorMessage)
      }
    }
  },
  // mounted () {
  //   this.initializeFetch()
  // },
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
