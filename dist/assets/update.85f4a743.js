import { z as i, A as m } from './element-plus.2a6d07e1.js'
import {
  D as p,
  o as t,
  c as E,
  S as C,
  Q as B,
  M as r,
  a3 as D,
  P as c,
  a as e,
  U as o,
  u as _,
  at as A,
  au as l
} from './@vue.459e27cf.js'
import { _ as d } from './vue-markdown-menu-bar.54882429.js'
import './@element-plus.52ff3d2f.js'
import './@vueuse.b3f314cf.js'
import './dayjs.6d6bf3b5.js'
import './aos.e37f4dc9.js'
import './lodash-es.2fa8789e.js'
import './@ctrl.82a509e0.js'
import './async-validator.fb49d0f5.js'
const f = [
    {
      content:
        '\u65B0\u589EUI\u8BBE\u8BA1\u5E08\u6A21\u677F\u3001\u7F16\u8F91\u5668\u4E2D\u5220\u9664\u7EBF\u8BED\u6CD5\u3001\u4E00\u952E\u91CD\u7F6E\u7B80\u5386\u5185\u5BB9\u5230\u521D\u59CB\u72B6\u6001\uFF08\u4E0D\u53EF\u9006\uFF0C\u64CD\u4F5C\u524D\u8BF7\u6CE8\u610F\uFF01\uFF09\u529F\u80FD\uFF0C\u4FEE\u590D\u5DF2\u6709BUG\u3002',
      timestamp: '2023-03-13',
      version: '1.3.4'
    },
    {
      content:
        '\u65B0\u589E\u591A\u79CD\u6A21\u677F\uFF1A\u5546\u52A1\u3001\u793E\u62DB\u7C7B\uFF0C\u4E0A\u4F20\u8BC1\u4EF6\u7167\u3001\u81EA\u5B9A\u4E49\u4E3B\u8272\u8C03\u3001\u5B57\u4F53\u989C\u8272\u529F\u80FD\uFF0C\u5E76\u4F18\u5316\u81EA\u52A8\u4E00\u9875\u529F\u80FD\uFF0C\u7531\u4E8E\u6BCF\u79CD\u6A21\u677F\u7684\u95F4\u8DDD\u90FD\u4E0D\u592A\u4E00\u6837\uFF0C\u4E2A\u522B\u6A21\u677F\u6216\u8BB8\u4F1A\u6709\u5FAE\u5C0F\u7684\u8BEF\u5DEE\uFF0C\u53EF\u624B\u52A8\u8FDB\u884C\u8C03\u6574\uFF08\u624B\u52A8\u589E\u5220\u90E8\u5206\u6587\u5B57\u5373\u53EF\uFF09.',
      timestamp: '2022-11-19',
      version: '1.3.3'
    },
    {
      content:
        '\u65B0\u589E\u5B57\u4F53\u9009\u62E9\u3001\u52A0\u8F7D\u52A8\u753B\u3001\u6587\u4EF6\u5BFC\u5165\u5BFC\u51FA\u3001\u7F16\u8F91\u5668\u6A21\u5F0F\u66FF\u6362\u8F93\u5165\u6846\uFF0C\u4F18\u5316\u7B80\u5386\u64CD\u4F5C\u680F\u6392\u7248\uFF0C\u4FEE\u590D\u7B80\u5386\u4E2D\u56FE\u7247\u663E\u793A\u7684\u95EE\u9898.',
      timestamp: '2022-11-06',
      version: '1.3.2'
    },
    {
      content:
        '\u65B0\u589E\u8BED\u6CD5\u5C0F\u52A9\u624B\uFF0C\u4F60\u53EF\u4EE5\u53BB\u8BED\u6CD5\u5C0F\u52A9\u624B\u5B66\u4E60\u7F16\u5199\u7B80\u5386\u53EF\u80FD\u4F1A\u7528\u5230\u7684\u4E00\u4E9B\u7279\u6B8A\u8BED\u6CD5.',
      timestamp: '2022-11-03',
      version: '1.3.1'
    },
    {
      content:
        '\u65B0\u589E\u5B9E\u65F6\u5206\u9875\u663E\u793A\u3001\u4F18\u5316\u5BFC\u51FAPDF\u7684\u65B9\u5F0F\uFF0C\u63D0\u4F9B\u4E86\u539F\u751F\u548C\u52A8\u6001\u8BA1\u7B97\u4E24\u79CD\u5BFC\u51FA\u65B9\u5F0F\uFF0C\u53EF\u4EE5\u6839\u636E\u81EA\u5DF1\u7684\u504F\u597D\u9009\u62E9.',
      timestamp: '2022-11-02',
      version: '1.3.0'
    }
  ],
  v = u => (A('data-v-2227bf21'), (u = u()), l(), u),
  h = { class: 'time-line', 'data-aos': 'fade-right' },
  y = v(() => e('h3', null, '\u5386\u53F2\u7248\u672C', -1)),
  I = p({
    __name: 'update',
    setup(u) {
      return (x, S) => {
        const a = i,
          s = m
        return (
          t(),
          E('div', h, [
            y,
            C(s, null, {
              default: B(() => [
                (t(!0),
                E(
                  r,
                  null,
                  D(
                    _(f),
                    (F, n) => (
                      t(),
                      c(
                        a,
                        { type: 'primary', key: n, timestamp: F.timestamp },
                        {
                          default: B(() => [
                            e('p', null, o(F.version), 1),
                            e('p', null, o(F.content), 1)
                          ]),
                          _: 2
                        },
                        1032,
                        ['timestamp']
                      )
                    )
                  ),
                  128
                ))
              ]),
              _: 1
            })
          ])
        )
      }
    }
  })
const z = d(I, [['__scopeId', 'data-v-2227bf21']])
export { z as default }
