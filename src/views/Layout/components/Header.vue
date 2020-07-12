<template>
  <div class="header">
    <div class="content">
      <div class="logo">前端规范平台</div>
      <div class="menu-box">
        <ul>
          <li v-for="(item, index) in menu"
            :key="item.url"
            :class="{active: active === index}"
            @click="handleMenu(index, item.url)">
            <span>{{item.txt}}</span>
          </li>
        </ul>
        <el-dropdown trigger="click" class="project-list" @command="handleProject">
          <span class="el-dropdown-link">
            {{currentPro}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in projectList" :key="item.code" :command="item.code">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      
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
      active: 0,
      currentPro: '项目一',
      projectList: []
    }
  },
  mounted() {
    this.projectList = window.config.projectList
    if (this.$route.path) {
      this.active = this.menu.findIndex(item => this.$route.path == item.url)
    }
    // 如果本地存储了项目就设置当前项目名称
    if (localStorage.getItem('project')) {
      for(let i=0; i<this.projectList.length; i++) {
        if (this.projectList[i].code === localStorage.getItem('project')) {
          this.currentPro = this.projectList[i].name
          this.$store.commit('setProject', localStorage.getItem('project'))
        }
      }
    } else {
      localStorage.setItem('project',this.projectList[0].code)
      this.currentPro = this.projectList[0].name
      this.$store.commit('setProject', this.projectList[0].code)
    }
  },
  methods: {
    handleMenu(index, url) {
      this.active = index
      this.$router.push(url)
      this.$emit('clickMenu', url)
    },
    handleProject(code) {
      for(let i=0; i<this.projectList.length; i++) {
        if (this.projectList[i].code === code) {
          this.currentPro = this.projectList[i].name
        }
      }
      localStorage.setItem('project',code)
      this.$store.commit('setProject', code)
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
      .menu-box{
        display: flex;
        align-items: center;
        .project-list{
          margin: 0 30px;
          cursor: pointer;
          font-size: 14px;
          color: #666;
          &:hover{
            color:#1989fa;
          }
        }
      }
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
