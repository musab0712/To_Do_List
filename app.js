const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food","Cook Food","Eat Food"];
const works = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    let day = date.getDate();
    res.render("list", {ListTitle : day, newListItems : items});
});

app.post("/", function(req, res) {
    let item = req.body.newItem;
    if(req.body.button === "Work"){
        works.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
   
} );

app.get("/work", function(req, res) {
    res.render("list",{ListTitle : "Work List", newListItems : works});
})

app.listen(3000, function(){
    console.log("server started");
});