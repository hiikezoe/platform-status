var App = require('./App');
var React = require('react');
var Router = require('react-router');
var {DefaultRoute, Route, Routes} = Router;

var routes = (
  <Route name="app" path="/" handler={App}>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});
