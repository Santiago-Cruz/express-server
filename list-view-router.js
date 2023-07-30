const express= require('express');
const router= express.Router();
const tasks= require('./tasks.json');
const {connectDB, TaskModel} = require('./dbAtlas');

router.get('/done', async (req, res) => {
    try {
        const doneTasks = await TaskModel.find({ estado: true });
        res.status(200).json(doneTasks);
    } catch (error) {
        console.error('Error fetching completed tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.get('/undone', async (req, res) => {
    try {
      const undoneTasks = await TaskModel.find({ estado: false });
      res.status(200).json(undoneTasks);
    } catch (error) {
      console.error('Error fetching undone tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/all', async (req, res) => {
    try {
      const allTasks = await TaskModel.find({});
      res.status(200).json(allTasks);
    } catch (error) {
      console.error('Error fetching all tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/task/:id', async (req, res) => {
    const id = parseInt(req.params.id[1]);
    try {
        const task = await TaskModel.findOne({ id: id});
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.status(200).json(task);
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports= router;