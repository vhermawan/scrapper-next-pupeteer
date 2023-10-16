import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer';
import * as XLSX from 'xlsx';


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { username } = req.query

  const getQuotes = async () => {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(`https://acadstaff.ugm.ac.id/${username}`, {
      waitUntil: "domcontentloaded",
    });

    await page.$eval('a#btn-publish.nav-link.btn-publish', form => form.click());

    await page.waitForSelector('#tab-publish');

    const item = await page.$$eval('.item', links => {
      const listTitle = links.map(el => el.querySelector('a')?.innerText)
      const listAuthor = links.map(el => el.querySelector('.desc')?.innerHTML)

      let parseAuthor = listAuthor.map(inputString => {
        if (typeof inputString === 'string') {
          return inputString.replace(/^\s+|\s+$/g, '');
        }
        return inputString;
      });


      const data = listTitle.map((title, index) => {
        return { title, author: parseAuthor[index] };
      });

      return data
    });

    await browser.close();
    return item;
  };

  const dataResearch = await getQuotes();

  const ws = XLSX.utils.json_to_sheet(dataResearch);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${username}_research.xlsx`);

  res.status(200).end(buf);
}
