// server.js

require('dotenv').config() // Requires & Loads the environment file and variables from .env file this should be the first line active line in the server so the rest of the application can use the "secret codes"

require('./config/database') // This requires the server to open the mongoose database from our config file

const express = require("express") // requires express
const app = express() // creates the express app and allows us to use .use, etc.
const PORT = process.env.PORT ? process.env.PORT : '3000'

// Models
const Fruit = require('./models/fruit')
// handles data from form
app.use(express.urlencoded({ extended: false }))


// GET ROUTES
// index.ejs
app.get("/", async (req, res) => {
    res.render("index.ejs")
})
// fruits/new.ejs 
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs")
})

// POST ROUTES
// new fruit
app.post("/fruits", async (req, res) => {
  console.log(req.body)
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect("/fruits/new")
})











// LISTEN FOR THE SERVER
app.listen(3000, () => {
  console.log("Listening on port 3000")
})
