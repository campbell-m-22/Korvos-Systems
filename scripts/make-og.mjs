// Generates public/og.png (1200x630) for social link previews.
// Run with: npm i -D sharp && node scripts/make-og.mjs && npm remove sharp
// The PNG is committed, so sharp is only needed when regenerating the image.
import sharp from "sharp";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="82%" cy="14%" r="55%">
      <stop offset="0%" stop-color="#ff5a1f" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#ff5a1f" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#f6f2ea" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <text x="96" y="300" font-family="'Plus Jakarta Sans', Arial, sans-serif"
        font-size="96" font-weight="800" letter-spacing="-2" fill="#0f1e33">Korvos Systems<tspan fill="#ff5a1f">.</tspan></text>

  <text x="98" y="372" font-family="'Plus Jakarta Sans', Arial, sans-serif"
        font-size="40" font-weight="600" fill="#33465f">You&#8217;ve got a problem. We&#8217;ll build the answer.</text>

  <text x="98" y="470" font-family="'Inter', Arial, sans-serif"
        font-size="26" font-weight="500" fill="#556377">Every build quoted up front. You own the code. No lock-in.</text>

  <rect x="98" y="512" width="64" height="5" rx="2.5" fill="#ff5a1f" />
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("Wrote public/og.png");
