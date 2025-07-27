import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//This is used for middleware or configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
); //by using thing we can set the origin frontend who is allow to get access of services and data

// * ✅✅✅✅ Important configuration starts from here

// Configuring the json data, i.e accepting only that mush amount of json imposing a limit on it.
app.use(express.json({ limit: "16kb" }));
//when the url comes it is some times having spaces so to ensure the spaces like %20 and "+" understand config like this
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); //Store the static files like images, static,favicon files in public folder
app.use(cookieParser()); // cookieParser is used to get the access of user qookie from server basically performing the CURD operations on user cookie in server ex: setting the user cookie

// * ✅✅✅✅✅ Configurations end here
export { app };
