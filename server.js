import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;
const DATA_DIR = path.join(__dirname, "data");

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Get data for a key
app.get("/api/storage/:key", (req, res) => {
  const key = req.params.key;
  const filePath = path.join(DATA_DIR, `${key}.json`);

  if (!fs.existsSync(filePath)) {
    return res.json({ value: null });
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return res.json({ value: JSON.parse(content) });
  } catch (e) {
    return res.status(500).json({ error: "Failed to read file" });
  }
});

// Save data for a key
app.post("/api/storage/:key", (req, res) => {
  const key = req.params.key;
  const filePath = path.join(DATA_DIR, `${key}.json`);
  const { data } = req.body;

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Failed to write file" });
  }
});

app.listen(PORT, () => {
  console.log(`Khata Local Storage Server running at http://localhost:${PORT}`);
});
