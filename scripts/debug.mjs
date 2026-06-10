import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push(String(e)))
await page.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)
const info = await page.$$eval('.hero-cta', els => els.map(el => {
  const cs = getComputedStyle(el)
  const r = el.getBoundingClientRect()
  return { text: el.textContent, transform: cs.transform, opacity: cs.opacity, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, inline: el.getAttribute('style') }
}))
console.log(JSON.stringify(info, null, 1))
console.log('ERRORS:', errors.slice(0, 5))
await browser.close()
