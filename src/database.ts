const mongoose = require("mongoose");
require("dotenv").config();

// Establece la conexión a la base de datos de MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Conexión exitosa a la base de datos de MongoDB Atlas");
});

connection.on("error", (err: any) => {
  console.error("Error de conexión a la base de datos: " + err);
});
