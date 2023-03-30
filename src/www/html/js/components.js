const addTitlePage = (text) => {
  const title = new nH1()
  title.setText(text)

  title.setStyle('text-align', 'center')

  app.append(title)
  return title
}
