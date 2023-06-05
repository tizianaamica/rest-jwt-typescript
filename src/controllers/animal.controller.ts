import { Request, Response } from "express";
import Animal, { IAnimal } from "../models/animal";
import Specie from "../models/specie";
import Comment, { IComment } from "../models/comment";
import Reply from "../models/reply";

export const createAnimal = async (req: Request, res: Response) => {
  console.log("Specie name:", req.body.species);
  try {
    const specie = await Specie.findOne({ name: req.body.species });

    if (!specie) {
      return res.status(404).json({ message: "Species not found" });
    }

    const newAnimal = new Animal({
      name: req.body.name,
      species: specie._id,
      zone: req.body.zone,
    });

    const savedAnimal = await newAnimal.save();
    res.json(savedAnimal);
  } catch (error) {
    res.status(500).json({ message: "Error creating animal", error });
  }
};

export const getAnimals = async (req: Request, res: Response) => {
  try {
    const zones: IAnimal[] = await Animal.find();
    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving animal", error });
  }
};

export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, species } = req.body;
    const updatedAnimal: IAnimal | null = await Animal.findByIdAndUpdate(
      id,
      { name, species },
      { new: true }
    );
    if (updatedAnimal) {
      res.json(updatedAnimal);
    } else {
      res.status(404).json({ message: "Animal not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating animal", error });
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAnimal: IAnimal | null = await Animal.findByIdAndDelete(id);

    if (deletedAnimal) {
      await Comment.deleteMany({ animal: deletedAnimal._id });
      const comments = await Comment.find({ animal: deletedAnimal._id });
      const commentIds = comments.map((comment) => comment._id);
      await Reply.deleteMany({ comment: { $in: commentIds } });

      res.json({ message: "Animal and comments deleted", deletedAnimal });
    } else {
      res.status(404).json({ message: "Animal not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting animal", error });
  }
};
