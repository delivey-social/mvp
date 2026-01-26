import "../config/environment";

import mongoose from "mongoose";
import MenuItemModel from "../models/MenuItem";

import menuItems from "../../public/menu_items.json";
import generateHash from "../utils/generateHash";

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);

    const db = mongoose.connection;
    const metadata = db.collection("metadata");

    const newHash = generateHash(menuItems);
    const existingHash = await metadata.findOne({ key: "menuItemsHash" });

    if (existingHash && existingHash.value === newHash) {
      console.log("Menu items already seeded, skipping...");
      return;
    }

    const categories = Object.keys(menuItems).flat();
    let items = Object.values(menuItems);
    items = items.map((itemsByCategory, categoryIndex) => {
      return itemsByCategory.map((item) => ({
        ...item,
        category: categories[categoryIndex],
      }));
    });

    await MenuItemModel.deleteMany();
    await MenuItemModel.insertMany(items.flat());

    await metadata.updateOne(
      { key: "menuItemsHash" },
      { $set: { value: newHash } },
      { upsert: true }
    );

    console.log("Menu items seeded successfully");
  } catch (error) {
    console.error("Seeding menu items failed:\n", error);
    process.exit(1);
  }
}

seed().then(() => process.exit(0));
