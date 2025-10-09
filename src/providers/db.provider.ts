import mongoose from "mongoose";
import env from "../configs/env.config";


const ConnectDB = async () => {
    if(mongoose.connections[0].readyState) {
        return true
    };
    try {
        await mongoose.connect(env.DATABASE_URI.toString());
        console.log("Connected To DB");
        return true;
    } catch (error) {
        console.log("ERROR While Connecting To Data Base PLZ Check It Out");
        return false;
    };
};

export default ConnectDB;