const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const {TodoItem,List} = require("./models");

const _ = require("lodash");


let todo1 = new TodoItem({name:"Welcome to todoList"});
let todo2 = new TodoItem({name:"Hit + to add new items"});
let todo3 = new TodoItem({name:"<- check it to delete items"});
let defaultItems = [todo1,todo2,todo3];

// todo2.save(function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("saved todo succesfully");
//     }
//   });

// TodoItem.deleteOne({ name:"item3" }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });


const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
  // mongoose.connect(todoDbUri);
  let day = date.getDate();
  TodoItem.find().then(function(todoItems){
    if(!todoItems.length){
      TodoItem.insertMany(defaultItems, function(err, docs){
        if(err){
          console.log(err);
        }else{
          console.log("succesfully saved defaultItems to db");
        }
      });
      res.redirect("/");
    }else{
      // mongoose.connection.close();
      todoItems.forEach(function(item){

      console.log(item);


      });
      res.render('index',{listType:day,todoItems});
    }

  });
})

app.get("/:routeId",function(req,res){

  console.log(req.params);
  let routeId = _.capitalize(req.params.routeId);
  List.findOne({name:routeId},function(err,list){
    if(!err){
      if(list){
        console.log("exists");
        let listType = list.name;
        res.render('index',{listType:listType,todoItems: list.items});
      }else{
        console.log("not exists");
        const list = new List({
          name:routeId,
          items:defaultItems
        });
        list.save();
        let listType = list.name;
        res.redirect("/"+listType);
      }
    }else{
      console.log(err);
    }

  })


});

app.post("/",function(req,res){

  var item = req.body.newItem;
  let tempItem = new TodoItem({name:item});
  let routeId = req.body.addButton;
  if(routeId === date.getDate()){
    tempItem.save(function(err){
      if(err){
        console.log(err);
      }else{
        console.log("saved todo succesfully: "+tempItem.name);
        }
      });
      res.redirect("/");
  }else{
    List.findOne({name:routeId},function(err,list){
      if(!err){
          list.items.push(tempItem);
          list.save();
          res.redirect("/"+routeId);

      }else{
        console.log(err);
      }
    })
  }

})

app.post("/delete",function(req,res){
  let todoId = req.body.checkbox;
  let listName = req.body.listName;
  if(listName === date.getDate()){
    TodoItem.deleteOne({ _id:todoId }).then(function(){
        console.log("One Data deleted from "+listName); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    res.redirect("/");
  }else{
    List.findOneAndUpdate(
      {name:listName},
      {$pull:{items:{_id:todoId}}},
      function(err){
        if(!err){
          console.log("deleted one item from "+listName)
        }else{
          console.log(err);
        }
        res.redirect("/"+listName);
      }
    );
  }

});

app.get("/about",function(req,res){
  res.render("about");
})

module.exports = app;
