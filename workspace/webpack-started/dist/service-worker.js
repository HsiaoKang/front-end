if (!self.define) {
    const e = (e) => {
            'require' !== e && (e += '.js')
            let r = Promise.resolve()
            return (
                i[e] ||
                    (r = new Promise(async (r) => {
                        if ('document' in self) {
                            const i = document.createElement('script')
                            ;(i.src = e), document.head.appendChild(i), (i.onload = r)
                        } else importScripts(e), r()
                    })),
                r.then(() => {
                    if (!i[e]) throw new Error(`Module ${e} didn’t register its module`)
                    return i[e]
                })
            )
        },
        r = (r, i) => {
            Promise.all(r.map(e)).then((e) => i(1 === e.length ? e[0] : e))
        },
        i = { require: Promise.resolve(r) }
    self.define = (r, s, n) => {
        i[r] ||
            (i[r] = Promise.resolve().then(() => {
                let i = {}
                const t = { uri: location.origin + r.slice(1) }
                return Promise.all(
                    s.map((r) => {
                        switch (r) {
                            case 'exports':
                                return i
                            case 'module':
                                return t
                            default:
                                return e(r)
                        }
                    })
                ).then((e) => {
                    const r = n(...e)
                    return i.default || (i.default = r), i
                })
            }))
    }
}
define('./service-worker.js', ['./workbox-d0e01091'], function (e) {
    'use strict'
    self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                { url: '/getCom.8730f4db.js', revision: null },
                { url: '/index.3c2f430a.js', revision: null },
                { url: '/index.3c2f430a.js.LICENSE.txt', revision: '275fe79abee3b697f1673c8bd9c58856' },
                { url: '/runtime~index.6e827d83.js', revision: null },
            ],
            {}
        )
})
