import mongoose, { model, Schema } from "mongoose";

mongoose.set('strictQuery', false)

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test')
        console.log("Database connected sucessfully...")
    } catch (error) {
        console.log("Error ocured during db connection: ", error)
    }
}

connectDB();

//defining mongoose schema for book 
const bookSchema = new Schema({
    name: String,
    pages: Number,
    author: String,
    publisher: String
})

//schema.add method will add additonal keys 
// bookSchema.add({edition : String})

//adding instance method to the bookSchema
bookSchema.methods.findSamePublisher = function (cb) {
    return new model('Book').find({ publisher: this.publisher },cb)
}

//creating a model of using bookSchema 
const Book = new model('Book', bookSchema);

const munamadan = new Book({
    name: "munamadan",
    pages: 270,
    author: "Laxmi  shrestha",
    publisher: "samar nepal"
})

const jiwankadakiful = new Book({
    name: "jiwankadakiful",
    pages: 199,
    author: "jhamak kumari ghimire",
    publisher: "samar nepal"
})

//saving new document using Book model
// await jiwankadakiful.save()
// await munamadan.save()


//loging munamadan book 
// console.log(munamadan)

//invoking intance method findSamePublisher which wiil give us a list of books with same publisher
/* munamadan.findSamePublisher((err, publishers) => {
        console.log(publishers)
}) */







