import mongoose, { Schema, model } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test')    //making connection with mongodb test database 
        console.log("Database Connected Sucessfully...")

        //define schema for Human which will have name feild of type string
        const HumanSchema = new Schema({
            name: String
        })

        //adds greeting method to the HumanSchema 
        HumanSchema.methods.greeting = function greeting() {
            /* functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance: */
            const greeting = this.name ? "Good morning, it's me " + this.name : "I don't have name";
            console.log(greeting)
        }

        //create new model, its nothing but a class with which we will use to construct documents
        const Human = new model('Human', HumanSchema)

        //defining a document with field property of name : "shyam"
        const shyam = new Human({ name: "shyam" })
        
        //similarly, defining a document with field property of name : nisha
        const nisha = new Human({ name: "nisha" })

        //invoking function added to the methods property of schema
        nisha.greeting()

        //saving document to the database
        shyam.save()

        //this query will find all the humans in the database
        const humans = await Human.find();

        const searchNisha = await Human.find({name : /^nisha/})

        //loging all the humans
        console.log(humans)

        //loging filtered human
        console.log(searchNisha)
    } catch (error) {
        console.log("error", error)
    }
}

connectDB();