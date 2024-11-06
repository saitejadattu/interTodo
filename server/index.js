const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
app.use(express.json())
app.use(cors())
const PORT = 3002
const URL = "mongodb://127.0.0.1:27017/intermediate2"
mongoose.connect(URL)
const db = mongoose.connection;
db.on("error", (err)=>{
    console.error("error while connecting to server",error)
})
db.once("open", ()=>{
    console.log("server connected Successfully")
})
app.listen(PORT, ()=>console.log("server connected"))
const userSchema = new mongoose.Schema({
    id: Number,name: String, email: String
})
const User = mongoose.model("User", userSchema)
app.post("/addUser", async (req, res)=>{
    try{
        const userAdded = User.create({
            id: req.body.id,name: req.body.name, email: req.body.email
        })
        res.status(201).json(userAdded)
    }catch(err){
        res.status(400).json(err)
    }
})