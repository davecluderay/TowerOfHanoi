const colors = {
  darkBlue: 0x0863b5,
  yellow: 0xfec600,
  orange: 0xf39100,
  red: 0xc6002b,
  purple: 0x954a97,
  lightBlue: 0x009ee3,
  green: 0x13a538,
  pink: 0xf53794,
};

export const numberOfDiscs = 7;
export const baseBevelSize = 0.1;
export const baseColor = 0x818aa3;
export const baseSpacing = 0.5;
export const baseThickness = 0.75;
export const discBevelSize = 0.1;
export const discRadiusDelta = 0.25;
export const discThickness = 0.5;
export const moveAnimationDurationMs = 600;
export const poleBevelSize = 0.125;
export const poleRadius = 0.5;
export const showStats = false;
export const smallestDiscRadius = 1.25;
export const largestDiscRadius = smallestDiscRadius + (numberOfDiscs - 1) * discRadiusDelta;

const availableColors = Object.values(colors);

export const discColors: number[] = [];
for (let i = 0; i < numberOfDiscs; i++) {
  discColors.push(availableColors[i % availableColors.length]);
}

export const baseHeight = (numberOfDiscs + 1) * discThickness;
export const baseRadius = largestDiscRadius + discRadiusDelta;
export const baseXPositions = [0, baseRadius * 2 + baseSpacing, (baseRadius * 2 + baseSpacing) * 2];
