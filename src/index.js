import dotenv from "dotenv";
import connectDB from "./db/index.js"; //from this we import the data base connection function

dotenv.config({
  path: "./env",
});

connectDB();

/* import express from "express";
//IIFE (Immediately Invoked Function Expression) function works same as normal function but we not need to name it and call it.... as the file loads this effe function run automatically

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (eror) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error: ", error);
    throw err;
  }
})();
 */
