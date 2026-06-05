import sharp from 'sharp'

const W = 1200
const H = 630

// Create an SVG string for the OG image
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF8C42"/>
      <stop offset="100%" style="stop-color:#E87A30"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" rx="24" fill="url(#bg)"/>
  <circle cx="980" cy="120" r="300" fill="rgba(255,255,255,0.05)"/>
  <circle cx="150" cy="500" r="220" fill="rgba(255,255,255,0.04)"/>
  <circle cx="1050" cy="520" r="140" fill="rgba(255,255,255,0.03)"/>
  <text x="600" y="250" text-anchor="middle" font-size="180" font-family="Arial, sans-serif">🍜</text>
  <text x="600" y="390" text-anchor="middle" font-size="76" font-weight="900" font-family="Arial, sans-serif" fill="white">今天吃啥</text>
  <text x="600" y="455" text-anchor="middle" font-size="30" font-weight="600" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.85)">专治选择困难症 · 打开就有答案</text>
  <text x="600" y="530" text-anchor="middle" font-size="20" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.5)">chiwhat.online</text>
</svg>`

await sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png')

console.log('✅ OG image generated: public/og-image.png')
