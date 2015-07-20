var React = require('react');
var {Link, RouteHandler} = require('react-router');

require('./App.css');

var FEATURES = require('./converted_features.json');

const FilterableFeatureTable = React.createClass({
  render() {
    const categories = [...new Set(this.props.features.map((feature) => (feature.category)))];
    const statuses = [...new Set(this.props.features.map((feature) => (feature.status)))];

    return (
      <div>
        <SearchBar />
        <CategoryFilter categories={categories} />
        <StatusFilter statuses={statuses} />
        <FeatureTable features={this.props.features} />
      </div>
    )
  }
});

const SearchBar = React.createClass({
  render() {

    return (
      <input placeholder="filter…"/>
    );
  }
});

const CategoryFilter = React.createClass({
  render() {
    const rows = this.props.categories.map((category) => (
      <label key={category}>
        <input type="checkbox" />
        {category}
      </label>
      )
    );
    return (
      <div>{rows}</div>
    );
  }
});

const StatusFilter = React.createClass({
  render() {
    const rows = this.props.statuses.map((status) => (
      <label key={status}>
        <input type="checkbox" />
        {status}
      </label>
      )
    );
    return (
      <div>{rows}</div>
    );
  }
});

const FeatureTable = React.createClass({
  render() {
    var rows = this.props.features.map((feature) => {
      return (<FeatureRow key={feature.name} feature={feature} />)
    });
    return (
      <ul>
        {rows}
      </ul>
    )
  }
});

const FeatureRow = React.createClass({
  render() {
    return (
      <li>{this.props.feature.name}</li>
    )
  }
});

const App = React.createClass({
  render() {
    return (
      <FilterableFeatureTable features={FEATURES} />
    );
  }
});

module.exports = App;

