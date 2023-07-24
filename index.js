require('dotenv').config({ path: './secret.env' });
const express= require('express');
const tasks= require('./tasks.json');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app= express();
const jwtSecret = process.env.JWT_SECRET;
const listViewRouter= require('./list-view-router');
const listEditRouter= require('./list-edit-router');
app.use(express.json());
app.use(cors());
const port= 3000;
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