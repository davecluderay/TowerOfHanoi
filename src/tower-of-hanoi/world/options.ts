const colors = {
  redSalsa: 0xf03a47,
  blueCrayola: 0x3772ff,
  brightYellowCrayola: 0xf6aa1c,
  phlox: 0xc04cfd,
  mediumSpringGreen: 0x71f79f,
  sunray: 0xedae49,
  fluorescentBlue: 0x26f0f1,
  apricot: 0xffc6ac,
  cyberYellow: 0xffd400,
  greenRYB: 0x6ab547,
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
