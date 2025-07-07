import express from "express";
import { iniciarBot } from "@/bot";

iniciarBot();

const app = express();

app.get("/", (_req, res) => {
  res.send("Bot de Telegram corriendo correctamente en Railway.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
