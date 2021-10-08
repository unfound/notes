import DefaultTheme from 'vitepress/theme'
import Iconify from '../components/Iconify.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('Iconify', Iconify)
    }
}