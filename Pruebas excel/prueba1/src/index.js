

const FileServer = require('file-server');
const http = require("http");

const host = 'localhost';
const port = 8000;


const exportUsersToExcel = require('./exportService');


const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("server on live port 8000");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


const users = [
    { 
        id: 0, 
        name: 'Luis', 
        age: 31
    },
    { 
        id: 1, 
        name: 'Ximena', 
        age: 29
    }
];


const workSheetColumnName = [
    "ID",
    "Name",
    "AGE"
]

const workSheetName= 'User';
const filepath = '../outputFiles/excel-from-js.xlsx';



exportUsersToExcel(users, workSheetColumnName, workSheetName, filepath);
// genera el archivo, falta agregar caso para situación donde ya exixte un archivo con ese 
//nombre, podria generarse el nombre con la fecha y hora del sistema o verificar dentro de
//un for si el nombre existe y que agregue el contador al nombre, tener en cuenta que debe 
//dar un error si i>= a limite (10? 100?)

