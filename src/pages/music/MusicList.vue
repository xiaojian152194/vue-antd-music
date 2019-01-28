<template>
  <div>
    <a-card>
      <a-input-search
        style="width: 200px"
        placeholder="音乐搜索"
        enterButton
      />
      <a-card title="云音乐热歌榜" :bordered="false">
        <TableForm :musicList="musicList.tracks"></TableForm>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import StandardTable from '../../components/table/StandardTable'
import TableForm from '../form/advancedForm/TableForm'
export default {
  name: 'MusicList',
  components: {StandardTable, TableForm},
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
    }
  },
  mounted () {
    this.initializeFetch()
  }
  // activated () {
  //   this.initializeFetch()
  // }
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
