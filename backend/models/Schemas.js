const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    task: String,
    priority: Number,
    date: Date
  });

const listSchema = ({
    rubric: String,
    todoes: [itemsSchema]
});
const TodoList = mongoose.model("TodoList", listSchema);

const mySchemas = {'TodoList':TodoList};

module.exports = mySchemas;