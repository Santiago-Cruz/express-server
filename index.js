const express= require('express');
const tasks= require('./tasks.json');
const app= express();

const port= 3000;
const host= 'localhost';
app.get('/tasks', (req, res) => {
    res.send({
        success: true,
        content: tasks
    });
})

app.listen(port, () => {
    console.log("server worked!");
})