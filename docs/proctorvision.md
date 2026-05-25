# ProctorVision — AI-Powered Exam Integrity and Proctoring Platform

## Overview
ProctorVision is an automated, AI-driven exam proctoring platform that monitors
candidates in real time and flags integrity violations during online exams. It
is designed for institutions and exam administrators who need a scalable
alternative to human proctors without sacrificing detection accuracy.

## Tech Stack
- React for the candidate and proctor frontend
- FastAPI for asynchronous backend services
- Python computer vision stack: OpenCV, MediaPipe FaceMesh, YOLOv8
- WebSockets for real-time frame streaming and live updates
- Hugging Face Spaces for live deployment

## Architecture
The candidate's webcam streams frames over a WebSocket connection to a FastAPI
backend. The backend runs multiple computer vision models in parallel: MediaPipe
FaceMesh for 478 3D facial landmarks, YOLOv8 for object detection of phones and
unauthorized items, and OpenCV solvePnP for head pose estimation via Euler
angles. A scoring engine fuses these signals into a live integrity score from 0
to 100 and pushes evidence screenshots and risk updates to the proctor's
dashboard.

## How It Works
1. Candidate joins an exam session and grants webcam access.
2. The frontend opens a WebSocket connection to the FastAPI backend and streams
   frames continuously.
3. The backend runs MediaPipe FaceMesh to compute a gaze baseline offset
   threshold and detect when the candidate looks away from the screen.
4. YOLOv8 detects active cell phones or other unauthorized external assistance
   in the frame.
5. OpenCV solvePnP uses facial landmarks to estimate head pose as Euler angles,
   detecting head turns and downward looks.
6. Mouth Aspect Ratio greater than 0.4 is used as a speech verification signal
   to detect when the candidate may be speaking.
7. The system also detects browser tab switching events from the frontend.
8. Modular asynchronous message handlers in FastAPI compute a weighted live
   session integrity score on a 0 to 100 scale.
9. The proctor sees live risk updates and evidence screenshots of any
   violations as they happen.
10. At session end, the system programmatically generates a comprehensive PDF
    metrics report summarizing all violations, scores, and timestamps.

## Challenges and Solutions
- Latency on streaming frames: solved by using WebSockets instead of repeated
  HTTP calls and by running CV pipelines asynchronously in FastAPI.
- Combining noisy signals: built custom heuristics that fuse gaze offset, head
  pose, mouth aspect ratio, object detection, and tab-switch events into a
  single weighted integrity score rather than relying on any one signal.
- Reliable phone detection: tuned YOLOv8 inference and confidence thresholds so
  that handheld phones in low-light webcam frames are still flagged.
- Reproducible reports: implemented programmatic PDF generation so every
  session ends with a complete, sharable evidence trail.

## Outcomes
- Built a working end-to-end proctoring platform deployed live on Hugging Face
  Spaces at https://anirudhsaini-proctorvision.hf.space/
- Demonstrates real-time multi-model computer vision inference, async backend
  design, WebSocket streaming, and custom scoring algorithms.
- Strong portfolio signal for computer vision and applied ML roles.

## Links
- Live demo: https://anirudhsaini-proctorvision.hf.space/
