const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const port =  process.env.PORT || 5001;
const {genAi} = require("./config/googleApi")
const cors = require('cors');
app.use(cors()) // communcate from frontend to backend
app.use(express.json()) // req.body as json
app.use(express.urlencoded({ extended: true }));

app.get("/ai", genAi)
app.post("/ai", genAi)


app.listen(port, () => {console.log(port)})