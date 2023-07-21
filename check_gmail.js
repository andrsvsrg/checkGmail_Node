import  puppeteer from 'puppeteer'

async function checkGmail() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  const YOUR_EMAIL = 'test.for.nodejs.parse@gmail.com'
  const YOUR_PASSWORD =  'qwerty321_'

  function delay(ms) {   // waitForTimeout - deprecated
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  try {
    await page.goto('https://mail.google.com/', { waitUntil: 'networkidle2' })

    await page.waitForSelector('input[type="email"]')
    await page.type('input[type="email"]', YOUR_EMAIL)
    await page.click('#identifierNext')
    await page.waitForNavigation({ waitUntil: 'load' })
    await delay(3000)
    await page.waitForSelector('input[type="password"]', {timeout: 30e3})
    await page.type('input[type="password"]', YOUR_PASSWORD)
    await page.click('#passwordNext')
    await delay(5000)
    await page.waitForSelector('div[role="navigation"]')

    const unreadEmailCount = await page.evaluate(() => {
      return +document.querySelector('[class="bsU"]').innerText || null;
    });
    if(unreadEmailCount) {
      console.log(`Количество непрочитанных писем: ${unreadEmailCount}`);
    } else {
      console.log(`У вас нет не прочитаных писем`);
    }

  } catch (error) {
    console.error('Произошла ошибка:', error);
  } finally {
    await browser.close();
  }
}

checkGmail()