import express from 'express';
import cors from 'cors'
const app = express()
const port = 8080
import { deleteProducts, updateProducts , getAllProducts, addProducts} from './ServiceAliment.js';
app.use(express.json())
app.use(cors());

app.get('/', async (req, res) => {
    const alimente = await getAllProducts(req.query.category);
    console.log(alimente)
    res.send(alimente)
})

app.post('/', async(req, res) => {
    await addProducts(req.body)
    res.send('Add an aliment')
})

app.delete("/delete/:name",async(req, res) => {
    deleteProducts(req.params.name);
    res.sendStatus(204); 
});

app.put("/update/:id",async(req,res) => {
    if(await updateProducts(req.body, req.params.id)){
        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
});

app.listen(port, () => {
})