import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('Connected to the database successfully');
        })

        connection.on('error',()=>{
            console.log('Error connecting to the database');
            process.exit()
        })
    } catch (error) {
        console.log('Error connecting to the database');
    }
}