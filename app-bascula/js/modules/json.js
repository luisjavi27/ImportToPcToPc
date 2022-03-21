const fs = require('fs');
const path = require('path');
const pathLog = path.resolve(__dirname, '../../JSON')+'/';
const pathEnvironment= path.resolve(__dirname, '../../JSON/environment.json')


function leerJSON(archiveName){
    let dataSinFormato = fs.readFileSync((pathLog+ archiveName+'.json'), 'utf8');
    let data = JSON.parse(dataSinFormato);
    return data;
}

function escribirData(unArray, archiveName){
    let stringJson = JSON.stringify(unArray);
    fs.writeFileSync((pathLog+ archiveName+'.json'), stringJson);
    
}

function guardarJSON(unArray, archiveName){
    
    let data = leerJSON(archiveName);
    data= data.concat(unArray);
    
    escribirData(data, archiveName);
}


module.exports = {
    leerJSON,
    guardarJSON
}