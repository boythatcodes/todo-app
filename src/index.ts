import express from "express";
import bodyParser from 'body-parser';
import user from "./routes/userRoutes";
import cors from "cors";


const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://example.com'
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};


app.use(cors(corsOptions));

app.use(bodyParser.json());
app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.use("/user", user)

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});