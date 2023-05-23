const { log } = require('console');

const path = require('path'),
    url = require('url'),
    { app, BrowserWindow, ipcMain, ipcRenderer, contextBridge} = require('electron'),
    sqlite3 = require('sqlite3').verbose();

function createWindow() {
    const db = new sqlite3.Database('./src/database/database.db', sqlite3.OPEN_READWRITE, () => {
        console.log('Database succesful open');
    });

    const win = new BrowserWindow({
        width: 800,
        height: 700,
        frame: false,
        icon: __dirname + '/src/img/icon.svg',
        webPreferences: {
            isSecureContext: true,
            preload: path.join(__dirname + '/src/js/preload.js'),
            nodeIntegration: true
        }
    });

    win.webContents.openDevTools()
    win.loadFile('./src/index.html')

    // titleBar кнопки

    ipcMain.on('min', () => {
        win.minimize();
    })

    ipcMain.on('winMax', () => {
        win.maximize();
    })

    ipcMain.on('winMin', () => {
        win.unmaximize();
    })

    ipcMain.on('quit', () => {
        app.quit();
        db.close(() => {
            console.log('Database succesful close');
        })
    })

    // Авторизация
    ipcMain.on('create', (event, registerValue) => {
        db.run(`INSERT INTO user (mail, name, surname, patronymic, password) VALUES (?,?,?,?,?);`,
            [registerValue[0], registerValue[1], registerValue[2], registerValue[3], registerValue[4]],
            (err) => console.log((err) ? err.message : 'Succesful insert data'))
    })


    ipcMain.on('check', (event, loginValue, passValue) => {   
        let result = false; 
        db.all('SELECT * FROM user', [], (err, rows) => {
            if (!err) {
                try{
                    let i = 0;
                    while (!result) {
                        result = (rows[i].password == passValue &&
                            rows[i].mail == loginValue) ? true : false;
                        console.log(`${i} = ${result}`)
                        i++;
                    }
                    event.sender.send('getDataBooleanLogin', result)
                }catch{
                    return
                }
            } else {
                console.error(err)
            }
        })
    })
}
app.whenReady().then(createWindow)


