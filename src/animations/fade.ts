export const fadeKeyframes = (lineCount: number): string => {
  let css = "";

  for (let i = 0; i < lineCount; i++) {
    const delay = 0.2 + i * 0.35;
    css += `
      .fade-line-${i} {
        opacity: 0;
        animation: fadeLine 0.8s ease-in-out ${delay.toFixed(2)}s forwards;
      }`;
  }

  css += `
    @keyframes fadeLine {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }`;

  return css;
};
