import { c as v } from './aos.e37f4dc9.js'
import { p as w } from './performance-now.81e75aad.js'
var p = { exports: {} },
  x = w.exports,
  a = typeof window > 'u' ? v : window,
  s = ['moz', 'webkit'],
  t = 'AnimationFrame',
  o = a['request' + t],
  l = a['cancel' + t] || a['cancelRequest' + t]
for (var c = 0; !o && c < s.length; c++)
  (o = a[s[c] + 'Request' + t]), (l = a[s[c] + 'Cancel' + t] || a[s[c] + 'CancelRequest' + t])
if (!o || !l) {
  var m = 0,
    d = 0,
    e = [],
    g = 1e3 / 60
  ;(o = function (n) {
    if (e.length === 0) {
      var r = x(),
        h = Math.max(0, g - (r - m))
      ;(m = h + r),
        setTimeout(function () {
          var i = e.slice(0)
          e.length = 0
          for (var f = 0; f < i.length; f++)
            if (!i[f].cancelled)
              try {
                i[f].callback(m)
              } catch (u) {
                setTimeout(function () {
                  throw u
                }, 0)
              }
        }, Math.round(h))
    }
    return e.push({ handle: ++d, callback: n, cancelled: !1 }), d
  }),
    (l = function (n) {
      for (var r = 0; r < e.length; r++) e[r].handle === n && (e[r].cancelled = !0)
    })
}
p.exports = function (n) {
  return o.call(a, n)
}
p.exports.cancel = function () {
  l.apply(a, arguments)
}
p.exports.polyfill = function (n) {
  n || (n = a), (n.requestAnimationFrame = o), (n.cancelAnimationFrame = l)
}
export { p as r }
