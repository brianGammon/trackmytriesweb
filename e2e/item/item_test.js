/* global describe, beforeEach, it, browser */
'use strict';

var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect
  , ItemPagePo = require('./item.po');

chai.use(chaiAsPromised);

describe('Item page', function () {
  var itemPage;

  beforeEach(function () {
    itemPage = new ItemPagePo();
    browser.get('/#/item');
  });

  it.skip('should say ItemCtrl', function () {
    expect(itemPage.heading.getText()).to.eventually.equal('item');
    expect(itemPage.text.getText()).to.eventually.equal('ItemCtrl');
  });
});
