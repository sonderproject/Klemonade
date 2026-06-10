import { chromium } from 'playwright'
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })

async function check(width, height, label) {
  const page = await browser.newPage({ viewport: { width, height } })
  const js = []
  page.on('request', r => { if (r.url().endsWith('.js')) js.push(r.url().split('/').pop()) })
  await page.goto('http://localhost:5181/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(3000)
  console.log(label, 'JS loaded:', js.join(', '))
  const fonts = await page.evaluate(() => performance.getEntriesByType('resource').filter(e => e.name.includes('woff')).map(e => `${e.name.split('/').pop()} ${(e.transferSize/1024).toFixed(0)}KB`))
  console.log(label, 'fonts:', fonts.join(', '))
  await page.close()
}
await check(390, 844, 'MOBILE')
await check(1440, 900, 'DESKTOP')
await browser.close()
