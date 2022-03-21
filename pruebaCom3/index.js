const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')


const port = new SerialPort({ path: 'Com3', baudRate: 9600 })

const parser = port.pipe(new ReadlineParser({delimeter: '\r\n'}));




parser.on('open', function(){
    console.log('conectado por el puerto Com3')
});

parser.on('data', function (data){
    console.log(data);
});

port.on('error', function(err){
    console.log(err);
})