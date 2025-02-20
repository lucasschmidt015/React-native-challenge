import express from "express";
const cors = require('cors');

import taskRouter from "./routes/task";

const app = express();

app.use(cors({ 
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());

const PORT = 4000;

app.use((req, res, next) => {
    console.log(`Requested URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
});


app.use(taskRouter);

app.listen(PORT, '192.168.0.104', () => {
    console.log("Server has successfully started! Port: ", PORT); 
}) 