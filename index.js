import express, { json } from "express";
import dotenv from "dotenv";
import http from "http";
// import translate from "bing-translate-api";
import { translate } from "@vitalets/google-translate-api";
import { languages } from "./helpers/supported-languages.js";
import fetch from "node-fetch";
// import la from "./helpers/supported-languages";

const app = express();

app.use(json());

const PORT = process.env.PORT || 3000;
dotenv.config();

app.get("/", async (req, res) => {
  res.json({ status: true, message: `Respuesta desde root` });
});

app.get("/languages", (req, res) => {
  // console.log("languages");
  // const { language_code, display_name } = languages;
  // const x = languages.map((item) => item);
  // console.log(x);
  // const langArray = languages.map((item) => {
  //   item.language_code, item.display_name;
  // });

  // res.json(langArray);
  // res.json({ language_code, display_name });
  const langArr = languages.languages.map((item) => {
    const { language_code, display_name } = item;
    return { language_code, display_name };
  });
  res.json(langArr);
});

app.post("/translate", async (req, res) => {
  const apiKey = process.env.key || "";

  if (apiKey === "") return;

  const url = "https://api.lecto.ai/v1/translate/text";

  const { body } = req;

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
  });
  const data = await response.json();

  // console.log(data);
  res.json(data);
});

app.post("/detect", async (req, res) => {
  const apiKey = process.env.key || "";

  if (apiKey === "") return;

  const url = "https://api.lecto.ai/v1/detect/text";

  const { body } = req;

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
  });
  const data = await response.json();

  // console.log(data);
  res.json(data);
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
