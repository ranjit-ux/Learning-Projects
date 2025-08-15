import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app=express();
const port=3000;

const db=new pg.Client({
    user: "postgres",
    host:"localhost",
    database:"World",
    password:"RanjitKumarSingh.07",
    port:5432
});

db.connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items=[];

app.get("/",async (req,res)=>{
    try{
        const result=await db.query("SELECT * FROM ToDoList ORDER BY id");
        items=result.rows;
        res.render("index.ejs",{
            listTitle:"Today",
            listItems:items
        });
    }catch(err){
        console.error(err);
    }
})

app.post("/add",async (req,res)=>{
    const work=req.body.newItem;
    try{
        await db.query("INSERT INTO ToDoList(title) VALUES ($1)",[work]);
        res.redirect("/");
    }catch(err){
        console.error(err);
    }
});

app.post("/edit", async (req,res) => {
    const editid = req.body.updatedItemId;
    const edittitle=req.body.updatedItemTitle;

    try{
        await db.query("UPDATE ToDoList SET title=($1) WHERE id=$2",[edittitle,editid]);
        res.redirect("/");
    }catch(err){
        console.error(err);
    }
})

app.post("/delete", async (req,res)=>{
    const deleteid=req.body.deleteItemId;
    try{
        await db.query("DELETE FROM ToDoList WHERE id=$1",[deleteid]);
        res.redirect("/");
    }catch(err){
        console.error(err);
    }
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})