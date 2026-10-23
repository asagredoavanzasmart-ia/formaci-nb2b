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

audio = r"C:\Users\arsag\Downloads\Pensar rápido pensar despacio.mp3"
salida = r"guiones\pensar_rapido_pensar_despacio.srt"
model = WhisperModel("small", device="cpu", compute_type="int8")
segments, info = model.transcribe(audio, language="es", vad_filter=True, beam_size=5)

def ts(seconds):
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

with open(salida, "w", encoding="utf-8-sig") as f:
    for i, seg in enumerate(segments, 1):
        text = seg.text.strip()
        if text:
            f.write(f"{i}\n{ts(seg.start)} --> {ts(seg.end)}\n{text}\n\n")
print(salida)
