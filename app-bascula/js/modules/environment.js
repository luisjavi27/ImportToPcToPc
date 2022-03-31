const { leerJSON} = require('./json')


function leerEnvironmentParameters(){

    return leerJSON('environments')
}


module.exports={leerEnvironmentParameters}