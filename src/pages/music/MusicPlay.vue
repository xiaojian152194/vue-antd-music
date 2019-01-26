<template>
  <div>
    <!--<aplayer :audio="audio" :lrcType="3" />-->
    <aplayer :showLrc = true
    :music="{
    title: this.music.name,
    artist: this.author.name,
    src: 'http://music.163.com/song/media/outer/url?id=' + this.$route.query.music_id,
    lrc: this.lrc.lyric,
    pic: this.music.picUrl
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
  name: 'COM_YZJ_MUSIC_PLAY',
  components: { Aplayer },
  data () {
    return {
      music: {
        name: null,
        picUrl: null
      },
      author: {
        name: null
      },
      lrc: {
        lyric: null
      }
    }
  },
  computed: {
    ...mapGetters([
    ]),
    ...mapState({
      musicState: state => state.music_url_store.fetchedMusicList,
      musicAuthorState: state => state.music_url_store.fetchedAuthorList,
      musicLrcState: state => state.music_url_store.fetchedMusicLrc
    })
  },
  methods: {
    initializeLoad () {
      this.$store.dispatch('music_url_store/FETCH_MUSIC_URL', this.$route.query.music_id)
      this.$store.dispatch('music_url_store/FETCH_MUSIC_LRC', this.$route.query.music_id)
    }
  },
  watch: {
    musicState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.music = Object.assign({}, curVal)
        }
      },
      deep: true
    },
    musicAuthorState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.author = Object.assign({}, curVal)
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
    }
  },
  created () {
    this.initializeLoad()
  }
  // mounted () {
  //   this.initializeLoad()
  // }
}
</script>
