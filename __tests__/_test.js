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

domTest('default-option', 'default option test.');
domTest('full-option', 'full option test.');
domTest('jquery-plugin', 'jquery plugin test.');


