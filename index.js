require("dotenv").config()
const express = require("express");
const cors = require("cors");
const morganbody = require("morgan-body")


const dbConnect = require("./config/mongo")
const {dbConnectMySql} = require("./config/mysql")
const app = express();
const ENGINE_DB = process.env.ENGINE_DB

app.use(cors());
app.use(express.json())
app.use(express.static("storage"))

const loggerStream = require("./utils/handleLogger")


morganbody(app, {
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400
  }
})

const port = process.env.PORT || "3001";

// RUTAS
app.use("/api", require("./routes"))

app.listen(port, () => {
  console.log("Puerto " + port);
});

(ENGINE_DB == "nosql") ? dbConnect(): dbConnectMySql()
