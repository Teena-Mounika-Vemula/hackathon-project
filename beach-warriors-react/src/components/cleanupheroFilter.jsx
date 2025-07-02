// src/components/CleanupHeroFilter.jsx
import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';

const CleanupHeroFilter = ({ selectedFilter }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      startDetection();
    };

    loadModels();
  }, []);

  const startDetection = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectSingleFace(videoRef.current.video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (detections) {
          const { x, y, width, height } = detections.detection.box;
          const img = new Image();
          img.src = '/cape.png'; // Replace with your own asset
          img.onload = () => {
            context.drawImage(img, x - 20, y - 80, width + 40, height + 100);
          };
        }
      }
    }, 200);
  };

  return (
    <div className="relative w-full aspect-video">
      <Webcam ref={videoRef} width="100%" height="100%" className="rounded-lg" />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="absolute top-0 left-0 z-10"
      />
    </div>
  );
};

export default CleanupHeroFilter;
