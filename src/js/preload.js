const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    quit: () => ipcRenderer.send('quit'),
    min: () => ipcRenderer.send('min'),
    winMax: () => ipcRenderer.send('winMax'),
    winMin: () => ipcRenderer.send('winMin'),
   
})

contextBridge.exposeInMainWorld('authAPI', {
    create: (registerValue) => ipcRenderer.send('create', registerValue),
    check: (loginValue, passValue) => ipcRenderer.send('check', loginValue, passValue),
    login: (callback) => {
        ipcRenderer.on('getDataBooleanLogin', (event, result) => {
            callback(result);
        });
    }
});

