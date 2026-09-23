import { useEffect, useRef, useState } from "react";
import { FiX, FiCamera } from "react-icons/fi";

export default function TryOnModal({ glassesImage, fallbackImage, productName, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const glassesImgRef = useRef(null);
  const faceapiRef = useRef(null);

  const [status, setStatus] = useState("loading-models");
  const [faceFound, setFaceFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const img = new Image();
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = () => {
          if (fallbackImage && img.src !== fallbackImage) {
            img.onload = resolve;
            img.onerror = resolve;
            img.src = fallbackImage;
          } else {
            resolve();
          }
        };
        img.src = glassesImage;
      });
      glassesImgRef.current = img;

      let faceapi;
      try {
        faceapi = await import("face-api.js");
      } catch (err) {
        console.error("face-api.js is not installed. Run: npm install face-api.js", err);
        if (!cancelled) setStatus("no-models");
        return;
      }
      faceapiRef.current = faceapi;

      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        ]);
      } catch (err) {
        console.error("Failed to load face-api.js models from /models:", err);
        if (!cancelled) setStatus("no-models");
        return;
      }

      if (cancelled) return;
      setStatus("requesting-camera");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or unavailable:", err);
        if (!cancelled) setStatus("camera-denied");
        return;
      }
    };

    init();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };

  }, [glassesImage]);

  const handleVideoPlaying = () => {
    setStatus("tracking");
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const faceapi = faceapiRef.current;
    if (!video || !canvas || !faceapi) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 });

    const tick = async () => {
      if (!videoRef.current) return;
      const result = await faceapi
        .detectSingleFace(video, options)
        .withFaceLandmarks();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (result) {
        setFaceFound(true);
        const leftEye = result.landmarks.getLeftEye();
        const rightEye = result.landmarks.getRightEye();
        const leftCenter = averagePoint(leftEye);
        const rightCenter = averagePoint(rightEye);

        const midX = (leftCenter.x + rightCenter.x) / 2;
        const midY = (leftCenter.y + rightCenter.y) / 2;
        const eyeDist = Math.hypot(rightCenter.x - leftCenter.x, rightCenter.y - leftCenter.y);
        const angle = Math.atan2(rightCenter.y - leftCenter.y, rightCenter.x - leftCenter.x);

        const glassesImg = glassesImgRef.current;
        if (glassesImg?.complete && glassesImg.naturalWidth > 0) {
          const glassesWidth = eyeDist * 2.2;
          const glassesHeight = glassesWidth * (glassesImg.height / glassesImg.width);

          ctx.save();
          ctx.translate(midX, midY);
          ctx.rotate(angle);
          ctx.drawImage(glassesImg, -glassesWidth / 2, -glassesHeight / 2, glassesWidth, glassesHeight);
          ctx.restore();
        }
      } else {
        setFaceFound(false);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg overflow-hidden max-w-lg w-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <p className="font-semibold text-gray-900">Try on: {productName}</p>
          <button onClick={onClose} aria-label="Close">
            <FiX className="text-xl text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        <div className="relative bg-black aspect-[4/3]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onPlaying={handleVideoPlaying}
            className="absolute inset-0 w-full h-full object-cover [transform:scaleX(-1)]"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full [transform:scaleX(-1)]"
          />

          {status !== "tracking" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white text-sm text-center px-6 bg-black/60">
              <FiCamera className="text-3xl" />
              {status === "loading-models" && <p>Loading face-tracking model...</p>}
              {status === "requesting-camera" && <p>Requesting camera access...</p>}
              {status === "camera-denied" && (
                <p>
                  Camera access was denied or unavailable. Please allow camera permissions and try
                  again.
                </p>
              )}
              {status === "no-models" && (
                <p>
                  Face-tracking model files aren't installed in this build. Run{" "}
                  <code className="bg-white/20 px-1 rounded">npm install face-api.js</code> and add the
                  model weight files to <code className="bg-white/20 px-1 rounded">client/public/models/</code>.
                </p>
              )}
            </div>
          )}

          {status === "tracking" && !faceFound && (
            <div className="absolute bottom-3 inset-x-0 text-center">
              <span className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
                No face detected — center your face in the frame
              </span>
            </div>
          )}
        </div>

        <div className="px-4 py-3 text-xs text-gray-500">
          This uses your device's camera locally — nothing is uploaded or recorded.
        </div>
      </div>
    </div>
  );
}

function averagePoint(points) {
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
}
