
import mongoose from "mongoose";
mongoose.set('strictQuery', false);
class connect {
    connect = async (dbstring: string) => {
        try {
            await mongoose.connect(dbstring, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,   
                // useFindAndModify: false,
            });
           // console.log("connected to db");
        } catch (error) {
           // console.log("Database connection error.",error);
        }
    }
}
export default new connect();