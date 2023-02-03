const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInIsolatedMainWorld()