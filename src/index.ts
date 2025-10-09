/// <reference path="./types/global.d.ts" />
import dotenv from "dotenv"
dotenv.config();
import { createServer } from "http";
import app from "./app";
import ConnectDB from "./providers/db.provider";
import env from "./configs/env.config";

const httpServer = createServer(app);

(async ()=> {
  try {
    await ConnectDB()
    httpServer.listen(env.PORT, () => console.log("🚀 Server running on 3000"));
  } catch(error) {
    console.log(error)
  }
})();