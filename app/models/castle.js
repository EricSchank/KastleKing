import DS from 'ember-data';

var Castle = DS.Model.extend({
  name: DS.attr('string', {defaultValue: "The King's Kastle"}),
  image: DS.attr('string'),
  buildings: DS.hasMany('building', {async: true}),
  earned: DS.attr('integer', {defaultValue: 0}),
  buildingCount: 0,
  perSecond: 0.0,

  // earned: function() {
  //   var buildings = this.get('buildings');
  //   var total = 0;
  //   buildings.forEach(function(bldg){
  //     total += bldg.get('earned');
  //   });
  //   return total;
  // }.property('buildings.@each.earned')

  didLoad: function(){
    var self = this;
    this.get('buildings').then(function(){
      self.get('buildings').forEach(function(bldg) {
        bldg.set('castle', self);
      });
    });
  },

  bldgCount: function() {
    var self = this;
    this.get('buildings').then(function(bldgs){
      self.set('buildingCount', bldgs.get('length'));
    });
  }.observes('buildings.length').on('init'),

  perSec: function() {
    var totSec = 0.0;
    var self = this;
    self.get('buildings').then(function(bldgs){
      bldgs.forEach(function(bldg){
        var perC = bldg.get('perCycle');
        var cPeriod = bldg.get('cyclePeriod');
        var perS = 1000.0 * perC / cPeriod;
        console.log(''+perS);
        totSec += perS;
      });
      self.set('perSecond', totSec.toFixed(2));
    });
  }.observes('buildings.length').on('init')

});

Castle.reopen({
});


Castle.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'Connor',
      image: 'castle2.png',
      buildings: [1,2,3]
    },
    {
      id: 2,
      name: 'Daddy',
      image: 'castle4.png',
      buildings: [1,3]
    },
    {
      id: 3,
      name: 'Evan',
      image: 'castle1.png',
      buildings: [2,3]
    },
    {
      id: 4,
      name: 'Mommy',
      image: 'castle3.png',
      buildings: []
    }
  ]

});


export default Castle;