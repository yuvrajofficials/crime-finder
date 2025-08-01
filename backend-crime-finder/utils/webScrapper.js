import {chromium} from 'playwright'


const scrapePersonDetailsByName = async (URI,NAME) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(URI);

  await page.waitForSelector("table");

  const rows = await page.$$("tbody tr");

  let targetRowLink = null;

  for (const row of rows) {
    const nameCell = await row.$("td:nth-child(1)");
    const nameText = await nameCell.innerText();

    if (nameText.trim().toLowerCase() === NAME.toLowerCase()) {

      const link = await row.$("td:last-child a");

      const href = await link.getAttribute("href");
      targetRowLink = `${URI}${href}`;
      break;
    }
  }

  if (!targetRowLink) {
    console.log("Name not found in the table");
    await browser.close();
    return;
  }

  console.log("Found details link:", targetRowLink);

  await page.goto(targetRowLink);

  await page.waitForSelector("div.detailedContent");
  const details = await page.$eval("div.detailedContent", el => el.textContent.trim());

  console.log("Details:", details);

  await browser.close();
  return details;
}

export default scrapePersonDetailsByName;