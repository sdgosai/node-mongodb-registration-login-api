const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path : './.env'});
const app = express();
app.use(express.json());
require("./db_conn/conn")

const userRouter = require('./router/userrouter')
app.use(userRouter);

const port = process.env.PORT;

app.get("/home", (req, res) =>{
    res.send(`Welcome to Home Page.`);
})
app.get("/about", (req, res) =>{
    res.send(`Welcome to about Page.`);
})
app.get("/contactus", (req, res) =>{
    res.send(`Welcome to Contact US Page.`);
})
app.get("/feedback", (req, res) =>{
    res.send(`Welcome to Feedback Page.`);
})
app.listen(port, () => {
    console.log(`port open ${port}.`);
})
