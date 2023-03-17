require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./router");
const db = require("./DBConnection");

const port = process.env.PORT || process.env.LOCAL_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, () => {
    console.log(`Backend is running and listening on localhost:${port}`)
})

app.use(router);
