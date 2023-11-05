import React, { ChangeEvent, useState, useEffect } from 'react';
import Search from './components/Search';
import './App.scss';

import { mainData, AstronomicalObjects } from './models/data.interface';

interface MainState {
  searching: string;
  data: mainData | null;
  loading: boolean;
  emulateError: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<MainState>({
    searching: localStorage.getItem('searching') || '',
    data: null,
    loading: false,
    emulateError: false,
  });

  const fetchData = () => {
    setState((prevState) => ({ ...prevState, loading: true }));

    const { searching } = state;

    const queryString = searching.length > 0 ? `?name=${searching}` : '';

    fetch(
      `https://stapi.co/api/v2/rest/astronomicalObject/search${queryString}`,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setState((prevState) => ({ ...prevState, data, loading: false }));
      });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState((prevState) => ({ ...prevState, searching: value }));
  };

  const handleSearchSubmit = () => {
    const { searching } = state;
    localStorage.setItem('searching', searching);
    fetchData();
  };

  const handleThrowError = () => {
    setState((prevState) => ({ ...prevState, emulateError: true }));
  };

  const renderList = (data: AstronomicalObjects) => {
    if (!data.length) return <div>Nothing found</div>;

    return data.map((obj) => {
      return (
        <div className="card" key={obj.uid}>
          <h3 className="card__title">Title: {obj.name}</h3>
          <p className="card__type">Type: {obj.astronomicalObjectType}</p>
          <p className="card__location">
            Location: {obj.location ? obj.location.name : 'Unknown location'}
          </p>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { searching, data, loading, emulateError } = state;

  if (emulateError) {
    throw new Error('Emulate error!');
  }

  return (
    <>
      <header>
        <h1>Star Treck</h1>
        <h2>Astronomical Objects</h2>
        <div className="buttons">
          <Search
            searching={searching}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
          <button onClick={handleThrowError}>Emulate Error</button>
        </div>
      </header>
      <main>
        {loading && <div>Loading...</div>}
        <div className="card-list">
          {data && !loading && <>{renderList(data.astronomicalObjects)}</>}
        </div>
      </main>
      <footer className="footer">The Rolling Scopes School, 2023</footer>
    </>
  );
};

export default App;
