import { Request, Response } from "express";
import Specie, { ISpecie } from "../models/specie";
import Animal from "../models/animal";

export const createSpecie = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { name } = req.body;
    const existingSpecie = await Specie.findOne({ name });
    if (existingSpecie) {
      return res.status(400).json({ message: "Specie already exists" });
    }
    const specie: ISpecie = new Specie({ name });
    const newSpecie: ISpecie = await specie.save();
    res.status(201).json(newSpecie);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getSpecies = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const zones: ISpecie[] = await Specie.find();
    res.status(200).json(zones);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const updateSpecie = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedSpecie: ISpecie | null = await Specie.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedSpecie) {
      return res.status(404).json({ error: "Specie not found" });
    }
    res.status(200).json(updatedSpecie);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const deleteSpecie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animalsExist = await Animal.find({ species: id });

    if (animalsExist.length > 0) {
      return res.status(400).json({
        message: "Specie has associated animals and cannot be deleted",
      });
    }
    await Specie.findByIdAndDelete(id);
    res.status(204).json({ message: "Specie deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
