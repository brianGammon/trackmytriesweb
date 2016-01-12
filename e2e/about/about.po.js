/* global element, by */
'use strict';

function AboutPage() {
  this.text = element.all(by.tagName('p')).first();
  this.heading = element.all(by.tagName('h2')).first();
}

module.exports = AboutPage;
