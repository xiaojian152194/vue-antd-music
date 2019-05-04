<template>
  <div>
    <!--<aplayer :audio="audio" :lrcType="3" />-->
    <aplayer :showLrc = true :music = "{
        title: this.myMusic.musicName,
        artist: '我的音乐',
        src: 'http://localhost:9090/' + this.myMusic.musicRealName,
        pic: 'http://localhost:9090/static/img/1.png'
      }"
    />
  </div>
</template>

<script>
// import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import Aplayer from 'vue-aplayer'
// Vue.use(Aplayer)
export default {
  name: 'MusicPlay',
  components: {Aplayer},
  data () {
    return {
      myMusic: {
        musicName: null,
        musicRealName: null
      }
    }
  },
  computed: {
    ...mapGetters([]),
    ...mapState({
      musicState: state => state.my_music_store.myMusic
      // musicPicState: state => state.music_url_store.MusicPic,
      // musicAuthorState: state => state.music_url_store.AuthorName,
      // musicLrcState: state => state.music_url_store.MusicLrc,
      // musicCanPlayState: state => state.music_url_store.MusicCanPlay,
      // musicCanPlayMessage: state => state.music_url_store.checkMessage
    })
  },
  methods: {
    initializeLoad () {
      // this.$set(this, 'musicUrl', {})
      // this.$set(this, 'author', {})
      // this.$set(this, 'lrc', {})
      this.$store.dispatch('music_login_store/GET_USER_LOGIN')
      this.$store.dispatch('my_music_store/FETCH_MY_MUSIC', this.$route.query.music_id)
      // this.$store.dispatch('music_url_store/FETCH_MUSIC_LRC', this.$route.query.music_id)
    }
  },
  watch: {
    musicState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.myMusic = Object.assign({}, curVal)
        }
      },
      deep: true
    }
    // musicPicState: {
    //   handler (curVal, oldVal) {
    //     if (curVal) {
    //       this.musicPic = Object.assign({}, curVal)
    //     }
    //   },
    //   deep: true
    // },
    // musicAuthorState: {
    //   handler (curVal, oldVal) {
    //     if (curVal) {
    //       this.authorName = Object.assign({}, curVal)
    //     }
    //   },
    //   deep: true
    // },
    // musicLrcState: {
    //   handler (curVal, oldVal) {
    //     if (curVal) {
    //       this.lrc = Object.assign({}, curVal)
    //     }
    //   },
    //   deep: true
    // },
    // musicCanPlayState (state) {
    //   if (state === 'error') {
    //     this.$message.warning('亲爱的,暂无版权')
    //   } else if (state === 'success') {
    //     this.$message.success(this.musicCanPlayMessage + ' 音乐加载成功!')
    //   }
    // }
  },
  // created () {
  //   this.initializeLoad()
  // },
  activated () {
    this.initializeLoad()
  }
  // mounted () {
  //   this.initializeLoad()
  // }
}
</script>
