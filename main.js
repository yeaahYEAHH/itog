const path = require('path'),
    url = require('url'),
    {app, BrowserWindow,ipcMain} = require('electron');

function createWindow(){
    const win = new BrowserWindow({
        width: 700, 
        height: 500,
        frame: false,
        icon: __dirname + "img/favicon.svg",
        webPreferences: {
            isSecureContext: true,
            preload: path.join(__dirname + '/src/js/preload.js')
        }
    });

    win.webContents.openDevTools()
    win.loadFile('./src/index.html')

    ipcMain.on('min', () =>{
        win.minimize();
    })

    ipcMain.on('quit', () =>{
        app.quit() 
    })

    
}
app.whenReady().then(createWindow)



