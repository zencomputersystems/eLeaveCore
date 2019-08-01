var path = require('path');
var expect = require('chai').expect;

var eLeaveCore = require(path.join(__dirname, '..', './eLeaveCore.js'));

describe('eLeaveCore()', function () {
  'use strict';

  it('exists', function () {
    expect(eLeaveCore).to.be.a('function');

  });

  it('does something', function () {
    expect(true).to.equal(false);
  });

  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});
