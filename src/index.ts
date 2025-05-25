import express from "express";
import bodyParser from 'body-parser';
import user from "./routes/userRoutes";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.ts";
import path from "path";


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

app.use("/user", user)
app.use("/todos", todoRoutes)

if (process.env.DEV === 'false') {
  const vueAppPath = path.join(__dirname, '../frontend/dist');

  app.use(express.static(vueAppPath));
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(vueAppPath, 'index.html'));
  });
} else {
  
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});