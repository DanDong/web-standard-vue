<template>
  <div class="about">
    <el-container>
      <el-aside width="200px">
        <div class="side-bar">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @select="handleSelect">
            <el-menu-item index="0">
              <span slot="title">颜色</span>
            </el-menu-item>
            <el-menu-item index="1">
              <span slot="title">图标</span>
            </el-menu-item>
            <el-menu-item v-for="(item, index) in sideMenu" :index="String(index+2)" :key="item">
              <span slot="title">{{item | sideMenuFilter}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <div class="color-box" v-if="active == 0">
          <div class="theme-box" v-for="(item, key) in color" :key="key">
            <div class="title">{{key}}</div>
            <div class="color-list">
              <div class="color-item" v-for="(citem, ckey) in item" :key="ckey">
                <div class="color" :style="{background: citem}" title="点击复制变量" :data-clipboard-text="ckey"></div>
                <div class="color-txt">
                  <p class="key-word">{{ckey}}</p>
                  <p>{{citem}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="icon-box" v-if="active == 1">
          <el-tabs v-model="activeName">
            <el-tab-pane v-for="(item, index) in iconInfo" :key="index" :label="item.title" :name="item.code">
              <iframe class="iframe" :src="item.url" frameborder="0"></iframe>
            </el-tab-pane>
            <el-tab-pane label="svg图标" name="svg">
              <ul class="icon_lists dib-box">
                <li class="dib" v-for="(item, index) in svgList" :key="index">
                  <div class="svg-box"><span class="icon svg-icon" v-html="item.content"></span></div>
                  <div class="name">#{{item.name}}</div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-show="active != 0 && active != 1">
          <vue-markdown :source="md">加载失败...</vue-markdown>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import getMd from '@/mixins'
import { getSvg } from '@/api'

export default {
  name: 'About',
  mixins: [getMd],
  data() {
    return {
      active: 0,
      color: {},
      activeName: 'first',
      iconInfo: [],
      svgList: []
    }
  },
  components: {
    VueMarkdown
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getSideMenu(this.url)
      this.getColor()
      this.getSvg()
      if (window.config) {
        this.iconInfo = window.config.iconfont[this.project]
      }
    },
    getColor () {
      this.color = window.config.color[this.project]
    },
    handleSelect (index) {
      this.active = Number(index)
      if(index != 0 && index != 1) {
        this.getFile(this.sideMenu[index-2])
      }
    },
    async getSvg () {
      let query = {project: this.project}
      getSvg(query).then(res => {
        if(res.data.status === 200) {
          this.svgList = res.data.data
        } else {
          this.svgList = []
        }
      }).catch(_ => {
        this.svgList = []
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
.color-box{
  .theme-box{
    .title{
      color: #999;
      font-weight: bold;
      border-bottom: 1px dashed #999;
      line-height: 30px;
      margin-top: 20px;
    }
    .color-list{
      display: flex;
      flex-wrap: wrap;
      .color-item{
        width: 200px;
        height: 160px;
        margin: 20px;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
        transition: all .3s;
        .color{
          width: 100%;
          height: 100px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 6px 6px 0 0;
        }
        .color-txt{
          height: 60px;
          padding: 0 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          color: #666;
          .key-word{
            font-size: 18px;
          }
        }
        &:hover{
          transform: scale(1.1);
        }
      }
    }
  }
}
.icon-box{
  height: 100%;
  ::v-deep .el-tabs{
    height: 100%;
    .el-tabs__content{
      height: calc(100% - 55px);
      .el-tab-pane{
        height: 100%;
        overflow: auto;
        .iframe{
          width: 100%;
          height: 96%;
        }
      }
    }
  }
  .icon_lists{
    display: flex;
    li{
      list-style: none;
      width: 100px;
      margin-right: 20px;
      margin-bottom: 20px;
      .svg-box{
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .svg-icon {
        width: 200px;
        height: 200px;
        transform: scale(0.2);
        transition: all .25s;
        &:hover{
          transform: scale(0.4);
        }
      }
      .name {
        color:#666;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>