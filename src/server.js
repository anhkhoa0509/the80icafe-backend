import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initRouter from "./route/web";
import connectDB from "./config/connectDB";
// import cors from "cors";
require("dotenv").config();
let app = express();
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin',process.env.PORT);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// config app
// app.use(cors({origin : true}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
viewEngine(app);
initRouter(app);
connectDB();

let PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  //callback
  console.log(`Server Running... Bruh Bruh in http://localhost:${PORT}`);
});
