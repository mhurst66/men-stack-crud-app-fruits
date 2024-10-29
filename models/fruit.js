const mongoose = require('mongoose')




// 1. first define the shape of the object we want to store in our database
// this is a SCHEMA

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
})

// 2. Tell mongoose that the model we want to generate is based off the schema and provide a name to it
// mongoose.model("Name", schema)

const Fruit = mongoose.model("Fruit", fruitSchema)


// 3. share it with the rest of your application
// module.exports = modelName

module.exports = Fruit


// Notes
// when we talk about the shape of an object we are talking about the fields and inputs of that object
// this allows us to hold all the data without tons of data structures all over the place
// 
// This is where models make sense each singular model is a different data structure and we hold each model in the folder models!
