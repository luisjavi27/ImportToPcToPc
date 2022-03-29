
function separateBy(data, separator){
    
    let arrayItems = data.split(separator);
    arrayItems = arrayItems.map(function(item){
       return item.trim()
    })
    return arrayItems;
}



module.exports = {
    separateBy,
   
}