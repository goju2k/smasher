const { app } = require('electron')

const controller = require('./appmain/controller')

app.on('ready', () => {
    controller()
})

app.on('window-all-closed', () => {
  app.quit()
})