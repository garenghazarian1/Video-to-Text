import sys
import whisper
import os
import time

def format_timestamp(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    seconds = seconds % 60
    return f"{hours:02}:{minutes:02}:{seconds:06.3f}".replace('.', ':')

if len(sys.argv) < 2:
    print("Please provide an audio file path.")
    sys.exit(1)

audio_path = sys.argv[1]

model = whisper.load_model("small")
result = model.transcribe(audio_path, word_timestamps=False)

# Create transcripts folder if it doesn't exist
os.makedirs('transcripts', exist_ok=True)

transcript_path = f"transcripts/{os.path.basename(audio_path)}.txt"
done_path = transcript_path.replace('.mp3.txt', '.done')

with open(transcript_path, 'w', encoding='utf-8') as f:
    for segment in result["segments"]:
        start = format_timestamp(segment['start'])
        end = format_timestamp(segment['end'])
        text = segment['text'].strip()
        line = f"[{start} --> {end}] {text}\n"
        f.write(line)
        f.flush()
        time.sleep(0.5)  # simulate slower transcription

# 🛑 After everything, create a .done file
with open(done_path, 'w') as done_file:
    done_file.write("Transcription complete")

print("Transcription completed and .done file created!")
