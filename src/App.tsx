import { Component } from 'react';
import Search from './components/Search';
import ResultList from './components/ResultList';

import './App.scss';

class App extends Component {
  render() {
    return (
      <>
        <header className="header">
          <h1>Star Track</h1>
          <Search />
        </header>
        <main className="main">
          <h2>Results</h2>
          <ResultList />
        </main>
        <footer className="footer">The Rolling Scopes School, 2023</footer>
      </>
    );
  }
}

export default App;
