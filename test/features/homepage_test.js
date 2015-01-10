NODE_ENV = 'test';
var server = require('../../server');
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');

describe('User visits homepage', function() {
  this.timeout(15000)

  var browser;

  before(function(){
    browser = new Browser({site: '127.0.0.1:3000'});    
  });

  beforeEach(function(done) {
    browser.visit('/', done);
  });


  it('and can see the name of the app', function() {
    expect(browser.html('h1')).to.contain("Football Betting Odds");
  });

  it('and can see a link "See what matches are running now"', function() {
    expect(browser.html('a')).to.contain("See what matches are running now");
  });

  it('and after clicking the button can see all matches running atm', function() {
    browser.clickLink('See what matches are running now');
    expect(browser.html('table')).to.contain("<tr>");
  });

  it('and clicks "see all matches" and clicks on a match id', function(done) {
    browser.clickLink('See what matches are running now');
    browser.clickLink('27335117');
    expect(browser.html('h2')).to.contain("win");
  });
})