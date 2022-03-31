const electron = require('@electron/remote')

const  {SerialPort}  = require('serialport')
const  {ReadlineParser}  = require('@serialport/parser-readline')
const  {separateBy} = require('./js/modules/parseData')
const {guardarJsonBD, leerJSON} = require('./js/modules/json')
const {Conection}= require('./js/modules/conection')
const {exportarJsontoExcel}= require('./js/modules/exportExcel')
const  {leerEnvironmentParameters} = require('./js/modules/environment')

const conection = new Conection(leerEnvironmentParameters(), 0);

const port = new SerialPort({ path: conection.getUserPort, baudRate: conection.getUserBaudrate });
const parser = port.pipe(new ReadlineParser({delimeter: conection.getDelimeter}));

const botonConfig = document.getElementById('botonConfig')
const botonEnviar = document.getElementById('botonEnviar')
const botonGuardar = document.getElementById('botonGuardar')
const  userDelimeter = document.getElementById('userDelimiter')
const  bodyTabla = document.getElementById('bodyTabla')
const exportBtn = document.getElementById('exportBtn');
const cabeceraHtml = document.getElementById('cabeceraTabla');


let ventanaConfig = null;


parser.on('data', function (data){
    dataIn= separateBy(data, conection.getItemDelimiter);


    guardarData(dataIn);
    visualizarTabla(dataIn)
});

port.on('error', function(err){
    console.log(err);
})

function crearVentanaConfig(){
    ventanaConfig = new electron.BrowserWindow({

        // parent: ventanaPrincipal, // indica la ventana padre
        // modal: true, // no permite interaccion con la ventana padre mientras esta está abierta
        title:"Configurtación",
        webPreferences: {
            worldSafeExecuteJavaScript: true,
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    ventanaConfig.loadFile('ventanaConfig.html');


    ventanaConfig.on('close', function() {
        ventanaConfig= null;
    });
    // ventanaConfig.webContents.openDevTools();
}



function agregarEventListeners(){
    botonConfig.addEventListener('click', crearVentanaConfig);
    exportBtn.addEventListener('click', exportarJsontoExcel, false);

}



function guardarData(data){
    guardarJsonBD(data, 'BD');

}

function asignarDelimitador(evento){

    if (userDelimeter.value !=''){

        conection.setItemDelimiter(userDelimeter.value);
        limpiarFormulario();
    }else{
        alert('Debes asiganr un delimitador');

    }
}

function limpiarFormulario(){
    userDelimeter.value = null;
}

function generarHtmlLinea(data){
    let htmlBody='<tr>';
    let i=0;

    for (const item of data){
        i++;

        htmlBody+=`</th><td>${item}</td>`
    }
    return `${htmlBody}</tr>`;

}

function generarCabeceraTabla(){

    const cabecera= conection.getHeader;
    let htmlCabecera="";
    let i=0
    for (const item in cabecera){
        i++;
        htmlCabecera+=`<th scope="col">${i}</th>`
    }

    cabeceraHtml.innerHTML = htmlCabecera;

}

function visualizarTabla(data) {
    const filasTabla = generarHtmlLinea(data);

    let contenido = bodyTabla.innerHTML
    bodyTabla.innerHTML= filasTabla+contenido;

}




agregarEventListeners();
generarCabeceraTabla();