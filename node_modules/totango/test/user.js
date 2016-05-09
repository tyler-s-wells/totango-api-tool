var assert = require('assert');
var totango = require('..');

/*
 * XXX Totango's REST API does not report errors. Calling any method with
 * any parameter will alwyas return HTTP status 200. For this reason, this test
 * suite is somewhat shallow.
 */
describe('totango', function() {
  var results = {};
  var t = new totango('fake-service-id');

  it('can create a wrapper object', function(done) {
    assert(t !== undefined);
    done();
  });

  it('can instantiate a user object', function(done) {
    var user = t.user('userId', 'accountId');
    assert(user !== undefined);
    done();
  });
  
  it('can instantiate a user object with an account name', function(done) {
    var user = t.user('userId', 'accountId', 'account name');
    assert(user !== undefined);
    done();
  });

  it('does not crash when registering an event', function(done) {
    var user = t.user('userId', 'accountId');
    user.event('event name', 'module name', done);
  });

  it('fails when registering an event with no parameters', function(done) {
    var user = t.user('userId', 'accountId');
    assert.throws(function() { user.event();}, Error);
    done();
  });
  
  it('fails when registering an event with only one parameter', function(done) {
    var user = t.user('userId', 'accountId');
    assert.throws(function() { user.event("activity");}, Error);
    done();
  });
  
  it('fails when registering an event with only two parameters', function(done) {
    var user = t.user('userId', 'accountId');
    assert.throws(function() { user.event("activity", "module");}, Error);
    done();
  });

  it('does not crash when setting attributes', function(done) {
    var user = t.user('userId', 'accountId');
    user.setAttributes({'attr1':'value1'}, done);
  });
  
  it('fails when setting attributes with no parameters', function(done) {
    var user = t.user('userId', 'accountId');
    assert.throws(function() { user.setAttributes();}, Error);
    done();
  });
  
  it('fails when setting attributes with wrong parameters', function(done) {
    var user = t.user('userId', 'accountId');
    assert.throws(function() { user.setAttributes("not an object", "not a function");}, Error);
    done();
  });

  it('does not crash when setting account attributes', function(done) {
    var user = t.user('userId', 'accountId');
    user.setAccountAttributes({'attr1':'value1'}, done);
  });
  
  it('fails when setting account attributes with no parameters', function(done) {
    var user = t.user('userId', 'accountId');
    assert.throws(function() { user.setAccountAttributes();}, Error);
    done();
  });
  
  it('fails when setting account attributes with wrong parameters', function(done) {
    var user = t.user('userId', 'accountId');
    assert.throws(function() { user.setAccountAttributes("not an object", "not a function");}, Error);
    done();
  });
});
