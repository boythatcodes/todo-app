import express from "express";
import bodyParser from 'body-parser';
import user from "./routes/userRoutes";


const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.use("/user", user)

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});