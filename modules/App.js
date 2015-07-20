var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var {Link, RouteHandler} = require('react-router');

require('./App.css');

var FEATURES = require('./converted_features.json');

const FilterableFeatureTable = React.createClass({
  getInitialState() {
    return {
      filterText: ''
    }
  },

  handleSearchInput(filterText) {
    this.setState({
      filterText
    })
  },

  render() {
    const categories = [...new Set(this.props.features.map((feature) => (feature.category)))];
    const statuses = [...new Set(this.props.features.map((feature) => (feature.status)))];

    const filterText = this.state.filterText.toLowerCase();
    const features = this.props.features.filter((feature) => {
      return feature.name.toLowerCase().includes(filterText);
    });

    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleSearchInput}
        />
        <div className="foo">
          <FeatureTable features={features} />
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
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value);
  },

  render() {
    return (
      <input
        placeholder="filter…"
        value={this.props.filterText}
        ref="filterTextInput"
        onChange={this.handleChange}
      />
    );
  }
});

const FilterBox = React.createClass({
  mixins: [PureRenderMixin],

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
  mixins: [PureRenderMixin],

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
  mixins: [PureRenderMixin],

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

