import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    building_clicked: function(bldg) {
      bldg.clicked();
    },
    new_building: function(bldg_type) {
      var self = this;
      this.store.find('Building').then(function(bldgs){
        var cnt = bldgs.get('length');
        self.store.find('Building', {type: bldg_type}).then(function(result){
          var type = result.content[0];
          var newBldg = self.store.push('Building', {
            id: cnt + 2,
            name: bldg_type + '-new', 
            type: bldg_type, 
            image: type.get('image'), 
            perCycle: type.get('perCycle'), 
            cyclePeriod: type.get('cyclePeriod')
          });
          self.context.get('buildings').addObject(newBldg);
          newBldg.didLoad();
        });
      });
    }
  }
});
