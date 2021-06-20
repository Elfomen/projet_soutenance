import mongoose from 'mongoose'

const URI = "mongodb+srv://projet_soutenance:t8igL5WpHzlmeXl8@cluster0.e0owv.mongodb.net/projet_soutenance?retryWrites=true&w=majority"

const connect = async () => {
    try {
        await mongoose.connect(URI , {
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