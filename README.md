# document-outliner
[![npm version](https://badge.fury.io/js/document-outliner.svg)](https://badge.fury.io/js/document-outliner)
[![CircleCI](https://circleci.com/gh/appleple/document-outliner/tree/master.svg?style=shield)](https://circleci.com/gh/appleple/document-outliner/tree/master)
[![npm download](http://img.shields.io/npm/dm/document-outliner.svg)](https://www.npmjs.com/package/document-outliner)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/appleple/document-outliner/master/LICENSE)

A utility to make ol/ul list by using html5 outline algorithm.

**Specifications**

> [Living Standard — Last Updated 11 December 2018](https://html.spec.whatwg.org/multipage/sections.html#outlines)

## Installation

### Vanilla (Plain JavaScript)

#### via npm

```sh
npm install document-outliner
```

#### via yarn

```sh
yarn add document-outliner
```

#### vid cdn

```html
<script src="https://unpkg.com/document-outliner@0.1.0/bundle/document-outliner.js"></script>
```

### jQuery plugin

#### via cdn

```html
<script src="https://unpkg.com/document-outliner@0.1.0/bundle/jquery-document-outliner.js"></script>
```

## Usage

### Vanilla  (Plain JavaScript)

```javascript
import DocumentOutliner from 'document-outliner';

const outliner = new DocumentOutliner('.js-outline-src');
outliner.makeList('.js-outline-output', {listType: 'ul'});
```

### jQuery

```javascript
$(function () {
  $('.container').documentOutliner('.output', {link: false});
});
```

## Options

| name | description | default |
|:---|:---|:---|
| link | create HTML anchor link | true |
| listType | HTML list type ('ol'&#124;'ul') | 'ol' |
| listClassName | ol/ul class name | '' |
| itemClassName | li class name | '' |
| linkClassName | link class name | '' |
| anchorName | anchor link name ($1 is to be link number) | 'heading-$1' |
| levelLimit | limit on number of level | 99 |

## Example

**HTML**

```html
<div class="outline"></div>

<div class="container">
  <h1>The Tax Book</h1>
  <section>
    <h1>Earning money</h1>
    <p>Earning money is good.</p>
    <section>
      <h1>Getting a job</h1>
      <p>To earn money you typically need a job.</p>
    </section>
  </section>
  <section>
    <h1>Spending money</h1>
    <p>Spending is what money is mainly used for.</p>
    <section>
      <h1>Cheap things</h1>
      <p>Buying cheap things often not cost-effective.</p>
    </section>
    <section>
      <h1>Expensive things</h1>
      <p>The most expensive thing is often not the most cost-effective either.</p>
    </section>
  </section>
  <section>
    <h1>Investing money</h1>
    <p>You can lend your money to other people.</p>
  </section>
  <section>
    <h1>Losing money</h1>
    <p>If you spend money or invest money, sooner or later you will lose money.</p>
    <section>
      <h1>Poor judgement</h1>
      <p>Usually if you lose money it's because you made a mistake.</p>
    </section>
  </section>
</div>
```

**JavaScript**

```javascript
const outliner = new DocumentOutliner('.container');
outliner.makeList('.outline', {
  link: true,
  listType: 'ul',
  listClassName: 'list-group',
  itemClassName: 'list-group-item',
  anchorName: 'heading-$1'
});
```

**Yield**

```html
<div class="outline">
  <ul class="list-group level-1">
    <li class="list-group-item"><a href="#heading-1">The Tax Book</a></li>
    <ul class="list-group level-2">
      <li class="list-group-item"><a href="#heading-2">Earning money</a></li>
      <ul class="list-group level-3">
        <li class="list-group-item"><a href="#heading-3">Getting a job</a></li>
      </ul>
      <li class="list-group-item"><a href="#heading-4">Spending money</a></li>
      <ul class="list-group level-3">
        <li class="list-group-item"><a href="#heading-5">Cheap things</a></li>
        <li class="list-group-item"><a href="#heading-6">Expensive things</a></li>
      </ul>
      <li class="list-group-item"><a href="#heading-7">Investing money</a></li>
      <li class="list-group-item"><a href="#heading-8">Losing money</a></li>
      <ul class="list-group level-3">
        <li class="list-group-item"><a href="#heading-9">Poor judgement</a></li>
      </ul>
    </ul>
  </ul>
</div>

<div class="container">
  <h1 id="heading-1">The Tax Book</h1>
  <section>
    <h1 id="heading-2">Earning money</h1>
    <p>Earning money is good.</p>
    <section>
      <h1 id="heading-3">Getting a job</h1>
      <p>To earn money you typically need a job.</p>
    </section>
  </section>
  <section>
    <h1 id="heading-4">Spending money</h1>
    <p>Spending is what money is mainly used for.</p>
    <section>
      <h1 id="heading-5">Cheap things</h1>
      <p>Buying cheap things often not cost-effective.</p>
    </section>
    <section>
      <h1 id="heading-6">Expensive things</h1>
      <p>The most expensive thing is often not the most cost-effective either.</p>
    </section>
  </section>
  <section>
    <h1 id="heading-7">Investing money</h1>
    <p>You can lend your money to other people.</p>
  </section>
  <section>
    <h1 id="heading-8">Losing money</h1>
    <p>If you spend money or invest money, sooner or later you will lose money.</p>
    <section>
      <h1 id="heading-9">Poor judgement</h1>
      <p>Usually if you lose money it's because you made a mistake.</p>
    </section>
  </section>
</div>
```

## Licence

[MIT](https://github.com/appleple/document-outliner/blob/master/LICENSE)
