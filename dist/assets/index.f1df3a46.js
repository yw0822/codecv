import { i as e } from './index.93fcd833.js'
import { b as m, u as n } from './vue-router.bfd1ba04.js'
import { D as i, f as p, z as a, o as s, c } from './@vue.459e27cf.js'
import { _ } from './vue-markdown-menu-bar.54882429.js'
import './jspdf.93f2685e.js'
import './@babel.2898e469.js'
import './fflate.fca59393.js'
import './html2canvas.4d0ab5af.js'
import './config.965d0d02.js'
import './element-plus.2a6d07e1.js'
import './@element-plus.52ff3d2f.js'
import './@vueuse.b3f314cf.js'
import './dayjs.6d6bf3b5.js'
import './aos.e37f4dc9.js'
import './lodash-es.2fa8789e.js'
import './@ctrl.82a509e0.js'
import './async-validator.fb49d0f5.js'
import './index.2356ee1f.js'
import './pinia.6bd7cd5d.js'
import './vue-demi.b3a9cad9.js'
import './picture-verification-code.e81ffd11.js'
import './axios.754b77ca.js'
import './form-data.2b153385.js'
import './nprogress.8e3ae131.js'
const d = { class: 'markdown-transform-html jufe' },
  u = i({
    __name: 'index',
    setup(l) {
      const t = m(),
        r = n()
      return (
        p(() => {
          e(String(t.query.type))
          const o = JSON.parse(localStorage.getItem('download') || '')
          ;(document.querySelector('.markdown-transform-html').innerHTML = o),
            setTimeout(() => {
              window.print(), r.back()
            }, 100)
        }),
        a(() => {
          localStorage.removeItem('download')
        }),
        (o, f) => (s(), c('div', d))
      )
    }
  })
const O = _(u, [['__scopeId', 'data-v-6df6a732']])
export { O as default }
