<template>
  <div class="about">
    <el-container>
      <el-aside width="200px">
        <div class="side-bar">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @select="handleSelect">
            <el-menu-item v-for="(item, index) in sideMenu" :index="String(index)" :key="item">
              <span slot="title">{{item | sideMenuFilter}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <vue-markdown :source="md">加载失败...</vue-markdown>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import getMd from '@/mixins'

export default {
  name: 'About',
  mixins: [getMd],
  data() {
    return {

    }
  },
  components: {
    VueMarkdown
  },
  mounted() {
    this.url = this.$route.path
    this.getSideMenu(this.url)
  }
}
</script>

