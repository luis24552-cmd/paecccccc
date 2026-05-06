console.log("🚀 API Lavandas iniciando...");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔓 Middlewares
app.use(cors());
app.use(express.json());

/* =========================
   🔗 CONEXIÓN A MONGO
========================= */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.log("❌ Error Mongo:", err));

/* =========================
   🌿 MODELO LAVANDA
========================= */
const lavandaSchema = new mongoose.Schema({
  duenio: String,
  fecha: String,
  altura: Number,
  imagen: String
});

const Lavanda = mongoose.model("Lavanda", lavandaSchema);

/* =========================
   🟢 RUTA PRINCIPAL
========================= */
app.get("/", (req, res) => {
  res.send("API Lavandas funcionando 🌿");
});

/* =========================
   📄 LISTAR TODAS
========================= */
app.get("/lavandas", async (req, res) => {
  try {
    const datos = await Lavanda.find();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

/* =========================
   ➕ CREAR LAVANDA
========================= */
app.post("/lavandas", async (req, res) => {
  try {
    const nuevaLavanda = new Lavanda(req.body);
    await nuevaLavanda.save();

    res.json({
      mensaje: "Guardado correctamente 🌿",
      data: nuevaLavanda
    });

  } catch (error) {
    res.status(500).json({ error: "Error al guardar" });
  }
});

/* =========================
   🚀 SERVIDOR
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
});