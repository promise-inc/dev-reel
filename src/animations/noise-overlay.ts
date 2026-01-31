export const noiseOverlayAnimation = (width: number, height: number): string => {
  return `
    <defs>
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="1" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" filter="url(#noise-filter)" opacity="0.015">
      <animate attributeName="opacity" values="0.015;0.025;0.015" dur="0.3s" repeatCount="indefinite"/>
    </rect>`;
};
