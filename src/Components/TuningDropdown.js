import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  width: 100vw;

  margin-bottom: 10vh;
`;

const DropdownButton = styled.button`
  width: 100%;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  z-index: 1;
  text-align: center;
`;

const DropdownItem = styled.div`
  padding: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid transparent;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  margin-bottom: 4px; /* Add margin to separate the notes */
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const NoteBox = styled.div`
  background-color: #1a8188; /* Background color of the note box */
  color: white;
  padding: 4px 8px; /* Adjust the padding as needed */
  border-radius: 8px; /* Rounded corners */
  display: inline-block; /* Display notes inline */
  margin-right: 4px; /* Adjust the margin as needed to separate notes */
`;

const NoteBoxItem = styled.div`
  background-color: #333; /* Background color of the note box */
  margin: 0 0.5rem;
  color: white;
  padding: 4px 8px; /* Adjust the padding as needed */
  border-radius: 8px; /* Rounded corners */
  display: inline-block;
  margin-right: 4px; /* Adjust the margin as needed to separate notes */
`;

const tunings = {
  standard: ["E2", "A2", "D3", "G3", "B3", "E4"],
  dropD: ["D2", "A2", "D3", "G3", "B3", "E4"],
  openG: ["D2", "G2", "D3", "G3", "B3", "D4"],
  openD: ["D2", "A2", "D3", "F#3", "A3", "D4"],
  halfStepDown: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"],
  fullStepDown: ["D2", "G2", "C3", "F3", "A3", "D4"],
  dropC: ["C2", "G2", "C3", "F3", "A3", "D4"],
  dropCs: ["C#2", "G#2", "C#3", "F#3", "A#3", "D#4"],
  dropB: ["B1", "F#2", "B2", "E3", "G#3", "C#4"],
  openE: ["E2", "B2", "E3", "G#3", " B3", " E4"],
  openC: ["C2", "G2", "C3", "G3", "C4", "E4"],
  openA: ["E2", "A2", "E3", "A3", "C#4", " E4"],
  dadgad: ["D2", "A2", "D3", "G3", "A3", "D4"],
};

const displayTunings = {
  standard: "Standard",
  dropD: "Drop D",
  dropCs: "Drop C#",
  openG: "Open G",
  openD: "Open D",
  halfStepDown: "Half Step Down",
  fullStepDown: "Full Step Down",
  dropC: "Drop C",
  dropCSharp: "Drop C#",
  dropB: "Drop B",
  openE: "Open E",
  openC: "Open C",
  openA: "Open A",
  dadgad: "DADGAD",
};

function TuningDropdown({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTuning, setSelectedTuning] = useState("standard");

  const handleSelect = (tuning) => {
    setSelectedTuning(tuning);
    onSelect(tuning);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {`${
          displayTunings[selectedTuning].charAt(0).toUpperCase() +
          displayTunings[selectedTuning].slice(1)
        } Tuning`}
        <br></br>
        <div>
          {tunings[selectedTuning].map((note) => (
            <NoteBox key={note}>{note}</NoteBox>
          ))}
        </div>
      </DropdownButton>
      {isOpen && (
        <DropdownContent>
          {Object.keys(tunings).map((tuning) => (
            <DropdownItem key={tuning} onClick={() => handleSelect(tuning)}>
              {`${
                displayTunings[tuning].charAt(0).toUpperCase() +
                displayTunings[tuning].slice(1)
              } Tuning`}

              <div>
                {tunings[tuning].map((note) => (
                  <NoteBoxItem key={note}>{note}</NoteBoxItem>
                ))}
              </div>
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
}

export default TuningDropdown;
