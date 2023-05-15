const { contextBridge, ipcRenderer } = require('electron') 

contextBridge.exposeInMainWorld('electronAPI', { 
    quit: () => ipcRenderer.send('quit'),
    min: () => ipcRenderer.send('min'),
    winMax: () => ipcRenderer.send('winMax'),
    winMin: () => ipcRenderer.send('winMin'),
    create: () => ipcRenderer.send('create'),
    check: (loginValue, passValue) => ipcRenderer.send('check'),
})

