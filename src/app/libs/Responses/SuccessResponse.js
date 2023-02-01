const Response = require('./Response')

class SuccessResponse extends Response {
  get(name) {
    return this.getData()[name]
  }

  getArray(name) {
    return Array.from(this.get(name))
  }
}

module.exports = SuccessResponse
