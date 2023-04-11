const path = require('path'),
    url = require('url'),
    {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 700, 
        height: 500,
        title: "leax",
        icon: __dirname + "img/favicon.svg",
        webPreferences: {
            isSecureContext: true,

        }
    });

    app.webContents.openDevTools();
    win.loadFile(__dirname + "./src/index.html")
}

// ipcMain.handle('some-name', async (event, someArgument) => {
//     const result = await doSomeWork(someArgument)
//     return result
//   })
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    app.quit();
})