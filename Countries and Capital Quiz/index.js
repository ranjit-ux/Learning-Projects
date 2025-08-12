import express from "express"
import bodyParser from "body-parser"
import pg from "pg";

const app=express();
const port = 3000;

const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"World",
    password:"RanjitKumarSingh.07",
    port:5432,
})

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let quiz = [];
db.query("SELECT * FROM capitals",(err,res)=>{
    if(err){
        console.log("Error occur during executing query",err.stack);
    }else{
        quiz=res.rows;
    }
    db.end();
});

let totalcorrect=0;

let currentQuestion = {};

//get home
app.get("/", async(req,res)=>{
    totalcorrect=0;
    await nextQuestion();
    console.log(currentQuestion);
    res.render("index.ejs", {question: currentQuestion});
});

//post a new question
app.post("/submit", (req,res)=>{
    let answer=req.body.answer.trim();
    let isCorrect=false;
    if(currentQuestion.capital.toLowerCase()===answer.toLowerCase()){
        totalcorrect++;
        console.log(totalcorrect);
        isCorrect=true;
    }

    nextQuestion();
    res.render("index.ejs",{
        question:currentQuestion,
        wasCorrect: isCorrect,
        totalscore:totalcorrect,
    });
});

async function nextQuestion(){
    const randomQuestion = quiz[Math.floor(Math.random()*quiz.length)];

    currentQuestion=randomQuestion;
}

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});