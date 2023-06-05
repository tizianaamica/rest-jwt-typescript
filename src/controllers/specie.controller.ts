import { Request, Response } from "express";
import Specie, { ISpecie } from "../models/specie";

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
    res.status(500).json({ error: "Error creating specie" });
  }
};

export const getSpecies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const zones: ISpecie[] = await Specie.find();
    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving zones" });
  }
};

export const updateSpecie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedSpecie: ISpecie | null = await Specie.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedSpecie);
  } catch (error) {
    res.status(500).json({ error: "Error updating specie" });
  }
};

export const deleteSpecie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await Specie.findByIdAndDelete(id);
    res.status(200).json({ message: "Specie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting specie" });
  }
};
