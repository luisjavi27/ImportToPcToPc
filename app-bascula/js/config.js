const { listSerialPorts } = require("./js/modules/RS232");
const { leerJSON, escribirJsonConfig } = require("./js/modules/json.js");
const { Conection } = require("./js/modules/conection");
const { leerEnvironmentParameters } = require("./js/modules/environment");

const conection = new Conection(leerEnvironmentParameters(), 0);
const closeBtn = document.getElementById("botonCerrar");
const saveBtn = document.getElementById("botonGuardar");

let inputFinTrama = document.getElementById("inputFinTrama");
let inputSeparador = document.getElementById("inputSeparador");
let listadoBaudios = document.getElementById("listado-baudios");
let listadoPuertosCom = document.getElementById("listado-puertos-com");
let inputColumnas = document.getElementById("inputColumnas");


inputFinTrama.value = conection.getDelimeter;
inputSeparador.value = conection.getItemDelimiter;
inputColumnas.value = conection.getHeader;

listarPuertosCom();
listarBaudiosCom();


closeBtn.addEventListener("click", function (event) {
  window.close();
});

saveBtn.addEventListener("click", function (event) {
    guardarConfiguracion();
  });

function guardarConfiguracion() {
    const portUser = listadoPuertosCom.value  
    const baudiosUser = parseInt(listadoBaudios.value)
    const nuevasColumnas= inputColumnas.value.split(",")
    
    newEnvironment=
        {
            "port":portUser,
            "baud":baudiosUser,
            "itemDelimiter":inputSeparador.value,
            "delimeter":inputFinTrama.value,
            "header":nuevasColumnas,
            "excludeValues":[],
            "includeValues":[]
        }
    

console.log(newEnvironment)

    escribirJsonConfig(newEnvironment, "environments");
    // escribirJsonConfig(inputColumnas.value.split(","), "cabecera");

}

async function listarPuertosCom() {
  const ports = await listSerialPorts();
  const portUser = conection.getUserPort;

  let arrayPorts = [];
  let htmlPuertos = ""; 

  ports.forEach((port) => {
    if (port.path == portUser) {
      htmlPuertos += `<option selected value="${port.path}">${port.path}</option>`;
    } else {
      htmlPuertos += `<option value="${port.path}">${port.path}</option>`;
    }

    arrayPorts.push(port.path);
    
  });

  if (!arrayPorts.includes(portUser)) {
      console.log(arrayPorts)
    htmlPuertos += `<option selected value="9600">Puerto ${portUser} no encontrado</option>`;
  }

  listadoPuertosCom.innerHTML = htmlPuertos;

  return;
}

async function listarBaudiosCom() {
  const baudios = [
    "4800",
    "9600",
    "14400",
    "19200",
    "38400",
    "57600",
    "115200",
  ];
  const baudiosUser = conection.getUserBaudrate;
  let htmlBaudios = "";

  baudios.forEach((baudio) => {
    if (baudio == baudiosUser) {
      htmlBaudios += `<option selected value="${baudio}">${baudio}</option>`;
    } else {
      htmlBaudios += `<option value="${baudio}">${baudio}</option>`;
    }
  });

  listadoBaudios.innerHTML = htmlBaudios;

  return;
}





