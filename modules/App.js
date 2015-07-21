var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var {Link, RouteHandler} = require('react-router');

require('./App.css');

var FEATURES = require('./converted_features.json');

const FilterableFeatureTable = React.createClass({
  setCheckedDefault(bar) {
    return [...new Set(bar)].map((name) => {
      return {name, checked: true}
    })
  },

  getInitialState() {
    return {
      filterText: '',
      categories: this.setCheckedDefault(this.props.features.map(
        (feature) => (feature.category))
      ),
      statuses: this.setCheckedDefault(this.props.features.map(
        (feature) => (feature.status))
      )
    }
  },

  handleSearchInput(filterText) {
    this.setState({filterText})
  },

  handleFilterInput({filterName, name, checked}) {
    let stateFilterName = filterName == 'Category' ? 'categories' : 'statuses';
    let newState = this.state[stateFilterName].map(({name: prevName, checked: prevChecked}) => {
      if (prevName == name) {
        return {name, checked};
      }
      return {name: prevName, checked: prevChecked};
    });
    this.setState({[`${stateFilterName}`]: newState});
  },

  render() {
    const filterText = this.state.filterText.toLowerCase();
    const features = this.props.features.filter((feature) => {
      return feature.name.toLowerCase().includes(filterText);
    }).filter((feature) => {
      return this.state.categories.find(({name: category, checked}) => {
        return checked && feature.category == category;
      });
    }).filter((feature) => {
      return this.state.statuses.find(({name: status, checked}) => {
        return checked && feature.status == status;
      });
    });

    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleSearchInput}
        />
        <div className="hbox">
          <FeatureTable features={features} />
          <div>
            <FilterBox
              filterName="Category"
              list={this.state.categories}
              onUserInput={this.handleFilterInput}
            />
            <FilterBox
              filterName="Status"
              list={this.state.statuses}
              onUserInput={this.handleFilterInput}
            />
          </div>
        </div>
      </div>
    )
  }
});

const SearchBar = React.createClass({
  handleChange(evt) {
    this.props.onUserInput(evt.target.value);
  },

  render() {
    return (
      <input
        placeholder="filter…"
        value={this.props.filterText}
        onChange={this.handleChange}
      />
    );
  }
});

const FilterBox = React.createClass({
  mixins: [PureRenderMixin],

  handleChange(evt) {
    this.props.onUserInput({
      filterName: this.props.filterName,
      name: evt.target.name,
      checked: evt.target.checked
    });
  },

  render() {
    const rows = this.props.list.map((value) => (
      <li key={value.name}>
        <label>
          <input
            type="checkbox"
            name={value.name}
            checked={value.checked}
            onChange={this.handleChange}
          />
          {value.name}
        </label>
      </li>
      )
    );
    return (
      <section>
        <h1>{this.props.filterName}</h1>
        <ul>
          {rows}
        </ul>
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
      <ul className="flex">
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

