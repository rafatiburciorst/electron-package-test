const { autoUpdater } = require("electron-updater")
const { dialog, app } = require("electron")

console.log('checking for updates...');
const log = require("electron-log")
log.transports.file.level = "debug"
autoUpdater.logger = log
autoUpdater.autoDownload = false

console.log(app.getVersion());

//check and apply updates
module.exports = () => {
    autoUpdater.checkForUpdates()
    autoUpdater.on('update-available', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'A new version of the app is available. Do you want to update now?',
            buttons: ['Update', 'No']
        }).then(result => {
            let buttonIndex = result.response
            if (buttonIndex === 0) {
                autoUpdater.downloadUpdate()
            }
        })
    })

    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Ready',
            message: 'Install and restart now?',
            buttons: ['Yes', 'Later']
        }).then(result => {
            let buttonIndex = result.response
            if (buttonIndex === 0) {
                autoUpdater.quitAndInstall(false, true)
            }
        })
    })
}