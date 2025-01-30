import express from "express";
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(PORT, () => {
    console.log("Server has successfully started! Port: ", PORT); 
})  