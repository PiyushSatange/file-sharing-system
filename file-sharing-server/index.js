const express = require("express");
require("dotenv").config();
const {connectMongo} = require("./db")
const {authRouter} = require("./auth/route")
const {adminAuth} = require("./middlewares/auth")
var cors = require('cors')
const cookieParser = require("cookie-parser");


const port = process.env.PORT;

const app = express();
connectMongo();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter);

app.get("/", (req, res)=>
    res.send("Hello word")
)

app.listen(port, ()=>console.log("running on port...."+port));