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
        <div className="foo">
          <FeatureTable features={this.props.features} />
          <div>
            <FilterBox name="Categories" list={categories} />
            <FilterBox name="Status" list={statuses} />
          </div>
        </div>
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

const FilterBox = React.createClass({
  render() {
    const rows = this.props.list.map((value) => (
      <li key={value}>
        <label>
          <input type="checkbox" />
          {value}
        </label>
      </li>
      )
    );
    return (
      <section>
        <h1>{this.props.name}</h1>
        <ul>{rows}</ul>
      </section>
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

