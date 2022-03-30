const {listSerialPorts} = require('./js/modules/RS232')


async function listarPuertosCom(){
    let ports= await listSerialPorts()
    let htmlPuertos ="<option selected>...</option>";
    
    let listadoPuertosCom = document.getElementById("listado-puertos-com")

    ports.forEach( port => {
        htmlPuertos += `<option value="${port.path}">${port.path}</option>`
        console.log(port.path)
    });

    listadoPuertosCom.innerHTML = htmlPuertos

    return
    }

listarPuertosCom()

const closeBtn = document.getElementById('botonCerrar')

closeBtn.addEventListener('click', function (event) {
    
    window.close();
})

