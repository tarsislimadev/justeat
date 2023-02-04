const createFloatingButton = (text, action = () => { }) => {
  const button = new nButton()

  button.setStyle('background-color', 'black')
  button.setStyle('box-sizing', 'border-box')
  button.setStyle('border-radius', '50%')
  button.setStyle('line-height', '3rem')
  button.setStyle('padding', '0rem')
  button.setStyle('height', '3rem')
  button.setStyle('color', 'white')
  button.setStyle('width', '3rem')

  button.setContainerStyle('position', 'fixed')
  button.setContainerStyle('bottom', '2rem')
  button.setContainerStyle('right', '2rem')

  if (text) {
    button.setText(text)
  }

  if (action) {
    button.on('click', action)
  }

  return button
}

const addTitlePage = (text) => {
  const title = new nH1()
  title.setText(text)

  title.setStyle('text-align', 'center')

  app.append(title)
  return title
}
