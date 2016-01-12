/* global describe, beforeEach, it, browser */
'use strict';

var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect
  , HomePagePo = require('./home.po');

chai.use(chaiAsPromised);

describe('Home page', function () {
  var homePage;

  beforeEach(function () {
    homePage = new HomePagePo();
    browser.get('/#/home');
  });

  it('should say HomeCtrl', function () {
    expect(homePage.heading.getText()).to.eventually.equal('PRT Tracker');
    expect(homePage.introText.getText()).to.eventually.contain('Record and track your progress on the PRT');
  });
});
