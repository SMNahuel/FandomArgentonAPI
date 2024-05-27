const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://disruptive:Develop123!@cluster0.pupgjpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

mongoose.connect(dbURI);

const db = mongoose.connection;

/* Cuando se conecte sin error */
db.on("connected", () => {
  console.log(`Conexión establecida a la DB de Mongo`);
});

/* Cuando no se pueda conectar */
db.on("error", (err) => {
  console.error("Error de conexión a la base de datos:", err);
});

/* Cuando nos desconectemos */
db.on("disconnected", () => {
  console.log("Desconectado de la base de datos");
});

module.exports = db;
