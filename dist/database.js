"use strict";
const mongoose = require("mongoose");
// URL de conexión a la base de datos de MongoDB Atlas
const mongoUri = "mongodb+srv://tizianaamica:prueba123@cluster0.dfl4ehq.mongodb.net/?retryWrites=true&w=majority";
// Establece la conexión a la base de datos de MongoDB Atlas
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Conexión exitosa a la base de datos de MongoDB Atlas");
});
connection.on("error", (err) => {
    console.error("Error de conexión a la base de datos: " + err);
});
