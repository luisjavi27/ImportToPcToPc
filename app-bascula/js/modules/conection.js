class Conection {
    
    constructor(objEnvironment, bascula){
        //  this.objeto={
        // "delimeter":"\r\n",
        // "itemDelimiter" :"<0D><0A>",
        // "userPort" : objEnvironment[0].port,
        // "userBaudrate" : 9600
        //  }
        this.objeto=objEnvironment[bascula];
        
    }

    get getDelimeter(){return this.objeto.delimeter};
    get getItemDelimiter(){return this.objeto.itemDelimiter};
    get getUserPort(){return this.objeto.port};
    get getUserBaudrate(){return this.objeto.baud}
    get getHeader(){return this.objeto.header}

    set setDelimeter(newDelimeter){this.objeto.delimeter=newDelimeter};
    set setItemDelimiter(newItemDelimiter){this.objeto.itemDelimiter=newItemDelimiter};
    set setUserPort(newUserPort){this.objeto.port=newUserPort};
    set setUserBaudrate(newUserBaudrate){this.objeto.baud=newUserBaudrate}
    set setHeader(newHeader){this.objeto.header=newHeader}
}

module.exports={Conection}