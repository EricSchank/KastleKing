import { test, moduleForModel } from 'ember-qunit';

moduleForModel('castle', 'Castle', {
  // Specify the other units that are required for this test.
  needs: ['model:building']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
