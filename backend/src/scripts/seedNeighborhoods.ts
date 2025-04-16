import "../config/environment";

import mongoose from "mongoose";
import crypto from "crypto";
import NeighborhoodModel from "../models/NeighborhoodModel";

const LEVEL_1_BASE_TARIFF = 5;
const LEVEL_2_BASE_TARIFF = 8;
const LEVEL_3_BASE_TARIFF = 13;

const level1Neighborhoods = [
  "Água Verde",
  "Batel",
  "Centro",
  "Rebouças",
  "Parolin",
  "Guaíra",
  "Portão",
  "Vila Izabel",
  "Seminário",
  "Santa Quitéria",
  "Bigorrilho",
];
const level2Neighborhoods = [
  "Mossunguê",
  "Mercês",
  "São Francisco",
  "Centro Cívico",
  "Alto da Glória",
  "Alto da XV",
  "Cristo Rei",
  "Jardim Botânico",
  "Prado Velho",
  "Hauer",
  "Fanny",
  "Lindóia",
  "Novo Mundo",
  "Fazendinha",
  "Campo Comprido",
  "Cabral",
  "Capão Raso",
];
const level3Neighborhoods = [
  "Orleans",
  "Santo Inácio",
  "Cascatinha",
  "Vista Alegre",
  "Bom retiro",
  "Ahú",
  "Hugo Lange",
  "Jardim Social",
  "Tarumã",
  "Capão da Imbuia",
  "Cajuru",
  "Jardim das Américas",
  "Guabirotuba",
  "Uberaba",
  "Boqueirão",
  "Xaxim",
  "Pinheirinho",
  "Cidade Insustrial",
  "Santa Felicidade",
];

function generateHash(data: unknown): string {
  const json = JSON.stringify(data);
  return crypto.createHash("sha256").update(json).digest("hex");
}

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);

    const db = mongoose.connection;
    const metadata = db.collection("metadata");

    const neighborhoodsData = [
      ...level1Neighborhoods.map((name) => ({
        name,
        baseTariff: LEVEL_1_BASE_TARIFF,
      })),
      ...level2Neighborhoods.map((name) => ({
        name,
        baseTariff: LEVEL_2_BASE_TARIFF,
      })),
      ...level3Neighborhoods.map((name) => ({
        name,
        baseTariff: LEVEL_3_BASE_TARIFF,
      })),
    ];

    const newHash = generateHash(neighborhoodsData);
    const existingHash = await metadata.findOne({ key: "neighborhoodsHash" });

    if (existingHash && existingHash.value === newHash) {
      console.log("Neighborhoods already seeded, skipping...");
      return;
    }

    await NeighborhoodModel.deleteMany();
    await NeighborhoodModel.insertMany(neighborhoodsData);

    await metadata.updateOne(
      { key: "neighborhoodsHash" },
      { $set: { value: newHash } },
      { upsert: true }
    );

    console.log("Neighborhoods seeded successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed().then(() => {
  process.exit(0);
});
