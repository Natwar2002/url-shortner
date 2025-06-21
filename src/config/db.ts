import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
    } catch (error) {
        console.log("Error connecting to databse: ", error);
    }
}

export default connectDB;