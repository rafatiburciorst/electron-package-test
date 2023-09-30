const { app, BrowserWindow, autoUpdater } = require('electron')
const path = require('node:path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

}

app.whenReady().then(() => {
  const server = 'https://update.electronjs.org'
  const feed = `${server}/rafatiburciorst/electron-package-test/${process.platform}-${process.arch}/${app.getVersion()}`

  autoUpdater.setFeedURL(feed)
  require('update-electron-app')()
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


setInterval(() => {
  autoUpdater.checkForUpdates()
}, 10 * 60 * 1000)