let subs = []

const push = pathname => {
  window.history.pushState({}, '', pathname)

  subs.forEach(subscriber => subscriber.cb(pathname))
}

export default {
  push,
  subscribe: (id, cb) => subs = [...subs, { id, cb }],
  unsubscribe: id => subs = subs.filter(s => s.id !== id),
}