<template>
  <div class="exception">
    <div class="img">
      <img src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg" />
      <!--<div class="ele" :style="{backgroundImage: `url(${config[type].img})`}"/>-->
    </div>
    <div class="content">
      <h1>需要管理员身份</h1>
      <div class="desc">抱歉，你无权访问该页面！</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExceptionPage'
}
</script>

<style lang="less" scoped>
  .exception{
    min-height: 500px;
    height: 80%;
    align-items: center;
    text-align: center;
    margin-top: 150px;
    .img{
      display: inline-block;
      padding-right: 52px;
      zoom: 1;
      img{
        height: 360px;
        max-width: 430px;
      }
    }
    .content{
      display: inline-block;
      flex: auto;
      h1{
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      .desc{
        color: rgba(0,0,0,.45);
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
    }
  }

</style>
