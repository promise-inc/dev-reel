export const waveKeyframes = (lineCount: number): string => {
  let css = "";

  for (let i = 0; i < lineCount; i++) {
    const delay = i * 0.12;
    css += `
      .wave-line-${i} {
        animation: waveBob 3s ease-in-out ${delay.toFixed(2)}s infinite;
      }`;
  }

  css += `
    @keyframes waveBob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-1.5px); }
    }`;

  return css;
};
