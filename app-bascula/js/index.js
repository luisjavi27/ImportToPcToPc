
const {exportXlsx} = require('./js/modules/exportExcel')
const  {SerialPort}  = require('serialport')
const  {ReadlineParser}  = require('@serialport/parser-readline')
const  {separateBy} = require('./js/modules/parseData')
const {guardarJSON, leerJSON} = require('./js/modules/json')
const {Conection}= require('./js/modules/conection')

const EXTENSIONS = ["xlsx"];

const conection = new Conection(leerEnvironmentParameters(), 0);

const port = new SerialPort({ path: conection.getUserPort, baudRate: conection.getUserBaudrate });
const parser = port.pipe(new ReadlineParser({delimeter: conection.getDelimeter}));

const botonEnviar = document.getElementById('botonEnviar')
const botonGuardar = document.getElementById('botonGuardar')
const  userDelimeter = document.getElementById('userDelimiter')
const  bodyTabla = document.getElementById('bodyTabla')
const exportBtn = document.getElementById('exportBtn');
const cabeceraHtml = document.getElementById('cabeceraTabla');

parser.on('data', function (data){
    dataIn= separateBy(data, conection.getItemDelimiter);
    document.getElementById('dato').innerHTML = dataIn;
});

port.on('error', function(err){
    console.log(err);
})

function leerEnvironmentParameters(){
    
    return leerJSON('environment')
}

function agregarEventListeners(){
    botonEnviar.addEventListener('click', asignarDelimitador);
    botonGuardar.addEventListener('click', guardarData);  
    exportBtn.addEventListener('click', event => exportXlsx( document.getElementById('tabla')), false);
}

function guardarData(){
    guardarJSON(dataIn, 'BD');
    visualizarTabla(dataIn)
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

function generarCabeceraTabla(array){
    let htmlCabecera='';
    let i=0
    for (const item in array){
        i++;
        htmlCabecera+=`<th scope="col">${i}</th>`
    }
    
    cabeceraHtml.innerHTML = htmlCabecera;
    
}

function visualizarTabla(data) {
    const filasTabla = generarHtmlLinea(data);
    generarCabeceraTabla(data);
    let contenido = bodyTabla.innerHTML
    bodyTabla.innerHTML= filasTabla+contenido;
    
}




agregarEventListeners();
