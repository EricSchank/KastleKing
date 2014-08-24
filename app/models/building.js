import DS from 'ember-data';

var Building = DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  image: DS.attr('string'),
  perCycle: DS.attr('integer'),
  cyclePeriod: DS.attr('integer'),
  pct: DS.attr('integer', {defaultValue: 0}),
  earned: DS.attr('integer', {defaultValue: 0}),
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
      var parent = self.castle;
      if(!parent) {
        parent = self.get('castle');
      }
      if(parent) {
        parent.set('earned', parent.get('earned') + per);
      } else {
        console.log('Can"t find parent castle!');
      }
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
  FIXTURES: [
    {
      id: 1,
      name: 'Blacksmith',
      type: 'Blacksmith',
      image: 'Blacksmith.png',
      perCycle: 10,
      cyclePeriod: 10000, //ms
    },
    {
      id: 2,
      name: 'Hut',
      type: 'Hut',
      image: 'Hut.png',
      perCycle: 3,
      cyclePeriod: 5000 //ms
    },
    {
      id: 3,
      name: 'Lookout',
      type: 'Lookout',
      image: 'Hut_And_Lookout.png',
      perCycle: 100,
      cyclePeriod: 60000
    }
  ]

});


export default Building;