# Work Brain Intake

This folder supports the daily voice memo automation.

- `raw-voice-memos/` holds untouched audio files or audio metadata.
- `to-digest/` holds readable transcript/source markdown waiting for Work Brain ingest.
- `processed/` holds source files after a successful ingest.
- `needs-transcript/` holds notes for audio files that arrived without readable text.

The automation should only digest readable transcript text. Raw audio is saved here, but not interpreted without transcription.

