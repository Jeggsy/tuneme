import React, { useState, useEffect } from "react";
import * as Pitchy from "pitchy";
import { noteFromPitch, centsOffFromPitch } from "./PitchUtils"; // Assuming you have a utility for this

const GuitarTuner = () => {
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [microphone, setMicrophone] = useState(null);
  const [detectedNote, setDetectedNote] = useState("");
  const [tuningError, setTuningError] = useState(0);

  useEffect(() => {
    // Create an AudioContext when the component mounts
    setAudioContext(new AudioContext());

    return () => {
      // Cleanup: stop the microphone stream and close the audio context
      if (microphone) {
        microphone.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const startListening = async () => {
    if (audioContext) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mic = audioContext.createMediaStreamSource(stream);
        setMicrophone(mic);
        setIsListening(true);

        // Start pitch detection
        detectPitch(mic);
      } catch (err) {
        console.error("Error accessing the microphone:", err);
      }
    }
  };

  const detectPitch = (mic) => {
    const analyzer = Pitchy.analyzer(mic, audioContext);
    const updatePitch = () => {
      const [pitch, clarity] = analyzer.findPitch();
      if (pitch && clarity > 0.9) {
        // Adjust clarity threshold as needed
        const note = noteFromPitch(pitch);
        const error = centsOffFromPitch(pitch, note);
        setDetectedNote(note);
        setTuningError(error);
      }

      if (isListening) {
        requestAnimationFrame(updatePitch);
      }
    };

    requestAnimationFrame(updatePitch);
  };

  const stopListening = () => {
    if (microphone) {
      microphone.mediaStream.getTracks().forEach((track) => track.stop());
      setIsListening(false);
    }
  };

  return (
    <div>
      <button onClick={startListening}>Start Tuning</button>
      <button onClick={stopListening}>Stop Tuning</button>
      {isListening && <p>Listening...</p>}
      {detectedNote && (
        <div>
          <p>Detected Note: {detectedNote}</p>
          <div style={{ width: "100%", backgroundColor: "#ddd" }}>
            <div
              style={{
                width: `${Math.min(100, Math.max(0, 100 + tuningError))}%`,
                backgroundColor: "green",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GuitarTuner;
