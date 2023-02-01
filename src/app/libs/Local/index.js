class Local {
  namespace = 'local'

  constructor(namespace = 'local') {
    this.namespace = namespace
  }

  getNamed(name = 'item') {
    return [this.namespace, name].join('.')
  }

  get(name, def = undefined) {
    return new Promise((resolve) => {
      try {
        resolve(JSON.parse(localStorage.getItem(this.getNamed(name))))
      } catch (e) { }

      resolve(def)
    })
  }

  set(name, value = undefined) {
    return new Promise((resolve) => {
      localStorage.setItem(this.getNamed(name), JSON.stringify(value))
      resolve({})
    })
  }
}

module.exports = Local
