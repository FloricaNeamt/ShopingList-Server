import data from './data.js'
var alimente = data

export function getAliment(category)
{
    if (category){
        const response = alimente.filter((aliment)=> {
            return aliment.categorie== category;
        })
        return response;
    }
    else{
        // const productNames = alimente.map(aliment => aliment.name);
        // res.send(productNames)
        return alimente;

    }
}
export function addAliment(aliment){
    alimente.push(aliment)
}
export function deleteAliment(alimentName){
    alimente = alimente.filter((aliment)=> {
        return aliment.name != alimentName});
}
export function updateAliment(alimentBody,id){
    let objIndex =  alimente.findIndex((aliment) => id == aliment.id )
    if(objIndex!= -1){
        if(alimentBody.name)
            alimente[objIndex].name = alimentBody.name
        if(alimentBody.cantitate)
            alimente[objIndex].cantitate = alimentBody.cantitate
        if(alimentBody.pret)
            alimente[objIndex].pret = alimentBody.pret 
        if(alimentBody.place)
            alimente[objIndex].place = alimentBody.place 
        return true//S-a gasit elementul
    }
    else{
        return false//Nu s-a gasit elementul
    }
}