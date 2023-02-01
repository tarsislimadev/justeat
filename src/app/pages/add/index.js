const { nElement } = require('?')
const { app: { name: appName } } = require('../../config')
const API = require('../../api')

const app = nElement.fromId('app')

const titleEl = new nH1()
titleEl.setText(appName)
app.append(titleEl)

const button = new nButton()
button.setText('Add item')
button.on('click', () => Flow.goTo('/add'))
app.append()

const listEl = new nElement()
listEl.addClass('list')
app.append(listEl)

Local.getList()
  .then((res) => {
    const list = res.get('list')

    list.map((item) => {
      const { name, price, quantity } = item

      const itemEl = new nElement()

      const nameEl = new nElement()
      nameEl.setText(name)
      itemEl.append(nameEl)

      const priceEl = new nElement()
      priceEl.setText(price)
      itemEl.append(priceEl)

      const quantityEl = new nElement()
      quantityEl.setText(quantity)
      itemEl.append(quantityEl)

      listEl.append(itemEl)
    })
  })

app.append()

module.exports = app
