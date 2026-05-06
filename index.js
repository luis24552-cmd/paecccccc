console.log("🚀 API Lavandas...");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 CONEXIÓN FORZANDO DB paecc
mongoose.connect(process.env.MONGO_URL, {
  dbName: "paecc"
})
.then(() => console.log("✅ Conectado a Mongo (paecc)"))
.catch(err => console.log("❌ Error Mongo:", err));
console.log("👉 URL REAL:", process.env.MONGO_URL);


// 🌿 MODELO (colección = lavandas)
const Lavanda = mongoose.model("Lavanda", {
  duenio: String,
  fecha: String,
  altura: Number,
  imagen: String
});


// 🔹 BASE
app.get("/", (req, res) => {
  res.send("API Lavandas funcionando 🌿");
});


// 🔹 LISTAR
app.get("/lavandas", async (req, res) => {
  try {
    const datos = await Lavanda.find();
    res.json(datos);
  } catch (error) {
    res.status(500).send(error);
  }
});


// 🔹 CREAR
app.post("/lavandas", async (req, res) => {
  try {
    console.log("📦 Guardando:", req.body);

    const nueva = new Lavanda(req.body);
    await nueva.save();

    res.json({
      mensaje: "Guardado en Mongo ✅",
      data: nueva
    });

  } catch (error) {
    res.status(500).send(error);
  }
});


// 🚀 SERVIDOR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 http://localhost:${PORT}`);
});