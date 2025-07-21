import fs from "fs";
import inquirer from "inquirer";
// var qr = require("qr-image"); //since we had selected module in type in package.json we have to use ECMA scipt if we had choosed type:"commonJS" then tis is valid
import qr from "qr-image";


inquirer
    .prompt([{
        message:"Type Your URL: ",
        name:"URL"
    }])
    .then((answers)=>{
       const url = answers.URL;
       var qr_png = qr.image(url);
       qr_png.pipe(fs.createWriteStream("qr_image.png"));

       fs.appendFile("URL.txt",url + "\n",(err)=>{
        if(err) throw err;
        console.log("URL has been saved");
       })
    })
    .catch((error)=>{
        if(error.isTtyError){
            console.log("Promp couldn't be rendered in the current environment");
        }
        else{
            console.log("Somthing went wrong",error);
        }
    });
