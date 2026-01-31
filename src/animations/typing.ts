export const typingKeyframes = (lineCount: number): string => {
  let css = "";

  for (let i = 0; i < lineCount; i++) {
    const baseDelay = 0.3 + i * 0.6 + Math.random() * 0.15;
    css += `
      .line-${i} {
        opacity: 0;
        animation: typeLine 0.4s ease-out ${baseDelay.toFixed(2)}s forwards;
      }`;
  }

  css += `
    @keyframes typeLine {
      0% { opacity: 0; transform: translateX(-4px); }
      100% { opacity: 1; transform: translateX(0); }
    }`;

  return css;
};
