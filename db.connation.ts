
import mongoose from "mongoose";
// mongoose.set('strictQuery', false);
class connect {
    connect = async (dbstring: string) => {
        try {
            await mongoose.connect(dbstring, {
                // useNewUrlParser: true,
                 // useUnifiedTopology: true,
                socketTimeoutMS: 30000, // Adjust this value
                connectTimeoutMS: 30000, // Adjust this value
            });
            // console.log("connected to db");
        } catch (error) {
            console.log("Database connection error.",error);
        }
    }
}
export default new connect();