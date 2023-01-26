
const Params = {}

Params.get = (name, _default) =>
  (JSON.parse(localStorage.getItem(['params', name].join('.')))) || _default

Params.set = (name, value) =>
  localStorage.setItem(['params', name].join('.'), JSON.stringify(value))

class DataResult {
  data = {}

  constructor(data = {}) {
    this.data = data
  }

  getData() {
    return this.data
  }

  getArray(name) {
    return Array.from(this.data[name])
  }

  get(name) {
    return this.data[name]
  }
}

const Base = {}

Base.select = (name) => new Promise((resolve) => {
  let list = JSON.parse(localStorage.getItem(['base', name].join('.')))
  if (!list) list = []
  resolve(new DataResult({ list }))
})

Base.selectWhere = (name, where) => Base.select(name)
  .then((res) => res.getArray('list'))
  .then((list) => list.filter((value) => Object.keys(where).every((key) => where[key] == value[key])))
  .then((list) => new DataResult({ list }))

Base.insert = (name, data) => Base.select(name)
  .then((res) => res.getArray('list'))
  .then((list) => ([...list, data]))
  .then((list) => localStorage.setItem(['base', name].join('.'), JSON.stringify(list)))
  .then(() => ({ status: 'ok' }))

Base.find = (name, id) => Base.select(name)
    .then((res) => res.getArray('list'))
    .then((list) => list.find((item) => item['_id'] === id))
    .then((item) => new DataResult({ item }))

Base.update = (name, id, data) => Base.select(name)
    .then((res) => res.getArray('list'))
    .then((list) => list.map((item) => item['_id'] === id ? data : item))
    .then((list) => localStorage.setItem(['base', name].join('.'), JSON.stringify(list)))
    .then(() => ({ status: 'ok' }))
  
class FormConstructor {
  fields = []

  with(fields = {}) {
    this.fields = this.fields
      .concat(Object.keys(fields).map((key) => ({ key, value: fields[key] })))

    return this
  }

  validate(vlds) {
    return new Promise((s, _) => s()) // FIXME
  }
}

const Forms = new FormConstructor

class FlowConstructor {

  goTo(name) {
    if (!name) throw new Error('Page error')
    window.location = name
  }

}

const Flow = new FlowConstructor

const Validations = {
  required: (value, errorMessage = 'Required field.') => !value ? errorMessage : 'Required',
}

const MODE = {
  ON: 'on',
  OFF: 'off',
}

class AjaxResponse {
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

class SuccessResponse extends AjaxResponse {
  get(name) {
    return this.getData()[name]
  }

  getArray(name) {
    return Array.from(this.get(name))
  }
}

class ErrorResponse extends AjaxResponse { }

const Ajax = {}

Ajax.servers = {}
Ajax.servers['default'] = {
  url: 'http://0.0.0.0/api/v1'
}

Ajax.post = (paths = [], data = {}) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', paths.join('/'), true)

  const onComplete = (xhr) => [200, '200'].indexOf(xhr.status) !== -1
    ? resolve(new SuccessResponse(xhr))
    : reject(new ErrorResponse(xhr))

  xhr.onload = () => onComplete(xhr)
  xhr.onerror = () => onComplete(xhr)

  xhr.send(JSON.stringify(data))
})

const isOn = () => Params.get('mode') === MODE.ON

const Api = {}

Api.create = ({ where, who, start_date, end_date, why }) =>
  Forms.with({ where, who, start_date, end_date, why })
    .validate({
      where: [Validations.required(),],
      who: [Validations.required(),],
      start_date: [Validations.required(),],
      end_date: [Validations.required(),],
      why: [Validations.required(),],
    })
    .then(() => ({ where, who, start_date, end_date, why }))
    .then((data) => isOn()
      ? Ajax.post([Ajax.servers.default.url, 'tasks', 'create'], data)
      : Base.insert('tasks', data)
    )

Api.list = () => isOn()
  ? Ajax.post([Ajax.servers.default.url, 'tasks', 'list'], {})
  : Base.select('tasks', {})

Api.get = ({ _id }) => isOn()
  ? Ajax.post([Ajax.servers.default.url, 'tasks', 'get'], { _id })
  : Base.find('tasks', _id).then((res) => new DataResult({ task: res.get('item') }))

Api.update = (_id, { where, who, start_date, end_date, why }) =>
  Forms.with({ where, who, start_date, end_date, why })
    .validate({
      where: [Validations.required(),],
      who: [Validations.required(),],
      start_date: [Validations.required(),],
      end_date: [Validations.required(),],
      why: [Validations.required(),],
    })
    .then(() => ({ _id, where, who, start_date, end_date, why }))
    .then((data) => isOn()
      ? Ajax.post([Ajax.servers.default.url, 'tasks', 'update'], data)
      : Base.update('tasks', _id, data)
    )
