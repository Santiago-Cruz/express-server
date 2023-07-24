const express= require('express');
const router= express.Router();
const tasks= require('./tasks.json');


function validateBody(req, res, next) {
    const method= req.method;
    if (method=== "POST"){
        if (Object.values(req.body).length==0 && req.is('json')){
            res.status(400).send("Body is Empty");
        }
        if (!req.is('json')){
            res.status(400).send("Incorrect format");
        }
    }
    if (method=== "PUT"){
        if (Object.values(req.body).length==0 && req.is('json')){
            res.status(400).send("Body is Empty");
        }
        if (!req.is('json')){
            res.status(400).send("Incorrect format");
        }
    }
    else{
        next();
    }
}
router.post('/add', validateBody, (req, res) => {
    const add= req.body;
    tasks.push(add);
    res.status(200).send(tasks);
})
router.delete('/delete/:id', (req, res) => {
    const id= req.params.id;
    const deleted= tasks.filter(deleted => deleted.id == id);
    tasks.splice(tasks.indexOf(deleted[0]), 1);
    res.status(200).send(tasks);
})


router.put('/update/:id', validateBody, (req, res) => {
    const idd= parseInt(req.params.id);
    const {id, isCompleted, description}= req.body;
    const update= tasks.find(update => update.id === idd);
    if (update){
        update.id= id;
        update.isCompleted= isCompleted;
        update.description= description;
        res.json(tasks);
    }
    else{
        res.status(404).send("Not found");

    }
})
module.exports= router;