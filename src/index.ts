import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});