const express = require('express');

const app = express();
app.use("/dist", express.static('dist'));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.listen(8083, () => console.log("Running in 8083 port"));