const{app, BrowserWindow}= require('electron');
require('@electron/remote/main').initialize();
const path = require('path');
const url = require('url');

let ventanaPrincipal = null;


function crearVentanaPrincipal () {
    ventanaPrincipal = new BrowserWindow({
        useContentSize: true,
        // width: 800,
        // height:500,
        // resizable: false,
        webPreferences: {
            worldSafeExecuteJavaScript: true,
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    ventanaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    require('@electron/remote/main').enable(ventanaPrincipal.webContents);

    ventanaPrincipal.once('ready-to-show', () =>{
        ventanaPrincipal.show();
    });

    // ventanaPrincipal.setMenu(null);
}





app.once('ready', crearVentanaPrincipal);

app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () =>{
    if(BrowserWindow.getAllWindows().length === 0){
        crearVentanaPrincipal();
    }
})

