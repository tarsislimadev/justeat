class Response {
  constructor(xhr) {
    const { responseText } = xhr
    const { status, message, data } = JSON.parse(responseText)

    this.status = status
    this.message = message
    this.data = data
  }

  getStatus() {
    return this.status
  }

  getMessage() {
    return this.message
  }

  getData() {
    return this.data || {}
  }

  get(name, def = undefined) {
    return this.getData()[name] || def
  }
}

class ErrorResponse extends Response {
  type = 'error-response'
}

class SuccessResponse extends Response {
}

const Ajax = {
  post: (path = [], data = {}) => new Promise(() => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', path.join('/'), true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const onComplete = (xhr) => {
      if (xhr.status === '200') {
        resolve(new SuccessResponse(xhr))
      } else {
        reject(new ErrorResponse(xhr))
      }
    }

    xhr.onload = () => onComplete(xhr)
    xhr.onerror = () => onComplete(xhr)
    xhr.send(JSON.stringify(data))
  })
}

module.exports = Ajax
