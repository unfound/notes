module.exports = {
    title: '记事本',
    description: '用来记录平时的一些笔记和灵感',
    themeConfig: {
        nav: [
            { text: '记录', link: '/' }
        ],
        sidebar: {
            '/': [
                { text: '首页', link: '/' },
                {
                    text: '开发环境配置', link: '/env-setting/'
                },
                {
                    text: '前端资源', link: '/resource/'
                }, {
                    text: '游戏开发', link: '/games/'
                }, {
                    text: 'GIT相关', link: '/git/'
                }, {
                    text: '构建工具', link: '/build-tool/'
                }, {
                    text: '面试相关', link: '/audition/'
                }
            ]
        }
    }
}
