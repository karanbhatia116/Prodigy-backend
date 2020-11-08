var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies
const dotenv = require('dotenv');
app.use(cors());
app.use(express.json());
app.listen(3000 || process.env.PORT,()=> console.log("listening at port 3000"));
dotenv.config({ path: "./config.env" });

mongoose.connect("mongodb+srv://manan-j-0806:mananj0806@cluster0.yhdla.mongodb.net/doc_db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("Database connected!")).catch("Error connecting database");


const db = mongoose.connection;
users = db.collection("users");
docs = db.collection("docs");
const usersSchema = new mongoose.Schema({
access_token: String,
id_token: String,
name: String,
email: String,
g_id: String,
img_src:String,
docs: Array
});
const docsSchema = new mongoose.Schema({
doc_id: String,
time_created: String,
last_modified: String,
users: Array
});
const User = mongoose.model('users',usersSchema);
const Doc = mongoose.model('docs',docsSchema);
app.get('/',(req,res)=>{
    res.sendStatus(200);
});


app.get('/docs',(req,res)=>{
    Doc.find((err,data)=>{
        if(err){
            res.sendStatus(500).send(err);
        }
        else{
            res.send(data);
        }
    });
});

app.get('/users',(req,res)=>{
    User.find((err,data)=>{
        if(err){
            res.sendStatus(500).send(err);
        }
        else{
            res.send(data);
        }
    });
});

app.post('/doc/new',(req,res)=>{
console.log(req.body);
var object = new Doc(req.body);
docs.insertOne(object);
console.log(object);
res.sendStatus(200).send(object);
});
app.post('/user/new',(req,res)=>{
    console.log(req.body);
    const object = new User(req.body);
    users.insertOne(object);
    console.log(object);
    res.sendStatus(200).send(object);
});
