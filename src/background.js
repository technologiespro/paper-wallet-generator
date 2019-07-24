'use strict'

import { app, protocol, BrowserWindow, screen } from 'electron'
import winState from 'electron-window-state'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let deeplinkingUrl = null

// Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])
function broadcastURL (url) {
  if (!url || typeof url !== 'string') {
    return
  }

  if (win && win.webContents) {
    win.webContents.send('process-url', url)
    deeplinkingUrl = null
  }
}

function createWindow () {
  // Create the browser window.
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;

  const windowState = winState({
    defaultWidth: width,
    defaultHeight: height
  });

  win = new BrowserWindow({
    backgroundColor: '#12151f',
    minWidth: 1024,
    minHeight: 768,
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    center: true,
    frame: true,
    show: true,
    skipTaskbar: false,
    darkTheme: true,
    icon: './build/icons/icon.ico',
    autoHideMenuBar: true
  });

  // win.webContents.openDevTools()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    //win.loadURL('app://./index.html')
    win.loadURL(`file://${__dirname}/index.html`)
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

app.on('open-url', (event, url) => {
  // Protocol handler for osx
  event.preventDefault()
  deeplinkingUrl = url
  broadcastURL(deeplinkingUrl)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
