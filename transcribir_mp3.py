import os
import av
import numpy as np
import faster_whisper.transcribe as fw_transcribe
from faster_whisper import WhisperModel

def decode_audio_compat(input_file, sampling_rate=16000):
    with av.open(input_file) as container:
        stream = container.streams.audio[0]
        frames = [frame.to_ndarray() for frame in container.decode(stream)]
    audio = np.concatenate(frames, axis=1).mean(axis=0).astype(np.float32)
    if stream.rate != sampling_rate:
        import scipy.signal
        audio = scipy.signal.resample_poly(audio, sampling_rate, stream.rate).astype(np.float32)
    return audio

fw_transcribe.decode_audio = decode_audio_compat
root = r"C:\Users\arsag\Downloads"
outdir = r"guiones"
files = [
    "Persuación parte 1 Generated Audio October 24, 2026 - 4_01AM.wav",
    "Persuación parte 2 Generated Audio October 24, 2026 - 3_58AM.wav",
]
model = WhisperModel("tiny", device="cpu", compute_type="int8")

def ts(seconds):
    ms = int(round(seconds * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

for name in files:
    wav = os.path.join(root, name)
    stem = os.path.splitext(name)[0]
    mp3 = os.path.join(outdir, stem + ".mp3")
    srt = os.path.join(outdir, stem + ".srt")
    with av.open(wav) as src, av.open(mp3, "w", format="mp3") as dst:
        stream = dst.add_stream("libmp3lame", rate=44100); stream.layout = "mono"
        resampler = av.audio.resampler.AudioResampler(format="fltp", layout="mono", rate=44100)
        for frame in src.decode(audio=0):
            converted = resampler.resample(frame)
            if not isinstance(converted, list): converted = [converted]
            for out_frame in converted:
                for packet in stream.encode(out_frame): dst.mux(packet)
        for packet in stream.encode(): dst.mux(packet)
    segments, info = model.transcribe(mp3, language="es", vad_filter=True, beam_size=5)
    with open(srt, "w", encoding="utf-8-sig") as f:
        for i, seg in enumerate(segments, 1):
            text = seg.text.strip()
            if text: f.write(f"{i}\n{ts(seg.start)} --> {ts(seg.end)}\n{text}\n\n")
    print(srt)
