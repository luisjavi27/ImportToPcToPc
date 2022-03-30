const { SerialPort } = require('serialport')

 

async function getPorts() {
   let result={
        error:null, 
        listPorts: []
        
    }
    
  await SerialPort.list().then((ports, err) => {
   
    if(err) {
        result.error = err.message
        return  
      
    } 
    
    if (ports.length === 0) {
        result.ports = ['No ports discovered']
        return 
    }
    else{
        result.ports = ports
        console.log(result.ports)
        return 
    }
 
  })

  return result
}

 async function listSerialPorts(){
    
    const ports =  await SerialPort.list()
    console.log(ports)
    return ports
   
}



module.exports={listSerialPorts}