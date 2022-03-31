const fs = require('fs');
const path = require('path');
const { type } = require('process');
const pathLog = path.resolve(__dirname, '../../JSON')+'/';



function leerJSON(archiveName){
    let dataSinFormato = fs.readFileSync((pathLog+ archiveName+'.json'), 'utf8');
    let  data = JSON.parse(dataSinFormato);
    
    return data;
}

function escribirArchivoBD(unJson, archiveName){
    
    let stringJson = JSON.stringify(unJson);
    const ruta = pathLog+ archiveName+'.json'
    
    fs.writeFileSync(ruta, stringJson);
    
}

function guardarJsonBD(unArray, archiveName){
    
    let oldJson = leerJSON(archiveName);

    let newJson = []
    newJson.push(Object.assign({}, unArray));
  
    newJson = newJson.concat(oldJson);

    escribirArchivoBD(newJson, archiveName);
}

function escribirJsonConfig(unObjeto, archiveName ){
    
    let newJson = []
    newJson.push(unObjeto);
  
    escribirArchivoBD(newJson, archiveName);
}




module.exports = {
    leerJSON,
    guardarJsonBD,
    escribirJsonConfig
}