import express from 'express';
import cors from 'cors'
const app = express()
const port = 8080
import { deleteProducts, updateProducts, getAllProducts, addProducts } from './ServiceProduct.js';
import { addUser, auth, deleteUsers, updateUser, checkAuth } from './ServiceUser.js';
app.use(express.json())
app.use(cors());



app.get('/', async (req, res) => {
    let token = req.headers.authorization;
    let user = await checkAuth(token);
    if (!user.success) {
        res.sendStatus(401)
    } else {
        const alimente = await getAllProducts(req.query.category, user.id);
        res.send(alimente)
    }
})

app.post('/', async (req, res) => {
    try {
        let token = req.headers.authorization;
        let user = await checkAuth(token);

        if (!user.success) {
            res.sendStatus(401)
        } else {
            await addProducts(req.body, user.id)
            res.send('Add an aliment')
        }
    } catch (e) {
        console.log("Error", e)

    }
})

app.delete("/delete/:name", async (req, res) => {
    try {
        let token = req.headers.authorization;
        let user = await checkAuth(token);

        if (!user.success) {
            res.sendStatus(401)
        } else {
            let success = await deleteProducts(req.params.name, user.id);
            if (success != 0) {
                res.send('Deleted ' + req.params.name + '*' + success);
            }
            else
                res.sendStatus(404);
        }
    } catch (e) {
        console.log("Error", e)
    }

});

app.put("/update/:id", async (req, res) => {
    let token = req.headers.authorization;
    let user = await checkAuth(token);

    if (!user.success) {
        res.sendStatus(401)
    } else {
        if (await updateProducts(req.body, req.params.id, user.id)) {
            res.send('Updated product with id = ' + req.params.id)
        } else {
            res.sendStatus(404);
        }
    }
});

app.post('/signup/', async (req, res) => {
    let result = await addUser(req.body)
    if (result.status)
        res.send({ message: result.message });
    else {        // res.sendStatus(400);
        res.status(400);
        res.send({ message: result.message });
    }
})

app.delete("/deleteUser/:username", async (req, res) => {
    let token = req.headers.authorization;
    let user = await checkAuth(token);

    if (!user.success) {
        res.sendStatus(401)
    } else {
        await deleteUsers(req.params.username, user.id);
        res.sendStatus(204);
    }
});

app.put("/updateUser/", async (req, res) => {
    let token = req.headers.authorization;
    let user = await checkAuth(token);

    if (!user.success) {
        res.sendStatus(401)
    } else {
        let result = await updateUser(req.body, user.id)
        if (result.status === 1) {
            res.send(result.message);
        } else
            if (result.status === -1) {
                res.sendStatus(404);
            }
            else {

                res.status(400);
                res.send(result.message);
            }
    }

});

app.post("/signin/", async (req, res) => {
    let result = await auth(req.body)
    if (result.success)
        res.send(result);
    else
        res.status(401).send({ message: "Username or password is incorrect!" });
})

app.listen(port, () => {
})