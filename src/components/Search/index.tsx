import React, { Component } from 'react';

import './Search.scss';

class Search extends Component<unknown, { value: string }> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      value: localStorage.getItem('searchValue') || '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: event.target.value,
    });
  }

  componentWillUnmount(): void {
    localStorage.setItem('searchValue', this.state.value);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="search">
        <label>
          Search
          <input
            type="text"
            onChange={this.handleChange}
            value={value}
            placeholder="search..."
          />
        </label>
        <button className="search__button">Find item</button>
      </div>
    );
  }
}

export default Search;
