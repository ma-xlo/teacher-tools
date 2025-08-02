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
  const file = path.join("/tmp", fileName);

  setTimeout(() => {
    res.download(file, (error) => {
      if (error) console.log("Error: ", error);
      setTimeout(() => {
        fs.unlink(path.join(__dirname, "..", "temp", fileName));
      }, 1000);
    });
  }, 2000);
});

export default router;
