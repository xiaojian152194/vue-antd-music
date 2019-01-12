<template>
  <div>
    <!--<aplayer :audio="audio" :lrcType="3" />-->
    <aplayer :list="[]"
    :music="{
    title: '第三人称（Cover Hush！）',
    artist: '买辣椒也用券',
    src: 'http://music.163.com/song/media/outer/url?id=' + this.$route.query.music_id,
    pic: 'https://p1.music.126.net/gZ4VUKzlS5Nk1DTmlicb7w==/109951163013152269.jpg?param=34y34'
    }"
    />
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  name: 'MusicPlay',
  components: { Aplayer },
  data () {
    return {
      audio: [
        {
          name: '东西（Cover：林俊呈）',
          artist: '纳豆',
          url: 'https://music.163.com/song/media/outer/url?id=' + this.$route.query.music_id,
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc'
        }
      ]
    }
  },
  methods: {
    // initializeLoad () {
    //   this.musicId = this.$route.query.music_id
    // }
  },
  mounted () {
    // this.initializeLoad()
  }
}
</script>
