import { useState } from 'react';

const ResultList = () => {
  const [results] = useState([]);

  return (
    <div>
      <h1>Result List</h1>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;
