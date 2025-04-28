import express from "express";
import multer from "multer";
import { exec, spawn } from "child_process";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, "uploads/") });

let currentTranscriptPath = ""; // Store the latest transcription path

app.post("/api/upload", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const videoPath = req.file.path;
  const audioPath = `${videoPath}.mp3`;

  try {
    // Step 1: Extract audio
    await execPromise(`ffmpeg -i "${videoPath}" -q:a 0 -map a "${audioPath}"`);

    // Step 2: Start whisper
    const transcriptName = path.basename(audioPath) + ".txt";
    currentTranscriptPath = path.join(__dirname, "transcripts", transcriptName);

    const whisperProcess = spawn("python", ["transcribe.py", audioPath], {
      cwd: path.join(__dirname),
    });

    whisperProcess.stdout.on("data", (data) => {
      console.log(`Whisper stdout: ${data}`);
    });

    whisperProcess.stderr.on("data", (data) => {
      console.error(`Whisper stderr: ${data}`);
    });

    whisperProcess.on("close", (code) => {
      console.log(`Whisper process exited with code ${code}`);
    });

    res.json({ success: true });
  } catch (error) {
    console.error("🔥 Backend Processing Error:", error);
    res.status(500).json({ error: "Error processing video/audio." });
  }
});

// 📢 New API to fetch the "live" transcript
app.get("/api/stream", async (req, res) => {
  if (!currentTranscriptPath) {
    return res.json({ text: "", isDone: false });
  }
  try {
    const text = await fs.readFile(currentTranscriptPath, "utf8");
    const donePath = currentTranscriptPath.replace(".mp3.txt", ".done");
    let isDone = false;
    try {
      await fs.access(donePath);
      isDone = true;
    } catch {
      isDone = false;
    }
    res.json({ text, isDone });
  } catch (err) {
    res.json({ text: "", isDone: false });
  }
});

function execPromise(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(stderr);
      else resolve(stdout);
    });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
