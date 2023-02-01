const { nElement, Flow } = require('../libs')
const { app: { name: appName } } = require('../config')
const API = require('../api')

const { ItemComponent } = require('../components')

const app = nElement.fromId('app')

const titleEl = new nH1()
titleEl.setText(appName)
app.append(titleEl)

const buttonEl = new nButton()
buttonEl.setText('Add item')
buttonEl.on('click', () => Flow.goTo('/add'))
app.append(buttonEl)

const listEl = new nElement()
listEl.addClass('list')
app.append(listEl)

API.getList()
  .then((res) => {
    const list = res.get('list')

    list.map((item) => {
      const { name, price, quantity } = item

      const itemEl = new ItemComponent()

      itemEl.setName(name)
      itemEl.setPrice(price)
      itemEl.setQuantity(quantity)

      // const nameEl = new nElement()
      // nameEl.setText(name)
      // itemEl.append(nameEl)

      // const priceEl = new nElement()
      // priceEl.setText(price)
      // itemEl.append(priceEl)

      // const quantityEl = new nElement()
      // quantityEl.setText(quantity)
      // itemEl.append(quantityEl)

      listEl.append(itemEl)
    })
  })

app.append()

module.exports = app
