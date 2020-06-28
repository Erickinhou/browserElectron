const { app, BrowserWindow, globalShortcut} = require('electron')
const config = require('./config')

let win
let toogle = 1

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(config.url)
}

function toggleDevTolls(){
  if(toogle == 1){
    win.webContents.openDevTools()
    toogle*=-1
  }
  else{
    win.webContents.closeDevTools()
    toogle*=-1
  }
}

function createShortcuts(){
  globalShortcut.register('CmdOrCtrl+j', toggleDevTolls)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
.then(createWindow)
.then(createShortcuts)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.