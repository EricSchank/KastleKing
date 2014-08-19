import Ember from 'ember';

var Router = Ember.Router.extend({
  location: KastleKingENV.locationType
});

Router.map(function() {
  this.resource('building', { path: 'buildings/:building_id' });
  this.resource('castles', function(){
    this.route('show', {path: '/:castle_id'});
  });
});

export default Router;
