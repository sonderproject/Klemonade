// Full-page sweep + reduced-motion check
import { chromium } from 'playwright'
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })

// reduced motion desktop
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const p1 = await ctx.newPage()
await p1.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
await p1.waitForTimeout(1500)
await p1.screenshot({ path: '/tmp/rm-hero.png' })
await p1.evaluate(() => window.scrollTo(0, 1400))
await p1.waitForTimeout(800)
await p1.screenshot({ path: '/tmp/rm-flavors.png' })
const errors = []
p1.on('pageerror', e => errors.push(String(e)))
await ctx.close()

// mobile sweep
const m = await browser.newPage({ viewport: { width: 390, height: 844 } })
m.on('pageerror', e => errors.push(String(e)))
await m.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
await m.waitForTimeout(2000)
const h = await m.evaluate(() => document.documentElement.scrollHeight)
console.log('mobile page height:', h)
for (const [i, y] of [0.18, 0.38, 0.62, 0.82].entries()) {
  await m.evaluate((yy) => window.scrollTo(0, yy), Math.round(h * y))
  await m.waitForTimeout(1200)
  await m.screenshot({ path: `/tmp/m-sweep-${i}.png` })
}
// horizontal overflow check
const overflow = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
console.log('mobile horizontal overflow px:', overflow)
console.log('pageerrors:', errors)
await browser.close()
