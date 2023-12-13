import express from 'express';
import cors from 'cors'
const app = express()
const port = 8080
import { deleteProducts, updateProducts , getAllProducts, addProducts} from './ServiceProduct.js';
import { addUser, auth, deleteUsers, getUserByToken, updateUser } from './ServiceUser.js';
app.use(express.json())
app.use(cors());

async function checkAuth(req,res){
    let token = req.headers.authorization?.replace('Bearer ','');
    if(!token)
        res.send(401);
    let user = await getUserByToken(token);
    if(!user)
        res.send(401);
    return user;
}

app.get('/', async (req, res) => {
    
    let user = await checkAuth(req,res);
    const alimente = await getAllProducts(req.query.category,user.id);
    // console.log(alimente)
    res.send(alimente)
})

app.post('/', async(req, res) => {
    let user = await checkAuth(req,res);
    await addProducts(req.body,user.id)
    res.send('Add an aliment')
})

app.delete("/delete/:name",async(req, res) => {
    try{
        let user = await checkAuth(req,res);
        let success = await deleteProducts(req.params.name,user.id);
        if(success != 0){
            res.send('Deleted ' + req.params.name + '*' + success);
        }
        else
            res.sendStatus(404);
    }catch (e) {
        console.log("Error", e)
    }
    
});

app.put("/update/:id",async(req,res) => {
    let user = await checkAuth(req,res);
    if(await updateProducts(req.body, req.params.id,user.id)){
        res.send('Updated product with id = ' + req.params.id)
    }else{
        res.sendStatus(404);
    }
});

app.post('/signup/', async(req, res) => {
    let result = await addUser(req.body)
    if(result.status)
        res.send(result.message)
    else
        res.sendStatus(400);
})

app.delete("/deleteUser/:username",async(req, res) => {
    let user = await checkAuth(req,res);
    await deleteUsers(req.params.username,user.id);
    res.sendStatus(204); 
});

app.put("/updateUser/",async(req,res) => {
    let user = await checkAuth(req,res);
    let result = await updateUser(req.body, user.id)
    if(result.status === 1){
        res.send(result.message);
    }else
    if(result.status === -1){
        res.sendStatus(404);
    }
    else{
        
        res.status(400);
        res.send(result.message);
    }
        
});

app.post("/signin/", async(req, res) => {
    if(await auth(req.body))
        res.send('Login!!')
    else
        res.send('Username or password is incorrect!')
})

app.listen(port, () => {
})