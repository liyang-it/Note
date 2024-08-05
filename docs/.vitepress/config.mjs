import {
  defineConfig
} from 'vitepress'

const fileAndStyles = {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/note/',
  title: "Note",
  titleTemplate: '笔记',
  description: "liyangme.top、我的笔记日志、LiYang、笔记、日志",
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.svg'
    }]
  ],
  assetsDir: 'static',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg', // 导航栏标题Logo
    siteTitle: 'Note', // 导航栏标题
    nav: [{ // 导航栏
        text: '首页',
        link: '/'
      },
      {
        text: '帮助',
        link: '/markdown-examples'
      }, {
        text: 'NaiveUI',
        link: '/naive/index'
      },
    ],

    sidebar: {
      '/naive/': [{ // 当用户位于 `naive` 目录时，会显示此侧边栏
        text: 'NaiveUI测试',
        items: [{
            text: 'Index',
            link: '/guide/'
          },
          {
            text: 'One',
            link: '/guide/one'
          },
          {
            text: 'Two',
            link: '/guide/two'
          }
        ]
      }]
    },
    socialLinks: [{ // 可以定义此选项以在导航栏中展示带有图标的社交帐户链接
      icon: 'twitter',
      link: 'http://liyangme.top'
    }],
    footer: { // 页脚
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023 <a href="http://liyangme.top" target="_blank">LiYang.</a>'
    },
    search: { // 多语言搜索
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
    }
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?. [1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?. [1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, style + '</head>')
    }
  }
})