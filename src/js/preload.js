const { contextBridge, ipcRenderer } = require('electron') 


contextBridge.exposeInMainWorld('electronAPI', { 
    quit: () => ipcRenderer.send('quit')
})

contextBridge.exposeInMainWorld('electronAPI', { 
    min: () => ipcRenderer.send('min')
})
