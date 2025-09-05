import dotenv from "dotenv"
dotenv.config();
import { createServer } from "http";
import app from "./app";
import ConnectDB from "./configs/db";


const httpServer = createServer(app);

(async ()=> {
  try {
    await ConnectDB()
    httpServer.listen(process.env.PORT, () => console.log("🚀 Server running on 3000"));
  } catch(error) {
    console.log(error)
  }
})();