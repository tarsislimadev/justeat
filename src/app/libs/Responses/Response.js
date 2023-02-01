class Response {
  xhr = {}

  constructor(xhr) {
    this.xhr = xhr
  }

  getResponse() {
    return JSON.parse(this.xhr.responseText)
  }

  getStatus() {
    return this.getResponse()['status']
  }

  getMessage() {
    return this.getResponse()['message']
  }

  getData() {
    return this.getResponse()['data']
  }

  getExtra() {
    return this.getResponse()['extra']
  }

}

module.exports = Response
