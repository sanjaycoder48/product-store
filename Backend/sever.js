import express from 'express';
import cros from 'cros';


const app=express();


app.listen(5000,() => {
    console.log("Server is running on port 5000");  

});


app.get("/", (req,res) => {
    res.send("hello from backend");
})