/* global describe, beforeEach, it, browser */
'use strict';

var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect
  , AboutPagePo = require('./about.po');

chai.use(chaiAsPromised);

describe('About page', function () {
  var aboutPage;

  beforeEach(function () {
    aboutPage = new AboutPagePo();
    browser.get('/#/about');
  });

  it('should have the correct heading and intro text', function () {
    expect(aboutPage.heading.getText()).to.eventually.equal('About');
    expect(aboutPage.text.getText()).to.eventually.contain('Track My Tries is a web application');
  });
});
