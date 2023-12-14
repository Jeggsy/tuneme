export const noteFromPitch = (frequency) => {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  const noteIndex = Math.round(noteNum) + 69;
  const note = noteIndex % 12;
  const octave = Math.floor(noteIndex / 12) - 1;
  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  return noteNames[note] + octave;
};

// Utility to calculate deviation in cents
export const centsOffFromPitch = (frequency, note) => {
  // ... implementation to calculate cents off ...
  // This will depend on how you map the frequency to a note and octave
};
