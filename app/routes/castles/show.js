import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    building_clicked: function(bldg) {
      bldg.clicked();
    },
    new_building: function(bldg_type) {
      this.context.buyBuilding(bldg_type);
    }
  }
});

