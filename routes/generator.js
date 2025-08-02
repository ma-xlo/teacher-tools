import express from "express";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import genFile from "../scripts/calendarGenerator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Set",
  "Oct",
  "Nov",
  "Dec",
];
let name, date, frequency, fileName;

router.post("/generate", (req, res) => {
  ({ name, date, frequency } = req.body);
  let month = parseInt(date.slice(5, 7), 10);
  let year = parseInt(date.slice(0, 4), 10);

  fileName = `${name} calendar ${months[month - 1]} ${year} - ${
    months[month - 1]
  } ${year + 1}.docx`;

  genFile(name, date, frequency, fileName);
  res.redirect("/download");
});

router.get("/calendar-generator", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "html", "calendar-generator.html")
  );
});

router.get("/download", async (req, res) => {
  const filePath = path.join("/tmp", fileName);

  try {
    // Example: generateDocx returns a promise that resolves when the file is created
    await generateDocx(fileName); // make sure this finishes before continuing

    res.download(filePath, (error) => {
      if (error) {
        console.log("Download error:", error);
        return res.status(500).send("Download failed.");
      }

      setTimeout(() => {
        fs.unlink(filePath, (err) => {
          if (err) console.error("File deletion error:", err);
        });
      }, 1000);
    });
  } catch (err) {
    console.error("Error creating file:", err);
    res.status(500).send("Failed to generate file.");
  }
});

export default router;
