<template>
  <div>
    <a-card>
      <a-input-search
        style="width: 500px; margin-left: 25%"
        placeholder="音乐搜索"
        @search="onSearch"
        enterButton
      />
      <a-card title="音乐搜索列表" :bordered="false">
        <MusicSearchForm :musicList="musicList.songs"></MusicSearchForm>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import StandardTable from '../../components/table/StandardTable'
import MusicSearchForm from '../form/advancedForm/MusicSearchForm'
export default {
  name: 'MusicList',
  components: {StandardTable, MusicSearchForm},
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
      // debugger
      if (this.$route.query.keyWorlds !== undefined) {
        let value = this.$route.query.keyWorlds
        this.$store.dispatch('music_list_store/FETCH_MUSIC', value)
      }
    },
    onSearch (value) {
      this.$store.dispatch('music_list_store/FETCH_MUSIC', value)
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
