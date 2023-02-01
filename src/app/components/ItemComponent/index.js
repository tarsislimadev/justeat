const nElement = require('../../libs/nElement')

class ItemComponent extends nElement {
  name = new nElement()
  price = new nElement()
  quantity = new nElement()

  constructor() {
    super({ component: { name: 'item' } })

    this.append(this.name)
    this.append(this.price)
    this.append(this.quantity)
  }

  setName(name) {
    this.name.setText(name)
    return this
  }

  setPrice(price = 0) {
    this.price.setText(`R$ ${price.toFixed(2)}`)
    return this
  }

  setQuantity(quantity) {
    this.quantity.setText(quantity)
    return this
  }
}

module.exports = ItemComponent
