import Ember from 'ember';
import Resolver from 'ember/resolver';
import DS from 'ember-data';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'kastle-king', // TODO: loaded via config
  Resolver: Resolver,
  ApplicationAdapter: DS.FixtureAdapter.extend()
});

loadInitializers(App, 'kastle-king');

export default App;
