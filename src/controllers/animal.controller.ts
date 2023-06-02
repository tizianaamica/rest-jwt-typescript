import { Request, Response } from "express";
import Animal, { IAnimal } from "../models/animal";
import Specie from "../models/specie";

export const createAnimal = async (req: Request, res: Response) => {
  try {
    const specie = await Specie.findOne({ name: req.body.species });

    if (!specie) {
      return res.status(404).json({ message: "Species not found" });
    }

    const newAnimal = new Animal({
      name: req.body.name,
      species: specie._id,
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
      res.json({ message: "Animal deleted", deletedAnimal });
    } else {
      res.status(404).json({ message: "Animal not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting animal", error });
  }
};
