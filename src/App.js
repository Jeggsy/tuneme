import styled from "styled-components";
import Emitter from "./Components/Emitter";
import React, { useState, useRef, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import * as Tone from "tone";
import TuningDropdown from "./Components/TuningDropdown";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: black;
    
  }
`;

const standardTuning = ["E2", "A2", "D3", "G3", "B3", "E4"];
const dropDTuning = ["D2", "A2", "D3", "G3", "B3", "E4"];
const openGTuning = ["D2", "G2", "D3", "G3", "B3", "D4"];
const openDTuning = ["D2", "A2", "D3", "F#3", "A3", "D4"];
const halfStepDown = ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"];
const fullStepDown = ["D2", "G2", "C3", "F3", "A3", "D4"];
const dropCTuning = ["C2", "G2", "C3", "F3", "A3", "D4"];
const dropCSharpTuning = ["C#2", "G#2", "C#3", "F#3", "A#3", "D#4"];
const dropBTuning = ["B1", "F#2", "B2", "E3", "G#3", "C#4"];
const openETuning = ["E2", "B2", "E3", "G#3", "B3", "E4"];
const openCTuning = ["C2", "G2", "C3", "G3", "C4", "E4"];
const openATuning = ["E2", "A2", "E3", "A3", "C#4", "E4"];
const dadgadTuning = ["D2", "A2", "D3", "G3", "A3", "D4"];

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;

  background: url("pick.png") no-repeat center center;
  background-size: contain; // This ensures that the image fits within the div without stretching
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(black 18%, rgb(27, 28, 30) 70%);
`;

function App() {
  const [currentTuning, setCurrentTuning] = useState(standardTuning);
  const emitterRef = useRef();

  useEffect(() => {
    const initializeTone = async () => {
      await Tone.start();
      Tone.Destination.volume.value = -3;
    };

    initializeTone();
  }, []);

  const tunings = {
    standard: standardTuning,
    dropD: dropDTuning,
    openG: openGTuning,
    openD: openDTuning,
    halfStepDown: halfStepDown,
    fullStepDown: fullStepDown,
    dropC: dropCTuning,
    dropCs: dropCSharpTuning,
    dropB: dropBTuning,
    openE: openETuning,
    openC: openCTuning,
    openA: openATuning,
    dadgad: dadgadTuning,
  };

  // Function to change tuning (can be triggered by UI elements)
  const handleTuningChange = (tuningName) => {
    if (emitterRef.current) {
      emitterRef.current.stopPlaying();
    }
    setCurrentTuning(tunings[tuningName]);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo />
        <TuningDropdown onSelect={handleTuningChange} />
        <Emitter ref={emitterRef} tuning={currentTuning} />
      </Container>
    </>
  );
}

export default App;
