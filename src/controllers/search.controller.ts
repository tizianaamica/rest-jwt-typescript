import { Request, Response } from "express";
import Zone from "../models/zone";
import Animal from "../models/animal";
import Comment from "../models/comment";
import Reply from "../models/reply";
import Specie from "../models/specie";

export const search = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;
    const searchResults = [];

    const zones = await Zone.find({
      name: { $regex: keyword, $options: "i" },
    });
    if (zones.length > 0) {
      searchResults.push({ category: "Zonas", results: zones });
    }
    const animals = await Animal.find({
      $or: [
        { name: { $regex: new RegExp(keyword, "i") } },
        {
          species: {
            $in: await Specie.find({
              name: { $regex: new RegExp(keyword, "i") },
            }).distinct("_id"),
          },
        },
      ],
    });

    if (animals.length > 0) {
      searchResults.push({ category: "Animales", results: animals });
    }

    const comments = await Comment.find({
      body: { $regex: keyword, $options: "i" },
    });
    const replies = await Reply.find({
      body: { $regex: keyword, $options: "i" },
    });

    if (comments.length > 0 || replies.length > 0) {
      const combinedResults = [...comments, ...replies];
      searchResults.push({
        category: "Comentarios y Respuestas",
        results: combinedResults,
      });
    }

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: "Error searching", error });
  }
};
