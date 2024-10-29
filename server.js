// server.js

require('dotenv').config() // Requires & Loads the environment file and variables from .env file this should be the first line active line in the server so the rest of the application can use the "secret codes"

require('./config/database') // This requires the server to open the mongoose database from our config file

const express = require("express")

// Models
const Fruit = require('./models/fruit')


const app = express()
const PORT = process.env.PORT ? process.env.PORT : '3000'


// GET ROUTES
app.get("/", async (req, res) => {
    res.render("index.ejs")
})

app.get("/fruits/new", (req, res) => {
  res.send("This route sends the user a form page!")
})











app.listen(3000, () => {
  console.log("Listening on port 3000")
})
