let es = 0
class Wt {
  constructor(t, e) {
    ;(this.from = t), (this.to = e)
  }
}
class w {
  constructor(t = {}) {
    ;(this.id = es++),
      (this.perNode = !!t.perNode),
      (this.deserialize =
        t.deserialize ||
        (() => {
          throw new Error("This node type doesn't define a deserialize function")
        }))
  }
  add(t) {
    if (this.perNode) throw new RangeError("Can't add per-node props to node types")
    return (
      typeof t != 'function' && (t = E.match(t)),
      e => {
        let s = t(e)
        return s === void 0 ? null : [this, s]
      }
    )
  }
}
w.closedBy = new w({ deserialize: r => r.split(' ') })
w.openedBy = new w({ deserialize: r => r.split(' ') })
w.group = new w({ deserialize: r => r.split(' ') })
w.contextHash = new w({ perNode: !0 })
w.lookAhead = new w({ perNode: !0 })
w.mounted = new w({ perNode: !0 })
const ss = Object.create(null)
class E {
  constructor(t, e, s, i = 0) {
    ;(this.name = t), (this.props = e), (this.id = s), (this.flags = i)
  }
  static define(t) {
    let e = t.props && t.props.length ? Object.create(null) : ss,
      s = (t.top ? 1 : 0) | (t.skipped ? 2 : 0) | (t.error ? 4 : 0) | (t.name == null ? 8 : 0),
      i = new E(t.name || '', e, t.id, s)
    if (t.props) {
      for (let n of t.props)
        if ((Array.isArray(n) || (n = n(i)), n)) {
          if (n[0].perNode) throw new RangeError("Can't store a per-node prop on a node type")
          e[n[0].id] = n[1]
        }
    }
    return i
  }
  prop(t) {
    return this.props[t.id]
  }
  get isTop() {
    return (this.flags & 1) > 0
  }
  get isSkipped() {
    return (this.flags & 2) > 0
  }
  get isError() {
    return (this.flags & 4) > 0
  }
  get isAnonymous() {
    return (this.flags & 8) > 0
  }
  is(t) {
    if (typeof t == 'string') {
      if (this.name == t) return !0
      let e = this.prop(w.group)
      return e ? e.indexOf(t) > -1 : !1
    }
    return this.id == t
  }
  static match(t) {
    let e = Object.create(null)
    for (let s in t) for (let i of s.split(' ')) e[i] = t[s]
    return s => {
      for (let i = s.prop(w.group), n = -1; n < (i ? i.length : 0); n++) {
        let o = e[n < 0 ? s.name : i[n]]
        if (o) return o
      }
    }
  }
}
E.none = new E('', Object.create(null), 0, 8)
class Ot {
  constructor(t) {
    this.types = t
    for (let e = 0; e < t.length; e++)
      if (t[e].id != e)
        throw new RangeError(
          'Node type ids should correspond to array positions when creating a node set'
        )
  }
  extend(...t) {
    let e = []
    for (let s of this.types) {
      let i = null
      for (let n of t) {
        let o = n(s)
        o && (i || (i = Object.assign({}, s.props)), (i[o[0].id] = o[1]))
      }
      e.push(i ? new E(s.name, i, s.id, s.flags) : s)
    }
    return new Ot(e)
  }
}
const kt = new WeakMap(),
  ae = new WeakMap()
var I
;(function (r) {
  ;(r[(r.ExcludeBuffers = 1)] = 'ExcludeBuffers'),
    (r[(r.IncludeAnonymous = 2)] = 'IncludeAnonymous'),
    (r[(r.IgnoreMounts = 4)] = 'IgnoreMounts'),
    (r[(r.IgnoreOverlays = 8)] = 'IgnoreOverlays')
})(I || (I = {}))
class v {
  constructor(t, e, s, i, n) {
    if (
      ((this.type = t),
      (this.children = e),
      (this.positions = s),
      (this.length = i),
      (this.props = null),
      n && n.length)
    ) {
      this.props = Object.create(null)
      for (let [o, a] of n) this.props[typeof o == 'number' ? o : o.id] = a
    }
  }
  toString() {
    let t = this.prop(w.mounted)
    if (t && !t.overlay) return t.tree.toString()
    let e = ''
    for (let s of this.children) {
      let i = s.toString()
      i && (e && (e += ','), (e += i))
    }
    return this.type.name
      ? (/\W/.test(this.type.name) && !this.type.isError
          ? JSON.stringify(this.type.name)
          : this.type.name) + (e.length ? '(' + e + ')' : '')
      : e
  }
  cursor(t = 0) {
    return new Nt(this.topNode, t)
  }
  cursorAt(t, e = 0, s = 0) {
    let i = kt.get(this) || this.topNode,
      n = new Nt(i)
    return n.moveTo(t, e), kt.set(this, n._tree), n
  }
  get topNode() {
    return new Y(this, 0, 0, null)
  }
  resolve(t, e = 0) {
    let s = at(kt.get(this) || this.topNode, t, e, !1)
    return kt.set(this, s), s
  }
  resolveInner(t, e = 0) {
    let s = at(ae.get(this) || this.topNode, t, e, !0)
    return ae.set(this, s), s
  }
  iterate(t) {
    let { enter: e, leave: s, from: i = 0, to: n = this.length } = t
    for (let o = this.cursor((t.mode || 0) | I.IncludeAnonymous); ; ) {
      let a = !1
      if (o.from <= n && o.to >= i && (o.type.isAnonymous || e(o) !== !1)) {
        if (o.firstChild()) continue
        a = !0
      }
      for (; a && s && !o.type.isAnonymous && s(o), !o.nextSibling(); ) {
        if (!o.parent()) return
        a = !0
      }
    }
  }
  prop(t) {
    return t.perNode ? (this.props ? this.props[t.id] : void 0) : this.type.prop(t)
  }
  get propValues() {
    let t = []
    if (this.props) for (let e in this.props) t.push([+e, this.props[e]])
    return t
  }
  balance(t = {}) {
    return this.children.length <= 8
      ? this
      : Kt(
          E.none,
          this.children,
          this.positions,
          0,
          this.children.length,
          0,
          this.length,
          (e, s, i) => new v(this.type, e, s, i, this.propValues),
          t.makeTree || ((e, s, i) => new v(E.none, e, s, i))
        )
  }
  static build(t) {
    return is(t)
  }
}
v.empty = new v(E.none, [], [], 0)
class Ft {
  constructor(t, e) {
    ;(this.buffer = t), (this.index = e)
  }
  get id() {
    return this.buffer[this.index - 4]
  }
  get start() {
    return this.buffer[this.index - 3]
  }
  get end() {
    return this.buffer[this.index - 2]
  }
  get size() {
    return this.buffer[this.index - 1]
  }
  get pos() {
    return this.index
  }
  next() {
    this.index -= 4
  }
  fork() {
    return new Ft(this.buffer, this.index)
  }
}
class it {
  constructor(t, e, s) {
    ;(this.buffer = t), (this.length = e), (this.set = s)
  }
  get type() {
    return E.none
  }
  toString() {
    let t = []
    for (let e = 0; e < this.buffer.length; ) t.push(this.childString(e)), (e = this.buffer[e + 3])
    return t.join(',')
  }
  childString(t) {
    let e = this.buffer[t],
      s = this.buffer[t + 3],
      i = this.set.types[e],
      n = i.name
    if ((/\W/.test(n) && !i.isError && (n = JSON.stringify(n)), (t += 4), s == t)) return n
    let o = []
    for (; t < s; ) o.push(this.childString(t)), (t = this.buffer[t + 3])
    return n + '(' + o.join(',') + ')'
  }
  findChild(t, e, s, i, n) {
    let { buffer: o } = this,
      a = -1
    for (let h = t; h != e && !(ve(n, i, o[h + 1], o[h + 2]) && ((a = h), s > 0)); h = o[h + 3]);
    return a
  }
  slice(t, e, s, i) {
    let n = this.buffer,
      o = new Uint16Array(e - t)
    for (let a = t, h = 0; a < e; )
      (o[h++] = n[a++]), (o[h++] = n[a++] - s), (o[h++] = n[a++] - s), (o[h++] = n[a++] - t)
    return new it(o, i - s, this.set)
  }
}
function ve(r, t, e, s) {
  switch (r) {
    case -2:
      return e < t
    case -1:
      return s >= t && e < t
    case 0:
      return e < t && s > t
    case 1:
      return e <= t && s > t
    case 2:
      return s > t
    case 4:
      return !0
  }
}
function Le(r, t) {
  let e = r.childBefore(t)
  for (; e; ) {
    let s = e.lastChild
    if (!s || s.to != e.to) break
    s.type.isError && s.from == s.to ? ((r = e), (e = s.prevSibling)) : (e = s)
  }
  return r
}
function at(r, t, e, s) {
  for (
    var i;
    r.from == r.to || (e < 1 ? r.from >= t : r.from > t) || (e > -1 ? r.to <= t : r.to < t);

  ) {
    let o = !s && r instanceof Y && r.index < 0 ? null : r.parent
    if (!o) return r
    r = o
  }
  let n = s ? 0 : I.IgnoreOverlays
  if (s)
    for (let o = r, a = o.parent; a; o = a, a = o.parent)
      o instanceof Y &&
        o.index < 0 &&
        ((i = a.enter(t, e, n)) === null || i === void 0 ? void 0 : i.from) != o.from &&
        (r = a)
  for (;;) {
    let o = r.enter(t, e, n)
    if (!o) return r
    r = o
  }
}
class Y {
  constructor(t, e, s, i) {
    ;(this._tree = t), (this.from = e), (this.index = s), (this._parent = i)
  }
  get type() {
    return this._tree.type
  }
  get name() {
    return this._tree.type.name
  }
  get to() {
    return this.from + this._tree.length
  }
  nextChild(t, e, s, i, n = 0) {
    for (let o = this; ; ) {
      for (let { children: a, positions: h } = o._tree, l = e > 0 ? a.length : -1; t != l; t += e) {
        let d = a[t],
          f = h[t] + o.from
        if (!!ve(i, s, f, f + d.length)) {
          if (d instanceof it) {
            if (n & I.ExcludeBuffers) continue
            let u = d.findChild(0, d.buffer.length, e, s - f, i)
            if (u > -1) return new tt(new rs(o, d, t, f), null, u)
          } else if (n & I.IncludeAnonymous || !d.type.isAnonymous || qt(d)) {
            let u
            if (!(n & I.IgnoreMounts) && d.props && (u = d.prop(w.mounted)) && !u.overlay)
              return new Y(u.tree, f, t, o)
            let O = new Y(d, f, t, o)
            return n & I.IncludeAnonymous || !O.type.isAnonymous
              ? O
              : O.nextChild(e < 0 ? d.children.length - 1 : 0, e, s, i)
          }
        }
      }
      if (
        n & I.IncludeAnonymous ||
        !o.type.isAnonymous ||
        (o.index >= 0 ? (t = o.index + e) : (t = e < 0 ? -1 : o._parent._tree.children.length),
        (o = o._parent),
        !o)
      )
        return null
    }
  }
  get firstChild() {
    return this.nextChild(0, 1, 0, 4)
  }
  get lastChild() {
    return this.nextChild(this._tree.children.length - 1, -1, 0, 4)
  }
  childAfter(t) {
    return this.nextChild(0, 1, t, 2)
  }
  childBefore(t) {
    return this.nextChild(this._tree.children.length - 1, -1, t, -2)
  }
  enter(t, e, s = 0) {
    let i
    if (!(s & I.IgnoreOverlays) && (i = this._tree.prop(w.mounted)) && i.overlay) {
      let n = t - this.from
      for (let { from: o, to: a } of i.overlay)
        if ((e > 0 ? o <= n : o < n) && (e < 0 ? a >= n : a > n))
          return new Y(i.tree, i.overlay[0].from + this.from, -1, this)
    }
    return this.nextChild(0, 1, t, e, s)
  }
  nextSignificantParent() {
    let t = this
    for (; t.type.isAnonymous && t._parent; ) t = t._parent
    return t
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null
  }
  cursor(t = 0) {
    return new Nt(this, t)
  }
  get tree() {
    return this._tree
  }
  toTree() {
    return this._tree
  }
  resolve(t, e = 0) {
    return at(this, t, e, !1)
  }
  resolveInner(t, e = 0) {
    return at(this, t, e, !0)
  }
  enterUnfinishedNodesBefore(t) {
    return Le(this, t)
  }
  getChild(t, e = null, s = null) {
    let i = vt(this, t, e, s)
    return i.length ? i[0] : null
  }
  getChildren(t, e = null, s = null) {
    return vt(this, t, e, s)
  }
  toString() {
    return this._tree.toString()
  }
  get node() {
    return this
  }
  matchContext(t) {
    return Lt(this, t)
  }
}
function vt(r, t, e, s) {
  let i = r.cursor(),
    n = []
  if (!i.firstChild()) return n
  if (e != null) {
    for (; !i.type.is(e); ) if (!i.nextSibling()) return n
  }
  for (;;) {
    if (s != null && i.type.is(s)) return n
    if ((i.type.is(t) && n.push(i.node), !i.nextSibling())) return s == null ? n : []
  }
}
function Lt(r, t, e = t.length - 1) {
  for (let s = r.parent; e >= 0; s = s.parent) {
    if (!s) return !1
    if (!s.type.isAnonymous) {
      if (t[e] && t[e] != s.name) return !1
      e--
    }
  }
  return !0
}
class rs {
  constructor(t, e, s, i) {
    ;(this.parent = t), (this.buffer = e), (this.index = s), (this.start = i)
  }
}
class tt {
  constructor(t, e, s) {
    ;(this.context = t),
      (this._parent = e),
      (this.index = s),
      (this.type = t.buffer.set.types[t.buffer.buffer[s]])
  }
  get name() {
    return this.type.name
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1]
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2]
  }
  child(t, e, s) {
    let { buffer: i } = this.context,
      n = i.findChild(this.index + 4, i.buffer[this.index + 3], t, e - this.context.start, s)
    return n < 0 ? null : new tt(this.context, this, n)
  }
  get firstChild() {
    return this.child(1, 0, 4)
  }
  get lastChild() {
    return this.child(-1, 0, 4)
  }
  childAfter(t) {
    return this.child(1, t, 2)
  }
  childBefore(t) {
    return this.child(-1, t, -2)
  }
  enter(t, e, s = 0) {
    if (s & I.ExcludeBuffers) return null
    let { buffer: i } = this.context,
      n = i.findChild(
        this.index + 4,
        i.buffer[this.index + 3],
        e > 0 ? 1 : -1,
        t - this.context.start,
        e
      )
    return n < 0 ? null : new tt(this.context, this, n)
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent()
  }
  externalSibling(t) {
    return this._parent ? null : this.context.parent.nextChild(this.context.index + t, t, 0, 4)
  }
  get nextSibling() {
    let { buffer: t } = this.context,
      e = t.buffer[this.index + 3]
    return e < (this._parent ? t.buffer[this._parent.index + 3] : t.buffer.length)
      ? new tt(this.context, this._parent, e)
      : this.externalSibling(1)
  }
  get prevSibling() {
    let { buffer: t } = this.context,
      e = this._parent ? this._parent.index + 4 : 0
    return this.index == e
      ? this.externalSibling(-1)
      : new tt(this.context, this._parent, t.findChild(e, this.index, -1, 0, 4))
  }
  cursor(t = 0) {
    return new Nt(this, t)
  }
  get tree() {
    return null
  }
  toTree() {
    let t = [],
      e = [],
      { buffer: s } = this.context,
      i = this.index + 4,
      n = s.buffer[this.index + 3]
    if (n > i) {
      let o = s.buffer[this.index + 1],
        a = s.buffer[this.index + 2]
      t.push(s.slice(i, n, o, a)), e.push(0)
    }
    return new v(this.type, t, e, this.to - this.from)
  }
  resolve(t, e = 0) {
    return at(this, t, e, !1)
  }
  resolveInner(t, e = 0) {
    return at(this, t, e, !0)
  }
  enterUnfinishedNodesBefore(t) {
    return Le(this, t)
  }
  toString() {
    return this.context.buffer.childString(this.index)
  }
  getChild(t, e = null, s = null) {
    let i = vt(this, t, e, s)
    return i.length ? i[0] : null
  }
  getChildren(t, e = null, s = null) {
    return vt(this, t, e, s)
  }
  get node() {
    return this
  }
  matchContext(t) {
    return Lt(this, t)
  }
}
class Nt {
  constructor(t, e = 0) {
    if (
      ((this.mode = e),
      (this.buffer = null),
      (this.stack = []),
      (this.index = 0),
      (this.bufferNode = null),
      t instanceof Y)
    )
      this.yieldNode(t)
    else {
      ;(this._tree = t.context.parent), (this.buffer = t.context)
      for (let s = t._parent; s; s = s._parent) this.stack.unshift(s.index)
      ;(this.bufferNode = t), this.yieldBuf(t.index)
    }
  }
  get name() {
    return this.type.name
  }
  yieldNode(t) {
    return t
      ? ((this._tree = t), (this.type = t.type), (this.from = t.from), (this.to = t.to), !0)
      : !1
  }
  yieldBuf(t, e) {
    this.index = t
    let { start: s, buffer: i } = this.buffer
    return (
      (this.type = e || i.set.types[i.buffer[t]]),
      (this.from = s + i.buffer[t + 1]),
      (this.to = s + i.buffer[t + 2]),
      !0
    )
  }
  yield(t) {
    return t
      ? t instanceof Y
        ? ((this.buffer = null), this.yieldNode(t))
        : ((this.buffer = t.context), this.yieldBuf(t.index, t.type))
      : !1
  }
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString()
  }
  enterChild(t, e, s) {
    if (!this.buffer)
      return this.yield(
        this._tree.nextChild(t < 0 ? this._tree._tree.children.length - 1 : 0, t, e, s, this.mode)
      )
    let { buffer: i } = this.buffer,
      n = i.findChild(this.index + 4, i.buffer[this.index + 3], t, e - this.buffer.start, s)
    return n < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(n))
  }
  firstChild() {
    return this.enterChild(1, 0, 4)
  }
  lastChild() {
    return this.enterChild(-1, 0, 4)
  }
  childAfter(t) {
    return this.enterChild(1, t, 2)
  }
  childBefore(t) {
    return this.enterChild(-1, t, -2)
  }
  enter(t, e, s = this.mode) {
    return this.buffer
      ? s & I.ExcludeBuffers
        ? !1
        : this.enterChild(1, t, e)
      : this.yield(this._tree.enter(t, e, s))
  }
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & I.IncludeAnonymous ? this._tree._parent : this._tree.parent)
    if (this.stack.length) return this.yieldBuf(this.stack.pop())
    let t =
      this.mode & I.IncludeAnonymous
        ? this.buffer.parent
        : this.buffer.parent.nextSignificantParent()
    return (this.buffer = null), this.yieldNode(t)
  }
  sibling(t) {
    if (!this.buffer)
      return this._tree._parent
        ? this.yield(
            this._tree.index < 0
              ? null
              : this._tree._parent.nextChild(this._tree.index + t, t, 0, 4, this.mode)
          )
        : !1
    let { buffer: e } = this.buffer,
      s = this.stack.length - 1
    if (t < 0) {
      let i = s < 0 ? 0 : this.stack[s] + 4
      if (this.index != i) return this.yieldBuf(e.findChild(i, this.index, -1, 0, 4))
    } else {
      let i = e.buffer[this.index + 3]
      if (i < (s < 0 ? e.buffer.length : e.buffer[this.stack[s] + 3])) return this.yieldBuf(i)
    }
    return s < 0
      ? this.yield(this.buffer.parent.nextChild(this.buffer.index + t, t, 0, 4, this.mode))
      : !1
  }
  nextSibling() {
    return this.sibling(1)
  }
  prevSibling() {
    return this.sibling(-1)
  }
  atLastNode(t) {
    let e,
      s,
      { buffer: i } = this
    if (i) {
      if (t > 0) {
        if (this.index < i.buffer.buffer.length) return !1
      } else for (let n = 0; n < this.index; n++) if (i.buffer.buffer[n + 3] < this.index) return !1
      ;({ index: e, parent: s } = i)
    } else ({ index: e, _parent: s } = this._tree)
    for (; s; { index: e, _parent: s } = s)
      if (e > -1)
        for (let n = e + t, o = t < 0 ? -1 : s._tree.children.length; n != o; n += t) {
          let a = s._tree.children[n]
          if (this.mode & I.IncludeAnonymous || a instanceof it || !a.type.isAnonymous || qt(a))
            return !1
        }
    return !0
  }
  move(t, e) {
    if (e && this.enterChild(t, 0, 4)) return !0
    for (;;) {
      if (this.sibling(t)) return !0
      if (this.atLastNode(t) || !this.parent()) return !1
    }
  }
  next(t = !0) {
    return this.move(1, t)
  }
  prev(t = !0) {
    return this.move(-1, t)
  }
  moveTo(t, e = 0) {
    for (
      ;
      (this.from == this.to ||
        (e < 1 ? this.from >= t : this.from > t) ||
        (e > -1 ? this.to <= t : this.to < t)) &&
      this.parent();

    );
    for (; this.enterChild(1, t, e); );
    return this
  }
  get node() {
    if (!this.buffer) return this._tree
    let t = this.bufferNode,
      e = null,
      s = 0
    if (t && t.context == this.buffer) {
      t: for (let i = this.index, n = this.stack.length; n >= 0; ) {
        for (let o = t; o; o = o._parent)
          if (o.index == i) {
            if (i == this.index) return o
            ;(e = o), (s = n + 1)
            break t
          }
        i = this.stack[--n]
      }
    }
    for (let i = s; i < this.stack.length; i++) e = new tt(this.buffer, e, this.stack[i])
    return (this.bufferNode = new tt(this.buffer, e, this.index))
  }
  get tree() {
    return this.buffer ? null : this._tree._tree
  }
  iterate(t, e) {
    for (let s = 0; ; ) {
      let i = !1
      if (this.type.isAnonymous || t(this) !== !1) {
        if (this.firstChild()) {
          s++
          continue
        }
        this.type.isAnonymous || (i = !0)
      }
      for (; i && e && e(this), (i = this.type.isAnonymous), !this.nextSibling(); ) {
        if (!s) return
        this.parent(), s--, (i = !0)
      }
    }
  }
  matchContext(t) {
    if (!this.buffer) return Lt(this.node, t)
    let { buffer: e } = this.buffer,
      { types: s } = e.set
    for (let i = t.length - 1, n = this.stack.length - 1; i >= 0; n--) {
      if (n < 0) return Lt(this.node, t, i)
      let o = s[e.buffer[this.stack[n]]]
      if (!o.isAnonymous) {
        if (t[i] && t[i] != o.name) return !1
        i--
      }
    }
    return !0
  }
}
function qt(r) {
  return r.children.some(t => t instanceof it || !t.type.isAnonymous || qt(t))
}
function is(r) {
  var t
  let {
      buffer: e,
      nodeSet: s,
      maxBufferLength: i = 1024,
      reused: n = [],
      minRepeatType: o = s.types.length
    } = r,
    a = Array.isArray(e) ? new Ft(e, e.length) : e,
    h = s.types,
    l = 0,
    d = 0
  function f(x, y, k, P, z) {
    let { id: C, start: b, end: $, size: X } = a,
      R = d
    for (; X < 0; )
      if ((a.next(), X == -1)) {
        let q = n[C]
        k.push(q), P.push(b - x)
        return
      } else if (X == -3) {
        l = C
        return
      } else if (X == -4) {
        d = C
        return
      } else throw new RangeError(`Unrecognized record size: ${X}`)
    let nt = h[C],
      F,
      G,
      ne = b - x
    if ($ - b <= i && (G = S(a.pos - y, z))) {
      let q = new Uint16Array(G.size - G.skip),
        W = a.pos - G.size,
        V = q.length
      for (; a.pos > W; ) V = B(G.start, q, V)
      ;(F = new it(q, $ - G.start, s)), (ne = G.start - x)
    } else {
      let q = a.pos - X
      a.next()
      let W = [],
        V = [],
        et = C >= o ? C : -1,
        ot = 0,
        mt = $
      for (; a.pos > q; )
        et >= 0 && a.id == et && a.size >= 0
          ? (a.end <= mt - i && (O(W, V, b, ot, a.end, mt, et, R), (ot = W.length), (mt = a.end)),
            a.next())
          : f(b, q, W, V, et)
      if (
        (et >= 0 && ot > 0 && ot < W.length && O(W, V, b, ot, b, mt, et, R),
        W.reverse(),
        V.reverse(),
        et > -1 && ot > 0)
      ) {
        let oe = u(nt)
        F = Kt(nt, W, V, 0, W.length, 0, $ - b, oe, oe)
      } else F = m(nt, W, V, $ - b, R - $)
    }
    k.push(F), P.push(ne)
  }
  function u(x) {
    return (y, k, P) => {
      let z = 0,
        C = y.length - 1,
        b,
        $
      if (C >= 0 && (b = y[C]) instanceof v) {
        if (!C && b.type == x && b.length == P) return b
        ;($ = b.prop(w.lookAhead)) && (z = k[C] + b.length + $)
      }
      return m(x, y, k, P, z)
    }
  }
  function O(x, y, k, P, z, C, b, $) {
    let X = [],
      R = []
    for (; x.length > P; ) X.push(x.pop()), R.push(y.pop() + k - z)
    x.push(m(s.types[b], X, R, C - z, $ - C)), y.push(z - k)
  }
  function m(x, y, k, P, z = 0, C) {
    if (l) {
      let b = [w.contextHash, l]
      C = C ? [b].concat(C) : [b]
    }
    if (z > 25) {
      let b = [w.lookAhead, z]
      C = C ? [b].concat(C) : [b]
    }
    return new v(x, y, k, P, C)
  }
  function S(x, y) {
    let k = a.fork(),
      P = 0,
      z = 0,
      C = 0,
      b = k.end - i,
      $ = { size: 0, start: 0, skip: 0 }
    t: for (let X = k.pos - x; k.pos > X; ) {
      let R = k.size
      if (k.id == y && R >= 0) {
        ;($.size = P), ($.start = z), ($.skip = C), (C += 4), (P += 4), k.next()
        continue
      }
      let nt = k.pos - R
      if (R < 0 || nt < X || k.start < b) break
      let F = k.id >= o ? 4 : 0,
        G = k.start
      for (k.next(); k.pos > nt; ) {
        if (k.size < 0)
          if (k.size == -3) F += 4
          else break t
        else k.id >= o && (F += 4)
        k.next()
      }
      ;(z = G), (P += R), (C += F)
    }
    return (y < 0 || P == x) && (($.size = P), ($.start = z), ($.skip = C)), $.size > 4 ? $ : void 0
  }
  function B(x, y, k) {
    let { id: P, start: z, end: C, size: b } = a
    if ((a.next(), b >= 0 && P < o)) {
      let $ = k
      if (b > 4) {
        let X = a.pos - (b - 4)
        for (; a.pos > X; ) k = B(x, y, k)
      }
      ;(y[--k] = $), (y[--k] = C - x), (y[--k] = z - x), (y[--k] = P)
    } else b == -3 ? (l = P) : b == -4 && (d = P)
    return k
  }
  let N = [],
    L = []
  for (; a.pos > 0; ) f(r.start || 0, r.bufferStart || 0, N, L, -1)
  let A = (t = r.length) !== null && t !== void 0 ? t : N.length ? L[0] + N[0].length : 0
  return new v(h[r.topID], N.reverse(), L.reverse(), A)
}
const he = new WeakMap()
function wt(r, t) {
  if (!r.isAnonymous || t instanceof it || t.type != r) return 1
  let e = he.get(t)
  if (e == null) {
    e = 1
    for (let s of t.children) {
      if (s.type != r || !(s instanceof v)) {
        e = 1
        break
      }
      e += wt(r, s)
    }
    he.set(t, e)
  }
  return e
}
function Kt(r, t, e, s, i, n, o, a, h) {
  let l = 0
  for (let m = s; m < i; m++) l += wt(r, t[m])
  let d = Math.ceil((l * 1.5) / 8),
    f = [],
    u = []
  function O(m, S, B, N, L) {
    for (let A = B; A < N; ) {
      let x = A,
        y = S[A],
        k = wt(r, m[A])
      for (A++; A < N; A++) {
        let P = wt(r, m[A])
        if (k + P >= d) break
        k += P
      }
      if (A == x + 1) {
        if (k > d) {
          let P = m[x]
          O(P.children, P.positions, 0, P.children.length, S[x] + L)
          continue
        }
        f.push(m[x])
      } else {
        let P = S[A - 1] + m[A - 1].length - y
        f.push(Kt(r, m, S, x, A, y, P, null, h))
      }
      u.push(y + L - n)
    }
  }
  return O(t, e, s, i, 0), (a || h)(f, u, o)
}
class Ht {
  constructor(t, e, s, i, n = !1, o = !1) {
    ;(this.from = t),
      (this.to = e),
      (this.tree = s),
      (this.offset = i),
      (this.open = (n ? 1 : 0) | (o ? 2 : 0))
  }
  get openStart() {
    return (this.open & 1) > 0
  }
  get openEnd() {
    return (this.open & 2) > 0
  }
  static addTree(t, e = [], s = !1) {
    let i = [new Ht(0, t.length, t, 0, !1, s)]
    for (let n of e) n.to > t.length && i.push(n)
    return i
  }
  static applyChanges(t, e, s = 128) {
    if (!e.length) return t
    let i = [],
      n = 1,
      o = t.length ? t[0] : null
    for (let a = 0, h = 0, l = 0; ; a++) {
      let d = a < e.length ? e[a] : null,
        f = d ? d.fromA : 1e9
      if (f - h >= s)
        for (; o && o.from < f; ) {
          let u = o
          if (h >= u.from || f <= u.to || l) {
            let O = Math.max(u.from, h) - l,
              m = Math.min(u.to, f) - l
            u = O >= m ? null : new Ht(O, m, u.tree, u.offset + l, a > 0, !!d)
          }
          if ((u && i.push(u), o.to > f)) break
          o = n < t.length ? t[n++] : null
        }
      if (!d) break
      ;(h = d.toA), (l = d.toA - d.toB)
    }
    return i
  }
}
class Ne {
  startParse(t, e, s) {
    return (
      typeof t == 'string' && (t = new ns(t)),
      (s = s
        ? s.length
          ? s.map(i => new Wt(i.from, i.to))
          : [new Wt(0, 0)]
        : [new Wt(0, t.length)]),
      this.createParse(t, e || [], s)
    )
  }
  parse(t, e, s) {
    let i = this.startParse(t, e, s)
    for (;;) {
      let n = i.advance()
      if (n) return n
    }
  }
}
class ns {
  constructor(t) {
    this.string = t
  }
  get length() {
    return this.string.length
  }
  chunk(t) {
    return this.string.slice(t)
  }
  get lineChunks() {
    return !1
  }
  read(t, e) {
    return this.string.slice(t, e)
  }
}
new w({ perNode: !0 })
let os = 0
class M {
  constructor(t, e, s) {
    ;(this.set = t), (this.base = e), (this.modified = s), (this.id = os++)
  }
  static define(t) {
    if (t != null && t.base) throw new Error('Can not derive from a modified tag')
    let e = new M([], null, [])
    if ((e.set.push(e), t)) for (let s of t.set) e.set.push(s)
    return e
  }
  static defineModifier() {
    let t = new zt()
    return e =>
      e.modified.indexOf(t) > -1
        ? e
        : zt.get(
            e.base || e,
            e.modified.concat(t).sort((s, i) => s.id - i.id)
          )
  }
}
let as = 0
class zt {
  constructor() {
    ;(this.instances = []), (this.id = as++)
  }
  static get(t, e) {
    if (!e.length) return t
    let s = e[0].instances.find(a => a.base == t && hs(e, a.modified))
    if (s) return s
    let i = [],
      n = new M(i, t, e)
    for (let a of e) a.instances.push(n)
    let o = ls(e)
    for (let a of t.set) if (!a.modified.length) for (let h of o) i.push(zt.get(a, h))
    return n
  }
}
function hs(r, t) {
  return r.length == t.length && r.every((e, s) => e == t[s])
}
function ls(r) {
  let t = [[]]
  for (let e = 0; e < r.length; e++)
    for (let s = 0, i = t.length; s < i; s++) t.push(t[s].concat(r[e]))
  return t.sort((e, s) => s.length - e.length)
}
function Jt(r) {
  let t = Object.create(null)
  for (let e in r) {
    let s = r[e]
    Array.isArray(s) || (s = [s])
    for (let i of e.split(' '))
      if (i) {
        let n = [],
          o = 2,
          a = i
        for (let f = 0; ; ) {
          if (a == '...' && f > 0 && f + 3 == i.length) {
            o = 1
            break
          }
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a)
          if (!u) throw new RangeError('Invalid path: ' + i)
          if (
            (n.push(u[0] == '*' ? '' : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]),
            (f += u[0].length),
            f == i.length)
          )
            break
          let O = i[f++]
          if (f == i.length && O == '!') {
            o = 0
            break
          }
          if (O != '/') throw new RangeError('Invalid path: ' + i)
          a = i.slice(f)
        }
        let h = n.length - 1,
          l = n[h]
        if (!l) throw new RangeError('Invalid path: ' + i)
        let d = new It(s, o, h > 0 ? n.slice(0, h) : null)
        t[l] = d.sort(t[l])
      }
  }
  return ze.add(t)
}
const ze = new w()
class It {
  constructor(t, e, s, i) {
    ;(this.tags = t), (this.mode = e), (this.context = s), (this.next = i)
  }
  get opaque() {
    return this.mode == 0
  }
  get inherit() {
    return this.mode == 1
  }
  sort(t) {
    return !t || t.depth < this.depth ? ((this.next = t), this) : ((t.next = this.sort(t.next)), t)
  }
  get depth() {
    return this.context ? this.context.length : 0
  }
}
It.empty = new It([], 2, null)
function fs(r, t) {
  let e = Object.create(null)
  for (let n of r)
    if (!Array.isArray(n.tag)) e[n.tag.id] = n.class
    else for (let o of n.tag) e[o.id] = n.class
  let { scope: s, all: i = null } = t || {}
  return {
    style: n => {
      let o = i
      for (let a of n)
        for (let h of a.set) {
          let l = e[h.id]
          if (l) {
            o = o ? o + ' ' + l : l
            break
          }
        }
      return o
    },
    scope: s
  }
}
function us(r, t) {
  let e = null
  for (let s of r) {
    let i = s.style(t)
    i && (e = e ? e + ' ' + i : i)
  }
  return e
}
function rr(r, t, e, s = 0, i = r.length) {
  let n = new ds(s, Array.isArray(t) ? t : [t], e)
  n.highlightRange(r.cursor(), s, i, '', n.highlighters), n.flush(i)
}
class ds {
  constructor(t, e, s) {
    ;(this.at = t), (this.highlighters = e), (this.span = s), (this.class = '')
  }
  startSpan(t, e) {
    e != this.class && (this.flush(t), t > this.at && (this.at = t), (this.class = e))
  }
  flush(t) {
    t > this.at && this.class && this.span(this.at, t, this.class)
  }
  highlightRange(t, e, s, i, n) {
    let { type: o, from: a, to: h } = t
    if (a >= s || h <= e) return
    o.isTop && (n = this.highlighters.filter(O => !O.scope || O.scope(o)))
    let l = i,
      d = cs(t) || It.empty,
      f = us(n, d.tags)
    if (
      (f && (l && (l += ' '), (l += f), d.mode == 1 && (i += (i ? ' ' : '') + f)),
      this.startSpan(t.from, l),
      d.opaque)
    )
      return
    let u = t.tree && t.tree.prop(w.mounted)
    if (u && u.overlay) {
      let O = t.node.enter(u.overlay[0].from + a, 1),
        m = this.highlighters.filter(B => !B.scope || B.scope(u.tree.type)),
        S = t.firstChild()
      for (let B = 0, N = a; ; B++) {
        let L = B < u.overlay.length ? u.overlay[B] : null,
          A = L ? L.from + a : h,
          x = Math.max(e, N),
          y = Math.min(s, A)
        if (x < y && S)
          for (
            ;
            t.from < y &&
            (this.highlightRange(t, x, y, i, n),
            this.startSpan(Math.min(s, t.to), l),
            !(t.to >= A || !t.nextSibling()));

          );
        if (!L || A > s) break
        ;(N = L.to + a),
          N > e &&
            (this.highlightRange(O.cursor(), Math.max(e, L.from + a), Math.min(s, N), i, m),
            this.startSpan(N, l))
      }
      S && t.parent()
    } else if (t.firstChild()) {
      do
        if (!(t.to <= e)) {
          if (t.from >= s) break
          this.highlightRange(t, e, s, i, n), this.startSpan(Math.min(s, t.to), l)
        }
      while (t.nextSibling())
      t.parent()
    }
  }
}
function cs(r) {
  let t = r.type.prop(ze)
  for (; t && t.context && !r.matchContext(t.context); ) t = t.next
  return t || null
}
const p = M.define,
  St = p(),
  K = p(),
  le = p(K),
  fe = p(K),
  J = p(),
  bt = p(J),
  _t = p(J),
  j = p(),
  st = p(j),
  D = p(),
  H = p(),
  jt = p(),
  lt = p(jt),
  xt = p(),
  c = {
    comment: St,
    lineComment: p(St),
    blockComment: p(St),
    docComment: p(St),
    name: K,
    variableName: p(K),
    typeName: le,
    tagName: p(le),
    propertyName: fe,
    attributeName: p(fe),
    className: p(K),
    labelName: p(K),
    namespace: p(K),
    macroName: p(K),
    literal: J,
    string: bt,
    docString: p(bt),
    character: p(bt),
    attributeValue: p(bt),
    number: _t,
    integer: p(_t),
    float: p(_t),
    bool: p(J),
    regexp: p(J),
    escape: p(J),
    color: p(J),
    url: p(J),
    keyword: D,
    self: p(D),
    null: p(D),
    atom: p(D),
    unit: p(D),
    modifier: p(D),
    operatorKeyword: p(D),
    controlKeyword: p(D),
    definitionKeyword: p(D),
    moduleKeyword: p(D),
    operator: H,
    derefOperator: p(H),
    arithmeticOperator: p(H),
    logicOperator: p(H),
    bitwiseOperator: p(H),
    compareOperator: p(H),
    updateOperator: p(H),
    definitionOperator: p(H),
    typeOperator: p(H),
    controlOperator: p(H),
    punctuation: jt,
    separator: p(jt),
    bracket: lt,
    angleBracket: p(lt),
    squareBracket: p(lt),
    paren: p(lt),
    brace: p(lt),
    content: j,
    heading: st,
    heading1: p(st),
    heading2: p(st),
    heading3: p(st),
    heading4: p(st),
    heading5: p(st),
    heading6: p(st),
    contentSeparator: p(j),
    list: p(j),
    quote: p(j),
    emphasis: p(j),
    strong: p(j),
    link: p(j),
    monospace: p(j),
    strikethrough: p(j),
    inserted: p(),
    deleted: p(),
    changed: p(),
    invalid: p(),
    meta: xt,
    documentMeta: p(xt),
    annotation: p(xt),
    processingInstruction: p(xt),
    definition: M.defineModifier(),
    constant: M.defineModifier(),
    function: M.defineModifier(),
    standard: M.defineModifier(),
    local: M.defineModifier(),
    special: M.defineModifier()
  }
fs([
  { tag: c.link, class: 'tok-link' },
  { tag: c.heading, class: 'tok-heading' },
  { tag: c.emphasis, class: 'tok-emphasis' },
  { tag: c.strong, class: 'tok-strong' },
  { tag: c.keyword, class: 'tok-keyword' },
  { tag: c.atom, class: 'tok-atom' },
  { tag: c.bool, class: 'tok-bool' },
  { tag: c.url, class: 'tok-url' },
  { tag: c.labelName, class: 'tok-labelName' },
  { tag: c.inserted, class: 'tok-inserted' },
  { tag: c.deleted, class: 'tok-deleted' },
  { tag: c.literal, class: 'tok-literal' },
  { tag: c.string, class: 'tok-string' },
  { tag: c.number, class: 'tok-number' },
  { tag: [c.regexp, c.escape, c.special(c.string)], class: 'tok-string2' },
  { tag: c.variableName, class: 'tok-variableName' },
  { tag: c.local(c.variableName), class: 'tok-variableName tok-local' },
  { tag: c.definition(c.variableName), class: 'tok-variableName tok-definition' },
  { tag: c.special(c.variableName), class: 'tok-variableName2' },
  { tag: c.definition(c.propertyName), class: 'tok-propertyName tok-definition' },
  { tag: c.typeName, class: 'tok-typeName' },
  { tag: c.namespace, class: 'tok-namespace' },
  { tag: c.className, class: 'tok-className' },
  { tag: c.macroName, class: 'tok-macroName' },
  { tag: c.propertyName, class: 'tok-propertyName' },
  { tag: c.operator, class: 'tok-operator' },
  { tag: c.comment, class: 'tok-comment' },
  { tag: c.meta, class: 'tok-meta' },
  { tag: c.invalid, class: 'tok-invalid' },
  { tag: c.punctuation, class: 'tok-punctuation' }
])
class Et {
  constructor(t, e, s, i, n, o, a, h, l, d = 0, f) {
    ;(this.p = t),
      (this.stack = e),
      (this.state = s),
      (this.reducePos = i),
      (this.pos = n),
      (this.score = o),
      (this.buffer = a),
      (this.bufferBase = h),
      (this.curContext = l),
      (this.lookAhead = d),
      (this.parent = f)
  }
  toString() {
    return `[${this.stack.filter((t, e) => e % 3 == 0).concat(this.state)}]@${this.pos}${
      this.score ? '!' + this.score : ''
    }`
  }
  static start(t, e, s = 0) {
    let i = t.parser.context
    return new Et(t, [], e, s, s, 0, [], 0, i ? new ue(i, i.start) : null, 0, null)
  }
  get context() {
    return this.curContext ? this.curContext.context : null
  }
  pushState(t, e) {
    this.stack.push(this.state, e, this.bufferBase + this.buffer.length), (this.state = t)
  }
  reduce(t) {
    let e = t >> 19,
      s = t & 65535,
      { parser: i } = this.p,
      n = i.dynamicPrecedence(s)
    if ((n && (this.score += n), e == 0)) {
      this.pushState(i.getGoto(this.state, s, !0), this.reducePos),
        s < i.minRepeatTerm && this.storeNode(s, this.reducePos, this.reducePos, 4, !0),
        this.reduceContext(s, this.reducePos)
      return
    }
    let o = this.stack.length - (e - 1) * 3 - (t & 262144 ? 6 : 0),
      a = this.stack[o - 2],
      h = this.stack[o - 1],
      l = this.bufferBase + this.buffer.length - h
    if (s < i.minRepeatTerm || t & 131072) {
      let d = i.stateFlag(this.state, 1) ? this.pos : this.reducePos
      this.storeNode(s, a, d, l + 4, !0)
    }
    if (t & 262144) this.state = this.stack[o]
    else {
      let d = this.stack[o - 3]
      this.state = i.getGoto(d, s, !0)
    }
    for (; this.stack.length > o; ) this.stack.pop()
    this.reduceContext(s, a)
  }
  storeNode(t, e, s, i = 4, n = !1) {
    if (
      t == 0 &&
      (!this.stack.length ||
        this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)
    ) {
      let o = this,
        a = this.buffer.length
      if (
        (a == 0 && o.parent && ((a = o.bufferBase - o.parent.bufferBase), (o = o.parent)),
        a > 0 && o.buffer[a - 4] == 0 && o.buffer[a - 1] > -1)
      ) {
        if (e == s) return
        if (o.buffer[a - 2] >= e) {
          o.buffer[a - 2] = s
          return
        }
      }
    }
    if (!n || this.pos == s) this.buffer.push(t, e, s, i)
    else {
      let o = this.buffer.length
      if (o > 0 && this.buffer[o - 4] != 0)
        for (; o > 0 && this.buffer[o - 2] > s; )
          (this.buffer[o] = this.buffer[o - 4]),
            (this.buffer[o + 1] = this.buffer[o - 3]),
            (this.buffer[o + 2] = this.buffer[o - 2]),
            (this.buffer[o + 3] = this.buffer[o - 1]),
            (o -= 4),
            i > 4 && (i -= 4)
      ;(this.buffer[o] = t),
        (this.buffer[o + 1] = e),
        (this.buffer[o + 2] = s),
        (this.buffer[o + 3] = i)
    }
  }
  shift(t, e, s) {
    let i = this.pos
    if (t & 131072) this.pushState(t & 65535, this.pos)
    else if ((t & 262144) == 0) {
      let n = t,
        { parser: o } = this.p
      ;(s > this.pos || e <= o.maxNode) &&
        ((this.pos = s), o.stateFlag(n, 1) || (this.reducePos = s)),
        this.pushState(n, i),
        this.shiftContext(e, i),
        e <= o.maxNode && this.buffer.push(e, i, s, 4)
    } else
      (this.pos = s),
        this.shiftContext(e, i),
        e <= this.p.parser.maxNode && this.buffer.push(e, i, s, 4)
  }
  apply(t, e, s) {
    t & 65536 ? this.reduce(t) : this.shift(t, e, s)
  }
  useNode(t, e) {
    let s = this.p.reused.length - 1
    ;(s < 0 || this.p.reused[s] != t) && (this.p.reused.push(t), s++)
    let i = this.pos
    ;(this.reducePos = this.pos = i + t.length),
      this.pushState(e, i),
      this.buffer.push(s, i, this.reducePos, -1),
      this.curContext &&
        this.updateContext(
          this.curContext.tracker.reuse(
            this.curContext.context,
            t,
            this,
            this.p.stream.reset(this.pos - t.length)
          )
        )
  }
  split() {
    let t = this,
      e = t.buffer.length
    for (; e > 0 && t.buffer[e - 2] > t.reducePos; ) e -= 4
    let s = t.buffer.slice(e),
      i = t.bufferBase + e
    for (; t && i == t.bufferBase; ) t = t.parent
    return new Et(
      this.p,
      this.stack.slice(),
      this.state,
      this.reducePos,
      this.pos,
      this.score,
      s,
      i,
      this.curContext,
      this.lookAhead,
      t
    )
  }
  recoverByDelete(t, e) {
    let s = t <= this.p.parser.maxNode
    s && this.storeNode(t, this.pos, e, 4),
      this.storeNode(0, this.pos, e, s ? 8 : 4),
      (this.pos = this.reducePos = e),
      (this.score -= 190)
  }
  canShift(t) {
    for (let e = new ps(this); ; ) {
      let s = this.p.parser.stateSlot(e.state, 4) || this.p.parser.hasAction(e.state, t)
      if ((s & 65536) == 0) return !0
      if (s == 0) return !1
      e.reduce(s)
    }
  }
  recoverByInsert(t) {
    if (this.stack.length >= 300) return []
    let e = this.p.parser.nextStates(this.state)
    if (e.length > 4 << 1 || this.stack.length >= 120) {
      let i = []
      for (let n = 0, o; n < e.length; n += 2)
        (o = e[n + 1]) != this.state && this.p.parser.hasAction(o, t) && i.push(e[n], o)
      if (this.stack.length < 120)
        for (let n = 0; i.length < 4 << 1 && n < e.length; n += 2) {
          let o = e[n + 1]
          i.some((a, h) => h & 1 && a == o) || i.push(e[n], o)
        }
      e = i
    }
    let s = []
    for (let i = 0; i < e.length && s.length < 4; i += 2) {
      let n = e[i + 1]
      if (n == this.state) continue
      let o = this.split()
      o.pushState(n, this.pos),
        o.storeNode(0, o.pos, o.pos, 4, !0),
        o.shiftContext(e[i], this.pos),
        (o.score -= 200),
        s.push(o)
    }
    return s
  }
  forceReduce() {
    let t = this.p.parser.stateSlot(this.state, 5)
    if ((t & 65536) == 0) return !1
    let { parser: e } = this.p
    if (!e.validAction(this.state, t)) {
      let s = t >> 19,
        i = t & 65535,
        n = this.stack.length - s * 3
      if (n < 0 || e.getGoto(this.stack[n], i, !1) < 0) return !1
      this.storeNode(0, this.reducePos, this.reducePos, 4, !0), (this.score -= 100)
    }
    return (this.reducePos = this.pos), this.reduce(t), !0
  }
  forceAll() {
    for (; !this.p.parser.stateFlag(this.state, 2); )
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, !0)
        break
      }
    return this
  }
  get deadEnd() {
    if (this.stack.length != 3) return !1
    let { parser: t } = this.p
    return t.data[t.stateSlot(this.state, 1)] == 65535 && !t.stateSlot(this.state, 4)
  }
  restart() {
    ;(this.state = this.stack[0]), (this.stack.length = 0)
  }
  sameState(t) {
    if (this.state != t.state || this.stack.length != t.stack.length) return !1
    for (let e = 0; e < this.stack.length; e += 3) if (this.stack[e] != t.stack[e]) return !1
    return !0
  }
  get parser() {
    return this.p.parser
  }
  dialectEnabled(t) {
    return this.p.parser.dialect.flags[t]
  }
  shiftContext(t, e) {
    this.curContext &&
      this.updateContext(
        this.curContext.tracker.shift(this.curContext.context, t, this, this.p.stream.reset(e))
      )
  }
  reduceContext(t, e) {
    this.curContext &&
      this.updateContext(
        this.curContext.tracker.reduce(this.curContext.context, t, this, this.p.stream.reset(e))
      )
  }
  emitContext() {
    let t = this.buffer.length - 1
    ;(t < 0 || this.buffer[t] != -3) &&
      this.buffer.push(this.curContext.hash, this.reducePos, this.reducePos, -3)
  }
  emitLookAhead() {
    let t = this.buffer.length - 1
    ;(t < 0 || this.buffer[t] != -4) &&
      this.buffer.push(this.lookAhead, this.reducePos, this.reducePos, -4)
  }
  updateContext(t) {
    if (t != this.curContext.context) {
      let e = new ue(this.curContext.tracker, t)
      e.hash != this.curContext.hash && this.emitContext(), (this.curContext = e)
    }
  }
  setLookAhead(t) {
    t > this.lookAhead && (this.emitLookAhead(), (this.lookAhead = t))
  }
  close() {
    this.curContext && this.curContext.tracker.strict && this.emitContext(),
      this.lookAhead > 0 && this.emitLookAhead()
  }
}
class ue {
  constructor(t, e) {
    ;(this.tracker = t), (this.context = e), (this.hash = t.strict ? t.hash(e) : 0)
  }
}
var de
;(function (r) {
  ;(r[(r.Insert = 200)] = 'Insert'),
    (r[(r.Delete = 190)] = 'Delete'),
    (r[(r.Reduce = 100)] = 'Reduce'),
    (r[(r.MaxNext = 4)] = 'MaxNext'),
    (r[(r.MaxInsertStackDepth = 300)] = 'MaxInsertStackDepth'),
    (r[(r.DampenInsertStackDepth = 120)] = 'DampenInsertStackDepth')
})(de || (de = {}))
class ps {
  constructor(t) {
    ;(this.start = t),
      (this.state = t.state),
      (this.stack = t.stack),
      (this.base = this.stack.length)
  }
  reduce(t) {
    let e = t & 65535,
      s = t >> 19
    s == 0
      ? (this.stack == this.start.stack && (this.stack = this.stack.slice()),
        this.stack.push(this.state, 0, 0),
        (this.base += 3))
      : (this.base -= (s - 1) * 3)
    let i = this.start.p.parser.getGoto(this.stack[this.base - 3], e, !0)
    this.state = i
  }
}
class Xt {
  constructor(t, e, s) {
    ;(this.stack = t),
      (this.pos = e),
      (this.index = s),
      (this.buffer = t.buffer),
      this.index == 0 && this.maybeNext()
  }
  static create(t, e = t.bufferBase + t.buffer.length) {
    return new Xt(t, e, e - t.bufferBase)
  }
  maybeNext() {
    let t = this.stack.parent
    t != null &&
      ((this.index = this.stack.bufferBase - t.bufferBase),
      (this.stack = t),
      (this.buffer = t.buffer))
  }
  get id() {
    return this.buffer[this.index - 4]
  }
  get start() {
    return this.buffer[this.index - 3]
  }
  get end() {
    return this.buffer[this.index - 2]
  }
  get size() {
    return this.buffer[this.index - 1]
  }
  next() {
    ;(this.index -= 4), (this.pos -= 4), this.index == 0 && this.maybeNext()
  }
  fork() {
    return new Xt(this.stack, this.pos, this.index)
  }
}
class Ct {
  constructor() {
    ;(this.start = -1),
      (this.value = -1),
      (this.end = -1),
      (this.extended = -1),
      (this.lookAhead = 0),
      (this.mask = 0),
      (this.context = 0)
  }
}
const ce = new Ct()
class gs {
  constructor(t, e) {
    ;(this.input = t),
      (this.ranges = e),
      (this.chunk = ''),
      (this.chunkOff = 0),
      (this.chunk2 = ''),
      (this.chunk2Pos = 0),
      (this.next = -1),
      (this.token = ce),
      (this.rangeIndex = 0),
      (this.pos = this.chunkPos = e[0].from),
      (this.range = e[0]),
      (this.end = e[e.length - 1].to),
      this.readNext()
  }
  resolveOffset(t, e) {
    let s = this.range,
      i = this.rangeIndex,
      n = this.pos + t
    for (; n < s.from; ) {
      if (!i) return null
      let o = this.ranges[--i]
      ;(n -= s.from - o.to), (s = o)
    }
    for (; e < 0 ? n > s.to : n >= s.to; ) {
      if (i == this.ranges.length - 1) return null
      let o = this.ranges[++i]
      ;(n += o.from - s.to), (s = o)
    }
    return n
  }
  clipPos(t) {
    if (t >= this.range.from && t < this.range.to) return t
    for (let e of this.ranges) if (e.to > t) return Math.max(t, e.from)
    return this.end
  }
  peek(t) {
    let e = this.chunkOff + t,
      s,
      i
    if (e >= 0 && e < this.chunk.length) (s = this.pos + t), (i = this.chunk.charCodeAt(e))
    else {
      let n = this.resolveOffset(t, 1)
      if (n == null) return -1
      if (((s = n), s >= this.chunk2Pos && s < this.chunk2Pos + this.chunk2.length))
        i = this.chunk2.charCodeAt(s - this.chunk2Pos)
      else {
        let o = this.rangeIndex,
          a = this.range
        for (; a.to <= s; ) a = this.ranges[++o]
        ;(this.chunk2 = this.input.chunk((this.chunk2Pos = s))),
          s + this.chunk2.length > a.to && (this.chunk2 = this.chunk2.slice(0, a.to - s)),
          (i = this.chunk2.charCodeAt(0))
      }
    }
    return s >= this.token.lookAhead && (this.token.lookAhead = s + 1), i
  }
  acceptToken(t, e = 0) {
    let s = e ? this.resolveOffset(e, -1) : this.pos
    if (s == null || s < this.token.start) throw new RangeError('Token end out of bounds')
    ;(this.token.value = t), (this.token.end = s)
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk: t, chunkPos: e } = this
      ;(this.chunk = this.chunk2),
        (this.chunkPos = this.chunk2Pos),
        (this.chunk2 = t),
        (this.chunk2Pos = e),
        (this.chunkOff = this.pos - this.chunkPos)
    } else {
      ;(this.chunk2 = this.chunk), (this.chunk2Pos = this.chunkPos)
      let t = this.input.chunk(this.pos),
        e = this.pos + t.length
      ;(this.chunk = e > this.range.to ? t.slice(0, this.range.to - this.pos) : t),
        (this.chunkPos = this.pos),
        (this.chunkOff = 0)
    }
  }
  readNext() {
    return this.chunkOff >= this.chunk.length &&
      (this.getChunk(), this.chunkOff == this.chunk.length)
      ? (this.next = -1)
      : (this.next = this.chunk.charCodeAt(this.chunkOff))
  }
  advance(t = 1) {
    for (this.chunkOff += t; this.pos + t >= this.range.to; ) {
      if (this.rangeIndex == this.ranges.length - 1) return this.setDone()
      ;(t -= this.range.to - this.pos),
        (this.range = this.ranges[++this.rangeIndex]),
        (this.pos = this.range.from)
    }
    return (
      (this.pos += t),
      this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1),
      this.readNext()
    )
  }
  setDone() {
    return (
      (this.pos = this.chunkPos = this.end),
      (this.range = this.ranges[(this.rangeIndex = this.ranges.length - 1)]),
      (this.chunk = ''),
      (this.next = -1)
    )
  }
  reset(t, e) {
    if (
      (e
        ? ((this.token = e), (e.start = t), (e.lookAhead = t + 1), (e.value = e.extended = -1))
        : (this.token = ce),
      this.pos != t)
    ) {
      if (((this.pos = t), t == this.end)) return this.setDone(), this
      for (; t < this.range.from; ) this.range = this.ranges[--this.rangeIndex]
      for (; t >= this.range.to; ) this.range = this.ranges[++this.rangeIndex]
      t >= this.chunkPos && t < this.chunkPos + this.chunk.length
        ? (this.chunkOff = t - this.chunkPos)
        : ((this.chunk = ''), (this.chunkOff = 0)),
        this.readNext()
    }
    return this
  }
  read(t, e) {
    if (t >= this.chunkPos && e <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(t - this.chunkPos, e - this.chunkPos)
    if (t >= this.chunk2Pos && e <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(t - this.chunk2Pos, e - this.chunk2Pos)
    if (t >= this.range.from && e <= this.range.to) return this.input.read(t, e)
    let s = ''
    for (let i of this.ranges) {
      if (i.from >= e) break
      i.to > t && (s += this.input.read(Math.max(i.from, t), Math.min(i.to, e)))
    }
    return s
  }
}
class At {
  constructor(t, e) {
    ;(this.data = t), (this.id = e)
  }
  token(t, e) {
    Os(this.data, t, e, this.id)
  }
}
At.prototype.contextual = At.prototype.fallback = At.prototype.extend = !1
class te {
  constructor(t, e = {}) {
    ;(this.token = t),
      (this.contextual = !!e.contextual),
      (this.fallback = !!e.fallback),
      (this.extend = !!e.extend)
  }
}
function Os(r, t, e, s) {
  let i = 0,
    n = 1 << s,
    { parser: o } = e.p,
    { dialect: a } = o
  t: for (; (n & r[i]) != 0; ) {
    let h = r[i + 1]
    for (let u = i + 3; u < h; u += 2)
      if ((r[u + 1] & n) > 0) {
        let O = r[u]
        if (
          a.allows(O) &&
          (t.token.value == -1 || t.token.value == O || o.overrides(O, t.token.value))
        ) {
          t.acceptToken(O)
          break
        }
      }
    let l = t.next,
      d = 0,
      f = r[i + 2]
    if (t.next < 0 && f > d && r[h + f * 3 - 3] == 65535) {
      i = r[h + f * 3 - 1]
      continue t
    }
    for (; d < f; ) {
      let u = (d + f) >> 1,
        O = h + u + (u << 1),
        m = r[O],
        S = r[O + 1]
      if (l < m) f = u
      else if (l >= S) d = u + 1
      else {
        ;(i = r[O + 2]), t.advance()
        continue t
      }
    }
    break
  }
}
function yt(r, t = Uint16Array) {
  if (typeof r != 'string') return r
  let e = null
  for (let s = 0, i = 0; s < r.length; ) {
    let n = 0
    for (;;) {
      let o = r.charCodeAt(s++),
        a = !1
      if (o == 126) {
        n = 65535
        break
      }
      o >= 92 && o--, o >= 34 && o--
      let h = o - 32
      if ((h >= 46 && ((h -= 46), (a = !0)), (n += h), a)) break
      n *= 46
    }
    e ? (e[i++] = n) : (e = new t(n))
  }
  return e
}
const _ = typeof process < 'u' && process.env && /\bparse\b/.test(process.env.LOG)
let Mt = null
var pe
;(function (r) {
  r[(r.Margin = 25)] = 'Margin'
})(pe || (pe = {}))
function ge(r, t, e) {
  let s = r.cursor(I.IncludeAnonymous)
  for (s.moveTo(t); ; )
    if (!(e < 0 ? s.childBefore(t) : s.childAfter(t)))
      for (;;) {
        if ((e < 0 ? s.to < t : s.from > t) && !s.type.isError)
          return e < 0
            ? Math.max(0, Math.min(s.to - 1, t - 25))
            : Math.min(r.length, Math.max(s.from + 1, t + 25))
        if (e < 0 ? s.prevSibling() : s.nextSibling()) break
        if (!s.parent()) return e < 0 ? 0 : r.length
      }
}
class ms {
  constructor(t, e) {
    ;(this.fragments = t),
      (this.nodeSet = e),
      (this.i = 0),
      (this.fragment = null),
      (this.safeFrom = -1),
      (this.safeTo = -1),
      (this.trees = []),
      (this.start = []),
      (this.index = []),
      this.nextFragment()
  }
  nextFragment() {
    let t = (this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++])
    if (t) {
      for (
        this.safeFrom = t.openStart ? ge(t.tree, t.from + t.offset, 1) - t.offset : t.from,
          this.safeTo = t.openEnd ? ge(t.tree, t.to + t.offset, -1) - t.offset : t.to;
        this.trees.length;

      )
        this.trees.pop(), this.start.pop(), this.index.pop()
      this.trees.push(t.tree),
        this.start.push(-t.offset),
        this.index.push(0),
        (this.nextStart = this.safeFrom)
    } else this.nextStart = 1e9
  }
  nodeAt(t) {
    if (t < this.nextStart) return null
    for (; this.fragment && this.safeTo <= t; ) this.nextFragment()
    if (!this.fragment) return null
    for (;;) {
      let e = this.trees.length - 1
      if (e < 0) return this.nextFragment(), null
      let s = this.trees[e],
        i = this.index[e]
      if (i == s.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop()
        continue
      }
      let n = s.children[i],
        o = this.start[e] + s.positions[i]
      if (o > t) return (this.nextStart = o), null
      if (n instanceof v) {
        if (o == t) {
          if (o < this.safeFrom) return null
          let a = o + n.length
          if (a <= this.safeTo) {
            let h = n.prop(w.lookAhead)
            if (!h || a + h < this.fragment.to) return n
          }
        }
        this.index[e]++,
          o + n.length >= Math.max(this.safeFrom, t) &&
            (this.trees.push(n), this.start.push(o), this.index.push(0))
      } else this.index[e]++, (this.nextStart = o + n.length)
    }
  }
}
class ks {
  constructor(t, e) {
    ;(this.stream = e),
      (this.tokens = []),
      (this.mainToken = null),
      (this.actions = []),
      (this.tokens = t.tokenizers.map(s => new Ct()))
  }
  getActions(t) {
    let e = 0,
      s = null,
      { parser: i } = t.p,
      { tokenizers: n } = i,
      o = i.stateSlot(t.state, 3),
      a = t.curContext ? t.curContext.hash : 0,
      h = 0
    for (let l = 0; l < n.length; l++) {
      if (((1 << l) & o) == 0) continue
      let d = n[l],
        f = this.tokens[l]
      if (
        !(s && !d.fallback) &&
        ((d.contextual || f.start != t.pos || f.mask != o || f.context != a) &&
          (this.updateCachedToken(f, d, t), (f.mask = o), (f.context = a)),
        f.lookAhead > f.end + 25 && (h = Math.max(f.lookAhead, h)),
        f.value != 0)
      ) {
        let u = e
        if (
          (f.extended > -1 && (e = this.addActions(t, f.extended, f.end, e)),
          (e = this.addActions(t, f.value, f.end, e)),
          !d.extend && ((s = f), e > u))
        )
          break
      }
    }
    for (; this.actions.length > e; ) this.actions.pop()
    return (
      h && t.setLookAhead(h),
      !s &&
        t.pos == this.stream.end &&
        ((s = new Ct()),
        (s.value = t.p.parser.eofTerm),
        (s.start = s.end = t.pos),
        (e = this.addActions(t, s.value, s.end, e))),
      (this.mainToken = s),
      this.actions
    )
  }
  getMainToken(t) {
    if (this.mainToken) return this.mainToken
    let e = new Ct(),
      { pos: s, p: i } = t
    return (
      (e.start = s),
      (e.end = Math.min(s + 1, i.stream.end)),
      (e.value = s == i.stream.end ? i.parser.eofTerm : 0),
      e
    )
  }
  updateCachedToken(t, e, s) {
    let i = this.stream.clipPos(s.pos)
    if ((e.token(this.stream.reset(i, t), s), t.value > -1)) {
      let { parser: n } = s.p
      for (let o = 0; o < n.specialized.length; o++)
        if (n.specialized[o] == t.value) {
          let a = n.specializers[o](this.stream.read(t.start, t.end), s)
          if (a >= 0 && s.p.parser.dialect.allows(a >> 1)) {
            ;(a & 1) == 0 ? (t.value = a >> 1) : (t.extended = a >> 1)
            break
          }
        }
    } else (t.value = 0), (t.end = this.stream.clipPos(i + 1))
  }
  putAction(t, e, s, i) {
    for (let n = 0; n < i; n += 3) if (this.actions[n] == t) return i
    return (this.actions[i++] = t), (this.actions[i++] = e), (this.actions[i++] = s), i
  }
  addActions(t, e, s, i) {
    let { state: n } = t,
      { parser: o } = t.p,
      { data: a } = o
    for (let h = 0; h < 2; h++)
      for (let l = o.stateSlot(n, h ? 2 : 1); ; l += 3) {
        if (a[l] == 65535)
          if (a[l + 1] == 1) l = Z(a, l + 2)
          else {
            i == 0 && a[l + 1] == 2 && (i = this.putAction(Z(a, l + 2), e, s, i))
            break
          }
        a[l] == e && (i = this.putAction(Z(a, l + 1), e, s, i))
      }
    return i
  }
}
var Oe
;(function (r) {
  ;(r[(r.Distance = 5)] = 'Distance'),
    (r[(r.MaxRemainingPerStep = 3)] = 'MaxRemainingPerStep'),
    (r[(r.MinBufferLengthPrune = 500)] = 'MinBufferLengthPrune'),
    (r[(r.ForceReduceLimit = 10)] = 'ForceReduceLimit'),
    (r[(r.CutDepth = 15e3)] = 'CutDepth'),
    (r[(r.CutTo = 9e3)] = 'CutTo')
})(Oe || (Oe = {}))
class Ss {
  constructor(t, e, s, i) {
    ;(this.parser = t),
      (this.input = e),
      (this.ranges = i),
      (this.recovering = 0),
      (this.nextStackID = 9812),
      (this.minStackPos = 0),
      (this.reused = []),
      (this.stoppedAt = null),
      (this.stream = new gs(e, i)),
      (this.tokens = new ks(t, this.stream)),
      (this.topTerm = t.top[1])
    let { from: n } = i[0]
    ;(this.stacks = [Et.start(this, t.top[0], n)]),
      (this.fragments =
        s.length && this.stream.end - n > t.bufferLength * 4 ? new ms(s, t.nodeSet) : null)
  }
  get parsedPos() {
    return this.minStackPos
  }
  advance() {
    let t = this.stacks,
      e = this.minStackPos,
      s = (this.stacks = []),
      i,
      n
    for (let o = 0; o < t.length; o++) {
      let a = t[o]
      for (;;) {
        if (((this.tokens.mainToken = null), a.pos > e)) s.push(a)
        else {
          if (this.advanceStack(a, s, t)) continue
          {
            i || ((i = []), (n = [])), i.push(a)
            let h = this.tokens.getMainToken(a)
            n.push(h.value, h.end)
          }
        }
        break
      }
    }
    if (!s.length) {
      let o = i && xs(i)
      if (o) return this.stackToTree(o)
      if (this.parser.strict)
        throw (
          (_ &&
            i &&
            console.log(
              'Stuck with token ' +
                (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : 'none')
            ),
          new SyntaxError('No parse at ' + e))
        )
      this.recovering || (this.recovering = 5)
    }
    if (this.recovering && i) {
      let o = this.stoppedAt != null && i[0].pos > this.stoppedAt ? i[0] : this.runRecovery(i, n, s)
      if (o) return this.stackToTree(o.forceAll())
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3
      if (s.length > o) for (s.sort((a, h) => h.score - a.score); s.length > o; ) s.pop()
      s.some(a => a.reducePos > e) && this.recovering--
    } else if (s.length > 1) {
      t: for (let o = 0; o < s.length - 1; o++) {
        let a = s[o]
        for (let h = o + 1; h < s.length; h++) {
          let l = s[h]
          if (a.sameState(l) || (a.buffer.length > 500 && l.buffer.length > 500))
            if ((a.score - l.score || a.buffer.length - l.buffer.length) > 0) s.splice(h--, 1)
            else {
              s.splice(o--, 1)
              continue t
            }
        }
      }
    }
    this.minStackPos = s[0].pos
    for (let o = 1; o < s.length; o++) s[o].pos < this.minStackPos && (this.minStackPos = s[o].pos)
    return null
  }
  stopAt(t) {
    if (this.stoppedAt != null && this.stoppedAt < t)
      throw new RangeError("Can't move stoppedAt forward")
    this.stoppedAt = t
  }
  advanceStack(t, e, s) {
    let i = t.pos,
      { parser: n } = this,
      o = _ ? this.stackID(t) + ' -> ' : ''
    if (this.stoppedAt != null && i > this.stoppedAt) return t.forceReduce() ? t : null
    if (this.fragments) {
      let l = t.curContext && t.curContext.tracker.strict,
        d = l ? t.curContext.hash : 0
      for (let f = this.fragments.nodeAt(i); f; ) {
        let u = this.parser.nodeSet.types[f.type.id] == f.type ? n.getGoto(t.state, f.type.id) : -1
        if (u > -1 && f.length && (!l || (f.prop(w.contextHash) || 0) == d))
          return (
            t.useNode(f, u),
            _ && console.log(o + this.stackID(t) + ` (via reuse of ${n.getName(f.type.id)})`),
            !0
          )
        if (!(f instanceof v) || f.children.length == 0 || f.positions[0] > 0) break
        let O = f.children[0]
        if (O instanceof v && f.positions[0] == 0) f = O
        else break
      }
    }
    let a = n.stateSlot(t.state, 4)
    if (a > 0)
      return (
        t.reduce(a),
        _ && console.log(o + this.stackID(t) + ` (via always-reduce ${n.getName(a & 65535)})`),
        !0
      )
    if (t.stack.length >= 15e3) for (; t.stack.length > 9e3 && t.forceReduce(); );
    let h = this.tokens.getActions(t)
    for (let l = 0; l < h.length; ) {
      let d = h[l++],
        f = h[l++],
        u = h[l++],
        O = l == h.length || !s,
        m = O ? t : t.split()
      if (
        (m.apply(d, f, u),
        _ &&
          console.log(
            o +
              this.stackID(m) +
              ` (via ${
                (d & 65536) == 0 ? 'shift' : `reduce of ${n.getName(d & 65535)}`
              } for ${n.getName(f)} @ ${i}${m == t ? '' : ', split'})`
          ),
        O)
      )
        return !0
      m.pos > i ? e.push(m) : s.push(m)
    }
    return !1
  }
  advanceFully(t, e) {
    let s = t.pos
    for (;;) {
      if (!this.advanceStack(t, null, null)) return !1
      if (t.pos > s) return me(t, e), !0
    }
  }
  runRecovery(t, e, s) {
    let i = null,
      n = !1
    for (let o = 0; o < t.length; o++) {
      let a = t[o],
        h = e[o << 1],
        l = e[(o << 1) + 1],
        d = _ ? this.stackID(a) + ' -> ' : ''
      if (
        a.deadEnd &&
        (n ||
          ((n = !0),
          a.restart(),
          _ && console.log(d + this.stackID(a) + ' (restarted)'),
          this.advanceFully(a, s)))
      )
        continue
      let f = a.split(),
        u = d
      for (
        let O = 0;
        f.forceReduce() &&
        O < 10 &&
        (_ && console.log(u + this.stackID(f) + ' (via force-reduce)'), !this.advanceFully(f, s));
        O++
      )
        _ && (u = this.stackID(f) + ' -> ')
      for (let O of a.recoverByInsert(h))
        _ && console.log(d + this.stackID(O) + ' (via recover-insert)'), this.advanceFully(O, s)
      this.stream.end > a.pos
        ? (l == a.pos && (l++, (h = 0)),
          a.recoverByDelete(h, l),
          _ && console.log(d + this.stackID(a) + ` (via recover-delete ${this.parser.getName(h)})`),
          me(a, s))
        : (!i || i.score < a.score) && (i = a)
    }
    return i
  }
  stackToTree(t) {
    return (
      t.close(),
      v.build({
        buffer: Xt.create(t),
        nodeSet: this.parser.nodeSet,
        topID: this.topTerm,
        maxBufferLength: this.parser.bufferLength,
        reused: this.reused,
        start: this.ranges[0].from,
        length: t.pos - this.ranges[0].from,
        minRepeatType: this.parser.minRepeatTerm
      })
    )
  }
  stackID(t) {
    let e = (Mt || (Mt = new WeakMap())).get(t)
    return e || Mt.set(t, (e = String.fromCodePoint(this.nextStackID++))), e + t
  }
}
function me(r, t) {
  for (let e = 0; e < t.length; e++) {
    let s = t[e]
    if (s.pos == r.pos && s.sameState(r)) {
      t[e].score < r.score && (t[e] = r)
      return
    }
  }
  t.push(r)
}
class bs {
  constructor(t, e, s) {
    ;(this.source = t), (this.flags = e), (this.disabled = s)
  }
  allows(t) {
    return !this.disabled || this.disabled[t] == 0
  }
}
class Bt extends Ne {
  constructor(t) {
    if ((super(), (this.wrappers = []), t.version != 14))
      throw new RangeError(`Parser version (${t.version}) doesn't match runtime version (${14})`)
    let e = t.nodeNames.split(' ')
    this.minRepeatTerm = e.length
    for (let a = 0; a < t.repeatNodeCount; a++) e.push('')
    let s = Object.keys(t.topRules).map(a => t.topRules[a][1]),
      i = []
    for (let a = 0; a < e.length; a++) i.push([])
    function n(a, h, l) {
      i[a].push([h, h.deserialize(String(l))])
    }
    if (t.nodeProps)
      for (let a of t.nodeProps) {
        let h = a[0]
        typeof h == 'string' && (h = w[h])
        for (let l = 1; l < a.length; ) {
          let d = a[l++]
          if (d >= 0) n(d, h, a[l++])
          else {
            let f = a[l + -d]
            for (let u = -d; u > 0; u--) n(a[l++], h, f)
            l++
          }
        }
      }
    ;(this.nodeSet = new Ot(
      e.map((a, h) =>
        E.define({
          name: h >= this.minRepeatTerm ? void 0 : a,
          id: h,
          props: i[h],
          top: s.indexOf(h) > -1,
          error: h == 0,
          skipped: t.skippedNodes && t.skippedNodes.indexOf(h) > -1
        })
      )
    )),
      t.propSources && (this.nodeSet = this.nodeSet.extend(...t.propSources)),
      (this.strict = !1),
      (this.bufferLength = 1024)
    let o = yt(t.tokenData)
    ;(this.context = t.context),
      (this.specializerSpecs = t.specialized || []),
      (this.specialized = new Uint16Array(this.specializerSpecs.length))
    for (let a = 0; a < this.specializerSpecs.length; a++)
      this.specialized[a] = this.specializerSpecs[a].term
    ;(this.specializers = this.specializerSpecs.map(Se)),
      (this.states = yt(t.states, Uint32Array)),
      (this.data = yt(t.stateData)),
      (this.goto = yt(t.goto)),
      (this.maxTerm = t.maxTerm),
      (this.tokenizers = t.tokenizers.map(a => (typeof a == 'number' ? new At(o, a) : a))),
      (this.topRules = t.topRules),
      (this.dialects = t.dialects || {}),
      (this.dynamicPrecedences = t.dynamicPrecedences || null),
      (this.tokenPrecTable = t.tokenPrec),
      (this.termNames = t.termNames || null),
      (this.maxNode = this.nodeSet.types.length - 1),
      (this.dialect = this.parseDialect()),
      (this.top = this.topRules[Object.keys(this.topRules)[0]])
  }
  createParse(t, e, s) {
    let i = new Ss(this, t, e, s)
    for (let n of this.wrappers) i = n(i, t, e, s)
    return i
  }
  getGoto(t, e, s = !1) {
    let i = this.goto
    if (e >= i[0]) return -1
    for (let n = i[e + 1]; ; ) {
      let o = i[n++],
        a = o & 1,
        h = i[n++]
      if (a && s) return h
      for (let l = n + (o >> 1); n < l; n++) if (i[n] == t) return h
      if (a) return -1
    }
  }
  hasAction(t, e) {
    let s = this.data
    for (let i = 0; i < 2; i++)
      for (let n = this.stateSlot(t, i ? 2 : 1), o; ; n += 3) {
        if ((o = s[n]) == 65535)
          if (s[n + 1] == 1) o = s[(n = Z(s, n + 2))]
          else {
            if (s[n + 1] == 2) return Z(s, n + 2)
            break
          }
        if (o == e || o == 0) return Z(s, n + 1)
      }
    return 0
  }
  stateSlot(t, e) {
    return this.states[t * 6 + e]
  }
  stateFlag(t, e) {
    return (this.stateSlot(t, 0) & e) > 0
  }
  validAction(t, e) {
    if (e == this.stateSlot(t, 4)) return !0
    for (let s = this.stateSlot(t, 1); ; s += 3) {
      if (this.data[s] == 65535)
        if (this.data[s + 1] == 1) s = Z(this.data, s + 2)
        else return !1
      if (e == Z(this.data, s + 1)) return !0
    }
  }
  nextStates(t) {
    let e = []
    for (let s = this.stateSlot(t, 1); ; s += 3) {
      if (this.data[s] == 65535)
        if (this.data[s + 1] == 1) s = Z(this.data, s + 2)
        else break
      if ((this.data[s + 2] & 1) == 0) {
        let i = this.data[s + 1]
        e.some((n, o) => o & 1 && n == i) || e.push(this.data[s], i)
      }
    }
    return e
  }
  overrides(t, e) {
    let s = ke(this.data, this.tokenPrecTable, e)
    return s < 0 || ke(this.data, this.tokenPrecTable, t) < s
  }
  configure(t) {
    let e = Object.assign(Object.create(Bt.prototype), this)
    if ((t.props && (e.nodeSet = this.nodeSet.extend(...t.props)), t.top)) {
      let s = this.topRules[t.top]
      if (!s) throw new RangeError(`Invalid top rule name ${t.top}`)
      e.top = s
    }
    return (
      t.tokenizers &&
        (e.tokenizers = this.tokenizers.map(s => {
          let i = t.tokenizers.find(n => n.from == s)
          return i ? i.to : s
        })),
      t.specializers &&
        ((e.specializers = this.specializers.slice()),
        (e.specializerSpecs = this.specializerSpecs.map((s, i) => {
          let n = t.specializers.find(a => a.from == s.external)
          if (!n) return s
          let o = Object.assign(Object.assign({}, s), { external: n.to })
          return (e.specializers[i] = Se(o)), o
        }))),
      t.contextTracker && (e.context = t.contextTracker),
      t.dialect && (e.dialect = this.parseDialect(t.dialect)),
      t.strict != null && (e.strict = t.strict),
      t.wrap && (e.wrappers = e.wrappers.concat(t.wrap)),
      t.bufferLength != null && (e.bufferLength = t.bufferLength),
      e
    )
  }
  hasWrappers() {
    return this.wrappers.length > 0
  }
  getName(t) {
    return this.termNames
      ? this.termNames[t]
      : String((t <= this.maxNode && this.nodeSet.types[t].name) || t)
  }
  get eofTerm() {
    return this.maxNode + 1
  }
  get topNode() {
    return this.nodeSet.types[this.top[1]]
  }
  dynamicPrecedence(t) {
    let e = this.dynamicPrecedences
    return e == null ? 0 : e[t] || 0
  }
  parseDialect(t) {
    let e = Object.keys(this.dialects),
      s = e.map(() => !1)
    if (t)
      for (let n of t.split(' ')) {
        let o = e.indexOf(n)
        o >= 0 && (s[o] = !0)
      }
    let i = null
    for (let n = 0; n < e.length; n++)
      if (!s[n])
        for (let o = this.dialects[e[n]], a; (a = this.data[o++]) != 65535; )
          (i || (i = new Uint8Array(this.maxTerm + 1)))[a] = 1
    return new bs(t, s, i)
  }
  static deserialize(t) {
    return new Bt(t)
  }
}
function Z(r, t) {
  return r[t] | (r[t + 1] << 16)
}
function ke(r, t, e) {
  for (let s = t, i; (i = r[s]) != 65535; s++) if (i == e) return s - t
  return -1
}
function xs(r) {
  let t = null
  for (let e of r) {
    let s = e.p.stoppedAt
    ;(e.pos == e.p.stream.end || (s != null && e.pos > s)) &&
      e.p.parser.stateFlag(e.state, 2) &&
      (!t || t.score < e.score) &&
      (t = e)
  }
  return t
}
function Se(r) {
  if (r.external) {
    let t = r.extend ? 1 : 0
    return (e, s) => (r.external(e, s) << 1) | t
  }
  return r.get
}
const ys = 94,
  be = 1,
  Ps = 95,
  Qs = 96,
  xe = 2,
  Ie = [
    9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200,
    8201, 8202, 8232, 8233, 8239, 8287, 12288
  ],
  ws = 58,
  Cs = 40,
  Ee = 95,
  As = 91,
  $t = 45,
  $s = 46,
  vs = 35,
  Ls = 37
function Tt(r) {
  return (r >= 65 && r <= 90) || (r >= 97 && r <= 122) || r >= 161
}
function Ns(r) {
  return r >= 48 && r <= 57
}
const zs = new te((r, t) => {
    for (let e = !1, s = 0, i = 0; ; i++) {
      let { next: n } = r
      if (Tt(n) || n == $t || n == Ee || (e && Ns(n)))
        !e && (n != $t || i > 0) && (e = !0), s === i && n == $t && s++, r.advance()
      else {
        e && r.acceptToken(n == Cs ? Ps : s == 2 && t.canShift(xe) ? xe : Qs)
        break
      }
    }
  }),
  Is = new te(r => {
    if (Ie.includes(r.peek(-1))) {
      let { next: t } = r
      ;(Tt(t) || t == Ee || t == vs || t == $s || t == As || t == ws || t == $t) &&
        r.acceptToken(ys)
    }
  }),
  Es = new te(r => {
    if (!Ie.includes(r.peek(-1))) {
      let { next: t } = r
      if ((t == Ls && (r.advance(), r.acceptToken(be)), Tt(t))) {
        do r.advance()
        while (Tt(r.next))
        r.acceptToken(be)
      }
    }
  }),
  Xs = Jt({
    'AtKeyword import charset namespace keyframes media supports': c.definitionKeyword,
    'from to selector': c.keyword,
    NamespaceName: c.namespace,
    KeyframeName: c.labelName,
    TagName: c.tagName,
    ClassName: c.className,
    PseudoClassName: c.constant(c.className),
    IdName: c.labelName,
    'FeatureName PropertyName': c.propertyName,
    AttributeName: c.attributeName,
    NumberLiteral: c.number,
    KeywordQuery: c.keyword,
    UnaryQueryOp: c.operatorKeyword,
    'CallTag ValueName': c.atom,
    VariableName: c.variableName,
    Callee: c.operatorKeyword,
    Unit: c.unit,
    'UniversalSelector NestingSelector': c.definitionOperator,
    MatchOp: c.compareOperator,
    'ChildOp SiblingOp, LogicOp': c.logicOperator,
    BinOp: c.arithmeticOperator,
    Important: c.modifier,
    Comment: c.blockComment,
    ParenthesizedContent: c.special(c.name),
    ColorLiteral: c.color,
    StringLiteral: c.string,
    ':': c.punctuation,
    'PseudoOp #': c.derefOperator,
    '; ,': c.separator,
    '( )': c.paren,
    '[ ]': c.squareBracket,
    '{ }': c.brace
  }),
  Bs = {
    __proto__: null,
    lang: 32,
    'nth-child': 32,
    'nth-last-child': 32,
    'nth-of-type': 32,
    'nth-last-of-type': 32,
    dir: 32,
    'host-context': 32,
    url: 60,
    'url-prefix': 60,
    domain: 60,
    regexp: 60,
    selector: 134
  },
  Ts = {
    __proto__: null,
    '@import': 114,
    '@media': 138,
    '@charset': 142,
    '@namespace': 146,
    '@keyframes': 152,
    '@supports': 164
  },
  Rs = { __proto__: null, not: 128, only: 128, from: 158, to: 160 },
  ir = Bt.deserialize({
    version: 14,
    states:
      "7WQYQ[OOO#_Q[OOOOQP'#Cd'#CdOOQP'#Cc'#CcO#fQ[O'#CfO$YQXO'#CaO$aQ[O'#ChO$lQ[O'#DPO$qQ[O'#DTOOQP'#Ed'#EdO$vQdO'#DeO%bQ[O'#DrO$vQdO'#DtO%sQ[O'#DvO&OQ[O'#DyO&TQ[O'#EPO&cQ[O'#EROOQS'#Ec'#EcOOQS'#ET'#ETQYQ[OOO&jQXO'#CdO'_QWO'#DaO'dQWO'#EjO'oQ[O'#EjQOQWOOOOQP'#Cg'#CgOOQP,59Q,59QO#fQ[O,59QO'yQ[O'#EWO(eQWO,58{O(mQ[O,59SO$lQ[O,59kO$qQ[O,59oO'yQ[O,59sO'yQ[O,59uO'yQ[O,59vO(xQ[O'#D`OOQS,58{,58{OOQP'#Ck'#CkOOQO'#C}'#C}OOQP,59S,59SO)PQWO,59SO)UQWO,59SOOQP'#DR'#DROOQP,59k,59kOOQO'#DV'#DVO)ZQ`O,59oOOQS'#Cp'#CpO$vQdO'#CqO)cQvO'#CsO*pQtO,5:POOQO'#Cx'#CxO)UQWO'#CwO+UQWO'#CyOOQS'#Eg'#EgOOQO'#Dh'#DhO+ZQ[O'#DoO+iQWO'#EkO&TQ[O'#DmO+wQWO'#DpOOQO'#El'#ElO(hQWO,5:^O+|QpO,5:`OOQS'#Dx'#DxO,UQWO,5:bO,ZQ[O,5:bOOQO'#D{'#D{O,cQWO,5:eO,hQWO,5:kO,pQWO,5:mOOQS-E8R-E8RO$vQdO,59{O,xQ[O'#EYO-VQWO,5;UO-VQWO,5;UOOQP1G.l1G.lO-|QXO,5:rOOQO-E8U-E8UOOQS1G.g1G.gOOQP1G.n1G.nO)PQWO1G.nO)UQWO1G.nOOQP1G/V1G/VO.ZQ`O1G/ZO.tQXO1G/_O/[QXO1G/aO/rQXO1G/bO0YQWO,59zO0_Q[O'#DOO0fQdO'#CoOOQP1G/Z1G/ZO$vQdO1G/ZO0mQpO,59]OOQS,59_,59_O$vQdO,59aO0uQWO1G/kOOQS,59c,59cO0zQ!bO,59eO1SQWO'#DhO1_QWO,5:TO1dQWO,5:ZO&TQ[O,5:VO&TQ[O'#EZO1lQWO,5;VO1wQWO,5:XO'yQ[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O2YQWO1G/|O2_QdO'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XO2mQtO1G/gOOQO,5:t,5:tO3TQ[O,5:tOOQO-E8W-E8WO3bQWO1G0pOOQP7+$Y7+$YOOQP7+$u7+$uO$vQdO7+$uOOQS1G/f1G/fO3mQXO'#EiO3tQWO,59jO3yQtO'#EUO4nQdO'#EfO4xQWO,59ZO4}QpO7+$uOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO5VQWO1G/PO$vQdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO5[QWO,5:uOOQO-E8X-E8XO5jQXO1G/vOOQS7+%h7+%hO5qQYO'#CsO(hQWO'#E[O5yQdO,5:hOOQS,5:h,5:hO6XQtO'#EXO$vQdO'#EXO7VQdO7+%ROOQO7+%R7+%ROOQO1G0`1G0`O7jQpO<<HaO7rQWO,5;TOOQP1G/U1G/UOOQS-E8S-E8SO$vQdO'#EVO7zQWO,5;QOOQT1G.u1G.uOOQP<<Ha<<HaOOQS7+$k7+$kO8SQdO7+%ZOOQO7+%b7+%bOOQS,5:v,5:vOOQS-E8Y-E8YOOQS1G0S1G0SO8ZQtO,5:sOOQS-E8V-E8VOOQO<<Hm<<HmOOQPAN={AN={O9XQdO,5:qOOQO-E8T-E8TOOQO<<Hu<<Hu",
    stateData:
      "9i~O#UOSROS~OUXOXXO]UO^UOtVOxWO!Y`O!ZYO!gZO!i[O!k]O!n^O!t_O#SQO#XSO~OQeOUXOXXO]UO^UOtVOxWO!Y`O!ZYO!gZO!i[O!k]O!n^O!t_O#SdO#XSO~O#P#^P~P!ZO#SiO~O]nO^nOplOtoOxpO|qO!PsO#QrO#XkO~O!RtO~P#kO`zO#RwO#SvO~O#S{O~O#S}O~OQ!WOb!QOf!WOh!WOn!VO#R!TO#S!PO#[!RO~Ob!YO!b![O!e!]O#S!XO!R#_P~Oh!bOn!VO#S!aO~O#S!dO~Ob!YO!b![O!e!]O#S!XO~O!W#_P~P%bO]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#QWX#XWX~O]!iO~O!W!jO#P#^X!Q#^X~O#P#^X!Q#^X~P!ZOUXOXXO]UO^UOtVOxWO#SQO#XSO~OplO!RtO~O`!sO#RwO#SvO~O!Q#^P~P!ZOb!zO~Ob!{O~Ov!|Oz!}O~OP#PObgXjgX!WgX!bgX!egX#SgXagXQgXfgXhgXngXpgX!VgX#PgX#RgX#[gXvgX!QgX~Ob!YOj#QO!b![O!e!]O#S!XO!W#_P~Ob#TO~Ob!YO!b![O!e!]O#S#UO~Op#YO!`#XO!R#_X!W#_X~Ob#]O~Oj#QO!W#_O~O!W#`O~Oh#aOn!VO~O!R#bO~O!RtO!`#XO~O!RtO!W#eO~O!W!|X#P!|X!Q!|X~P!ZO!W!jO#P#^a!Q#^a~O]nO^nOtoOxpO|qO!PsO#QrO#XkO~Op!za!R!zaa!za~P-bOv#lOz#mO~O]nO^nOtoOxpO#XkO~Op{i|{i!P{i!R{i#Q{ia{i~P.cOp}i|}i!P}i!R}i#Q}ia}i~P.cOp!Oi|!Oi!P!Oi!R!Oi#Q!Oia!Oi~P.cO!Q#nO~Oa#]P~P'yOa#YP~P$vOa#uOj#QO~O!W#wO~Oh#xOo#xO~O]!^Xa![X!`![X~O]#yO~Oa#zO!`#XO~Op#YO!R#_a!W#_a~O!`#XOp!aa!R!aa!W!aaa!aa~O!W$PO~O!Q$TO!q$RO!r$RO#[$QO~Oj#QOp$VO!V$XO!W!Ti#P!Ti!Q!Ti~P$vO!W!|a#P!|a!Q!|a~P!ZO!W!jO#P#^i!Q#^i~Oa#]X~P#kOa$]O~Oj#QOQ!xXa!xXb!xXf!xXh!xXn!xXp!xX#R!xX#S!xX#[!xX~Op$_Oa#YX~P$vOa$aO~Oj#QOv$bO~Oa$cO~O!`#XOp!}a!R!}a!W!}a~Oa$eO~P-bOP#PO!RgX~O!Q$hO!q$RO!r$RO#[$QO~Oj#QOQ!{Xb!{Xf!{Xh!{Xn!{Xp!{X!V!{X!W!{X#P!{X#R!{X#S!{X#[!{X!Q!{X~Op$VO!V$kO!W!Tq#P!Tq!Q!Tq~P$vOj#QOv$lO~OplOa#]a~Op$_Oa#Ya~Oa$oO~P$vOj#QOQ!{ab!{af!{ah!{an!{ap!{a!V!{a!W!{a#P!{a#R!{a#S!{a#[!{a!Q!{a~Oa!yap!ya~P$vOo#[j!Pj~",
    goto: ",`#aPPPPP#bP#k#zP#k$Z#kPP$aPPP$g$p$pP%SP$pP$p%j%|PPP&f&l#kP&rP#kP&xP#kP#k#kPPP'O'b'oPP#bPP'v'v(Q'vP'vP'v'vP#bP#bP#bP(T#bP(W(ZPP#bP#bP(^(m({)R)])c)m)sPPPPPP)y*SP*o*rP+h+k+q+z_aOPcgt!j#hkXOPcglqrst!j!z#]#hkROPcglqrst!j!z#]#hQjSR!mkQxUR!qnQ!qzQ#S!UR#k!sq!WY[!Q!i!{!}#Q#f#m#r#y$V$W$_$d$mp!WY[!Q!i!{!}#Q#f#m#r#y$V$W$_$d$mT$R#b$Sq!UY[!Q!i!{!}#Q#f#m#r#y$V$W$_$d$mp!WY[!Q!i!{!}#Q#f#m#r#y$V$W$_$d$mQ!b]R#a!cQyUR!rnQ!qyR#k!rQ|VR!toQ!OWR!upQuTQ!pmQ#^!_Q#d!fQ#e!gR$f$RSfPtQ!lgQ#g!jR$Y#hZePgt!j#ha!^Z_`!S!Y![#X#YR#V!YR!c]R!e^R#c!eQcOSgPtU!hcg#hR#h!jQ#r!{U$^#r$d$mQ$d#yR$m$_Q$`#rR$n$`QmTS!om$[R$[#oQ$W#fR$j$WQ!kfS#i!k#jR#j!lQ#Z!ZR#}#ZQ$S#bR$g$S_bOPcgt!j#h^TOPcgt!j#hQ!nlQ!vqQ!wrQ!xsQ#o!zR$O#]R#s!{Q!SYQ!`[Q#O!QQ#f!i[#q!{#r#y$_$d$mQ#t!}Q#v#QS$U#f$WQ$Z#mR$i$VR#p!zQhPR!ytQ!_ZQ!g`R#R!SU!ZZ`!SQ!f_Q#W!YQ#[![Q#{#XR#|#Y",
    nodeNames:
      '\u26A0 Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList from to SupportsStatement supports AtRule Styles',
    maxTerm: 108,
    nodeProps: [
      ['openedBy', 17, '(', 48, '{'],
      ['closedBy', 18, ')', 49, '}']
    ],
    propSources: [Xs],
    skippedNodes: [0, 3],
    repeatNodeCount: 8,
    tokenData:
      "Lq~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Cu![!]Dp!]!^El!^!_$}!_!`E}!`!aF`!a!b$}!b!cG[!c!}$}!}#OHt#O#P$}#P#QIV#Q#R6d#R#T$}#T#UIh#U#c$}#c#dJy#d#o$}#o#pK`#p#q6d#q#rKq#r#sLS#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;'S$};'S;=`Lk<%lO$}W%QSOy%^z;'S%^;'S;=`%o<%lO%^W%cSoWOy%^z;'S%^;'S;=`%o<%lO%^W%rP;=`<%l%^~%zh#U~OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^~'mh#U~oWOX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^^)[UOy%^z#]%^#]#^)n#^;'S%^;'S;=`%o<%lO%^^)sUoWOy%^z#a%^#a#b*V#b;'S%^;'S;=`%o<%lO%^^*[UoWOy%^z#d%^#d#e*n#e;'S%^;'S;=`%o<%lO%^^*sUoWOy%^z#c%^#c#d+V#d;'S%^;'S;=`%o<%lO%^^+[UoWOy%^z#f%^#f#g+n#g;'S%^;'S;=`%o<%lO%^^+sUoWOy%^z#h%^#h#i,V#i;'S%^;'S;=`%o<%lO%^^,[UoWOy%^z#T%^#T#U,n#U;'S%^;'S;=`%o<%lO%^^,sUoWOy%^z#b%^#b#c-V#c;'S%^;'S;=`%o<%lO%^^-[UoWOy%^z#h%^#h#i-n#i;'S%^;'S;=`%o<%lO%^^-uS!VUoWOy%^z;'S%^;'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o<%lO.R~.sOh~~.vRO;'S.R;'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.R_/zYtPOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;'S%^;'S;=`%o<%lO%^^0oYoWOy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;'S%^;'S;=`%o<%lO%^^1dYoWOy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;'S%^;'S;=`%o<%lO%^^2ZYfUoWOy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;'S%^;'S;=`%o<%lO%^^3QYfUoWOy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;'S%^;'S;=`%o<%lO%^^3uYoWOy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;'S%^;'S;=`%o<%lO%^^4lYfUoWOy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;'S%^;'S;=`%o<%lO%^^5aYoWOy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;'S%^;'S;=`%o<%lO%^^6WSfUoWOy%^z;'S%^;'S;=`%o<%lO%^Y6gUOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^Y7QSzQoWOy%^z;'S%^;'S;=`%o<%lO%^X7cSXPOy%^z;'S%^;'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W<%lO7o~8_RO;'S7o;'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7o_9cSbVOy%^z;'S%^;'S;=`%o<%lO%^~9tOa~_9{UUPjSOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^_:fWjS!PPOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^^;TUoWOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^^;nYoW#[UOy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^^<cYoWOy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^^=WUoWOy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^^=qUoW#[UOy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^^>[[oW#[UOy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^_?VSpVOy%^z;'S%^;'S;=`%o<%lO%^^?hWjSOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^_@VU#XPOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^~@nTjSOy%^z{@}{;'S%^;'S;=`%o<%lO%^~ASUoWOy@}yzAfz{Bm{;'S@};'S;=`Co<%lO@}~AiTOzAfz{Ax{;'SAf;'S;=`Bg<%lOAf~A{VOzAfz{Ax{!PAf!P!QBb!Q;'SAf;'S;=`Bg<%lOAf~BgOR~~BjP;=`<%lAf~BrWoWOy@}yzAfz{Bm{!P@}!P!QC[!Q;'S@};'S;=`Co<%lO@}~CcSoWR~Oy%^z;'S%^;'S;=`%o<%lO%^~CrP;=`<%l@}^Cz[#[UOy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^XDuU]POy%^z![%^![!]EX!];'S%^;'S;=`%o<%lO%^XE`S^PoWOy%^z;'S%^;'S;=`%o<%lO%^_EqS!WVOy%^z;'S%^;'S;=`%o<%lO%^YFSSzQOy%^z;'S%^;'S;=`%o<%lO%^XFeU|POy%^z!`%^!`!aFw!a;'S%^;'S;=`%o<%lO%^XGOS|PoWOy%^z;'S%^;'S;=`%o<%lO%^XG_WOy%^z!c%^!c!}Gw!}#T%^#T#oGw#o;'S%^;'S;=`%o<%lO%^XHO[!YPoWOy%^z}%^}!OGw!O!Q%^!Q![Gw![!c%^!c!}Gw!}#T%^#T#oGw#o;'S%^;'S;=`%o<%lO%^XHySxPOy%^z;'S%^;'S;=`%o<%lO%^^I[SvUOy%^z;'S%^;'S;=`%o<%lO%^XIkUOy%^z#b%^#b#cI}#c;'S%^;'S;=`%o<%lO%^XJSUoWOy%^z#W%^#W#XJf#X;'S%^;'S;=`%o<%lO%^XJmS!`PoWOy%^z;'S%^;'S;=`%o<%lO%^XJ|UOy%^z#f%^#f#gJf#g;'S%^;'S;=`%o<%lO%^XKeS!RPOy%^z;'S%^;'S;=`%o<%lO%^_KvS!QVOy%^z;'S%^;'S;=`%o<%lO%^ZLXU!PPOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^WLnP;=`<%l$}",
    tokenizers: [Is, Es, zs, 0, 1, 2, 3],
    topRules: { StyleSheet: [0, 4], Styles: [1, 84] },
    specialized: [
      { term: 95, get: r => Bs[r] || -1 },
      { term: 56, get: r => Ts[r] || -1 },
      { term: 96, get: r => Rs[r] || -1 }
    ],
    tokenPrec: 1123
  })
class Rt {
  constructor(t, e, s, i, n, o, a) {
    ;(this.type = t),
      (this.value = e),
      (this.from = s),
      (this.hash = i),
      (this.end = n),
      (this.children = o),
      (this.positions = a),
      (this.hashProp = [[w.contextHash, i]])
  }
  static create(t, e, s, i, n) {
    let o = (i + (i << 8) + t + (e << 4)) | 0
    return new Rt(t, e, s, o, n, [], [])
  }
  addChild(t, e) {
    t.prop(w.contextHash) != this.hash &&
      (t = new v(t.type, t.children, t.positions, t.length, this.hashProp)),
      this.children.push(t),
      this.positions.push(e)
  }
  toTree(t, e = this.end) {
    let s = this.children.length - 1
    return (
      s >= 0 && (e = Math.max(e, this.positions[s] + this.children[s].length + this.from)),
      new v(t.types[this.type], this.children, this.positions, e - this.from).balance({
        makeTree: (n, o, a) => new v(E.none, n, o, a, this.hashProp)
      })
    )
  }
}
var g
;(function (r) {
  ;(r[(r.Document = 1)] = 'Document'),
    (r[(r.CodeBlock = 2)] = 'CodeBlock'),
    (r[(r.FencedCode = 3)] = 'FencedCode'),
    (r[(r.Blockquote = 4)] = 'Blockquote'),
    (r[(r.HorizontalRule = 5)] = 'HorizontalRule'),
    (r[(r.BulletList = 6)] = 'BulletList'),
    (r[(r.OrderedList = 7)] = 'OrderedList'),
    (r[(r.ListItem = 8)] = 'ListItem'),
    (r[(r.ATXHeading1 = 9)] = 'ATXHeading1'),
    (r[(r.ATXHeading2 = 10)] = 'ATXHeading2'),
    (r[(r.ATXHeading3 = 11)] = 'ATXHeading3'),
    (r[(r.ATXHeading4 = 12)] = 'ATXHeading4'),
    (r[(r.ATXHeading5 = 13)] = 'ATXHeading5'),
    (r[(r.ATXHeading6 = 14)] = 'ATXHeading6'),
    (r[(r.SetextHeading1 = 15)] = 'SetextHeading1'),
    (r[(r.SetextHeading2 = 16)] = 'SetextHeading2'),
    (r[(r.HTMLBlock = 17)] = 'HTMLBlock'),
    (r[(r.LinkReference = 18)] = 'LinkReference'),
    (r[(r.Paragraph = 19)] = 'Paragraph'),
    (r[(r.CommentBlock = 20)] = 'CommentBlock'),
    (r[(r.ProcessingInstructionBlock = 21)] = 'ProcessingInstructionBlock'),
    (r[(r.Escape = 22)] = 'Escape'),
    (r[(r.Entity = 23)] = 'Entity'),
    (r[(r.HardBreak = 24)] = 'HardBreak'),
    (r[(r.Emphasis = 25)] = 'Emphasis'),
    (r[(r.StrongEmphasis = 26)] = 'StrongEmphasis'),
    (r[(r.Link = 27)] = 'Link'),
    (r[(r.Image = 28)] = 'Image'),
    (r[(r.InlineCode = 29)] = 'InlineCode'),
    (r[(r.HTMLTag = 30)] = 'HTMLTag'),
    (r[(r.Comment = 31)] = 'Comment'),
    (r[(r.ProcessingInstruction = 32)] = 'ProcessingInstruction'),
    (r[(r.URL = 33)] = 'URL'),
    (r[(r.HeaderMark = 34)] = 'HeaderMark'),
    (r[(r.QuoteMark = 35)] = 'QuoteMark'),
    (r[(r.ListMark = 36)] = 'ListMark'),
    (r[(r.LinkMark = 37)] = 'LinkMark'),
    (r[(r.EmphasisMark = 38)] = 'EmphasisMark'),
    (r[(r.CodeMark = 39)] = 'CodeMark'),
    (r[(r.CodeText = 40)] = 'CodeText'),
    (r[(r.CodeInfo = 41)] = 'CodeInfo'),
    (r[(r.LinkTitle = 42)] = 'LinkTitle'),
    (r[(r.LinkLabel = 43)] = 'LinkLabel')
})(g || (g = {}))
class Ws {
  constructor(t, e) {
    ;(this.start = t), (this.content = e), (this.marks = []), (this.parsers = [])
  }
}
class _s {
  constructor() {
    ;(this.text = ''),
      (this.baseIndent = 0),
      (this.basePos = 0),
      (this.depth = 0),
      (this.markers = []),
      (this.pos = 0),
      (this.indent = 0),
      (this.next = -1)
  }
  forward() {
    this.basePos > this.pos && this.forwardInner()
  }
  forwardInner() {
    let t = this.skipSpace(this.basePos)
    ;(this.indent = this.countIndent(t, this.pos, this.indent)),
      (this.pos = t),
      (this.next = t == this.text.length ? -1 : this.text.charCodeAt(t))
  }
  skipSpace(t) {
    return dt(this.text, t)
  }
  reset(t) {
    for (
      this.text = t,
        this.baseIndent = this.basePos = this.pos = this.indent = 0,
        this.forwardInner(),
        this.depth = 1;
      this.markers.length;

    )
      this.markers.pop()
  }
  moveBase(t) {
    ;(this.basePos = t), (this.baseIndent = this.countIndent(t, this.pos, this.indent))
  }
  moveBaseColumn(t) {
    ;(this.baseIndent = t), (this.basePos = this.findColumn(t))
  }
  addMarker(t) {
    this.markers.push(t)
  }
  countIndent(t, e = 0, s = 0) {
    for (let i = e; i < t; i++) s += this.text.charCodeAt(i) == 9 ? 4 - (s % 4) : 1
    return s
  }
  findColumn(t) {
    let e = 0
    for (let s = 0; e < this.text.length && s < t; e++)
      s += this.text.charCodeAt(e) == 9 ? 4 - (s % 4) : 1
    return e
  }
  scrub() {
    if (!this.baseIndent) return this.text
    let t = ''
    for (let e = 0; e < this.basePos; e++) t += ' '
    return t + this.text.slice(this.basePos)
  }
}
function ye(r, t, e) {
  if (
    e.pos == e.text.length ||
    (r != t.block && e.indent >= t.stack[e.depth + 1].value + e.baseIndent)
  )
    return !0
  if (e.indent >= e.baseIndent + 4) return !1
  let s = (r.type == g.OrderedList ? re : se)(e, t, !1)
  return (
    s > 0 &&
    (r.type != g.BulletList || ee(e, t, !1) < 0) &&
    e.text.charCodeAt(e.pos + s - 1) == r.value
  )
}
const Xe = {
  [g.Blockquote](r, t, e) {
    return e.next != 62
      ? !1
      : (e.markers.push(Q(g.QuoteMark, t.lineStart + e.pos, t.lineStart + e.pos + 1)),
        e.moveBase(e.pos + (T(e.text.charCodeAt(e.pos + 1)) ? 2 : 1)),
        (r.end = t.lineStart + e.text.length),
        !0)
  },
  [g.ListItem](r, t, e) {
    return e.indent < e.baseIndent + r.value && e.next > -1
      ? !1
      : (e.moveBaseColumn(e.baseIndent + r.value), !0)
  },
  [g.OrderedList]: ye,
  [g.BulletList]: ye,
  [g.Document]() {
    return !0
  }
}
function T(r) {
  return r == 32 || r == 9 || r == 10 || r == 13
}
function dt(r, t = 0) {
  for (; t < r.length && T(r.charCodeAt(t)); ) t++
  return t
}
function Pe(r, t, e) {
  for (; t > e && T(r.charCodeAt(t - 1)); ) t--
  return t
}
function Be(r) {
  if (r.next != 96 && r.next != 126) return -1
  let t = r.pos + 1
  for (; t < r.text.length && r.text.charCodeAt(t) == r.next; ) t++
  if (t < r.pos + 3) return -1
  if (r.next == 96) {
    for (let e = t; e < r.text.length; e++) if (r.text.charCodeAt(e) == 96) return -1
  }
  return t
}
function Te(r) {
  return r.next != 62 ? -1 : r.text.charCodeAt(r.pos + 1) == 32 ? 2 : 1
}
function ee(r, t, e) {
  if (r.next != 42 && r.next != 45 && r.next != 95) return -1
  let s = 1
  for (let i = r.pos + 1; i < r.text.length; i++) {
    let n = r.text.charCodeAt(i)
    if (n == r.next) s++
    else if (!T(n)) return -1
  }
  return (e && r.next == 45 && _e(r) > -1 && r.depth == t.stack.length) || s < 3 ? -1 : 1
}
function Re(r, t) {
  for (let e = r.stack.length - 1; e >= 0; e--) if (r.stack[e].type == t) return !0
  return !1
}
function se(r, t, e) {
  return (r.next == 45 || r.next == 43 || r.next == 42) &&
    (r.pos == r.text.length - 1 || T(r.text.charCodeAt(r.pos + 1))) &&
    (!e || Re(t, g.BulletList) || r.skipSpace(r.pos + 2) < r.text.length)
    ? 1
    : -1
}
function re(r, t, e) {
  let s = r.pos,
    i = r.next
  for (; i >= 48 && i <= 57; ) {
    s++
    if (s == r.text.length) return -1
    i = r.text.charCodeAt(s)
  }
  return s == r.pos ||
    s > r.pos + 9 ||
    (i != 46 && i != 41) ||
    (s < r.text.length - 1 && !T(r.text.charCodeAt(s + 1))) ||
    (e &&
      !Re(t, g.OrderedList) &&
      (r.skipSpace(s + 1) == r.text.length || s > r.pos + 1 || r.next != 49))
    ? -1
    : s + 1 - r.pos
}
function We(r) {
  if (r.next != 35) return -1
  let t = r.pos + 1
  for (; t < r.text.length && r.text.charCodeAt(t) == 35; ) t++
  if (t < r.text.length && r.text.charCodeAt(t) != 32) return -1
  let e = t - r.pos
  return e > 6 ? -1 : e
}
function _e(r) {
  if ((r.next != 45 && r.next != 61) || r.indent >= r.baseIndent + 4) return -1
  let t = r.pos + 1
  for (; t < r.text.length && r.text.charCodeAt(t) == r.next; ) t++
  let e = t
  for (; t < r.text.length && T(r.text.charCodeAt(t)); ) t++
  return t == r.text.length ? e : -1
}
const Gt = /^[ \t]*$/,
  Me = /-->/,
  Ue = /\?>/,
  Vt = [
    [/^<(?:script|pre|style)(?:\s|>|$)/i, /<\/(?:script|pre|style)>/i],
    [/^\s*<!--/, Me],
    [/^\s*<\?/, Ue],
    [/^\s*<![A-Z]/, />/],
    [/^\s*<!\[CDATA\[/, /\]\]>/],
    [
      /^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i,
      Gt
    ],
    [
      /^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i,
      Gt
    ]
  ]
function De(r, t, e) {
  if (r.next != 60) return -1
  let s = r.text.slice(r.pos)
  for (let i = 0, n = Vt.length - (e ? 1 : 0); i < n; i++) if (Vt[i][0].test(s)) return i
  return -1
}
function Qe(r, t) {
  let e = r.countIndent(t, r.pos, r.indent),
    s = r.countIndent(r.skipSpace(t), t, e)
  return s >= e + 5 ? e + 1 : s
}
function rt(r, t, e) {
  let s = r.length - 1
  s >= 0 && r[s].to == t && r[s].type == g.CodeText ? (r[s].to = e) : r.push(Q(g.CodeText, t, e))
}
const Pt = {
  LinkReference: void 0,
  IndentedCode(r, t) {
    let e = t.baseIndent + 4
    if (t.indent < e) return !1
    let s = t.findColumn(e),
      i = r.lineStart + s,
      n = r.lineStart + t.text.length,
      o = [],
      a = []
    for (rt(o, i, n); r.nextLine() && t.depth >= r.stack.length; )
      if (t.pos == t.text.length) {
        rt(a, r.lineStart - 1, r.lineStart)
        for (let h of t.markers) a.push(h)
      } else {
        if (t.indent < e) break
        {
          if (a.length) {
            for (let l of a) l.type == g.CodeText ? rt(o, l.from, l.to) : o.push(l)
            a = []
          }
          rt(o, r.lineStart - 1, r.lineStart)
          for (let l of t.markers) o.push(l)
          n = r.lineStart + t.text.length
          let h = r.lineStart + t.findColumn(t.baseIndent + 4)
          h < n && rt(o, h, n)
        }
      }
    return (
      a.length &&
        ((a = a.filter(h => h.type != g.CodeText)), a.length && (t.markers = a.concat(t.markers))),
      r.addNode(r.buffer.writeElements(o, -i).finish(g.CodeBlock, n - i), i),
      !0
    )
  },
  FencedCode(r, t) {
    let e = Be(t)
    if (e < 0) return !1
    let s = r.lineStart + t.pos,
      i = t.next,
      n = e - t.pos,
      o = t.skipSpace(e),
      a = Pe(t.text, t.text.length, o),
      h = [Q(g.CodeMark, s, s + n)]
    o < a && h.push(Q(g.CodeInfo, r.lineStart + o, r.lineStart + a))
    for (let l = !0; r.nextLine() && t.depth >= r.stack.length; l = !1) {
      let d = t.pos
      if (t.indent - t.baseIndent < 4) for (; d < t.text.length && t.text.charCodeAt(d) == i; ) d++
      if (d - t.pos >= n && t.skipSpace(d) == t.text.length) {
        for (let f of t.markers) h.push(f)
        h.push(Q(g.CodeMark, r.lineStart + t.pos, r.lineStart + d)), r.nextLine()
        break
      } else {
        l || rt(h, r.lineStart - 1, r.lineStart)
        for (let O of t.markers) h.push(O)
        let f = r.lineStart + t.basePos,
          u = r.lineStart + t.text.length
        f < u && rt(h, f, u)
      }
    }
    return r.addNode(r.buffer.writeElements(h, -s).finish(g.FencedCode, r.prevLineEnd() - s), s), !0
  },
  Blockquote(r, t) {
    let e = Te(t)
    return e < 0
      ? !1
      : (r.startContext(g.Blockquote, t.pos),
        r.addNode(g.QuoteMark, r.lineStart + t.pos, r.lineStart + t.pos + 1),
        t.moveBase(t.pos + e),
        null)
  },
  HorizontalRule(r, t) {
    if (ee(t, r, !1) < 0) return !1
    let e = r.lineStart + t.pos
    return r.nextLine(), r.addNode(g.HorizontalRule, e), !0
  },
  BulletList(r, t) {
    let e = se(t, r, !1)
    if (e < 0) return !1
    r.block.type != g.BulletList && r.startContext(g.BulletList, t.basePos, t.next)
    let s = Qe(t, t.pos + 1)
    return (
      r.startContext(g.ListItem, t.basePos, s - t.baseIndent),
      r.addNode(g.ListMark, r.lineStart + t.pos, r.lineStart + t.pos + e),
      t.moveBaseColumn(s),
      null
    )
  },
  OrderedList(r, t) {
    let e = re(t, r, !1)
    if (e < 0) return !1
    r.block.type != g.OrderedList &&
      r.startContext(g.OrderedList, t.basePos, t.text.charCodeAt(t.pos + e - 1))
    let s = Qe(t, t.pos + e)
    return (
      r.startContext(g.ListItem, t.basePos, s - t.baseIndent),
      r.addNode(g.ListMark, r.lineStart + t.pos, r.lineStart + t.pos + e),
      t.moveBaseColumn(s),
      null
    )
  },
  ATXHeading(r, t) {
    let e = We(t)
    if (e < 0) return !1
    let s = t.pos,
      i = r.lineStart + s,
      n = Pe(t.text, t.text.length, s),
      o = n
    for (; o > s && t.text.charCodeAt(o - 1) == t.next; ) o--
    ;(o == n || o == s || !T(t.text.charCodeAt(o - 1))) && (o = t.text.length)
    let a = r.buffer
      .write(g.HeaderMark, 0, e)
      .writeElements(r.parser.parseInline(t.text.slice(s + e + 1, o), i + e + 1), -i)
    o < t.text.length && a.write(g.HeaderMark, o - s, n - s)
    let h = a.finish(g.ATXHeading1 - 1 + e, t.text.length - s)
    return r.nextLine(), r.addNode(h, i), !0
  },
  HTMLBlock(r, t) {
    let e = De(t, r, !1)
    if (e < 0) return !1
    let s = r.lineStart + t.pos,
      i = Vt[e][1],
      n = [],
      o = i != Gt
    for (; !i.test(t.text) && r.nextLine(); ) {
      if (t.depth < r.stack.length) {
        o = !1
        break
      }
      for (let l of t.markers) n.push(l)
    }
    o && r.nextLine()
    let a = i == Me ? g.CommentBlock : i == Ue ? g.ProcessingInstructionBlock : g.HTMLBlock,
      h = r.prevLineEnd()
    return r.addNode(r.buffer.writeElements(n, -s).finish(a, h - s), s), !0
  },
  SetextHeading: void 0
}
class Ms {
  constructor(t) {
    ;(this.stage = 0),
      (this.elts = []),
      (this.pos = 0),
      (this.start = t.start),
      this.advance(t.content)
  }
  nextLine(t, e, s) {
    if (this.stage == -1) return !1
    let i =
        s.content +
        `
` +
        e.scrub(),
      n = this.advance(i)
    return n > -1 && n < i.length ? this.complete(t, s, n) : !1
  }
  finish(t, e) {
    return (this.stage == 2 || this.stage == 3) && dt(e.content, this.pos) == e.content.length
      ? this.complete(t, e, e.content.length)
      : !1
  }
  complete(t, e, s) {
    return t.addLeafElement(e, Q(g.LinkReference, this.start, this.start + s, this.elts)), !0
  }
  nextStage(t) {
    return t
      ? ((this.pos = t.to - this.start), this.elts.push(t), this.stage++, !0)
      : (t === !1 && (this.stage = -1), !1)
  }
  advance(t) {
    for (;;) {
      if (this.stage == -1) return -1
      if (this.stage == 0) {
        if (!this.nextStage(Ke(t, this.pos, this.start, !0))) return -1
        if (t.charCodeAt(this.pos) != 58) return (this.stage = -1)
        this.elts.push(Q(g.LinkMark, this.pos + this.start, this.pos + this.start + 1)), this.pos++
      } else if (this.stage == 1) {
        if (!this.nextStage(Fe(t, dt(t, this.pos), this.start))) return -1
      } else if (this.stage == 2) {
        let e = dt(t, this.pos),
          s = 0
        if (e > this.pos) {
          let i = qe(t, e, this.start)
          if (i) {
            let n = Ut(t, i.to - this.start)
            n > 0 && (this.nextStage(i), (s = n))
          }
        }
        return s || (s = Ut(t, this.pos)), s > 0 && s < t.length ? s : -1
      } else return Ut(t, this.pos)
    }
  }
}
function Ut(r, t) {
  for (; t < r.length; t++) {
    let e = r.charCodeAt(t)
    if (e == 10) break
    if (!T(e)) return -1
  }
  return t
}
class Us {
  nextLine(t, e, s) {
    let i = e.depth < t.stack.length ? -1 : _e(e),
      n = e.next
    if (i < 0) return !1
    let o = Q(g.HeaderMark, t.lineStart + e.pos, t.lineStart + i)
    return (
      t.nextLine(),
      t.addLeafElement(
        s,
        Q(n == 61 ? g.SetextHeading1 : g.SetextHeading2, s.start, t.prevLineEnd(), [
          ...t.parser.parseInline(s.content, s.start),
          o
        ])
      ),
      !0
    )
  }
  finish() {
    return !1
  }
}
const Ds = {
    LinkReference(r, t) {
      return t.content.charCodeAt(0) == 91 ? new Ms(t) : null
    },
    SetextHeading() {
      return new Us()
    }
  },
  Hs = [
    (r, t) => We(t) >= 0,
    (r, t) => Be(t) >= 0,
    (r, t) => Te(t) >= 0,
    (r, t) => se(t, r, !0) >= 0,
    (r, t) => re(t, r, !0) >= 0,
    (r, t) => ee(t, r, !0) >= 0,
    (r, t) => De(t, r, !0) >= 0
  ],
  js = { text: '', end: 0 }
class Gs {
  constructor(t, e, s, i) {
    ;(this.parser = t),
      (this.input = e),
      (this.ranges = i),
      (this.line = new _s()),
      (this.atEnd = !1),
      (this.dontInject = new Set()),
      (this.stoppedAt = null),
      (this.rangeI = 0),
      (this.to = i[i.length - 1].to),
      (this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = i[0].from),
      (this.block = Rt.create(g.Document, 0, this.lineStart, 0, 0)),
      (this.stack = [this.block]),
      (this.fragments = s.length ? new Fs(s, e) : null),
      this.readLine()
  }
  get parsedPos() {
    return this.absoluteLineStart
  }
  advance() {
    if (this.stoppedAt != null && this.absoluteLineStart > this.stoppedAt) return this.finish()
    let { line: t } = this
    for (;;) {
      for (; t.depth < this.stack.length; ) this.finishContext()
      for (let s of t.markers) this.addNode(s.type, s.from, s.to)
      if (t.pos < t.text.length) break
      if (!this.nextLine()) return this.finish()
    }
    if (this.fragments && this.reuseFragment(t.basePos)) return null
    t: for (;;) {
      for (let s of this.parser.blockParsers)
        if (s) {
          let i = s(this, t)
          if (i != !1) {
            if (i == !0) return null
            t.forward()
            continue t
          }
        }
      break
    }
    let e = new Ws(this.lineStart + t.pos, t.text.slice(t.pos))
    for (let s of this.parser.leafBlockParsers)
      if (s) {
        let i = s(this, e)
        i && e.parsers.push(i)
      }
    t: for (; this.nextLine() && t.pos != t.text.length; ) {
      if (t.indent < t.baseIndent + 4) {
        for (let s of this.parser.endLeafBlock) if (s(this, t, e)) break t
      }
      for (let s of e.parsers) if (s.nextLine(this, t, e)) return null
      e.content +=
        `
` + t.scrub()
      for (let s of t.markers) e.marks.push(s)
    }
    return this.finishLeaf(e), null
  }
  stopAt(t) {
    if (this.stoppedAt != null && this.stoppedAt < t)
      throw new RangeError("Can't move stoppedAt forward")
    this.stoppedAt = t
  }
  reuseFragment(t) {
    if (
      !this.fragments.moveTo(this.absoluteLineStart + t, this.absoluteLineStart) ||
      !this.fragments.matches(this.block.hash)
    )
      return !1
    let e = this.fragments.takeNodes(this)
    if (!e) return !1
    let s = e,
      i = this.absoluteLineStart + e
    for (let n = 1; n < this.ranges.length; n++) {
      let o = this.ranges[n - 1].to,
        a = this.ranges[n].from
      o >= this.lineStart && a < i && (s -= a - o)
    }
    return (
      (this.lineStart += s),
      (this.absoluteLineStart += e),
      this.moveRangeI(),
      this.absoluteLineStart < this.to
        ? (this.lineStart++, this.absoluteLineStart++, this.readLine())
        : ((this.atEnd = !0), this.readLine()),
      !0
    )
  }
  get depth() {
    return this.stack.length
  }
  parentType(t = this.depth - 1) {
    return this.parser.nodeSet.types[this.stack[t].type]
  }
  nextLine() {
    return (
      (this.lineStart += this.line.text.length),
      this.absoluteLineEnd >= this.to
        ? ((this.absoluteLineStart = this.absoluteLineEnd), (this.atEnd = !0), this.readLine(), !1)
        : (this.lineStart++,
          (this.absoluteLineStart = this.absoluteLineEnd + 1),
          this.moveRangeI(),
          this.readLine(),
          !0)
    )
  }
  moveRangeI() {
    for (
      ;
      this.rangeI < this.ranges.length - 1 && this.absoluteLineStart >= this.ranges[this.rangeI].to;

    )
      this.rangeI++,
        (this.absoluteLineStart = Math.max(this.absoluteLineStart, this.ranges[this.rangeI].from))
  }
  scanLine(t) {
    let e = js
    if (((e.end = t), t >= this.to)) e.text = ''
    else if (((e.text = this.lineChunkAt(t)), (e.end += e.text.length), this.ranges.length > 1)) {
      let s = this.absoluteLineStart,
        i = this.rangeI
      for (; this.ranges[i].to < e.end; ) {
        i++
        let n = this.ranges[i].from,
          o = this.lineChunkAt(n)
        ;(e.end = n + o.length),
          (e.text = e.text.slice(0, this.ranges[i - 1].to - s) + o),
          (s = e.end - e.text.length)
      }
    }
    return e
  }
  readLine() {
    let { line: t } = this,
      { text: e, end: s } = this.scanLine(this.absoluteLineStart)
    for (this.absoluteLineEnd = s, t.reset(e); t.depth < this.stack.length; t.depth++) {
      let i = this.stack[t.depth],
        n = this.parser.skipContextMarkup[i.type]
      if (!n) throw new Error('Unhandled block context ' + g[i.type])
      if (!n(i, this, t)) break
      t.forward()
    }
  }
  lineChunkAt(t) {
    let e = this.input.chunk(t),
      s
    if (this.input.lineChunks)
      s =
        e ==
        `
`
          ? ''
          : e
    else {
      let i = e.indexOf(`
`)
      s = i < 0 ? e : e.slice(0, i)
    }
    return t + s.length > this.to ? s.slice(0, this.to - t) : s
  }
  prevLineEnd() {
    return this.atEnd ? this.lineStart : this.lineStart - 1
  }
  startContext(t, e, s = 0) {
    ;(this.block = Rt.create(
      t,
      s,
      this.lineStart + e,
      this.block.hash,
      this.lineStart + this.line.text.length
    )),
      this.stack.push(this.block)
  }
  startComposite(t, e, s = 0) {
    this.startContext(this.parser.getNodeType(t), e, s)
  }
  addNode(t, e, s) {
    typeof t == 'number' &&
      (t = new v(this.parser.nodeSet.types[t], ht, ht, (s != null ? s : this.prevLineEnd()) - e)),
      this.block.addChild(t, e - this.block.from)
  }
  addElement(t) {
    this.block.addChild(t.toTree(this.parser.nodeSet), t.from - this.block.from)
  }
  addLeafElement(t, e) {
    this.addNode(
      this.buffer.writeElements(Yt(e.children, t.marks), -e.from).finish(e.type, e.to - e.from),
      e.from
    )
  }
  finishContext() {
    let t = this.stack.pop(),
      e = this.stack[this.stack.length - 1]
    e.addChild(t.toTree(this.parser.nodeSet), t.from - e.from), (this.block = e)
  }
  finish() {
    for (; this.stack.length > 1; ) this.finishContext()
    return this.addGaps(this.block.toTree(this.parser.nodeSet, this.lineStart))
  }
  addGaps(t) {
    return this.ranges.length > 1
      ? He(this.ranges, 0, t.topNode, this.ranges[0].from, this.dontInject)
      : t
  }
  finishLeaf(t) {
    for (let s of t.parsers) if (s.finish(this, t)) return
    let e = Yt(this.parser.parseInline(t.content, t.start), t.marks)
    this.addNode(
      this.buffer.writeElements(e, -t.start).finish(g.Paragraph, t.content.length),
      t.start
    )
  }
  elt(t, e, s, i) {
    return typeof t == 'string' ? Q(this.parser.getNodeType(t), e, s, i) : new Ve(t, e)
  }
  get buffer() {
    return new Ge(this.parser.nodeSet)
  }
}
function He(r, t, e, s, i) {
  if (i.has(e.tree)) return e.tree
  let n = r[t].to,
    o = [],
    a = [],
    h = e.from + s
  function l(d, f) {
    for (; f ? d >= n : d > n; ) {
      let u = r[t + 1].from - n
      ;(s += u), (d += u), t++, (n = r[t].to)
    }
  }
  for (let d = e.firstChild; d; d = d.nextSibling) {
    l(d.from + s, !0)
    let f = d.from + s,
      u
    d.to + s > n ? ((u = He(r, t, d, s, i)), l(d.to + s, !1)) : (u = d.toTree()),
      o.push(u),
      a.push(f - h)
  }
  return l(e.to + s, !1), new v(e.type, o, a, e.to + s - h, e.tree ? e.tree.propValues : void 0)
}
class ie extends Ne {
  constructor(t, e, s, i, n, o, a, h, l) {
    super(),
      (this.nodeSet = t),
      (this.blockParsers = e),
      (this.leafBlockParsers = s),
      (this.blockNames = i),
      (this.endLeafBlock = n),
      (this.skipContextMarkup = o),
      (this.inlineParsers = a),
      (this.inlineNames = h),
      (this.wrappers = l),
      (this.nodeTypes = Object.create(null))
    for (let d of t.types) this.nodeTypes[d.name] = d.id
  }
  createParse(t, e, s) {
    let i = new Gs(this, t, e, s)
    for (let n of this.wrappers) i = n(i, t, e, s)
    return i
  }
  configure(t) {
    let e = Zt(t)
    if (!e) return this
    let { nodeSet: s, skipContextMarkup: i } = this,
      n = this.blockParsers.slice(),
      o = this.leafBlockParsers.slice(),
      a = this.blockNames.slice(),
      h = this.inlineParsers.slice(),
      l = this.inlineNames.slice(),
      d = this.endLeafBlock.slice(),
      f = this.wrappers
    if (ft(e.defineNodes)) {
      i = Object.assign({}, i)
      let u = s.types.slice(),
        O
      for (let m of e.defineNodes) {
        let { name: S, block: B, composite: N, style: L } = typeof m == 'string' ? { name: m } : m
        if (u.some(y => y.name == S)) continue
        N && (i[u.length] = (y, k, P) => N(k, P, y.value))
        let A = u.length,
          x = N
            ? ['Block', 'BlockContext']
            : B
            ? A >= g.ATXHeading1 && A <= g.SetextHeading2
              ? ['Block', 'LeafBlock', 'Heading']
              : ['Block', 'LeafBlock']
            : void 0
        u.push(E.define({ id: A, name: S, props: x && [[w.group, x]] })),
          L &&
            (O || (O = {}), Array.isArray(L) || L instanceof M ? (O[S] = L) : Object.assign(O, L))
      }
      ;(s = new Ot(u)), O && (s = s.extend(Jt(O)))
    }
    if ((ft(e.props) && (s = s.extend(...e.props)), ft(e.remove)))
      for (let u of e.remove) {
        let O = this.blockNames.indexOf(u),
          m = this.inlineNames.indexOf(u)
        O > -1 && (n[O] = o[O] = void 0), m > -1 && (h[m] = void 0)
      }
    if (ft(e.parseBlock))
      for (let u of e.parseBlock) {
        let O = a.indexOf(u.name)
        if (O > -1) (n[O] = u.parse), (o[O] = u.leaf)
        else {
          let m = u.before ? Qt(a, u.before) : u.after ? Qt(a, u.after) + 1 : a.length - 1
          n.splice(m, 0, u.parse), o.splice(m, 0, u.leaf), a.splice(m, 0, u.name)
        }
        u.endLeaf && d.push(u.endLeaf)
      }
    if (ft(e.parseInline))
      for (let u of e.parseInline) {
        let O = l.indexOf(u.name)
        if (O > -1) h[O] = u.parse
        else {
          let m = u.before ? Qt(l, u.before) : u.after ? Qt(l, u.after) + 1 : l.length - 1
          h.splice(m, 0, u.parse), l.splice(m, 0, u.name)
        }
      }
    return e.wrap && (f = f.concat(e.wrap)), new ie(s, n, o, a, d, i, h, l, f)
  }
  getNodeType(t) {
    let e = this.nodeTypes[t]
    if (e == null) throw new RangeError(`Unknown node type '${t}'`)
    return e
  }
  parseInline(t, e) {
    let s = new Zs(this, t, e)
    t: for (let i = e; i < s.end; ) {
      let n = s.char(i)
      for (let o of this.inlineParsers)
        if (o) {
          let a = o(s, n, i)
          if (a >= 0) {
            i = a
            continue t
          }
        }
      i++
    }
    return s.resolveMarkers(0)
  }
}
function ft(r) {
  return r != null && r.length > 0
}
function Zt(r) {
  if (!Array.isArray(r)) return r
  if (r.length == 0) return null
  let t = Zt(r[0])
  if (r.length == 1) return t
  let e = Zt(r.slice(1))
  if (!e || !t) return t || e
  let s = (o, a) => (o || ht).concat(a || ht),
    i = t.wrap,
    n = e.wrap
  return {
    props: s(t.props, e.props),
    defineNodes: s(t.defineNodes, e.defineNodes),
    parseBlock: s(t.parseBlock, e.parseBlock),
    parseInline: s(t.parseInline, e.parseInline),
    remove: s(t.remove, e.remove),
    wrap: i ? (n ? (o, a, h, l) => i(n(o, a, h, l), a, h, l) : i) : n
  }
}
function Qt(r, t) {
  let e = r.indexOf(t)
  if (e < 0) throw new RangeError(`Position specified relative to unknown parser ${t}`)
  return e
}
let je = [E.none]
for (let r = 1, t; (t = g[r]); r++)
  je[r] = E.define({
    id: r,
    name: t,
    props:
      r >= g.Escape ? [] : [[w.group, r in Xe ? ['Block', 'BlockContext'] : ['Block', 'LeafBlock']]]
  })
const ht = []
class Ge {
  constructor(t) {
    ;(this.nodeSet = t), (this.content = []), (this.nodes = [])
  }
  write(t, e, s, i = 0) {
    return this.content.push(t, e, s, 4 + i * 4), this
  }
  writeElements(t, e = 0) {
    for (let s of t) s.writeTo(this, e)
    return this
  }
  finish(t, e) {
    return v.build({
      buffer: this.content,
      nodeSet: this.nodeSet,
      reused: this.nodes,
      topID: t,
      length: e
    })
  }
}
class pt {
  constructor(t, e, s, i = ht) {
    ;(this.type = t), (this.from = e), (this.to = s), (this.children = i)
  }
  writeTo(t, e) {
    let s = t.content.length
    t.writeElements(this.children, e),
      t.content.push(this.type, this.from + e, this.to + e, t.content.length + 4 - s)
  }
  toTree(t) {
    return new Ge(t).writeElements(this.children, -this.from).finish(this.type, this.to - this.from)
  }
}
class Ve {
  constructor(t, e) {
    ;(this.tree = t), (this.from = e)
  }
  get to() {
    return this.from + this.tree.length
  }
  get type() {
    return this.tree.type.id
  }
  get children() {
    return ht
  }
  writeTo(t, e) {
    t.nodes.push(this.tree), t.content.push(t.nodes.length - 1, this.from + e, this.to + e, -1)
  }
  toTree() {
    return this.tree
  }
}
function Q(r, t, e, s) {
  return new pt(r, t, e, s)
}
const Ze = { resolve: 'Emphasis', mark: 'EmphasisMark' },
  Ye = { resolve: 'Emphasis', mark: 'EmphasisMark' },
  ut = {},
  we = {}
class U {
  constructor(t, e, s, i) {
    ;(this.type = t), (this.from = e), (this.to = s), (this.side = i)
  }
}
const Ce = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
let gt = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/
try {
  gt = new RegExp('[\\p{Pc}|\\p{Pd}|\\p{Pe}|\\p{Pf}|\\p{Pi}|\\p{Po}|\\p{Ps}]', 'u')
} catch {}
const Dt = {
  Escape(r, t, e) {
    if (t != 92 || e == r.end - 1) return -1
    let s = r.char(e + 1)
    for (let i = 0; i < Ce.length; i++)
      if (Ce.charCodeAt(i) == s) return r.append(Q(g.Escape, e, e + 2))
    return -1
  },
  Entity(r, t, e) {
    if (t != 38) return -1
    let s = /^(?:#\d+|#x[a-f\d]+|\w+);/i.exec(r.slice(e + 1, e + 31))
    return s ? r.append(Q(g.Entity, e, e + 1 + s[0].length)) : -1
  },
  InlineCode(r, t, e) {
    if (t != 96 || (e && r.char(e - 1) == 96)) return -1
    let s = e + 1
    for (; s < r.end && r.char(s) == 96; ) s++
    let i = s - e,
      n = 0
    for (; s < r.end; s++)
      if (r.char(s) == 96) {
        if ((n++, n == i && r.char(s + 1) != 96))
          return r.append(
            Q(g.InlineCode, e, s + 1, [Q(g.CodeMark, e, e + i), Q(g.CodeMark, s + 1 - i, s + 1)])
          )
      } else n = 0
    return -1
  },
  HTMLTag(r, t, e) {
    if (t != 60 || e == r.end - 1) return -1
    let s = r.slice(e + 1, r.end),
      i =
        /^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.exec(
          s
        )
    if (i) return r.append(Q(g.URL, e, e + 1 + i[0].length))
    let n = /^!--[^>](?:-[^-]|[^-])*?-->/i.exec(s)
    if (n) return r.append(Q(g.Comment, e, e + 1 + n[0].length))
    let o = /^\?[^]*?\?>/.exec(s)
    if (o) return r.append(Q(g.ProcessingInstruction, e, e + 1 + o[0].length))
    let a =
      /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.exec(
        s
      )
    return a ? r.append(Q(g.HTMLTag, e, e + 1 + a[0].length)) : -1
  },
  Emphasis(r, t, e) {
    if (t != 95 && t != 42) return -1
    let s = e + 1
    for (; r.char(s) == t; ) s++
    let i = r.slice(e - 1, e),
      n = r.slice(s, s + 1),
      o = gt.test(i),
      a = gt.test(n),
      h = /\s|^$/.test(i),
      l = /\s|^$/.test(n),
      d = !l && (!a || h || o),
      f = !h && (!o || l || a),
      u = d && (t == 42 || !f || o),
      O = f && (t == 42 || !d || a)
    return r.append(new U(t == 95 ? Ze : Ye, e, s, (u ? 1 : 0) | (O ? 2 : 0)))
  },
  HardBreak(r, t, e) {
    if (t == 92 && r.char(e + 1) == 10) return r.append(Q(g.HardBreak, e, e + 2))
    if (t == 32) {
      let s = e + 1
      for (; r.char(s) == 32; ) s++
      if (r.char(s) == 10 && s >= e + 2) return r.append(Q(g.HardBreak, e, s + 1))
    }
    return -1
  },
  Link(r, t, e) {
    return t == 91 ? r.append(new U(ut, e, e + 1, 1)) : -1
  },
  Image(r, t, e) {
    return t == 33 && r.char(e + 1) == 91 ? r.append(new U(we, e, e + 2, 1)) : -1
  },
  LinkEnd(r, t, e) {
    if (t != 93) return -1
    for (let s = r.parts.length - 1; s >= 0; s--) {
      let i = r.parts[s]
      if (i instanceof U && (i.type == ut || i.type == we)) {
        if (!i.side || (r.skipSpace(i.to) == e && !/[(\[]/.test(r.slice(e + 1, e + 2))))
          return (r.parts[s] = null), -1
        let n = r.takeContent(s),
          o = (r.parts[s] = Vs(r, n, i.type == ut ? g.Link : g.Image, i.from, e + 1))
        if (i.type == ut)
          for (let a = 0; a < s; a++) {
            let h = r.parts[a]
            h instanceof U && h.type == ut && (h.side = 0)
          }
        return o.to
      }
    }
    return -1
  }
}
function Vs(r, t, e, s, i) {
  let { text: n } = r,
    o = r.char(i),
    a = i
  if (
    (t.unshift(Q(g.LinkMark, s, s + (e == g.Image ? 2 : 1))),
    t.push(Q(g.LinkMark, i - 1, i)),
    o == 40)
  ) {
    let h = r.skipSpace(i + 1),
      l = Fe(n, h - r.offset, r.offset),
      d
    l &&
      ((h = r.skipSpace(l.to)), (d = qe(n, h - r.offset, r.offset)), d && (h = r.skipSpace(d.to))),
      r.char(h) == 41 &&
        (t.push(Q(g.LinkMark, i, i + 1)),
        (a = h + 1),
        l && t.push(l),
        d && t.push(d),
        t.push(Q(g.LinkMark, h, a)))
  } else if (o == 91) {
    let h = Ke(n, i - r.offset, r.offset, !1)
    h && (t.push(h), (a = h.to))
  }
  return Q(e, s, a, t)
}
function Fe(r, t, e) {
  if (r.charCodeAt(t) == 60) {
    for (let i = t + 1; i < r.length; i++) {
      let n = r.charCodeAt(i)
      if (n == 62) return Q(g.URL, t + e, i + 1 + e)
      if (n == 60 || n == 10) return !1
    }
    return null
  } else {
    let i = 0,
      n = t
    for (let o = !1; n < r.length; n++) {
      let a = r.charCodeAt(n)
      if (T(a)) break
      if (o) o = !1
      else if (a == 40) i++
      else if (a == 41) {
        if (!i) break
        i--
      } else a == 92 && (o = !0)
    }
    return n > t ? Q(g.URL, t + e, n + e) : n == r.length ? null : !1
  }
}
function qe(r, t, e) {
  let s = r.charCodeAt(t)
  if (s != 39 && s != 34 && s != 40) return !1
  let i = s == 40 ? 41 : s
  for (let n = t + 1, o = !1; n < r.length; n++) {
    let a = r.charCodeAt(n)
    if (o) o = !1
    else {
      if (a == i) return Q(g.LinkTitle, t + e, n + 1 + e)
      a == 92 && (o = !0)
    }
  }
  return null
}
function Ke(r, t, e, s) {
  for (let i = !1, n = t + 1, o = Math.min(r.length, n + 999); n < o; n++) {
    let a = r.charCodeAt(n)
    if (i) i = !1
    else {
      if (a == 93) return s ? !1 : Q(g.LinkLabel, t + e, n + 1 + e)
      if ((s && !T(a) && (s = !1), a == 91)) return !1
      a == 92 && (i = !0)
    }
  }
  return null
}
class Zs {
  constructor(t, e, s) {
    ;(this.parser = t), (this.text = e), (this.offset = s), (this.parts = [])
  }
  char(t) {
    return t >= this.end ? -1 : this.text.charCodeAt(t - this.offset)
  }
  get end() {
    return this.offset + this.text.length
  }
  slice(t, e) {
    return this.text.slice(t - this.offset, e - this.offset)
  }
  append(t) {
    return this.parts.push(t), t.to
  }
  addDelimiter(t, e, s, i, n) {
    return this.append(new U(t, e, s, (i ? 1 : 0) | (n ? 2 : 0)))
  }
  addElement(t) {
    return this.append(t)
  }
  resolveMarkers(t) {
    for (let s = t; s < this.parts.length; s++) {
      let i = this.parts[s]
      if (!(i instanceof U && i.type.resolve && i.side & 2)) continue
      let n = i.type == Ze || i.type == Ye,
        o = i.to - i.from,
        a,
        h = s - 1
      for (; h >= t; h--) {
        let S = this.parts[h]
        if (
          S instanceof U &&
          S.side & 1 &&
          S.type == i.type &&
          !(
            n &&
            (i.side & 1 || S.side & 2) &&
            (S.to - S.from + o) % 3 == 0 &&
            ((S.to - S.from) % 3 || o % 3)
          )
        ) {
          a = S
          break
        }
      }
      if (!a) continue
      let l = i.type.resolve,
        d = [],
        f = a.from,
        u = i.to
      if (n) {
        let S = Math.min(2, a.to - a.from, o)
        ;(f = a.to - S), (u = i.from + S), (l = S == 1 ? 'Emphasis' : 'StrongEmphasis')
      }
      a.type.mark && d.push(this.elt(a.type.mark, f, a.to))
      for (let S = h + 1; S < s; S++)
        this.parts[S] instanceof pt && d.push(this.parts[S]), (this.parts[S] = null)
      i.type.mark && d.push(this.elt(i.type.mark, i.from, u))
      let O = this.elt(l, f, u, d)
      ;(this.parts[h] = n && a.from != f ? new U(a.type, a.from, f, a.side) : null),
        (this.parts[s] = n && i.to != u ? new U(i.type, u, i.to, i.side) : null)
          ? this.parts.splice(s, 0, O)
          : (this.parts[s] = O)
    }
    let e = []
    for (let s = t; s < this.parts.length; s++) {
      let i = this.parts[s]
      i instanceof pt && e.push(i)
    }
    return e
  }
  findOpeningDelimiter(t) {
    for (let e = this.parts.length - 1; e >= 0; e--) {
      let s = this.parts[e]
      if (s instanceof U && s.type == t) return e
    }
    return null
  }
  takeContent(t) {
    let e = this.resolveMarkers(t)
    return (this.parts.length = t), e
  }
  skipSpace(t) {
    return dt(this.text, t - this.offset) + this.offset
  }
  elt(t, e, s, i) {
    return typeof t == 'string' ? Q(this.parser.getNodeType(t), e, s, i) : new Ve(t, e)
  }
}
function Yt(r, t) {
  if (!t.length) return r
  if (!r.length) return t
  let e = r.slice(),
    s = 0
  for (let i of t) {
    for (; s < e.length && e[s].to < i.to; ) s++
    if (s < e.length && e[s].from < i.from) {
      let n = e[s]
      n instanceof pt && (e[s] = new pt(n.type, n.from, n.to, Yt(n.children, [i])))
    } else e.splice(s++, 0, i)
  }
  return e
}
const Ys = [g.CodeBlock, g.ListItem, g.OrderedList, g.BulletList]
class Fs {
  constructor(t, e) {
    ;(this.fragments = t),
      (this.input = e),
      (this.i = 0),
      (this.fragment = null),
      (this.fragmentEnd = -1),
      (this.cursor = null),
      t.length && (this.fragment = t[this.i++])
  }
  nextFragment() {
    ;(this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null),
      (this.cursor = null),
      (this.fragmentEnd = -1)
  }
  moveTo(t, e) {
    for (; this.fragment && this.fragment.to <= t; ) this.nextFragment()
    if (!this.fragment || this.fragment.from > (t ? t - 1 : 0)) return !1
    if (this.fragmentEnd < 0) {
      let n = this.fragment.to
      for (
        ;
        n > 0 &&
        this.input.read(n - 1, n) !=
          `
`;

      )
        n--
      this.fragmentEnd = n ? n - 1 : 0
    }
    let s = this.cursor
    s || ((s = this.cursor = this.fragment.tree.cursor()), s.firstChild())
    let i = t + this.fragment.offset
    for (; s.to <= i; ) if (!s.parent()) return !1
    for (;;) {
      if (s.from >= i) return this.fragment.from <= e
      if (!s.childAfter(i)) return !1
    }
  }
  matches(t) {
    let e = this.cursor.tree
    return e && e.prop(w.contextHash) == t
  }
  takeNodes(t) {
    let e = this.cursor,
      s = this.fragment.offset,
      i = this.fragmentEnd - (this.fragment.openEnd ? 1 : 0),
      n = t.absoluteLineStart,
      o = n,
      a = t.block.children.length,
      h = o,
      l = a
    for (;;) {
      if (e.to - s > i) {
        if (e.type.isAnonymous && e.firstChild()) continue
        break
      }
      if (
        (t.dontInject.add(e.tree),
        t.addNode(e.tree, e.from - s),
        e.type.is('Block') &&
          (Ys.indexOf(e.type.id) < 0
            ? ((o = e.to - s), (a = t.block.children.length))
            : ((o = h), (a = l), (h = e.to - s), (l = t.block.children.length))),
        !e.nextSibling())
      )
        break
    }
    for (; t.block.children.length > a; ) t.block.children.pop(), t.block.positions.pop()
    return o - n
  }
}
const qs = Jt({
    'Blockquote/...': c.quote,
    HorizontalRule: c.contentSeparator,
    'ATXHeading1/... SetextHeading1/...': c.heading1,
    'ATXHeading2/... SetextHeading2/...': c.heading2,
    'ATXHeading3/...': c.heading3,
    'ATXHeading4/...': c.heading4,
    'ATXHeading5/...': c.heading5,
    'ATXHeading6/...': c.heading6,
    'Comment CommentBlock': c.comment,
    Escape: c.escape,
    Entity: c.character,
    'Emphasis/...': c.emphasis,
    'StrongEmphasis/...': c.strong,
    'Link/... Image/...': c.link,
    'OrderedList/... BulletList/...': c.list,
    'BlockQuote/...': c.quote,
    'InlineCode CodeText': c.monospace,
    URL: c.url,
    'HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark':
      c.processingInstruction,
    'CodeInfo LinkLabel': c.labelName,
    LinkTitle: c.string,
    Paragraph: c.content
  }),
  nr = new ie(
    new Ot(je).extend(qs),
    Object.keys(Pt).map(r => Pt[r]),
    Object.keys(Pt).map(r => Ds[r]),
    Object.keys(Pt),
    Hs,
    Xe,
    Object.keys(Dt).map(r => Dt[r]),
    Object.keys(Dt),
    []
  ),
  Ks = { resolve: 'Strikethrough', mark: 'StrikethroughMark' },
  Js = {
    defineNodes: [
      { name: 'Strikethrough', style: { 'Strikethrough/...': c.strikethrough } },
      { name: 'StrikethroughMark', style: c.processingInstruction }
    ],
    parseInline: [
      {
        name: 'Strikethrough',
        parse(r, t, e) {
          if (t != 126 || r.char(e + 1) != 126 || r.char(e + 2) == 126) return -1
          let s = r.slice(e - 1, e),
            i = r.slice(e + 2, e + 3),
            n = /\s|^$/.test(s),
            o = /\s|^$/.test(i),
            a = gt.test(s),
            h = gt.test(i)
          return r.addDelimiter(Ks, e, e + 2, !o && (!h || n || a), !n && (!a || o || h))
        },
        after: 'Emphasis'
      }
    ]
  }
function ct(r, t, e = 0, s, i = 0) {
  let n = 0,
    o = !0,
    a = -1,
    h = -1,
    l = !1,
    d = () => {
      s.push(r.elt('TableCell', i + a, i + h, r.parser.parseInline(t.slice(a, h), i + a)))
    }
  for (let f = e; f < t.length; f++) {
    let u = t.charCodeAt(f)
    u == 124 && !l
      ? ((!o || a > -1) && n++,
        (o = !1),
        s && (a > -1 && d(), s.push(r.elt('TableDelimiter', f + i, f + i + 1))),
        (a = h = -1))
      : (l || (u != 32 && u != 9)) && (a < 0 && (a = f), (h = f + 1)),
      (l = !l && u == 92)
  }
  return a > -1 && (n++, s && d()), n
}
function Ae(r, t) {
  for (let e = t; e < r.length; e++) {
    let s = r.charCodeAt(e)
    if (s == 124) return !0
    s == 92 && e++
  }
  return !1
}
const Je = /^\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/
class $e {
  constructor() {
    this.rows = null
  }
  nextLine(t, e, s) {
    if (this.rows == null) {
      this.rows = !1
      let i
      if ((e.next == 45 || e.next == 58 || e.next == 124) && Je.test((i = e.text.slice(e.pos)))) {
        let n = []
        ct(t, s.content, 0, n, s.start) == ct(t, i, e.pos) &&
          (this.rows = [
            t.elt('TableHeader', s.start, s.start + s.content.length, n),
            t.elt('TableDelimiter', t.lineStart + e.pos, t.lineStart + e.text.length)
          ])
      }
    } else if (this.rows) {
      let i = []
      ct(t, e.text, e.pos, i, t.lineStart),
        this.rows.push(t.elt('TableRow', t.lineStart + e.pos, t.lineStart + e.text.length, i))
    }
    return !1
  }
  finish(t, e) {
    return this.rows
      ? (t.addLeafElement(e, t.elt('Table', e.start, e.start + e.content.length, this.rows)), !0)
      : !1
  }
}
const tr = {
  defineNodes: [
    { name: 'Table', block: !0 },
    { name: 'TableHeader', style: { 'TableHeader/...': c.heading } },
    'TableRow',
    { name: 'TableCell', style: c.content },
    { name: 'TableDelimiter', style: c.processingInstruction }
  ],
  parseBlock: [
    {
      name: 'Table',
      leaf(r, t) {
        return Ae(t.content, 0) ? new $e() : null
      },
      endLeaf(r, t, e) {
        if (e.parsers.some(i => i instanceof $e) || !Ae(t.text, t.basePos)) return !1
        let s = r.scanLine(r.absoluteLineEnd + 1).text
        return Je.test(s) && ct(r, t.text, t.basePos) == ct(r, s, t.basePos)
      },
      before: 'SetextHeading'
    }
  ]
}
class er {
  nextLine() {
    return !1
  }
  finish(t, e) {
    return (
      t.addLeafElement(
        e,
        t.elt('Task', e.start, e.start + e.content.length, [
          t.elt('TaskMarker', e.start, e.start + 3),
          ...t.parser.parseInline(e.content.slice(3), e.start + 3)
        ])
      ),
      !0
    )
  }
}
const sr = {
    defineNodes: [
      { name: 'Task', block: !0, style: c.list },
      { name: 'TaskMarker', style: c.atom }
    ],
    parseBlock: [
      {
        name: 'TaskList',
        leaf(r, t) {
          return /^\[[ xX]\]/.test(t.content) && r.parentType().name == 'ListItem' ? new er() : null
        },
        after: 'SetextHeading'
      }
    ]
  },
  or = [tr, sr, Js]
function ts(r, t, e) {
  return (s, i, n) => {
    if (i != r || s.char(n + 1) == r) return -1
    let o = [s.elt(e, n, n + 1)]
    for (let a = n + 1; a < s.end; a++) {
      let h = s.char(a)
      if (h == r) return s.addElement(s.elt(t, n, a + 1, o.concat(s.elt(e, a, a + 1))))
      if ((h == 92 && o.push(s.elt('Escape', a, a++ + 2)), T(h))) break
    }
    return -1
  }
}
const ar = {
    defineNodes: [
      { name: 'Superscript', style: c.special(c.content) },
      { name: 'SuperscriptMark', style: c.processingInstruction }
    ],
    parseInline: [{ name: 'Superscript', parse: ts(94, 'Superscript', 'SuperscriptMark') }]
  },
  hr = {
    defineNodes: [
      { name: 'Subscript', style: c.special(c.content) },
      { name: 'SubscriptMark', style: c.processingInstruction }
    ],
    parseInline: [{ name: 'Subscript', parse: ts(126, 'Subscript', 'SubscriptMark') }]
  },
  lr = {
    defineNodes: [{ name: 'Emoji', style: c.character }],
    parseInline: [
      {
        name: 'Emoji',
        parse(r, t, e) {
          let s
          return t != 58 || !(s = /^[a-zA-Z_0-9]+:/.exec(r.slice(e + 1, r.end)))
            ? -1
            : r.addElement(r.elt('Emoji', e, e + 1 + s[0].length))
        }
      }
    ]
  }
export {
  lr as E,
  or as G,
  I,
  E as N,
  Ne as P,
  hr as S,
  v as T,
  w as a,
  fs as b,
  Ht as c,
  ar as d,
  nr as e,
  rr as h,
  ir as p,
  Jt as s,
  c as t
}
