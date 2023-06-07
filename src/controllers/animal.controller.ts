import { Request, Response } from "express";
import Animal, { IAnimal } from "../models/animal";
import Specie from "../models/specie";
import Comment from "../models/comment";
import Reply from "../models/reply";

export const createAnimal = async (req: Request, res: Response) => {
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
    res.status(201).json(savedAnimal);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getAnimals = async (req: Request, res: Response) => {
  try {
    const zones: IAnimal[] = await Animal.find();
    res.status(200).json(zones);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
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
      res.status(200).json(updatedAnimal);
    } else {
      res.status(404).json({ message: "Animal not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
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
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getAnimalCountByZone = async (req: Request, res: Response) => {
  try {
    const zoneId = req.params.zoneId;
    const animalCountByZone = await Animal.countDocuments({ zone: zoneId });

    res.json({ count: animalCountByZone });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getAnimalCountBySpecies = async (req: Request, res: Response) => {
  try {
    const animalCountBySpecies = await Animal.aggregate([
      {
        $group: {
          _id: "$species",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          species: "$_id",
          count: 1,
        },
      },
    ]);
    res.json(animalCountBySpecies);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getAnimalsByRegistrationDate = async (
  req: Request,
  res: Response
) => {
  try {
    const dateStr = req.params.date;
    const [year, month, day] = dateStr.split("-").map(Number);

    const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

    const animals = await Animal.find({
      registrationDate: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    })
      .populate("species", "name")
      .populate("zone", "name");

    res.json(animals);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
