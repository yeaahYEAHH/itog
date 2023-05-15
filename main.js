const { log } = require('console');

const path = require('path'),
    url = require('url'),
    {app, BrowserWindow,ipcMain} = require('electron'),
    sqlite3 = require('sqlite3').verbose();

function createWindow(){
    const db = new sqlite3.Database('./src/database/database.db', sqlite3.OPEN_READWRITE, () => {
        console.log('Database succesful open');
    });
    
    db.run(`INSERT INTO user (login, pass) VALUES ('admin', '1111')`);

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

    ipcMain.on('min', () =>{
        win.minimize();
    })

    ipcMain.on('winMax', () =>{
        win.maximize();
    })

    ipcMain.on('winMin', () =>{
        win.unmaximize();
    })

    ipcMain.on('create', () =>{
        db.all('SELECT * FROM user', [], (err, rows) => {
            if (err) {
              console.error(err.message);
            }
            // Обрабатываем результат
            console.log(rows);
          });
    })

    ipcMain.on('check', (loginValue, passValue) =>{
        console.log(`${loginValue} ${passValue}`);
    })

    ipcMain.on('quit', () =>{
        app.quit();
        db.close(() => {
            console.log('Database succesful close');
        })
    })
}
app.whenReady().then(createWindow)



