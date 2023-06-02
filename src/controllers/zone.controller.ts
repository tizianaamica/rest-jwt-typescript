import { Request, Response } from "express";
import Zone, { IZone } from "../models/zone";
import Animal from "../models/animal";

export const createZone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const zone: IZone = new Zone({ name });
    const newZone: IZone = await zone.save();
    res.status(201).json(newZone);
  } catch (error) {
    res.status(500).json({ error: "Error creating zone" });
  }
};

export const getZones = async (req: Request, res: Response): Promise<void> => {
  try {
    const zones: IZone[] = await Zone.find();
    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving zones" });
  }
};

export const updateZone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedZone: IZone | null = await Zone.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedZone);
  } catch (error) {
    res.status(500).json({ error: "Error updating zone" });
  }
};

export const deleteZone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await Zone.findByIdAndDelete(id);
    res.status(200).json({ message: "Zone deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting zone" });
  }
};
