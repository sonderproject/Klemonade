// Screenshot helper: node scripts/shot.mjs <url-path> <name> [width] [height] [scrollY] [fullPage]
import { chromium } from 'playwright'

const [, , path = '/', name = 'shot', width = '1440', height = '900', scrollY = '0', fullPage = ''] =
  process.argv

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
const page = await browser.newPage({
  viewport: { width: Number(width), height: Number(height) },
})
await page.goto(`http://localhost:5180${path}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
if (Number(scrollY) > 0) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Number(scrollY))
  await page.waitForTimeout(1800)
}
await page.screenshot({ path: `/tmp/${name}.png`, fullPage: fullPage === 'full' })
await browser.close()
console.log(`saved /tmp/${name}.png`)
