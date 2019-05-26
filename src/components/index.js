import footer from './public/footer'
import Content from './public/Content'
import Screen from './public/Screen'
import Heads from './public/Heads'
import addCart from './addCart'
import search from './public/search'
import Icon from './public/Icon'
import Avatar from './public/Avatar'
import rate from './rate'
import upimg from './upimg'

const components = {
    footer,
    Content,
    Screen,
    Heads,
    search,
    Icon,
    Avatar,
    addCart,
    rate,
    upimg
}

export default {
    install(Vue) {
        Object.keys(components).map(key=>{
            const cp = components[key]
            Vue.component(cp.name,cp)
        })
    }
}