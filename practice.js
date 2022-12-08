import mongoose, { model, mongo, Schema } from "mongoose";

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
    return new model('Book').find({ publisher: this.publisher }, cb)
}

//creating a model of using bookSchema 
// const Book = new model('Book', bookSchema);


/* 
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
 */
//saving new document using Book model
// await jiwankadakiful.save()
// await munamadan.save()


//loging munamadan book 
// console.log(munamadan)

//invoking intance method findSamePublisher which wiil give us a list of books with same publisher

/* munamadan.findSamePublisher((err, publishers) => {
        console.log(publishers)
}) */






//Assign a function to the "statics" object of our bookSchema
bookSchema.statics.findByName = function (name) {
    return this.find({ name: new RegExp(name, 'i') })
}

// or, equivalently, we can call `bookSchema.static()`.
bookSchema.static('findByPublisher', function (publisher) {
    return this.find({ publisher });
})

const Book = new model('Book', bookSchema)

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

//invoking bookSchema static method
/* let munamadanBook = await Book.findByName("munamadan")

munamadanBook = munamadanBook.concat(await Book.findByPublisher("samar nepal"))


console.log(munamadanBook) */


/* Mongoose documents represent a one-to-one mapping to documents as stored in MongoDB. Each document is an instance of its Model. */

//reassigning the property value
munamadan.name = "muna madan";

//saving document
/* await munamadan.save((err, doc) => {
    if (!err) {
        console.log(doc)
    }
}) */


//Subdocuments

// const childSchema = new Schema({ name: 'string' });

/* const parentSchema = new Schema({
    // Array of subdocuments
    children: [childSchema],
    // Single nested subdocuments
    child: childSchema
}); */


//defining child schema 
const childSchema = new Schema({ name: 'string' });
//creating a model
const Child = mongoose.model('Child', childSchema)

//assigning document to the child model
const anushuya = new Child({name : "anushuya"})

//saving the document
// await anushuya.save()
// console.log(anushuya)

//defining parent schema
const parentSchema = new Schema({
    child :{
        //child schema type as ObjectID i.e. taking references from 'Child' model
        type : mongoose.Types.ObjectId,
        ref : 'Child'
    }
})

//creating parent model
const Parent = mongoose.model('Parent', parentSchema)

//adding document to the parent model
const pragya = new Parent({child : "639207b48f2416eceb1dc232"})

//saving document
// pragya.save()
// console.log(pragya)

//applying query and populating reference feild
const doc = await Parent.findOne().populate('child')
// console.log(doc)





