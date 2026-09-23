const palette = ["#0F1B2B", "#B8912F", "#33506B", "#1F5D4B", "#5A3E24", "#3E3E3E"];

const pickColor = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % palette.length;
  return palette[Math.abs(hash) % palette.length];
};

/**
 * Returns a data: URI SVG of a simple glasses glyph over a soft cream
 * background, with the given label printed underneath. Used as a stand-in
 * product/category photo everywhere in the UI so nothing depends on an
 * external image host being reachable.
 */
export function placeholderImage(label, { color, width = 480, height = 360, bg = "#F5F0E6" } = {}) {
  const stroke = color || pickColor(label);
  const cx1 = width * 0.32;
  const cx2 = width * 0.62;
  const cy = height * 0.48;
  const r = Math.min(width, height) * 0.14;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="${bg}"/>
      <circle cx="${cx1}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="7"/>
      <circle cx="${cx2}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="7"/>
      <line x1="${cx1 + r}" y1="${cy}" x2="${cx2 - r}" y2="${cy}" stroke="${stroke}" stroke-width="7"/>
      <line x1="${cx1 - r}" y1="${cy - r * 0.3}" x2="${cx1 - r - 26}" y2="${cy - r * 0.9}" stroke="${stroke}" stroke-width="7" stroke-linecap="round"/>
      <line x1="${cx2 + r}" y1="${cy - r * 0.3}" x2="${cx2 + r + 26}" y2="${cy - r * 0.9}" stroke="${stroke}" stroke-width="7" stroke-linecap="round"/>
      <text x="${width / 2}" y="${height - 24}" font-family="Arial, sans-serif" font-size="${Math.max(12, width / 26)}" fill="#3a3a3a" text-anchor="middle">${label}</text>
    </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Same glasses glyph as placeholderImage, but with NO background fill —
 * meant to be composited on top of a webcam feed for the Try On feature.
 * Swap this out for a real transparent PNG cutout of each frame for a
 * production-quality look; this keeps the feature functional without one.
 */
export function glassesOverlayImage(label, { color, width = 600, height = 240 } = {}) {
  const stroke = color || pickColor(label);
  const cx1 = width * 0.32;
  const cx2 = width * 0.68;
  const cy = height * 0.5;
  const r = Math.min(width, height) * 0.32;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <circle cx="${cx1}" cy="${cy}" r="${r}" fill="rgba(20,20,20,0.15)" stroke="${stroke}" stroke-width="10"/>
      <circle cx="${cx2}" cy="${cy}" r="${r}" fill="rgba(20,20,20,0.15)" stroke="${stroke}" stroke-width="10"/>
      <line x1="${cx1 + r}" y1="${cy}" x2="${cx2 - r}" y2="${cy}" stroke="${stroke}" stroke-width="10"/>
      <line x1="${cx1 - r}" y1="${cy - r * 0.2}" x2="${cx1 - r - 30}" y2="${cy - r * 0.6}" stroke="${stroke}" stroke-width="10" stroke-linecap="round"/>
      <line x1="${cx2 + r}" y1="${cy - r * 0.2}" x2="${cx2 + r + 30}" y2="${cy - r * 0.6}" stroke="${stroke}" stroke-width="10" stroke-linecap="round"/>
    </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
