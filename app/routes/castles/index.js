import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('castle');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  }
});
