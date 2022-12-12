const app = require("./routes")
const mongoose = require("mongoose");
// const todoDbUri = "mongodb+srv://<DATABASE-NAME>:<PASSWORD>@cluster0.uxrwxyx.mongodb.net/todolistDB?retryWrites=true&w=majority";
const todoDbUri = "mongodb://127.0.0.1:27017/todolistDB";


mongoose.connect(todoDbUri);


let port = process.env.PORT || 3000;

app.listen(port,function(){
  console.log("server code hosted on port "+port);
})
