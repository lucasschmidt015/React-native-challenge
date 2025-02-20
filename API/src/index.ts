import express from "express";
const cors = require('cors');

import taskRouter from "./routes/task";

const app = express();

const PORT = parseInt(process.env.PORT || '4000', 10);
const IP_ADDRESS = process.env.IP_ADDRESS || '0.0.0.0';

app.use(cors({ 
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Requested URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
});


app.use(taskRouter);

app.listen(PORT, IP_ADDRESS, () => {
    console.log("Server has successfully started! Port: ", PORT); 
}) 