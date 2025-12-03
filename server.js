import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.send("API da Barbearia está rodando");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
