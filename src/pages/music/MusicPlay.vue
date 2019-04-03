<template>
  <div>
    <!--<aplayer :audio="audio" :lrcType="3" />-->
    <aplayer :showLrc = true :music = "{
        title: this.musicName.name,
        artist: this.authorName.name,
        src: 'http://music.163.com/song/media/outer/url?id=' + this.$route.query.music_id,
        lrc: this.lrc.lyric,
        pic: this.musicPic.picUrl
      }"
    />
    <Spin size="large" fix v-if="musicCanPlayState === 'start'">
      <!--<Icon type="load-c" size=20 class="demo-spin-icon-load"></Icon><div>数据保存中……</div>-->
    </Spin>
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
      musicName: {
        name: null
      },
      musicPic: {
        picUrl: null
      },
      authorName: {
        name: null
      },
      lrc: {
        lyric: null
      }
    }
  },
  computed: {
    ...mapGetters([]),
    ...mapState({
      musicState: state => state.music_url_store.MusicName,
      musicPicState: state => state.music_url_store.MusicPic,
      musicAuthorState: state => state.music_url_store.AuthorName,
      musicLrcState: state => state.music_url_store.MusicLrc,
      musicCanPlayState: state => state.music_url_store.MusicCanPlay,
      musicCanPlayMessage: state => state.music_url_store.checkMessage
    })
  },
  methods: {
    initializeLoad () {
      this.$set(this, 'musicUrl', {})
      this.$set(this, 'author', {})
      this.$set(this, 'lrc', {})
      this.$store.dispatch('music_login_store/GET_USER_LOGIN')
      this.$store.dispatch('music_url_store/FETCH_MUSIC_URL', this.$route.query.music_id)
      this.$store.dispatch('music_url_store/FETCH_MUSIC_LRC', this.$route.query.music_id)
    }
  },
  watch: {
    musicState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.musicName = Object.assign({}, curVal)
        }
      },
      deep: true
    },
    musicPicState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.musicPic = Object.assign({}, curVal)
        }
      },
      deep: true
    },
    musicAuthorState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.authorName = Object.assign({}, curVal)
        }
      },
      deep: true
    },
    musicLrcState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.lrc = Object.assign({}, curVal)
        }
      },
      deep: true
    },
    musicCanPlayState (state) {
      if (state === 'error') {
        this.$message.warning('亲爱的,暂无版权')
      } else if (state === 'success') {
        this.$message.success(this.musicCanPlayMessage + ' 音乐加载成功!')
      }
    }
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
