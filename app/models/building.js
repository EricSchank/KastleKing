import DS from 'ember-data';

var Building = DS.Model.extend({
  name: DS.attr('string'),
  buildingType: DS.attr('string'),
  image: DS.attr('string'),
  perCycle: DS.attr('integer'),
  cyclePeriod: DS.attr('integer'),
  pct: DS.attr('integer', {defaultValue: 0}),
  earned: DS.attr('integer', {defaultValue: 0}),
  cost: DS.attr('integer', {defaultValue: 0}),
  castle: DS.belongsTo('castle', {async: true}),

  clicked: function() {
    this.step();
  },

  step: function() {
    var self = this;
    var pct = self.incrementProperty('pct');
    if(pct === 100) {
      var per = self.get('perCycle');
      self.set('earned', self.get('earned') + per);
      self.set('pct', 0);
      // console.log(self.get('name')+ ' earned '+ self.get('perCycle') );

      self.get('castle').then(function(parent){
        if(parent) {
          parent.set('earned', parent.get('earned') + per);
        } else {
          console.log('Can"t find parent castle!');
        }
      });
    }
  },

  percent: function(){
    return 'width: '+this.get('pct')+'%;';
  }.property('pct')

});

Building.reopen({
  didLoad: function(){
    var self = this;
    setInterval(function() {
      self.step();
    }, this.get('cyclePeriod') / 100); //every second
    
  },
});

Building.reopenClass({

});

Building.reopenClass({
  TYPES: {
    Blacksmith: {
      buildingType: 'Blacksmith',
      image: 'Blacksmith.png',
      perCycle: 10,
      cyclePeriod: 10000, //ms
      cost: 50,
    },
    Hut: {
      buildingType: 'Hut',
      image: 'Hut.png',
      perCycle: 3,
      cyclePeriod: 5000, //ms
      cost: 25,
    },
    Lookout: {
      buildingType: 'Lookout',
      image: 'Hut_And_Lookout.png',
      perCycle: 100,
      cyclePeriod: 60000,
      cost: 250
    }
  },

  FIXTURES: [
    {
      id: 1,
      name: 'Hut',
      buildingType: 'Hut',
      image: 'Hut.png',
      perCycle: 3,
      castle: 1,
      cyclePeriod: 5000 //ms
    },
    {
      id: 2,
      name: 'Hut',
      buildingType: 'Hut',
      image: 'Hut.png',
      perCycle: 3,
      castle: 2,
      cyclePeriod: 5000 //ms
    },
    {
      id: 3,
      name: 'Hut',
      buildingType: 'Hut',
      image: 'Hut.png',
      perCycle: 3,
      castle: 3,
      cyclePeriod: 5000 //ms
    },
    {
      id: 4,
      name: 'Hut',
      buildingType: 'Hut',
      image: 'Hut.png',
      perCycle: 3,
      castle: 4,
      cyclePeriod: 5000 //ms
    },
  ],

  buildingHash: function(type) {
    var defaults = this.TYPES[type];
    var obj = {
      id: 999,
      name: type + '-new',
      buildingType: type,
      image: defaults.image,
      perCycle: defaults.perCycle,
      cyclePeriod: defaults.cyclePeriod,
      cost: defaults.cost,
      type: 'Building'
    };
    return obj;
  },

  createBuilding: function(store, type) {
    var objHash = this.buildingHash(type);
    var obj = null;

    return store.find('Building').then(function(bldgs){
      var cnt = bldgs.get('length');
      objHash.id = cnt + 2;
      obj = store.push('Building', objHash);
      return obj;
    });
  },

  cost: function(type) {
    var bldg = this.TYPES[type];
    return bldg.cost;
  }

});


export default Building;