// Zoo.ts

import { Schema, model, Document } from "mongoose";

// Define una interfaz que representa un animal
interface Animal {
  nombre: string;
  especie: string;
  comentarios: Comentario[];
}

// Define una interfaz que representa un comentario
interface Comentario {
  cuerpo: string;
  autor: string;
  fecha: Date;
  resuelto: boolean;
}

// Define el esquema de una Zona que contiene animales
interface Zona extends Document {
  nombre: string;
  animales: Animal[];
}

const ComentarioSchema = new Schema({
  cuerpo: String,
  autor: String,
  fecha: Date,
  resuelto: Boolean,
});

const AnimalSchema = new Schema({
  nombre: String,
  especie: String,
  comentarios: [ComentarioSchema],
});

const ZonaSchema = new Schema({
  nombre: String,
  animales: [AnimalSchema],
});

// Crea el modelo de Zona
const ZonaModel = model<Zona>("Zona", ZonaSchema);

export default ZonaModel;
