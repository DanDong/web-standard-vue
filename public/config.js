var config = {
  host: 'http://127.0.0.1:8088',
  title: '七月',
  iconfont: {
    pro01: [
      {
        url: 'http://127.0.0.1:8088/pro01/iconfont/01/index.html',
        title: '第一个图标文件',
        code: 'first'
      },
      {
        url: 'http://127.0.0.1:8088/pro01/iconfont/01/index.html',
        title: '第二个图标文件',
        code: 'sencod'
      }
    ],
    pro02: [
      {
        url: 'http://127.0.0.1:8088/pro02/iconfont/01/index.html',
        title: '第一个图标文件',
        code: 'first'
      }
    ]
  },
  projectList: [
    {
      name: '项目一',
      code: 'pro01'
    },
    {
      name: '项目二',
      code: 'pro02'
    },
    {
      name: '项目三',
      code: 'pro03'
    }
  ],
  color: {
    pro01: {
      theme01: {
        '$paramy': '#333',
        '$danger': '#ff0000',
        '$white': '#fff'
      },
      theme02: {
        '$paramy': '#00ff00',
        '$danger': '#ff0000'
      }
    },
    pro02: {
      theme01: {
        '$paramy': '#333',
        '$danger': '#ff0000',
        '$white': '#fff'
      }
    }
  }
}
document.title = config.title
