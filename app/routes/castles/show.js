import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    building_clicked: function(bldg) {
      bldg.clicked();
    }
  }
});
