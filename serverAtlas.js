const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

const listViewRouter= require('./list-view-router');
const listEditRouter= require('./list-edit-router');

app.use(express.json());
app.use(cors());

const {connectDB, TaskModel} = require('./dbAtlas');

// Conexión a la base de datos MongoDB Atlas
connectDB().then((result) => {
  console.log(result);
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
  process.exit(1); // Salir del proceso en caso de error de conexión
});


app.use('/Viewtasks', listViewRouter);
app.use('/Edittasks', listEditRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
