
const express = require('express')
const cors = require('cors');
const app = express()
const port = 8080
var alimente = require('./data');

app.use(express.json())
app.use(cors());


app.get('/', (req, res) => {

    if (req.query.categorie){
        const response = alimente.filter((aliment)=> {
            return aliment.categorie== req.query.categorie;
        })
        res.send(response)
    }
    else{
        // const productNames = alimente.map(aliment => aliment.name);
        // res.send(productNames)
        res.send(alimente)

    }
})
app.post('/',(req, res) => {
    alimente.push(req.body)
    res.send('Add an aliment')
})
app.delete("/delete/:name",(req, res) => {
    
    alimente = alimente.filter((aliment)=> {
        return aliment.name != req.params.name});
      res.sendStatus(204);
    
  });
app.put("/update/:id",(req,res) => {
    objIndex =  alimente.findIndex((aliment) => aliment.id == req.params.id )
    if(objIndex!= -1){
        if(req.body.name)
            alimente[objIndex].name = req.body.name
        if(req.body.cantitate)
            alimente[objIndex].cantitate = req.body.cantitate
        if(req.body.pret)
            alimente[objIndex].pret = req.body.pret 
        if(req.body.place)
            alimente[objIndex].place = req.body.place 
        res.sendStatus(204);

    }
    else
        res.sendStatus(404);

});

app.get('/category', (req, res) => {
    // function checkCategorie(aliment) {
    //     return aliment.categorie== "Panificatie";
    //   }
    // const response = alimente.filter(checkCategorie);
    const response = alimente.filter((aliment)=> {
        return aliment.categorie== "Panificatie";
      })
    res.send(response)

  });

app.listen(port, () => {
})