import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import styled, { css } from "styled-components";
import * as Tone from "tone";

// Adjust the master volume to prevent clipping

const TuningButton = styled.button`
  color: white;
  background: #3b3a43;
  font-size: 1.5rem;
  border-radius: 50%;
  border: none;
  width: 80px;
  height: 80px;

  align-items: center;
  justify-content: center;
  text-align: center;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    color: #3b3a43;
    background: white;
    transform: scale(1.1);
  }

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 0 0 10px 5px #40f5ff; // Glowing effect for active button
      background: white;
      color: #3b3a43;
    `}

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1rem;

    &:hover {
      background: white;
      color: #3b3a43;
    }
  }
`;

const HeadstockContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 0.5fr); // 2 columns
  grid-template-rows: repeat(3, 0.2fr); // 3 rows
  justify-items: center;
  align-items: center;

  width: 100vw; // Adjust as per your headstock image size
  height: 1000px; // Adjust as per your headstock image size
  background: url("Guitar.png") no-repeat center center;
  background-size: contain;

  @media (max-width: 768px) {
    width: 100vw;
    height: 500px;
    background-size: contain;

    grid-template-columns: repeat(4, 0.5fr);
  }
`;

// Positioning for Button 1 (bottom left)
const TuningButton1 = styled(TuningButton)`
  grid-column: 3;
  grid-row: 3;

  @media (min-width: 768px) and (max-width: 1000px) {
    grid-column: 2;
  }

  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

// Positioning for Button 2 (middle left)
const TuningButton2 = styled(TuningButton)`
  grid-column: 3;
  grid-row: 2;

  @media (min-width: 768px) and (max-width: 1000px) {
    grid-column: 2;
  }

  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

// Positioning for Button 3 (top left)
const TuningButton3 = styled(TuningButton)`
  grid-column: 3;
  grid-row: 1;

  @media (min-width: 768px) and (max-width: 1000px) {
    grid-column: 2;
  }

  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

// Positioning for Button 4 (top right)
const TuningButton4 = styled(TuningButton)`
  grid-column: 6;
  grid-row: 1;

  @media (min-width: 768px) and (max-width: 1000px) {
    grid-column: 7;
  }

  @media (max-width: 768px) {
    grid-column: 4;
  }
`;

// Positioning for Button 5 (middle right)
const TuningButton5 = styled(TuningButton)`
  grid-column: 6;
  grid-row: 2;

  @media (min-width: 768px) and (max-width: 1000px) {
    grid-column: 7;
  }

  @media (max-width: 768px) {
    grid-column: 4;
  }
`;

// Positioning for Button 6 (bottom right)
const TuningButton6 = styled(TuningButton)`
  grid-column: 6;
  grid-row: 3;

  @media (min-width: 768px) and (max-width: 1000px) {
    grid-column: 7;
  }

  @media (max-width: 768px) {
    grid-column: 4;
  }
`;

const Emitter = forwardRef(({ tuning }, ref) => {
  const [activeNote, setActiveNote] = useState(null);

  const samplerRef = useRef(null);
  const loopRef = useRef(null);

  useEffect(() => {
    const samples = {
      A2: "A2.mp3",
      "A#2": "As2.mp3",
      B2: "B2.mp3",
      C3: "C3.mp3",
      "C#3": "Cs3.mp3",
      D3: "D3.mp3",
      "D#3": "Ds3.mp3",
      E3: "E3.mp3",
      F3: "F3.mp3",
      "F#3": "Fs3.mp3",
      G3: "G3.mp3",
      "G#3": "Gs3.mp3",
      A3: "A3.mp3",
      "A#3": "As3.mp3",
      B3: "B3.mp3",
      C4: "C4.mp3",
      "C#4": "Cs4.mp3",
      D4: "D4.mp3",
      "D#4": "Ds4.mp3",
      E4: "E4.mp3",
      F4: "F4.mp3",
      "F#4": "Fs4.mp3",
      G4: "G4.mp3",
      "G#4": "Gs4.mp3",
      A4: "A4.mp3",
      "A#4": "As4.mp3",
      B4: "B4.mp3",
    };

    const compressor = new Tone.Compressor({
      threshold: -20, // in decibels
      ratio: 4, // input/output ratio
      attack: 0.003, // in seconds
      release: 0.25, // in seconds
    }).toDestination();

    // Create the sampler and connect it to the compressor
    samplerRef.current = new Tone.Sampler({
      urls: samples,
      baseUrl: process.env.PUBLIC_URL + "/guitar-acoustic/",
      release: 1,
    }).connect(compressor);

    return () => {
      // Dispose of the sampler when the component unmounts
      if (samplerRef.current) {
        samplerRef.current.dispose();
      }
    };
  }, []);

  const playGuitarTone = async (note) => {
    await Tone.start();

    if (activeNote === note) {
      // If the same note is already playing, stop it
      loopRef.current.stop();
      loopRef.current.dispose();
      setActiveNote(null);
    } else {
      // Stop any currently playing notes
      if (activeNote) {
        loopRef.current.stop();
        loopRef.current.dispose();
      }

      // Play the new note in a loop
      setActiveNote(note);
      loopRef.current = new Tone.Loop((time) => {
        samplerRef.current.triggerAttackRelease(note, "1n", time);
      }, "1n").start(0);

      Tone.Transport.start();
    }
  };

  const stopPlaying = () => {
    if (activeNote) {
      loopRef.current.stop();
      loopRef.current.dispose();
      setActiveNote(null);
    }
  };

  useImperativeHandle(ref, () => ({
    stopPlaying,
  }));

  return (
    <HeadstockContainer>
      {tuning.map((note, index) => {
        let ButtonComponent;
        switch (index) {
          case 0:
            ButtonComponent = TuningButton1;
            break;
          case 1:
            ButtonComponent = TuningButton2;
            break;
          case 2:
            ButtonComponent = TuningButton3;
            break;
          case 3:
            ButtonComponent = TuningButton4;
            break;
          case 4:
            ButtonComponent = TuningButton5;
            break;
          case 5:
            ButtonComponent = TuningButton6;
            break;
          default:
            ButtonComponent = TuningButton; // Default case if there are more than 6 buttons
        }

        return (
          <ButtonComponent
            key={note}
            onClick={() => playGuitarTone(note)}
            isActive={activeNote === note}
          >
            {note}
          </ButtonComponent>
        );
      })}
    </HeadstockContainer>
  );
});

export default Emitter;
