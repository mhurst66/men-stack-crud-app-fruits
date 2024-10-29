
require('dotenv').config() // Requires & Loads the environment file and variables from .env file this should be the first line in the server so the rest of the application can use the "secret codes"
require('./config/database') // This requires the server to open the database from our config file
const express = require("express")

// Models
const Fruit = require('./models/fruit')


const app = express()
const PORT = process.env.PORT ? process.env.PORT : '3000'


app.get("/", async (req, res) => {
    res.render("index.ejs")
})









app.listen(3000, () => {
  console.log("Listening on port 3000")
})
