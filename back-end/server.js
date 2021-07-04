import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import connectToTheDatabase from './config/Database.js'
import mongoose from 'mongoose'
import path from 'path'

import dotenv from 'dotenv'

dotenv.config({ path : "../config.env" })
// importing the API

import AllApi from './API/index.js'
import Pusher from 'pusher'
const port = process.env.PORT || 5000


// pusher configuration
const pusher = new Pusher({
    appId: "1219945",
    key: "c0dc39d501d4e7a8bd2c",
    secret: "51d57e185c564cf0d54f",
    cluster: "eu",
    useTLS: true
  });

  const db = mongoose.connection

  db.once("open" , () => {
      console.log("Connected to the database")

      const messageCollection = db.collection("chats")

      const changeStream = messageCollection.watch()

      changeStream.on("change" , (change) => {
          console.log(change)

          if(change.operationType === 'insert'){
              const messageDetails = change.fullDocument

              pusher.trigger("messages" , "inserted" , {
                  sender : messageDetails.sender , 
                  receiver : messageDetails.receiver ,
                  message : messageDetails.message , 
                  send_date : messageDetails.send_date
              })
          }
      })
  }) // end of pusher configurations


const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
connectToTheDatabase()
// connecting to the database
//connectToTheDatabase();

// using the API's
app.use("/" , AllApi)
//console.log(process.env.PORT)

/// Heroku config

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname ,"/front-end/build")))

    app.get("*" , (req , res) => {
        res.sendFile(path.join(__dirname , "front-end" , "build" , "index.html"))
    })
}else{
    app.get('/' , (req , res) => {
        res.send("Api running")
    })
}


// app liten
app.listen(port , () => {
    console.log("The app is running on port " + port); 
})