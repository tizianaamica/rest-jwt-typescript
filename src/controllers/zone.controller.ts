import { Request, Response } from "express";
import Zone, { IZone } from "../models/zone";
import Animal from "../models/animal";

export const createZone = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { name } = req.body;
    const existingZone = await Zone.findOne({ name });
    if (existingZone) {
      return res.status(400).json({ message: "Zone already exists" });
    }
    const zone: IZone = new Zone({ name });
    const newZone: IZone = await zone.save();
    res.status(201).json(newZone);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getZones = async (req: Request, res: Response): Promise<void> => {
  try {
    const zones: IZone[] = await Zone.find();
    res.status(200).json(zones);
  } catch (error) {
    res.status(400).json({ error: "Error retrieving zones" });
  }
};

export const updateZone = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedZone: IZone | null = await Zone.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedZone) {
      return res.status(404).json({ error: "Zone not found" });
    }
    res.status(200).json(updatedZone);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const deleteZone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animalsInZone = await Animal.find({ zone: id });

    if (animalsInZone.length > 0) {
      return res
        .status(400)
        .json({ message: "Zone has associated animals and cannot be deleted" });
    }

    const deletedZone: IZone | null = await Zone.findByIdAndDelete(id);
    if (deletedZone) {
      res.status(204).json({ message: "Zone deleted", deletedZone });
    } else {
      res.status(404).json({ message: "Zone not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error deleting zone", error });
  }
};
