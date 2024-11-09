var hs = Object.create;
var Eo = Object.defineProperty;
var ms = Object.getOwnPropertyDescriptor;
var fs = Object.getOwnPropertyNames;
var ys = Object.getPrototypeOf,
  gs = Object.prototype.hasOwnProperty;
var ps = (t, e) => () => (e || t((e = {exports: {}}).exports, e), e.exports);
var ws = (t, e, r, i) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let o of fs(e))
      !gs.call(t, o) &&
        o !== r &&
        Eo(t, o, {
          get: () => e[o],
          enumerable: !(i = ms(e, o)) || i.enumerable,
        });
  return t;
};
var vs = (t, e, r) => (
  (r = t != null ? hs(ys(t)) : {}),
  ws(
    e || !t || !t.__esModule ? Eo(r, 'default', {value: t, enumerable: !0}) : r,
    t
  )
);
var Io = ps((hi, mi) => {
  (function (t, e) {
    typeof hi == 'object' && typeof mi < 'u'
      ? (mi.exports = e())
      : typeof define == 'function' && define.amd
      ? define(e)
      : ((t = t || self), (t.JSBI = e()));
  })(hi, function () {
    'use strict';
    var t = Math.imul,
      e = Math.clz32;
    function r(M) {
      '@babel/helpers - typeof';
      return (
        (r =
          typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
            ? function ($) {
                return typeof $;
              }
            : function ($) {
                return $ &&
                  typeof Symbol == 'function' &&
                  $.constructor === Symbol &&
                  $ !== Symbol.prototype
                  ? 'symbol'
                  : typeof $;
              }),
        r(M)
      );
    }
    function i(M, $) {
      if (!(M instanceof $))
        throw new TypeError('Cannot call a class as a function');
    }
    function o(M, $) {
      for (var A, K = 0; K < $.length; K++)
        (A = $[K]),
          (A.enumerable = A.enumerable || !1),
          (A.configurable = !0),
          'value' in A && (A.writable = !0),
          Object.defineProperty(M, A.key, A);
    }
    function a(M, $, A) {
      return (
        $ && o(M.prototype, $),
        A && o(M, A),
        Object.defineProperty(M, 'prototype', {writable: !1}),
        M
      );
    }
    function s(M, $) {
      if (typeof $ != 'function' && $ !== null)
        throw new TypeError(
          'Super expression must either be null or a function'
        );
      (M.prototype = Object.create($ && $.prototype, {
        constructor: {value: M, writable: !0, configurable: !0},
      })),
        Object.defineProperty(M, 'prototype', {writable: !1}),
        $ && h(M, $);
    }
    function c(M) {
      return (
        (c = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function ($) {
              return $.__proto__ || Object.getPrototypeOf($);
            }),
        c(M)
      );
    }
    function h(M, $) {
      return (
        (h =
          Object.setPrototypeOf ||
          function (A, K) {
            return (A.__proto__ = K), A;
          }),
        h(M, $)
      );
    }
    function f() {
      if (typeof Reflect > 'u' || !Reflect.construct || Reflect.construct.sham)
        return !1;
      if (typeof Proxy == 'function') return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch {
        return !1;
      }
    }
    function m() {
      return (
        (m = f()
          ? Reflect.construct
          : function (M, $, A) {
              var K = [null];
              K.push.apply(K, $);
              var w = Function.bind.apply(M, K),
                V = new w();
              return A && h(V, A.prototype), V;
            }),
        m.apply(null, arguments)
      );
    }
    function y(M) {
      return Function.toString.call(M).indexOf('[native code]') !== -1;
    }
    function g(M) {
      var $ = typeof Map == 'function' ? new Map() : void 0;
      return (
        (g = function (A) {
          function K() {
            return m(A, arguments, c(this).constructor);
          }
          if (A === null || !y(A)) return A;
          if (typeof A != 'function')
            throw new TypeError(
              'Super expression must either be null or a function'
            );
          if (typeof $ < 'u') {
            if ($.has(A)) return $.get(A);
            $.set(A, K);
          }
          return (
            (K.prototype = Object.create(A.prototype, {
              constructor: {
                value: K,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            h(K, A)
          );
        }),
        g(M)
      );
    }
    function v(M) {
      if (M === void 0)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return M;
    }
    function _(M, $) {
      if ($ && (typeof $ == 'object' || typeof $ == 'function')) return $;
      if ($ !== void 0)
        throw new TypeError(
          'Derived constructors may only return object or undefined'
        );
      return v(M);
    }
    function E(M) {
      var $ = f();
      return function () {
        var A,
          K = c(M);
        if ($) {
          var w = c(this).constructor;
          A = Reflect.construct(K, arguments, w);
        } else A = K.apply(this, arguments);
        return _(this, A);
      };
    }
    function D(M, $) {
      return C(M) || B(M, $) || R(M, $) || L();
    }
    function C(M) {
      if (Array.isArray(M)) return M;
    }
    function B(M, $) {
      var A =
        M == null
          ? null
          : (typeof Symbol < 'u' && M[Symbol.iterator]) || M['@@iterator'];
      if (A != null) {
        var K,
          w,
          V = [],
          l = !0,
          u = !1;
        try {
          for (
            A = A.call(M);
            !(l = (K = A.next()).done) &&
            (V.push(K.value), !($ && V.length === $));
            l = !0
          );
        } catch (p) {
          (u = !0), (w = p);
        } finally {
          try {
            l || A.return == null || A.return();
          } finally {
            if (u) throw w;
          }
        }
        return V;
      }
    }
    function R(M, $) {
      if (M) {
        if (typeof M == 'string') return P(M, $);
        var A = Object.prototype.toString.call(M).slice(8, -1);
        return (
          A === 'Object' && M.constructor && (A = M.constructor.name),
          A === 'Map' || A === 'Set'
            ? Array.from(M)
            : A === 'Arguments' ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(A)
            ? P(M, $)
            : void 0
        );
      }
    }
    function P(M, $) {
      ($ == null || $ > M.length) && ($ = M.length);
      for (var A = 0, K = Array($); A < $; A++) K[A] = M[A];
      return K;
    }
    function L() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function j(M, $) {
      var A = (typeof Symbol < 'u' && M[Symbol.iterator]) || M['@@iterator'];
      if (!A) {
        if (
          Array.isArray(M) ||
          (A = R(M)) ||
          ($ && M && typeof M.length == 'number')
        ) {
          A && (M = A);
          var K = 0,
            w = function () {};
          return {
            s: w,
            n: function () {
              return K >= M.length ? {done: !0} : {done: !1, value: M[K++]};
            },
            e: function (p) {
              throw p;
            },
            f: w,
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var V,
        l = !0,
        u = !1;
      return {
        s: function () {
          A = A.call(M);
        },
        n: function () {
          var p = A.next();
          return (l = p.done), p;
        },
        e: function (p) {
          (u = !0), (V = p);
        },
        f: function () {
          try {
            l || A.return == null || A.return();
          } finally {
            if (u) throw V;
          }
        },
      };
    }
    var Y = (function (M) {
      var $ = Math.abs,
        A = Math.max,
        K = Math.floor;
      function w(l, u) {
        var p;
        if (
          (i(this, w),
          (p = V.call(this, l)),
          (p.sign = u),
          Object.setPrototypeOf(v(p), w.prototype),
          l > w.__kMaxLength)
        )
          throw new RangeError('Maximum BigInt size exceeded');
        return p;
      }
      s(w, M);
      var V = E(w);
      return (
        a(
          w,
          [
            {
              key: 'toDebugString',
              value: function () {
                var l,
                  u = ['BigInt['],
                  p = j(this);
                try {
                  for (p.s(); !(l = p.n()).done; ) {
                    var T = l.value;
                    u.push((T && (T >>> 0).toString(16)) + ', ');
                  }
                } catch (b) {
                  p.e(b);
                } finally {
                  p.f();
                }
                return u.push(']'), u.join('');
              },
            },
            {
              key: 'toString',
              value: function () {
                var l =
                  0 < arguments.length && arguments[0] !== void 0
                    ? arguments[0]
                    : 10;
                if (2 > l || 36 < l)
                  throw new RangeError(
                    'toString() radix argument must be between 2 and 36'
                  );
                return this.length === 0
                  ? '0'
                  : l & (l - 1)
                  ? w.__toStringGeneric(this, l, !1)
                  : w.__toStringBasePowerOfTwo(this, l);
              },
            },
            {
              key: 'valueOf',
              value: function () {
                throw new Error(
                  'Convert JSBI instances to native numbers using `toNumber`.'
                );
              },
            },
            {
              key: '__copy',
              value: function () {
                for (
                  var l = new w(this.length, this.sign), u = 0;
                  u < this.length;
                  u++
                )
                  l[u] = this[u];
                return l;
              },
            },
            {
              key: '__trim',
              value: function () {
                for (var l = this.length, u = this[l - 1]; u === 0; )
                  l--, (u = this[l - 1]), this.pop();
                return l === 0 && (this.sign = !1), this;
              },
            },
            {
              key: '__initializeDigits',
              value: function () {
                for (var l = 0; l < this.length; l++) this[l] = 0;
              },
            },
            {
              key: '__clzmsd',
              value: function () {
                return w.__clz30(this.__digit(this.length - 1));
              },
            },
            {
              key: '__inplaceMultiplyAdd',
              value: function (l, u, p) {
                p > this.length && (p = this.length);
                for (
                  var T = 32767 & l, b = l >>> 15, I = 0, O = u, k = 0;
                  k < p;
                  k++
                ) {
                  var F = this.__digit(k),
                    N = 32767 & F,
                    Z = F >>> 15,
                    U = w.__imul(N, T),
                    W = w.__imul(N, b),
                    J = w.__imul(Z, T),
                    ee = w.__imul(Z, b),
                    ue = O + U + I;
                  (I = ue >>> 30),
                    (ue &= 1073741823),
                    (ue += ((32767 & W) << 15) + ((32767 & J) << 15)),
                    (I += ue >>> 30),
                    (O = ee + (W >>> 15) + (J >>> 15)),
                    this.__setDigit(k, 1073741823 & ue);
                }
                if (I !== 0 || O !== 0) throw new Error('implementation bug');
              },
            },
            {
              key: '__inplaceAdd',
              value: function (l, u, p) {
                for (var T, b = 0, I = 0; I < p; I++)
                  (T = this.__halfDigit(u + I) + l.__halfDigit(I) + b),
                    (b = T >>> 15),
                    this.__setHalfDigit(u + I, 32767 & T);
                return b;
              },
            },
            {
              key: '__inplaceSub',
              value: function (l, u, p) {
                var T = 0;
                if (1 & u) {
                  u >>= 1;
                  for (
                    var b = this.__digit(u), I = 32767 & b, O = 0;
                    O < (p - 1) >>> 1;
                    O++
                  ) {
                    var k = l.__digit(O),
                      F = (b >>> 15) - (32767 & k) - T;
                    (T = 1 & (F >>> 15)),
                      this.__setDigit(u + O, ((32767 & F) << 15) | (32767 & I)),
                      (b = this.__digit(u + O + 1)),
                      (I = (32767 & b) - (k >>> 15) - T),
                      (T = 1 & (I >>> 15));
                  }
                  var N = l.__digit(O),
                    Z = (b >>> 15) - (32767 & N) - T;
                  if (
                    ((T = 1 & (Z >>> 15)),
                    this.__setDigit(u + O, ((32767 & Z) << 15) | (32767 & I)),
                    u + O + 1 >= this.length)
                  )
                    throw new RangeError('out of bounds');
                  !(1 & p) &&
                    ((b = this.__digit(u + O + 1)),
                    (I = (32767 & b) - (N >>> 15) - T),
                    (T = 1 & (I >>> 15)),
                    this.__setDigit(
                      u + l.length,
                      (1073709056 & b) | (32767 & I)
                    ));
                } else {
                  u >>= 1;
                  for (var U = 0; U < l.length - 1; U++) {
                    var W = this.__digit(u + U),
                      J = l.__digit(U),
                      ee = (32767 & W) - (32767 & J) - T;
                    T = 1 & (ee >>> 15);
                    var ue = (W >>> 15) - (J >>> 15) - T;
                    (T = 1 & (ue >>> 15)),
                      this.__setDigit(
                        u + U,
                        ((32767 & ue) << 15) | (32767 & ee)
                      );
                  }
                  var we = this.__digit(u + U),
                    Ee = l.__digit(U),
                    Je = (32767 & we) - (32767 & Ee) - T;
                  T = 1 & (Je >>> 15);
                  var Ze = 0;
                  !(1 & p) &&
                    ((Ze = (we >>> 15) - (Ee >>> 15) - T),
                    (T = 1 & (Ze >>> 15))),
                    this.__setDigit(u + U, ((32767 & Ze) << 15) | (32767 & Je));
                }
                return T;
              },
            },
            {
              key: '__inplaceRightShift',
              value: function (l) {
                if (l !== 0) {
                  for (
                    var u,
                      p = this.__digit(0) >>> l,
                      T = this.length - 1,
                      b = 0;
                    b < T;
                    b++
                  )
                    (u = this.__digit(b + 1)),
                      this.__setDigit(b, (1073741823 & (u << (30 - l))) | p),
                      (p = u >>> l);
                  this.__setDigit(T, p);
                }
              },
            },
            {
              key: '__digit',
              value: function (l) {
                return this[l];
              },
            },
            {
              key: '__unsignedDigit',
              value: function (l) {
                return this[l] >>> 0;
              },
            },
            {
              key: '__setDigit',
              value: function (l, u) {
                this[l] = 0 | u;
              },
            },
            {
              key: '__setDigitGrow',
              value: function (l, u) {
                this[l] = 0 | u;
              },
            },
            {
              key: '__halfDigitLength',
              value: function () {
                var l = this.length;
                return 32767 >= this.__unsignedDigit(l - 1) ? 2 * l - 1 : 2 * l;
              },
            },
            {
              key: '__halfDigit',
              value: function (l) {
                return 32767 & (this[l >>> 1] >>> (15 * (1 & l)));
              },
            },
            {
              key: '__setHalfDigit',
              value: function (l, u) {
                var p = l >>> 1,
                  T = this.__digit(p),
                  b =
                    1 & l
                      ? (32767 & T) | (u << 15)
                      : (1073709056 & T) | (32767 & u);
                this.__setDigit(p, b);
              },
            },
          ],
          [
            {
              key: 'BigInt',
              value: function (l) {
                var u = Number.isFinite;
                if (typeof l == 'number') {
                  if (l === 0) return w.__zero();
                  if (w.__isOneDigitInt(l))
                    return 0 > l ? w.__oneDigit(-l, !0) : w.__oneDigit(l, !1);
                  if (!u(l) || K(l) !== l)
                    throw new RangeError(
                      'The number ' +
                        l +
                        ' cannot be converted to BigInt because it is not an integer'
                    );
                  return w.__fromDouble(l);
                }
                if (typeof l == 'string') {
                  var p = w.__fromString(l);
                  if (p === null)
                    throw new SyntaxError(
                      'Cannot convert ' + l + ' to a BigInt'
                    );
                  return p;
                }
                if (typeof l == 'boolean')
                  return l === !0 ? w.__oneDigit(1, !1) : w.__zero();
                if (r(l) === 'object') {
                  if (l.constructor === w) return l;
                  var T = w.__toPrimitive(l);
                  return w.BigInt(T);
                }
                throw new TypeError('Cannot convert ' + l + ' to a BigInt');
              },
            },
            {
              key: 'toNumber',
              value: function (l) {
                var u = l.length;
                if (u === 0) return 0;
                if (u === 1) {
                  var p = l.__unsignedDigit(0);
                  return l.sign ? -p : p;
                }
                var T = l.__digit(u - 1),
                  b = w.__clz30(T),
                  I = 30 * u - b;
                if (1024 < I) return l.sign ? -1 / 0 : 1 / 0;
                var O = I - 1,
                  k = T,
                  F = u - 1,
                  N = b + 3,
                  Z = N === 32 ? 0 : k << N;
                Z >>>= 12;
                var U = N - 12,
                  W = 12 <= N ? 0 : k << (20 + N),
                  J = 20 + N;
                for (
                  0 < U &&
                  0 < F &&
                  (F--,
                  (k = l.__digit(F)),
                  (Z |= k >>> (30 - U)),
                  (W = k << (U + 2)),
                  (J = U + 2));
                  0 < J && 0 < F;

                )
                  F--,
                    (k = l.__digit(F)),
                    (W |= 30 <= J ? k << (J - 30) : k >>> (30 - J)),
                    (J -= 30);
                var ee = w.__decideRounding(l, J, F, k);
                if (
                  (ee === 1 || (ee === 0 && (1 & W) == 1)) &&
                  ((W = (W + 1) >>> 0),
                  W === 0 && (Z++, Z >>> 20 != 0 && ((Z = 0), O++, 1023 < O)))
                )
                  return l.sign ? -1 / 0 : 1 / 0;
                var ue = l.sign ? -2147483648 : 0;
                return (
                  (O = (O + 1023) << 20),
                  (w.__kBitConversionInts[1] = ue | O | Z),
                  (w.__kBitConversionInts[0] = W),
                  w.__kBitConversionDouble[0]
                );
              },
            },
            {
              key: 'unaryMinus',
              value: function (l) {
                if (l.length === 0) return l;
                var u = l.__copy();
                return (u.sign = !l.sign), u;
              },
            },
            {
              key: 'bitwiseNot',
              value: function (l) {
                return l.sign
                  ? w.__absoluteSubOne(l).__trim()
                  : w.__absoluteAddOne(l, !0);
              },
            },
            {
              key: 'exponentiate',
              value: function (l, u) {
                if (u.sign) throw new RangeError('Exponent must be positive');
                if (u.length === 0) return w.__oneDigit(1, !1);
                if (l.length === 0) return l;
                if (l.length === 1 && l.__digit(0) === 1)
                  return l.sign && !(1 & u.__digit(0)) ? w.unaryMinus(l) : l;
                if (1 < u.length) throw new RangeError('BigInt too big');
                var p = u.__unsignedDigit(0);
                if (p === 1) return l;
                if (p >= w.__kMaxLengthBits)
                  throw new RangeError('BigInt too big');
                if (l.length === 1 && l.__digit(0) === 2) {
                  var T = 1 + (0 | (p / 30)),
                    b = l.sign && (1 & p) != 0,
                    I = new w(T, b);
                  I.__initializeDigits();
                  var O = 1 << p % 30;
                  return I.__setDigit(T - 1, O), I;
                }
                var k = null,
                  F = l;
                for (1 & p && (k = l), p >>= 1; p !== 0; p >>= 1)
                  (F = w.multiply(F, F)),
                    1 & p && (k === null ? (k = F) : (k = w.multiply(k, F)));
                return k;
              },
            },
            {
              key: 'multiply',
              value: function (l, u) {
                if (l.length === 0) return l;
                if (u.length === 0) return u;
                var p = l.length + u.length;
                30 <= l.__clzmsd() + u.__clzmsd() && p--;
                var T = new w(p, l.sign !== u.sign);
                T.__initializeDigits();
                for (var b = 0; b < l.length; b++)
                  w.__multiplyAccumulate(u, l.__digit(b), T, b);
                return T.__trim();
              },
            },
            {
              key: 'divide',
              value: function (l, u) {
                if (u.length === 0) throw new RangeError('Division by zero');
                if (0 > w.__absoluteCompare(l, u)) return w.__zero();
                var p,
                  T = l.sign !== u.sign,
                  b = u.__unsignedDigit(0);
                if (u.length === 1 && 32767 >= b) {
                  if (b === 1) return T === l.sign ? l : w.unaryMinus(l);
                  p = w.__absoluteDivSmall(l, b, null);
                } else p = w.__absoluteDivLarge(l, u, !0, !1);
                return (p.sign = T), p.__trim();
              },
            },
            {
              key: 'remainder',
              value: function (u, p) {
                if (p.length === 0) throw new RangeError('Division by zero');
                if (0 > w.__absoluteCompare(u, p)) return u;
                var T = p.__unsignedDigit(0);
                if (p.length === 1 && 32767 >= T) {
                  if (T === 1) return w.__zero();
                  var b = w.__absoluteModSmall(u, T);
                  return b === 0 ? w.__zero() : w.__oneDigit(b, u.sign);
                }
                var I = w.__absoluteDivLarge(u, p, !1, !0);
                return (I.sign = u.sign), I.__trim();
              },
            },
            {
              key: 'add',
              value: function (l, u) {
                var p = l.sign;
                return p === u.sign
                  ? w.__absoluteAdd(l, u, p)
                  : 0 <= w.__absoluteCompare(l, u)
                  ? w.__absoluteSub(l, u, p)
                  : w.__absoluteSub(u, l, !p);
              },
            },
            {
              key: 'subtract',
              value: function (l, u) {
                var p = l.sign;
                return p === u.sign
                  ? 0 <= w.__absoluteCompare(l, u)
                    ? w.__absoluteSub(l, u, p)
                    : w.__absoluteSub(u, l, !p)
                  : w.__absoluteAdd(l, u, p);
              },
            },
            {
              key: 'leftShift',
              value: function (l, u) {
                return u.length === 0 || l.length === 0
                  ? l
                  : u.sign
                  ? w.__rightShiftByAbsolute(l, u)
                  : w.__leftShiftByAbsolute(l, u);
              },
            },
            {
              key: 'signedRightShift',
              value: function (l, u) {
                return u.length === 0 || l.length === 0
                  ? l
                  : u.sign
                  ? w.__leftShiftByAbsolute(l, u)
                  : w.__rightShiftByAbsolute(l, u);
              },
            },
            {
              key: 'unsignedRightShift',
              value: function () {
                throw new TypeError(
                  'BigInts have no unsigned right shift; use >> instead'
                );
              },
            },
            {
              key: 'lessThan',
              value: function (l, u) {
                return 0 > w.__compareToBigInt(l, u);
              },
            },
            {
              key: 'lessThanOrEqual',
              value: function (l, u) {
                return 0 >= w.__compareToBigInt(l, u);
              },
            },
            {
              key: 'greaterThan',
              value: function (l, u) {
                return 0 < w.__compareToBigInt(l, u);
              },
            },
            {
              key: 'greaterThanOrEqual',
              value: function (l, u) {
                return 0 <= w.__compareToBigInt(l, u);
              },
            },
            {
              key: 'equal',
              value: function (l, u) {
                if (l.sign !== u.sign || l.length !== u.length) return !1;
                for (var p = 0; p < l.length; p++)
                  if (l.__digit(p) !== u.__digit(p)) return !1;
                return !0;
              },
            },
            {
              key: 'notEqual',
              value: function (l, u) {
                return !w.equal(l, u);
              },
            },
            {
              key: 'bitwiseAnd',
              value: function (l, u) {
                if (!l.sign && !u.sign) return w.__absoluteAnd(l, u).__trim();
                if (l.sign && u.sign) {
                  var p = A(l.length, u.length) + 1,
                    T = w.__absoluteSubOne(l, p),
                    b = w.__absoluteSubOne(u);
                  return (
                    (T = w.__absoluteOr(T, b, T)),
                    w.__absoluteAddOne(T, !0, T).__trim()
                  );
                }
                if (l.sign) {
                  var I = [u, l];
                  (l = I[0]), (u = I[1]);
                }
                return w.__absoluteAndNot(l, w.__absoluteSubOne(u)).__trim();
              },
            },
            {
              key: 'bitwiseXor',
              value: function (l, u) {
                if (!l.sign && !u.sign) return w.__absoluteXor(l, u).__trim();
                if (l.sign && u.sign) {
                  var p = A(l.length, u.length),
                    T = w.__absoluteSubOne(l, p),
                    b = w.__absoluteSubOne(u);
                  return w.__absoluteXor(T, b, T).__trim();
                }
                var I = A(l.length, u.length) + 1;
                if (l.sign) {
                  var O = [u, l];
                  (l = O[0]), (u = O[1]);
                }
                var k = w.__absoluteSubOne(u, I);
                return (
                  (k = w.__absoluteXor(k, l, k)),
                  w.__absoluteAddOne(k, !0, k).__trim()
                );
              },
            },
            {
              key: 'bitwiseOr',
              value: function (l, u) {
                var p = A(l.length, u.length);
                if (!l.sign && !u.sign) return w.__absoluteOr(l, u).__trim();
                if (l.sign && u.sign) {
                  var T = w.__absoluteSubOne(l, p),
                    b = w.__absoluteSubOne(u);
                  return (
                    (T = w.__absoluteAnd(T, b, T)),
                    w.__absoluteAddOne(T, !0, T).__trim()
                  );
                }
                if (l.sign) {
                  var I = [u, l];
                  (l = I[0]), (u = I[1]);
                }
                var O = w.__absoluteSubOne(u, p);
                return (
                  (O = w.__absoluteAndNot(O, l, O)),
                  w.__absoluteAddOne(O, !0, O).__trim()
                );
              },
            },
            {
              key: 'asIntN',
              value: function (l, u) {
                if (u.length === 0) return u;
                if (((l = K(l)), 0 > l))
                  throw new RangeError(
                    'Invalid value: not (convertible to) a safe integer'
                  );
                if (l === 0) return w.__zero();
                if (l >= w.__kMaxLengthBits) return u;
                var p = 0 | ((l + 29) / 30);
                if (u.length < p) return u;
                var T = u.__unsignedDigit(p - 1),
                  b = 1 << (l - 1) % 30;
                if (u.length === p && T < b) return u;
                if ((T & b) !== b) return w.__truncateToNBits(l, u);
                if (!u.sign) return w.__truncateAndSubFromPowerOfTwo(l, u, !0);
                if (!(T & (b - 1))) {
                  for (var I = p - 2; 0 <= I; I--)
                    if (u.__digit(I) !== 0)
                      return w.__truncateAndSubFromPowerOfTwo(l, u, !1);
                  return u.length === p && T === b
                    ? u
                    : w.__truncateToNBits(l, u);
                }
                return w.__truncateAndSubFromPowerOfTwo(l, u, !1);
              },
            },
            {
              key: 'asUintN',
              value: function (l, u) {
                if (u.length === 0) return u;
                if (((l = K(l)), 0 > l))
                  throw new RangeError(
                    'Invalid value: not (convertible to) a safe integer'
                  );
                if (l === 0) return w.__zero();
                if (u.sign) {
                  if (l > w.__kMaxLengthBits)
                    throw new RangeError('BigInt too big');
                  return w.__truncateAndSubFromPowerOfTwo(l, u, !1);
                }
                if (l >= w.__kMaxLengthBits) return u;
                var p = 0 | ((l + 29) / 30);
                if (u.length < p) return u;
                var T = l % 30;
                if (u.length == p) {
                  if (T === 0) return u;
                  var b = u.__digit(p - 1);
                  if (!(b >>> T)) return u;
                }
                return w.__truncateToNBits(l, u);
              },
            },
            {
              key: 'ADD',
              value: function (l, u) {
                if (
                  ((l = w.__toPrimitive(l)),
                  (u = w.__toPrimitive(u)),
                  typeof l == 'string')
                )
                  return typeof u != 'string' && (u = u.toString()), l + u;
                if (typeof u == 'string') return l.toString() + u;
                if (
                  ((l = w.__toNumeric(l)),
                  (u = w.__toNumeric(u)),
                  w.__isBigInt(l) && w.__isBigInt(u))
                )
                  return w.add(l, u);
                if (typeof l == 'number' && typeof u == 'number') return l + u;
                throw new TypeError(
                  'Cannot mix BigInt and other types, use explicit conversions'
                );
              },
            },
            {
              key: 'LT',
              value: function (l, u) {
                return w.__compare(l, u, 0);
              },
            },
            {
              key: 'LE',
              value: function (l, u) {
                return w.__compare(l, u, 1);
              },
            },
            {
              key: 'GT',
              value: function (l, u) {
                return w.__compare(l, u, 2);
              },
            },
            {
              key: 'GE',
              value: function (l, u) {
                return w.__compare(l, u, 3);
              },
            },
            {
              key: 'EQ',
              value: function (l, u) {
                for (;;) {
                  if (w.__isBigInt(l))
                    return w.__isBigInt(u) ? w.equal(l, u) : w.EQ(u, l);
                  if (typeof l == 'number') {
                    if (w.__isBigInt(u)) return w.__equalToNumber(u, l);
                    if (r(u) !== 'object') return l == u;
                    u = w.__toPrimitive(u);
                  } else if (typeof l == 'string') {
                    if (w.__isBigInt(u))
                      return (
                        (l = w.__fromString(l)), l !== null && w.equal(l, u)
                      );
                    if (r(u) !== 'object') return l == u;
                    u = w.__toPrimitive(u);
                  } else if (typeof l == 'boolean') {
                    if (w.__isBigInt(u)) return w.__equalToNumber(u, +l);
                    if (r(u) !== 'object') return l == u;
                    u = w.__toPrimitive(u);
                  } else if (r(l) === 'symbol') {
                    if (w.__isBigInt(u)) return !1;
                    if (r(u) !== 'object') return l == u;
                    u = w.__toPrimitive(u);
                  } else if (r(l) === 'object') {
                    if (r(u) === 'object' && u.constructor !== w) return l == u;
                    l = w.__toPrimitive(l);
                  } else return l == u;
                }
              },
            },
            {
              key: 'NE',
              value: function (l, u) {
                return !w.EQ(l, u);
              },
            },
            {
              key: 'DataViewGetBigInt64',
              value: function (l, u) {
                var p =
                  2 < arguments.length &&
                  arguments[2] !== void 0 &&
                  arguments[2];
                return w.asIntN(64, w.DataViewGetBigUint64(l, u, p));
              },
            },
            {
              key: 'DataViewGetBigUint64',
              value: function (l, u) {
                var p =
                    2 < arguments.length &&
                    arguments[2] !== void 0 &&
                    arguments[2],
                  T = p ? [4, 0] : [0, 4],
                  b = D(T, 2),
                  I = b[0],
                  O = b[1],
                  k = l.getUint32(u + I, p),
                  F = l.getUint32(u + O, p),
                  N = new w(3, !1);
                return (
                  N.__setDigit(0, 1073741823 & F),
                  N.__setDigit(1, ((268435455 & k) << 2) | (F >>> 30)),
                  N.__setDigit(2, k >>> 28),
                  N.__trim()
                );
              },
            },
            {
              key: 'DataViewSetBigInt64',
              value: function (l, u, p) {
                var T =
                  3 < arguments.length &&
                  arguments[3] !== void 0 &&
                  arguments[3];
                w.DataViewSetBigUint64(l, u, p, T);
              },
            },
            {
              key: 'DataViewSetBigUint64',
              value: function (l, u, p) {
                var T =
                  3 < arguments.length &&
                  arguments[3] !== void 0 &&
                  arguments[3];
                p = w.asUintN(64, p);
                var b = 0,
                  I = 0;
                if (0 < p.length && ((I = p.__digit(0)), 1 < p.length)) {
                  var O = p.__digit(1);
                  (I |= O << 30),
                    (b = O >>> 2),
                    2 < p.length && (b |= p.__digit(2) << 28);
                }
                var k = T ? [4, 0] : [0, 4],
                  F = D(k, 2),
                  N = F[0],
                  Z = F[1];
                l.setUint32(u + N, b, T), l.setUint32(u + Z, I, T);
              },
            },
            {
              key: '__zero',
              value: function () {
                return new w(0, !1);
              },
            },
            {
              key: '__oneDigit',
              value: function (l, u) {
                var p = new w(1, u);
                return p.__setDigit(0, l), p;
              },
            },
            {
              key: '__decideRounding',
              value: function (l, u, p, T) {
                if (0 < u) return -1;
                var b;
                if (0 > u) b = -u - 1;
                else {
                  if (p === 0) return -1;
                  p--, (T = l.__digit(p)), (b = 29);
                }
                var I = 1 << b;
                if (!(T & I)) return -1;
                if (((I -= 1), (T & I) != 0)) return 1;
                for (; 0 < p; ) if ((p--, l.__digit(p) !== 0)) return 1;
                return 0;
              },
            },
            {
              key: '__fromDouble',
              value: function (l) {
                w.__kBitConversionDouble[0] = l;
                var u,
                  p = 2047 & (w.__kBitConversionInts[1] >>> 20),
                  T = p - 1023,
                  b = (0 | (T / 30)) + 1,
                  I = new w(b, 0 > l),
                  O = (1048575 & w.__kBitConversionInts[1]) | 1048576,
                  k = w.__kBitConversionInts[0],
                  F = 20,
                  N = T % 30,
                  Z = 0;
                if (N < F) {
                  var U = F - N;
                  (Z = U + 32),
                    (u = O >>> U),
                    (O = (O << (32 - U)) | (k >>> U)),
                    (k <<= 32 - U);
                } else if (N === F) (Z = 32), (u = O), (O = k), (k = 0);
                else {
                  var W = N - F;
                  (Z = 32 - W),
                    (u = (O << W) | (k >>> (32 - W))),
                    (O = k << W),
                    (k = 0);
                }
                I.__setDigit(b - 1, u);
                for (var J = b - 2; 0 <= J; J--)
                  0 < Z
                    ? ((Z -= 30),
                      (u = O >>> 2),
                      (O = (O << 30) | (k >>> 2)),
                      (k <<= 30))
                    : (u = 0),
                    I.__setDigit(J, u);
                return I.__trim();
              },
            },
            {
              key: '__isWhitespace',
              value: function (l) {
                return (
                  (13 >= l && 9 <= l) ||
                  (159 >= l
                    ? l == 32
                    : 131071 >= l
                    ? l == 160 || l == 5760
                    : 196607 >= l
                    ? ((l &= 131071),
                      10 >= l ||
                        l == 40 ||
                        l == 41 ||
                        l == 47 ||
                        l == 95 ||
                        l == 4096)
                    : l == 65279)
                );
              },
            },
            {
              key: '__fromString',
              value: function (l) {
                var u =
                    1 < arguments.length && arguments[1] !== void 0
                      ? arguments[1]
                      : 0,
                  p = 0,
                  T = l.length,
                  b = 0;
                if (b === T) return w.__zero();
                for (var I = l.charCodeAt(b); w.__isWhitespace(I); ) {
                  if (++b === T) return w.__zero();
                  I = l.charCodeAt(b);
                }
                if (I === 43) {
                  if (++b === T) return null;
                  (I = l.charCodeAt(b)), (p = 1);
                } else if (I === 45) {
                  if (++b === T) return null;
                  (I = l.charCodeAt(b)), (p = -1);
                }
                if (u === 0) {
                  if (((u = 10), I === 48)) {
                    if (++b === T) return w.__zero();
                    if (((I = l.charCodeAt(b)), I === 88 || I === 120)) {
                      if (((u = 16), ++b === T)) return null;
                      I = l.charCodeAt(b);
                    } else if (I === 79 || I === 111) {
                      if (((u = 8), ++b === T)) return null;
                      I = l.charCodeAt(b);
                    } else if (I === 66 || I === 98) {
                      if (((u = 2), ++b === T)) return null;
                      I = l.charCodeAt(b);
                    }
                  }
                } else if (u === 16 && I === 48) {
                  if (++b === T) return w.__zero();
                  if (((I = l.charCodeAt(b)), I === 88 || I === 120)) {
                    if (++b === T) return null;
                    I = l.charCodeAt(b);
                  }
                }
                if (p !== 0 && u !== 10) return null;
                for (; I === 48; ) {
                  if (++b === T) return w.__zero();
                  I = l.charCodeAt(b);
                }
                var O = T - b,
                  k = w.__kMaxBitsPerChar[u],
                  F = w.__kBitsPerCharTableMultiplier - 1;
                if (O > 1073741824 / k) return null;
                var N = (k * O + F) >>> w.__kBitsPerCharTableShift,
                  Z = new w(0 | ((N + 29) / 30), !1),
                  U = 10 > u ? u : 10,
                  W = 10 < u ? u - 10 : 0;
                if (u & (u - 1)) {
                  Z.__initializeDigits();
                  var Ze = !1,
                    It = 0;
                  do {
                    for (var Cn, di = 0, ui = 1; ; ) {
                      if (((Cn = void 0), (I - 48) >>> 0 < U)) Cn = I - 48;
                      else if (((32 | I) - 97) >>> 0 < W) Cn = (32 | I) - 87;
                      else {
                        Ze = !0;
                        break;
                      }
                      var bo = ui * u;
                      if (1073741823 < bo) break;
                      if (((ui = bo), (di = di * u + Cn), It++, ++b === T)) {
                        Ze = !0;
                        break;
                      }
                      I = l.charCodeAt(b);
                    }
                    F = 30 * w.__kBitsPerCharTableMultiplier - 1;
                    var us =
                      0 | (((k * It + F) >>> w.__kBitsPerCharTableShift) / 30);
                    Z.__inplaceMultiplyAdd(ui, di, us);
                  } while (!Ze);
                } else {
                  k >>= w.__kBitsPerCharTableShift;
                  var J = [],
                    ee = [],
                    ue = !1;
                  do {
                    for (var we, Ee = 0, Je = 0; ; ) {
                      if (((we = void 0), (I - 48) >>> 0 < U)) we = I - 48;
                      else if (((32 | I) - 97) >>> 0 < W) we = (32 | I) - 87;
                      else {
                        ue = !0;
                        break;
                      }
                      if (((Je += k), (Ee = (Ee << k) | we), ++b === T)) {
                        ue = !0;
                        break;
                      }
                      if (((I = l.charCodeAt(b)), 30 < Je + k)) break;
                    }
                    J.push(Ee), ee.push(Je);
                  } while (!ue);
                  w.__fillFromParts(Z, J, ee);
                }
                if (b !== T) {
                  if (!w.__isWhitespace(I)) return null;
                  for (b++; b < T; b++)
                    if (((I = l.charCodeAt(b)), !w.__isWhitespace(I)))
                      return null;
                }
                return (Z.sign = p === -1), Z.__trim();
              },
            },
            {
              key: '__fillFromParts',
              value: function (l, u, p) {
                for (var T = 0, b = 0, I = 0, O = u.length - 1; 0 <= O; O--) {
                  var k = u[O],
                    F = p[O];
                  (b |= k << I),
                    (I += F),
                    I === 30
                      ? (l.__setDigit(T++, b), (I = 0), (b = 0))
                      : 30 < I &&
                        (l.__setDigit(T++, 1073741823 & b),
                        (I -= 30),
                        (b = k >>> (F - I)));
                }
                if (b !== 0) {
                  if (T >= l.length) throw new Error('implementation bug');
                  l.__setDigit(T++, b);
                }
                for (; T < l.length; T++) l.__setDigit(T, 0);
              },
            },
            {
              key: '__toStringBasePowerOfTwo',
              value: function (l, u) {
                var p = l.length,
                  T = u - 1;
                (T = (85 & (T >>> 1)) + (85 & T)),
                  (T = (51 & (T >>> 2)) + (51 & T)),
                  (T = (15 & (T >>> 4)) + (15 & T));
                var b = T,
                  I = u - 1,
                  O = l.__digit(p - 1),
                  k = w.__clz30(O),
                  F = 0 | ((30 * p - k + b - 1) / b);
                if ((l.sign && F++, 268435456 < F))
                  throw new Error('string too long');
                for (
                  var N = Array(F), Z = F - 1, U = 0, W = 0, J = 0;
                  J < p - 1;
                  J++
                ) {
                  var ee = l.__digit(J),
                    ue = (U | (ee << W)) & I;
                  N[Z--] = w.__kConversionChars[ue];
                  var we = b - W;
                  for (U = ee >>> we, W = 30 - we; W >= b; )
                    (N[Z--] = w.__kConversionChars[U & I]),
                      (U >>>= b),
                      (W -= b);
                }
                var Ee = (U | (O << W)) & I;
                for (
                  N[Z--] = w.__kConversionChars[Ee], U = O >>> (b - W);
                  U !== 0;

                )
                  (N[Z--] = w.__kConversionChars[U & I]), (U >>>= b);
                if ((l.sign && (N[Z--] = '-'), Z !== -1))
                  throw new Error('implementation bug');
                return N.join('');
              },
            },
            {
              key: '__toStringGeneric',
              value: function (l, u, p) {
                var T = l.length;
                if (T === 0) return '';
                if (T === 1) {
                  var b = l.__unsignedDigit(0).toString(u);
                  return p === !1 && l.sign && (b = '-' + b), b;
                }
                var I = 30 * T - w.__clz30(l.__digit(T - 1)),
                  O = w.__kMaxBitsPerChar[u],
                  k = O - 1,
                  F = I * w.__kBitsPerCharTableMultiplier;
                (F += k - 1), (F = 0 | (F / k));
                var N,
                  Z,
                  U = (F + 1) >> 1,
                  W = w.exponentiate(w.__oneDigit(u, !1), w.__oneDigit(U, !1)),
                  J = W.__unsignedDigit(0);
                if (W.length === 1 && 32767 >= J) {
                  (N = new w(l.length, !1)), N.__initializeDigits();
                  for (var ee, ue = 0, we = 2 * l.length - 1; 0 <= we; we--)
                    (ee = (ue << 15) | l.__halfDigit(we)),
                      N.__setHalfDigit(we, 0 | (ee / J)),
                      (ue = 0 | ee % J);
                  Z = ue.toString(u);
                } else {
                  var Ee = w.__absoluteDivLarge(l, W, !0, !0);
                  N = Ee.quotient;
                  var Je = Ee.remainder.__trim();
                  Z = w.__toStringGeneric(Je, u, !0);
                }
                N.__trim();
                for (var Ze = w.__toStringGeneric(N, u, !0); Z.length < U; )
                  Z = '0' + Z;
                return p === !1 && l.sign && (Ze = '-' + Ze), Ze + Z;
              },
            },
            {
              key: '__unequalSign',
              value: function (l) {
                return l ? -1 : 1;
              },
            },
            {
              key: '__absoluteGreater',
              value: function (l) {
                return l ? -1 : 1;
              },
            },
            {
              key: '__absoluteLess',
              value: function (l) {
                return l ? 1 : -1;
              },
            },
            {
              key: '__compareToBigInt',
              value: function (l, u) {
                var p = l.sign;
                if (p !== u.sign) return w.__unequalSign(p);
                var T = w.__absoluteCompare(l, u);
                return 0 < T
                  ? w.__absoluteGreater(p)
                  : 0 > T
                  ? w.__absoluteLess(p)
                  : 0;
              },
            },
            {
              key: '__compareToNumber',
              value: function (l, u) {
                if (w.__isOneDigitInt(u)) {
                  var p = l.sign,
                    T = 0 > u;
                  if (p !== T) return w.__unequalSign(p);
                  if (l.length === 0) {
                    if (T) throw new Error('implementation bug');
                    return u === 0 ? 0 : -1;
                  }
                  if (1 < l.length) return w.__absoluteGreater(p);
                  var b = $(u),
                    I = l.__unsignedDigit(0);
                  return I > b
                    ? w.__absoluteGreater(p)
                    : I < b
                    ? w.__absoluteLess(p)
                    : 0;
                }
                return w.__compareToDouble(l, u);
              },
            },
            {
              key: '__compareToDouble',
              value: function (l, u) {
                if (u !== u) return u;
                if (u === 1 / 0) return -1;
                if (u === -1 / 0) return 1;
                var p = l.sign;
                if (p !== 0 > u) return w.__unequalSign(p);
                if (u === 0)
                  throw new Error(
                    'implementation bug: should be handled elsewhere'
                  );
                if (l.length === 0) return -1;
                w.__kBitConversionDouble[0] = u;
                var T = 2047 & (w.__kBitConversionInts[1] >>> 20);
                if (T == 2047)
                  throw new Error('implementation bug: handled elsewhere');
                var b = T - 1023;
                if (0 > b) return w.__absoluteGreater(p);
                var I = l.length,
                  O = l.__digit(I - 1),
                  k = w.__clz30(O),
                  F = 30 * I - k,
                  N = b + 1;
                if (F < N) return w.__absoluteLess(p);
                if (F > N) return w.__absoluteGreater(p);
                var Z = 1048576 | (1048575 & w.__kBitConversionInts[1]),
                  U = w.__kBitConversionInts[0],
                  W = 20,
                  J = 29 - k;
                if (J !== (0 | (F - 1) % 30))
                  throw new Error('implementation bug');
                var ee,
                  ue = 0;
                if (J < W) {
                  var we = W - J;
                  (ue = we + 32),
                    (ee = Z >>> we),
                    (Z = (Z << (32 - we)) | (U >>> we)),
                    (U <<= 32 - we);
                } else if (J === W) (ue = 32), (ee = Z), (Z = U), (U = 0);
                else {
                  var Ee = J - W;
                  (ue = 32 - Ee),
                    (ee = (Z << Ee) | (U >>> (32 - Ee))),
                    (Z = U << Ee),
                    (U = 0);
                }
                if (((O >>>= 0), (ee >>>= 0), O > ee))
                  return w.__absoluteGreater(p);
                if (O < ee) return w.__absoluteLess(p);
                for (var Je = I - 2; 0 <= Je; Je--) {
                  0 < ue
                    ? ((ue -= 30),
                      (ee = Z >>> 2),
                      (Z = (Z << 30) | (U >>> 2)),
                      (U <<= 30))
                    : (ee = 0);
                  var Ze = l.__unsignedDigit(Je);
                  if (Ze > ee) return w.__absoluteGreater(p);
                  if (Ze < ee) return w.__absoluteLess(p);
                }
                if (Z !== 0 || U !== 0) {
                  if (ue === 0) throw new Error('implementation bug');
                  return w.__absoluteLess(p);
                }
                return 0;
              },
            },
            {
              key: '__equalToNumber',
              value: function (l, u) {
                return w.__isOneDigitInt(u)
                  ? u === 0
                    ? l.length === 0
                    : l.length === 1 &&
                      l.sign === 0 > u &&
                      l.__unsignedDigit(0) === $(u)
                  : w.__compareToDouble(l, u) === 0;
              },
            },
            {
              key: '__comparisonResultToBool',
              value: function (l, u) {
                return u === 0
                  ? 0 > l
                  : u === 1
                  ? 0 >= l
                  : u === 2
                  ? 0 < l
                  : u === 3
                  ? 0 <= l
                  : void 0;
              },
            },
            {
              key: '__compare',
              value: function (l, u, p) {
                if (
                  ((l = w.__toPrimitive(l)),
                  (u = w.__toPrimitive(u)),
                  typeof l == 'string' && typeof u == 'string')
                )
                  switch (p) {
                    case 0:
                      return l < u;
                    case 1:
                      return l <= u;
                    case 2:
                      return l > u;
                    case 3:
                      return l >= u;
                  }
                if (w.__isBigInt(l) && typeof u == 'string')
                  return (
                    (u = w.__fromString(u)),
                    u !== null &&
                      w.__comparisonResultToBool(w.__compareToBigInt(l, u), p)
                  );
                if (typeof l == 'string' && w.__isBigInt(u))
                  return (
                    (l = w.__fromString(l)),
                    l !== null &&
                      w.__comparisonResultToBool(w.__compareToBigInt(l, u), p)
                  );
                if (
                  ((l = w.__toNumeric(l)),
                  (u = w.__toNumeric(u)),
                  w.__isBigInt(l))
                ) {
                  if (w.__isBigInt(u))
                    return w.__comparisonResultToBool(
                      w.__compareToBigInt(l, u),
                      p
                    );
                  if (typeof u != 'number')
                    throw new Error('implementation bug');
                  return w.__comparisonResultToBool(
                    w.__compareToNumber(l, u),
                    p
                  );
                }
                if (typeof l != 'number') throw new Error('implementation bug');
                if (w.__isBigInt(u))
                  return w.__comparisonResultToBool(
                    w.__compareToNumber(u, l),
                    2 ^ p
                  );
                if (typeof u != 'number') throw new Error('implementation bug');
                return p === 0
                  ? l < u
                  : p === 1
                  ? l <= u
                  : p === 2
                  ? l > u
                  : p === 3
                  ? l >= u
                  : void 0;
              },
            },
            {
              key: '__absoluteAdd',
              value: function (l, u, p) {
                if (l.length < u.length) return w.__absoluteAdd(u, l, p);
                if (l.length === 0) return l;
                if (u.length === 0) return l.sign === p ? l : w.unaryMinus(l);
                var T = l.length;
                (l.__clzmsd() === 0 ||
                  (u.length === l.length && u.__clzmsd() === 0)) &&
                  T++;
                for (var b, I = new w(T, p), O = 0, k = 0; k < u.length; k++)
                  (b = l.__digit(k) + u.__digit(k) + O),
                    (O = b >>> 30),
                    I.__setDigit(k, 1073741823 & b);
                for (; k < l.length; k++) {
                  var F = l.__digit(k) + O;
                  (O = F >>> 30), I.__setDigit(k, 1073741823 & F);
                }
                return k < I.length && I.__setDigit(k, O), I.__trim();
              },
            },
            {
              key: '__absoluteSub',
              value: function (l, u, p) {
                if (l.length === 0) return l;
                if (u.length === 0) return l.sign === p ? l : w.unaryMinus(l);
                for (
                  var T, b = new w(l.length, p), I = 0, O = 0;
                  O < u.length;
                  O++
                )
                  (T = l.__digit(O) - u.__digit(O) - I),
                    (I = 1 & (T >>> 30)),
                    b.__setDigit(O, 1073741823 & T);
                for (; O < l.length; O++) {
                  var k = l.__digit(O) - I;
                  (I = 1 & (k >>> 30)), b.__setDigit(O, 1073741823 & k);
                }
                return b.__trim();
              },
            },
            {
              key: '__absoluteAddOne',
              value: function (l, u) {
                var p =
                    2 < arguments.length && arguments[2] !== void 0
                      ? arguments[2]
                      : null,
                  T = l.length;
                p === null ? (p = new w(T, u)) : (p.sign = u);
                for (var b, I = 1, O = 0; O < T; O++)
                  (b = l.__digit(O) + I),
                    (I = b >>> 30),
                    p.__setDigit(O, 1073741823 & b);
                return I !== 0 && p.__setDigitGrow(T, 1), p;
              },
            },
            {
              key: '__absoluteSubOne',
              value: function (l, u) {
                var p = l.length;
                u = u || p;
                for (var T, b = new w(u, !1), I = 1, O = 0; O < p; O++)
                  (T = l.__digit(O) - I),
                    (I = 1 & (T >>> 30)),
                    b.__setDigit(O, 1073741823 & T);
                if (I !== 0) throw new Error('implementation bug');
                for (var k = p; k < u; k++) b.__setDigit(k, 0);
                return b;
              },
            },
            {
              key: '__absoluteAnd',
              value: function (l, u) {
                var p =
                    2 < arguments.length && arguments[2] !== void 0
                      ? arguments[2]
                      : null,
                  T = l.length,
                  b = u.length,
                  I = b;
                if (T < b) {
                  I = T;
                  var O = l,
                    k = T;
                  (l = u), (T = b), (u = O), (b = k);
                }
                var F = I;
                p === null ? (p = new w(F, !1)) : (F = p.length);
                for (var N = 0; N < I; N++)
                  p.__setDigit(N, l.__digit(N) & u.__digit(N));
                for (; N < F; N++) p.__setDigit(N, 0);
                return p;
              },
            },
            {
              key: '__absoluteAndNot',
              value: function (l, u) {
                var p =
                    2 < arguments.length && arguments[2] !== void 0
                      ? arguments[2]
                      : null,
                  T = l.length,
                  b = u.length,
                  I = b;
                T < b && (I = T);
                var O = T;
                p === null ? (p = new w(O, !1)) : (O = p.length);
                for (var k = 0; k < I; k++)
                  p.__setDigit(k, l.__digit(k) & ~u.__digit(k));
                for (; k < T; k++) p.__setDigit(k, l.__digit(k));
                for (; k < O; k++) p.__setDigit(k, 0);
                return p;
              },
            },
            {
              key: '__absoluteOr',
              value: function (l, u) {
                var p =
                    2 < arguments.length && arguments[2] !== void 0
                      ? arguments[2]
                      : null,
                  T = l.length,
                  b = u.length,
                  I = b;
                if (T < b) {
                  I = T;
                  var O = l,
                    k = T;
                  (l = u), (T = b), (u = O), (b = k);
                }
                var F = T;
                p === null ? (p = new w(F, !1)) : (F = p.length);
                for (var N = 0; N < I; N++)
                  p.__setDigit(N, l.__digit(N) | u.__digit(N));
                for (; N < T; N++) p.__setDigit(N, l.__digit(N));
                for (; N < F; N++) p.__setDigit(N, 0);
                return p;
              },
            },
            {
              key: '__absoluteXor',
              value: function (l, u) {
                var p =
                    2 < arguments.length && arguments[2] !== void 0
                      ? arguments[2]
                      : null,
                  T = l.length,
                  b = u.length,
                  I = b;
                if (T < b) {
                  I = T;
                  var O = l,
                    k = T;
                  (l = u), (T = b), (u = O), (b = k);
                }
                var F = T;
                p === null ? (p = new w(F, !1)) : (F = p.length);
                for (var N = 0; N < I; N++)
                  p.__setDigit(N, l.__digit(N) ^ u.__digit(N));
                for (; N < T; N++) p.__setDigit(N, l.__digit(N));
                for (; N < F; N++) p.__setDigit(N, 0);
                return p;
              },
            },
            {
              key: '__absoluteCompare',
              value: function (l, u) {
                var p = l.length - u.length;
                if (p != 0) return p;
                for (
                  var T = l.length - 1;
                  0 <= T && l.__digit(T) === u.__digit(T);

                )
                  T--;
                return 0 > T
                  ? 0
                  : l.__unsignedDigit(T) > u.__unsignedDigit(T)
                  ? 1
                  : -1;
              },
            },
            {
              key: '__multiplyAccumulate',
              value: function (l, u, p, T) {
                if (u !== 0) {
                  for (
                    var b = 32767 & u, I = u >>> 15, O = 0, k = 0, F = 0;
                    F < l.length;
                    F++, T++
                  ) {
                    var N = p.__digit(T),
                      Z = l.__digit(F),
                      U = 32767 & Z,
                      W = Z >>> 15,
                      J = w.__imul(U, b),
                      ee = w.__imul(U, I),
                      ue = w.__imul(W, b),
                      we = w.__imul(W, I);
                    (N += k + J + O),
                      (O = N >>> 30),
                      (N &= 1073741823),
                      (N += ((32767 & ee) << 15) + ((32767 & ue) << 15)),
                      (O += N >>> 30),
                      (k = we + (ee >>> 15) + (ue >>> 15)),
                      p.__setDigit(T, 1073741823 & N);
                  }
                  for (; O !== 0 || k !== 0; T++) {
                    var Ee = p.__digit(T);
                    (Ee += O + k),
                      (k = 0),
                      (O = Ee >>> 30),
                      p.__setDigit(T, 1073741823 & Ee);
                  }
                }
              },
            },
            {
              key: '__internalMultiplyAdd',
              value: function (l, u, p, T, b) {
                for (var I = p, O = 0, k = 0; k < T; k++) {
                  var F = l.__digit(k),
                    N = w.__imul(32767 & F, u),
                    Z = w.__imul(F >>> 15, u),
                    U = N + ((32767 & Z) << 15) + O + I;
                  (I = U >>> 30),
                    (O = Z >>> 15),
                    b.__setDigit(k, 1073741823 & U);
                }
                if (b.length > T)
                  for (b.__setDigit(T++, I + O); T < b.length; )
                    b.__setDigit(T++, 0);
                else if (I + O !== 0) throw new Error('implementation bug');
              },
            },
            {
              key: '__absoluteDivSmall',
              value: function (l, u) {
                var p =
                  2 < arguments.length && arguments[2] !== void 0
                    ? arguments[2]
                    : null;
                p === null && (p = new w(l.length, !1));
                for (var T = 0, b = 2 * l.length - 1; 0 <= b; b -= 2) {
                  var I = ((T << 15) | l.__halfDigit(b)) >>> 0,
                    O = 0 | (I / u);
                  (T = 0 | I % u),
                    (I = ((T << 15) | l.__halfDigit(b - 1)) >>> 0);
                  var k = 0 | (I / u);
                  (T = 0 | I % u), p.__setDigit(b >>> 1, (O << 15) | k);
                }
                return p;
              },
            },
            {
              key: '__absoluteModSmall',
              value: function (l, u) {
                for (var p, T = 0, b = 2 * l.length - 1; 0 <= b; b--)
                  (p = ((T << 15) | l.__halfDigit(b)) >>> 0), (T = 0 | p % u);
                return T;
              },
            },
            {
              key: '__absoluteDivLarge',
              value: function (l, u, p, T) {
                var b = u.__halfDigitLength(),
                  I = u.length,
                  O = l.__halfDigitLength() - b,
                  k = null;
                p && ((k = new w((O + 2) >>> 1, !1)), k.__initializeDigits());
                var F = new w((b + 2) >>> 1, !1);
                F.__initializeDigits();
                var N = w.__clz15(u.__halfDigit(b - 1));
                0 < N && (u = w.__specialLeftShift(u, N, 0));
                for (
                  var Z = w.__specialLeftShift(l, N, 1),
                    U = u.__halfDigit(b - 1),
                    W = 0,
                    J = O;
                  0 <= J;
                  J--
                ) {
                  var ee = 32767,
                    ue = Z.__halfDigit(J + b);
                  if (ue !== U) {
                    var we = ((ue << 15) | Z.__halfDigit(J + b - 1)) >>> 0;
                    ee = 0 | (we / U);
                    for (
                      var Ee = 0 | we % U,
                        Je = u.__halfDigit(b - 2),
                        Ze = Z.__halfDigit(J + b - 2);
                      w.__imul(ee, Je) >>> 0 > ((Ee << 16) | Ze) >>> 0 &&
                      (ee--, (Ee += U), !(32767 < Ee));

                    );
                  }
                  w.__internalMultiplyAdd(u, ee, 0, I, F);
                  var It = Z.__inplaceSub(F, J, b + 1);
                  It !== 0 &&
                    ((It = Z.__inplaceAdd(u, J, b)),
                    Z.__setHalfDigit(
                      J + b,
                      32767 & (Z.__halfDigit(J + b) + It)
                    ),
                    ee--),
                    p &&
                      (1 & J ? (W = ee << 15) : k.__setDigit(J >>> 1, W | ee));
                }
                if (T)
                  return (
                    Z.__inplaceRightShift(N),
                    p ? {quotient: k, remainder: Z} : Z
                  );
                if (p) return k;
                throw new Error('unreachable');
              },
            },
            {
              key: '__clz15',
              value: function (l) {
                return w.__clz30(l) - 15;
              },
            },
            {
              key: '__specialLeftShift',
              value: function (l, u, p) {
                var T = l.length,
                  b = new w(T + p, !1);
                if (u === 0) {
                  for (var I = 0; I < T; I++) b.__setDigit(I, l.__digit(I));
                  return 0 < p && b.__setDigit(T, 0), b;
                }
                for (var O, k = 0, F = 0; F < T; F++)
                  (O = l.__digit(F)),
                    b.__setDigit(F, (1073741823 & (O << u)) | k),
                    (k = O >>> (30 - u));
                return 0 < p && b.__setDigit(T, k), b;
              },
            },
            {
              key: '__leftShiftByAbsolute',
              value: function (l, u) {
                var p = w.__toShiftAmount(u);
                if (0 > p) throw new RangeError('BigInt too big');
                var T = 0 | (p / 30),
                  b = p % 30,
                  I = l.length,
                  O = b !== 0 && l.__digit(I - 1) >>> (30 - b) != 0,
                  k = I + T + (O ? 1 : 0),
                  F = new w(k, l.sign);
                if (b === 0) {
                  for (var N = 0; N < T; N++) F.__setDigit(N, 0);
                  for (; N < k; N++) F.__setDigit(N, l.__digit(N - T));
                } else {
                  for (var Z = 0, U = 0; U < T; U++) F.__setDigit(U, 0);
                  for (var W, J = 0; J < I; J++)
                    (W = l.__digit(J)),
                      F.__setDigit(J + T, (1073741823 & (W << b)) | Z),
                      (Z = W >>> (30 - b));
                  if (O) F.__setDigit(I + T, Z);
                  else if (Z !== 0) throw new Error('implementation bug');
                }
                return F.__trim();
              },
            },
            {
              key: '__rightShiftByAbsolute',
              value: function (l, u) {
                var p = l.length,
                  T = l.sign,
                  b = w.__toShiftAmount(u);
                if (0 > b) return w.__rightShiftByMaximum(T);
                var I = 0 | (b / 30),
                  O = b % 30,
                  k = p - I;
                if (0 >= k) return w.__rightShiftByMaximum(T);
                var F = !1;
                if (T) {
                  if (l.__digit(I) & ((1 << O) - 1)) F = !0;
                  else
                    for (var N = 0; N < I; N++)
                      if (l.__digit(N) !== 0) {
                        F = !0;
                        break;
                      }
                }
                if (F && O === 0) {
                  var Z = l.__digit(p - 1);
                  !~Z && k++;
                }
                var U = new w(k, T);
                if (O === 0) {
                  U.__setDigit(k - 1, 0);
                  for (var W = I; W < p; W++) U.__setDigit(W - I, l.__digit(W));
                } else {
                  for (
                    var J, ee = l.__digit(I) >>> O, ue = p - I - 1, we = 0;
                    we < ue;
                    we++
                  )
                    (J = l.__digit(we + I + 1)),
                      U.__setDigit(we, (1073741823 & (J << (30 - O))) | ee),
                      (ee = J >>> O);
                  U.__setDigit(ue, ee);
                }
                return F && (U = w.__absoluteAddOne(U, !0, U)), U.__trim();
              },
            },
            {
              key: '__rightShiftByMaximum',
              value: function (l) {
                return l ? w.__oneDigit(1, !0) : w.__zero();
              },
            },
            {
              key: '__toShiftAmount',
              value: function (l) {
                if (1 < l.length) return -1;
                var u = l.__unsignedDigit(0);
                return u > w.__kMaxLengthBits ? -1 : u;
              },
            },
            {
              key: '__toPrimitive',
              value: function (l) {
                var u =
                  1 < arguments.length && arguments[1] !== void 0
                    ? arguments[1]
                    : 'default';
                if (r(l) !== 'object' || l.constructor === w) return l;
                if (typeof Symbol < 'u' && r(Symbol.toPrimitive) === 'symbol') {
                  var p = l[Symbol.toPrimitive];
                  if (p) {
                    var T = p(u);
                    if (r(T) !== 'object') return T;
                    throw new TypeError(
                      'Cannot convert object to primitive value'
                    );
                  }
                }
                var b = l.valueOf;
                if (b) {
                  var I = b.call(l);
                  if (r(I) !== 'object') return I;
                }
                var O = l.toString;
                if (O) {
                  var k = O.call(l);
                  if (r(k) !== 'object') return k;
                }
                throw new TypeError('Cannot convert object to primitive value');
              },
            },
            {
              key: '__toNumeric',
              value: function (l) {
                return w.__isBigInt(l) ? l : +l;
              },
            },
            {
              key: '__isBigInt',
              value: function (l) {
                return r(l) === 'object' && l !== null && l.constructor === w;
              },
            },
            {
              key: '__truncateToNBits',
              value: function (l, u) {
                for (
                  var p = 0 | ((l + 29) / 30),
                    T = new w(p, u.sign),
                    b = p - 1,
                    I = 0;
                  I < b;
                  I++
                )
                  T.__setDigit(I, u.__digit(I));
                var O = u.__digit(b);
                if (l % 30 != 0) {
                  var k = 32 - (l % 30);
                  O = (O << k) >>> k;
                }
                return T.__setDigit(b, O), T.__trim();
              },
            },
            {
              key: '__truncateAndSubFromPowerOfTwo',
              value: function (l, u, p) {
                for (
                  var T = Math.min,
                    b,
                    I = 0 | ((l + 29) / 30),
                    O = new w(I, p),
                    k = 0,
                    F = I - 1,
                    N = 0,
                    Z = T(F, u.length);
                  k < Z;
                  k++
                )
                  (b = 0 - u.__digit(k) - N),
                    (N = 1 & (b >>> 30)),
                    O.__setDigit(k, 1073741823 & b);
                for (; k < F; k++) O.__setDigit(k, 0 | (1073741823 & -N));
                var U,
                  W = F < u.length ? u.__digit(F) : 0,
                  J = l % 30;
                if (J === 0) (U = 0 - W - N), (U &= 1073741823);
                else {
                  var ee = 32 - J;
                  W = (W << ee) >>> ee;
                  var ue = 1 << (32 - ee);
                  (U = ue - W - N), (U &= ue - 1);
                }
                return O.__setDigit(F, U), O.__trim();
              },
            },
            {
              key: '__digitPow',
              value: function (l, u) {
                for (var p = 1; 0 < u; )
                  1 & u && (p *= l), (u >>>= 1), (l *= l);
                return p;
              },
            },
            {
              key: '__isOneDigitInt',
              value: function (l) {
                return (1073741823 & l) === l;
              },
            },
          ]
        ),
        w
      );
    })(g(Array));
    return (
      (Y.__kMaxLength = 33554432),
      (Y.__kMaxLengthBits = Y.__kMaxLength << 5),
      (Y.__kMaxBitsPerChar = [
        0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126,
        128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156,
        158, 159, 160, 162, 163, 165, 166,
      ]),
      (Y.__kBitsPerCharTableShift = 5),
      (Y.__kBitsPerCharTableMultiplier = 1 << Y.__kBitsPerCharTableShift),
      (Y.__kConversionChars = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
      ]),
      (Y.__kBitConversionBuffer = new ArrayBuffer(8)),
      (Y.__kBitConversionDouble = new Float64Array(Y.__kBitConversionBuffer)),
      (Y.__kBitConversionInts = new Int32Array(Y.__kBitConversionBuffer)),
      (Y.__clz30 = e
        ? function (M) {
            return e(M) - 2;
          }
        : function (M) {
            var $ = Math.LN2,
              A = Math.log;
            return M === 0 ? 30 : 0 | (29 - (0 | (A(M >>> 0) / $)));
          }),
      (Y.__imul =
        t ||
        function (M, $) {
          return 0 | (M * $);
        }),
      Y
    );
  });
});
var d = vs(Io()),
  Ti = {};
function Ar(t, e) {
  Object.defineProperty(t.prototype, Symbol.toStringTag, {
    value: e,
    writable: !1,
    enumerable: !1,
    configurable: !0,
  });
  for (let r of Object.getOwnPropertyNames(t)) {
    let i = Object.getOwnPropertyDescriptor(t, r);
    i.configurable &&
      i.enumerable &&
      ((i.enumerable = !1), Object.defineProperty(t, r, i));
  }
  for (let r of Object.getOwnPropertyNames(t.prototype)) {
    let i = Object.getOwnPropertyDescriptor(t.prototype, r);
    i.configurable &&
      i.enumerable &&
      ((i.enumerable = !1), Object.defineProperty(t.prototype, r, i));
  }
  Se(e, t), Se(`${e}.prototype`, t.prototype);
}
function Se(t, e) {
  let r = `%${t}%`;
  if (Ti[r] !== void 0) throw new Error(`intrinsic ${t} already exists`);
  Ti[r] = e;
}
function x(t) {
  return Ti[t];
}
var Do,
  Co,
  H = 'slot-epochNanoSeconds',
  Rr = 'slot-timezone-identifier',
  q = 'slot-year',
  z = 'slot-month',
  G = 'slot-day',
  te = 'slot-hour',
  ne = 'slot-minute',
  ie = 'slot-second',
  oe = 'slot-millisecond',
  ae = 'slot-microsecond',
  se = 'slot-nanosecond',
  S = 'slot-calendar',
  sa = 'slot-date-brand',
  la = 'slot-year-month-brand',
  ca = 'slot-month-day-brand',
  Ke = 'slot-cached-instant',
  pe = 'slot-time-zone',
  er = 'slot-years',
  Ue = 'slot-months',
  ur = 'slot-weeks',
  rr = 'slot-days',
  tr = 'slot-hours',
  nr = 'slot-minutes',
  ir = 'slot-seconds',
  or = 'slot-milliseconds',
  ar = 'slot-microseconds',
  sr = 'slot-nanoseconds',
  ke = 'slot-calendar-identifier',
  da = new WeakMap(),
  _i = Symbol.for('@@Temporal__GetSlots');
(Do = globalThis)[_i] ||
  (Do[_i] = function (e) {
    return da.get(e);
  });
var Xi = globalThis[_i],
  bi = Symbol.for('@@Temporal__CreateSlots');
(Co = globalThis)[bi] ||
  (Co[bi] = function (e) {
    da.set(e, Object.create(null));
  });
var xr = globalThis[bi];
function Le(t, ...e) {
  if (!t || typeof t != 'object') return !1;
  let r = Xi(t);
  return !!r && e.every(i => i in r);
}
function n(t, e) {
  let r = Xi(t)?.[e];
  if (r === void 0) throw new TypeError(`Missing internal slot ${e}`);
  return r;
}
function le(t, e, r) {
  let i = Xi(t);
  if (i === void 0)
    throw new TypeError('Missing slots for the given container');
  if (i[e]) throw new TypeError(`${e} already has set`);
  i[e] = r;
}
var ko =
    /\.[-A-Za-z_]|\.\.[-A-Za-z._]{1,12}|\.[-A-Za-z_][-A-Za-z._]{0,12}|[A-Za-z_][-A-Za-z._]{0,13}/,
  fn = new RegExp(
    '(?:' +
      [
        `(?:${ko.source})(?:\\/(?:${ko.source}))*`,
        'Etc/GMT(?:0|[-+]\\d{1,2})',
        'GMT[-+]?0',
        'EST5EDT',
        'CST6CDT',
        'MST7MDT',
        'PST8PDT',
        /(?:[+\u2212-][0-2][0-9](?::?[0-5][0-9](?::?[0-5][0-9](?:[.,]\d{1,9})?)?)?)/
          .source,
      ].join('|') +
      ')'
  ),
  ua = /(?:[+\u2212-]\d{6}|\d{4})/,
  Rn = /(?:0[1-9]|1[0-2])/,
  Ei = /(?:0[1-9]|[12]\d|3[01])/,
  Ts = new RegExp(
    `(${ua.source})(?:-(${Rn.source})-(${Ei.source})|(${Rn.source})(${Ei.source}))`
  ),
  ha =
    /(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/,
  ma =
    /([+\u2212-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/,
  fa = new RegExp(`([zZ])|${ma.source}?`),
  st = /\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g,
  _s = new RegExp(
    [
      `^${Ts.source}`,
      `(?:(?:T|\\s+)${ha.source}(?:${fa.source})?)?`,
      `(?:\\[!?(${fn.source})\\])?`,
      `((?:${st.source})*)$`,
    ].join(''),
    'i'
  ),
  bs = new RegExp(
    [
      `^T?${ha.source}`,
      `(?:${fa.source})?`,
      `(?:\\[!?${fn.source}\\])?`,
      `((?:${st.source})*)$`,
    ].join(''),
    'i'
  ),
  Es = new RegExp(
    `^(${ua.source})-?(${Rn.source})(?:\\[!?${fn.source}\\])?((?:${st.source})*)$`
  ),
  Is = new RegExp(
    `^(?:--)?(${Rn.source})-?(${Ei.source})(?:\\[!?${fn.source}\\])?((?:${st.source})*)$`
  ),
  fi = /(\d+)(?:[.,](\d{1,9}))?/,
  Ds = new RegExp(`(?:${fi.source}H)?(?:${fi.source}M)?(?:${fi.source}S)?`),
  Cs = new RegExp(
    `^([+\u2212-])?P${
      /(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source
    }(?:T(?!$)${Ds.source})?$`,
    'i'
  ),
  ks = Array.prototype.includes,
  ya = Array.prototype.push,
  ga = globalThis.Intl.DateTimeFormat,
  Ss = Math.min,
  Os = Math.max,
  _e = Math.abs,
  fr = Math.floor,
  Pt = Math.sign,
  ut = Math.trunc,
  Jn = Number.isNaN,
  lr = Number.isFinite,
  Bs = Number,
  yn = String,
  Ms = Number.MAX_SAFE_INTEGER,
  He = Object.create,
  Rs = Object.getOwnPropertyDescriptor,
  Vn = Reflect.apply,
  $s = Reflect.ownKeys,
  Re = d.default.BigInt(0),
  zt = d.default.BigInt(1),
  $r = d.default.BigInt(60),
  pa = d.default.BigInt(24),
  ye = d.default.BigInt(1e3),
  wr = d.default.BigInt(1e6),
  Yr = d.default.BigInt(1e9),
  Ys = d.default.BigInt(-1),
  wa = d.default.multiply(d.default.BigInt(3600), Yr),
  va = d.default.multiply($r, Yr),
  Nr = d.default.multiply(wa, pa),
  rn = d.default.multiply(d.default.BigInt(-86400), d.default.BigInt(1e17)),
  Nt = d.default.multiply(d.default.BigInt(86400), d.default.BigInt(1e17)),
  $n = -271821,
  Yn = 275760,
  St = d.default.multiply(d.default.BigInt(-388152), d.default.BigInt(1e13)),
  Ps = d.default.multiply(Nr, d.default.BigInt(3660)),
  Ta = d.default.multiply(Nr, d.default.BigInt(366)),
  _a = d.default.multiply(Nr, d.default.BigInt(14)),
  Ns = [
    'iso8601',
    'hebrew',
    'islamic',
    'islamic-umalqura',
    'islamic-tbla',
    'islamic-civil',
    'islamic-rgsa',
    'islamicc',
    'persian',
    'ethiopic',
    'ethioaa',
    'coptic',
    'chinese',
    'dangi',
    'roc',
    'indian',
    'buddhist',
    'japanese',
    'gregory',
  ];
function br(t) {
  return d.default.equal(t, Re);
}
function ge(t, e) {
  let r = t[e];
  if (r !== void 0) return r;
}
function Q(t, e, r) {
  let i = arguments.length > 2 ? r : [];
  return Vn(t, e, i);
}
function be(t) {
  return (typeof t == 'object' && t !== null) || typeof t == 'function';
}
function Ft(t) {
  if (typeof t == 'bigint')
    throw new TypeError('Cannot convert BigInt to number');
  return Bs(t);
}
function Pe(t) {
  let e = Ft(t);
  if (Jn(e) || e === 0) return 0;
  if (!lr(e)) return e;
  let r = fr(_e(e));
  return r === 0 ? 0 : Pt(e) * r;
}
function Tr(t) {
  if (typeof t != 'number' || Jn(t) || !lr(t)) return !1;
  let e = _e(t);
  return fr(e) === e;
}
function dr(t) {
  if (typeof t == 'symbol')
    throw new TypeError('Cannot convert a Symbol value to a String');
  return yn(t);
}
function me(t) {
  let e = Ft(t);
  if (e === 0) return 0;
  if (Jn(e) || !lr(e)) throw new RangeError('invalid number value');
  let r = ut(e);
  return r === 0 ? 0 : r;
}
function So(t, e) {
  let r = me(t);
  if (r <= 0)
    throw e !== void 0
      ? new RangeError(`property '${e}' cannot be a a number less than one`)
      : new RangeError(
          'Cannot convert a number less than one to a positive integer'
        );
  return r;
}
function xe(t) {
  let e = Ft(t);
  if (!lr(e)) throw new RangeError('infinity is out of range');
  if (!Tr(e)) throw new RangeError(`unsupported fractional value ${t}`);
  return e === 0 ? 0 : e;
}
function $e(t, e) {
  return {
    quotient: d.default.divide(t, e),
    remainder: d.default.remainder(t, e),
  };
}
function Pn(t) {
  return d.default.lessThan(t, Re);
}
function Oo(t) {
  return br(t) ? 0 : Pn(t) ? -1 : 1;
}
function kr(t) {
  return d.default.lessThan(t, Re) ? d.default.multiply(t, Ys) : t;
}
var Bo = new Map([
    ['year', me],
    ['month', So],
    ['monthCode', dr],
    ['day', So],
    ['hour', me],
    ['minute', me],
    ['second', me],
    ['millisecond', me],
    ['microsecond', me],
    ['nanosecond', me],
    ['years', xe],
    ['months', xe],
    ['weeks', xe],
    ['days', xe],
    ['hours', xe],
    ['minutes', xe],
    ['seconds', xe],
    ['milliseconds', xe],
    ['microseconds', xe],
    ['nanoseconds', xe],
    ['era', dr],
    ['eraYear', Pe],
    ['offset', dr],
  ]),
  Fs = new Map([
    ['hour', 0],
    ['minute', 0],
    ['second', 0],
    ['millisecond', 0],
    ['microsecond', 0],
    ['nanosecond', 0],
  ]),
  gn = [
    ['years', 'year', 'date'],
    ['months', 'month', 'date'],
    ['weeks', 'week', 'date'],
    ['days', 'day', 'date'],
    ['hours', 'hour', 'time'],
    ['minutes', 'minute', 'time'],
    ['seconds', 'second', 'time'],
    ['milliseconds', 'millisecond', 'time'],
    ['microseconds', 'microsecond', 'time'],
    ['nanoseconds', 'nanosecond', 'time'],
  ],
  Nn = new Map(gn.map(t => [t[0], t[1]])),
  js = new Map(gn.map(([t, e]) => [e, t])),
  Mo = gn.map(([, t]) => t),
  Ro = Array.from(Nn.keys()).sort(),
  $o = new Map();
function ba(t) {
  let e = $o.get(t);
  return (
    e === void 0 &&
      ((e = new ga('en-us', {
        timeZone: yn(t),
        hour12: !1,
        era: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })),
      $o.set(t, e)),
    e
  );
}
function Yo(t) {
  if (t == null) throw new TypeError(`Expected object not ${t}`);
  return Object(t);
}
function Ot(t, e, r, i) {
  if (e == null) return;
  let o = $s(e);
  for (let a of o)
    if (
      !r.some(s => Object.is(s, a)) &&
      Object.prototype.propertyIsEnumerable.call(e, a)
    ) {
      let s = e[a];
      if (i && i.some(c => Object.is(c, s))) continue;
      t[a] = s;
    }
}
function je(t) {
  return Le(t, H) && !Le(t, pe, S);
}
function _r(t) {
  return Le(t, Rr);
}
function Oe(t) {
  return Le(t, ke);
}
function Be(t) {
  return Le(t, er, Ue, rr, tr, nr, ir, or, ar, sr);
}
function de(t) {
  return Le(t, sa);
}
function Me(t) {
  return Le(t, te, ne, ie, oe, ae, se) && !Le(t, q, z, G);
}
function re(t) {
  return Le(t, q, z, G, te, ne, ie, oe, ae, se);
}
function fe(t) {
  return Le(t, la);
}
function Ae(t) {
  return Le(t, ca);
}
function X(t) {
  return Le(t, H, pe, S);
}
function Wt(t) {
  if (Le(t, S) || Le(t, pe))
    throw new TypeError(
      'with() does not support a calendar or timeZone property'
    );
  if (Me(t))
    throw new TypeError(
      'with() does not accept Temporal.PlainTime, use withPlainTime() instead'
    );
  if (t.calendar !== void 0)
    throw new TypeError('with() does not support a calendar property');
  if (t.timeZone !== void 0)
    throw new TypeError('with() does not support a timeZone property');
}
function As(t) {
  let {
    ianaName: e,
    offset: r,
    z: i,
  } = (function (a) {
    if (new RegExp(`^${fn.source}$`, 'i').test(a)) return {ianaName: a};
    try {
      let s = Lr(a);
      if (s.z || s.offset || s.ianaName) return s;
    } catch {}
    throw new RangeError(`Invalid time zone: ${a}`);
  })(t);
  return e ? so(e) : i ? 'UTC' : si(rt(r));
}
function Ki(t, e) {
  return e === 'never' ? '' : Qi(Ge(t), e);
}
function Qi(t, e) {
  return e === 'never' || (e === 'auto' && t === 'iso8601')
    ? ''
    : `[${e === 'critical' ? '!' : ''}u-ca=${t}]`;
}
function Lr(t) {
  let e = _s.exec(t);
  if (!e) throw new RangeError(`invalid ISO 8601 string: ${t}`);
  let r = e[1];
  if ((r[0] === '\u2212' && (r = `-${r.slice(1)}`), r === '-000000'))
    throw new RangeError(`invalid ISO 8601 string: ${t}`);
  let i = Pe(r),
    o = Pe(e[2] || e[4]),
    a = Pe(e[3] || e[5]),
    s = Pe(e[6]),
    c = e[6] !== void 0,
    h = Pe(e[7] || e[10]),
    f = Pe(e[8] || e[11]);
  f === 60 && (f = 59);
  let m = (e[9] || e[12]) + '000000000',
    y = Pe(m.slice(0, 3)),
    g = Pe(m.slice(3, 6)),
    v = Pe(m.slice(6, 9)),
    _,
    E = !1;
  if (e[13]) (_ = void 0), (E = !0);
  else if (e[14] && e[15]) {
    let R = e[14] === '-' || e[14] === '\u2212' ? '-' : '+',
      P = e[15] || '00',
      L = e[16] || '00',
      j = e[17] || '00',
      Y = e[18] || '0';
    if (((_ = `${R}${P}:${L}`), +Y)) {
      for (; Y.endsWith('0'); ) Y = Y.slice(0, -1);
      _ += `:${j}.${Y}`;
    } else +j && (_ += `:${j}`);
    _ === '-00:00' && (_ = '+00:00');
  }
  let D = e[19],
    C = e[20],
    B;
  for (let [, R, P, L] of C.matchAll(st))
    if (P === 'u-ca') B === void 0 && (B = L);
    else if (R === '!')
      throw new RangeError(`Unrecognized annotation: !${P}=${L}`);
  return (
    uo(i, o, a, s, h, f, y, g, v),
    {
      year: i,
      month: o,
      day: a,
      hasTime: c,
      hour: s,
      minute: h,
      second: f,
      millisecond: y,
      microsecond: g,
      nanosecond: v,
      ianaName: D,
      offset: _,
      z: E,
      calendar: B,
    }
  );
}
function Hi(t) {
  let e = Es.exec(t),
    r,
    i,
    o,
    a;
  if (e) {
    let s = e[1];
    if ((s[0] === '\u2212' && (s = `-${s.slice(1)}`), s === '-000000'))
      throw new RangeError(`invalid ISO 8601 string: ${t}`);
    (r = Pe(s)), (i = Pe(e[2]));
    let c = e[3];
    for (let [, h, f, m] of c.matchAll(st))
      if (f === 'u-ca') o === void 0 && (o = m);
      else if (h === '!')
        throw new RangeError(`Unrecognized annotation: !${f}=${m}`);
    if (o !== void 0 && o !== 'iso8601')
      throw new RangeError(
        'YYYY-MM format is only valid with iso8601 calendar'
      );
  } else {
    let s;
    if ((({year: r, month: i, calendar: o, day: a, z: s} = Lr(t)), s))
      throw new RangeError('Z designator not supported for PlainYearMonth');
  }
  return {year: r, month: i, calendar: o, referenceISODay: a};
}
function eo(t) {
  let e = Is.exec(t),
    r,
    i,
    o,
    a;
  if (e) {
    (r = Pe(e[1])), (i = Pe(e[2]));
    let s = e[3];
    for (let [, c, h, f] of s.matchAll(st))
      if (h === 'u-ca') o === void 0 && (o = f);
      else if (c === '!')
        throw new RangeError(`Unrecognized annotation: !${h}=${f}`);
    if (o !== void 0 && o !== 'iso8601')
      throw new RangeError('MM-DD format is only valid with iso8601 calendar');
  } else {
    let s;
    if ((({month: r, day: i, calendar: o, year: a, z: s} = Lr(t)), s))
      throw new RangeError('Z designator not supported for PlainMonthDay');
  }
  return {month: r, day: i, calendar: o, referenceISOYear: a};
}
function xs(t) {
  let {
    year: e,
    month: r,
    day: i,
    hour: o,
    minute: a,
    second: s,
    millisecond: c,
    microsecond: h,
    nanosecond: f,
    offset: m,
    z: y,
  } = (function (E) {
    let D = Lr(E);
    if (!D.z && !D.offset)
      throw new RangeError('Temporal.Instant requires a time zone offset');
    return D;
  })(t);
  if (!y && !m)
    throw new RangeError('Temporal.Instant requires a time zone offset');
  let g = y ? 0 : rt(m);
  ({
    year: e,
    month: r,
    day: i,
    hour: o,
    minute: a,
    second: s,
    millisecond: c,
    microsecond: h,
    nanosecond: f,
  } = lo(e, r, i, o, a, s, c, h, f - g));
  let v = tt(e, r, i, o, a, s, c, h, f);
  if (v === null) throw new RangeError('DateTime outside of supported range');
  return v;
}
function Fn(t, e, r, i) {
  let o = t,
    a = e,
    s = r;
  switch (i) {
    case 'reject':
      Fr(o, a, s);
      break;
    case 'constrain':
      ({year: o, month: a, day: s} = Aa(o, a, s));
  }
  return {year: o, month: a, day: s};
}
function Xn(t, e, r, i, o, a, s) {
  let c = t,
    h = e,
    f = r,
    m = i,
    y = o,
    g = a;
  switch (s) {
    case 'reject':
      ci(c, h, f, m, y, g);
      break;
    case 'constrain':
      ({
        hour: c,
        minute: h,
        second: f,
        millisecond: m,
        microsecond: y,
        nanosecond: g,
      } = (function (_, E, D, C, B, R) {
        let P = mr(_, 0, 23),
          L = mr(E, 0, 59),
          j = mr(D, 0, 59),
          Y = mr(C, 0, 999),
          M = mr(B, 0, 999),
          $ = mr(R, 0, 999);
        return {
          hour: P,
          minute: L,
          second: j,
          millisecond: Y,
          microsecond: M,
          nanosecond: $,
        };
      })(c, h, f, m, y, g));
  }
  return {
    hour: c,
    minute: h,
    second: f,
    millisecond: m,
    microsecond: y,
    nanosecond: g,
  };
}
function bt(t) {
  if (!be(t))
    return (function (_) {
      let E = Cs.exec(_);
      if (!E) throw new RangeError(`invalid duration: ${_}`);
      if (E.slice(2).every(T => T === void 0))
        throw new RangeError(`invalid duration: ${_}`);
      let D = E[1] === '-' || E[1] === '\u2212' ? -1 : 1,
        C = E[2] === void 0 ? 0 : me(E[2]) * D,
        B = E[3] === void 0 ? 0 : me(E[3]) * D,
        R = E[4] === void 0 ? 0 : me(E[4]) * D,
        P = E[5] === void 0 ? 0 : me(E[5]) * D,
        L = E[6] === void 0 ? 0 : me(E[6]) * D,
        j = E[7],
        Y = E[8],
        M = E[9],
        $ = E[10],
        A = E[11],
        K = 0,
        w = 0,
        V = 0;
      if (j !== void 0) {
        if (Y ?? M ?? $ ?? A)
          throw new RangeError('only the smallest unit can be fractional');
        V = 3600 * Pe((j + '000000000').slice(0, 9)) * D;
      } else if (((K = Y === void 0 ? 0 : me(Y) * D), M !== void 0)) {
        if ($ ?? A)
          throw new RangeError('only the smallest unit can be fractional');
        V = 60 * Pe((M + '000000000').slice(0, 9)) * D;
      } else
        (w = $ === void 0 ? 0 : me($) * D),
          A !== void 0 && (V = Pe((A + '000000000').slice(0, 9)) * D);
      let l = V % 1e3,
        u = ut(V / 1e3) % 1e3,
        p = ut(V / 1e6) % 1e3;
      return (
        (w += ut(V / 1e9) % 60),
        (K += ut(V / 6e10)),
        Zn(C, B, R, P, L, K, w, p, u, l),
        {
          years: C,
          months: B,
          weeks: R,
          days: P,
          hours: L,
          minutes: K,
          seconds: w,
          milliseconds: p,
          microseconds: u,
          nanoseconds: l,
        }
      );
    })(dr(t));
  if (Be(t))
    return {
      years: n(t, er),
      months: n(t, Ue),
      weeks: n(t, ur),
      days: n(t, rr),
      hours: n(t, tr),
      minutes: n(t, nr),
      seconds: n(t, ir),
      milliseconds: n(t, or),
      microseconds: n(t, ar),
      nanoseconds: n(t, sr),
    };
  let e = {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      microseconds: 0,
      nanoseconds: 0,
    },
    r = (function (_) {
      if (!be(_)) throw new TypeError('invalid duration-like');
      let E = {
          years: void 0,
          months: void 0,
          weeks: void 0,
          days: void 0,
          hours: void 0,
          minutes: void 0,
          seconds: void 0,
          milliseconds: void 0,
          microseconds: void 0,
          nanoseconds: void 0,
        },
        D = !1;
      for (let C of Ro) {
        let B = _[C];
        B !== void 0 && ((D = !0), (E[C] = xe(B)));
      }
      if (!D) throw new TypeError('invalid duration-like');
      return E;
    })(t);
  for (let v of Ro) {
    let _ = r[v];
    _ !== void 0 && (e[v] = _);
  }
  let {
    years: i,
    months: o,
    weeks: a,
    days: s,
    hours: c,
    minutes: h,
    seconds: f,
    milliseconds: m,
    microseconds: y,
    nanoseconds: g,
  } = e;
  return (
    Zn(i, o, a, s, c, h, f, m, y, g),
    {
      years: i,
      months: o,
      weeks: a,
      days: s,
      hours: c,
      minutes: h,
      seconds: f,
      milliseconds: m,
      microseconds: y,
      nanoseconds: g,
    }
  );
}
function Ye(t) {
  return t === void 0
    ? 'constrain'
    : it(t, 'overflow', ['constrain', 'reject'], 'constrain');
}
function jt(t) {
  return t === void 0
    ? 'compatible'
    : it(
        t,
        'disambiguation',
        ['compatible', 'earlier', 'later', 'reject'],
        'compatible'
      );
}
function Or(t, e) {
  return it(
    t,
    'roundingMode',
    [
      'ceil',
      'floor',
      'expand',
      'trunc',
      'halfCeil',
      'halfFloor',
      'halfExpand',
      'halfTrunc',
      'halfEven',
    ],
    e
  );
}
function jn(t, e) {
  return t === void 0
    ? e
    : it(t, 'offset', ['prefer', 'use', 'ignore', 'reject'], e);
}
function pn(t) {
  return it(t, 'calendarName', ['auto', 'always', 'never', 'critical'], 'auto');
}
function Gt(t) {
  let e = t.roundingIncrement;
  if (e === void 0) return 1;
  if (((e = Ft(e)), !lr(e)))
    throw new RangeError('roundingIncrement must be finite');
  let r = ut(e);
  if (r < 1 || r > 1e9)
    throw new RangeError(
      `roundingIncrement must be at least 1 and at most 1e9, not ${e}`
    );
  return r;
}
function Jt(t, e, r) {
  let i = r ? e : e - 1;
  if (t > i)
    throw new RangeError(
      `roundingIncrement must be at least 1 and less than ${i}, not ${t}`
    );
  if (e % t != 0)
    throw new RangeError(`Rounding increment must divide evenly into ${e}`);
}
function wn(t) {
  let e = t.fractionalSecondDigits;
  if (e === void 0) return 'auto';
  if (typeof e != 'number') {
    if (dr(e) !== 'auto')
      throw new RangeError(
        `fractionalSecondDigits must be 'auto' or 0 through 9, not ${e}`
      );
    return 'auto';
  }
  let r = fr(e);
  if (!lr(r) || r < 0 || r > 9)
    throw new RangeError(
      `fractionalSecondDigits must be 'auto' or 0 through 9, not ${e}`
    );
  return r;
}
function vn(t, e) {
  switch (t) {
    case 'minute':
      return {precision: 'minute', unit: 'minute', increment: 1};
    case 'second':
      return {precision: 0, unit: 'second', increment: 1};
    case 'millisecond':
      return {precision: 3, unit: 'millisecond', increment: 1};
    case 'microsecond':
      return {precision: 6, unit: 'microsecond', increment: 1};
    case 'nanosecond':
      return {precision: 9, unit: 'nanosecond', increment: 1};
  }
  switch (e) {
    case 'auto':
      return {precision: e, unit: 'nanosecond', increment: 1};
    case 0:
      return {precision: e, unit: 'second', increment: 1};
    case 1:
    case 2:
    case 3:
      return {precision: e, unit: 'millisecond', increment: 10 ** (3 - e)};
    case 4:
    case 5:
    case 6:
      return {precision: e, unit: 'microsecond', increment: 10 ** (6 - e)};
    case 7:
    case 8:
    case 9:
      return {precision: e, unit: 'nanosecond', increment: 10 ** (9 - e)};
    default:
      throw new RangeError(
        `fractionalSecondDigits must be 'auto' or 0 through 9, not ${e}`
      );
  }
}
var gt = Symbol('~required~');
function yr(t, e, r, i, o = []) {
  let a = [];
  for (let [, f, m] of gn) (r !== 'datetime' && r !== m) || a.push(f);
  a.push(...o);
  let s = i;
  s === gt ? (s = void 0) : s !== void 0 && a.push(s);
  let c = [...a];
  for (let f of a) {
    let m = js.get(f);
    m !== void 0 && c.push(m);
  }
  let h = it(t, e, c, s);
  if (h === void 0 && i === gt) throw new RangeError(`${e} is required`);
  return Nn.has(h) ? Nn.get(h) : h;
}
function Sn(t) {
  let e = t.relativeTo;
  if (e === void 0) return e;
  let r,
    i,
    o,
    a,
    s,
    c,
    h,
    f,
    m,
    y,
    g,
    v,
    _ = 'option',
    E = !1;
  if (be(e)) {
    if (X(e) || de(e)) return e;
    if (re(e)) return xt(e);
    y = En(e);
    let D = Ne(y, [
      'day',
      'hour',
      'microsecond',
      'millisecond',
      'minute',
      'month',
      'monthCode',
      'nanosecond',
      'second',
      'year',
    ]);
    D.push('timeZone', 'offset');
    let C = ce(e, D, []),
      B = He(null);
    (B.overflow = 'constrain'),
      ({
        year: r,
        month: i,
        day: o,
        hour: a,
        minute: s,
        second: c,
        millisecond: h,
        microsecond: f,
        nanosecond: m,
      } = Tn(y, C, B)),
      (v = C.offset),
      v === void 0 && (_ = 'wall'),
      (g = C.timeZone),
      g !== void 0 && (g = Qe(g));
  } else {
    let D, C;
    if (
      (({
        year: r,
        month: i,
        day: o,
        hour: a,
        minute: s,
        second: c,
        millisecond: h,
        microsecond: f,
        nanosecond: m,
        calendar: y,
        ianaName: D,
        offset: v,
        z: C,
      } = Lr(dr(e))),
      D)
    )
      (g = Qe(D)), C ? (_ = 'exact') : v || (_ = 'wall'), (E = !0);
    else if (C)
      throw new RangeError(
        'Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone'
      );
    if ((y || (y = 'iso8601'), !Vr(y)))
      throw new RangeError(`invalid calendar identifier ${y}`);
    y = jr(y);
  }
  return g === void 0
    ? Ir(r, i, o, y)
    : qe(
        xn(
          r,
          i,
          o,
          a,
          s,
          c,
          h,
          f,
          m,
          _,
          _ === 'option' ? rt(v) : 0,
          g,
          'compatible',
          'reject',
          E
        ),
        g,
        y
      );
}
function Ii(t, e, r, i, o, a, s, c, h, f) {
  for (let [m, y] of [
    ['years', t],
    ['months', e],
    ['weeks', r],
    ['days', i],
    ['hours', o],
    ['minutes', a],
    ['seconds', s],
    ['milliseconds', c],
    ['microseconds', h],
    ['nanoseconds', f],
  ])
    if (y !== 0) return Nn.get(m);
  return 'nanosecond';
}
function pt(t, e) {
  return Mo.indexOf(t) > Mo.indexOf(e) ? e : t;
}
function ce(
  t,
  e,
  r,
  {emptySourceErrorMessage: i} = {
    emptySourceErrorMessage: 'no supported properties found',
  }
) {
  let o = He(null),
    a = !1;
  e.sort();
  for (let s of e) {
    let c = t[s];
    if (c !== void 0) (a = !0), Bo.has(s) && (c = Bo.get(s)(c)), (o[s] = c);
    else if (r !== 'partial') {
      if (ks.call(r, s))
        throw new TypeError(`required property '${s}' missing or undefined`);
      (c = Fs.get(s)), (o[s] = c);
    }
  }
  if (r === 'partial' && !a) throw new TypeError(i);
  return o;
}
function An(t, e = 'complete') {
  let r = [
      'hour',
      'microsecond',
      'millisecond',
      'minute',
      'nanosecond',
      'second',
    ],
    i = ce(t, r, 'partial', {emptySourceErrorMessage: 'invalid time-like'}),
    o = {};
  for (let a of r) {
    let s = Rs(i, a);
    s !== void 0 ? (o[a] = s.value) : e === 'complete' && (o[a] = 0);
  }
  return o;
}
function ve(t, e) {
  let r = t;
  if (be(r)) {
    if (de(r)) return r;
    if ((X(r) && (Ye(e), (r = vr(n(r, pe), n(r, Ke), n(r, S)))), re(r)))
      return Ye(e), Ir(n(r, q), n(r, z), n(r, G), n(r, S));
    let h = En(r);
    return Gr(h, ce(r, Ne(h, ['day', 'month', 'monthCode', 'year']), []), e);
  }
  Ye(e);
  let {
    year: i,
    month: o,
    day: a,
    calendar: s,
    z: c,
  } = (function (f) {
    return Lr(f);
  })(dr(r));
  if (c) throw new RangeError('Z designator not supported for PlainDate');
  if ((s || (s = 'iso8601'), !Vr(s)))
    throw new RangeError(`invalid calendar identifier ${s}`);
  return (s = jr(s)), Ir(i, o, a, s);
}
function Tn(t, e, r) {
  let {
      hour: i,
      minute: o,
      second: a,
      millisecond: s,
      microsecond: c,
      nanosecond: h,
    } = An(e),
    f = Ye(r),
    m = Gr(t, e, r),
    y = n(m, q),
    g = n(m, z),
    v = n(m, G);
  return (
    ({
      hour: i,
      minute: o,
      second: a,
      millisecond: s,
      microsecond: c,
      nanosecond: h,
    } = Xn(i, o, a, s, c, h, f)),
    {
      year: y,
      month: g,
      day: v,
      hour: i,
      minute: o,
      second: a,
      millisecond: s,
      microsecond: c,
      nanosecond: h,
    }
  );
}
function ht(t, e) {
  let r, i, o, a, s, c, h, f, m, y;
  if (be(t)) {
    if (re(t)) return t;
    if (X(t)) return Ye(e), vr(n(t, pe), n(t, Ke), n(t, S));
    if (de(t))
      return Ye(e), hr(n(t, q), n(t, z), n(t, G), 0, 0, 0, 0, 0, 0, n(t, S));
    y = En(t);
    let g = ce(
      t,
      Ne(y, [
        'day',
        'hour',
        'microsecond',
        'millisecond',
        'minute',
        'month',
        'monthCode',
        'nanosecond',
        'second',
        'year',
      ]),
      []
    );
    ({
      year: r,
      month: i,
      day: o,
      hour: a,
      minute: s,
      second: c,
      millisecond: h,
      microsecond: f,
      nanosecond: m,
    } = Tn(y, g, e));
  } else {
    let g;
    if (
      (Ye(e),
      ({
        year: r,
        month: i,
        day: o,
        hour: a,
        minute: s,
        second: c,
        millisecond: h,
        microsecond: f,
        nanosecond: m,
        calendar: y,
        z: g,
      } = (function (_) {
        return Lr(_);
      })(dr(t))),
      g)
    )
      throw new RangeError('Z designator not supported for PlainDateTime');
    if ((uo(r, i, o, a, s, c, h, f, m), y || (y = 'iso8601'), !Vr(y)))
      throw new RangeError(`invalid calendar identifier ${y}`);
    y = jr(y);
  }
  return hr(r, i, o, a, s, c, h, f, m, y);
}
function Bt(t) {
  if (Be(t)) return t;
  let {
    years: e,
    months: r,
    weeks: i,
    days: o,
    hours: a,
    minutes: s,
    seconds: c,
    milliseconds: h,
    microseconds: f,
    nanoseconds: m,
  } = bt(t);
  return new (x('%Temporal.Duration%'))(e, r, i, o, a, s, c, h, f, m);
}
function Sr(t) {
  if (je(t)) return t;
  if (X(t)) return new (x('%Temporal.Instant%'))(n(t, H));
  let e = xs(dr(t));
  return new (x('%Temporal.Instant%'))(e);
}
function Po(t, e) {
  let r = t;
  if (be(r)) {
    if (Ae(r)) return r;
    let c, h;
    if (Le(r, S)) (c = n(r, S)), (h = !1);
    else {
      let m = r.calendar;
      (h = m === void 0), m === void 0 && (m = 'iso8601'), (c = gr(m));
    }
    let f = ce(r, Ne(c, ['day', 'month', 'monthCode', 'year']), []);
    return (
      h &&
        f.month !== void 0 &&
        f.monthCode === void 0 &&
        f.year === void 0 &&
        (f.year = 1972),
      At(c, f, e)
    );
  }
  Ye(e);
  let {month: i, day: o, referenceISOYear: a, calendar: s} = eo(dr(r));
  if ((s === void 0 && (s = 'iso8601'), !Vr(s)))
    throw new RangeError(`invalid calendar identifier ${s}`);
  return (
    (s = jr(s)),
    a === void 0 ? (Fr(1972, i, o), tn(i, o, s)) : At(s, tn(i, o, s, a))
  );
}
function Zr(t, e = 'constrain') {
  let r,
    i,
    o,
    a,
    s,
    c,
    h = t;
  if (be(h)) {
    if (Me(h)) return h;
    if ((X(h) && (h = vr(n(h, pe), n(h, Ke), n(h, S))), re(h)))
      return new (x('%Temporal.PlainTime%'))(
        n(h, te),
        n(h, ne),
        n(h, ie),
        n(h, oe),
        n(h, ae),
        n(h, se)
      );
    ({
      hour: r,
      minute: i,
      second: o,
      millisecond: a,
      microsecond: s,
      nanosecond: c,
    } = An(h)),
      ({
        hour: r,
        minute: i,
        second: o,
        millisecond: a,
        microsecond: s,
        nanosecond: c,
      } = Xn(r, i, o, a, s, c, e));
  } else
    ({
      hour: r,
      minute: i,
      second: o,
      millisecond: a,
      microsecond: s,
      nanosecond: c,
    } = (function (m) {
      let y = bs.exec(m),
        g,
        v,
        _,
        E,
        D,
        C,
        B;
      if (y) {
        (g = Pe(y[1])),
          (v = Pe(y[2] || y[5])),
          (_ = Pe(y[3] || y[6])),
          _ === 60 && (_ = 59);
        let R = (y[4] || y[7]) + '000000000';
        (E = Pe(R.slice(0, 3))),
          (D = Pe(R.slice(3, 6))),
          (C = Pe(R.slice(6, 9))),
          (B = y[14]);
        for (let [, P, L, j] of B.matchAll(st))
          if (L !== 'u-ca' && P === '!')
            throw new RangeError(`Unrecognized annotation: !${L}=${j}`);
        if (y[8])
          throw new RangeError('Z designator not supported for PlainTime');
      } else {
        let R, P;
        if (
          (({
            hasTime: P,
            hour: g,
            minute: v,
            second: _,
            millisecond: E,
            microsecond: D,
            nanosecond: C,
            z: R,
          } = Lr(m)),
          !P)
        )
          throw new RangeError(`time is missing in string: ${m}`);
        if (R) throw new RangeError('Z designator not supported for PlainTime');
      }
      if (/[tT ][0-9][0-9]/.test(m))
        return {
          hour: g,
          minute: v,
          second: _,
          millisecond: E,
          microsecond: D,
          nanosecond: C,
        };
      try {
        let {month: R, day: P} = eo(m);
        Fr(1972, R, P);
      } catch {
        try {
          let {year: R, month: P} = Hi(m);
          Fr(R, P, 1);
        } catch {
          return {
            hour: g,
            minute: v,
            second: _,
            millisecond: E,
            microsecond: D,
            nanosecond: C,
          };
        }
      }
      throw new RangeError(
        `invalid ISO 8601 time-only string ${m}; may need a T prefix`
      );
    })(dr(h))),
      ci(r, i, o, a, s, c);
  return new (x('%Temporal.PlainTime%'))(r, i, o, a, s, c);
}
function Kt(t, e) {
  if (be(t)) {
    if (fe(t)) return t;
    let s = En(t);
    return vt(s, ce(t, Ne(s, ['month', 'monthCode', 'year']), []), e);
  }
  Ye(e);
  let {year: r, month: i, referenceISODay: o, calendar: a} = Hi(dr(t));
  if ((a === void 0 && (a = 'iso8601'), !Vr(a)))
    throw new RangeError(`invalid calendar identifier ${a}`);
  return (
    (a = jr(a)),
    o === void 0 ? (Fr(r, i, 1), nn(r, i, a)) : vt(a, nn(r, i, a, o))
  );
}
function xn(t, e, r, i, o, a, s, c, h, f, m, y, g, v, _) {
  let E = new (x('%Temporal.PlainDateTime%'))(t, e, r, i, o, a, s, c, h);
  if (f === 'wall' || v === 'ignore') return n(cr(y, E, g), H);
  if (f === 'exact' || v === 'use') {
    let C = tt(t, e, r, i, o, a, s, c, h);
    if (C === null)
      throw new RangeError('ZonedDateTime outside of supported range');
    return d.default.subtract(C, d.default.BigInt(m));
  }
  let D = Ln(y, E);
  for (let C of D) {
    let B = Br(y, C),
      R = d.default.toNumber(pr(d.default.BigInt(B), va, 'halfExpand'));
    if (B === m || (_ && R === m)) return n(C, H);
  }
  if (v === 'reject') {
    let C = si(m),
      B = _r(y) ? n(y, Rr) : 'time zone';
    throw new RangeError(`Offset ${C} is invalid for ${E.toString()} in ${B}`);
  }
  return n(Ma(D, y, E, g), H);
}
function Qt(t, e) {
  let r,
    i,
    o,
    a,
    s,
    c,
    h,
    f,
    m,
    y,
    g,
    v,
    _,
    E,
    D = !1,
    C = 'option';
  if (be(t)) {
    if (X(t)) return t;
    v = En(t);
    let R = Ne(v, [
      'day',
      'hour',
      'microsecond',
      'millisecond',
      'minute',
      'month',
      'monthCode',
      'nanosecond',
      'second',
      'year',
    ]);
    R.push('timeZone', 'offset');
    let P = ce(t, R, ['timeZone']);
    (y = Qe(P.timeZone)),
      (g = P.offset),
      g === void 0 && (C = 'wall'),
      (_ = jt(e)),
      (E = jn(e, 'reject')),
      ({
        year: r,
        month: i,
        day: o,
        hour: a,
        minute: s,
        second: c,
        millisecond: h,
        microsecond: f,
        nanosecond: m,
      } = Tn(v, P, e));
  } else {
    let R, P;
    if (
      (({
        year: r,
        month: i,
        day: o,
        hour: a,
        minute: s,
        second: c,
        millisecond: h,
        microsecond: f,
        nanosecond: m,
        ianaName: R,
        offset: g,
        z: P,
        calendar: v,
      } = (function (j) {
        let Y = Lr(j);
        if (!Y.ianaName)
          throw new RangeError(
            'Temporal.ZonedDateTime requires a time zone ID in brackets'
          );
        return Y;
      })(dr(t))),
      (y = Qe(R)),
      P ? (C = 'exact') : g || (C = 'wall'),
      v || (v = 'iso8601'),
      !Vr(v))
    )
      throw new RangeError(`invalid calendar identifier ${v}`);
    (v = jr(v)), (D = !0), (_ = jt(e)), (E = jn(e, 'reject')), Ye(e);
  }
  let B = 0;
  return (
    C === 'option' && (B = rt(g)),
    qe(xn(r, i, o, a, s, c, h, f, m, C, B, y, _, E, D), y, v)
  );
}
function Ea(t, e, r, i, o) {
  Fr(e, r, i),
    xa(e, r, i),
    xr(t),
    le(t, q, e),
    le(t, z, r),
    le(t, G, i),
    le(t, S, o),
    le(t, sa, !0);
}
function Ir(t, e, r, i = 'iso8601') {
  let o = x('%Temporal.PlainDate%'),
    a = He(o.prototype);
  return Ea(a, t, e, r, i), a;
}
function Ia(t, e, r, i, o, a, s, c, h, f, m) {
  uo(e, r, i, o, a, s, c, h, f),
    La(e, r, i, o, a, s, c, h, f),
    xr(t),
    le(t, q, e),
    le(t, z, r),
    le(t, G, i),
    le(t, te, o),
    le(t, ne, a),
    le(t, ie, s),
    le(t, oe, c),
    le(t, ae, h),
    le(t, se, f),
    le(t, S, m);
}
function hr(t, e, r, i, o, a, s, c, h, f = 'iso8601') {
  let m = x('%Temporal.PlainDateTime%'),
    y = He(m.prototype);
  return Ia(y, t, e, r, i, o, a, s, c, h, f), y;
}
function Da(t, e, r, i, o) {
  Fr(o, e, r),
    xa(o, e, r),
    xr(t),
    le(t, z, e),
    le(t, G, r),
    le(t, q, o),
    le(t, S, i),
    le(t, ca, !0);
}
function tn(t, e, r = 'iso8601', i = 1972) {
  let o = x('%Temporal.PlainMonthDay%'),
    a = He(o.prototype);
  return Da(a, t, e, r, i), a;
}
function Ca(t, e, r, i, o) {
  Fr(e, r, o),
    (function (s, c) {
      We(s, $n, Yn), s === $n ? We(c, 4, 12) : s === Yn && We(c, 1, 9);
    })(e, r),
    xr(t),
    le(t, q, e),
    le(t, z, r),
    le(t, G, o),
    le(t, S, i),
    le(t, la, !0);
}
function nn(t, e, r = 'iso8601', i = 1) {
  let o = x('%Temporal.PlainYearMonth%'),
    a = He(o.prototype);
  return Ca(a, t, e, r, i), a;
}
function ka(t, e, r, i) {
  dt(e), xr(t), le(t, H, e), le(t, pe, r), le(t, S, i);
  let o = new (x('%Temporal.Instant%'))(n(t, H));
  le(t, Ke, o);
}
function qe(t, e, r = 'iso8601') {
  let i = x('%Temporal.ZonedDateTime%'),
    o = He(i.prototype);
  return ka(o, t, e, r), o;
}
function Ne(t, e) {
  if (typeof t == 'string') {
    let o = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.fields%'), o, [e]);
  }
  let r = Q(ge(t, 'fields'), t, [e]),
    i = [];
  for (let o of r) {
    if (typeof o != 'string')
      throw new TypeError('bad return from calendar.fields()');
    ya.call(i, o);
  }
  return i;
}
function wt(t, e, r) {
  if (typeof t == 'string') {
    let o = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.mergeFields%'), o, [e, r]);
  }
  let i = Q(ge(t, 'mergeFields'), t, [e, r]);
  if (!be(i)) throw new TypeError('bad return from calendar.mergeFields()');
  return i;
}
function ze(t, e, r, i, o) {
  let a = o;
  if (typeof t == 'string') {
    let c = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.dateAdd%'), c, [e, r, i]);
  }
  a === void 0 && (a = ge(t, 'dateAdd'));
  let s = Vn(a, t, [e, r, i]);
  if (!de(s)) throw new TypeError('invalid result');
  return s;
}
function et(t, e, r, i, o) {
  let a = o;
  if (typeof t == 'string') {
    let c = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.dateUntil%'), c, [e, r, i]);
  }
  a === void 0 && (a = ge(t, 'dateUntil'));
  let s = Vn(a, t, [e, r, i]);
  if (!Be(s)) throw new TypeError('invalid result');
  return s;
}
function Kn(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.year%'), i, [e]);
  }
  let r = Q(ge(t, 'year'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError('calendar year result must be an integer');
  if (!Tr(r)) throw new RangeError('calendar year result must be an integer');
  return r;
}
function Qn(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.month%'), i, [e]);
  }
  let r = Q(ge(t, 'month'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError('calendar month result must be a positive integer');
  if (!Tr(r) || r < 1)
    throw new RangeError('calendar month result must be a positive integer');
  return r;
}
function _n(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.monthCode%'), i, [e]);
  }
  let r = Q(ge(t, 'monthCode'), t, [e]);
  if (typeof r != 'string')
    throw new TypeError('calendar monthCode result must be a string');
  return r;
}
function bn(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.day%'), i, [e]);
  }
  let r = Q(ge(t, 'day'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError('calendar day result must be a positive integer');
  if (!Tr(r) || r < 1)
    throw new RangeError('calendar day result must be a positive integer');
  return r;
}
function Hn(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.era%'), i, [e]);
  }
  let r = Q(ge(t, 'era'), t, [e]);
  if (r === void 0) return r;
  if (typeof r != 'string')
    throw new TypeError('calendar era result must be a string or undefined');
  return r;
}
function ei(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.eraYear%'), i, [e]);
  }
  let r = Q(ge(t, 'eraYear'), t, [e]);
  if (r === void 0) return r;
  if (typeof r != 'number')
    throw new TypeError(
      'calendar eraYear result must be an integer or undefined'
    );
  if (!Tr(r))
    throw new RangeError(
      'calendar eraYear result must be an integer or undefined'
    );
  return r;
}
function ro(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.dayOfWeek%'), i, [e]);
  }
  let r = Q(ge(t, 'dayOfWeek'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError('calendar dayOfWeek result must be a positive integer');
  if (!Tr(r) || r < 1)
    throw new RangeError(
      'calendar dayOfWeek result must be a positive integer'
    );
  return r;
}
function to(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.dayOfYear%'), i, [e]);
  }
  let r = Q(ge(t, 'dayOfYear'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError('calendar dayOfYear result must be a positive integer');
  if (!Tr(r) || r < 1)
    throw new RangeError(
      'calendar dayOfYear result must be a positive integer'
    );
  return r;
}
function no(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.weekOfYear%'), i, [e]);
  }
  let r = Q(ge(t, 'weekOfYear'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError(
      'calendar weekOfYear result must be a positive integer'
    );
  if (!Tr(r) || r < 1)
    throw new RangeError(
      'calendar weekOfYear result must be a positive integer'
    );
  return r;
}
function io(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.yearOfWeek%'), i, [e]);
  }
  let r = Q(ge(t, 'yearOfWeek'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError('calendar yearOfWeek result must be an integer');
  if (!Tr(r))
    throw new RangeError('calendar yearOfWeek result must be an integer');
  return r;
}
function oo(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.daysInWeek%'), i, [e]);
  }
  let r = Q(ge(t, 'daysInWeek'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError(
      'calendar daysInWeek result must be a positive integer'
    );
  if (!Tr(r) || r < 1)
    throw new RangeError(
      'calendar daysInWeek result must be a positive integer'
    );
  return r;
}
function ri(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.daysInMonth%'), i, [e]);
  }
  let r = Q(ge(t, 'daysInMonth'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError(
      'calendar daysInMonth result must be a positive integer'
    );
  if (!Tr(r) || r < 1)
    throw new RangeError(
      'calendar daysInMonth result must be a positive integer'
    );
  return r;
}
function ti(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.daysInYear%'), i, [e]);
  }
  let r = Q(ge(t, 'daysInYear'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError(
      'calendar daysInYear result must be a positive integer'
    );
  if (!Tr(r) || r < 1)
    throw new RangeError(
      'calendar daysInYear result must be a positive integer'
    );
  return r;
}
function ni(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.monthsInYear%'), i, [e]);
  }
  let r = Q(ge(t, 'monthsInYear'), t, [e]);
  if (typeof r != 'number')
    throw new TypeError(
      'calendar monthsInYear result must be a positive integer'
    );
  if (!Tr(r) || r < 1)
    throw new RangeError(
      'calendar monthsInYear result must be a positive integer'
    );
  return r;
}
function ii(t, e) {
  if (typeof t == 'string') {
    let i = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.inLeapYear%'), i, [e]);
  }
  let r = Q(ge(t, 'inLeapYear'), t, [e]);
  if (typeof r != 'boolean')
    throw new TypeError('calendar inLeapYear result must be a boolean');
  return r;
}
function gr(t) {
  if (be(t)) {
    if (Le(t, S)) return n(t, S);
    if (
      !(function (o) {
        return (
          !!Oe(o) ||
          ('dateAdd' in o &&
            'dateFromFields' in o &&
            'dateUntil' in o &&
            'day' in o &&
            'dayOfWeek' in o &&
            'dayOfYear' in o &&
            'daysInMonth' in o &&
            'daysInWeek' in o &&
            'daysInYear' in o &&
            'fields' in o &&
            'id' in o &&
            'inLeapYear' in o &&
            'mergeFields' in o &&
            'month' in o &&
            'monthCode' in o &&
            'monthDayFromFields' in o &&
            'monthsInYear' in o &&
            'weekOfYear' in o &&
            'year' in o &&
            'yearMonthFromFields' in o &&
            'yearOfWeek' in o)
        );
      })(t)
    )
      throw new TypeError(
        'expected a Temporal.Calendar or object implementing the Temporal.Calendar protocol'
      );
    return t;
  }
  let e = dr(t);
  if (Vr(e)) return jr(e);
  let r;
  try {
    ({calendar: r} = Lr(e));
  } catch {
    try {
      ({calendar: r} = Hi(e));
    } catch {
      ({calendar: r} = eo(e));
    }
  }
  if ((r || (r = 'iso8601'), !Vr(r)))
    throw new RangeError(`invalid calendar identifier ${r}`);
  return jr(r);
}
function En(t) {
  if (Le(t, S)) return n(t, S);
  let {calendar: e} = t;
  return e === void 0 ? 'iso8601' : gr(e);
}
function Ge(t) {
  if (typeof t == 'string') return t;
  let e = t.id;
  if (typeof e != 'string')
    throw new TypeError('calendar.id should be a string');
  return e;
}
function Vt(t) {
  return be(t) ? t : new (x('%Temporal.Calendar%'))(t);
}
function In(t, e) {
  return t === e ? !0 : Ge(t) === Ge(e);
}
function oi(t, e, r) {
  if (t === e) return;
  let i = Ge(t),
    o = Ge(e);
  if (i !== o) throw new RangeError(`cannot ${r} of ${i} and ${o} calendars`);
}
function Sa(t, e) {
  if (t === e) return e;
  let r = Ge(t),
    i = Ge(e);
  if (r === i || r === 'iso8601') return e;
  if (i === 'iso8601') return t;
  throw new RangeError('irreconcilable calendars');
}
function Gr(t, e, r, i) {
  if (typeof t == 'string') {
    let a = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.dateFromFields%'), a, [e, r]);
  }
  let o = Q(i ?? ge(t, 'dateFromFields'), t, [e, r]);
  if (!de(o)) throw new TypeError('invalid result');
  return o;
}
function vt(t, e, r) {
  if (typeof t == 'string') {
    let o = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.yearMonthFromFields%'), o, [e, r]);
  }
  let i = Q(ge(t, 'yearMonthFromFields'), t, [e, r]);
  if (!fe(i)) throw new TypeError('invalid result');
  return i;
}
function At(t, e, r) {
  if (typeof t == 'string') {
    let o = new (x('%Temporal.Calendar%'))(t);
    return Q(x('%Temporal.Calendar.prototype.monthDayFromFields%'), o, [e, r]);
  }
  let i = Q(ge(t, 'monthDayFromFields'), t, [e, r]);
  if (!Ae(i)) throw new TypeError('invalid result');
  return i;
}
function Qe(t) {
  if (be(t)) {
    if (X(t)) return n(t, pe);
    if (
      !(function (r) {
        return (
          !!_r(r) ||
          ('getOffsetNanosecondsFor' in r &&
            'getPossibleInstantsFor' in r &&
            'id' in r)
        );
      })(t)
    )
      throw new TypeError(
        'expected a Temporal.TimeZone or object implementing the Temporal.TimeZone protocol'
      );
    return t;
  }
  return As(dr(t));
}
function on(t) {
  if (typeof t == 'string') return t;
  let e = t.id;
  if (typeof e != 'string')
    throw new TypeError('timeZone.id should be a string');
  return e;
}
function Oa(t) {
  return be(t) ? t : new (x('%Temporal.TimeZone%'))(t);
}
function Ba(t, e) {
  return t === e ? !0 : on(t) === on(e);
}
function xt(t) {
  return Ir(n(t, q), n(t, z), n(t, G), n(t, S));
}
function ao(t) {
  return new (x('%Temporal.PlainTime%'))(
    n(t, te),
    n(t, ne),
    n(t, ie),
    n(t, oe),
    n(t, ae),
    n(t, se)
  );
}
function Br(t, e, r) {
  if (typeof t == 'string') {
    let o = new (x('%Temporal.TimeZone%'))(t);
    return Q(x('%Temporal.TimeZone.prototype.getOffsetNanosecondsFor%'), o, [
      e,
    ]);
  }
  let i = Q(r ?? ge(t, 'getOffsetNanosecondsFor'), t, [e]);
  if (typeof i != 'number')
    throw new TypeError('bad return from getOffsetNanosecondsFor');
  if (!Tr(i) || _e(i) >= 864e11)
    throw new RangeError('out-of-range return from getOffsetNanosecondsFor');
  return i;
}
function Di(t, e) {
  return si(Br(t, e));
}
function vr(t, e, r) {
  let i = n(e, H),
    o = Br(t, e),
    {
      year: a,
      month: s,
      day: c,
      hour: h,
      minute: f,
      second: m,
      millisecond: y,
      microsecond: g,
      nanosecond: v,
    } = $a(i);
  return (
    ({
      year: a,
      month: s,
      day: c,
      hour: h,
      minute: f,
      second: m,
      millisecond: y,
      microsecond: g,
      nanosecond: v,
    } = lo(a, s, c, h, f, m, y, g, v + o)),
    hr(a, s, c, h, f, m, y, g, v, r)
  );
}
function cr(t, e, r) {
  return Ma(Ln(t, e), t, e, r);
}
function Ma(t, e, r, i) {
  let o = x('%Temporal.Instant%'),
    a = t.length;
  if (a === 1) return t[0];
  if (a)
    switch (i) {
      case 'compatible':
      case 'earlier':
        return t[0];
      case 'later':
        return t[a - 1];
      case 'reject':
        throw new RangeError('multiple instants found');
    }
  let s = n(r, q),
    c = n(r, z),
    h = n(r, G),
    f = n(r, te),
    m = n(r, ne),
    y = n(r, ie),
    g = n(r, oe),
    v = n(r, ae),
    _ = n(r, se),
    E = tt(s, c, h, f, m, y, g, v, _);
  if (E === null) throw new RangeError('DateTime outside of supported range');
  let D = new o(d.default.subtract(E, Nr)),
    C = new o(d.default.add(E, Nr)),
    B = Br(e, D),
    R = Br(e, C) - B;
  switch (i) {
    case 'earlier': {
      let P = n(r, S),
        L = x('%Temporal.PlainDateTime%'),
        j = Oi(
          s,
          c,
          h,
          f,
          m,
          y,
          g,
          v,
          _,
          P,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -R,
          void 0
        );
      return Ln(
        e,
        new L(
          j.year,
          j.month,
          j.day,
          j.hour,
          j.minute,
          j.second,
          j.millisecond,
          j.microsecond,
          j.nanosecond,
          P
        )
      )[0];
    }
    case 'compatible':
    case 'later': {
      let P = n(r, S),
        L = x('%Temporal.PlainDateTime%'),
        j = Oi(
          s,
          c,
          h,
          f,
          m,
          y,
          g,
          v,
          _,
          P,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          R,
          void 0
        ),
        Y = Ln(
          e,
          new L(
            j.year,
            j.month,
            j.day,
            j.hour,
            j.minute,
            j.second,
            j.millisecond,
            j.microsecond,
            j.nanosecond,
            P
          )
        );
      return Y[Y.length - 1];
    }
    case 'reject':
      throw new RangeError('no such instant found');
  }
}
function Ln(t, e, r) {
  if (typeof t == 'string') {
    let a = new (x('%Temporal.TimeZone%'))(t);
    return Q(x('%Temporal.TimeZone.prototype.getPossibleInstantsFor%'), a, [e]);
  }
  let i = Q(r ?? ge(t, 'getPossibleInstantsFor'), t, [e]),
    o = [];
  for (let a of i) {
    if (!je(a)) throw new TypeError('bad return from getPossibleInstantsFor');
    ya.call(o, a);
  }
  return o;
}
function Et(t) {
  let e;
  return (
    t < 0 || t > 9999
      ? (e = (t < 0 ? '-' : '+') + `000000${_e(t)}`.slice(-6))
      : (e = `0000${t}`.slice(-4)),
    e
  );
}
function Ce(t) {
  return `00${t}`.slice(-2);
}
function ai(t, e, r, i, o) {
  if (o === 'minute') return '';
  let a = `:${Ce(t)}`,
    s,
    c = 1e6 * e + 1e3 * r + i;
  if (o === 'auto') {
    if (c === 0) return a;
    for (s = `${c}`.padStart(9, '0'); s[s.length - 1] === '0'; )
      s = s.slice(0, -1);
  } else {
    if (o === 0) return a;
    s = `${c}`.padStart(9, '0').slice(0, o);
  }
  return `${a}.${s}`;
}
function No(t, e, r) {
  let i = e;
  i === void 0 && (i = 'UTC');
  let o = vr(i, t, 'iso8601'),
    a = Et(n(o, q)),
    s = Ce(n(o, z)),
    c = Ce(n(o, G)),
    h = Ce(n(o, te)),
    f = Ce(n(o, ne)),
    m = ai(n(o, ie), n(o, oe), n(o, ae), n(o, se), r),
    y = 'Z';
  return e !== void 0 && (y = Ra(Br(i, t))), `${a}-${s}-${c}T${h}:${f}${m}${y}`;
}
function yi(t, e = 'auto', r) {
  function i($) {
    return $ <= Ms ? $.toString(10) : d.default.BigInt($).toString(10);
  }
  let o = n(t, er),
    a = n(t, Ue),
    s = n(t, ur),
    c = n(t, rr),
    h = n(t, tr),
    f = n(t, nr),
    m = n(t, ir),
    y = n(t, or),
    g = n(t, ar),
    v = n(t, sr),
    _ = Pr(o, a, s, c, h, f, m, y, g, v);
  if (r) {
    let {unit: $, increment: A, roundingMode: K} = r;
    ({
      seconds: m,
      milliseconds: y,
      microseconds: g,
      nanoseconds: v,
    } = Jr(0, 0, 0, 0, 0, 0, m, y, g, v, A, $, K));
  }
  let E = [];
  o && E.push(`${i(_e(o))}Y`),
    a && E.push(`${i(_e(a))}M`),
    s && E.push(`${i(_e(s))}W`),
    c && E.push(`${i(_e(c))}D`);
  let D = [];
  h && D.push(`${i(_e(h))}H`), f && D.push(`${i(_e(f))}M`);
  let C = [],
    B,
    R,
    P,
    L,
    j = Lt(0, 0, 0, m, y, g, v, 0);
  ({quotient: j, remainder: B} = $e(j, ye)),
    ({quotient: j, remainder: R} = $e(j, ye)),
    ({quotient: L, remainder: P} = $e(j, ye));
  let Y =
      1e6 * _e(d.default.toNumber(P)) +
      1e3 * _e(d.default.toNumber(R)) +
      _e(d.default.toNumber(B)),
    M;
  if (e === 'auto') {
    if (Y !== 0)
      for (M = `${Y}`.padStart(9, '0'); M[M.length - 1] === '0'; )
        M = M.slice(0, -1);
  } else e !== 0 && (M = `${Y}`.padStart(9, '0').slice(0, e));
  return (
    M && C.unshift('.', M),
    (d.default.equal(L, Re) && !C.length && e === 'auto') ||
      C.unshift(kr(L).toString()),
    C.length && D.push(`${C.join('')}S`),
    D.length && D.unshift('T'),
    E.length || D.length
      ? `${_ < 0 ? '-' : ''}P${E.join('')}${D.join('')}`
      : 'PT0S'
  );
}
function Fo(t, e = 'auto') {
  return `${Et(n(t, q))}-${Ce(n(t, z))}-${Ce(n(t, G))}${Ki(n(t, S), e)}`;
}
function jo(t, e, r = 'auto', i) {
  let o = n(t, q),
    a = n(t, z),
    s = n(t, G),
    c = n(t, te),
    h = n(t, ne),
    f = n(t, ie),
    m = n(t, oe),
    y = n(t, ae),
    g = n(t, se);
  if (i) {
    let {unit: v, increment: _, roundingMode: E} = i;
    ({
      year: o,
      month: a,
      day: s,
      hour: c,
      minute: h,
      second: f,
      millisecond: m,
      microsecond: y,
      nanosecond: g,
    } = yo(o, a, s, c, h, f, m, y, g, _, v, E));
  }
  return `${Et(o)}-${Ce(a)}-${Ce(s)}T${Ce(c)}:${Ce(h)}${ai(f, m, y, g, e)}${Ki(
    n(t, S),
    r
  )}`;
}
function Ao(t, e = 'auto') {
  let r = `${Ce(n(t, z))}-${Ce(n(t, G))}`,
    i = Ge(n(t, S));
  (e === 'always' || e === 'critical' || i !== 'iso8601') &&
    (r = `${Et(n(t, q))}-${r}`);
  let o = Qi(i, e);
  return o && (r += o), r;
}
function xo(t, e = 'auto') {
  let r = `${Et(n(t, q))}-${Ce(n(t, z))}`,
    i = Ge(n(t, S));
  (e === 'always' || e === 'critical' || i !== 'iso8601') &&
    (r += `-${Ce(n(t, G))}`);
  let o = Qi(i, e);
  return o && (r += o), r;
}
function Lo(t, e, r = 'auto', i = 'auto', o = 'auto', a) {
  let s = n(t, Ke);
  if (a) {
    let {unit: m, increment: y, roundingMode: g} = a,
      v = qn(n(t, H), y, m, g);
    s = new (x('%Temporal.Instant%'))(v);
  }
  let c = n(t, pe),
    h = vr(c, s, 'iso8601'),
    f = `${Et(n(h, q))}-${Ce(n(h, z))}-${Ce(n(h, G))}T${Ce(n(h, te))}:${Ce(
      n(h, ne)
    )}${ai(n(h, ie), n(h, oe), n(h, ae), n(h, se), e)}`;
  return (
    o !== 'never' && (f += Ra(Br(c, s))),
    i !== 'never' && (f += `[${i === 'critical' ? '!' : ''}${on(c)}]`),
    (f += Ki(n(t, S), r)),
    f
  );
}
function kt(t) {
  return Ja.test(yn(t));
}
function rt(t) {
  let e = Ja.exec(yn(t));
  if (!e) throw new RangeError(`invalid time zone offset: ${t}`);
  return (
    (e[1] === '-' || e[1] === '\u2212' ? -1 : 1) *
    (1e9 * (60 * (60 * +e[2] + +(e[3] || 0)) + +(e[4] || 0)) +
      +((e[5] || 0) + '000000000').slice(0, 9))
  );
}
function so(t) {
  return kt(t) ? si(rt(t)) : ba(yn(t)).resolvedOptions().timeZone;
}
function qr(t, e) {
  let {
      year: r,
      month: i,
      day: o,
      hour: a,
      minute: s,
      second: c,
      millisecond: h,
      microsecond: f,
      nanosecond: m,
    } = Ya(t, e),
    y = r % 400,
    g = (r - y) / 400,
    v = d.default.multiply(d.default.BigInt(146097), Nr),
    _ = tt(y, i, o, a, s, c, h, f, m),
    E = d.default.add(_, d.default.multiply(v, d.default.BigInt(g)));
  return d.default.toNumber(d.default.subtract(E, e));
}
function si(t) {
  let e = t < 0 ? '-' : '+',
    r = _e(t),
    i = r % 1e9,
    o = fr(r / 1e9) % 60,
    a = fr(r / 6e10) % 60,
    s = Ce(fr(r / 36e11)),
    c = Ce(a),
    h = Ce(o),
    f = '';
  if (i) {
    let m = `${i}`.padStart(9, '0');
    for (; m[m.length - 1] === '0'; ) m = m.slice(0, -1);
    f = `:${h}.${m}`;
  } else o && (f = `:${h}`);
  return `${e}${s}:${c}${f}`;
}
function Ra(t) {
  let e = d.default.toNumber(pr(d.default.BigInt(t), va, 'halfExpand')),
    r = e < 0 ? '-' : '+';
  e = _e(e);
  let i = (e / 6e10) % 60;
  return `${r}${Ce(fr(e / 36e11))}:${Ce(i)}`;
}
function tt(t, e, r, i, o, a, s, c, h) {
  let f = new Date();
  f.setUTCHours(i, o, a, s), f.setUTCFullYear(t, e - 1, r);
  let m = f.getTime();
  if (Jn(m)) return null;
  let y = d.default.multiply(d.default.BigInt(m), wr);
  return (
    (y = d.default.add(y, d.default.multiply(d.default.BigInt(c), ye))),
    (y = d.default.add(y, d.default.BigInt(h))),
    d.default.lessThan(y, rn) || d.default.greaterThan(y, Nt) ? null : y
  );
}
function $a(t) {
  let {quotient: e, remainder: r} = $e(t, wr),
    i = d.default.toNumber(e),
    o = d.default.toNumber(r);
  o < 0 && ((o += 1e6), (i -= 1));
  let a = fr(o / 1e3) % 1e3,
    s = o % 1e3,
    c = new Date(i);
  return {
    epochMilliseconds: i,
    year: c.getUTCFullYear(),
    month: c.getUTCMonth() + 1,
    day: c.getUTCDate(),
    hour: c.getUTCHours(),
    minute: c.getUTCMinutes(),
    second: c.getUTCSeconds(),
    millisecond: c.getUTCMilliseconds(),
    microsecond: a,
    nanosecond: s,
  };
}
function Ya(t, e) {
  let {
      epochMilliseconds: r,
      millisecond: i,
      microsecond: o,
      nanosecond: a,
    } = $a(e),
    {
      year: s,
      month: c,
      day: h,
      hour: f,
      minute: m,
      second: y,
    } = (function (v, _) {
      let E = ba(v).format(new Date(_));
      return (function (C) {
        let B = C.split(/[^\w]+/);
        if (B.length !== 7) throw new RangeError(`expected 7 parts in "${C}`);
        let R = +B[0],
          P = +B[1],
          L = +B[2],
          j = B[3].toUpperCase();
        if (j === 'B' || j === 'BC') L = 1 - L;
        else if (j !== 'A' && j !== 'AD')
          throw new RangeError(`Unknown era ${j} in "${C}`);
        let Y = +B[4];
        Y === 24 && (Y = 0);
        let M = +B[5],
          $ = +B[6];
        if (!(lr(L) && lr(R) && lr(P) && lr(Y) && lr(M) && lr($)))
          throw new RangeError(`Invalid number in "${C}`);
        return {year: L, month: R, day: P, hour: Y, minute: M, second: $};
      })(E);
    })(t, r);
  return lo(s, c, h, f, m, y, i, o, a);
}
function Uo(t, e) {
  return d.default.lessThan(t, e) ? e : t;
}
function Pa() {
  return d.default.add(po(), Ps);
}
function Na(t, e) {
  if (d.default.lessThan(e, St)) return Na(t, St);
  let r = d.default.add(e, Ta),
    i = Uo(Pa(), r),
    o = Uo(St, e),
    a = qr(t, o),
    s = o,
    c = a;
  for (; a === c && d.default.lessThan(d.default.BigInt(o), i); ) {
    if (((s = d.default.add(o, _a)), d.default.greaterThan(s, Nt))) return null;
    (c = qr(t, s)), a === c && (o = s);
  }
  return a === c ? null : Va(h => qr(t, h), o, s, a, c);
}
function Ci(t, e) {
  let r = Pa(),
    i = d.default.greaterThan(e, r),
    o = i ? d.default.subtract(e, Ta) : St;
  if (t === 'Africa/Casablanca' || t === 'Africa/El_Aaiun') {
    let f = n(Sr('2088-01-01T00Z'), H);
    if (d.default.lessThan(f, e)) return Ci(t, f);
  }
  let a = d.default.subtract(e, zt);
  if (d.default.lessThan(a, St)) return null;
  let s = qr(t, a),
    c = a,
    h = s;
  for (; s === h && d.default.greaterThan(a, o); ) {
    if (((c = d.default.subtract(a, _a)), d.default.lessThan(c, St)))
      return null;
    (h = qr(t, c)), s === h && (a = c);
  }
  if (s === h) {
    if (i) {
      let f = d.default.subtract(r, Nr);
      return Ci(t, f);
    }
    return null;
  }
  return Va(f => qr(t, f), c, a, h, s);
}
function nt(t) {
  return t === void 0 ? !1 : t % 4 == 0 && (t % 100 != 0 || t % 400 == 0);
}
function zr(t, e) {
  return {
    standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  }[nt(t) ? 'leapyear' : 'standard'][e - 1];
}
function ki(t, e, r) {
  let i = e + (e < 3 ? 10 : -2),
    o = t - (e < 3 ? 1 : 0),
    a = fr(o / 100),
    s = o - 100 * a,
    c = (r + fr(2.6 * i - 0.2) + (s + fr(s / 4)) + (fr(a / 4) - 2 * a)) % 7;
  return c + (c <= 0 ? 7 : 0);
}
function Un(t, e, r) {
  let i = r;
  for (let o = e - 1; o > 0; o--) i += zr(t, o);
  return i;
}
function Zo(t, e, r) {
  let i = Un(t, e, r),
    o = ki(t, e, r) || 7,
    a = ki(t, 1, 1),
    s = fr((i - o + 10) / 7);
  return s < 1
    ? a === 5 || (a === 6 && nt(t - 1))
      ? {week: 53, year: t - 1}
      : {week: 52, year: t - 1}
    : s === 53 && (nt(t) ? 366 : 365) - i < 4 - o
    ? {week: 1, year: t + 1}
    : {week: s, year: t};
}
function Pr(t, e, r, i, o, a, s, c, h, f) {
  for (let m of [t, e, r, i, o, a, s, c, h, f])
    if (m !== 0) return m < 0 ? -1 : 1;
  return 0;
}
function On(t, e) {
  let r = t,
    i = e;
  if (!lr(r) || !lr(i)) throw new RangeError('infinity is out of range');
  return (
    (i -= 1),
    (r += fr(i / 12)),
    (i %= 12),
    i < 0 && (i += 12),
    (i += 1),
    {year: r, month: i}
  );
}
function li(t, e, r) {
  let i = t,
    o = e,
    a = r;
  if (!lr(a)) throw new RangeError('infinity is out of range');
  ({year: i, month: o} = On(i, o));
  let s = 146097;
  if (_e(a) > s) {
    let f = ut(a / s);
    (i += 400 * f), (a -= f * s);
  }
  let c = 0,
    h = o > 2 ? i : i - 1;
  for (; (c = nt(h) ? 366 : 365), a < -c; ) (i -= 1), (h -= 1), (a += c);
  for (h += 1; (c = nt(h) ? 366 : 365), a > c; ) (i += 1), (h += 1), (a -= c);
  for (; a < 1; ) ({year: i, month: o} = On(i, o - 1)), (a += zr(i, o));
  for (; a > zr(i, o); ) (a -= zr(i, o)), ({year: i, month: o} = On(i, o + 1));
  return {year: i, month: o, day: a};
}
function lo(t, e, r, i, o, a, s, c, h) {
  let {
      deltaDays: f,
      hour: m,
      minute: y,
      second: g,
      millisecond: v,
      microsecond: _,
      nanosecond: E,
    } = Ur(i, o, a, s, c, h),
    {year: D, month: C, day: B} = li(t, e, r + f);
  return {
    year: D,
    month: C,
    day: B,
    hour: m,
    minute: y,
    second: g,
    millisecond: v,
    microsecond: _,
    nanosecond: E,
  };
}
function Ur(t, e, r, i, o, a) {
  let s,
    c = d.default.BigInt(t),
    h = d.default.BigInt(e),
    f = d.default.BigInt(r),
    m = d.default.BigInt(i),
    y = d.default.BigInt(o),
    g = d.default.BigInt(a);
  return (
    ({quotient: s, remainder: g} = ct(g, ye)),
    (y = d.default.add(y, s)),
    ({quotient: s, remainder: y} = ct(y, ye)),
    (m = d.default.add(m, s)),
    ({quotient: s, remainder: m} = ct(m, ye)),
    (f = d.default.add(f, s)),
    ({quotient: s, remainder: f} = ct(f, $r)),
    (h = d.default.add(h, s)),
    ({quotient: s, remainder: h} = ct(h, $r)),
    (c = d.default.add(c, s)),
    ({quotient: s, remainder: c} = ct(c, pa)),
    {
      deltaDays: d.default.toNumber(s),
      hour: d.default.toNumber(c),
      minute: d.default.toNumber(h),
      second: d.default.toNumber(f),
      millisecond: d.default.toNumber(m),
      microsecond: d.default.toNumber(y),
      nanosecond: d.default.toNumber(g),
    }
  );
}
function Lt(t, e, r, i, o, a, s, c) {
  let h = d.default.BigInt(t),
    f = d.default.BigInt(s);
  t !== 0 && (f = d.default.subtract(d.default.BigInt(s), d.default.BigInt(c)));
  let m = d.default.add(
      d.default.BigInt(e),
      d.default.multiply(h, d.default.BigInt(24))
    ),
    y = d.default.add(d.default.BigInt(r), d.default.multiply(m, $r)),
    g = d.default.add(d.default.BigInt(i), d.default.multiply(y, $r)),
    v = d.default.add(d.default.BigInt(o), d.default.multiply(g, ye)),
    _ = d.default.add(d.default.BigInt(a), d.default.multiply(v, ye));
  return d.default.add(d.default.BigInt(f), d.default.multiply(_, ye));
}
function co(t, e) {
  let r = x('%Temporal.Instant%'),
    i = Pt(d.default.toNumber(t)),
    o = d.default.BigInt(t),
    a = 864e11;
  if (i === 0) return {days: 0, nanoseconds: Re, dayLengthNs: a};
  if (!X(e)) {
    let R;
    return (
      ({quotient: R, remainder: o} = $e(o, d.default.BigInt(a))),
      {days: d.default.toNumber(R), nanoseconds: o, dayLengthNs: a}
    );
  }
  let s = n(e, H),
    c = n(e, Ke),
    h = d.default.add(s, o),
    f = new r(h),
    m = n(e, pe),
    y = n(e, S),
    g = vr(m, c, y),
    v = vr(m, f, y),
    {days: _} = fo(
      n(g, q),
      n(g, z),
      n(g, G),
      n(g, te),
      n(g, ne),
      n(g, ie),
      n(g, oe),
      n(g, ae),
      n(g, se),
      n(v, q),
      n(v, z),
      n(v, G),
      n(v, te),
      n(v, ne),
      n(v, ie),
      n(v, oe),
      n(v, ae),
      n(v, se),
      y,
      'day',
      He(null)
    ),
    E = Er(c, m, y, 0, 0, 0, _, 0, 0, 0, 0, 0, 0),
    D = d.default.BigInt(_);
  if (i === 1)
    for (; d.default.greaterThan(D, Re) && d.default.greaterThan(E, h); )
      (D = d.default.subtract(D, zt)),
        (E = Er(c, m, y, 0, 0, 0, d.default.toNumber(D), 0, 0, 0, 0, 0, 0));
  o = d.default.subtract(h, E);
  let C = !1,
    B = new r(E);
  do {
    let R = Er(B, m, y, 0, 0, 0, i, 0, 0, 0, 0, 0, 0),
      P = n(B, H);
    (a = d.default.toNumber(d.default.subtract(R, P))),
      (C = d.default.greaterThanOrEqual(
        d.default.multiply(
          d.default.subtract(o, d.default.BigInt(a)),
          d.default.BigInt(i)
        ),
        Re
      )),
      C &&
        ((o = d.default.subtract(o, d.default.BigInt(a))),
        (B = new r(R)),
        (D = d.default.add(D, d.default.BigInt(i))));
  } while (C);
  if (!br(D) && Oo(D) !== i)
    throw new RangeError(
      'Time zone or calendar converted nanoseconds into a number of days with the opposite sign'
    );
  if (!br(o) && Oo(o) !== i)
    throw Pn(o) && i === 1
      ? new Error('assert not reached')
      : new RangeError(
          'Time zone or calendar ended up with a remainder of nanoseconds with the opposite sign'
        );
  if (d.default.greaterThanOrEqual(kr(o), kr(d.default.BigInt(a))))
    throw new Error('assert not reached');
  return {days: d.default.toNumber(D), nanoseconds: o, dayLengthNs: _e(a)};
}
function Cr(t, e, r, i, o, a, s, c, h) {
  let f = Fa(t, e, r, i, o, a, s, c, h);
  if (f === 'positive overflow' || f === 'negative overflow')
    throw new RangeError('Duration out of range');
  return f;
}
function Fa(t, e, r, i, o, a, s, c, h) {
  let f,
    m,
    y,
    g,
    v,
    _,
    E = t;
  if (X(h)) {
    let Y = Er(n(h, Ke), n(h, pe), n(h, S), 0, 0, 0, E, e, r, i, o, a, s),
      M = n(h, H);
    f = d.default.subtract(Y, M);
  } else f = Lt(E, e, r, i, o, a, s, 0);
  c === 'year' || c === 'month' || c === 'week' || c === 'day'
    ? ({days: E, nanoseconds: f} = co(f, h))
    : (E = 0);
  let D = d.default.lessThan(f, Re) ? -1 : 1;
  switch (((f = kr(f)), (m = y = g = v = _ = Re), c)) {
    case 'year':
    case 'month':
    case 'week':
    case 'day':
    case 'hour':
      ({quotient: m, remainder: f} = $e(f, ye)),
        ({quotient: y, remainder: m} = $e(m, ye)),
        ({quotient: g, remainder: y} = $e(y, ye)),
        ({quotient: v, remainder: g} = $e(g, $r)),
        ({quotient: _, remainder: v} = $e(v, $r));
      break;
    case 'minute':
      ({quotient: m, remainder: f} = $e(f, ye)),
        ({quotient: y, remainder: m} = $e(m, ye)),
        ({quotient: g, remainder: y} = $e(y, ye)),
        ({quotient: v, remainder: g} = $e(g, $r));
      break;
    case 'second':
      ({quotient: m, remainder: f} = $e(f, ye)),
        ({quotient: y, remainder: m} = $e(m, ye)),
        ({quotient: g, remainder: y} = $e(y, ye));
      break;
    case 'millisecond':
      ({quotient: m, remainder: f} = $e(f, ye)),
        ({quotient: y, remainder: m} = $e(m, ye));
      break;
    case 'microsecond':
      ({quotient: m, remainder: f} = $e(f, ye));
      break;
    case 'nanosecond':
      break;
    default:
      throw new Error('assert not reached');
  }
  let C = d.default.toNumber(_) * D,
    B = d.default.toNumber(v) * D,
    R = d.default.toNumber(g) * D,
    P = d.default.toNumber(y) * D,
    L = d.default.toNumber(m) * D,
    j = d.default.toNumber(f) * D;
  for (let Y of [E, C, B, R, P, L, j])
    if (!lr(Y)) return D === 1 ? 'positive overflow' : 'negative overflow';
  return {
    days: E,
    hours: C,
    minutes: B,
    seconds: R,
    milliseconds: P,
    microseconds: L,
    nanoseconds: j,
  };
}
function kn(t, e, r, i, o, a) {
  let s = x('%Temporal.Duration%'),
    c = Pr(t, e, r, i, 0, 0, 0, 0, 0, 0);
  if (c === 0) return {years: t, months: e, weeks: r, days: i};
  let h = d.default.BigInt(c),
    f,
    m,
    y = d.default.BigInt(t),
    g = d.default.BigInt(e),
    v = d.default.BigInt(r),
    _ = d.default.BigInt(i);
  a && ((m = ve(a)), (f = n(m, S)));
  let E = new s(c),
    D = new s(0, c),
    C = new s(0, 0, c);
  switch (o) {
    case 'year':
      break;
    case 'month':
      {
        if (!f)
          throw new RangeError(
            'a starting point is required for months balancing'
          );
        let B, R;
        for (
          typeof f != 'string' &&
          ((B = ge(f, 'dateAdd')), (R = ge(f, 'dateUntil')));
          !br(y);

        ) {
          let P = ze(f, m, E, void 0, B),
            L = He(null);
          L.largestUnit = 'month';
          let j = et(f, m, P, L, R),
            Y = d.default.BigInt(n(j, Ue));
          (m = P), (g = d.default.add(g, Y)), (y = d.default.subtract(y, h));
        }
      }
      break;
    case 'week': {
      if (!f)
        throw new RangeError(
          'a starting point is required for weeks balancing'
        );
      let B = typeof f != 'string' ? ge(f, 'dateAdd') : void 0;
      for (; !br(y); ) {
        let R;
        ({relativeTo: m, days: R} = Xe(f, m, E, B)),
          (_ = d.default.add(_, d.default.BigInt(R))),
          (y = d.default.subtract(y, h));
      }
      for (; !br(g); ) {
        let R;
        ({relativeTo: m, days: R} = Xe(f, m, D, B)),
          (_ = d.default.add(_, d.default.BigInt(R))),
          (g = d.default.subtract(g, h));
      }
      break;
    }
    default: {
      if (br(y) && br(g) && br(v)) break;
      if (!f)
        throw new RangeError(
          'a starting point is required for balancing calendar units'
        );
      let B = typeof f != 'string' ? ge(f, 'dateAdd') : void 0;
      for (; !br(y); ) {
        let R;
        ({relativeTo: m, days: R} = Xe(f, m, E, B)),
          (_ = d.default.add(_, d.default.BigInt(R))),
          (y = d.default.subtract(y, h));
      }
      for (; !br(g); ) {
        let R;
        ({relativeTo: m, days: R} = Xe(f, m, D, B)),
          (_ = d.default.add(_, d.default.BigInt(R))),
          (g = d.default.subtract(g, h));
      }
      for (; !br(v); ) {
        let R;
        ({relativeTo: m, days: R} = Xe(f, m, C, B)),
          (_ = d.default.add(_, d.default.BigInt(R))),
          (v = d.default.subtract(v, h));
      }
      break;
    }
  }
  return {
    years: d.default.toNumber(y),
    months: d.default.toNumber(g),
    weeks: d.default.toNumber(v),
    days: d.default.toNumber(_),
  };
}
function qo(t, e, r, i, o) {
  if (X(t)) {
    let a = n(t, Ke),
      s = n(t, pe),
      c = n(t, S),
      h = Br(s, a),
      f = Er(a, s, c, e, r, i, o, 0, 0, 0, 0, 0, 0);
    return Br(s, new (x('%Temporal.Instant%'))(f)) - h;
  }
  return 0;
}
function ja(t) {
  return new (x('%Temporal.Duration%'))(
    -n(t, er),
    -n(t, Ue),
    -n(t, ur),
    -n(t, rr),
    -n(t, tr),
    -n(t, nr),
    -n(t, ir),
    -n(t, or),
    -n(t, ar),
    -n(t, sr)
  );
}
function mr(t, e, r) {
  return Ss(r, Os(e, t));
}
function Aa(t, e, r) {
  let i = mr(e, 1, 12);
  return {year: t, month: i, day: mr(r, 1, zr(t, i))};
}
function We(t, e, r) {
  if (t < e || t > r)
    throw new RangeError(`value out of range: ${e} <= ${t} <= ${r}`);
}
function Fr(t, e, r) {
  We(e, 1, 12), We(r, 1, zr(t, e));
}
function xa(t, e, r) {
  La(t, e, r, 12, 0, 0, 0, 0, 0);
}
function ci(t, e, r, i, o, a) {
  We(t, 0, 23),
    We(e, 0, 59),
    We(r, 0, 59),
    We(i, 0, 999),
    We(o, 0, 999),
    We(a, 0, 999);
}
function uo(t, e, r, i, o, a, s, c, h) {
  Fr(t, e, r), ci(i, o, a, s, c, h);
}
function La(t, e, r, i, o, a, s, c, h) {
  if (
    (We(t, $n, Yn),
    (t === $n && tt(t, e, r + 1, i, o, a, s, c, h - 1) == null) ||
      (t === Yn && tt(t, e, r - 1, i, o, a, s, c, h + 1) == null))
  )
    throw new RangeError('DateTime outside of supported range');
}
function dt(t) {
  if (d.default.lessThan(t, rn) || d.default.greaterThan(t, Nt))
    throw new RangeError('Instant outside of supported range');
}
function Zn(t, e, r, i, o, a, s, c, h, f) {
  let m = Pr(t, e, r, i, o, a, s, c, h, f);
  for (let y of [t, e, r, i, o, a, s, c, h, f]) {
    if (!lr(y))
      throw new RangeError('infinite values not allowed as duration fields');
    let g = Pt(y);
    if (g !== 0 && g !== m)
      throw new RangeError('mixed-sign values not allowed as duration fields');
  }
}
function ho(t, e, r, i, o, a, s) {
  switch (s) {
    case 'year':
    case 'month': {
      let c = -Hr(t, e, r, i, o, a);
      if (c === 0) return {years: 0, months: 0, weeks: 0, days: 0};
      let h = {year: t, month: e, day: r},
        f = {year: i, month: o, day: a},
        m = f.year - h.year,
        y = mt(t, e, r, m, 0, 0, 0, 'constrain'),
        g = -Hr(y.year, y.month, y.day, i, o, a);
      if (g === 0)
        return s === 'year'
          ? {years: m, months: 0, weeks: 0, days: 0}
          : {years: 0, months: 12 * m, weeks: 0, days: 0};
      let v = f.month - h.month;
      if (
        (g !== c && ((m -= c), (v += 12 * c)),
        (y = mt(t, e, r, m, v, 0, 0, 'constrain')),
        (g = -Hr(y.year, y.month, y.day, i, o, a)),
        g === 0)
      )
        return s === 'year'
          ? {years: m, months: v, weeks: 0, days: 0}
          : {years: 0, months: v + 12 * m, weeks: 0, days: 0};
      g !== c &&
        ((v -= c),
        v === -c && ((m -= c), (v = 11 * c)),
        (y = mt(t, e, r, m, v, 0, 0, 'constrain')));
      let _ = 0;
      return (
        (_ =
          y.month === f.month
            ? f.day - y.day
            : c < 0
            ? -y.day - (zr(f.year, f.month) - f.day)
            : f.day + (zr(y.year, y.month) - y.day)),
        s === 'month' && ((v += 12 * m), (m = 0)),
        {years: m, months: v, weeks: 0, days: _}
      );
    }
    case 'week':
    case 'day': {
      let c, h, f;
      Hr(t, e, r, i, o, a) < 0
        ? ((h = {year: t, month: e, day: r}),
          (c = {year: i, month: o, day: a}),
          (f = 1))
        : ((h = {year: i, month: o, day: a}),
          (c = {year: t, month: e, day: r}),
          (f = -1));
      let m = Un(c.year, c.month, c.day) - Un(h.year, h.month, h.day);
      for (let g = h.year; g < c.year; ++g) m += nt(g) ? 366 : 365;
      let y = 0;
      return (
        s === 'week' && ((y = fr(m / 7)), (m %= 7)),
        (y *= f),
        (m *= f),
        {years: 0, months: 0, weeks: y, days: m}
      );
    }
    default:
      throw new Error('assert not reached');
  }
}
function Ua(t, e, r, i, o, a, s, c, h, f, m, y) {
  let g = s - t,
    v = c - e,
    _ = h - r,
    E = f - i,
    D = m - o,
    C = y - a,
    B = Pr(0, 0, 0, 0, g, v, _, E, D, C);
  (g *= B), (v *= B), (_ *= B), (E *= B), (D *= B), (C *= B);
  let R = 0;
  if (
    (({
      deltaDays: R,
      hour: g,
      minute: v,
      second: _,
      millisecond: E,
      microsecond: D,
      nanosecond: C,
    } = Ur(g, v, _, E, D, C)),
    R != 0)
  )
    throw new Error(
      'assertion failure in DifferenceTime: _bt_.[[Days]] should be 0'
    );
  return (
    (g *= B),
    (v *= B),
    (_ *= B),
    (E *= B),
    (D *= B),
    (C *= B),
    {
      hours: g,
      minutes: v,
      seconds: _,
      milliseconds: E,
      microseconds: D,
      nanoseconds: C,
    }
  );
}
function mo(t, e, r, i, o, a) {
  let s = d.default.subtract(e, t),
    c = 0,
    h = 0,
    f = d.default.toNumber(d.default.remainder(s, ye)),
    m = d.default.toNumber(d.default.remainder(d.default.divide(s, ye), ye)),
    y = d.default.toNumber(d.default.remainder(d.default.divide(s, wr), ye)),
    g = d.default.toNumber(d.default.divide(s, Yr));
  return (
    ({
      hours: c,
      minutes: h,
      seconds: g,
      milliseconds: y,
      microseconds: m,
      nanoseconds: f,
    } = Jr(0, 0, 0, 0, 0, 0, g, y, m, f, r, i, a)),
    Cr(0, c, h, g, y, m, f, o)
  );
}
function fo(t, e, r, i, o, a, s, c, h, f, m, y, g, v, _, E, D, C, B, R, P) {
  let L = t,
    j = e,
    Y = r,
    {
      hours: M,
      minutes: $,
      seconds: A,
      milliseconds: K,
      microseconds: w,
      nanoseconds: V,
    } = Ua(i, o, a, s, c, h, g, v, _, E, D, C),
    l = Pr(0, 0, 0, 0, M, $, A, K, w, V);
  Hr(f, m, y, L, j, Y) === -l &&
    (({year: L, month: j, day: Y} = li(L, j, Y - l)),
    ({
      hours: M,
      minutes: $,
      seconds: A,
      milliseconds: K,
      microseconds: w,
      nanoseconds: V,
    } = Cr(-l, M, $, A, K, w, V, R)));
  let u = Ir(L, j, Y, B),
    p = Ir(f, m, y, B),
    T = pt('day', R),
    b = lt(P);
  b.largestUnit = T;
  let {years: I, months: O, weeks: k, days: F} = et(B, u, p, b);
  return (
    ({
      days: F,
      hours: M,
      minutes: $,
      seconds: A,
      milliseconds: K,
      microseconds: w,
      nanoseconds: V,
    } = Cr(F, M, $, A, K, w, V, R)),
    {
      years: I,
      months: O,
      weeks: k,
      days: F,
      hours: M,
      minutes: $,
      seconds: A,
      milliseconds: K,
      microseconds: w,
      nanoseconds: V,
    }
  );
}
function Za(t, e, r, i, o, a) {
  let s = d.default.subtract(e, t);
  if (d.default.equal(s, Re))
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      microseconds: 0,
      nanoseconds: 0,
    };
  let c = x('%Temporal.Instant%'),
    h = new c(t),
    f = new c(e),
    m = vr(r, h, i),
    y = vr(r, f, i),
    {
      years: g,
      months: v,
      weeks: _,
      days: E,
    } = fo(
      n(m, q),
      n(m, z),
      n(m, G),
      n(m, te),
      n(m, ne),
      n(m, ie),
      n(m, oe),
      n(m, ae),
      n(m, se),
      n(y, q),
      n(y, z),
      n(y, G),
      n(y, te),
      n(y, ne),
      n(y, ie),
      n(y, oe),
      n(y, ae),
      n(y, se),
      i,
      o,
      a
    ),
    D = Er(h, r, i, g, v, _, 0, 0, 0, 0, 0, 0, 0),
    C = d.default.subtract(e, D),
    B = qe(D, r, i);
  ({nanoseconds: C, days: E} = co(C, B));
  let {
    hours: R,
    minutes: P,
    seconds: L,
    milliseconds: j,
    microseconds: Y,
    nanoseconds: M,
  } = Cr(0, 0, 0, 0, 0, 0, d.default.toNumber(C), 'hour');
  return {
    years: g,
    months: v,
    weeks: _,
    days: E,
    hours: R,
    minutes: P,
    seconds: L,
    milliseconds: j,
    microseconds: Y,
    nanoseconds: M,
  };
}
function Xt(t, e, r, i, o, a) {
  let s = gn.reduce((v, _) => {
      let E = _[0],
        D = _[1],
        C = _[2];
      return (r !== 'datetime' && C !== r) || i.includes(D) || v.push(D, E), v;
    }, []),
    c = yr(e, 'largestUnit', r, 'auto');
  if (i.includes(c))
    throw new RangeError(
      `largestUnit must be one of ${s.join(', ')}, not ${c}`
    );
  let h = Gt(e),
    f = Or(e, 'trunc');
  t === 'since' &&
    (f = (function (_) {
      switch (_) {
        case 'ceil':
          return 'floor';
        case 'floor':
          return 'ceil';
        case 'halfCeil':
          return 'halfFloor';
        case 'halfFloor':
          return 'halfCeil';
        default:
          return _;
      }
    })(f));
  let m = yr(e, 'smallestUnit', r, o);
  if (i.includes(m))
    throw new RangeError(
      `smallestUnit must be one of ${s.join(', ')}, not ${m}`
    );
  let y = pt(a, m);
  if ((c === 'auto' && (c = y), pt(c, m) !== c))
    throw new RangeError(
      `largestUnit ${c} cannot be smaller than smallestUnit ${m}`
    );
  let g = {
    hour: 24,
    minute: 60,
    second: 60,
    millisecond: 1e3,
    microsecond: 1e3,
    nanosecond: 1e3,
  }[m];
  return (
    g !== void 0 && Jt(h, g, !1),
    {largestUnit: c, roundingIncrement: h, roundingMode: f, smallestUnit: m}
  );
}
function zo(t, e, r, i) {
  let o = t === 'since' ? -1 : 1,
    a = Sr(r),
    s = Xt(t, lt(i), 'time', [], 'nanosecond', 'second'),
    c = n(e, H),
    h = n(a, H),
    {
      hours: f,
      minutes: m,
      seconds: y,
      milliseconds: g,
      microseconds: v,
      nanoseconds: _,
    } = mo(
      c,
      h,
      s.roundingIncrement,
      s.smallestUnit,
      s.largestUnit,
      s.roundingMode
    );
  return new (x('%Temporal.Duration%'))(
    0,
    0,
    0,
    0,
    o * f,
    o * m,
    o * y,
    o * g,
    o * v,
    o * _
  );
}
function Wo(t, e, r, i) {
  let o = t === 'since' ? -1 : 1,
    a = ve(r),
    s = n(e, S);
  oi(s, n(a, S), 'compute difference between dates');
  let c = lt(i),
    h = Xt(t, c, 'date', [], 'day', 'day');
  c.largestUnit = h.largestUnit;
  let {years: f, months: m, weeks: y, days: g} = et(s, e, a, c);
  return (
    (h.smallestUnit === 'day' && h.roundingIncrement === 1) ||
      ({
        years: f,
        months: m,
        weeks: y,
        days: g,
      } = Jr(
        f,
        m,
        y,
        g,
        0,
        0,
        0,
        0,
        0,
        0,
        h.roundingIncrement,
        h.smallestUnit,
        h.roundingMode,
        e
      )),
    new (x('%Temporal.Duration%'))(o * f, o * m, o * y, o * g, 0, 0, 0, 0, 0, 0)
  );
}
function Go(t, e, r, i) {
  let o = t === 'since' ? -1 : 1,
    a = ht(r),
    s = n(e, S);
  oi(s, n(a, S), 'compute difference between dates');
  let c = lt(i),
    h = Xt(t, c, 'datetime', [], 'nanosecond', 'day'),
    {
      years: f,
      months: m,
      weeks: y,
      days: g,
      hours: v,
      minutes: _,
      seconds: E,
      milliseconds: D,
      microseconds: C,
      nanoseconds: B,
    } = fo(
      n(e, q),
      n(e, z),
      n(e, G),
      n(e, te),
      n(e, ne),
      n(e, ie),
      n(e, oe),
      n(e, ae),
      n(e, se),
      n(a, q),
      n(a, z),
      n(a, G),
      n(a, te),
      n(a, ne),
      n(a, ie),
      n(a, oe),
      n(a, ae),
      n(a, se),
      s,
      h.largestUnit,
      c
    ),
    R = xt(e);
  return (
    ({
      years: f,
      months: m,
      weeks: y,
      days: g,
      hours: v,
      minutes: _,
      seconds: E,
      milliseconds: D,
      microseconds: C,
      nanoseconds: B,
    } = Jr(
      f,
      m,
      y,
      g,
      v,
      _,
      E,
      D,
      C,
      B,
      h.roundingIncrement,
      h.smallestUnit,
      h.roundingMode,
      R
    )),
    ({
      days: g,
      hours: v,
      minutes: _,
      seconds: E,
      milliseconds: D,
      microseconds: C,
      nanoseconds: B,
    } = Cr(g, v, _, E, D, C, B, h.largestUnit)),
    new (x('%Temporal.Duration%'))(
      o * f,
      o * m,
      o * y,
      o * g,
      o * v,
      o * _,
      o * E,
      o * D,
      o * C,
      o * B
    )
  );
}
function Jo(t, e, r, i) {
  let o = t === 'since' ? -1 : 1,
    a = Zr(r),
    s = Xt(t, lt(i), 'time', [], 'nanosecond', 'hour'),
    {
      hours: c,
      minutes: h,
      seconds: f,
      milliseconds: m,
      microseconds: y,
      nanoseconds: g,
    } = Ua(
      n(e, te),
      n(e, ne),
      n(e, ie),
      n(e, oe),
      n(e, ae),
      n(e, se),
      n(a, te),
      n(a, ne),
      n(a, ie),
      n(a, oe),
      n(a, ae),
      n(a, se)
    );
  return (
    ({
      hours: c,
      minutes: h,
      seconds: f,
      milliseconds: m,
      microseconds: y,
      nanoseconds: g,
    } = Jr(
      0,
      0,
      0,
      0,
      c,
      h,
      f,
      m,
      y,
      g,
      s.roundingIncrement,
      s.smallestUnit,
      s.roundingMode
    )),
    ({
      hours: c,
      minutes: h,
      seconds: f,
      milliseconds: m,
      microseconds: y,
      nanoseconds: g,
    } = Cr(0, c, h, f, m, y, g, s.largestUnit)),
    new (x('%Temporal.Duration%'))(
      0,
      0,
      0,
      0,
      o * c,
      o * h,
      o * f,
      o * m,
      o * y,
      o * g
    )
  );
}
function Vo(t, e, r, i) {
  let o = t === 'since' ? -1 : 1,
    a = Kt(r),
    s = n(e, S);
  oi(s, n(a, S), 'compute difference between months');
  let c = lt(i),
    h = Xt(t, c, 'date', ['week', 'day'], 'month', 'year');
  c.largestUnit = h.largestUnit;
  let f = Ne(s, ['monthCode', 'year']),
    m = ce(e, f, []);
  m.day = 1;
  let y = Gr(s, m),
    g = ce(a, f, []);
  g.day = 1;
  let v = Gr(s, g),
    {years: _, months: E} = et(s, y, v, c);
  return (
    (h.smallestUnit === 'month' && h.roundingIncrement === 1) ||
      ({years: _, months: E} = Jr(
        _,
        E,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        h.roundingIncrement,
        h.smallestUnit,
        h.roundingMode,
        y
      )),
    new (x('%Temporal.Duration%'))(o * _, o * E, 0, 0, 0, 0, 0, 0, 0, 0)
  );
}
function Xo(t, e, r, i) {
  let o = t === 'since' ? -1 : 1,
    a = Qt(r),
    s = n(e, S);
  oi(s, n(a, S), 'compute difference between dates');
  let c = lt(i),
    h = Xt(t, c, 'datetime', [], 'nanosecond', 'hour');
  c.largestUnit = h.largestUnit;
  let f = n(e, H),
    m = n(a, H),
    y,
    g,
    v,
    _,
    E,
    D,
    C,
    B,
    R,
    P;
  if (
    h.largestUnit !== 'year' &&
    h.largestUnit !== 'month' &&
    h.largestUnit !== 'week' &&
    h.largestUnit !== 'day'
  )
    (y = 0),
      (g = 0),
      (v = 0),
      (_ = 0),
      ({
        hours: E,
        minutes: D,
        seconds: C,
        milliseconds: B,
        microseconds: R,
        nanoseconds: P,
      } = mo(
        f,
        m,
        h.roundingIncrement,
        h.smallestUnit,
        h.largestUnit,
        h.roundingMode
      ));
  else {
    let L = n(e, pe);
    if (!Ba(L, n(a, pe)))
      throw new RangeError(
        "When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes."
      );
    ({
      years: y,
      months: g,
      weeks: v,
      days: _,
      hours: E,
      minutes: D,
      seconds: C,
      milliseconds: B,
      microseconds: R,
      nanoseconds: P,
    } = Za(f, m, L, s, h.largestUnit, c)),
      ({
        years: y,
        months: g,
        weeks: v,
        days: _,
        hours: E,
        minutes: D,
        seconds: C,
        milliseconds: B,
        microseconds: R,
        nanoseconds: P,
      } = Jr(
        y,
        g,
        v,
        _,
        E,
        D,
        C,
        B,
        R,
        P,
        h.roundingIncrement,
        h.smallestUnit,
        h.roundingMode,
        e
      )),
      ({
        years: y,
        months: g,
        weeks: v,
        days: _,
        hours: E,
        minutes: D,
        seconds: C,
        milliseconds: B,
        microseconds: R,
        nanoseconds: P,
      } = Ga(
        y,
        g,
        v,
        _,
        E,
        D,
        C,
        B,
        R,
        P,
        h.roundingIncrement,
        h.smallestUnit,
        h.roundingMode,
        e
      ));
  }
  return new (x('%Temporal.Duration%'))(
    o * y,
    o * g,
    o * v,
    o * _,
    o * E,
    o * D,
    o * C,
    o * B,
    o * R,
    o * P
  );
}
function mt(t, e, r, i, o, a, s, c) {
  let h = t,
    f = e,
    m = r,
    y = a,
    g = s;
  return (
    (h += i),
    (f += o),
    ({year: h, month: f} = On(h, f)),
    ({year: h, month: f, day: m} = Fn(h, f, m, c)),
    (g += 7 * y),
    (m += g),
    ({year: h, month: f, day: m} = li(h, f, m)),
    {year: h, month: f, day: m}
  );
}
function qa(t, e, r, i, o, a, s, c, h, f, m, y) {
  let g = t,
    v = e,
    _ = r,
    E = i,
    D = o,
    C = a;
  (g += s), (v += c), (_ += h), (E += f), (D += m), (C += y);
  let B = 0;
  return (
    ({
      deltaDays: B,
      hour: g,
      minute: v,
      second: _,
      millisecond: E,
      microsecond: D,
      nanosecond: C,
    } = Ur(g, v, _, E, D, C)),
    {
      deltaDays: B,
      hour: g,
      minute: v,
      second: _,
      millisecond: E,
      microsecond: D,
      nanosecond: C,
    }
  );
}
function za(t, e, r, i, o, a, s, c, h, f, m, y, g, v, _, E, D, C, B, R, P) {
  let L = pt(
      Ii(t, e, r, i, o, a, s, c, h, f),
      Ii(m, y, g, v, _, E, D, C, B, R)
    ),
    j,
    Y,
    M,
    $,
    A,
    K,
    w,
    V,
    l,
    u;
  if (P)
    if (de(P)) {
      let p = x('%Temporal.Duration%'),
        T = n(P, S),
        b = new p(t, e, r, i, 0, 0, 0, 0, 0, 0),
        I = new p(m, y, g, v, 0, 0, 0, 0, 0, 0),
        O = typeof T != 'string' ? ge(T, 'dateAdd') : void 0,
        k = ze(T, P, b, void 0, O),
        F = ze(T, k, I, void 0, O),
        N = pt('day', L),
        Z = He(null);
      (Z.largestUnit = N),
        ({years: j, months: Y, weeks: M, days: $} = et(T, P, F, Z)),
        ({
          days: $,
          hours: A,
          minutes: K,
          seconds: w,
          milliseconds: V,
          microseconds: l,
          nanoseconds: u,
        } = Cr(
          $,
          d.default.add(d.default.BigInt(o), d.default.BigInt(_)),
          d.default.add(d.default.BigInt(a), d.default.BigInt(E)),
          d.default.add(d.default.BigInt(s), d.default.BigInt(D)),
          d.default.add(d.default.BigInt(c), d.default.BigInt(C)),
          d.default.add(d.default.BigInt(h), d.default.BigInt(B)),
          d.default.add(d.default.BigInt(f), d.default.BigInt(R)),
          L
        ));
    } else {
      let p = x('%Temporal.Instant%'),
        T = n(P, pe),
        b = n(P, S),
        I = Er(n(P, Ke), T, b, t, e, r, i, o, a, s, c, h, f),
        O = Er(new p(I), T, b, m, y, g, v, _, E, D, C, B, R);
      L !== 'year' && L !== 'month' && L !== 'week' && L !== 'day'
        ? ((j = 0),
          (Y = 0),
          (M = 0),
          ($ = 0),
          ({
            hours: A,
            minutes: K,
            seconds: w,
            milliseconds: V,
            microseconds: l,
            nanoseconds: u,
          } = mo(n(P, H), O, 1, 'nanosecond', L, 'halfExpand')))
        : ({
            years: j,
            months: Y,
            weeks: M,
            days: $,
            hours: A,
            minutes: K,
            seconds: w,
            milliseconds: V,
            microseconds: l,
            nanoseconds: u,
          } = Za(n(P, H), O, T, b, L, He(null)));
    }
  else {
    if (L === 'year' || L === 'month' || L === 'week')
      throw new RangeError(
        'relativeTo is required for years, months, or weeks arithmetic'
      );
    (j = Y = M = 0),
      ({
        days: $,
        hours: A,
        minutes: K,
        seconds: w,
        milliseconds: V,
        microseconds: l,
        nanoseconds: u,
      } = Cr(
        i + v,
        d.default.add(d.default.BigInt(o), d.default.BigInt(_)),
        d.default.add(d.default.BigInt(a), d.default.BigInt(E)),
        d.default.add(d.default.BigInt(s), d.default.BigInt(D)),
        d.default.add(d.default.BigInt(c), d.default.BigInt(C)),
        d.default.add(d.default.BigInt(h), d.default.BigInt(B)),
        d.default.add(d.default.BigInt(f), d.default.BigInt(R)),
        L
      ));
  }
  return (
    Zn(j, Y, M, $, A, K, w, V, l, u),
    {
      years: j,
      months: Y,
      weeks: M,
      days: $,
      hours: A,
      minutes: K,
      seconds: w,
      milliseconds: V,
      microseconds: l,
      nanoseconds: u,
    }
  );
}
function Si(t, e, r, i, o, a, s) {
  let c = Re;
  (c = d.default.add(c, d.default.BigInt(s))),
    (c = d.default.add(c, d.default.multiply(d.default.BigInt(a), ye))),
    (c = d.default.add(c, d.default.multiply(d.default.BigInt(o), wr))),
    (c = d.default.add(c, d.default.multiply(d.default.BigInt(i), Yr))),
    (c = d.default.add(
      c,
      d.default.multiply(d.default.BigInt(r), d.default.BigInt(6e10))
    )),
    (c = d.default.add(
      c,
      d.default.multiply(d.default.BigInt(e), d.default.BigInt(36e11))
    ));
  let h = d.default.add(t, c);
  return dt(h), h;
}
function Oi(t, e, r, i, o, a, s, c, h, f, m, y, g, v, _, E, D, C, B, R, P) {
  let L = v,
    {
      deltaDays: j,
      hour: Y,
      minute: M,
      second: $,
      millisecond: A,
      microsecond: K,
      nanosecond: w,
    } = qa(i, o, a, s, c, h, _, E, D, C, B, R);
  L += j;
  let V = x('%Temporal.Duration%'),
    l = ze(f, Ir(t, e, r, f), new V(m, y, g, L, 0, 0, 0, 0, 0, 0), P);
  return {
    year: n(l, q),
    month: n(l, z),
    day: n(l, G),
    hour: Y,
    minute: M,
    second: $,
    millisecond: A,
    microsecond: K,
    nanosecond: w,
  };
}
function Er(t, e, r, i, o, a, s, c, h, f, m, y, g, v) {
  let _ = x('%Temporal.Duration%');
  if (Pr(i, o, a, s, 0, 0, 0, 0, 0, 0) === 0)
    return Si(n(t, H), c, h, f, m, y, g);
  let E = vr(e, t, r),
    D = ze(
      r,
      Ir(n(E, q), n(E, z), n(E, G), r),
      new _(i, o, a, s, 0, 0, 0, 0, 0, 0),
      v
    ),
    C = hr(
      n(D, q),
      n(D, z),
      n(D, G),
      n(E, te),
      n(E, ne),
      n(E, ie),
      n(E, oe),
      n(E, ae),
      n(E, se),
      r
    );
  return Si(n(cr(e, C, 'compatible'), H), c, h, f, m, y, g);
}
function Ko(t, e, r, i) {
  let o = t === 'subtract' ? -1 : 1,
    {
      years: a,
      months: s,
      weeks: c,
      days: h,
      hours: f,
      minutes: m,
      seconds: y,
      milliseconds: g,
      microseconds: v,
      nanoseconds: _,
    } = bt(r),
    E = Sn(he(i));
  return (
    ({
      years: a,
      months: s,
      weeks: c,
      days: h,
      hours: f,
      minutes: m,
      seconds: y,
      milliseconds: g,
      microseconds: v,
      nanoseconds: _,
    } = za(
      n(e, er),
      n(e, Ue),
      n(e, ur),
      n(e, rr),
      n(e, tr),
      n(e, nr),
      n(e, ir),
      n(e, or),
      n(e, ar),
      n(e, sr),
      o * a,
      o * s,
      o * c,
      o * h,
      o * f,
      o * m,
      o * y,
      o * g,
      o * v,
      o * _,
      E
    )),
    new (x('%Temporal.Duration%'))(a, s, c, h, f, m, y, g, v, _)
  );
}
function Qo(t, e, r) {
  let i = t === 'subtract' ? -1 : 1,
    {
      hours: o,
      minutes: a,
      seconds: s,
      milliseconds: c,
      microseconds: h,
      nanoseconds: f,
    } = (function (g, v) {
      let _ = bt(g);
      for (let E of v)
        if (_[E] !== 0)
          throw new RangeError(
            `Duration field ${E} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`
          );
      return _;
    })(r, ['years', 'months', 'weeks', 'days']),
    m = Si(n(e, H), i * o, i * a, i * s, i * c, i * h, i * f);
  return new (x('%Temporal.Instant%'))(m);
}
function Ho(t, e, r, i) {
  let o = t === 'subtract' ? -1 : 1,
    {
      years: a,
      months: s,
      weeks: c,
      days: h,
      hours: f,
      minutes: m,
      seconds: y,
      milliseconds: g,
      microseconds: v,
      nanoseconds: _,
    } = bt(r),
    E = he(i),
    D = n(e, S),
    {
      year: C,
      month: B,
      day: R,
      hour: P,
      minute: L,
      second: j,
      millisecond: Y,
      microsecond: M,
      nanosecond: $,
    } = Oi(
      n(e, q),
      n(e, z),
      n(e, G),
      n(e, te),
      n(e, ne),
      n(e, ie),
      n(e, oe),
      n(e, ae),
      n(e, se),
      D,
      o * a,
      o * s,
      o * c,
      o * h,
      o * f,
      o * m,
      o * y,
      o * g,
      o * v,
      o * _,
      E
    );
  return hr(C, B, R, P, L, j, Y, M, $, D);
}
function ea(t, e, r) {
  let i = t === 'subtract' ? -1 : 1,
    {
      hours: o,
      minutes: a,
      seconds: s,
      milliseconds: c,
      microseconds: h,
      nanoseconds: f,
    } = bt(r),
    {
      hour: m,
      minute: y,
      second: g,
      millisecond: v,
      microsecond: _,
      nanosecond: E,
    } = qa(
      n(e, te),
      n(e, ne),
      n(e, ie),
      n(e, oe),
      n(e, ae),
      n(e, se),
      i * o,
      i * a,
      i * s,
      i * c,
      i * h,
      i * f
    );
  return (
    ({
      hour: m,
      minute: y,
      second: g,
      millisecond: v,
      microsecond: _,
      nanosecond: E,
    } = Xn(m, y, g, v, _, E, 'reject')),
    new (x('%Temporal.PlainTime%'))(m, y, g, v, _, E)
  );
}
function ra(t, e, r, i) {
  let o = bt(r);
  t === 'subtract' &&
    (o = {
      years: -o.years,
      months: -o.months,
      weeks: -o.weeks,
      days: -o.days,
      hours: -o.hours,
      minutes: -o.minutes,
      seconds: -o.seconds,
      milliseconds: -o.milliseconds,
      microseconds: -o.microseconds,
      nanoseconds: -o.nanoseconds,
    });
  let {
    years: a,
    months: s,
    weeks: c,
    days: h,
    hours: f,
    minutes: m,
    seconds: y,
    milliseconds: g,
    microseconds: v,
    nanoseconds: _,
  } = o;
  ({days: h} = Cr(h, f, m, y, g, v, _, 'day'));
  let E = he(i),
    D = n(e, S),
    C = Ne(D, ['monthCode', 'year']),
    B = ce(e, C, []),
    R = He(null);
  Ot(R, B, []), (B.day = 1);
  let P = Gr(D, B),
    L = Pr(a, s, c, h, 0, 0, 0, 0, 0, 0),
    j = ge(D, 'dateAdd'),
    Y = x('%Temporal.Duration%');
  if (L < 0) {
    let A = ze(D, P, new Y(0, 1, 0, 0, 0, 0, 0, 0, 0, 0), void 0, j),
      K = ze(D, A, new Y(0, 0, 0, -1, 0, 0, 0, 0, 0, 0), void 0, j);
    (R.day = bn(D, K)), (P = Gr(D, R));
  }
  let M = new Y(a, s, c, h, 0, 0, 0, 0, 0, 0),
    $ = lt(E);
  return vt(D, ce(ze(D, P, M, E, j), C, []), $);
}
function ta(t, e, r, i) {
  let o = t === 'subtract' ? -1 : 1,
    {
      years: a,
      months: s,
      weeks: c,
      days: h,
      hours: f,
      minutes: m,
      seconds: y,
      milliseconds: g,
      microseconds: v,
      nanoseconds: _,
    } = bt(r),
    E = he(i),
    D = n(e, pe),
    C = n(e, S);
  return qe(
    Er(
      n(e, Ke),
      D,
      C,
      o * a,
      o * s,
      o * c,
      o * h,
      o * f,
      o * m,
      o * y,
      o * g,
      o * v,
      o * _,
      E
    ),
    D,
    C
  );
}
function pr(t, e, r) {
  if (d.default.equal(e, zt)) return t;
  let {quotient: i, remainder: o} = $e(t, e);
  if (d.default.equal(o, Re)) return t;
  let a = d.default.lessThan(o, Re) ? -1 : 1,
    s = kr(d.default.multiply(o, d.default.BigInt(2))),
    c = d.default.equal(s, e),
    h = d.default.greaterThan(s, e);
  switch (r) {
    case 'ceil':
      a > 0 && (i = d.default.add(i, d.default.BigInt(a)));
      break;
    case 'floor':
      a < 0 && (i = d.default.add(i, d.default.BigInt(a)));
      break;
    case 'expand':
      i = d.default.add(i, d.default.BigInt(a));
      break;
    case 'trunc':
      break;
    case 'halfCeil':
      (h || (c && a > 0)) && (i = d.default.add(i, d.default.BigInt(a)));
      break;
    case 'halfFloor':
      (h || (c && a < 0)) && (i = d.default.add(i, d.default.BigInt(a)));
      break;
    case 'halfExpand':
      (h || c) && (i = d.default.add(i, d.default.BigInt(a)));
      break;
    case 'halfTrunc':
      h && (i = d.default.add(i, d.default.BigInt(a)));
      break;
    case 'halfEven':
      (h ||
        (c &&
          d.default.toNumber(
            d.default.remainder(kr(i), d.default.BigInt(2))
          ) === 1)) &&
        (i = d.default.add(i, d.default.BigInt(a)));
  }
  return d.default.multiply(i, e);
}
function qn(t, e, r, i) {
  let {remainder: o} = ct(t, Nr),
    a = d.default.subtract(t, o),
    s = pr(o, d.default.BigInt(Xa[r] * e), i);
  return d.default.add(a, s);
}
function yo(t, e, r, i, o, a, s, c, h, f, m, y, g = 864e11) {
  let {
      deltaDays: v,
      hour: _,
      minute: E,
      second: D,
      millisecond: C,
      microsecond: B,
      nanosecond: R,
    } = go(i, o, a, s, c, h, f, m, y, g),
    {year: P, month: L, day: j} = li(t, e, r + v);
  return {
    year: P,
    month: L,
    day: j,
    hour: _,
    minute: E,
    second: D,
    millisecond: C,
    microsecond: B,
    nanosecond: R,
  };
}
function go(t, e, r, i, o, a, s, c, h, f = 864e11) {
  let m = Re;
  switch (c) {
    case 'day':
    case 'hour':
      m = d.default.BigInt(t);
    case 'minute':
      m = d.default.add(d.default.multiply(m, $r), d.default.BigInt(e));
    case 'second':
      m = d.default.add(d.default.multiply(m, $r), d.default.BigInt(r));
    case 'millisecond':
      m = d.default.add(d.default.multiply(m, ye), d.default.BigInt(i));
    case 'microsecond':
      m = d.default.add(d.default.multiply(m, ye), d.default.BigInt(o));
    case 'nanosecond':
      m = d.default.add(d.default.multiply(m, ye), d.default.BigInt(a));
  }
  let y = c === 'day' ? f : Xa[c],
    g = pr(m, d.default.BigInt(y * s), h),
    v = d.default.toNumber(d.default.divide(g, d.default.BigInt(y)));
  switch (c) {
    case 'day':
      return {
        deltaDays: v,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      };
    case 'hour':
      return Ur(v, 0, 0, 0, 0, 0);
    case 'minute':
      return Ur(t, v, 0, 0, 0, 0);
    case 'second':
      return Ur(t, e, v, 0, 0, 0);
    case 'millisecond':
      return Ur(t, e, r, v, 0, 0);
    case 'microsecond':
      return Ur(t, e, r, i, v, 0);
    case 'nanosecond':
      return Ur(t, e, r, i, o, v);
    default:
      throw new Error(`Invalid unit ${c}`);
  }
}
function Bn(t, e) {
  return ho(n(t, q), n(t, z), n(t, G), n(e, q), n(e, z), n(e, G), 'day').days;
}
function Xe(t, e, r, i) {
  let o = ze(t, e, r, void 0, i);
  return {relativeTo: o, days: Bn(e, o)};
}
function Wa(t, e, r, i, o) {
  let a = n(t, pe),
    s = n(t, S);
  return qe(Er(n(t, Ke), a, s, e, r, i, o, 0, 0, 0, 0, 0, 0), a, s);
}
function Ga(t, e, r, i, o, a, s, c, h, f, m, y, g, v) {
  let _ = t,
    E = e,
    D = r,
    C = i,
    B = o,
    R = a,
    P = s,
    L = c,
    j = h,
    Y = f;
  if (
    !X(v) ||
    y === 'year' ||
    y === 'month' ||
    y === 'week' ||
    y === 'day' ||
    (y === 'nanosecond' && m === 1)
  )
    return {
      years: _,
      months: E,
      weeks: D,
      days: C,
      hours: B,
      minutes: R,
      seconds: P,
      milliseconds: L,
      microseconds: j,
      nanoseconds: Y,
    };
  let M = Lt(0, B, R, P, L, j, Y, 0),
    $ = Pt(d.default.toNumber(M)),
    A = n(v, pe),
    K = n(v, S),
    w = Er(n(v, Ke), A, K, _, E, D, C, 0, 0, 0, 0, 0, 0),
    V = Er(
      new (x('%Temporal.Instant%'))(w),
      A,
      K,
      0,
      0,
      0,
      $,
      0,
      0,
      0,
      0,
      0,
      0
    ),
    l = d.default.subtract(V, w);
  return (
    d.default.greaterThanOrEqual(
      d.default.multiply(d.default.subtract(M, l), d.default.BigInt($)),
      Re
    ) &&
      (({
        years: _,
        months: E,
        weeks: D,
        days: C,
      } = za(_, E, D, C, 0, 0, 0, 0, 0, 0, 0, 0, 0, $, 0, 0, 0, 0, 0, 0, v)),
      (M = qn(d.default.subtract(M, l), m, y, g)),
      ({
        hours: B,
        minutes: R,
        seconds: P,
        milliseconds: L,
        microseconds: j,
        nanoseconds: Y,
      } = Cr(0, 0, 0, 0, 0, 0, d.default.toNumber(M), 'hour'))),
    {
      years: _,
      months: E,
      weeks: D,
      days: C,
      hours: B,
      minutes: R,
      seconds: P,
      milliseconds: L,
      microseconds: j,
      nanoseconds: Y,
    }
  );
}
function Jr(t, e, r, i, o, a, s, c, h, f, m, y, g, v) {
  let _ = t,
    E = e,
    D = r,
    C = i,
    B = o,
    R = a,
    P = s,
    L = c,
    j = h,
    Y = d.default.BigInt(f),
    M = x('%Temporal.Duration%'),
    $,
    A,
    K,
    w,
    V = v;
  if (V) {
    if (X(V)) (A = V), (V = ve(V));
    else if (!de(V))
      throw new TypeError('starting point must be PlainDate or ZonedDateTime');
    $ = n(V, S);
  }
  if (y === 'year' || y === 'month' || y === 'week' || y === 'day') {
    let l, u, p;
    (Y = Lt(0, B, R, P, L, j, f, 0)),
      A && (l = Wa(A, _, E, D, C)),
      ({days: u, nanoseconds: Y, dayLengthNs: p} = co(Y, l)),
      (K = d.default.BigInt(p)),
      (C += u),
      (B = R = P = L = j = 0);
  }
  switch (y) {
    case 'year': {
      if (!$)
        throw new RangeError('A starting point is required for years rounding');
      let l = new M(_),
        u = typeof $ != 'string' ? ge($, 'dateAdd') : void 0,
        p = ze($, V, l, void 0, u),
        T = ze($, V, new M(_, E, D), void 0, u);
      (V = p), (C += Bn(p, T));
      let b = ze($, V, new M(0, 0, 0, C), void 0, u),
        I = He(null);
      I.largestUnit = 'year';
      let O = et($, V, b, I).years;
      _ += O;
      let k = V;
      (V = ze($, V, new M(O), void 0, u)), (C -= Bn(k, V));
      let F = new M(C < 0 ? -1 : 1),
        {days: N} = Xe($, V, F, u);
      N = _e(N);
      let Z = d.default.multiply(d.default.BigInt(N), K);
      Y = d.default.add(
        d.default.add(
          d.default.multiply(Z, d.default.BigInt(_)),
          d.default.multiply(d.default.BigInt(C), K)
        ),
        Y
      );
      let U = pr(Y, d.default.multiply(Z, d.default.BigInt(m)), g);
      (w = Mr(Y, Z)),
        (_ = d.default.toNumber(d.default.divide(U, Z))),
        (Y = Re),
        (E = D = C = 0);
      break;
    }
    case 'month': {
      if (!$)
        throw new RangeError(
          'A starting point is required for months rounding'
        );
      let l = new M(_, E),
        u = typeof $ != 'string' ? ge($, 'dateAdd') : void 0,
        p = ze($, V, l, void 0, u),
        T = ze($, V, new M(_, E, D), void 0, u);
      (V = p), (C += Bn(p, T));
      let b = Pt(C),
        I = new M(0, C < 0 ? -1 : 1),
        O;
      for ({relativeTo: V, days: O} = Xe($, V, I, u); _e(C) >= _e(O); )
        (E += b), (C -= O), ({relativeTo: V, days: O} = Xe($, V, I, u));
      O = _e(O);
      let k = d.default.multiply(d.default.BigInt(O), K);
      Y = d.default.add(
        d.default.add(
          d.default.multiply(k, d.default.BigInt(E)),
          d.default.multiply(d.default.BigInt(C), K)
        ),
        Y
      );
      let F = pr(Y, d.default.multiply(k, d.default.BigInt(m)), g);
      (w = Mr(Y, k)),
        (E = d.default.toNumber(d.default.divide(F, k))),
        (Y = Re),
        (D = C = 0);
      break;
    }
    case 'week': {
      if (!$)
        throw new RangeError('A starting point is required for weeks rounding');
      let l = Pt(C),
        u = new M(0, 0, C < 0 ? -1 : 1),
        p = typeof $ != 'string' ? ge($, 'dateAdd') : void 0,
        T;
      for ({relativeTo: V, days: T} = Xe($, V, u, p); _e(C) >= _e(T); )
        (D += l), (C -= T), ({relativeTo: V, days: T} = Xe($, V, u, p));
      T = _e(T);
      let b = d.default.multiply(d.default.BigInt(T), K);
      Y = d.default.add(
        d.default.add(
          d.default.multiply(b, d.default.BigInt(D)),
          d.default.multiply(d.default.BigInt(C), K)
        ),
        Y
      );
      let I = pr(Y, d.default.multiply(b, d.default.BigInt(m)), g);
      (w = Mr(Y, b)),
        (D = d.default.toNumber(d.default.divide(I, b))),
        (Y = Re),
        (C = 0);
      break;
    }
    case 'day': {
      let l = K;
      Y = d.default.add(d.default.multiply(l, d.default.BigInt(C)), Y);
      let u = pr(Y, d.default.multiply(l, d.default.BigInt(m)), g);
      (w = Mr(Y, l)),
        (C = d.default.toNumber(d.default.divide(u, l))),
        (Y = Re);
      break;
    }
    case 'hour': {
      let u = d.default.multiply(d.default.BigInt(B), d.default.BigInt(36e11));
      (u = d.default.add(
        u,
        d.default.multiply(d.default.BigInt(R), d.default.BigInt(6e10))
      )),
        (u = d.default.add(u, d.default.multiply(d.default.BigInt(P), Yr))),
        (u = d.default.add(u, d.default.multiply(d.default.BigInt(L), wr))),
        (u = d.default.add(u, d.default.multiply(d.default.BigInt(j), ye))),
        (u = d.default.add(u, Y)),
        (w = Mr(u, d.default.BigInt(36e11)));
      let p = pr(u, d.default.BigInt(36e11 * m), g);
      (B = d.default.toNumber(d.default.divide(p, d.default.BigInt(36e11)))),
        (Y = Re),
        (R = P = L = j = 0);
      break;
    }
    case 'minute': {
      let u = d.default.multiply(d.default.BigInt(R), d.default.BigInt(6e10));
      (u = d.default.add(u, d.default.multiply(d.default.BigInt(P), Yr))),
        (u = d.default.add(u, d.default.multiply(d.default.BigInt(L), wr))),
        (u = d.default.add(u, d.default.multiply(d.default.BigInt(j), ye))),
        (u = d.default.add(u, Y)),
        (w = Mr(u, d.default.BigInt(6e10)));
      let p = pr(u, d.default.BigInt(6e10 * m), g);
      (R = d.default.toNumber(d.default.divide(p, d.default.BigInt(6e10)))),
        (Y = Re),
        (P = L = j = 0);
      break;
    }
    case 'second': {
      let u = d.default.multiply(d.default.BigInt(P), Yr);
      (u = d.default.add(u, d.default.multiply(d.default.BigInt(L), wr))),
        (u = d.default.add(u, d.default.multiply(d.default.BigInt(j), ye))),
        (u = d.default.add(u, Y)),
        (w = Mr(u, d.default.BigInt(1e9)));
      let p = pr(u, d.default.BigInt(1e9 * m), g);
      (P = d.default.toNumber(d.default.divide(p, d.default.BigInt(1e9)))),
        (Y = Re),
        (L = j = 0);
      break;
    }
    case 'millisecond': {
      let u = d.default.multiply(d.default.BigInt(L), wr);
      (u = d.default.add(u, d.default.multiply(d.default.BigInt(j), ye))),
        (u = d.default.add(u, Y)),
        (w = Mr(u, d.default.BigInt(1e6)));
      let p = pr(u, d.default.BigInt(1e6 * m), g);
      (L = d.default.toNumber(d.default.divide(p, d.default.BigInt(1e6)))),
        (Y = Re),
        (j = 0);
      break;
    }
    case 'microsecond': {
      let u = d.default.multiply(d.default.BigInt(j), ye);
      (u = d.default.add(u, Y)), (w = Mr(u, d.default.BigInt(1e3)));
      let p = pr(u, d.default.BigInt(1e3 * m), g);
      (j = d.default.toNumber(d.default.divide(p, d.default.BigInt(1e3)))),
        (Y = Re);
      break;
    }
    case 'nanosecond':
      (w = d.default.toNumber(Y)),
        (Y = pr(d.default.BigInt(Y), d.default.BigInt(m), g));
  }
  return {
    years: _,
    months: E,
    weeks: D,
    days: C,
    hours: B,
    minutes: R,
    seconds: P,
    milliseconds: L,
    microseconds: j,
    nanoseconds: d.default.toNumber(Y),
    total: w,
  };
}
function Hr(t, e, r, i, o, a) {
  for (let [s, c] of [
    [t, i],
    [e, o],
    [r, a],
  ])
    if (s !== c) return ft(s - c);
  return 0;
}
function ct(t, e) {
  let {quotient: r, remainder: i} = $e(t, e);
  return (
    d.default.lessThan(i, Re) &&
      ((r = d.default.subtract(r, zt)), (i = d.default.add(i, e))),
    {quotient: r, remainder: i}
  );
}
function Mt(t, e) {
  let {quotient: r, remainder: i} = $e(t, e);
  return br(i) || !Pn(t) == !Pn(e) ? r : d.default.subtract(r, zt);
}
function Mr(t, e) {
  let {quotient: r, remainder: i} = $e(t, e);
  return d.default.toNumber(r) + d.default.toNumber(i) / d.default.toNumber(e);
}
function zn(t) {
  let e = Ht(t);
  return globalThis.BigInt !== void 0 ? globalThis.BigInt(e.toString(10)) : e;
}
function Ht(t) {
  let e = t;
  if (typeof t == 'object') {
    let r = t[Symbol.toPrimitive];
    r && typeof r == 'function' && (e = Vn(r, t, ['number']));
  }
  if (typeof e == 'number')
    throw new TypeError('cannot convert number to bigint');
  return typeof e == 'bigint'
    ? d.default.BigInt(e.toString(10))
    : d.default.BigInt(e);
}
var po = (() => {
  let t = d.default.BigInt(Date.now() % 1e6);
  return () => {
    let e = d.default.BigInt(Date.now()),
      r = d.default.add(d.default.multiply(e, wr), t);
    return (
      (t = d.default.remainder(e, wr)),
      d.default.greaterThan(r, Nt) ? Nt : d.default.lessThan(r, rn) ? rn : r
    );
  };
})();
function Qr() {
  return new ga().resolvedOptions().timeZone;
}
function ft(t) {
  return t < 0 ? -1 : t > 0 ? 1 : t;
}
function he(t) {
  if (t === void 0) return He(null);
  if (be(t) && t !== null) return t;
  throw new TypeError(
    'Options parameter must be an object, not ' +
      (t === null ? 'null' : typeof t)
  );
}
function Ut(t, e) {
  let r = He(null);
  return (r[t] = e), r;
}
function lt(t) {
  let e = He(null);
  return Ot(e, he(t), []), e;
}
function it(t, e, r, i) {
  let o = t[e];
  if (o !== void 0) {
    if (((o = dr(o)), !r.includes(o)))
      throw new RangeError(`${e} must be one of ${r.join(', ')}, not ${o}`);
    return o;
  }
  return i;
}
function Vr(t) {
  return Ns.includes(jr(t));
}
function jr(t) {
  return t.replace(/[A-Z]/g, e => {
    let r = e.charCodeAt(0);
    return String.fromCharCode(r + 32);
  });
}
var Ja = new RegExp(`^${ma.source}$`);
function Va(t, e, r, i = t(e), o = t(r)) {
  let a = d.default.BigInt(e),
    s = d.default.BigInt(r),
    c = i,
    h = o;
  for (; d.default.greaterThan(d.default.subtract(s, a), zt); ) {
    let f = d.default.divide(d.default.add(a, s), d.default.BigInt(2)),
      m = t(f);
    if (m === c) (a = f), (c = m);
    else {
      if (m !== h)
        throw new Error(`invalid state in bisection ${c} - ${m} - ${h}`);
      (s = f), (h = m);
    }
  }
  return s;
}
var Xa = {
    hour: 36e11,
    minute: 6e10,
    second: 1e9,
    millisecond: 1e6,
    microsecond: 1e3,
    nanosecond: 1,
  },
  Ka = Symbol('date'),
  Qa = Symbol('ym'),
  Ha = Symbol('md'),
  es = Symbol('time'),
  rs = Symbol('datetime'),
  ts = Symbol('instant'),
  Rt = Symbol('original'),
  Ct = Symbol('timezone'),
  Dr = Symbol('calendar-id'),
  ns = Symbol('locale'),
  Bi = Symbol('options'),
  en = t => ({value: t, enumerable: !0, writable: !1, configurable: !0}),
  $t = globalThis.Intl.DateTimeFormat,
  Xr = Object.assign,
  Ls = Object.prototype.hasOwnProperty,
  Us = Reflect.apply;
function Dt(t, e) {
  let r = t[e];
  return (
    typeof r == 'function' && ((r = new $t(t[ns], r(t[Bi]))), (t[e] = r)), r
  );
}
function Tt(t, e = {}) {
  if (!(this instanceof Tt)) return new Tt(t, e);
  let r = e !== void 0,
    i = r ? Xr({}, e) : {},
    o = new $t(t, i),
    a = o.resolvedOptions();
  if (r) {
    let s = Xr({}, a);
    for (let c in s) Us(Ls, i, [c]) || delete s[c];
    this[Bi] = s;
  } else this[Bi] = i;
  (this[ns] = a.locale),
    (this[Rt] = o),
    (this[Ct] = a.timeZone),
    (this[Dr] = a.calendar),
    (this[Ka] = Ws),
    (this[Qa] = qs),
    (this[Ha] = zs),
    (this[es] = Zs),
    (this[rs] = Gs),
    (this[ts] = Js);
}
Object.defineProperty(Tt, 'name', {writable: !0, value: 'DateTimeFormat'}),
  (Tt.supportedLocalesOf = function (t, e) {
    return $t.supportedLocalesOf(t, e);
  });
var gi = {
  resolvedOptions: en(function () {
    return this[Rt].resolvedOptions();
  }),
  format: en(function (e, ...r) {
    let {instant: i, formatter: o} = Yt(e, this);
    return i && o ? o.format(i.epochMilliseconds) : this[Rt].format(e, ...r);
  }),
  formatRange: en(function (e, r) {
    if (Zt(e) || Zt(r)) {
      if (!is(e, r))
        throw new TypeError(
          'Intl.DateTimeFormat.formatRange accepts two values of the same type'
        );
      let {instant: i, formatter: o} = Yt(e, this),
        {instant: a, formatter: s} = Yt(r, this);
      if (i && a && o && s && o === s)
        return o.formatRange(i.epochMilliseconds, a.epochMilliseconds);
    }
    return this[Rt].formatRange(e, r);
  }),
};
'formatToParts' in $t.prototype &&
  (gi.formatToParts = en(function (e, ...r) {
    let {instant: i, formatter: o} = Yt(e, this);
    return i && o
      ? o.formatToParts(i.epochMilliseconds)
      : this[Rt].formatToParts(e, ...r);
  })),
  'formatRangeToParts' in $t.prototype &&
    (gi.formatRangeToParts = en(function (e, r) {
      if (Zt(e) || Zt(r)) {
        if (!is(e, r))
          throw new TypeError(
            'Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type'
          );
        let {instant: i, formatter: o} = Yt(e, this),
          {instant: a, formatter: s} = Yt(r, this);
        if (i && a && o && s && o === s)
          return o.formatRangeToParts(i.epochMilliseconds, a.epochMilliseconds);
      }
      return this[Rt].formatRangeToParts(e, r);
    })),
  (Tt.prototype = Object.create($t.prototype, gi)),
  Object.defineProperty(Tt, 'prototype', {
    writable: !1,
    enumerable: !1,
    configurable: !1,
  });
var Kr = Tt;
function Dn(t = {}, e = {}) {
  let r = Xr({}, t);
  for (let i of [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'weekday',
    'dayPeriod',
    'timeZoneName',
    'dateStyle',
    'timeStyle',
  ])
    (r[i] = i in e ? e[i] : r[i]),
      (r[i] !== !1 && r[i] !== void 0) || delete r[i];
  return r;
}
function Zs(t) {
  let e = Dn(t, {
    year: !1,
    month: !1,
    day: !1,
    weekday: !1,
    timeZoneName: !1,
    dateStyle: !1,
  });
  return (
    vo(e) ||
      (e = Xr({}, e, {hour: 'numeric', minute: 'numeric', second: 'numeric'})),
    e
  );
}
function qs(t) {
  let e = Dn(t, {
    day: !1,
    hour: !1,
    minute: !1,
    second: !1,
    weekday: !1,
    dayPeriod: !1,
    timeZoneName: !1,
    dateStyle: !1,
    timeStyle: !1,
  });
  return (
    'year' in e ||
      'month' in e ||
      (e = Xr(e, {year: 'numeric', month: 'numeric'})),
    e
  );
}
function zs(t) {
  let e = Dn(t, {
    year: !1,
    hour: !1,
    minute: !1,
    second: !1,
    weekday: !1,
    dayPeriod: !1,
    timeZoneName: !1,
    dateStyle: !1,
    timeStyle: !1,
  });
  return (
    'month' in e ||
      'day' in e ||
      (e = Xr({}, e, {month: 'numeric', day: 'numeric'})),
    e
  );
}
function Ws(t) {
  let e = Dn(t, {
    hour: !1,
    minute: !1,
    second: !1,
    dayPeriod: !1,
    timeZoneName: !1,
    timeStyle: !1,
  });
  return (
    wo(e) ||
      (e = Xr({}, e, {year: 'numeric', month: 'numeric', day: 'numeric'})),
    e
  );
}
function Gs(t) {
  let e = Dn(t, {timeZoneName: !1});
  return (
    vo(e) ||
      wo(e) ||
      (e = Xr({}, e, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })),
    e
  );
}
function Js(t) {
  let e = t;
  return (
    vo(e) ||
      wo(e) ||
      (e = Xr({}, e, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })),
    e
  );
}
function wo(t) {
  return (
    'year' in t ||
    'month' in t ||
    'day' in t ||
    'weekday' in t ||
    'dateStyle' in t
  );
}
function vo(t) {
  return (
    'hour' in t ||
    'minute' in t ||
    'second' in t ||
    'timeStyle' in t ||
    'dayPeriod' in t
  );
}
function Zt(t) {
  return de(t) || Me(t) || re(t) || X(t) || fe(t) || Ae(t) || je(t);
}
function is(t, e) {
  return (
    !(!Zt(t) || !Zt(e)) &&
    !(Me(t) && !Me(e)) &&
    !(de(t) && !de(e)) &&
    !(re(t) && !re(e)) &&
    !(X(t) && !X(e)) &&
    !(fe(t) && !fe(e)) &&
    !(Ae(t) && !Ae(e)) &&
    !(je(t) && !je(e))
  );
}
function Yt(t, e) {
  let r = x('%Temporal.PlainDateTime%');
  if (Me(t)) {
    let i = new r(
      1970,
      1,
      1,
      n(t, te),
      n(t, ne),
      n(t, ie),
      n(t, oe),
      n(t, ae),
      n(t, se),
      e[Dr]
    );
    return {instant: cr(e[Ct], i, 'compatible'), formatter: Dt(e, es)};
  }
  if (fe(t)) {
    let i = n(t, q),
      o = n(t, z),
      a = n(t, G),
      s = Ge(n(t, S));
    if (s !== e[Dr])
      throw new RangeError(
        `cannot format PlainYearMonth with calendar ${s} in locale with calendar ${e[Dr]}`
      );
    let c = new r(i, o, a, 12, 0, 0, 0, 0, 0, s);
    return {instant: cr(e[Ct], c, 'compatible'), formatter: Dt(e, Qa)};
  }
  if (Ae(t)) {
    let i = n(t, q),
      o = n(t, z),
      a = n(t, G),
      s = Ge(n(t, S));
    if (s !== e[Dr])
      throw new RangeError(
        `cannot format PlainMonthDay with calendar ${s} in locale with calendar ${e[Dr]}`
      );
    let c = new r(i, o, a, 12, 0, 0, 0, 0, 0, s);
    return {instant: cr(e[Ct], c, 'compatible'), formatter: Dt(e, Ha)};
  }
  if (de(t)) {
    let i = n(t, q),
      o = n(t, z),
      a = n(t, G),
      s = Ge(n(t, S));
    if (s !== 'iso8601' && s !== e[Dr])
      throw new RangeError(
        `cannot format PlainDate with calendar ${s} in locale with calendar ${e[Dr]}`
      );
    let c = new r(i, o, a, 12, 0, 0, 0, 0, 0, e[Dr]);
    return {instant: cr(e[Ct], c, 'compatible'), formatter: Dt(e, Ka)};
  }
  if (re(t)) {
    let i = n(t, q),
      o = n(t, z),
      a = n(t, G),
      s = n(t, te),
      c = n(t, ne),
      h = n(t, ie),
      f = n(t, oe),
      m = n(t, ae),
      y = n(t, se),
      g = Ge(n(t, S));
    if (g !== 'iso8601' && g !== e[Dr])
      throw new RangeError(
        `cannot format PlainDateTime with calendar ${g} in locale with calendar ${e[Dr]}`
      );
    let v = t;
    return (
      g === 'iso8601' && (v = new r(i, o, a, s, c, h, f, m, y, e[Dr])),
      {instant: cr(e[Ct], v, 'compatible'), formatter: Dt(e, rs)}
    );
  }
  if (X(t))
    throw new TypeError(
      'Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.'
    );
  return je(t) ? {instant: t, formatter: Dt(e, ts)} : {};
}
var sl = Object.freeze({__proto__: null, DateTimeFormat: Kr}),
  qt = class t {
    constructor(e) {
      if (arguments.length < 1)
        throw new TypeError('missing argument: epochNanoseconds is required');
      let r = Ht(e);
      dt(r), xr(this), le(this, H, r);
    }
    get epochSeconds() {
      if (!je(this)) throw new TypeError('invalid receiver');
      let e = n(this, H);
      return d.default.toNumber(Mt(e, Yr));
    }
    get epochMilliseconds() {
      if (!je(this)) throw new TypeError('invalid receiver');
      let e = d.default.BigInt(n(this, H));
      return d.default.toNumber(Mt(e, wr));
    }
    get epochMicroseconds() {
      if (!je(this)) throw new TypeError('invalid receiver');
      return zn(Mt(d.default.BigInt(n(this, H)), ye));
    }
    get epochNanoseconds() {
      if (!je(this)) throw new TypeError('invalid receiver');
      return zn(d.default.BigInt(n(this, H)));
    }
    add(e) {
      if (!je(this)) throw new TypeError('invalid receiver');
      return Qo('add', this, e);
    }
    subtract(e) {
      if (!je(this)) throw new TypeError('invalid receiver');
      return Qo('subtract', this, e);
    }
    until(e, r) {
      if (!je(this)) throw new TypeError('invalid receiver');
      return zo('until', this, e, r);
    }
    since(e, r) {
      if (!je(this)) throw new TypeError('invalid receiver');
      return zo('since', this, e, r);
    }
    round(e) {
      if (!je(this)) throw new TypeError('invalid receiver');
      if (e === void 0) throw new TypeError('options parameter is required');
      let r = typeof e == 'string' ? Ut('smallestUnit', e) : he(e),
        i = Gt(r),
        o = Or(r, 'halfExpand'),
        a = yr(r, 'smallestUnit', 'time', gt);
      Jt(
        i,
        {
          hour: 24,
          minute: 1440,
          second: 86400,
          millisecond: 864e5,
          microsecond: 864e8,
          nanosecond: 864e11,
        }[a],
        !0
      );
      let s = qn(n(this, H), i, a, o);
      return new t(s);
    }
    equals(e) {
      if (!je(this)) throw new TypeError('invalid receiver');
      let r = Sr(e),
        i = n(this, H),
        o = n(r, H);
      return d.default.equal(d.default.BigInt(i), d.default.BigInt(o));
    }
    toString(e) {
      if (!je(this)) throw new TypeError('invalid receiver');
      let r = he(e),
        i = wn(r),
        o = Or(r, 'trunc'),
        a = yr(r, 'smallestUnit', 'time', void 0);
      if (a === 'hour')
        throw new RangeError(
          'smallestUnit must be a time unit other than "hour"'
        );
      let s = r.timeZone;
      s !== void 0 && (s = Qe(s));
      let {precision: c, unit: h, increment: f} = vn(a, i),
        m = qn(n(this, H), f, h, o);
      return No(new t(m), s, c);
    }
    toJSON() {
      if (!je(this)) throw new TypeError('invalid receiver');
      return No(this, void 0, 'auto');
    }
    toLocaleString(e, r) {
      if (!je(this)) throw new TypeError('invalid receiver');
      return new Kr(e, r).format(this);
    }
    valueOf() {
      throw new TypeError(
        'use compare() or equals() to compare Temporal.Instant'
      );
    }
    toZonedDateTime(e) {
      if (!je(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('invalid argument in toZonedDateTime');
      let r = e.calendar;
      if (r === void 0)
        throw new TypeError('missing calendar property in toZonedDateTime');
      let i = gr(r),
        o = e.timeZone;
      if (o === void 0)
        throw new TypeError('missing timeZone property in toZonedDateTime');
      let a = Qe(o);
      return qe(n(this, H), a, i);
    }
    toZonedDateTimeISO(e) {
      if (!je(this)) throw new TypeError('invalid receiver');
      let r = Qe(e);
      return qe(n(this, H), r, 'iso8601');
    }
    static fromEpochSeconds(e) {
      let r = Ft(e),
        i = d.default.multiply(d.default.BigInt(r), Yr);
      return dt(i), new t(i);
    }
    static fromEpochMilliseconds(e) {
      let r = Ft(e),
        i = d.default.multiply(d.default.BigInt(r), wr);
      return dt(i), new t(i);
    }
    static fromEpochMicroseconds(e) {
      let r = Ht(e),
        i = d.default.multiply(r, ye);
      return dt(i), new t(i);
    }
    static fromEpochNanoseconds(e) {
      let r = Ht(e);
      return dt(r), new t(r);
    }
    static from(e) {
      return je(e) ? new t(n(e, H)) : Sr(e);
    }
    static compare(e, r) {
      let i = Sr(e),
        o = Sr(r),
        a = n(i, H),
        s = n(o, H);
      return d.default.lessThan(a, s)
        ? -1
        : d.default.greaterThan(a, s)
        ? 1
        : 0;
    }
  };
Ar(qt, 'Temporal.Instant');
var os = Array.prototype.includes,
  Vs = Array.prototype.push,
  Xs = globalThis.Intl.DateTimeFormat,
  Ks = Array.prototype.sort,
  Qs = Math.abs,
  Hs = Math.floor,
  pi = Object.create,
  Mi = Object.entries,
  as = Set,
  na = Reflect.ownKeys,
  Ve = Set.prototype.add,
  ss = Set.prototype.values,
  De = {},
  Ie = class {
    constructor(e) {
      if (arguments.length < 1)
        throw new RangeError('missing argument: id is required');
      let r = dr(e);
      if (!Vr(r)) throw new RangeError(`invalid calendar identifier ${r}`);
      xr(this), le(this, ke, jr(r));
    }
    get id() {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return n(this, ke);
    }
    dateFromFields(e, r) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('invalid fields');
      let i = he(r),
        o = n(this, ke);
      return De[o].dateFromFields(e, i, o);
    }
    yearMonthFromFields(e, r) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('invalid fields');
      let i = he(r),
        o = n(this, ke);
      return De[o].yearMonthFromFields(e, i, o);
    }
    monthDayFromFields(e, r) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('invalid fields');
      let i = he(r),
        o = n(this, ke);
      return De[o].monthDayFromFields(e, i, o);
    }
    fields(e) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let r = [],
        i = new Set([
          'year',
          'month',
          'monthCode',
          'day',
          'hour',
          'minute',
          'second',
          'millisecond',
          'microsecond',
          'nanosecond',
        ]);
      for (let o of e) {
        if (typeof o != 'string') throw new TypeError('invalid fields');
        if (!i.has(o)) throw new RangeError(`invalid field name ${o}`);
        i.delete(o), Vs.call(r, o);
      }
      return De[n(this, ke)].fields(r);
    }
    mergeFields(e, r) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let i = Yo(e),
        o = pi(null);
      Ot(o, i, [], [void 0]);
      let a = Yo(r),
        s = pi(null);
      Ot(s, a, [], [void 0]);
      let c = na(s),
        h = De[n(this, ke)].fieldKeysToIgnore(c),
        f = pi(null),
        m = na(o);
      for (let y of m) {
        let g;
        (g = Q(os, h, [y]) ? s[y] : o[y]), g !== void 0 && (f[y] = g);
      }
      return Ot(f, s, []), f;
    }
    dateAdd(e, r, i) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let o = ve(e),
        a = Bt(r),
        s = Ye(he(i)),
        {days: c} = Cr(
          n(a, rr),
          n(a, tr),
          n(a, nr),
          n(a, ir),
          n(a, or),
          n(a, ar),
          n(a, sr),
          'day'
        ),
        h = n(this, ke);
      return De[h].dateAdd(o, n(a, er), n(a, Ue), n(a, ur), c, s, h);
    }
    dateUntil(e, r, i) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let o = ve(e),
        a = ve(r),
        s = yr(he(i), 'largestUnit', 'date', 'auto');
      s === 'auto' && (s = 'day');
      let {
        years: c,
        months: h,
        weeks: f,
        days: m,
      } = De[n(this, ke)].dateUntil(o, a, s);
      return new (x('%Temporal.Duration%'))(c, h, f, m, 0, 0, 0, 0, 0, 0);
    }
    year(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return fe(r) || (r = ve(r)), De[n(this, ke)].year(r);
    }
    month(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      if (Ae(r)) throw new TypeError('use monthCode on PlainMonthDay instead');
      return fe(r) || (r = ve(r)), De[n(this, ke)].month(r);
    }
    monthCode(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return fe(r) || Ae(r) || (r = ve(r)), De[n(this, ke)].monthCode(r);
    }
    day(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return Ae(r) || (r = ve(r)), De[n(this, ke)].day(r);
    }
    era(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return fe(r) || (r = ve(r)), De[n(this, ke)].era(r);
    }
    eraYear(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return fe(r) || (r = ve(r)), De[n(this, ke)].eraYear(r);
    }
    dayOfWeek(e) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let r = ve(e);
      return De[n(this, ke)].dayOfWeek(r);
    }
    dayOfYear(e) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let r = ve(e);
      return De[n(this, ke)].dayOfYear(r);
    }
    weekOfYear(e) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let r = ve(e);
      return De[n(this, ke)].weekOfYear(r);
    }
    yearOfWeek(e) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let r = ve(e);
      return De[n(this, ke)].yearOfWeek(r);
    }
    daysInWeek(e) {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      let r = ve(e);
      return De[n(this, ke)].daysInWeek(r);
    }
    daysInMonth(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return fe(r) || (r = ve(r)), De[n(this, ke)].daysInMonth(r);
    }
    daysInYear(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return fe(r) || (r = ve(r)), De[n(this, ke)].daysInYear(r);
    }
    monthsInYear(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return fe(r) || (r = ve(r)), De[n(this, ke)].monthsInYear(r);
    }
    inLeapYear(e) {
      let r = e;
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return fe(r) || (r = ve(r)), De[n(this, ke)].inLeapYear(r);
    }
    toString() {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return n(this, ke);
    }
    toJSON() {
      if (!Oe(this)) throw new TypeError('invalid receiver');
      return n(this, ke);
    }
    static from(e) {
      return Vt(gr(e));
    }
  };
function To(t) {
  if (!t.startsWith('M'))
    throw new RangeError(
      `Invalid month code: ${t}.  Month codes must start with M.`
    );
  let e = +t.slice(1);
  if (isNaN(e)) throw new RangeError(`Invalid month code: ${t}`);
  return e;
}
function Wr(t, e = !1) {
  return `M${t.toString().padStart(2, '0')}${e ? 'L' : ''}`;
}
function Mn(t, e, r = 12) {
  let {month: i, monthCode: o} = t;
  if (o === void 0) {
    if (i === void 0)
      throw new TypeError('Either month or monthCode are required');
    e === 'reject' && We(i, 1, r),
      e === 'constrain' && (i = mr(i, 1, r)),
      (o = Wr(i));
  } else {
    let a = To(o);
    if (i !== void 0 && i !== a)
      throw new RangeError(
        `monthCode ${o} and month ${i} must match if both are present`
      );
    if (o !== Wr(a)) throw new RangeError(`Invalid month code: ${o}`);
    if (((i = a), i < 1 || i > r))
      throw new RangeError(`Invalid monthCode: ${o}`);
  }
  return {...t, month: i, monthCode: o};
}
Ar(Ie, 'Temporal.Calendar'),
  Se('Temporal.Calendar.from', Ie.from),
  Se('Temporal.Calendar.prototype.dateAdd', Ie.prototype.dateAdd),
  Se('Temporal.Calendar.prototype.dateFromFields', Ie.prototype.dateFromFields),
  Se('Temporal.Calendar.prototype.dateUntil', Ie.prototype.dateUntil),
  Se('Temporal.Calendar.prototype.day', Ie.prototype.day),
  Se('Temporal.Calendar.prototype.dayOfWeek', Ie.prototype.dayOfWeek),
  Se('Temporal.Calendar.prototype.dayOfYear', Ie.prototype.dayOfYear),
  Se('Temporal.Calendar.prototype.daysInMonth', Ie.prototype.daysInMonth),
  Se('Temporal.Calendar.prototype.daysInWeek', Ie.prototype.daysInWeek),
  Se('Temporal.Calendar.prototype.daysInYear', Ie.prototype.daysInYear),
  Se('Temporal.Calendar.prototype.era', Ie.prototype.era),
  Se('Temporal.Calendar.prototype.eraYear', Ie.prototype.eraYear),
  Se('Temporal.Calendar.prototype.fields', Ie.prototype.fields),
  Se('Temporal.Calendar.prototype.inLeapYear', Ie.prototype.inLeapYear),
  Se('Temporal.Calendar.prototype.mergeFields', Ie.prototype.mergeFields),
  Se('Temporal.Calendar.prototype.month', Ie.prototype.month),
  Se('Temporal.Calendar.prototype.monthCode', Ie.prototype.monthCode),
  Se(
    'Temporal.Calendar.prototype.monthDayFromFields',
    Ie.prototype.monthDayFromFields
  ),
  Se('Temporal.Calendar.prototype.monthsInYear', Ie.prototype.monthsInYear),
  Se('Temporal.Calendar.prototype.weekOfYear', Ie.prototype.weekOfYear),
  Se('Temporal.Calendar.prototype.year', Ie.prototype.year),
  Se(
    'Temporal.Calendar.prototype.yearMonthFromFields',
    Ie.prototype.yearMonthFromFields
  ),
  Se('Temporal.Calendar.prototype.yearOfWeek', Ie.prototype.yearOfWeek),
  (De.iso8601 = {
    dateFromFields(t, e, r) {
      let i = ce(t, ['day', 'month', 'monthCode', 'year'], ['year', 'day']),
        o = Ye(e);
      i = Mn(i);
      let {year: a, month: s, day: c} = i;
      return ({year: a, month: s, day: c} = Fn(a, s, c, o)), Ir(a, s, c, r);
    },
    yearMonthFromFields(t, e, r) {
      let i = ce(t, ['month', 'monthCode', 'year'], ['year']),
        o = Ye(e);
      i = Mn(i);
      let {year: a, month: s} = i;
      return (
        ({year: a, month: s} = (function (h, f, m) {
          let y = h,
            g = f;
          switch (m) {
            case 'reject':
              Fr(y, g, 1);
              break;
            case 'constrain':
              ({year: y, month: g} = Aa(y, g));
          }
          return {year: y, month: g};
        })(a, s, o)),
        nn(a, s, r, 1)
      );
    },
    monthDayFromFields(t, e, r) {
      let i = ce(t, ['day', 'month', 'monthCode', 'year'], ['day']),
        o = Ye(e);
      if (i.month !== void 0 && i.year === void 0 && i.monthCode === void 0)
        throw new TypeError('either year or monthCode required with month');
      let a = i.monthCode === void 0;
      i = Mn(i);
      let {month: s, day: c, year: h} = i;
      return (
        ({month: s, day: c} = Fn(a ? h : 1972, s, c, o)), tn(s, c, r, 1972)
      );
    },
    fields: t => t,
    fieldKeysToIgnore(t) {
      let e = new as();
      for (let r = 0; r < t.length; r++) {
        let i = t[r];
        Q(Ve, e, [i]),
          i === 'month'
            ? Q(Ve, e, ['monthCode'])
            : i === 'monthCode' && Q(Ve, e, ['month']);
      }
      return [...Q(ss, e, [])];
    },
    dateAdd(t, e, r, i, o, a, s) {
      let c = n(t, q),
        h = n(t, z),
        f = n(t, G);
      return (
        ({year: c, month: h, day: f} = mt(c, h, f, e, r, i, o, a)),
        Ir(c, h, f, s)
      );
    },
    dateUntil: (t, e, r) =>
      ho(n(t, q), n(t, z), n(t, G), n(e, q), n(e, z), n(e, G), r),
    year: t => n(t, q),
    era() {},
    eraYear() {},
    month: t => n(t, z),
    monthCode: t => Wr(n(t, z)),
    day: t => n(t, G),
    dayOfWeek: t => ki(n(t, q), n(t, z), n(t, G)),
    dayOfYear: t => Un(n(t, q), n(t, z), n(t, G)),
    weekOfYear: t => Zo(n(t, q), n(t, z), n(t, G)).week,
    yearOfWeek: t => Zo(n(t, q), n(t, z), n(t, G)).year,
    daysInWeek: () => 7,
    daysInMonth: t => zr(n(t, q), n(t, z)),
    daysInYear(t) {
      let e = t;
      return Le(e, q) || (e = ve(e)), nt(n(e, q)) ? 366 : 365;
    },
    monthsInYear: () => 12,
    inLeapYear(t) {
      let e = t;
      return Le(e, q) || (e = ve(e)), nt(n(e, q));
    },
  });
var Fe = class t {
  constructor(e) {
    if (
      ((this.map = new Map()),
      (this.calls = 0),
      (this.hits = 0),
      (this.misses = 0),
      (this.now = globalThis.performance
        ? globalThis.performance.now()
        : Date.now()),
      e !== void 0)
    ) {
      let r = 0;
      for (let i of e.map.entries()) {
        if (++r > t.MAX_CACHE_ENTRIES) break;
        this.map.set(...i);
      }
    }
  }
  get(e) {
    let r = this.map.get(e);
    return r && (this.hits++, this.report()), this.calls++, r;
  }
  set(e, r) {
    this.map.set(e, r), this.misses++, this.report();
  }
  report() {}
  setObject(e) {
    if (t.objectMap.get(e)) throw new RangeError('object already cached');
    t.objectMap.set(e, this), this.report();
  }
  static getCacheForObject(e) {
    let r = t.objectMap.get(e);
    return r || ((r = new t()), t.objectMap.set(e, r)), r;
  }
};
function ls({isoYear: t, isoMonth: e, isoDay: r}) {
  return `${Et(t)}-${Ce(e)}-${Ce(r)}T00:00Z`;
}
function wi(t, e) {
  return {
    years: t.year - e.year,
    months: t.month - e.month,
    days: t.day - e.day,
  };
}
(Fe.objectMap = new WeakMap()), (Fe.MAX_CACHE_ENTRIES = 1e3);
var ot = class {
    constructor() {
      (this.eraLength = 'short'),
        (this.hasEra = !0),
        (this.erasBeginMidYear = !1);
    }
    getFormatter() {
      return (
        this.formatter === void 0 &&
          (this.formatter = new Xs(`en-US-u-ca-${this.id}`, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            era: this.eraLength,
            timeZone: 'UTC',
          })),
        this.formatter
      );
    }
    isoToCalendarDate(e, r) {
      let {year: i, month: o, day: a} = e,
        s = JSON.stringify({
          func: 'isoToCalendarDate',
          isoYear: i,
          isoMonth: o,
          isoDay: a,
          id: this.id,
        }),
        c = r.get(s);
      if (c) return c;
      let h = this.getFormatter(),
        f,
        m;
      try {
        (m = ls({isoYear: i, isoMonth: o, isoDay: a})),
          (f = h.formatToParts(new Date(m)));
      } catch {
        throw new RangeError(
          `Invalid ISO date: ${JSON.stringify({
            isoYear: i,
            isoMonth: o,
            isoDay: a,
          })}`
        );
      }
      let y = {};
      for (let {type: v, value: _} of f) {
        if (
          (v === 'year' && (y.eraYear = +_),
          v === 'relatedYear' && (y.eraYear = +_),
          v === 'month')
        ) {
          let E = /^([0-9]*)(.*?)$/.exec(_);
          if (!E || E.length != 3 || (!E[1] && !E[2]))
            throw new RangeError(`Unexpected month: ${_}`);
          if (((y.month = E[1] ? +E[1] : 1), y.month < 1))
            throw new RangeError(
              `Invalid month ${_} from ${m}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`
            );
          if (y.month > 13)
            throw new RangeError(
              `Invalid month ${_} from ${m}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`
            );
          E[2] && (y.monthExtra = E[2]);
        }
        v === 'day' && (y.day = +_),
          this.hasEra &&
            v === 'era' &&
            _ != null &&
            _ !== '' &&
            ((_ = _.split(' (')[0]),
            (y.era = _.normalize('NFD')
              .replace(/[^-0-9 \p{L}]/gu, '')
              .replace(' ', '-')
              .toLowerCase()));
      }
      if (y.eraYear === void 0)
        throw new RangeError(
          `Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`
        );
      if (this.reviseIntlEra) {
        let {era: v, eraYear: _} = this.reviseIntlEra(y, e);
        (y.era = v), (y.eraYear = _);
      }
      this.checkIcuBugs && this.checkIcuBugs(e);
      let g = this.adjustCalendarDate(y, r, 'constrain', !0);
      if (g.year === void 0)
        throw new RangeError(`Missing year converting ${JSON.stringify(e)}`);
      if (g.month === void 0)
        throw new RangeError(`Missing month converting ${JSON.stringify(e)}`);
      if (g.day === void 0)
        throw new RangeError(`Missing day converting ${JSON.stringify(e)}`);
      return (
        r.set(s, g),
        ['constrain', 'reject'].forEach(v => {
          let _ = JSON.stringify({
            func: 'calendarToIsoDate',
            year: g.year,
            month: g.month,
            day: g.day,
            overflow: v,
            id: this.id,
          });
          r.set(_, e);
        }),
        g
      );
    }
    validateCalendarDate(e) {
      let {
        era: r,
        month: i,
        year: o,
        day: a,
        eraYear: s,
        monthCode: c,
        monthExtra: h,
      } = e;
      if (h !== void 0) throw new RangeError('Unexpected `monthExtra` value');
      if (o === void 0 && s === void 0)
        throw new TypeError('year or eraYear is required');
      if (i === void 0 && c === void 0)
        throw new TypeError('month or monthCode is required');
      if (a === void 0) throw new RangeError('Missing day');
      if (c !== void 0) {
        if (typeof c != 'string')
          throw new RangeError('monthCode must be a string, not ' + typeof c);
        if (!/^M([01]?\d)(L?)$/.test(c))
          throw new RangeError(`Invalid monthCode: ${c}`);
      }
      if (this.constantEra) {
        if (r !== void 0 && r !== this.constantEra)
          throw new RangeError(`era must be ${this.constantEra}, not ${r}`);
        if (s !== void 0 && o !== void 0 && s !== o)
          throw new RangeError(`eraYear ${s} does not match year ${o}`);
      }
      if (this.hasEra && (e.era === void 0) != (e.eraYear === void 0))
        throw new RangeError(
          "properties 'era' and 'eraYear' must be provided together"
        );
    }
    adjustCalendarDate(e, r, i = 'constrain', o = !1) {
      if (this.calendarType === 'lunisolar')
        throw new RangeError('Override required for lunisolar calendars');
      let a = e;
      if ((this.validateCalendarDate(a), this.constantEra)) {
        let {year: f, eraYear: m} = a;
        a = {
          ...a,
          era: this.constantEra,
          year: f !== void 0 ? f : m,
          eraYear: m !== void 0 ? m : f,
        };
      }
      let s = this.monthsInYear(a, r),
        {month: c, monthCode: h} = a;
      return (
        ({month: c, monthCode: h} = Mn(a, i, s)), {...a, month: c, monthCode: h}
      );
    }
    regulateMonthDayNaive(e, r, i) {
      let o = this.monthsInYear(e, i),
        {month: a, day: s} = e;
      return (
        r === 'reject'
          ? (We(a, 1, o), We(s, 1, this.maximumMonthLength(e)))
          : ((a = mr(a, 1, o)),
            (s = mr(s, 1, this.maximumMonthLength({...e, month: a})))),
        {...e, month: a, day: s}
      );
    }
    calendarToIsoDate(e, r = 'constrain', i) {
      let o = e,
        a = this.adjustCalendarDate(e, i, r, !1);
      a = this.regulateMonthDayNaive(a, r, i);
      let {year: s, month: c, day: h} = a,
        f = JSON.stringify({
          func: 'calendarToIsoDate',
          year: s,
          month: c,
          day: h,
          overflow: r,
          id: this.id,
        }),
        m,
        y = i.get(f);
      if (
        y ||
        (o.year !== void 0 &&
          o.month !== void 0 &&
          o.day !== void 0 &&
          (o.year !== a.year || o.month !== a.month || o.day !== a.day) &&
          ((m = JSON.stringify({
            func: 'calendarToIsoDate',
            year: o.year,
            month: o.month,
            day: o.day,
            overflow: r,
            id: this.id,
          })),
          (y = i.get(m)),
          y))
      )
        return y;
      let g = this.estimateIsoDate({year: s, month: c, day: h}),
        v = B => {
          let R = this.addDaysIso(g, B);
          if (a.day > this.minimumMonthLength(a)) {
            let P = this.isoToCalendarDate(R, i);
            for (; P.month !== c || P.year !== s; ) {
              if (r === 'reject')
                throw new RangeError(
                  `day ${h} does not exist in month ${c} of year ${s}`
                );
              (R = this.addDaysIso(R, -1)), (P = this.isoToCalendarDate(R, i));
            }
          }
          return R;
        },
        _ = 0,
        E = this.isoToCalendarDate(g, i),
        D = wi(a, E);
      if (D.years !== 0 || D.months !== 0 || D.days !== 0) {
        let B = 365 * D.years + 30 * D.months + D.days;
        (g = this.addDaysIso(g, B)),
          (E = this.isoToCalendarDate(g, i)),
          (D = wi(a, E)),
          D.years === 0 && D.months === 0
            ? (g = v(D.days))
            : (_ = this.compareCalendarDates(a, E));
      }
      let C = 8;
      for (; _; ) {
        g = this.addDaysIso(g, _ * C);
        let B = E;
        E = this.isoToCalendarDate(g, i);
        let R = _;
        if (((_ = this.compareCalendarDates(a, E)), _)) {
          if (((D = wi(a, E)), D.years === 0 && D.months === 0))
            (g = v(D.days)), (_ = 0);
          else if (R && _ !== R)
            if (C > 1) C /= 2;
            else {
              if (r === 'reject')
                throw new RangeError(
                  `Can't find ISO date from calendar date: ${JSON.stringify({
                    ...o,
                  })}`
                );
              this.compareCalendarDates(E, B) > 0 &&
                (g = this.addDaysIso(g, -1)),
                (_ = 0);
            }
        }
      }
      if (
        (i.set(f, g),
        m && i.set(m, g),
        a.year === void 0 ||
          a.month === void 0 ||
          a.day === void 0 ||
          a.monthCode === void 0 ||
          (this.hasEra && (a.era === void 0 || a.eraYear === void 0)))
      )
        throw new RangeError('Unexpected missing property');
      return g;
    }
    temporalToCalendarDate(e, r) {
      let i = {year: n(e, q), month: n(e, z), day: n(e, G)};
      return this.isoToCalendarDate(i, r);
    }
    compareCalendarDates(e, r) {
      let i = ce(e, ['day', 'month', 'year'], ['day', 'month', 'year']),
        o = ce(r, ['day', 'month', 'year'], ['day', 'month', 'year']);
      return i.year !== o.year
        ? ft(i.year - o.year)
        : i.month !== o.month
        ? ft(i.month - o.month)
        : i.day !== o.day
        ? ft(i.day - o.day)
        : 0;
    }
    regulateDate(e, r = 'constrain', i) {
      let o = this.calendarToIsoDate(e, r, i);
      return this.isoToCalendarDate(o, i);
    }
    addDaysIso(e, r) {
      return mt(e.year, e.month, e.day, 0, 0, 0, r, 'constrain');
    }
    addDaysCalendar(e, r, i) {
      let o = this.calendarToIsoDate(e, 'constrain', i),
        a = this.addDaysIso(o, r);
      return this.isoToCalendarDate(a, i);
    }
    addMonthsCalendar(e, r, i, o) {
      let a = e,
        {day: s} = a;
      for (let c = 0, h = Qs(r); c < h; c++) {
        let {month: f} = a,
          m = a,
          y =
            r < 0
              ? -Math.max(s, this.daysInPreviousMonth(a, o))
              : this.daysInMonth(a, o),
          g = this.calendarToIsoDate(a, 'constrain', o),
          v = this.addDaysIso(g, y);
        if (((a = this.isoToCalendarDate(v, o)), r > 0)) {
          let _ = this.monthsInYear(m, o);
          for (; a.month - 1 != f % _; )
            (v = this.addDaysIso(v, -1)), (a = this.isoToCalendarDate(v, o));
        }
        a.day !== s && (a = this.regulateDate({...a, day: s}, 'constrain', o));
      }
      if (i === 'reject' && a.day !== s)
        throw new RangeError(
          `Day ${s} does not exist in resulting calendar month`
        );
      return a;
    }
    addCalendar(
      e,
      {years: r = 0, months: i = 0, weeks: o = 0, days: a = 0},
      s,
      c
    ) {
      let {year: h, day: f, monthCode: m} = e,
        y = this.adjustCalendarDate({year: h + r, monthCode: m, day: f}, c),
        g = this.addMonthsCalendar(y, i, s, c),
        v = a + 7 * o;
      return this.addDaysCalendar(g, v, c);
    }
    untilCalendar(e, r, i, o) {
      let a = 0,
        s = 0,
        c = 0,
        h = 0;
      switch (i) {
        case 'day':
          a = this.calendarDaysUntil(e, r, o);
          break;
        case 'week': {
          let f = this.calendarDaysUntil(e, r, o);
          (a = f % 7), (s = (f - a) / 7);
          break;
        }
        case 'month':
        case 'year': {
          let f = this.compareCalendarDates(r, e);
          if (!f) return {years: 0, months: 0, weeks: 0, days: 0};
          let m = r.year - e.year,
            y = r.day - e.day;
          if (i === 'year' && m) {
            let _ = 0;
            r.monthCode > e.monthCode && (_ = 1),
              r.monthCode < e.monthCode && (_ = -1),
              _ || (_ = Math.sign(y)),
              (h = _ * f < 0 ? m - f : m);
          }
          let g,
            v = h ? this.addCalendar(e, {years: h}, 'constrain', o) : e;
          do
            (c += f),
              (g = v),
              (v = this.addMonthsCalendar(g, f, 'constrain', o)),
              v.day !== e.day &&
                (v = this.regulateDate({...v, day: e.day}, 'constrain', o));
          while (this.compareCalendarDates(r, v) * f >= 0);
          (c -= f), (a = this.calendarDaysUntil(g, r, o));
          break;
        }
      }
      return {years: h, months: c, weeks: s, days: a};
    }
    daysInMonth(e, r) {
      let {day: i} = e,
        o = this.maximumMonthLength(e),
        a = this.minimumMonthLength(e);
      if (a === o) return a;
      let s = i <= o - a ? o : a,
        c = this.calendarToIsoDate(e, 'constrain', r),
        h = this.addDaysIso(c, s),
        f = this.isoToCalendarDate(h, r),
        m = this.addDaysIso(h, -f.day);
      return this.isoToCalendarDate(m, r).day;
    }
    daysInPreviousMonth(e, r) {
      let {day: i, month: o, year: a} = e,
        s = {year: o > 1 ? a : a - 1, month: o, day: 1},
        c = o > 1 ? o - 1 : this.monthsInYear(s, r);
      s = {...s, month: c};
      let h = this.minimumMonthLength(s),
        f = this.maximumMonthLength(s);
      if (h === f) return f;
      let m = this.calendarToIsoDate(e, 'constrain', r),
        y = this.addDaysIso(m, -i);
      return this.isoToCalendarDate(y, r).day;
    }
    startOfCalendarYear(e) {
      return {year: e.year, month: 1, monthCode: 'M01', day: 1};
    }
    startOfCalendarMonth(e) {
      return {year: e.year, month: e.month, day: 1};
    }
    calendarDaysUntil(e, r, i) {
      let o = this.calendarToIsoDate(e, 'constrain', i),
        a = this.calendarToIsoDate(r, 'constrain', i);
      return this.isoDaysUntil(o, a);
    }
    isoDaysUntil(e, r) {
      return ho(e.year, e.month, e.day, r.year, r.month, r.day, 'day').days;
    }
    monthDayFromFields(e, r, i) {
      let o,
        a,
        s,
        c,
        h,
        {monthCode: f, day: m} = e;
      if (f === void 0) {
        let {year: v, era: _, eraYear: E} = e;
        if (v === void 0 && (_ === void 0 || E === void 0))
          throw new TypeError(
            'when `monthCode` is omitted, `year` (or `era` and `eraYear`) and `month` are required'
          );
        ({monthCode: f, day: m} = this.isoToCalendarDate(
          this.calendarToIsoDate(e, r, i),
          i
        ));
      }
      let y = this.isoToCalendarDate({year: 1972, month: 12, day: 31}, i),
        g =
          y.monthCode > f || (y.monthCode === f && y.day >= m)
            ? y.year
            : y.year - 1;
      for (let v = 0; v < 100; v++) {
        let _ = this.adjustCalendarDate({day: m, monthCode: f, year: g - v}, i),
          E = this.calendarToIsoDate(_, 'constrain', i),
          D = this.isoToCalendarDate(E, i);
        if (
          (({year: o, month: a, day: s} = E), D.monthCode === f && D.day === m)
        )
          return {month: a, day: s, year: o};
        r === 'constrain' &&
          (c === void 0 || (D.monthCode === c.monthCode && D.day > c.day)) &&
          ((c = D), (h = E));
      }
      if (r === 'constrain' && h !== void 0) return h;
      throw new RangeError(
        `No recent ${this.id} year with monthCode ${f} and day ${m}`
      );
    }
  },
  Ri = class extends ot {
    constructor() {
      super(...arguments),
        (this.id = 'hebrew'),
        (this.calendarType = 'lunisolar'),
        (this.months = {
          Tishri: {leap: 1, regular: 1, monthCode: 'M01', days: 30},
          Heshvan: {
            leap: 2,
            regular: 2,
            monthCode: 'M02',
            days: {min: 29, max: 30},
          },
          Kislev: {
            leap: 3,
            regular: 3,
            monthCode: 'M03',
            days: {min: 29, max: 30},
          },
          Tevet: {leap: 4, regular: 4, monthCode: 'M04', days: 29},
          Shevat: {leap: 5, regular: 5, monthCode: 'M05', days: 30},
          Adar: {leap: void 0, regular: 6, monthCode: 'M06', days: 29},
          'Adar I': {leap: 6, regular: void 0, monthCode: 'M05L', days: 30},
          'Adar II': {leap: 7, regular: void 0, monthCode: 'M06', days: 29},
          Nisan: {leap: 8, regular: 7, monthCode: 'M07', days: 30},
          Iyar: {leap: 9, regular: 8, monthCode: 'M08', days: 29},
          Sivan: {leap: 10, regular: 9, monthCode: 'M09', days: 30},
          Tamuz: {leap: 11, regular: 10, monthCode: 'M10', days: 29},
          Av: {leap: 12, regular: 11, monthCode: 'M11', days: 30},
          Elul: {leap: 13, regular: 12, monthCode: 'M12', days: 29},
        }),
        (this.hasEra = !1);
    }
    inLeapYear(e) {
      let {year: r} = e;
      return (7 * r + 1) % 19 < 7;
    }
    monthsInYear(e) {
      return this.inLeapYear(e) ? 13 : 12;
    }
    minimumMonthLength(e) {
      return this.minMaxMonthLength(e, 'min');
    }
    maximumMonthLength(e) {
      return this.minMaxMonthLength(e, 'max');
    }
    minMaxMonthLength(e, r) {
      let {month: i, year: o} = e,
        a = this.getMonthCode(o, i),
        s = Mi(this.months).find(h => h[1].monthCode === a);
      if (s === void 0) throw new RangeError(`unmatched Hebrew month: ${i}`);
      let c = s[1].days;
      return typeof c == 'number' ? c : c[r];
    }
    estimateIsoDate(e) {
      let {year: r} = e;
      return {year: r - 3760, month: 1, day: 1};
    }
    getMonthCode(e, r) {
      return this.inLeapYear({year: e})
        ? r === 6
          ? Wr(5, !0)
          : Wr(r < 6 ? r : r - 1)
        : Wr(r);
    }
    adjustCalendarDate(e, r, i = 'constrain', o = !1) {
      let {
        year: a,
        eraYear: s,
        month: c,
        monthCode: h,
        day: f,
        monthExtra: m,
      } = e;
      if (
        (a === void 0 && s !== void 0 && (a = s),
        s === void 0 && a !== void 0 && (s = a),
        o)
      ) {
        if (m) {
          let y = this.months[m];
          if (!y)
            throw new RangeError(`Unrecognized month from formatToParts: ${m}`);
          c = this.inLeapYear({year: a}) ? y.leap : y.regular;
        }
        return (
          (h = this.getMonthCode(a, c)),
          {year: a, month: c, day: f, era: void 0, eraYear: s, monthCode: h}
        );
      }
      if ((this.validateCalendarDate(e), c === void 0))
        if (h.endsWith('L')) {
          if (h !== 'M05L')
            throw new RangeError(
              `Hebrew leap month must have monthCode M05L, not ${h}`
            );
          if (((c = 6), !this.inLeapYear({year: a}))) {
            if (i === 'reject')
              throw new RangeError(
                `Hebrew monthCode M05L is invalid in year ${a} which is not a leap year`
              );
            (c = 6), (h = 'M06');
          }
        } else {
          (c = To(h)), this.inLeapYear({year: a}) && c >= 6 && c++;
          let y = this.monthsInYear({year: a});
          if (c < 1 || c > y) throw new RangeError(`Invalid monthCode: ${h}`);
        }
      else if (
        (i === 'reject'
          ? (We(c, 1, this.monthsInYear({year: a})),
            We(f, 1, this.maximumMonthLength({year: a, month: c})))
          : ((c = mr(c, 1, this.monthsInYear({year: a}))),
            (f = mr(f, 1, this.maximumMonthLength({year: a, month: c})))),
        h === void 0)
      )
        h = this.getMonthCode(a, c);
      else if (this.getMonthCode(a, c) !== h)
        throw new RangeError(
          `monthCode ${h} doesn't correspond to month ${c} in Hebrew year ${a}`
        );
      return {...e, day: f, month: c, monthCode: h, year: a, eraYear: s};
    }
  },
  at = class extends ot {
    constructor() {
      super(...arguments),
        (this.calendarType = 'lunar'),
        (this.DAYS_PER_ISLAMIC_YEAR = 354 + 11 / 30),
        (this.DAYS_PER_ISO_YEAR = 365.2425),
        (this.constantEra = 'ah');
    }
    inLeapYear(e, r) {
      return this.daysInMonth({year: e.year, month: 12, day: 1}, r) === 30;
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength() {
      return 29;
    }
    maximumMonthLength() {
      return 30;
    }
    estimateIsoDate(e) {
      let {year: r} = this.adjustCalendarDate(e);
      return {
        year:
          Hs((r * this.DAYS_PER_ISLAMIC_YEAR) / this.DAYS_PER_ISO_YEAR) + 622,
        month: 1,
        day: 1,
      };
    }
  },
  Wn = class extends at {
    constructor() {
      super(...arguments), (this.id = 'islamic');
    }
  },
  $i = class extends at {
    constructor() {
      super(...arguments), (this.id = 'islamic-umalqura');
    }
  },
  Yi = class extends at {
    constructor() {
      super(...arguments), (this.id = 'islamic-tbla');
    }
  },
  Pi = class extends at {
    constructor() {
      super(...arguments), (this.id = 'islamic-civil');
    }
  },
  Ni = class extends at {
    constructor() {
      super(...arguments), (this.id = 'islamic-rgsa');
    }
  },
  Fi = class extends at {
    constructor() {
      super(...arguments), (this.id = 'islamicc');
    }
  },
  ji = class extends ot {
    constructor() {
      super(...arguments),
        (this.id = 'persian'),
        (this.calendarType = 'solar'),
        (this.constantEra = 'ap');
    }
    inLeapYear(e, r) {
      return Wn.prototype.inLeapYear.call(this, e, r);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e) {
      let {month: r} = e;
      return r === 12 ? 29 : r <= 6 ? 31 : 30;
    }
    maximumMonthLength(e) {
      let {month: r} = e;
      return r === 12 ? 30 : r <= 6 ? 31 : 30;
    }
    estimateIsoDate(e) {
      let {year: r} = this.adjustCalendarDate(e);
      return {year: r + 621, month: 1, day: 1};
    }
  },
  Ai = class extends ot {
    constructor() {
      super(...arguments),
        (this.id = 'indian'),
        (this.calendarType = 'solar'),
        (this.constantEra = 'saka'),
        (this.months = {
          1: {
            length: 30,
            month: 3,
            day: 22,
            leap: {length: 31, month: 3, day: 21},
          },
          2: {length: 31, month: 4, day: 21},
          3: {length: 31, month: 5, day: 22},
          4: {length: 31, month: 6, day: 22},
          5: {length: 31, month: 7, day: 23},
          6: {length: 31, month: 8, day: 23},
          7: {length: 30, month: 9, day: 23},
          8: {length: 30, month: 10, day: 23},
          9: {length: 30, month: 11, day: 22},
          10: {length: 30, month: 12, day: 22},
          11: {length: 30, month: 1, nextYear: !0, day: 21},
          12: {length: 30, month: 2, nextYear: !0, day: 20},
        }),
        (this.vulnerableToBceBug =
          new Date('0000-01-01T00:00Z').toLocaleDateString(
            'en-US-u-ca-indian',
            {timeZone: 'UTC'}
          ) !== '10/11/-79 Saka');
    }
    inLeapYear(e) {
      return cs(e.year + 78);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e) {
      return this.getMonthInfo(e).length;
    }
    maximumMonthLength(e) {
      return this.getMonthInfo(e).length;
    }
    getMonthInfo(e) {
      let {month: r} = e,
        i = this.months[r];
      if (i === void 0) throw new RangeError(`Invalid month: ${r}`);
      return this.inLeapYear(e) && i.leap && (i = i.leap), i;
    }
    estimateIsoDate(e) {
      let r = this.adjustCalendarDate(e),
        i = this.getMonthInfo(r);
      return mt(
        r.year + 78 + (i.nextYear ? 1 : 0),
        i.month,
        i.day,
        0,
        0,
        0,
        r.day - 1,
        'constrain'
      );
    }
    checkIcuBugs(e) {
      if (this.vulnerableToBceBug && e.year < 1)
        throw new RangeError(
          `calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`
        );
    }
  };
function cs(t) {
  return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0);
}
var _t = class extends ot {
    constructor(e, r) {
      super(),
        (this.calendarType = 'solar'),
        (this.v8IsVulnerableToJulianBug = new Date('+001001-01-01T00:00Z')
          .toLocaleDateString('en-US-u-ca-japanese', {timeZone: 'UTC'})
          .startsWith('12')),
        (this.calendarIsVulnerableToJulianBug = !1),
        (this.id = e);
      let {eras: i, anchorEra: o} = (function (s) {
        let c,
          h = s;
        if (h.length === 0)
          throw new RangeError('Invalid era data: eras are required');
        if (h.length === 1 && h[0].reverseOf)
          throw new RangeError(
            'Invalid era data: anchor era cannot count years backwards'
          );
        if (h.length === 1 && !h[0].name)
          throw new RangeError(
            'Invalid era data: at least one named era is required'
          );
        if (h.filter(m => m.reverseOf != null).length > 1)
          throw new RangeError(
            'Invalid era data: only one era can count years backwards'
          );
        h.forEach(m => {
          if (m.isAnchor || (!m.anchorEpoch && !m.reverseOf)) {
            if (c)
              throw new RangeError(
                'Invalid era data: cannot have multiple anchor eras'
              );
            (c = m), (m.anchorEpoch = {year: m.hasYearZero ? 0 : 1});
          } else if (!m.name)
            throw new RangeError(
              'If era name is blank, it must be the anchor era'
            );
        }),
          (h = h.filter(m => m.name)),
          h.forEach(m => {
            let {reverseOf: y} = m;
            if (y) {
              let g = h.find(v => v.name === y);
              if (g === void 0)
                throw new RangeError(
                  `Invalid era data: unmatched reverseOf era: ${y}`
                );
              (m.reverseOf = g),
                (m.anchorEpoch = g.anchorEpoch),
                (m.isoEpoch = g.isoEpoch);
            }
            m.anchorEpoch.month === void 0 && (m.anchorEpoch.month = 1),
              m.anchorEpoch.day === void 0 && (m.anchorEpoch.day = 1);
          }),
          Ks.call(h, (m, y) => {
            if (m.reverseOf) return 1;
            if (y.reverseOf) return -1;
            if (!m.isoEpoch || !y.isoEpoch)
              throw new RangeError('Invalid era data: missing ISO epoch');
            return y.isoEpoch.year - m.isoEpoch.year;
          });
        let f = h[h.length - 1].reverseOf;
        if (f && f !== h[h.length - 2])
          throw new RangeError('Invalid era data: invalid reverse-sign era');
        return (
          h.forEach((m, y) => {
            m.genericName = 'era' + (h.length - 1 - y);
          }),
          {eras: h, anchorEra: c || h[0]}
        );
      })(r);
      (this.anchorEra = o), (this.eras = i);
    }
    inLeapYear(e) {
      let {year: r} = this.estimateIsoDate({month: 1, day: 1, year: e.year});
      return cs(r);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e) {
      let {month: r} = e;
      return r === 2
        ? this.inLeapYear(e)
          ? 29
          : 28
        : [4, 6, 9, 11].indexOf(r) >= 0
        ? 30
        : 31;
    }
    maximumMonthLength(e) {
      return this.minimumMonthLength(e);
    }
    completeEraYear(e) {
      let r = (c, h) => {
          let f = e[c];
          if (f != null && f != h)
            throw new RangeError(
              `Input ${c} ${f} doesn't match calculated value ${h}`
            );
        },
        i = c => {
          let h,
            f = {...e, year: c},
            m = this.eras.find((y, g) => {
              if (g === this.eras.length - 1) {
                if (y.reverseOf) {
                  if (c > 0)
                    throw new RangeError(
                      `Signed year ${c} is invalid for era ${y.name}`
                    );
                  return (h = y.anchorEpoch.year - c), !0;
                }
                return (
                  (h = c - y.anchorEpoch.year + (y.hasYearZero ? 0 : 1)), !0
                );
              }
              return (
                this.compareCalendarDates(f, y.anchorEpoch) >= 0 &&
                ((h = c - y.anchorEpoch.year + (y.hasYearZero ? 0 : 1)), !0)
              );
            });
          if (!m) throw new RangeError(`Year ${c} was not matched by any era`);
          return {eraYear: h, era: m.name};
        },
        {year: o, eraYear: a, era: s} = e;
      if (o != null)
        ({eraYear: a, era: s} = i(o)), r('era', s), r('eraYear', a);
      else {
        if (a == null)
          throw new RangeError(
            'Either `year` or `eraYear` and `era` are required'
          );
        {
          let c =
            s === void 0
              ? void 0
              : this.eras.find(h => h.name === s || h.genericName === s);
          if (!c)
            throw new RangeError(
              `Era ${s} (ISO year ${a}) was not matched by any era`
            );
          if (a < 1 && c.reverseOf)
            throw new RangeError(
              `Years in ${s} era must be positive, not ${o}`
            );
          (o = c.reverseOf
            ? c.anchorEpoch.year - a
            : a + c.anchorEpoch.year - (c.hasYearZero ? 0 : 1)),
            r('year', o),
            ({eraYear: a, era: s} = i(o));
        }
      }
      return {...e, year: o, eraYear: a, era: s};
    }
    adjustCalendarDate(e, r, i = 'constrain') {
      let o = e,
        {month: a, monthCode: s} = o;
      return (
        a === void 0 && (o = {...o, month: To(s)}),
        this.validateCalendarDate(o),
        (o = this.completeEraYear(o)),
        super.adjustCalendarDate(o, r, i)
      );
    }
    estimateIsoDate(e) {
      let r = this.adjustCalendarDate(e),
        {year: i, month: o, day: a} = r,
        {anchorEra: s} = this;
      return Fn(
        i + s.isoEpoch.year - (s.hasYearZero ? 0 : 1),
        o,
        a,
        'constrain'
      );
    }
    checkIcuBugs(e) {
      if (
        this.calendarIsVulnerableToJulianBug &&
        this.v8IsVulnerableToJulianBug &&
        Hr(e.year, e.month, e.day, 1582, 10, 15) < 0
      )
        throw new RangeError(
          `calendar '${this.id}' is broken for ISO dates before 1582-10-15 (see https://bugs.chromium.org/p/chromium/issues/detail?id=1173158)`
        );
    }
  },
  an = class extends _t {
    constructor(e, r) {
      super(e, r);
    }
    inLeapYear(e) {
      let {year: r} = e;
      return (r + 1) % 4 == 0;
    }
    monthsInYear() {
      return 13;
    }
    minimumMonthLength(e) {
      let {month: r} = e;
      return r === 13 ? (this.inLeapYear(e) ? 6 : 5) : 30;
    }
    maximumMonthLength(e) {
      return this.minimumMonthLength(e);
    }
  },
  xi = class extends an {
    constructor() {
      super('ethioaa', [
        {name: 'era0', isoEpoch: {year: -5492, month: 7, day: 17}},
      ]);
    }
  },
  Li = class extends an {
    constructor() {
      super('coptic', [
        {name: 'era1', isoEpoch: {year: 284, month: 8, day: 29}},
        {name: 'era0', reverseOf: 'era1'},
      ]);
    }
  },
  Ui = class extends an {
    constructor() {
      super('ethiopic', [
        {name: 'era0', isoEpoch: {year: -5492, month: 7, day: 17}},
        {
          name: 'era1',
          isoEpoch: {year: 8, month: 8, day: 27},
          anchorEpoch: {year: 5501},
        },
      ]);
    }
  },
  Zi = class extends _t {
    constructor() {
      super('roc', [
        {name: 'minguo', isoEpoch: {year: 1912, month: 1, day: 1}},
        {name: 'before-roc', reverseOf: 'minguo'},
      ]),
        (this.calendarIsVulnerableToJulianBug = !0);
    }
  },
  qi = class extends _t {
    constructor() {
      super('buddhist', [
        {name: 'be', hasYearZero: !0, isoEpoch: {year: -543, month: 1, day: 1}},
      ]),
        (this.calendarIsVulnerableToJulianBug = !0);
    }
  },
  zi = class extends _t {
    constructor() {
      super('gregory', [
        {name: 'ce', isoEpoch: {year: 1, month: 1, day: 1}},
        {name: 'bce', reverseOf: 'ce'},
      ]);
    }
    reviseIntlEra(e) {
      let {era: r, eraYear: i} = e;
      return (
        (r !== 'bc' && r !== 'b') || (r = 'bce'),
        (r !== 'ad' && r !== 'a') || (r = 'ce'),
        {era: r, eraYear: i}
      );
    }
  },
  Wi = class extends _t {
    constructor() {
      super('japanese', [
        {
          name: 'reiwa',
          isoEpoch: {year: 2019, month: 5, day: 1},
          anchorEpoch: {year: 2019, month: 5, day: 1},
        },
        {
          name: 'heisei',
          isoEpoch: {year: 1989, month: 1, day: 8},
          anchorEpoch: {year: 1989, month: 1, day: 8},
        },
        {
          name: 'showa',
          isoEpoch: {year: 1926, month: 12, day: 25},
          anchorEpoch: {year: 1926, month: 12, day: 25},
        },
        {
          name: 'taisho',
          isoEpoch: {year: 1912, month: 7, day: 30},
          anchorEpoch: {year: 1912, month: 7, day: 30},
        },
        {
          name: 'meiji',
          isoEpoch: {year: 1868, month: 9, day: 8},
          anchorEpoch: {year: 1868, month: 9, day: 8},
        },
        {name: 'ce', isoEpoch: {year: 1, month: 1, day: 1}},
        {name: 'bce', reverseOf: 'ce'},
      ]),
        (this.calendarIsVulnerableToJulianBug = !0),
        (this.eraLength = 'long'),
        (this.erasBeginMidYear = !0);
    }
    reviseIntlEra(e, r) {
      let {era: i, eraYear: o} = e,
        {year: a} = r;
      return this.eras.find(s => s.name === i)
        ? {era: i, eraYear: o}
        : a < 1
        ? {era: 'bce', eraYear: 1 - a}
        : {era: 'ce', eraYear: a};
    }
  },
  Gn = class extends ot {
    constructor() {
      super(...arguments),
        (this.calendarType = 'lunisolar'),
        (this.hasEra = !1);
    }
    inLeapYear(e, r) {
      let i = this.getMonthList(e.year, r);
      return Mi(i).length === 13;
    }
    monthsInYear(e, r) {
      return this.inLeapYear(e, r) ? 13 : 12;
    }
    minimumMonthLength() {
      return 29;
    }
    maximumMonthLength() {
      return 30;
    }
    getMonthList(e, r) {
      if (e === void 0) throw new TypeError('Missing year');
      let i = JSON.stringify({
          func: 'getMonthList',
          calendarYear: e,
          id: this.id,
        }),
        o = r.get(i);
      if (o) return o;
      let a = this.getFormatter(),
        s = (D, C) => {
          let B = ls({isoYear: D, isoMonth: 2, isoDay: 1}),
            R = new Date(B);
          R.setUTCDate(C + 1);
          let P = a.formatToParts(R),
            L = P.find(M => M.type === 'month').value,
            j = +P.find(M => M.type === 'day').value,
            Y = P.find(M => M.type === 'relatedYear');
          if (Y === void 0)
            throw new RangeError(
              `Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`
            );
          return (
            (Y = +Y.value),
            {calendarMonthString: L, calendarDay: j, calendarYearToVerify: Y}
          );
        },
        c = 17,
        {
          calendarMonthString: h,
          calendarDay: f,
          calendarYearToVerify: m,
        } = s(e, c);
      h !== '1' &&
        ((c += 29), ({calendarMonthString: h, calendarDay: f} = s(e, c))),
        (c -= f - 5);
      let y = {},
        g,
        v,
        _ = 1,
        E = !1;
      do
        ({
          calendarMonthString: h,
          calendarDay: f,
          calendarYearToVerify: m,
        } = s(e, c)),
          g && (y[v].daysInMonth = g + 30 - f),
          m !== e ? (E = !0) : ((y[h] = {monthIndex: _++}), (c += 30)),
          (g = f),
          (v = h);
      while (!E);
      return (y[v].daysInMonth = g + 30 - f), r.set(i, y), y;
    }
    estimateIsoDate(e) {
      let {year: r, month: i} = e;
      return {year: r, month: i >= 12 ? 12 : i + 1, day: 1};
    }
    adjustCalendarDate(e, r, i = 'constrain', o = !1) {
      let {
        year: a,
        month: s,
        monthExtra: c,
        day: h,
        monthCode: f,
        eraYear: m,
      } = e;
      if (o) {
        if (((a = m), c && c !== 'bis'))
          throw new RangeError(`Unexpected leap month suffix: ${c}`);
        let y = Wr(s, c !== void 0),
          g = `${s}${c || ''}`,
          v = this.getMonthList(a, r)[g];
        if (v === void 0)
          throw new RangeError(`Unmatched month ${g} in Chinese year ${a}`);
        return (
          (s = v.monthIndex),
          {year: a, month: s, day: h, era: void 0, eraYear: m, monthCode: y}
        );
      }
      if (
        (this.validateCalendarDate(e),
        a === void 0 && (a = m),
        m === void 0 && (m = a),
        s === void 0)
      ) {
        let y = this.getMonthList(a, r),
          g = f.replace('L', 'bis').slice(1);
        g[0] === '0' && (g = g.slice(1));
        let v = y[g];
        if (
          ((s = v && v.monthIndex),
          s === void 0 && f.endsWith('L') && f != 'M13L' && i === 'constrain')
        ) {
          let _ = f.slice(1, -1);
          _[0] === '0' && (_ = _.slice(1)),
            (v = y[_]),
            v && ((s = v.monthIndex), (f = Wr(_)));
        }
        if (s === void 0)
          throw new RangeError(`Unmatched month ${f} in Chinese year ${a}`);
      } else if (f === void 0) {
        let y = this.getMonthList(a, r),
          g = Mi(y),
          v = g.length;
        i === 'reject'
          ? (We(s, 1, v), We(h, 1, this.maximumMonthLength()))
          : ((s = mr(s, 1, v)), (h = mr(h, 1, this.maximumMonthLength())));
        let _ = g.find(([, E]) => E.monthIndex === s);
        if (_ === void 0)
          throw new RangeError(`Invalid month ${s} in Chinese year ${a}`);
        f = Wr(_[0].replace('bis', ''), _[0].indexOf('bis') !== -1);
      } else {
        let y = this.getMonthList(a, r),
          g = f.replace('L', 'bis').slice(1);
        g[0] === '0' && (g = g.slice(1));
        let v = y[g];
        if (!v)
          throw new RangeError(`Unmatched monthCode ${f} in Chinese year ${a}`);
        if (s !== v.monthIndex)
          throw new RangeError(
            `monthCode ${f} doesn't correspond to month ${s} in Chinese year ${a}`
          );
      }
      return {...e, year: a, eraYear: m, month: s, monthCode: f, day: h};
    }
  },
  Gi = class extends Gn {
    constructor() {
      super(...arguments), (this.id = 'chinese');
    }
  },
  Ji = class extends Gn {
    constructor() {
      super(...arguments), (this.id = 'dangi');
    }
  },
  Vi = class {
    constructor(e) {
      this.helper = e;
    }
    dateFromFields(e, r, i) {
      let o = new Fe(),
        a = ce(e, this.fields(['day', 'month', 'monthCode', 'year']), []),
        s = Ye(r),
        {year: c, month: h, day: f} = this.helper.calendarToIsoDate(a, s, o),
        m = Ir(c, h, f, i);
      return o.setObject(m), m;
    }
    yearMonthFromFields(e, r, i) {
      let o = new Fe(),
        a = ce(e, this.fields(['month', 'monthCode', 'year']), []),
        s = Ye(r),
        {
          year: c,
          month: h,
          day: f,
        } = this.helper.calendarToIsoDate({...a, day: 1}, s, o),
        m = nn(c, h, i, f);
      return o.setObject(m), m;
    }
    monthDayFromFields(e, r, i) {
      let o = new Fe(),
        a = ce(e, this.fields(['day', 'month', 'monthCode', 'year']), []),
        s = Ye(r),
        {year: c, month: h, day: f} = this.helper.monthDayFromFields(a, s, o),
        m = tn(h, f, i, c);
      return o.setObject(m), m;
    }
    fields(e) {
      let r = e;
      return os.call(r, 'year') && (r = [...r, 'era', 'eraYear']), r;
    }
    fieldKeysToIgnore(e) {
      let r = new as();
      for (let i = 0; i < e.length; i++) {
        let o = e[i];
        switch ((Q(Ve, r, [o]), o)) {
          case 'era':
            Q(Ve, r, ['eraYear']), Q(Ve, r, ['year']);
            break;
          case 'eraYear':
            Q(Ve, r, ['era']), Q(Ve, r, ['year']);
            break;
          case 'year':
            Q(Ve, r, ['era']), Q(Ve, r, ['eraYear']);
            break;
          case 'month':
            Q(Ve, r, ['monthCode']),
              this.helper.erasBeginMidYear &&
                (Q(Ve, r, ['era']), Q(Ve, r, ['eraYear']));
            break;
          case 'monthCode':
            Q(Ve, r, ['month']),
              this.helper.erasBeginMidYear &&
                (Q(Ve, r, ['era']), Q(Ve, r, ['eraYear']));
            break;
          case 'day':
            this.helper.erasBeginMidYear &&
              (Q(Ve, r, ['era']), Q(Ve, r, ['eraYear']));
        }
      }
      return [...Q(ss, r, [])];
    }
    dateAdd(e, r, i, o, a, s, c) {
      let h = Fe.getCacheForObject(e),
        f = this.helper.temporalToCalendarDate(e, h),
        m = this.helper.addCalendar(
          f,
          {years: r, months: i, weeks: o, days: a},
          s,
          h
        ),
        y = this.helper.calendarToIsoDate(m, 'constrain', h),
        {year: g, month: v, day: _} = y,
        E = Ir(g, v, _, c);
      return new Fe(h).setObject(E), E;
    }
    dateUntil(e, r, i) {
      let o = Fe.getCacheForObject(e),
        a = Fe.getCacheForObject(r),
        s = this.helper.temporalToCalendarDate(e, o),
        c = this.helper.temporalToCalendarDate(r, a);
      return this.helper.untilCalendar(s, c, i, o);
    }
    year(e) {
      let r = Fe.getCacheForObject(e);
      return this.helper.temporalToCalendarDate(e, r).year;
    }
    month(e) {
      let r = Fe.getCacheForObject(e);
      return this.helper.temporalToCalendarDate(e, r).month;
    }
    day(e) {
      let r = Fe.getCacheForObject(e);
      return this.helper.temporalToCalendarDate(e, r).day;
    }
    era(e) {
      if (!this.helper.hasEra) return;
      let r = Fe.getCacheForObject(e);
      return this.helper.temporalToCalendarDate(e, r).era;
    }
    eraYear(e) {
      if (!this.helper.hasEra) return;
      let r = Fe.getCacheForObject(e);
      return this.helper.temporalToCalendarDate(e, r).eraYear;
    }
    monthCode(e) {
      let r = Fe.getCacheForObject(e);
      return this.helper.temporalToCalendarDate(e, r).monthCode;
    }
    dayOfWeek(e) {
      return De.iso8601.dayOfWeek(e);
    }
    dayOfYear(e) {
      let r = Fe.getCacheForObject(e),
        i = this.helper.isoToCalendarDate(e, r),
        o = this.helper.startOfCalendarYear(i);
      return this.helper.calendarDaysUntil(o, i, r) + 1;
    }
    weekOfYear(e) {
      return De.iso8601.weekOfYear(e);
    }
    yearOfWeek(e) {
      return De.iso8601.yearOfWeek(e);
    }
    daysInWeek(e) {
      return De.iso8601.daysInWeek(e);
    }
    daysInMonth(e) {
      let r = Fe.getCacheForObject(e),
        i = this.helper.temporalToCalendarDate(e, r),
        o = this.helper.maximumMonthLength(i);
      if (o === this.helper.minimumMonthLength(i)) return o;
      let a = this.helper.startOfCalendarMonth(i),
        s = this.helper.addMonthsCalendar(a, 1, 'constrain', r);
      return this.helper.calendarDaysUntil(a, s, r);
    }
    daysInYear(e) {
      let r = e;
      Le(r, q) || (r = ve(r));
      let i = Fe.getCacheForObject(r),
        o = this.helper.temporalToCalendarDate(r, i),
        a = this.helper.startOfCalendarYear(o),
        s = this.helper.addCalendar(a, {years: 1}, 'constrain', i);
      return this.helper.calendarDaysUntil(a, s, i);
    }
    monthsInYear(e) {
      let r = Fe.getCacheForObject(e),
        i = this.helper.temporalToCalendarDate(e, r);
      return this.helper.monthsInYear(i, r);
    }
    inLeapYear(e) {
      let r = e;
      Le(r, q) || (r = ve(r));
      let i = Fe.getCacheForObject(r),
        o = this.helper.temporalToCalendarDate(r, i);
      return this.helper.inLeapYear(o, i);
    }
  };
for (let t of [
  Ri,
  ji,
  Ui,
  xi,
  Li,
  Gi,
  Ji,
  Zi,
  Ai,
  qi,
  zi,
  Wi,
  Wn,
  $i,
  Yi,
  Pi,
  Ni,
  Fi,
]) {
  let e = new t();
  De[e.id] = new Vi(e);
}
var sn = class t {
  constructor(e, r, i, o = 'iso8601') {
    Ea(this, me(e), me(r), me(i), gr(o));
  }
  get calendarId() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Ge(n(this, S));
  }
  get era() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Hn(n(this, S), this);
  }
  get eraYear() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return ei(n(this, S), this);
  }
  get year() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Kn(n(this, S), this);
  }
  get month() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Qn(n(this, S), this);
  }
  get monthCode() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return _n(n(this, S), this);
  }
  get day() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return bn(n(this, S), this);
  }
  get dayOfWeek() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return ro(n(this, S), this);
  }
  get dayOfYear() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return to(n(this, S), this);
  }
  get weekOfYear() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return no(n(this, S), this);
  }
  get yearOfWeek() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return io(n(this, S), this);
  }
  get daysInWeek() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return oo(n(this, S), this);
  }
  get daysInMonth() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return ri(n(this, S), this);
  }
  get daysInYear() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return ti(n(this, S), this);
  }
  get monthsInYear() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return ni(n(this, S), this);
  }
  get inLeapYear() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return ii(n(this, S), this);
  }
  with(e, r) {
    if (!de(this)) throw new TypeError('invalid receiver');
    if (!be(e)) throw new TypeError('invalid argument');
    Wt(e);
    let i = he(r),
      o = n(this, S),
      a = Ne(o, ['day', 'month', 'monthCode', 'year']),
      s = ce(this, a, []);
    return (s = wt(o, s, ce(e, a, 'partial'))), (s = ce(s, a, [])), Gr(o, s, i);
  }
  withCalendar(e) {
    if (!de(this)) throw new TypeError('invalid receiver');
    let r = gr(e);
    return new t(n(this, q), n(this, z), n(this, G), r);
  }
  add(e, r) {
    if (!de(this)) throw new TypeError('invalid receiver');
    let i = Bt(e),
      o = he(r);
    return ze(n(this, S), this, i, o);
  }
  subtract(e, r) {
    if (!de(this)) throw new TypeError('invalid receiver');
    let i = ja(Bt(e)),
      o = he(r);
    return ze(n(this, S), this, i, o);
  }
  until(e, r) {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Wo('until', this, e, r);
  }
  since(e, r) {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Wo('since', this, e, r);
  }
  equals(e) {
    if (!de(this)) throw new TypeError('invalid receiver');
    let r = ve(e);
    for (let i of [q, z, G]) if (n(this, i) !== n(r, i)) return !1;
    return In(n(this, S), n(r, S));
  }
  toString(e) {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Fo(this, pn(he(e)));
  }
  toJSON() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Fo(this);
  }
  toLocaleString(e, r) {
    if (!de(this)) throw new TypeError('invalid receiver');
    return new Kr(e, r).format(this);
  }
  valueOf() {
    throw new TypeError(
      'use compare() or equals() to compare Temporal.PlainDate'
    );
  }
  toPlainDateTime(e) {
    if (!de(this)) throw new TypeError('invalid receiver');
    let r = n(this, q),
      i = n(this, z),
      o = n(this, G),
      a = n(this, S);
    if (e === void 0) return hr(r, i, o, 0, 0, 0, 0, 0, 0, a);
    let s = Zr(e);
    return hr(
      r,
      i,
      o,
      n(s, te),
      n(s, ne),
      n(s, ie),
      n(s, oe),
      n(s, ae),
      n(s, se),
      a
    );
  }
  toZonedDateTime(e) {
    if (!de(this)) throw new TypeError('invalid receiver');
    let r, i;
    if (be(e))
      if (_r(e)) r = e;
      else {
        let _ = e.timeZone;
        _ === void 0 ? (r = Qe(e)) : ((r = Qe(_)), (i = e.plainTime));
      }
    else r = Qe(e);
    let o = n(this, q),
      a = n(this, z),
      s = n(this, G),
      c = n(this, S),
      h = 0,
      f = 0,
      m = 0,
      y = 0,
      g = 0,
      v = 0;
    return (
      i !== void 0 &&
        ((i = Zr(i)),
        (h = n(i, te)),
        (f = n(i, ne)),
        (m = n(i, ie)),
        (y = n(i, oe)),
        (g = n(i, ae)),
        (v = n(i, se))),
      qe(n(cr(r, hr(o, a, s, h, f, m, y, g, v, c), 'compatible'), H), r, c)
    );
  }
  toPlainYearMonth() {
    if (!de(this)) throw new TypeError('invalid receiver');
    let e = n(this, S);
    return vt(e, ce(this, Ne(e, ['monthCode', 'year']), []));
  }
  toPlainMonthDay() {
    if (!de(this)) throw new TypeError('invalid receiver');
    let e = n(this, S);
    return At(e, ce(this, Ne(e, ['day', 'monthCode']), []));
  }
  getISOFields() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return {
      calendar: n(this, S),
      isoDay: n(this, G),
      isoMonth: n(this, z),
      isoYear: n(this, q),
    };
  }
  getCalendar() {
    if (!de(this)) throw new TypeError('invalid receiver');
    return Vt(n(this, S));
  }
  static from(e, r) {
    let i = he(r);
    return de(e) ? (Ye(i), Ir(n(e, q), n(e, z), n(e, G), n(e, S))) : ve(e, i);
  }
  static compare(e, r) {
    let i = ve(e),
      o = ve(r);
    return Hr(n(i, q), n(i, z), n(i, G), n(o, q), n(o, z), n(o, G));
  }
};
Ar(sn, 'Temporal.PlainDate');
var ln = class t {
  constructor(
    e,
    r,
    i,
    o = 0,
    a = 0,
    s = 0,
    c = 0,
    h = 0,
    f = 0,
    m = 'iso8601'
  ) {
    Ia(
      this,
      me(e),
      me(r),
      me(i),
      o === void 0 ? 0 : me(o),
      a === void 0 ? 0 : me(a),
      s === void 0 ? 0 : me(s),
      c === void 0 ? 0 : me(c),
      h === void 0 ? 0 : me(h),
      f === void 0 ? 0 : me(f),
      gr(m)
    );
  }
  get calendarId() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Ge(n(this, S));
  }
  get year() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Kn(n(this, S), this);
  }
  get month() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Qn(n(this, S), this);
  }
  get monthCode() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return _n(n(this, S), this);
  }
  get day() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return bn(n(this, S), this);
  }
  get hour() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return n(this, te);
  }
  get minute() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return n(this, ne);
  }
  get second() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return n(this, ie);
  }
  get millisecond() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return n(this, oe);
  }
  get microsecond() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return n(this, ae);
  }
  get nanosecond() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return n(this, se);
  }
  get era() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Hn(n(this, S), this);
  }
  get eraYear() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return ei(n(this, S), this);
  }
  get dayOfWeek() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return ro(n(this, S), this);
  }
  get dayOfYear() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return to(n(this, S), this);
  }
  get weekOfYear() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return no(n(this, S), this);
  }
  get yearOfWeek() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return io(n(this, S), this);
  }
  get daysInWeek() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return oo(n(this, S), this);
  }
  get daysInYear() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return ti(n(this, S), this);
  }
  get daysInMonth() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return ri(n(this, S), this);
  }
  get monthsInYear() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return ni(n(this, S), this);
  }
  get inLeapYear() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return ii(n(this, S), this);
  }
  with(e, r) {
    if (!re(this)) throw new TypeError('invalid receiver');
    if (!be(e)) throw new TypeError('invalid argument');
    Wt(e);
    let i = he(r),
      o = n(this, S),
      a = Ne(o, [
        'day',
        'hour',
        'microsecond',
        'millisecond',
        'minute',
        'month',
        'monthCode',
        'nanosecond',
        'second',
        'year',
      ]),
      s = ce(this, a, []);
    (s = wt(o, s, ce(e, a, 'partial'))), (s = ce(s, a, []));
    let {
      year: c,
      month: h,
      day: f,
      hour: m,
      minute: y,
      second: g,
      millisecond: v,
      microsecond: _,
      nanosecond: E,
    } = Tn(o, s, i);
    return hr(c, h, f, m, y, g, v, _, E, o);
  }
  withPlainTime(e) {
    if (!re(this)) throw new TypeError('invalid receiver');
    let r = n(this, q),
      i = n(this, z),
      o = n(this, G),
      a = n(this, S);
    if (e === void 0) return hr(r, i, o, 0, 0, 0, 0, 0, 0, a);
    let s = Zr(e);
    return hr(
      r,
      i,
      o,
      n(s, te),
      n(s, ne),
      n(s, ie),
      n(s, oe),
      n(s, ae),
      n(s, se),
      a
    );
  }
  withPlainDate(e) {
    if (!re(this)) throw new TypeError('invalid receiver');
    let r = ve(e),
      i = n(r, q),
      o = n(r, z),
      a = n(r, G),
      s = n(r, S),
      c = n(this, te),
      h = n(this, ne),
      f = n(this, ie),
      m = n(this, oe),
      y = n(this, ae),
      g = n(this, se);
    return (s = Sa(n(this, S), s)), hr(i, o, a, c, h, f, m, y, g, s);
  }
  withCalendar(e) {
    if (!re(this)) throw new TypeError('invalid receiver');
    let r = gr(e);
    return new t(
      n(this, q),
      n(this, z),
      n(this, G),
      n(this, te),
      n(this, ne),
      n(this, ie),
      n(this, oe),
      n(this, ae),
      n(this, se),
      r
    );
  }
  add(e, r) {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Ho('add', this, e, r);
  }
  subtract(e, r) {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Ho('subtract', this, e, r);
  }
  until(e, r) {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Go('until', this, e, r);
  }
  since(e, r) {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Go('since', this, e, r);
  }
  round(e) {
    if (!re(this)) throw new TypeError('invalid receiver');
    if (e === void 0) throw new TypeError('options parameter is required');
    let r = typeof e == 'string' ? Ut('smallestUnit', e) : he(e),
      i = Gt(r),
      o = Or(r, 'halfExpand'),
      a = yr(r, 'smallestUnit', 'time', gt, ['day']),
      s = {
        day: 1,
        hour: 24,
        minute: 60,
        second: 60,
        millisecond: 1e3,
        microsecond: 1e3,
        nanosecond: 1e3,
      }[a];
    Jt(i, s, s === 1);
    let c = n(this, q),
      h = n(this, z),
      f = n(this, G),
      m = n(this, te),
      y = n(this, ne),
      g = n(this, ie),
      v = n(this, oe),
      _ = n(this, ae),
      E = n(this, se);
    return (
      ({
        year: c,
        month: h,
        day: f,
        hour: m,
        minute: y,
        second: g,
        millisecond: v,
        microsecond: _,
        nanosecond: E,
      } = yo(c, h, f, m, y, g, v, _, E, i, a, o)),
      hr(c, h, f, m, y, g, v, _, E, n(this, S))
    );
  }
  equals(e) {
    if (!re(this)) throw new TypeError('invalid receiver');
    let r = ht(e);
    for (let i of [q, z, G, te, ne, ie, oe, ae, se])
      if (n(this, i) !== n(r, i)) return !1;
    return In(n(this, S), n(r, S));
  }
  toString(e) {
    if (!re(this)) throw new TypeError('invalid receiver');
    let r = he(e),
      i = pn(r),
      o = wn(r),
      a = Or(r, 'trunc'),
      s = yr(r, 'smallestUnit', 'time', void 0);
    if (s === 'hour')
      throw new RangeError(
        'smallestUnit must be a time unit other than "hour"'
      );
    let {precision: c, unit: h, increment: f} = vn(s, o);
    return jo(this, c, i, {unit: h, increment: f, roundingMode: a});
  }
  toJSON() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return jo(this, 'auto');
  }
  toLocaleString(e, r) {
    if (!re(this)) throw new TypeError('invalid receiver');
    return new Kr(e, r).format(this);
  }
  valueOf() {
    throw new TypeError(
      'use compare() or equals() to compare Temporal.PlainDateTime'
    );
  }
  toZonedDateTime(e, r) {
    if (!re(this)) throw new TypeError('invalid receiver');
    let i = Qe(e);
    return qe(n(cr(i, this, jt(he(r))), H), i, n(this, S));
  }
  toPlainDate() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return xt(this);
  }
  toPlainYearMonth() {
    if (!re(this)) throw new TypeError('invalid receiver');
    let e = n(this, S);
    return vt(e, ce(this, Ne(e, ['monthCode', 'year']), []));
  }
  toPlainMonthDay() {
    if (!re(this)) throw new TypeError('invalid receiver');
    let e = n(this, S);
    return At(e, ce(this, Ne(e, ['day', 'monthCode']), []));
  }
  toPlainTime() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return ao(this);
  }
  getISOFields() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return {
      calendar: n(this, S),
      isoDay: n(this, G),
      isoHour: n(this, te),
      isoMicrosecond: n(this, ae),
      isoMillisecond: n(this, oe),
      isoMinute: n(this, ne),
      isoMonth: n(this, z),
      isoNanosecond: n(this, se),
      isoSecond: n(this, ie),
      isoYear: n(this, q),
    };
  }
  getCalendar() {
    if (!re(this)) throw new TypeError('invalid receiver');
    return Vt(n(this, S));
  }
  static from(e, r) {
    let i = he(r);
    return re(e)
      ? (Ye(i),
        hr(
          n(e, q),
          n(e, z),
          n(e, G),
          n(e, te),
          n(e, ne),
          n(e, ie),
          n(e, oe),
          n(e, ae),
          n(e, se),
          n(e, S)
        ))
      : ht(e, i);
  }
  static compare(e, r) {
    let i = ht(e),
      o = ht(r);
    for (let a of [q, z, G, te, ne, ie, oe, ae, se]) {
      let s = n(i, a),
        c = n(o, a);
      if (s !== c) return ft(s - c);
    }
    return 0;
  }
};
Ar(ln, 'Temporal.PlainDateTime');
var cn = class t {
  constructor(
    e = 0,
    r = 0,
    i = 0,
    o = 0,
    a = 0,
    s = 0,
    c = 0,
    h = 0,
    f = 0,
    m = 0
  ) {
    let y = e === void 0 ? 0 : xe(e),
      g = r === void 0 ? 0 : xe(r),
      v = i === void 0 ? 0 : xe(i),
      _ = o === void 0 ? 0 : xe(o),
      E = a === void 0 ? 0 : xe(a),
      D = s === void 0 ? 0 : xe(s),
      C = c === void 0 ? 0 : xe(c),
      B = h === void 0 ? 0 : xe(h),
      R = f === void 0 ? 0 : xe(f),
      P = m === void 0 ? 0 : xe(m);
    Zn(y, g, v, _, E, D, C, B, R, P),
      xr(this),
      le(this, er, y),
      le(this, Ue, g),
      le(this, ur, v),
      le(this, rr, _),
      le(this, tr, E),
      le(this, nr, D),
      le(this, ir, C),
      le(this, or, B),
      le(this, ar, R),
      le(this, sr, P);
  }
  get years() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, er);
  }
  get months() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, Ue);
  }
  get weeks() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, ur);
  }
  get days() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, rr);
  }
  get hours() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, tr);
  }
  get minutes() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, nr);
  }
  get seconds() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, ir);
  }
  get milliseconds() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, or);
  }
  get microseconds() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, ar);
  }
  get nanoseconds() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return n(this, sr);
  }
  get sign() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return Pr(
      n(this, er),
      n(this, Ue),
      n(this, ur),
      n(this, rr),
      n(this, tr),
      n(this, nr),
      n(this, ir),
      n(this, or),
      n(this, ar),
      n(this, sr)
    );
  }
  get blank() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return (
      Pr(
        n(this, er),
        n(this, Ue),
        n(this, ur),
        n(this, rr),
        n(this, tr),
        n(this, nr),
        n(this, ir),
        n(this, or),
        n(this, ar),
        n(this, sr)
      ) === 0
    );
  }
  with(e) {
    if (!Be(this)) throw new TypeError('invalid receiver');
    let r = ce(
        e,
        [
          'days',
          'hours',
          'microseconds',
          'milliseconds',
          'minutes',
          'months',
          'nanoseconds',
          'seconds',
          'weeks',
          'years',
        ],
        'partial'
      ),
      {
        years: i = n(this, er),
        months: o = n(this, Ue),
        weeks: a = n(this, ur),
        days: s = n(this, rr),
        hours: c = n(this, tr),
        minutes: h = n(this, nr),
        seconds: f = n(this, ir),
        milliseconds: m = n(this, or),
        microseconds: y = n(this, ar),
        nanoseconds: g = n(this, sr),
      } = r;
    return new t(i, o, a, s, c, h, f, m, y, g);
  }
  negated() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return ja(this);
  }
  abs() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return new t(
      Math.abs(n(this, er)),
      Math.abs(n(this, Ue)),
      Math.abs(n(this, ur)),
      Math.abs(n(this, rr)),
      Math.abs(n(this, tr)),
      Math.abs(n(this, nr)),
      Math.abs(n(this, ir)),
      Math.abs(n(this, or)),
      Math.abs(n(this, ar)),
      Math.abs(n(this, sr))
    );
  }
  add(e, r) {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return Ko('add', this, e, r);
  }
  subtract(e, r) {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return Ko('subtract', this, e, r);
  }
  round(e) {
    if (!Be(this)) throw new TypeError('invalid receiver');
    if (e === void 0) throw new TypeError('options parameter is required');
    let r = n(this, er),
      i = n(this, Ue),
      o = n(this, ur),
      a = n(this, rr),
      s = n(this, tr),
      c = n(this, nr),
      h = n(this, ir),
      f = n(this, or),
      m = n(this, ar),
      y = n(this, sr),
      g = Ii(r, i, o, a, s, c, h, f, m, y),
      v = typeof e == 'string' ? Ut('smallestUnit', e) : he(e),
      _ = yr(v, 'largestUnit', 'datetime', void 0, ['auto']),
      E = Sn(v),
      D = Gt(v),
      C = Or(v, 'halfExpand'),
      B = yr(v, 'smallestUnit', 'datetime', void 0),
      R = !0;
    B || ((R = !1), (B = 'nanosecond')), (g = pt(g, B));
    let P = !0;
    if ((_ || ((P = !1), (_ = g)), _ === 'auto' && (_ = g), !R && !P))
      throw new RangeError(
        'at least one of smallestUnit or largestUnit is required'
      );
    if (pt(_, B) !== _)
      throw new RangeError(
        `largestUnit ${_} cannot be smaller than smallestUnit ${B}`
      );
    let L = {
      hour: 24,
      minute: 60,
      second: 60,
      millisecond: 1e3,
      microsecond: 1e3,
      nanosecond: 1e3,
    }[B];
    return (
      L !== void 0 && Jt(D, L, !1),
      ({years: r, months: i, weeks: o, days: a} = kn(r, i, o, a, _, E)),
      ({
        years: r,
        months: i,
        weeks: o,
        days: a,
        hours: s,
        minutes: c,
        seconds: h,
        milliseconds: f,
        microseconds: m,
        nanoseconds: y,
      } = Jr(r, i, o, a, s, c, h, f, m, y, D, B, C, E)),
      ({
        years: r,
        months: i,
        weeks: o,
        days: a,
        hours: s,
        minutes: c,
        seconds: h,
        milliseconds: f,
        microseconds: m,
        nanoseconds: y,
      } = Ga(r, i, o, a, s, c, h, f, m, y, D, B, C, E)),
      ({
        days: a,
        hours: s,
        minutes: c,
        seconds: h,
        milliseconds: f,
        microseconds: m,
        nanoseconds: y,
      } = Cr(a, s, c, h, f, m, y, _, E)),
      ({
        years: r,
        months: i,
        weeks: o,
        days: a,
      } = (function (Y, M, $, A, K, w) {
        let V = x('%Temporal.Duration%'),
          l = Pr(Y, M, $, A, 0, 0, 0, 0, 0, 0);
        if (l === 0) return {years: Y, months: M, weeks: $, days: A};
        let u = d.default.BigInt(l),
          p,
          T,
          b = d.default.BigInt(Y),
          I = d.default.BigInt(M),
          O = d.default.BigInt($),
          k = d.default.BigInt(A);
        w && ((T = ve(w)), (p = n(T, S)));
        let F = new V(l),
          N = new V(0, l),
          Z = new V(0, 0, l);
        switch (K) {
          case 'year': {
            if (!p)
              throw new RangeError(
                'a starting point is required for years balancing'
              );
            let U = typeof p != 'string' ? ge(p, 'dateAdd') : void 0,
              W,
              J,
              ee;
            for (
              {relativeTo: W, days: J} = Xe(p, T, F, U);
              d.default.greaterThanOrEqual(kr(k), d.default.BigInt(_e(J)));

            )
              (k = d.default.subtract(k, d.default.BigInt(J))),
                (b = d.default.add(b, u)),
                (T = W),
                ({relativeTo: W, days: J} = Xe(p, T, F, U));
            for (
              {relativeTo: W, days: ee} = Xe(p, T, N, U);
              d.default.greaterThanOrEqual(kr(k), d.default.BigInt(_e(ee)));

            )
              (k = d.default.subtract(k, d.default.BigInt(ee))),
                (I = d.default.add(I, u)),
                (T = W),
                ({relativeTo: W, days: ee} = Xe(p, T, N, U));
            W = ze(p, T, F, void 0, U);
            let ue = typeof p != 'string' ? ge(p, 'dateUntil') : void 0,
              we = He(null);
            we.largestUnit = 'month';
            let Ee = et(p, T, W, we, ue),
              Je = n(Ee, Ue);
            for (
              ;
              d.default.greaterThanOrEqual(kr(I), d.default.BigInt(_e(Je)));

            ) {
              (I = d.default.subtract(I, d.default.BigInt(Je))),
                (b = d.default.add(b, u)),
                (T = W),
                (W = ze(p, T, F, void 0, U));
              let Ze = He(null);
              (Ze.largestUnit = 'month'),
                (Ee = et(p, T, W, Ze, ue)),
                (Je = n(Ee, Ue));
            }
            break;
          }
          case 'month': {
            if (!p)
              throw new RangeError(
                'a starting point is required for months balancing'
              );
            let U = typeof p != 'string' ? ge(p, 'dateAdd') : void 0,
              W,
              J;
            for (
              {relativeTo: W, days: J} = Xe(p, T, N, U);
              d.default.greaterThanOrEqual(kr(k), d.default.BigInt(_e(J)));

            )
              (k = d.default.subtract(k, d.default.BigInt(J))),
                (I = d.default.add(I, u)),
                (T = W),
                ({relativeTo: W, days: J} = Xe(p, T, N, U));
            break;
          }
          case 'week': {
            if (!p)
              throw new RangeError(
                'a starting point is required for weeks balancing'
              );
            let U = typeof p != 'string' ? ge(p, 'dateAdd') : void 0,
              W,
              J;
            for (
              {relativeTo: W, days: J} = Xe(p, T, Z, U);
              d.default.greaterThanOrEqual(kr(k), d.default.BigInt(_e(J)));

            )
              (k = d.default.subtract(k, d.default.BigInt(J))),
                (O = d.default.add(O, u)),
                (T = W),
                ({relativeTo: W, days: J} = Xe(p, T, Z, U));
            break;
          }
        }
        return {
          years: d.default.toNumber(b),
          months: d.default.toNumber(I),
          weeks: d.default.toNumber(O),
          days: d.default.toNumber(k),
        };
      })(r, i, o, a, _, E)),
      new t(r, i, o, a, s, c, h, f, m, y)
    );
  }
  total(e) {
    if (!Be(this)) throw new TypeError('invalid receiver');
    let r = n(this, er),
      i = n(this, Ue),
      o = n(this, ur),
      a = n(this, rr),
      s = n(this, tr),
      c = n(this, nr),
      h = n(this, ir),
      f = n(this, or),
      m = n(this, ar),
      y = n(this, sr);
    if (e === void 0) throw new TypeError('options argument is required');
    let g = typeof e == 'string' ? Ut('unit', e) : he(e),
      v = Sn(g),
      _ = yr(g, 'unit', 'datetime', gt),
      E;
    ({years: r, months: i, weeks: o, days: a} = kn(r, i, o, a, _, v)),
      X(v) && (E = Wa(v, r, i, o, 0));
    let D = Fa(a, s, c, h, f, m, y, _, E);
    if (D === 'positive overflow') return 1 / 0;
    if (D === 'negative overflow') return -1 / 0;
    ({
      days: a,
      hours: s,
      minutes: c,
      seconds: h,
      milliseconds: f,
      microseconds: m,
      nanoseconds: y,
    } = D);
    let {total: C} = Jr(r, i, o, a, s, c, h, f, m, y, 1, _, 'trunc', v);
    return C;
  }
  toString(e) {
    if (!Be(this)) throw new TypeError('invalid receiver');
    let r = he(e),
      i = wn(r),
      o = Or(r, 'trunc'),
      a = yr(r, 'smallestUnit', 'time', void 0);
    if (a === 'hour' || a === 'minute')
      throw new RangeError(
        'smallestUnit must be a time unit other than "hours" or "minutes"'
      );
    let {precision: s, unit: c, increment: h} = vn(a, i);
    return yi(this, s, {unit: c, increment: h, roundingMode: o});
  }
  toJSON() {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return yi(this);
  }
  toLocaleString(e, r) {
    if (!Be(this)) throw new TypeError('invalid receiver');
    return typeof Intl < 'u' && Intl.DurationFormat !== void 0
      ? new Intl.DurationFormat(e, r).format(this)
      : (console.warn(
          'Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat.'
        ),
        yi(this));
  }
  valueOf() {
    throw new TypeError('use compare() to compare Temporal.Duration');
  }
  static from(e) {
    return Be(e)
      ? new t(
          n(e, er),
          n(e, Ue),
          n(e, ur),
          n(e, rr),
          n(e, tr),
          n(e, nr),
          n(e, ir),
          n(e, or),
          n(e, ar),
          n(e, sr)
        )
      : Bt(e);
  }
  static compare(e, r, i) {
    let o = Bt(e),
      a = Bt(r),
      s = Sn(he(i)),
      c = n(o, er),
      h = n(o, Ue),
      f = n(o, ur),
      m = n(o, rr),
      y = n(o, tr),
      g = n(o, nr),
      v = n(o, ir),
      _ = n(o, or),
      E = n(o, ar),
      D = n(o, sr),
      C = n(a, er),
      B = n(a, Ue),
      R = n(a, ur),
      P = n(a, rr),
      L = n(a, tr),
      j = n(a, nr),
      Y = n(a, ir),
      M = n(a, or),
      $ = n(a, ar),
      A = n(a, sr),
      K = qo(s, c, h, f, m),
      w = qo(s, C, B, R, P);
    (c === 0 && C === 0 && h === 0 && B === 0 && f === 0 && R === 0) ||
      (({days: m} = kn(c, h, f, m, 'day', s)),
      ({days: P} = kn(C, B, R, P, 'day', s)));
    let V = Lt(m, y, g, v, _, E, D, K),
      l = Lt(P, L, j, Y, M, $, A, w);
    return ft(d.default.toNumber(d.default.subtract(V, l)));
  }
};
Ar(cn, 'Temporal.Duration');
var el = Object.create,
  dn = class {
    constructor(e, r, i = 'iso8601', o = 1972) {
      Da(this, me(e), me(r), gr(i), me(o));
    }
    get monthCode() {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      return _n(n(this, S), this);
    }
    get day() {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      return bn(n(this, S), this);
    }
    get calendarId() {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      return Ge(n(this, S));
    }
    with(e, r) {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('invalid argument');
      Wt(e);
      let i = he(r),
        o = n(this, S),
        a = Ne(o, ['day', 'month', 'monthCode', 'year']),
        s = ce(this, a, []);
      return (
        (s = wt(o, s, ce(e, a, 'partial'))), (s = ce(s, a, [])), At(o, s, i)
      );
    }
    equals(e) {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      let r = Po(e);
      for (let i of [z, G, q]) if (n(this, i) !== n(r, i)) return !1;
      return In(n(this, S), n(r, S));
    }
    toString(e) {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      return Ao(this, pn(he(e)));
    }
    toJSON() {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      return Ao(this);
    }
    toLocaleString(e, r) {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      return new Kr(e, r).format(this);
    }
    valueOf() {
      throw new TypeError('use equals() to compare Temporal.PlainMonthDay');
    }
    toPlainDate(e) {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('argument should be an object');
      let r = n(this, S),
        i = Ne(r, ['day', 'monthCode']),
        o = ce(this, i, []),
        a = Ne(r, ['year']),
        s = wt(r, o, ce(e, a, []));
      s = ce(s, [...new Set([...i, ...a])], []);
      let c = el(null);
      return (c.overflow = 'reject'), Gr(r, s, c);
    }
    getISOFields() {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      return {
        calendar: n(this, S),
        isoDay: n(this, G),
        isoMonth: n(this, z),
        isoYear: n(this, q),
      };
    }
    getCalendar() {
      if (!Ae(this)) throw new TypeError('invalid receiver');
      return Vt(n(this, S));
    }
    static from(e, r) {
      let i = he(r);
      return Ae(e) ? (Ye(i), tn(n(e, z), n(e, G), n(e, S), n(e, q))) : Po(e, i);
    }
  };
Ar(dn, 'Temporal.PlainMonthDay');
var _o = () => new (x('%Temporal.Instant%'))(po()),
  ia = (t, e = Qr()) => {
    let r = Qe(e),
      i = gr(t);
    return vr(r, _o(), i);
  },
  vi = (t = Qr()) => vr(Qe(t), _o(), 'iso8601'),
  oa = (t, e = Qr()) => {
    let r = Qe(e),
      i = gr(t);
    return qe(po(), r, i);
  },
  ds = {
    instant: _o,
    plainDateTime: ia,
    plainDateTimeISO: vi,
    plainDate: (t, e = Qr()) => xt(ia(t, e)),
    plainDateISO: (t = Qr()) => xt(vi(t)),
    plainTimeISO: (t = Qr()) => ao(vi(t)),
    timeZoneId: () => Qr(),
    zonedDateTime: oa,
    zonedDateTimeISO: (t = Qr()) => oa('iso8601', t),
    [Symbol.toStringTag]: 'Temporal.Now',
  };
Object.defineProperty(ds, Symbol.toStringTag, {
  value: 'Temporal.Now',
  writable: !1,
  enumerable: !1,
  configurable: !0,
});
var rl = Object.assign;
function aa(t, e, r) {
  let i = n(t, te),
    o = n(t, ne),
    a = n(t, ie),
    s = n(t, oe),
    c = n(t, ae),
    h = n(t, se);
  if (r) {
    let {unit: f, increment: m, roundingMode: y} = r;
    ({
      hour: i,
      minute: o,
      second: a,
      millisecond: s,
      microsecond: c,
      nanosecond: h,
    } = go(i, o, a, s, c, h, m, f, y));
  }
  return `${Ce(i)}:${Ce(o)}${ai(a, s, c, h, e)}`;
}
var un = class t {
  constructor(e = 0, r = 0, i = 0, o = 0, a = 0, s = 0) {
    let c = e === void 0 ? 0 : me(e),
      h = r === void 0 ? 0 : me(r),
      f = i === void 0 ? 0 : me(i),
      m = o === void 0 ? 0 : me(o),
      y = a === void 0 ? 0 : me(a),
      g = s === void 0 ? 0 : me(s);
    ci(c, h, f, m, y, g),
      xr(this),
      le(this, te, c),
      le(this, ne, h),
      le(this, ie, f),
      le(this, oe, m),
      le(this, ae, y),
      le(this, se, g);
  }
  get hour() {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return n(this, te);
  }
  get minute() {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return n(this, ne);
  }
  get second() {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return n(this, ie);
  }
  get millisecond() {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return n(this, oe);
  }
  get microsecond() {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return n(this, ae);
  }
  get nanosecond() {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return n(this, se);
  }
  with(e, r) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    if (!be(e)) throw new TypeError('invalid argument');
    Wt(e);
    let i = Ye(he(r)),
      o = An(e, 'partial'),
      a = An(this),
      {
        hour: s,
        minute: c,
        second: h,
        millisecond: f,
        microsecond: m,
        nanosecond: y,
      } = rl(a, o);
    return (
      ({
        hour: s,
        minute: c,
        second: h,
        millisecond: f,
        microsecond: m,
        nanosecond: y,
      } = Xn(s, c, h, f, m, y, i)),
      new t(s, c, h, f, m, y)
    );
  }
  add(e) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return ea('add', this, e);
  }
  subtract(e) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return ea('subtract', this, e);
  }
  until(e, r) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return Jo('until', this, e, r);
  }
  since(e, r) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return Jo('since', this, e, r);
  }
  round(e) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    if (e === void 0) throw new TypeError('options parameter is required');
    let r = typeof e == 'string' ? Ut('smallestUnit', e) : he(e),
      i = Gt(r),
      o = Or(r, 'halfExpand'),
      a = yr(r, 'smallestUnit', 'time', gt);
    Jt(
      i,
      {
        hour: 24,
        minute: 60,
        second: 60,
        millisecond: 1e3,
        microsecond: 1e3,
        nanosecond: 1e3,
      }[a],
      !1
    );
    let s = n(this, te),
      c = n(this, ne),
      h = n(this, ie),
      f = n(this, oe),
      m = n(this, ae),
      y = n(this, se);
    return (
      ({
        hour: s,
        minute: c,
        second: h,
        millisecond: f,
        microsecond: m,
        nanosecond: y,
      } = go(s, c, h, f, m, y, i, a, o)),
      new t(s, c, h, f, m, y)
    );
  }
  equals(e) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    let r = Zr(e);
    for (let i of [te, ne, ie, oe, ae, se])
      if (n(this, i) !== n(r, i)) return !1;
    return !0;
  }
  toString(e) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    let r = he(e),
      i = wn(r),
      o = Or(r, 'trunc'),
      a = yr(r, 'smallestUnit', 'time', void 0);
    if (a === 'hour')
      throw new RangeError(
        'smallestUnit must be a time unit other than "hour"'
      );
    let {precision: s, unit: c, increment: h} = vn(a, i);
    return aa(this, s, {unit: c, increment: h, roundingMode: o});
  }
  toJSON() {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return aa(this, 'auto');
  }
  toLocaleString(e, r) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return new Kr(e, r).format(this);
  }
  valueOf() {
    throw new TypeError(
      'use compare() or equals() to compare Temporal.PlainTime'
    );
  }
  toPlainDateTime(e) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    let r = ve(e),
      i = n(r, q),
      o = n(r, z),
      a = n(r, G),
      s = n(r, S);
    return hr(
      i,
      o,
      a,
      n(this, te),
      n(this, ne),
      n(this, ie),
      n(this, oe),
      n(this, ae),
      n(this, se),
      s
    );
  }
  toZonedDateTime(e) {
    if (!Me(this)) throw new TypeError('invalid receiver');
    if (!be(e)) throw new TypeError('invalid argument');
    let r = e.plainDate;
    if (r === void 0) throw new TypeError('missing date property');
    let i = ve(r),
      o = e.timeZone;
    if (o === void 0) throw new TypeError('missing timeZone property');
    let a = Qe(o),
      s = n(i, q),
      c = n(i, z),
      h = n(i, G),
      f = n(i, S),
      m = n(this, te),
      y = n(this, ne),
      g = n(this, ie),
      v = n(this, oe),
      _ = n(this, ae),
      E = n(this, se);
    return qe(
      n(
        cr(
          a,
          new (x('%Temporal.PlainDateTime%'))(s, c, h, m, y, g, v, _, E, f),
          'compatible'
        ),
        H
      ),
      a,
      f
    );
  }
  getISOFields() {
    if (!Me(this)) throw new TypeError('invalid receiver');
    return {
      isoHour: n(this, te),
      isoMicrosecond: n(this, ae),
      isoMillisecond: n(this, oe),
      isoMinute: n(this, ne),
      isoNanosecond: n(this, se),
      isoSecond: n(this, ie),
    };
  }
  static from(e, r) {
    let i = Ye(he(r));
    return Me(e)
      ? new t(n(e, te), n(e, ne), n(e, ie), n(e, oe), n(e, ae), n(e, se))
      : Zr(e, i);
  }
  static compare(e, r) {
    let i = Zr(e),
      o = Zr(r);
    for (let a of [te, ne, ie, oe, ae, se]) {
      let s = n(i, a),
        c = n(o, a);
      if (s !== c) return ft(s - c);
    }
    return 0;
  }
};
Ar(un, 'Temporal.PlainTime');
var yt = class {
  constructor(e) {
    if (arguments.length < 1)
      throw new RangeError('missing argument: identifier is required');
    let r = so(e);
    xr(this), le(this, Rr, r);
  }
  get id() {
    if (!_r(this)) throw new TypeError('invalid receiver');
    return n(this, Rr);
  }
  getOffsetNanosecondsFor(e) {
    if (!_r(this)) throw new TypeError('invalid receiver');
    let r = Sr(e),
      i = n(this, Rr);
    return kt(i) ? rt(i) : qr(i, n(r, H));
  }
  getOffsetStringFor(e) {
    if (!_r(this)) throw new TypeError('invalid receiver');
    return Di(this, Sr(e));
  }
  getPlainDateTimeFor(e, r = 'iso8601') {
    if (!_r(this)) throw new TypeError('invalid receiver');
    return vr(this, Sr(e), gr(r));
  }
  getInstantFor(e, r) {
    if (!_r(this)) throw new TypeError('invalid receiver');
    return cr(this, ht(e), jt(he(r)));
  }
  getPossibleInstantsFor(e) {
    if (!_r(this)) throw new TypeError('invalid receiver');
    let r = ht(e),
      i = x('%Temporal.Instant%'),
      o = n(this, Rr);
    if (kt(o)) {
      let s = tt(
        n(r, q),
        n(r, z),
        n(r, G),
        n(r, te),
        n(r, ne),
        n(r, ie),
        n(r, oe),
        n(r, ae),
        n(r, se)
      );
      if (s === null)
        throw new RangeError('DateTime outside of supported range');
      let c = rt(o);
      return [new i(d.default.subtract(s, d.default.BigInt(c)))];
    }
    return (function (c, h, f, m, y, g, v, _, E, D) {
      let C = tt(h, f, m, y, g, v, _, E, D);
      if (C === null)
        throw new RangeError('DateTime outside of supported range');
      let B = d.default.subtract(C, Nr);
      d.default.lessThan(B, rn) && (B = C);
      let R = d.default.add(C, Nr);
      d.default.greaterThan(R, Nt) && (R = C);
      let P = qr(c, B),
        L = qr(c, R);
      return (P === L ? [P] : [P, L])
        .map(j => {
          let Y = d.default.subtract(C, d.default.BigInt(j)),
            M = Ya(c, Y);
          if (
            h === M.year &&
            f === M.month &&
            m === M.day &&
            y === M.hour &&
            g === M.minute &&
            v === M.second &&
            _ === M.millisecond &&
            E === M.microsecond &&
            D === M.nanosecond
          )
            return Y;
        })
        .filter(j => j !== void 0);
    })(
      o,
      n(r, q),
      n(r, z),
      n(r, G),
      n(r, te),
      n(r, ne),
      n(r, ie),
      n(r, oe),
      n(r, ae),
      n(r, se)
    ).map(s => new i(s));
  }
  getNextTransition(e) {
    if (!_r(this)) throw new TypeError('invalid receiver');
    let r = Sr(e),
      i = n(this, Rr);
    if (kt(i) || i === 'UTC') return null;
    let o = n(r, H),
      a = x('%Temporal.Instant%');
    return (o = Na(i, o)), o === null ? null : new a(o);
  }
  getPreviousTransition(e) {
    if (!_r(this)) throw new TypeError('invalid receiver');
    let r = Sr(e),
      i = n(this, Rr);
    if (kt(i) || i === 'UTC') return null;
    let o = n(r, H),
      a = x('%Temporal.Instant%');
    return (o = Ci(i, o)), o === null ? null : new a(o);
  }
  toString() {
    if (!_r(this)) throw new TypeError('invalid receiver');
    return n(this, Rr);
  }
  toJSON() {
    if (!_r(this)) throw new TypeError('invalid receiver');
    return n(this, Rr);
  }
  static from(e) {
    return Oa(Qe(e));
  }
};
Ar(yt, 'Temporal.TimeZone'),
  Se(
    'Temporal.TimeZone.prototype.getOffsetNanosecondsFor',
    yt.prototype.getOffsetNanosecondsFor
  ),
  Se(
    'Temporal.TimeZone.prototype.getPossibleInstantsFor',
    yt.prototype.getPossibleInstantsFor
  );
var tl = Object.create,
  hn = class {
    constructor(e, r, i = 'iso8601', o = 1) {
      Ca(this, me(e), me(r), gr(i), me(o));
    }
    get year() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return Kn(n(this, S), this);
    }
    get month() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return Qn(n(this, S), this);
    }
    get monthCode() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return _n(n(this, S), this);
    }
    get calendarId() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return Ge(n(this, S));
    }
    get era() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return Hn(n(this, S), this);
    }
    get eraYear() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return ei(n(this, S), this);
    }
    get daysInMonth() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return ri(n(this, S), this);
    }
    get daysInYear() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return ti(n(this, S), this);
    }
    get monthsInYear() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return ni(n(this, S), this);
    }
    get inLeapYear() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return ii(n(this, S), this);
    }
    with(e, r) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('invalid argument');
      Wt(e);
      let i = he(r),
        o = n(this, S),
        a = Ne(o, ['month', 'monthCode', 'year']),
        s = ce(this, a, []);
      return (
        (s = wt(o, s, ce(e, a, 'partial'))), (s = ce(s, a, [])), vt(o, s, i)
      );
    }
    add(e, r) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return ra('add', this, e, r);
    }
    subtract(e, r) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return ra('subtract', this, e, r);
    }
    until(e, r) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return Vo('until', this, e, r);
    }
    since(e, r) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return Vo('since', this, e, r);
    }
    equals(e) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      let r = Kt(e);
      for (let i of [q, z, G]) if (n(this, i) !== n(r, i)) return !1;
      return In(n(this, S), n(r, S));
    }
    toString(e) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return xo(this, pn(he(e)));
    }
    toJSON() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return xo(this);
    }
    toLocaleString(e, r) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return new Kr(e, r).format(this);
    }
    valueOf() {
      throw new TypeError(
        'use compare() or equals() to compare Temporal.PlainYearMonth'
      );
    }
    toPlainDate(e) {
      if (!fe(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('argument should be an object');
      let r = n(this, S),
        i = Ne(r, ['monthCode', 'year']),
        o = ce(this, i, []),
        a = Ne(r, ['day']),
        s = wt(r, o, ce(e, a, []));
      s = ce(s, [...new Set([...i, ...a])], []);
      let c = tl(null);
      return (c.overflow = 'reject'), Gr(r, s, c);
    }
    getISOFields() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return {
        calendar: n(this, S),
        isoDay: n(this, G),
        isoMonth: n(this, z),
        isoYear: n(this, q),
      };
    }
    getCalendar() {
      if (!fe(this)) throw new TypeError('invalid receiver');
      return Vt(n(this, S));
    }
    static from(e, r) {
      let i = he(r);
      return fe(e) ? (Ye(i), nn(n(e, q), n(e, z), n(e, S), n(e, G))) : Kt(e, i);
    }
    static compare(e, r) {
      let i = Kt(e),
        o = Kt(r);
      return Hr(n(i, q), n(i, z), n(i, G), n(o, q), n(o, z), n(o, G));
    }
  };
Ar(hn, 'Temporal.PlainYearMonth');
var nl = Kr.prototype.resolvedOptions,
  il = Object.create,
  mn = class {
    constructor(e, r, i = 'iso8601') {
      if (arguments.length < 1)
        throw new TypeError('missing argument: epochNanoseconds is required');
      ka(this, Ht(e), Qe(r), gr(i));
    }
    get calendarId() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Ge(n(this, S));
    }
    get timeZoneId() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return on(n(this, pe));
    }
    get year() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Kn(n(this, S), Te(this));
    }
    get month() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Qn(n(this, S), Te(this));
    }
    get monthCode() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return _n(n(this, S), Te(this));
    }
    get day() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return bn(n(this, S), Te(this));
    }
    get hour() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return n(Te(this), te);
    }
    get minute() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return n(Te(this), ne);
    }
    get second() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return n(Te(this), ie);
    }
    get millisecond() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return n(Te(this), oe);
    }
    get microsecond() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return n(Te(this), ae);
    }
    get nanosecond() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return n(Te(this), se);
    }
    get era() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Hn(n(this, S), Te(this));
    }
    get eraYear() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ei(n(this, S), Te(this));
    }
    get epochSeconds() {
      if (!X(this)) throw new TypeError('invalid receiver');
      let e = n(this, H);
      return d.default.toNumber(Mt(e, Yr));
    }
    get epochMilliseconds() {
      if (!X(this)) throw new TypeError('invalid receiver');
      let e = n(this, H);
      return d.default.toNumber(Mt(e, wr));
    }
    get epochMicroseconds() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return zn(Mt(n(this, H), ye));
    }
    get epochNanoseconds() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return zn(n(this, H));
    }
    get dayOfWeek() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ro(n(this, S), Te(this));
    }
    get dayOfYear() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return to(n(this, S), Te(this));
    }
    get weekOfYear() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return no(n(this, S), Te(this));
    }
    get yearOfWeek() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return io(n(this, S), Te(this));
    }
    get hoursInDay() {
      if (!X(this)) throw new TypeError('invalid receiver');
      let e = Te(this),
        r = x('%Temporal.PlainDateTime%'),
        i = n(e, q),
        o = n(e, z),
        a = n(e, G),
        s = new r(i, o, a, 0, 0, 0, 0, 0, 0),
        c = mt(i, o, a, 0, 0, 0, 1, 'reject'),
        h = new r(c.year, c.month, c.day, 0, 0, 0, 0, 0, 0),
        f = n(this, pe),
        m = n(cr(f, s, 'compatible'), H),
        y = n(cr(f, h, 'compatible'), H);
      return Mr(d.default.subtract(y, m), wa);
    }
    get daysInWeek() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return oo(n(this, S), Te(this));
    }
    get daysInMonth() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ri(n(this, S), Te(this));
    }
    get daysInYear() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ti(n(this, S), Te(this));
    }
    get monthsInYear() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ni(n(this, S), Te(this));
    }
    get inLeapYear() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ii(n(this, S), Te(this));
    }
    get offset() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Di(n(this, pe), n(this, Ke));
    }
    get offsetNanoseconds() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Br(n(this, pe), n(this, Ke));
    }
    with(e, r) {
      if (!X(this)) throw new TypeError('invalid receiver');
      if (!be(e)) throw new TypeError('invalid zoned-date-time-like');
      Wt(e);
      let i = he(r),
        o = n(this, S),
        a = Ne(o, [
          'day',
          'hour',
          'microsecond',
          'millisecond',
          'minute',
          'month',
          'monthCode',
          'nanosecond',
          'second',
          'year',
        ]);
      a.push('offset');
      let s = ce(this, a, ['offset']);
      (s = wt(o, s, ce(e, a, 'partial'))), (s = ce(s, a, ['offset']));
      let c = jt(i),
        h = jn(i, 'prefer'),
        {
          year: f,
          month: m,
          day: y,
          hour: g,
          minute: v,
          second: _,
          millisecond: E,
          microsecond: D,
          nanosecond: C,
        } = Tn(o, s, i),
        B = rt(s.offset),
        R = n(this, pe);
      return qe(xn(f, m, y, g, v, _, E, D, C, 'option', B, R, c, h, !1), R, o);
    }
    withPlainDate(e) {
      if (!X(this)) throw new TypeError('invalid receiver');
      let r = ve(e),
        i = n(r, q),
        o = n(r, z),
        a = n(r, G),
        s = n(r, S),
        c = Te(this),
        h = n(c, te),
        f = n(c, ne),
        m = n(c, ie),
        y = n(c, oe),
        g = n(c, ae),
        v = n(c, se);
      s = Sa(n(this, S), s);
      let _ = n(this, pe);
      return qe(
        n(
          cr(
            _,
            new (x('%Temporal.PlainDateTime%'))(i, o, a, h, f, m, y, g, v, s),
            'compatible'
          ),
          H
        ),
        _,
        s
      );
    }
    withPlainTime(e) {
      if (!X(this)) throw new TypeError('invalid receiver');
      let r = x('%Temporal.PlainTime%'),
        i = e === void 0 ? new r() : Zr(e),
        o = Te(this),
        a = n(o, q),
        s = n(o, z),
        c = n(o, G),
        h = n(this, S),
        f = n(i, te),
        m = n(i, ne),
        y = n(i, ie),
        g = n(i, oe),
        v = n(i, ae),
        _ = n(i, se),
        E = n(this, pe);
      return qe(
        n(
          cr(
            E,
            new (x('%Temporal.PlainDateTime%'))(a, s, c, f, m, y, g, v, _, h),
            'compatible'
          ),
          H
        ),
        E,
        h
      );
    }
    withTimeZone(e) {
      if (!X(this)) throw new TypeError('invalid receiver');
      let r = Qe(e);
      return qe(n(this, H), r, n(this, S));
    }
    withCalendar(e) {
      if (!X(this)) throw new TypeError('invalid receiver');
      let r = gr(e);
      return qe(n(this, H), n(this, pe), r);
    }
    add(e, r) {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ta('add', this, e, r);
    }
    subtract(e, r) {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ta('subtract', this, e, r);
    }
    until(e, r) {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Xo('until', this, e, r);
    }
    since(e, r) {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Xo('since', this, e, r);
    }
    round(e) {
      if (!X(this)) throw new TypeError('invalid receiver');
      if (e === void 0) throw new TypeError('options parameter is required');
      let r = typeof e == 'string' ? Ut('smallestUnit', e) : he(e),
        i = Gt(r),
        o = Or(r, 'halfExpand'),
        a = yr(r, 'smallestUnit', 'time', gt, ['day']),
        s = {
          day: 1,
          hour: 24,
          minute: 60,
          second: 60,
          millisecond: 1e3,
          microsecond: 1e3,
          nanosecond: 1e3,
        }[a];
      Jt(i, s, s === 1);
      let c = Te(this),
        h = n(c, q),
        f = n(c, z),
        m = n(c, G),
        y = n(c, te),
        g = n(c, ne),
        v = n(c, ie),
        _ = n(c, oe),
        E = n(c, ae),
        D = n(c, se),
        C = x('%Temporal.PlainDateTime%'),
        B = n(this, pe),
        R = n(this, S),
        P = cr(
          B,
          new C(n(c, q), n(c, z), n(c, G), 0, 0, 0, 0, 0, 0),
          'compatible'
        ),
        L = Er(P, B, R, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
        j = d.default.subtract(L, d.default.BigInt(n(P, H)));
      if (d.default.lessThanOrEqual(j, Re))
        throw new RangeError(
          'cannot round a ZonedDateTime in a calendar with zero or negative length days'
        );
      return (
        ({
          year: h,
          month: f,
          day: m,
          hour: y,
          minute: g,
          second: v,
          millisecond: _,
          microsecond: E,
          nanosecond: D,
        } = yo(h, f, m, y, g, v, _, E, D, i, a, o, d.default.toNumber(j))),
        qe(
          xn(
            h,
            f,
            m,
            y,
            g,
            v,
            _,
            E,
            D,
            'option',
            Br(B, n(this, Ke)),
            B,
            'compatible',
            'prefer',
            !1
          ),
          B,
          n(this, S)
        )
      );
    }
    equals(e) {
      if (!X(this)) throw new TypeError('invalid receiver');
      let r = Qt(e),
        i = n(this, H),
        o = n(r, H);
      return (
        !!d.default.equal(d.default.BigInt(i), d.default.BigInt(o)) &&
        !!Ba(n(this, pe), n(r, pe)) &&
        In(n(this, S), n(r, S))
      );
    }
    toString(e) {
      if (!X(this)) throw new TypeError('invalid receiver');
      let r = he(e),
        i = pn(r),
        o = wn(r),
        a = (function (v) {
          return it(v, 'offset', ['auto', 'never'], 'auto');
        })(r),
        s = Or(r, 'trunc'),
        c = yr(r, 'smallestUnit', 'time', void 0);
      if (c === 'hour')
        throw new RangeError(
          'smallestUnit must be a time unit other than "hour"'
        );
      let h = (function (v) {
          return it(v, 'timeZoneName', ['auto', 'never', 'critical'], 'auto');
        })(r),
        {precision: f, unit: m, increment: y} = vn(c, o);
      return Lo(this, f, i, h, a, {unit: m, increment: y, roundingMode: s});
    }
    toLocaleString(e, r) {
      if (!X(this)) throw new TypeError('invalid receiver');
      let i = he(r),
        o = il(null);
      if ((Ot(o, i, ['timeZone']), i.timeZone !== void 0))
        throw new TypeError(
          'ZonedDateTime toLocaleString does not accept a timeZone option'
        );
      o.year === void 0 &&
        o.month === void 0 &&
        o.day === void 0 &&
        o.weekday === void 0 &&
        o.dateStyle === void 0 &&
        o.hour === void 0 &&
        o.minute === void 0 &&
        o.second === void 0 &&
        o.timeStyle === void 0 &&
        o.dayPeriod === void 0 &&
        o.timeZoneName === void 0 &&
        (o.timeZoneName = 'short');
      let a = on(n(this, pe));
      if (kt(a))
        throw new RangeError(
          'toLocaleString does not support offset string time zones'
        );
      (a = so(a)), (o.timeZone = a);
      let s = new Kr(e, o),
        c = Q(nl, s, []).calendar,
        h = Ge(n(this, S));
      if (h !== 'iso8601' && c !== 'iso8601' && c !== h)
        throw new RangeError(
          `cannot format ZonedDateTime with calendar ${h} in locale with calendar ${c}`
        );
      return s.format(n(this, Ke));
    }
    toJSON() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Lo(this, 'auto');
    }
    valueOf() {
      throw new TypeError(
        'use compare() or equals() to compare Temporal.ZonedDateTime'
      );
    }
    startOfDay() {
      if (!X(this)) throw new TypeError('invalid receiver');
      let e = Te(this),
        r = x('%Temporal.PlainDateTime%'),
        i = n(this, S),
        o = new r(n(e, q), n(e, z), n(e, G), 0, 0, 0, 0, 0, 0, i),
        a = n(this, pe);
      return qe(n(cr(a, o, 'compatible'), H), a, i);
    }
    toInstant() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return new (x('%Temporal.Instant%'))(n(this, H));
    }
    toPlainDate() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return xt(Te(this));
    }
    toPlainTime() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return ao(Te(this));
    }
    toPlainDateTime() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Te(this);
    }
    toPlainYearMonth() {
      if (!X(this)) throw new TypeError('invalid receiver');
      let e = n(this, S);
      return vt(e, ce(this, Ne(e, ['monthCode', 'year']), []));
    }
    toPlainMonthDay() {
      if (!X(this)) throw new TypeError('invalid receiver');
      let e = n(this, S);
      return At(e, ce(this, Ne(e, ['day', 'monthCode']), []));
    }
    getISOFields() {
      if (!X(this)) throw new TypeError('invalid receiver');
      let e = Te(this),
        r = n(this, pe);
      return {
        calendar: n(this, S),
        isoDay: n(e, G),
        isoHour: n(e, te),
        isoMicrosecond: n(e, ae),
        isoMillisecond: n(e, oe),
        isoMinute: n(e, ne),
        isoMonth: n(e, z),
        isoNanosecond: n(e, se),
        isoSecond: n(e, ie),
        isoYear: n(e, q),
        offset: Di(r, n(this, Ke)),
        timeZone: r,
      };
    }
    getCalendar() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Vt(n(this, S));
    }
    getTimeZone() {
      if (!X(this)) throw new TypeError('invalid receiver');
      return Oa(n(this, pe));
    }
    static from(e, r) {
      let i = he(r);
      return X(e)
        ? (jt(i), jn(i, 'reject'), Ye(i), qe(n(e, H), n(e, pe), n(e, S)))
        : Qt(e, i);
    }
    static compare(e, r) {
      let i = Qt(e),
        o = Qt(r),
        a = n(i, H),
        s = n(o, H);
      return d.default.lessThan(d.default.BigInt(a), d.default.BigInt(s))
        ? -1
        : d.default.greaterThan(d.default.BigInt(a), d.default.BigInt(s))
        ? 1
        : 0;
    }
  };
function Te(t) {
  return vr(n(t, pe), n(t, Ke), n(t, S));
}
Ar(mn, 'Temporal.ZonedDateTime');
var ll = Object.freeze({
  __proto__: null,
  Calendar: Ie,
  Duration: cn,
  Instant: qt,
  Now: ds,
  PlainDate: sn,
  PlainDateTime: ln,
  PlainMonthDay: dn,
  PlainTime: un,
  PlainYearMonth: hn,
  TimeZone: yt,
  ZonedDateTime: mn,
});
function cl() {
  let t = d.default.multiply(d.default.BigInt(+this), wr);
  return new qt(t);
}
var ol = [qt, Ie, sn, ln, cn, dn, un, yt, hn, mn];
for (let t of ol) {
  let e = Object.getOwnPropertyDescriptor(t, 'prototype');
  (e.configurable || e.enumerable || e.writable) &&
    ((e.configurable = !1),
    (e.enumerable = !1),
    (e.writable = !1),
    Object.defineProperty(t, 'prototype', e));
}
export {sl as Intl, ll as Temporal, cl as toTemporalInstant};
