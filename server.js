import express from 'express';
import cors from 'cors'
const app = express()
const port = 8080
import { addAliment, deleteAliment, getAliment, updateAliment } from './ServiceAliment.js';
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    const alimente = getAliment(req.query.categorie);
    res.send(alimente)
})

app.post('/',(req, res) => {
    addAliment(req.body)
    res.send('Add an aliment')
})

app.delete("/delete/:name",(req, res) => {
    deleteAliment(req.params.name);
    res.sendStatus(204); 
});

app.put("/update/:id",(req,res) => {
    if(updateAliment(req.body, req.params.id)){
        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
});

app.listen(port, () => {
})