import { getFile, getSideMenu } from '@/api/index'
import hljs from 'highlight.js'

export default {
    data () {
        return {
            md: '',
            sideMenu: [],
            url: ''
        }
    },
    methods: {
        getSideMenu (url) {
            const query = { url }
            getSideMenu(query).then(res => {
                if (res.data.status === 200) {
                    this.sideMenu = res.data.data
                    res.data.data.length && this.getFile(res.data.data[0])  
                } else {
                    this.sideMenu = []
                }
            })
        },
        getFile (name) {
            let query = { url: this.url, name }
            getFile(query).then(res => {
                if (res.data.status === 200) {
                    this.md = res.data.data
                    this.highlight()
                } else {
                    this.md = '加载失败...'
                }
            })
        },
        handleSelect (index) {
            this.getFile(this.sideMenu[index])
        },
        highlight () {
            setTimeout(() => {
                let blocks = document.querySelectorAll('pre code')
                blocks.forEach((block)=>{
                    hljs.highlightBlock(block)
                })
            }, 10)
        }
    }
}