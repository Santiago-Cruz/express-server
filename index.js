require('dotenv').config({ path: './secret.env' });

const express= require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const MongoClient= require('mongodb').MongoClient;

const app= express();

const url= 'mongodb+srv://sforerocr:ob2yd6fDm1E3ZaeR@cluster0.mbouciu.mongodb.net/?retryWrites=true&w=majority'
const client= new MongoClient(url, {useNewUrlParser: true} );

const jwtSecret = process.env.JWT_SECRET;
const listViewRouter= require('./list-view-router');
const listEditRouter= require('./list-edit-router');


app.use(express.json());
app.use(cors());

const port= 3000;

app.get("/", async(req, res) => {
    try {
        await client.connect();
        //await client.db("admin").command( {ping:1});
        //console.log("conexion exitosa");
        const db= client.db('Task_list');
        const collection= db.collection('Tasks');
        const docs= await collection.find().toArray();
        client.close();
        res.send(docs);
    }catch(error){
        console.log("Error: ", error);
    }
})
function validateMethod(req, res, next) {
    const method= req.method;
    if (method=== "GET" || method=== "POST" || method=== "PUT" || method=== "DELETE"){
        next();
    }
    else{
        res.status(404).send("Error: Not Supported");
    }
};
app.post("/login", checkToken, (req, res, next) => {
    const users = ["usuario1", "usuario2", "usuario3"];
    const user = req.body.user;
    if (!users.includes(user)){
        res.status(401).send("not authorized");
    }
    else{
        const payload = {
            rol: 'user'
        }
        const token = jwt.sign(payload, jwtSecret);
        res.status(200).send({
            mensaje: 'Welcome',
            token
        })
    }
});
function checkToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')){
        res.status(401).send({ mensage: 'invalid token'})
    }
    const dataToken = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(dataToken, jwtSecret)
        req.rol = decodedToken.rol
        next();
    } catch (error) {
        res.status(401).send('Token no valido')
    }

}
app.use('/', validateMethod);

app.use('/Viewtasks', listViewRouter);
app.use('/Edittasks', listEditRouter);


app.listen(port, () => {
    console.log("server worked!");
})