import { Router } from "express";
import { getVolumeOverTime, getTopAddresses, getEventTypeCounts } from "../services/analytics";

export const analyticsRouter = Router();

analyticsRouter.get("/:contractId", async (req, res, next) => {
  try {
    const { contractId } = req.params;

    const [volumeOverTime, topAddresses, eventTypeCounts] = await Promise.all([
      getVolumeOverTime(contractId),
      getTopAddresses(contractId),
      getEventTypeCounts(contractId),
    ]);

    res.json({ volumeOverTime, topAddresses, eventTypeCounts });
  } catch (err) {
    next(err);
  }
});