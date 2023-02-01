const Local = require('../Local')

class Flow {
  local = new Local('flow')

  goTo(name, value = undefined) {
    if (!name) throw new Error('Page error')
    this.local.set(name, value)
    window.location = name
  }
}

module.exports = new Flow
