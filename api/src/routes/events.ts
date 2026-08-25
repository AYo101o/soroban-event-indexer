import { Router } from "express";
import { prisma } from "../db";

export const eventsRouter = Router();

eventsRouter.get("/", async (req, res, next) => {
  try {
    const { contractId, limit = "50" } = req.query;

    if (!contractId || typeof contractId !== "string") {
      return res.status(400).json({ error: "contractId query param is required" });
    }

    const events = await prisma.event.findMany({
      where: { contractId },
      orderBy: { createdAt: "desc" },
      take: Number(limit),
    });

    res.json({ events });
  } catch (err) {
    next(err);
  }
});