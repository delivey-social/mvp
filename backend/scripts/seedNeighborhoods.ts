import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface Neighborhood {
  name: string;
  baseTariff: number;
}

const neighborhoodSchema = new mongoose.Schema<Neighborhood>({
  name: { type: String, required: true },
  baseTariff: { type: Number, required: true },
});

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
  "Bigorrilho",
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
  "Santa Quitéria",
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

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);

    const NeighborhoodModel = mongoose.model<Neighborhood>(
      "neighborhoods",
      neighborhoodSchema
    );

    await NeighborhoodModel.deleteMany();
    await NeighborhoodModel.insertMany([
      level1Neighborhoods.map((name) => ({
        name,
        baseTariff: LEVEL_1_BASE_TARIFF,
      })),
      level2Neighborhoods.map((name) => ({
        name,
        baseTariff: LEVEL_2_BASE_TARIFF,
      })),
      level3Neighborhoods.map((name) => ({
        name,
        baseTariff: LEVEL_3_BASE_TARIFF,
      })),
    ]);

    console.log("Neighborhoods seeded successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seed();
