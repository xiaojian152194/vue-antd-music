<template>
  <div>
    <!--<aplayer :audio="audio" :lrcType="3" />-->
    <aplayer
    :music="{
    title: this.music.name,
    artist: this.author.name,
    src: 'http://music.163.com/song/media/outer/url?id=' + this.$route.query.music_id,
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapState({
      musicState: state => state.music_url_store.fetchedMusicList,
      musicAuthorState: state => state.music_url_store.fetchedAuthorList
    })
  },
  methods: {
    initializeLoad () {
      // debugger
      this.$store.dispatch('music_url_store/FETCH_MUSIC_URL', this.$route.query.music_id)
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
