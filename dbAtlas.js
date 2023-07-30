const mongoose = require('mongoose');

const url= 'mongodb+srv://sforerocr:ob2yd6fDm1E3ZaeR@cluster0.mbouciu.mongodb.net/?retryWrites=true&w=majority'

const TaskSchema = new mongoose.Schema({
    id: Number,
    titulo: String,
    descripcion: String,
    estado: Boolean,
    notas: String
  });
const TaskModel = mongoose.model('Task', TaskSchema);
const connectDB = async () =>{
    try{
        await mongoose.connect(url);
        const db= mongoose.connection;
        return "Succesful"
    }catch(error){
        console.log("An Error Ocurred: ", error)
        return error
    }
}

module.exports = {connectDB, TaskModel}; 

