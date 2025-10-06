import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app";
import { getEnvVars } from "./utils/getEnvVars";

dotenv.config();

const { MONGO_URI, PORT } = getEnvVars();

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const port = PORT ? PORT : 3000;
    app.listen(port, () => {
      console.log(`app is listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
