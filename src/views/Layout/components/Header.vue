<template>
  <div class="header">
    <div class="content">
      <div class="logo">前端规范平台</div>
      <ul>
        <li v-for="(item, index) in menu"
          :key="item.url"
          :class="{active: active === index}"
          @click="handleMenu(index, item.url)">
          <span>{{item.txt}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          txt: '规范',
          url: '/home'
        },
        {
          txt: '组件',
          url: '/component'
        },
        {
          txt: '方法',
          url: '/method'
        },
        {
          txt: '样式',
          url: '/rule'
        },
        {
          txt: '其他',
          url: '/more'
        }
      ],
      active: 0
    }
  },
  mounted() {
    if (this.$route.path) {
      this.active = this.menu.findIndex(item => this.$route.path == item.url)
    }
  },
  methods: {
    handleMenu(index, url) {
      this.active = index
      this.$router.push(url)
      this.$emit('clickMenu', url)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    border-bottom: 1px solid rgb(9, 118, 190);
    .content{
      width: 100%;
      max-width: 1600px;
      height: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo{
      margin-left: 30px;
      font-size: 20px;
      font-weight: 600;
      color: #1989fa;
    }
    ul{
      display: flex;
      margin-right: 30px;
      li{
        display: flex;
        align-items: center;
        height: 60px;
        padding: 0 20px;
        cursor: pointer;
        box-sizing: border-box;
        &:hover{
          color: #1989fa;
          border-bottom: 2px solid #1989fa;
          span{
            position: relative;
            top: 1px;
          }
        }
      }
      .active{
        color: #1989fa;
        border-bottom: 2px solid #1989fa;
        span{
          position: relative;
          top: 1px;
        }
      }
    }
  }
</style>
