NODE_ENV = 'test';
var server = require('../../server');
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');
var models = require('../../models');

describe('User visits homepage', function() {
  this.timeout(40000)

  var browser;

  before(function(){
    server.listen(3000);
    browser = new Browser({site: '127.0.0.1:3000'});    
  });

  beforeEach(function(done) {
    browser.visit('/').then(function() {
      browser.clickLink('See what matches are running now');
    });
  });


  it('and can see the name of the app', function(done) {
    expect(browser.html('h1')).to.contain("Football Betting Odds");
    done();
  });

  it('and can see a link "See what matches are running now"', function(done) {
    expect(browser.html('a')).to.contain("See what matches are running now");
    done();
  });

  // it('and after clicking the button can see the table with matches', function() {
  //     expect(browser.html('table')).to.contain("save");   
  // });

  // it('and can save matches to db"', function() {
  //   models.Match.all().complete(function(err, data) {
  //     var initialNumberOfMatches = data.length;
  //   });
  //   browser.clickLink('See what matches are running now').done(function() {
  //     browser.clickLink('save').done(function() {
  //       models.Match.all().complete(function(err, data) {
  //         expect(data.length).to.equal(initialNumberOfMatches + 1);
  //       });
  //     });
  //   });
  // });

  // it('and can save odds to db', function() {
  //   models.Odds.all().complete(function(err, data) {
  //     var initialNumberOfOdds = data.length;
  //   });
  //   browser.clickLink('See what matches are running now').done(function() {
  //     browser.clickLink('save').done(function() {
  //       models.Odds.all().complete(function(err, data) {
  //         expect(data.length).to.equal(initialNumberOfOdds + 1);
  //       });
  //     });
  //   });
  // });

})