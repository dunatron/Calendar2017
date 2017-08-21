import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import fetch from 'isomorphic-fetch';
import Select from 'react-select';
import * as treeDropdownFieldActions from 'state/treeDropdownField/TreeDropdownFieldActions';
import TreeDropdownFieldMenu from 'components/TreeDropdownField/TreeDropdownFieldMenu';
import TreeDropdownFieldNode from 'components/TreeDropdownField/TreeDropdownFieldNode';
import url from 'url';
import { FormControl } from 'react-bootstrap-ss';
import { mapHighlight } from 'lib/castStringToElement';

const SEARCH_DELAY = 500; // ms

// legacy value for multi-select's empty value
const MULTI_EMPTY_VALUE = 'unchanged';

const SINGLE_EMPTY_VALUE = 0;

class TreeDropdownField extends Component {
  constructor(props) {
    super(props);

    // Renderers
    this.render = this.render.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderOption = this.renderOption.bind(this);

    // Getters
    this.getBreadcrumbs = this.getBreadcrumbs.bind(this);
    this.getDropdownOptions = this.getDropdownOptions.bind(this);
    this.getVisibleTree = this.getVisibleTree.bind(this);

    // Events
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);

    // Helpers
    this.callFetch = this.callFetch.bind(this);
    this.lazyLoad = this.lazyLoad.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.findTreeByID = this.findTreeByID.bind(this);
    this.findTreeByPath = this.findTreeByPath.bind(this);
    this.findTreePath = this.findTreePath.bind(this);

    this.searchTimer = null;
  }

  componentDidMount() {
    // Ensure root node is loaded, force invalidating the cache when not readonly or disabled
    if (!this.props.readOnly && !this.props.disabled) {
      this.loadTree([], this.props.search)
        .then((treeData) => {
          // If this is the first time the tree has been loaded, then ensure
          // the selected visible node is highlighted
          if (this.props.data.multiple && this.props.value) {
            const newPath = this.findTreePath(treeData, this.props.value);
            if (newPath) {
              // Revert one level to show parent
              newPath.pop();
              this.props.actions.treeDropdownField.setVisible(this.props.id, newPath);
            }
          }
        });
    }

    const id = this.props.id;
    const values = (this.props.data.multiple)
      ? this.props.data.valueObjects || []
      : [this.props.data.valueObject];
    const selected = values.filter((item) => item);

    if (selected.length) {
      this.props.actions.treeDropdownField.addSelectedValues(id, selected);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.readOnly || this.props.disabled) {
      return;
    }

    let reload = false;
    let visible = [];

    if (this.props.search !== nextProps.search) {
      // invalidate the tree cache
      reload = true;
      visible = nextProps.visible;
    }

    if (nextProps.data.cacheKey !== this.props.data.cacheKey) {
      // invalidate the tree cache, as paths have changed
      reload = true;
    }

    if (reload) {
      this.loadTree(visible, nextProps.search);
    }
  }

  /**
   * Get the currently visible node
   *
   * @return {Object}
   */
  getVisibleTree() {
    return this.findTreeByPath(this.props.tree, this.props.visible);
  }

  /**
   * Get array of breadcrumb nodes
   *
   * @return {Array}
   */
  getBreadcrumbs() {
    const breadcrumbs = [];

    // No more path means this is the complete tree
    let node = this.props.tree;
    for (const next of this.props.visible) {
      if (!node.children) {
        break;
      }
      node = node.children.find((child) => (child.id === next));
      if (!node) {
        break;
      }
      breadcrumbs.push(node);
    }
    return breadcrumbs;
  }

  /**
   * Gets array of options to pass to the react-dropdown component
   *
   * @return {Array}
   */
  getDropdownOptions() {
    const value = this.props.value;
    const node = this.getVisibleTree();
    let options = node ? [...node.children] : [];

    if (this.props.data.hasEmptyDefault && !this.props.visible.length && !this.hasSearch()) {
      options.unshift({
        id: '',
        title: this.props.data.emptyString,
        disabled: false,
      });
    }

    if (this.props.selectedValues) {
      const selectedOptions = this.props.selectedValues
        .filter(selected => {
          const selectedValue = selected.id === value
            || (Array.isArray(value) && value.find(item => item === selected.id));

          if (!selectedValue) {
            return false;
          }
          const option = options.find(item => item.id === selected.id);

          return !option;
        });

      if (selectedOptions.length) {
        options = [
          ...selectedOptions,
          ...options,
        ];
      }
    }

    if (options.length) {
      return options;
    }

    // force renderMenu() to handle rendering even if options are empty
    return [{
      id: null,
      title: null,
      disabled: true,
    }];
  }

  /**
   * Call to make the fetching happen
   *
   * @param {Array} path to load
   * @param {string} search
   * @returns {Promise}
   */
  callFetch(path, search = '') {
    const fetchURL = url.parse(this.props.data.urlTree, true);
    if (this.props.data.showSearch && search.length) {
      fetchURL.query.search = search;
      fetchURL.query.flatList = '1';
    }
    if (path.length) {
      fetchURL.query.ID = path[path.length - 1];
    }
    fetchURL.query.format = 'json';
    const fetchURLString = url.format(fetchURL);
    return fetch(fetchURLString, {
      credentials: 'same-origin',
    })
      .then(response => response.json());
  }

  /**
   * Given a tree and a path of IDs find the nested node
   *
   * @param {Object} tree
   * @param {Array} path
   * @return {Object} Nested tree
   */
  findTreeByPath(tree, path) {
    // No valid tree
    if (!tree || Object.keys(tree).length === 0) {
      return null;
    }
    // No more path means this is the complete tree
    if (path.length === 0) {
      return tree;
    }
    const subPath = path.slice(0);
    const nextID = subPath.shift();
    const subTree = tree.children.find((nextSubTree) => (nextSubTree.id === nextID));

    // Deepen search
    if (subTree) {
      return this.findTreeByPath(subTree, subPath);
    }

    // No tree found
    return null;
  }

  /**
   * Find a tree by id
   *
   * @param {Object} tree - Tree to search
   * @param {*} id - id property of node to find path for
   * @return {Object} - The tree if found, or null if not found.
   */
  findTreeByID(tree, id) {
    // No valid tree
    if (!id || !tree || !tree.children || Object.keys(tree).length === 0) {
      return null;
    }
    // Found node
    if (tree.id === id) {
      return tree;
    }
    for (const child of tree.children) {
      // Search children
      const found = this.findTreeByID(child, id);
      if (found !== null) {
        return found;
      }
    }
    // No tree found
    return null;
  }

  /**
   * Finds path to the node in a tree
   *
   * @param {Object} tree - Tree to search
   * @param {*} id - id property of node to find path for
   * @return {Array} - The path to this node, or null if not found
   */
  findTreePath(tree, id) {
    // root node
    if (!id) {
      return [];
    }
    // No valid tree
    if (!tree || Object.keys(tree).length === 0) {
      return null;
    }
    // Base case, stops recursion
    if (tree.id === id) {
      return [tree.id];
    }
    if (!tree.children) {
      return null;
    }
    for (const child of tree.children) {
      // Search children
      const childPath = this.findTreePath(child, id);
      // Node found in subtree, shift this id and return
      if (childPath !== null) {
        // Don't add root ID
        if (tree.id) {
          childPath.unshift(tree.id);
        }
        return childPath;
      }
    }
    // No tree found
    return null;
  }

  /**
   * Fetches data used to generate a form. This can be form schema and/or form state data.
   * When the response comes back the data is saved to state.
   *
   * @param {Array} path Path to ensure exists
   * @return {Object} Promise from the AJAX request.
   */
  lazyLoad(path) {
    // If any ancestor node in visible chain is either loading or failed then abort re-load
    const foundPrev = path.find((pathNode) => (
      this.props.loading.indexOf(pathNode) > -1
        // TODO: investigate whether failed should not retry
      || this.props.failed.indexOf(pathNode) > -1
    ));
    if (foundPrev) {
      return Promise.resolve({});
    }

    // If ancestor node is already loaded (and non-empty) then don't re-trigger
    const foundTree = this.findTreeByPath(this.props.tree, path);
    // Return if there are no children, or they are loaded
    if (foundTree && (foundTree.count === 0 || foundTree.children.length)) {
      return Promise.resolve({});
    }

    return this.loadTree(path);
  }

  /**
   * Sets callbacks and necessary state changes around a `callFetch()`
   *
   * @param {Array} path A list of ids denoting the path the user has browsed in to
   * @param {String} search A search term to use
   * @return {Promise}
   */
  loadTree(path, search = '') {
    // Mark as loading
    this.props.actions.treeDropdownField.beginTreeUpdating(this.props.id, path);

    return this.callFetch(path, search)
      .then((treeData) => {
        // Populate tree
        this.props.actions.treeDropdownField.updateTree(this.props.id, path, treeData);

        return treeData;
      })
      .catch((error) => {
        this.props.actions.treeDropdownField.updateTreeFailed(this.props.id, path);
        if (typeof this.props.onLoadingError === 'function') {
          return this.props.onLoadingError({
            errors: [
              {
                value: error.message,
                type: 'error',
              },
            ],
          });
        }
        throw error;
      });
  }

  /**
   * Returns whether a search is actively happening
   *
   * @return {Boolean}
   */
  hasSearch() {
    return this.props.data.showSearch && Boolean(this.props.search);
  }

  /**
   * A filter for the list of options so determine what is shown and what isn't
   *
   * @param {Object[]} options
   * @param {String} filter The search string entered, generally ignored by this component
   * @param {String|Array} values A value or list of values selected
   * @return {Object[]}
   */
  filterOptions(options) {
    const parent = this.getVisibleTree();

    return options.filter((option) => {
      const title = option.title && option.title.toLocaleLowerCase();
      // using this.props.search so that we do not get flash of filtered current content
      const search = this.props.search.toLocaleLowerCase();

      // need to do some checks for the selected options, so that they do not show unnecessarily
      return (search)
        // only show option if matches search filter
        ? title && title.includes(search)
        // only show option if it belongs in the current visible tree
        : !parent || !option.id || parent.children.find((child) => child.id === option.id);
    });
  }

  /**
   * Reset the search value
   */
  handleSearchReset() {
    clearTimeout(this.searchTimer);
    this.props.actions.treeDropdownField.setSearch(this.props.id, '');
  }

  /**
   * Sets the search value, handles throttling/debouncing so that API calls is not
   * fired after every keypress
   *
   * @param {String} value
   */
  handleSearchChange(value) {
    clearTimeout(this.searchTimer);
    // delay setting a search value, so ajax requests do not hammer the server
    this.searchTimer = setTimeout(() => {
      this.props.actions.treeDropdownField.setSearch(this.props.id, value);
    }, SEARCH_DELAY);
  }

  /**
   * Handles changes to the text field's value.
   *
   * @param {Object|Array} value - New value / option
   */
  handleChange(value) {
    let mappedValue = null;

    this.handleSearchReset();
    if (this.props.data.multiple) {
      mappedValue = MULTI_EMPTY_VALUE;

      if (value && value.length) {
        const uniqueValues = value && value.filter((item, index) => value.indexOf(item) === index);
        mappedValue = uniqueValues.map(item => item.id);

        this.props.actions.treeDropdownField.addSelectedValues(this.props.id, uniqueValues);
      }
    } else {
      // Get node ID from object
      const id = value ? value.id : null;
      const tree = this.getVisibleTree() || this.props.tree;
      const object = tree.children.find(item => item.id === id);
      if (object) {
        this.props.actions.treeDropdownField.addSelectedValues(this.props.id, [object]);
      }

      mappedValue = id || SINGLE_EMPTY_VALUE;
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(mappedValue);
    }
  }

  /**
   * Handles navigating to a sub-tree
   *
   * @param {Event} event - Click event
   * @param {*} id - Id to add to end of path
   */
  handleNavigate(event, id) {
    event.stopPropagation();
    event.preventDefault();

    if (this.hasSearch()) {
      return;
    }
    // Find parent path
    let path = this.findTreePath(this.props.tree, id);
    if (!path) {
      // Edge case: Path hasn't been loaded yet,
      // so append to current path
      path = this.props.visible.slice(0);
      path.push(id);
    }

    // Lazy-load children and update visibility
    this.lazyLoad(path);
    this.props.actions.treeDropdownField.setVisible(this.props.id, path);
  }

  /**
   * Extra keyboard accessibility
   *
   * @param {Event} event
   */
  handleKeyDown(event) {
    // ignore handling keys if searching
    if (this.hasSearch()) {
      // if escape is pressed, clear the search term
      if (event.keyCode === 27) {
        this.handleSearchReset(event);
      }
      return;
    }

    // Only handle keys when an item is focused
    const focused = this.selectField.getFocusedOption();
    if (!focused) {
      return;
    }

    switch (event.keyCode) {
      case 37: // left, go back
        this.handleBack(event);
        break;
      case 39: // right, drill deeper
        if (focused.count) {
          this.handleNavigate(event, focused.id);
        }
        break;
      default:
        break;
    }
  }

  /**
   * Go up one level
   *
   * @param {Event} event - Click event
   */
  handleBack(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.hasSearch()) {
      return;
    }
    // Find id in existing path, otherwise adding it to the end
    let path = this.props.visible;

    if (path.length) {
      path = path.slice(0, path.length - 1);
    }

    // Lazy-load children and update visibility
    this.lazyLoad(path);
    this.props.actions.treeDropdownField.setVisible(this.props.id, path);
  }

  /**
   * Render menu.
   * Replaces react-select/defaultMenuRenderer.js. See this file
   * for details on renderMenuOptions
   *
   * @param {Object} renderMenuOptions - Options passed from Select.js
   */
  renderMenu(renderMenuOptions) {
    // Build root node
    const visibleTree = this.getVisibleTree() || {};
    const loading = this.props.loading.indexOf(visibleTree.id || 0) > -1;
    const failed = this.props.failed.indexOf(visibleTree.id || 0) > -1;
    const breadcrumbs = this.getBreadcrumbs();
    const value = (this.props.data.multiple)
      ? this.props.value
      : [this.props.value];

    return (
      <TreeDropdownFieldMenu
        loading={loading}
        failed={failed}
        tree={visibleTree}
        breadcrumbs={breadcrumbs}
        renderMenuOptions={renderMenuOptions}
        onBack={this.handleBack}
        search={this.hasSearch()}
        value={value}
      />
    );
  }

  /**
   * Renders an option in a menu level.
   * Replaces Select.js getOptionLabel() method
   *
   * @param {Object} tree - Tree being rendered
   */
  renderOption(tree) {
    let button = null;
    if (tree.count && !this.hasSearch()) {
      const handleNavigate = (event) => this.handleNavigate(event, tree.id);
      button = (
        <button
          className="treedropdownfield__option-button fill-width"
          onClick={handleNavigate}
          onMouseDown={handleNavigate}
          onTouchStart={handleNavigate}
        >
          <span className="treedropdownfield__option-count-icon font-icon-right-open-big" />
        </button>
      );
    }

    const Highlight = ({ children }) => (
      <span className="treedropdownfield__option-title--highlighted">{children}</span>
    );
    const title = (this.props.search.length)
      ? mapHighlight(tree.title, this.props.search, Highlight)
      : tree.title;

    let subtitle = null;
    if (this.hasSearch()) {
      subtitle = tree.contextString;

      if (!subtitle && this.props.data.hasEmptyDefault && !this.props.visible.length) {
        subtitle = this.props.data.emptyString;
      }
    }

    return (
      <div className="treedropdownfield__option fill-width">
        <div className="treedropdownfield__option-title-box flexbox-area-grow fill-height">
          <span className="treedropdownfield__option-title">{title}</span>
          { subtitle &&
          <span className="treedropdownfield__option-context">{subtitle}</span>
          }
        </div>
        {button}
      </div>
    );
  }

  /**
   * Fallback to a textbox for readonly and disabled status react-select isn't ideal for display
   *
   * @return {React}
   */
  renderReadOnly() {
    const inputProps = {
      id: this.props.id,
      readOnly: this.props.readOnly,
      disabled: this.props.disabled,
    };
    const className = this.props.extraClass
      ? `treedropdownfield ${this.props.extraClass}`
      : 'treedropdownfield';
    let title = (this.props.data.hasEmptyDefault) ? this.props.data.emptyString : '';
    const selected = this.props.selectedValues;

    if (this.props.data.multiple) {
      const values = this.props.value
        .map((value) => (
          // assumes all selected values had been populated into `props.selectedValues`
          selected.find((item) => item.id === value) ||
          value
        ));

      title = values.map(value => value.title).join(', ');
    } else {
      const value = selected.find((item) => item.id === this.props.value);
      title = this.props.value;

      if (value && typeof value.title === 'string') {
        title = value.title;
      }
    }

    return (
      <div className={className}>
        <span className="treedropdownfield__title">{title}</span>
        <FormControl
          type="hidden"
          name={this.props.name}
          value={this.props.value}
          {...inputProps}
        />
      </div>
    );
  }

  render() {
    if (this.props.readOnly || this.props.disabled) {
      return this.renderReadOnly();
    }

    const inputProps = {
      id: this.props.id,
    };
    const className = this.props.extraClass
      ? `treedropdownfield ${this.props.extraClass}`
      : 'treedropdownfield';
    const options = this.getDropdownOptions();
    const value = (this.props.data.multiple)
      ? this.props.selectedValues.filter(item => this.props.value.includes(item.id))
      : this.props.value;
    const resetValue = (this.props.data.hasEmptyDefault && !this.props.visible.length)
      ? ''
      : null;
    const showSearch = (typeof this.props.data.showSearch !== 'undefined')
      ? this.props.data.showSearch
      : false;

    return (
      <Select
        searchable={showSearch}
        multi={this.props.data.multiple}
        className={className}
        name={this.props.name}
        options={options}
        inputProps={inputProps}
        menuRenderer={this.renderMenu}
        filterOptions={this.filterOptions}
        optionRenderer={this.renderOption}
        onChange={this.handleChange}
        onOpen={this.handleSearchReset}
        onBlurResetsInput
        onInputKeyDown={this.handleKeyDown}
        onInputChange={this.handleSearchChange}
        isLoading={Boolean(this.props.loading.length)}
        value={value}
        resetValue={resetValue}
        ref={(select) => { this.selectField = select; }}
        placeholder={this.props.data.emptyString}
        labelKey="title"
        valueKey="id"
      />
    );
  }
}

TreeDropdownField.propTypes = {
  extraClass: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  tree: PropTypes.shape(TreeDropdownFieldNode.propTypes), // Root node of tree
  visible: PropTypes.array, // Path to visible node
  loading: PropTypes.array, // List of nodes marked as loading
  failed: PropTypes.array, // List of nodes that failed to load
  selectedValues: PropTypes.array,
  data: PropTypes.shape({
    cacheKey: PropTypes.string,
    urlTree: PropTypes.string.isRequired,
    emptyString: PropTypes.string,
    valueObject: PropTypes.shape(TreeDropdownFieldNode.propTypes),
    valueObjects: PropTypes.arrayOf(PropTypes.shape(TreeDropdownFieldNode.propTypes)),
    hasEmptyDefault: PropTypes.bool,
    showSearch: PropTypes.bool,
    multiple: PropTypes.bool,
  }),
  onLoadingError: PropTypes.func,
  search: PropTypes.string,
  actions: PropTypes.shape({
    treeDropdownField: PropTypes.object,
  }),
};

TreeDropdownField.defaultProps = {
  // React considers "undefined" as an uncontrolled component.
  value: '',
  extraClass: '',
  className: '',
  tree: {},
  visible: [],
  loading: [],
  failed: [],
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.id;
  const field = (state.treeDropdownField.fields[id])
    ? state.treeDropdownField.fields[id]
    : {
      tree: {},
      visible: [],
      loading: [],
      failed: [],
      search: '',
      selectedValues: [],
    };

  let value = ownProps.value;

  if (ownProps.data.multiple && ownProps.value === MULTI_EMPTY_VALUE) {
    value = [];
  }

  if (!ownProps.data.multiple && ownProps.value === SINGLE_EMPTY_VALUE) {
    value = '';
  }

  return { ...field, value };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      treeDropdownField: bindActionCreators(treeDropdownFieldActions, dispatch),
    },
  };
}

const ConnectedTreeDropdownField = connect(mapStateToProps, mapDispatchToProps)(TreeDropdownField);

export { TreeDropdownField, ConnectedTreeDropdownField, MULTI_EMPTY_VALUE, SINGLE_EMPTY_VALUE };

export default fieldHolder(ConnectedTreeDropdownField);
