const path = require('path');
const minify = require('html-minifier').minify;

let page;

beforeAll(async () => {
  page = await browser.newPage();
});

const minifyHtml = (html) => {
  return minify(html, {
    collapseWhitespace: true,
  });
};

const domTest = (testFile, message) => {
  test(message, async () => {
    await page.goto(`file://${path.resolve(__dirname, `./${testFile}.html`)}`);
    const res = await page.evaluate(() => {
      return {
        test: document.querySelector('.test').innerHTML,
        result: document.querySelector('.result').innerHTML,
      }
    });
    await expect(minifyHtml(res.result)).toEqual(minifyHtml(res.test));
  });
};

domTest('test', 'default option test.');
domTest('test2', 'no link test.');
domTest('jquery', 'jquery plugin test.');


