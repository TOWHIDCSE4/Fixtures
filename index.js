const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const path = require("path");
const db = require("./db");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// internal imports

const {
   notFoundHandler,
   errorHandler,
} = require("./middleware/common/errorHandler");
const listRouter = require("./router/listsRouter");
const datesWithMatchesRouter = require("./router/datesWithMatchesRouter");

const app = express();

dotenv.config();

// database connection
// mongoose
//    .connect(process.env.MONGO_CONNECTION_STRING, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//    })
//    .then(() => console.log("Database connection successful"))
//    .catch((err) => console.log(err));

//request parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));



// routing setup
app.use("/listsFixtures", listRouter);
app.use("/datesWithMatches", datesWithMatchesRouter);

// 404 not found handler

// app.use(notFoundHandler);

// common error handler

// app.use(errorHandler);

// swagger documentation
const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Fixtures API",
         version: "1.0.0",
         description: "A simple Express Library API",
      },
      servers: [
         {
            url: "http://localhost:5000/",
         },
      ],
   },
   apis: ["./router/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



app.get("/", (req, res) => {
   res.send("Server is running!");
});

db.connect(() => {
   app.listen(process.env.PORT, () => {
      console.log(`Listening to the port ${process.env.PORT}`);
   });
});
