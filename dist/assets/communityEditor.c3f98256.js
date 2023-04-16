import { g as F, h as v } from './element-plus.2a6d07e1.js'
import {
  X as D,
  r as I,
  q as x,
  ar as h,
  a1 as k,
  D as S,
  o as f,
  c as y,
  a as n,
  J as A,
  aj as w,
  u as a,
  S as M,
  Q as T,
  M as V,
  a3 as q,
  P as $,
  at as z,
  au as H
} from './@vue.459e27cf.js'
import { u as L, g as N, T as O, w as U, e as j, s as R, c as J, p as K } from './index.2356ee1f.js'
import { u as P, b as Q } from './vue-router.bfd1ba04.js'
import { u as X, p as G, b as W } from './community.a40af039.js'
import { c as Y } from './@textbus.225898a1.js'
import './@tanbo.bd87cea7.js'
import { e as Z } from './@vueuse.b3f314cf.js'
import { _ as tt } from './vue-markdown-menu-bar.54882429.js'
import './@element-plus.52ff3d2f.js'
import './dayjs.6d6bf3b5.js'
import './aos.e37f4dc9.js'
import './lodash-es.2fa8789e.js'
import './@ctrl.82a509e0.js'
import './async-validator.fb49d0f5.js'
import './jspdf.93f2685e.js'
import './@babel.2898e469.js'
import './fflate.fca59393.js'
import './pinia.6bd7cd5d.js'
import './vue-demi.b3a9cad9.js'
import './picture-verification-code.e81ffd11.js'
import './axios.754b77ca.js'
import './form-data.2b153385.js'
import './nprogress.8e3ae131.js'
import './reflect-metadata.e8f3e0d5.js'
import './immer.10fc837a.js'
import './katex.32438624.js'
import './prismjs.a393ff7a.js'
function et() {
  const e = D({ professional: '', title: '' }),
    r = I(),
    c = P(),
    l = Q(),
    i = x(() => l.query.articleId)
  let t, u
  async function p() {
    var C
    const { loginState: s, loginModelToggle: B, userInfo: _ } = L()
    if (!s.logined || !N(O)) {
      B()
      return
    }
    if (!e.professional || !e.title.trim() || t.getContent() == '<br>') {
      U(
        '\u5185\u5BB9\u586B\u5199\u5B8C\u6574\u624D\u80FD\u8BA9\u5176\u4ED6\u540C\u5B66\u770B\u660E\u767D\uFF5E'
      )
      return
    }
    if (e.title.length > 20) {
      j('\u6807\u9898\u8FC7\u957F \u8BF7\u7F29\u51CF\u523020\u5B57\u4EE5\u5185\uFF5E')
      return
    }
    const E = document.createElement('div')
    E.innerHTML = t.getContent()
    let g = {
        ...e,
        content: t.getContent(),
        introduce: ((C = E.textContent) == null ? void 0 : C.slice(0, 255)) || '\u7B80\u4ECB',
        authorId: _.uid
      },
      m = 0
    if (i.value != null) {
      const d = Object.assign(g, { articleId: u.articleId }),
        { code: b } = await X(d)
      m = b
    } else {
      const { code: d } = await G(g)
      m = d
    }
    m == 200 && (c.back(), R('\u53D1\u5E03\u6210\u529F\uFF01'))
  }
  async function o() {
    i.value != null &&
      ((u = (await W({ articleId: parseInt(i.value) })).data),
      (e.title = u.title),
      (e.professional = u.professional),
      t.replaceContent(u.content))
  }
  return (
    h(() => {
      ;(t = Y({
        autoFocus: !0,
        zenCoding: !0,
        theme: 'dark',
        autoHeight: !0,
        minHeight: '400px',
        uploader: J,
        styleSheets: ['.tb-list-item { margin-left: 20px } .tb-pre { margin: 10px 0;}'],
        placeholder: '\u5185\u5BB9\u5C3D\u60C5\u53D1\u6325\uFF5E'
      })),
        setTimeout(() => {
          const s = document.querySelector('.textbus-ui-top')
          ;(s.style.position = 'sticky'), (s.style.top = '60px'), (s.style.zIndex = '99')
        }),
        t.mount(r.value),
        o()
    }),
    k(() => {
      ;(e.professional = ''), (e.title = ''), t == null || t.destroy()
    }),
    { article: e, publishArticle: Z(p, 1e3), articleEditor: r }
  )
}
const ot = e => (z('data-v-0317a1f2'), (e = e()), H(), e),
  rt = { class: 'article-editor content-card', 'data-aos': 'zoom-out' },
  ut = ot(() => n('br', null, null, -1)),
  at = S({
    __name: 'communityEditor',
    setup(e) {
      const { article: r, articleEditor: c, publishArticle: l } = et()
      return (i, t) => {
        const u = F,
          p = v
        return (
          f(),
          y('div', rt, [
            n(
              'span',
              { class: 'pointer back', onClick: t[0] || (t[0] = o => i.$router.back()) },
              '\u8FD4\u56DE'
            ),
            A(
              n(
                'input',
                {
                  class: 'title',
                  type: 'text',
                  'onUpdate:modelValue': t[1] || (t[1] = o => (a(r).title = o)),
                  placeholder:
                    '\u8BF7\u586B\u5199\u4E8C\u5341\u5B57\u4EE5\u5185\u7684\u6807\u9898~',
                  maxlength: '20'
                },
                null,
                512
              ),
              [[w, a(r).title]]
            ),
            n('div', { class: 'editor', ref_key: 'articleEditor', ref: c }, null, 512),
            M(
              p,
              {
                placeholder: '\u5C97\u4F4D\u65B9\u5411',
                class: 'item',
                modelValue: a(r).professional,
                'onUpdate:modelValue': t[2] || (t[2] = o => (a(r).professional = o))
              },
              {
                default: T(() => [
                  (f(!0),
                  y(
                    V,
                    null,
                    q(a(K), o => (f(), $(u, { value: o, label: o }, null, 8, ['value', 'label']))),
                    256
                  ))
                ]),
                _: 1
              },
              8,
              ['modelValue']
            ),
            ut,
            n(
              'button',
              { class: 'item primary btn', onClick: t[3] || (t[3] = (...o) => a(l) && a(l)(...o)) },
              '\u53D1\u5E03'
            ),
            n(
              'button',
              { class: 'item plain btn', onClick: t[4] || (t[4] = o => i.$router.back()) },
              '\u8FD4\u56DE'
            )
          ])
        )
      }
    }
  })
const Vt = tt(at, [['__scopeId', 'data-v-0317a1f2']])
export { Vt as default }
