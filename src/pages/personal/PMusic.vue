<template>
  <div>
    <a-card>
      <a-upload-dragger v-if="userState.nickname" name="music" :multiple="true" action="http://localhost:9090/fg/music/upload" @change="handleChange" >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">单击或拖动音乐到此处上传</p>
        <!--<p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>-->
      </a-upload-dragger>
    </a-card>
    <a-card >
      <a-input-search v-if="userState.nickname"
        style="width: 230px"
        placeholder="音乐搜索"
        @search="onSearch"
        enterButton
      />
      <a-card v-if="userState.nickname" title="我的音乐" :bordered="false">
        <PMusicDisplay :musicList="musicList.datas"></PMusicDisplay>
      </a-card>
      <exception-page v-else type="403" />
    </a-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PMusicDisplay from './PMusicDisplay'
import ExceptionPage from '../../components/exception/ExceptionPage'
export default {
  name: 'MusicList',
  components: {PMusicDisplay, ExceptionPage},
  computed: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapState({
      musicList: state => state.my_music_store.fetchedList,
      userState: state => state.music_login_store.currentUser
    })
  },
  methods: {
    initializeFetch () {
      this.$store.dispatch('music_login_store/GET_USER_LOGIN')
      // this.$store.dispatch('music_list_store/FETCH_MUSIC_LIST')
    },
    onSearch (value) {
      this.$router.push({path: '/music/musicSearch', query: {keyWorlds: value}})
    },
    handleChange (info) {
      // this.$store.dispatch('my_music_store/UPLOAD_MUSIC' + info.file)
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} 音乐上传成功.`)
        this.$store.dispatch('my_music_store/FETCH_MY_MUSIC_LIST')
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 音乐上传失败.`)
      }
    }
  },
  watch: {
    userState (state) {
      // if (state.state === 'error') {
      //   this.$message.warning('尚未登陆，请登陆！')
      if (state.state === 'success') {
        this.$message.success(' 加载成功!')
        this.$store.dispatch('my_music_store/FETCH_MY_MUSIC_LIST')
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
