// One-shot asset prep: logo transparency + trim, favicon/og from the lemon head,
// and the two cup photos (crop tighter, brighten, saturate — sun-soaked but real).
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

mkdirSync('public', { recursive: true })

// ---- logo: white background -> transparent, trim, downscale ----
const logo = sharp('preview.png')
const { data, info } = await logo.raw().toBuffer({ resolveWithObject: true })
for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2]
  const min = Math.min(r, g, b)
  if (r > 250 && g > 250 && b > 250) data[i + 3] = 0
  else if (min > 235) data[i + 3] = Math.max(0, 255 - (min - 235) * 14)
}
const transparent = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png()
await transparent.clone().trim().resize({ width: 720 }).toFile('src/assets/logo-lockup.png')

// ---- lemon head (left of lockup) -> favicons + og art ----
const head = transparent.clone().extract({ left: 10, top: 20, width: 300, height: 300 })
await head.clone().resize(64, 64).png().toFile('public/favicon.png')
await head.clone().resize(180, 180).flatten({ background: '#FFF7E0' }).png().toFile('public/apple-touch-icon.png')

// ---- og:image 1200x630: lockup centered on cream ----
const ogLogo = await transparent.clone().trim().resize({ width: 900 }).png().toBuffer()
const ogMeta = await sharp(ogLogo).metadata()
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#FFF7E0' } })
  .composite([{ input: ogLogo, left: Math.round((1200 - ogMeta.width) / 2), top: Math.round((630 - ogMeta.height) / 2) }])
  .png()
  .toFile('public/og.png')

// ---- cup photos: crop tight, straighten-ish, sun-soaked grade ----
await sharp('C478C9EE-D056-4A8F-9CFD-5F1B887FB176.jpeg')
  .extract({ left: 170, top: 190, width: 880, height: 1100 })
  .modulate({ brightness: 1.07, saturation: 1.2 })
  .resize({ width: 800 })
  .jpeg({ quality: 78 })
  .toFile('src/assets/photo-bluerazzle.jpg')

await sharp('89AC8E36-1566-41EE-9E4D-A76F9EA7CD6F.jpeg')
  .extract({ left: 120, top: 240, width: 880, height: 1100 })
  .modulate({ brightness: 1.06, saturation: 1.15 })
  .resize({ width: 800 })
  .jpeg({ quality: 78 })
  .toFile('src/assets/photo-cutecumber.jpg')

console.log('done')
