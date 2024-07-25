const express = require('express');
const UssdMenu = require('ussd-menu-builder');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

let menu = new UssdMenu();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/api/test", (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    res.send("Testing the requests");
    const number = phoneNumber;
  });


const port  = process.env.PORT;

app.listen(port, (req, res) => {
    console.log(`Ussd server listening on port ${port}`);
  });
