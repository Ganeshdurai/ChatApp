var express = require('express')
var app = express();
var firebase = require('firebase');
var mongoose = require('mongoose');
var Message = require("./model/Message");
const admin = require('firebase-admin');
// const functions = require('firebase-functions');
// mongoose.connect('mongodb://localhost:27017/simpleChat');
var bodyParser = require('body-parser')
var server = app.listen(process.env.PORT || 3000)
var io = require('socket.io').listen(server);
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAC1FfxbZCUvwZYdMEe2QblJmr4H5WnaYE",
    authDomain: "chatapp-423cd.firebaseapp.com",
    databaseURL: "https://chatapp-423cd.firebaseio.com",
    projectId: "chatapp-423cd",
    storageBucket: "chatapp-423cd.appspot.com",
    messagingSenderId: "301529740301"
  };
//   console.log("config",config);
  firebase.initializeApp(config);

 

io.on('connection', () =>{
    console.log('a user is connected')

   })

// var db = mongoose.connect('mongodb://localhost:27017/simpleChat', function(error){
//     if(error) console.log(error);
//         console.log("connection successful");
// });
// console.log(mongoose.connection.readyState);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/messages',function(req,res){
    var messageCollection = firebase.firestore().collection('Messages');
    messageCollection.get().then((ress) => {
        let array=[]
        ress.forEach(data=>{
           array.push(data.data())
        })          
         res.json({messages: array})     
    }).catch((error)=> {
        console.log("message",error);
    });
});

app.post('/messages', (req,res)=>{
    var messageCollection = firebase.firestore().collection('Messages');
    messageCollection.add(req.body).then((messages) => {
        io.emit('message', req.body);
        res.json({Message:"Success"})
    }).catch(error=> {
        res.json(error)
    });
  
    // var messages = new Message();
    // messages.name = req.body.name;
    // messages.message = req.body.message;
    // messages.save((err) =>{
    //     if(err) return err;
    //     io.emit('message', req.body);
    //     res.json("Successfully Saved")
    // })
});


app.use(express.static(__dirname));
