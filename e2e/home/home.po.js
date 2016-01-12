/* global element, by */
'use strict';

function HomePage() {
  this.introText = element.all(by.tagName('p')).first();
  this.heading = element(by.tagName('h1'));
}

module.exports = HomePage;
