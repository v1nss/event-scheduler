const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/events", async(req, res) => {
    try {
        
        console.log(req.body);

    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
});