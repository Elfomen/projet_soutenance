import mongoose from 'mongoose'

<<<<<<< HEAD
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://projet_soutenance:t8igL5WpHzlmeXl8@cluster0.e0owv.mongodb.net/projet_soutenance?retryWrites=true&w=majority"
=======
const MONGO_URI = "mongodb+srv://projet_soutenance:t8igL5WpHzlmeXl8@cluster0.e0owv.mongodb.net/projet_soutenance?retryWrites=true&w=majority"
>>>>>>> 94cd7923fc4b5ed78391bd50d66b0f1b8bd2fd59

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI , {
            useNewUrlParser : true , 
            useUnifiedTopology : true , 
            useCreateIndex : true 
        })
        console.log("Succesfully connected to the database")
    } catch (error) {
        console.log(error.message)
    }
    
}

export default connect