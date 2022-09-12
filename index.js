import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


// Mongo Connectivity
 mongoose.connect('mongodb+srv://Sneha:1234@cluster0.7fkdlhx.mongodb.net/?retryWrites=true&w=majority', {    
useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, () => {
    console.log('DB connected ') ;
})

const userSchema = new mongoose.Schema({
    name: String,
    password: String
})

const User = new mongoose.model("User", userSchema)
const Detail = new mongoose.model("Detail", userSchema)

//Routes


// app.get("/",(req,res) =>{
//  res.send("My api")
// })



app.post("/login", (req, res)=> {
    const { name, password} = req.body
    User.findOne({ name: name}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/signup", async(req, res)=> {
    console.log(req.body)
    const { name, password} = req.body
    // await User.insertMany({ name: "raj", password: "123" })
    User.findOne({name: name}, (err, user) => {
        console.log("fddfd")
        if(err){console.log(err)}
        if(user){
            res.send({message: "User already registered"})
        } else {
            console.log("else")
            const user = new User({
                name,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("BE started at port 9002")
})