<template>
  <div>
    <!-- <aplayer :audio="audio" :lrcType="3" :mini="false" fixed /> -->
    <aplayer :list="[]"
             :music="{
              title: '第三人称（Cover Hush！）',
              artist: '买辣椒也用券',
              src: 'http://music.163.com/song/media/outer/url?id=502043537',
              pic: 'https://p1.music.126.net/gZ4VUKzlS5Nk1DTmlicb7w==/109951163013152269.jpg?param=34y34'
              }"
    />
  </div>
</template>

<script>
// import Vue from 'vue'
import Aplayer from 'vue-aplayer'
// Vue.use(APlayer)
export default {
  name: 'MusicPlayer',
  components: { Aplayer },
  data () {
  },
  methods: {
  }
}
</script>
