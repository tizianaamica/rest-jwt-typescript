import PDFDocument from "pdfkit";
import fs from "fs";
import { Request, Response } from "express";
import AnimalModel, { IAnimal } from "../models/animal";
import ZoneModel, { IZone } from "../models/zone";
import CommentModel, { IComment } from "../models/comment";

export const generateReportsForZones = async (req: Request, res: Response) => {
  try {
    // Obtener todas las zonas
    const zones: IZone[] = await ZoneModel.find();

    for (const zone of zones) {
      const doc = new PDFDocument();

      // Define la ruta para guardar el PDF en la carpeta "src/reports"
      const pdfPath = `src/reports/informe_${zone.name}.pdf`;

      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      doc.fontSize(16).text(`Informe para la Zona: ${zone.name}`);
      doc.moveDown();

      const animals: IAnimal[] = await AnimalModel.find({ zone: zone._id });

      for (const animal of animals) {
        doc.fontSize(12).text(`Animal: ${animal.name}`);
        doc.fontSize(10).text(`Especie: ${animal.species}`);

        const comments: IComment[] = await CommentModel.find({
          animal: animal._id,
        });

        if (comments.length > 0) {
          doc.fontSize(10).text("Comentarios:");
          doc.moveDown();

          for (const comment of comments) {
            doc.fontSize(10).text(`- ${comment.body}`);
            doc.fontSize(8).text(`Autor: ${comment.author}`);
            doc.fontSize(8).text(`Fecha: ${comment.date}`);
            doc.moveDown();
          }
        }

        doc.moveDown();
      }

      doc.end();

      console.log(
        `Informe para ${zone.name} generado y guardado en ${pdfPath}`
      );
    }

    // Enviar una respuesta a la solicitud
    res.status(200).json({ message: "Informes generados con éxito" });
  } catch (error) {
    // Manejar errores adecuadamente
    res.status(500).json({ message: "Error al generar informes", error });
  }
};
