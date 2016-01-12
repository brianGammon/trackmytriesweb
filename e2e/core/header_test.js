/* global describe, beforeEach, it, browser */
'use strict';

var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect
  , HeaderPagePo = require('./header.po');

chai.use(chaiAsPromised);

describe('Global header tests', function () {
  var header;

  beforeEach(function () {
    header = new HeaderPagePo();
    browser.get('/#/home');
  });

  it('should say PRT Tracker in the brand', function () {
    expect(header.brand.getText()).to.eventually.equal('PRT Tracker');
  });
});
