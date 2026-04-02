const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

function createSVG(size) {
    const pad = Math.round(size * 0.08);
    const r = Math.round(size * 0.12);
    const w = size - pad * 2;
    const h = size - pad * 2;
    const headerH = Math.round(h * 0.2);

    // Lines on the notepad
    let lines = '';
    const lineStart = pad + headerH + Math.round(h * 0.12);
    const lineEnd = size - pad - Math.round(h * 0.08);
    const lineSpacing = Math.round(h * 0.11);
    const lx1 = pad + Math.round(w * 0.12);
    const lx2 = size - pad - Math.round(w * 0.12);
    for (let ly = lineStart; ly < lineEnd; ly += lineSpacing) {
        lines += `<line x1="${lx1}" y1="${ly}" x2="${lx2}" y2="${ly}" stroke="#D4C88A" stroke-width="${Math.max(1, Math.round(size * 0.012))}"/>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="#F0F0F0" rx="${r}"/>
  <!-- Notepad body -->
  <rect x="${pad}" y="${pad}" width="${w}" height="${h}" rx="${r}" fill="#FFE066"/>
  <!-- Shadow -->
  <rect x="${pad}" y="${size - pad - Math.round(h * 0.04)}" width="${w}" height="${Math.round(h * 0.04)}" rx="${Math.round(r * 0.5)}" fill="#E6C84D" opacity="0.5"/>
  <!-- Header bar -->
  <rect x="${pad}" y="${pad}" width="${w}" height="${headerH}" rx="${r}" fill="#4285F4"/>
  <rect x="${pad}" y="${pad + headerH - r}" width="${w}" height="${r}" fill="#4285F4"/>
  <!-- Header dot -->
  <circle cx="${pad + Math.round(w * 0.12)}" cy="${pad + Math.round(headerH * 0.5)}" r="${Math.round(size * 0.03)}" fill="white"/>
  <!-- Lines -->
  ${lines}
  <!-- Pencil -->
  <g transform="translate(${size - pad - Math.round(w * 0.22)}, ${size - pad - Math.round(h * 0.22)}) rotate(-45)">
    <rect x="-${Math.round(size * 0.025)}" y="-${Math.round(size * 0.15)}" width="${Math.round(size * 0.05)}" height="${Math.round(size * 0.12)}" fill="#FF8C00" rx="${Math.round(size * 0.008)}"/>
    <polygon points="-${Math.round(size * 0.025)},-${Math.round(size * 0.15)} ${Math.round(size * 0.025)},-${Math.round(size * 0.15)} 0,-${Math.round(size * 0.19)}" fill="#333"/>
    <rect x="-${Math.round(size * 0.025)}" y="-${Math.round(size * 0.035)}" width="${Math.round(size * 0.05)}" height="${Math.round(size * 0.035)}" fill="#FFB0B0" rx="${Math.round(size * 0.005)}"/>
  </g>
</svg>`;
}

async function generate() {
    const sizes = [16, 32, 48, 64, 128, 256, 512];
    for (const size of sizes) {
        const svg = createSVG(size);
        await sharp(Buffer.from(svg))
            .png()
            .toFile(path.join(iconsDir, `favicon-${size}x${size}.png`));
        console.log(`Created favicon-${size}x${size}.png`);
    }

    // Create .ico from 32x32
    fs.copyFileSync(
        path.join(iconsDir, 'favicon-32x32.png'),
        path.join(iconsDir, 'favicon.ico')
    );
    console.log('Created favicon.ico');
}

generate().catch(console.error);