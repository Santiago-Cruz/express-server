const express= require('express');
const router= express.Router();
const tasks= require('./tasks.json');
const {connectDB, TaskModel} = require('./dbAtlas');

function validateBody(req, res, next) {
    const method = req.method;
    if (method === "POST" || method === "PUT") {
      if (Object.keys(req.body).length === 0 && req.is('json')) {
        return res.status(400).send("Body is Empty");
      }
      if (!req.is('json')) {
        return res.status(400).send("Incorrect format");
      }
    }

    next();
}

router.post('/add', validateBody, async (req, res) => {
  const add = req.body;
  try {
    const newTask = await TaskModel.create(add);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id[1]);
    try {
      const deletedTask = await TaskModel.findOneAndRemove({id: id});
      if (!deletedTask) {
        return res.status(404).send("Not found");
      }
      res.status(200).json(deletedTask);
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/update/:id', validateBody, async (req, res) => {
    const id = parseInt(req.params.id[1]);
    console.log(id);
    const { titulo, descripcion, estado, notas } = req.body;
    try {
      const updatedTask = await TaskModel.findOneAndUpdate({id: id}, { titulo, descripcion, estado, notas }, { new: true });
      if (!updatedTask) {
        return res.status(404).send("Not found");
      }
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports= router;