
# 🎬 Video-to-Text Live Transcription App

Upload videos and get **real-time AI transcription** with timestamps!  
Built with **Next.js**, **Node.js**, and **OpenAI Whisper** — fully **local processing** for privacy and performance.

## 🛠 Tech Stack

- **Frontend:** Next.js 14, React
- **Backend:** Node.js, Express
- **AI Model:** OpenAI Whisper (local Python processing)
- **Audio Processing:** FFmpeg
- **Real-Time:** Live polling + Auto-Scroll
- **Deployment:** GitHub, (Vercel for frontend, VPS or Local for backend)

---

## ✨ Features

- Upload video files (any format: `.mp4`, `.mov`, `.avi`, etc.)
- Real-time audio extraction and transcription
- Timestamped text (`[HH:MM:SS --> HH:MM:SS]`)
- Auto-scrolling live transcription view
- Highlight the current active line
- "✅ Transcription Completed!" banner at the end
- Download full transcription as `.txt` file
- Fully local backend (no API usage or external servers)

---

## 📦 Project Structure

/video-to-text-next/ ├── backend/ # Node.js server + Python Whisper scripts ├── frontend/ # Next.js 14 frontend application ├── README.md # Project documentation ├── .gitignore # Git ignore settings └── package.json # Project metadata

---

## ⚙️ Local Installation Guide

### 1. Clone the Repository


git clone https://github.com/your-username/video-to-text-next.git
cd video-to-text-next
2. Backend Setup
Go to the backend folder:

cd backend
npm install
✅ Install Python requirements:

pip install openai-whisper
pip install torch
✅ Install FFmpeg (required for audio extraction):

Download FFmpeg

Add ffmpeg to your system PATH

Make sure you can run:

ffmpeg -version
✅ Run the backend server:

npm run dev
It runs on:
arduino

http://localhost:5000
3. Frontend Setup
In another terminal:


cd frontend
npm install
npm run dev
Frontend will run on:


http://localhost:3000
✅ Open it in your browser.

📋 Usage Instructions
Open the app at localhost:3000

Upload a video file

Watch the transcription appear LIVE, timestamped

See the "✅ Transcription Completed!" banner automatically

Download the full .txt file easily

🔥 Special Features
Real-Time Updates: New lines show up every 0.5 seconds

Auto-Scroll: The transcript scrolls automatically to the newest line

Highlight: Last spoken line is visually highlighted

Fully Local: Everything processed on your machine (no external API costs)

Timestamped Output: Great for subtitles (future .srt support possible)

🧠 Notes
CPU Warning: If you see FP16 is not supported on CPU, it's normal. Whisper will use FP32 precision automatically.

GPU: For faster transcription, run it on a machine with a supported NVIDIA GPU (optional).

Privacy: All video and audio processing happens locally. No data leaves your computer.

🛡 License
This project is licensed under the MIT License.
Feel free to use it for personal, academic, or commercial purposes.

🙌 Acknowledgments
OpenAI Whisper

FFmpeg

Next.js

Node.js

👨‍💻 Author
Built with passion by Garen Ghazarian 🚀
