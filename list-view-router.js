const express= require('express');
const router= express.Router();
const tasks= require('./tasks.json');

router.get('/done', (req, res) => {
    const done= tasks.filter(done => done.isCompleted== "true");
    res.status(200).send(done);
})

router.get('/undone', (req, res) => {
    const undone= tasks.filter(undone => undone.isCompleted== "false");
    res.status(200).send(undone);
})
router.get('/all', (req, res) => {
    res.status(200).send(tasks);
})
router.get('/task:id', (req, res) => {
    const id= req.params.id;
    res.status(200).send(tasks[id]);
})
module.exports= router;