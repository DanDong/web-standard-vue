<template>
  <div class="container">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <div class="content">
        <router-view></router-view>
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  data () {
    return {
      
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.container{
  .el-header{
    padding: 0;
  }
  .side-bar{
    margin-left: 50px;
    margin-top: 50px;
    height: calc(100vh - 150px);
    .el-menu-item{
      padding: 20px;
      height: auto;
      line-height: 1em;
      span{
        white-space: normal;
      }
    }
  }
  .content{
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    margin-top: 30px;
    h1,h2,h3{
      margin: 10px 0;
    }
    ul{
      margin: 10px 0;
    }
    li{
      list-style: square inside;
      &>p{
        display: inline;
      }
      &>ul{
        margin-left: 20px;
        li{
          list-style: circle inside;
        }
      }
      &>ol{
        margin-left: 20px;
      }
    }
    ol{
      margin: 5px 0;
      li{
        list-style: decimal inside !important;
      }
    }
    .contains-task-list{
      li{
       list-style: none; 
      }
    }
    .table{
      width: 100%;
      font-family: verdana,arial,sans-serif;
      font-size:11px;
      color:#333333;
      border-width: 1px;
      border-color: #666666;
      border-collapse: collapse;
      margin: 10px 0;
      th {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #666666;
        background-color: #dedede;
      }
      td {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #666666;
        background-color: #ffffff;
      }
    }
    blockquote{
      padding: 20px;
      border-radius: 6px;
      background: #ecf8ff;
      border-left: 5px solid #50bfff;
      word-break: break-word!important;
      font-size: 16px;
      font-weight: 400;
      line-height: 30px;
      margin: 10px 0;
    }
    code{
      margin: 10px 0;
      border: 1px solid #eaeefb;
      border-radius: 6px;
      background: #fafafa;
      padding: 0.3em;
      line-height: 1.5em;
    }
    pre{
      code{
        padding: 1.3em;
      }
    }
    p>code{
      color: #aa0d91;
    }
    img{
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
  }
  .el-main{
    height: calc(100vh - 90px);
    overflow: auto;
  }
  .side-bar{
    ul{
      li{
        list-style: none;
      }
    }
  }
}
</style>
