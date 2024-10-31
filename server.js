// server.js

require('dotenv').config() // Requires & Loads the environment file and variables from .env file this should be the first line active line in the server so the rest of the application can use the "secret codes"

require('./config/database') // This requires the server to open the mongoose database from our config file

const express = require("express") // requires express
const app = express() // creates the express app and allows us to use .use, etc.
const PORT = process.env.PORT ? process.env.PORT : '3000'
const methodOverride = require("method-override")
const morgan = require("morgan")

// Models
const Fruit = require('./models/fruit')
// handles data from form
app.use(express.urlencoded({ extended: false }))
// middleware used to delete
app.use(methodOverride("_method"))
app.use(morgan("dev"))


// GET ROUTES
// Render index.ejs
app.get("/", async (req, res) => {
    res.render("index.ejs")
})
// Render full database
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find()
  res.render("fruits/index.ejs", { fruits: allFruits })
})
// fruits/new.ejs 
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs")
})
// ANY ID ROUTE NEEDS TO BE PLACED AFTER NEW ROUTES
// SHOW a specific fruit
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  res.render("fruits/show.ejs", { fruit: foundFruit })
})
// EDIT ROUTE
app.get("/fruits/:fruitID/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitID)
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  })
})

// POST ROUTES
// new fruit
app.post("/fruits", async (req, res) => {
  // console.log(req.body)
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect("/fruits")
})

// DELETE ROUTE
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId)
  res.redirect("/fruits")
})

// UPDATE ROUTE
app.put("/fruits/:fruitId", async (req, res) => {
  // Handle the 'isReadyToEat' checkbox data
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  
  // Update the fruit in the database
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/fruits/${req.params.fruitId}`)
})



// LISTEN FOR THE SERVER
app.listen(3000, () => {
  console.log("Listening on port 3000")
})
