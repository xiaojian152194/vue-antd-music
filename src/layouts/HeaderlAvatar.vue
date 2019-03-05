<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer" v-if="currUser.nickname">
      <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
      <span>{{currUser.nickname}}</span>
    </span>
    <span style="cursor: pointer" v-else>
      <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
      <span>用户名</span>
    </span>
    <a-menu style="width: 150px" slot="overlay">
      <a-menu-item>
        <router-link to="/personal/pmusic" v-if="currUser.nickname">
          <a-icon type="user" />
          <span>个人中心</span>
        </router-link>
        <router-link to="/login" v-else>
          <a-icon type="user" />
          <span>登陆</span>
        </router-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <router-link to="/login">
        <a-icon type="poweroff" />
        <span>退出登录</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>

</template>

<script>
export default {
  name: 'HeaderAvatar',
  computed: {
    currUser () {
      return this.$store.state.music_login_store.currentUser
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
</style>
