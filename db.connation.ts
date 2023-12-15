
import mongoose from "mongoose";
// mongoose.set('strictQuery', false);
class connect {
    connect = async (dbstring: string) => {
        try {
            await mongoose.connect('mongodb+srv://abhay:abhay2271@leadgenrator.nwtud.mongodb.net/colorgame?retryWrites=true&w=majority', {
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