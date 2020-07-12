import { getFile, getSideMenu } from '@/api/index'
import hljs from 'highlight.js'

export default {
    data () {
        return {
            md: '',
            sideMenu: [],
            url: this.$route.path
        }
    },
    computed: {
        project(){
            return this.$store.state.project
        }
    },
    watch: {
        project(val) {
            this.init()
        }
    },
    methods: {
        getSideMenu (url, project = this.$store.state.project) {
            const query = { url, project }
            getSideMenu(query).then(res => {
                if (res.data.status === 200) {
                    this.sideMenu = res.data.data
                    res.data.data.length && this.getFile(res.data.data[0])  
                } else {
                    this.sideMenu = []
                }
            }).catch(_ => {
                this.sideMenu = []
                this.md = '加载失败...'
            })
        },
        getFile (name, project = this.$store.state.project) {
            let query = { url: this.url, name, project }
            getFile(query).then(res => {
                if (res.data.status === 200) {
                    this.md = res.data.data
                    this.highlight()
                } else {
                    this.md = '加载失败...'
                }
            }).catch(_ => {
                this.md = '加载失败...'
            })
        },
        handleSelect (index) {
            this.sideMenu.length && this.getFile(this.sideMenu[index])
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