import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db";
import { validateQuery } from "../middleware/validate";

export const eventsRouter = Router();

const eventsQuerySchema = z.object({
  contractId: z.string(),
  limit: z.string().optional(),
  cursor: z.string().optional(),
});

eventsRouter.get("/", validateQuery(eventsQuerySchema), async (req, res, next) => {
  try {
    const { contractId, limit = "50", cursor } = req.query;

    if (!contractId || typeof contractId !== "string") {
      return res.status(400).json({ error: "contractId query param is required" });
    }

    const events = await prisma.event.findMany({
      where: { contractId },
      orderBy: { createdAt: "desc" },
      take: Number(limit),
      ...(cursor && typeof cursor === "string"
        ? { skip: 1, cursor: { id: cursor } }
        : {}),
    });

    const serializedEvents = events.map((e) => ({
      ...e,
      ledgerSeq: e.ledgerSeq.toString(),
    }));

    const lastEvent = events[events.length - 1];
    const nextCursor = events.length === Number(limit) && lastEvent ? lastEvent.id : null;

    res.json({ events: serializedEvents, nextCursor });
  } catch (err) {
    next(err);
  }
});

eventsRouter.get("/address/:address", async (req, res, next) => {
  try {
    const { address } = req.params;
    const { limit = "50" } = req.query;

    const events = await prisma.event.findMany({
      where: {
        OR: [
          { data: { path: ["from"], equals: address } },
          { data: { path: ["to"], equals: address } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: Number(limit),
    });

    const serializedEvents = events.map((e) => ({
      ...e,
      ledgerSeq: e.ledgerSeq.toString(),
    }));

    res.json({ events: serializedEvents });
  } catch (err) {
    next(err);
  }
});