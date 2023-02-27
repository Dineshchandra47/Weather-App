import React from 'react';

function LastCities({ lastCityEntries }) {
  return (
    <div>
      <h3>Last 3 Valid City Entries:</h3>
      <ul>
        {lastCityEntries.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
}

export default LastCities;
