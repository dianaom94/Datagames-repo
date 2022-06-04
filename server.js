const express = require("express");
const connectDB = require("./database");

const cors = require("cors");
const { readdirSync } = require("fs");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc"); //homologar contenido de la documentación
const swaggerConfig = require("./documentation/swagger.config.json"); //configuración global
require ("dotenv").config();
const path = require("path");

const app = express();

connectDB();


app.use(express.json({limit:"2mb"}))
const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use("/game/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, {explorer: true}))
app.use(cors());


readdirSync("./routes").map((r) => app.use("/game", require("./routes/" + r)))

const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Server is running on port ${port}`))
