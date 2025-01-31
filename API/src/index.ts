import express from "express";
const cors = require('cors');

import taskRouter from "./routes/task";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.use(taskRouter);

app.listen(PORT, () => {
    console.log("Server has successfully started! Port: ", PORT); 
})  