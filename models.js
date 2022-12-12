const mongoose = require("mongoose");
const todoItemSchema = new mongoose.Schema(
    {
      name: String
    }
  );
  
  const TodoItem = mongoose.model("TodoItem",todoItemSchema);

  const listSchema = new mongoose.Schema(
    {
      name:String,
      items:[todoItemSchema]
    }
  );

  const List = mongoose.model("List",listSchema);

  module.exports = {TodoItem,List};

