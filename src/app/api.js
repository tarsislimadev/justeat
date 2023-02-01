const Local = require('./libs/Local')

const l = new Local('api')

const API = {}

API.getList = () => l.get('list', [])

module.exports = API
