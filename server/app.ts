import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

// Mock data inladen (JSON-bestand)
const dataPath = path.join(__dirname, "data", "mock-data.json");
const rawData = fs.readFileSync(dataPath, "utf-8");
const data = JSON.parse(rawData);

// Basis route (snelle check in browser)
app.get("/", (req: Request, res: Response): void => {
  res.send("Evacuation Backoffice API draait. Probeer /api/spaceship of /api/decks");
});

// Gezondheidscheck (optioneel maar handig)
app.get("/health", (req: Request, res: Response): void => {
  res.json({ status: "ok" });
});

// -------- Basis API (tegen volgende week) --------

// GET: spaceship ophalen
app.get("/api/spaceship", (req: Request, res: Response): void => {
  res.json(data.spaceship);
});

// GET: alle decks ophalen
app.get("/api/decks", (req: Request, res: Response): void => {
  res.json(data.spaceship.decks);
});

// GET detailroute: één deck ophalen
app.get("/api/decks/:deckId", (req: Request, res: Response): void => {
  const deckId = req.params.deckId;
  const deck = data.spaceship.decks.find((d: any) => d.id === deckId);

  if (!deck) {
    res.status(404).json({ message: "Deck not found" });
    return;
  }

  res.json(deck);
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});