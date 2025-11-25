#!/usr/bin/env node
/**
 * Simple Firestore seeder.
 * Reads Firebase config from environment (REACT_APP_* vars).
 * Optionally parses a local .env file in the project root if those vars are missing.
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");

const maybeLoadDotenv = () => {
  const envPath = resolve(root, ".env");
  try {
    const content = readFileSync(envPath, "utf8");
    content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .forEach((line) => {
        const [key, ...rest] = line.split("=");
        if (!key) return;
        const value = rest.join("=").trim().replace(/^"|"$/g, "").replace(/^'|'$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      });
  } catch (err) {
    // ignore if .env not found
  }
};

maybeLoadDotenv();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length) {
  console.error("Missing Firebase config values:", missing.join(", "));
  console.error("Ensure REACT_APP_* env vars are set or .env exists.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  {
    name: 'Cappuccino "Oryx" blouson',
    desc: "In cashmere, lambskin details",
    price: 6900000,
    material: "Cashmere",
    color: "Brown",
    size: "L",
    imagePath: "products/product1.jpeg",
  },
  {
    name: "Pale caramel classic shirt",
    desc: "In cotton",
    price: 1025000,
    material: "Cotton",
    color: "Beige",
    size: "M",
    imagePath: "products/product2.jpeg",
  },
  {
    name: 'Cappuccino "Leather stitching" zipped cardigan',
    desc: "In cashmere, lambskin, deerskin",
    price: 1980000,
    material: "Leather",
    color: "Black",
    size: "XL",
    imagePath: "products/product3.jpeg",
  },
  {
    name: "Wool navy coat",
    desc: "Elegant winter coat",
    price: 3200000,
    material: "Wool",
    color: "Navy",
    size: "L",
    imagePath: "products/product4.jpeg",
  },
  {
    name: "Classic white shirt",
    desc: "Slim fit in cotton",
    price: 890000,
    material: "Cotton",
    color: "White",
    size: "M",
    imagePath: "products/product1.jpeg",
  },
  {
    name: "Black lambskin jacket",
    desc: "Premium leather",
    price: 5500000,
    material: "Leather",
    color: "Black",
    size: "L",
    imagePath: "products/product2.jpeg",
  },
];

const run = async () => {
  console.log("Seeding products...");
  for (const item of products) {
    const docRef = await addDoc(collection(db, "products"), item);
    console.log(`- Added ${item.name} (id: ${docRef.id})`);
  }
  console.log("Done.");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
