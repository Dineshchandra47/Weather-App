import "./weather.css";
import { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [fetch, setfetch] = useState([]);
  const [city, setcity] = useState({});
  const [ValidCity, setValidCity] = useState(false);
  const [search, setSearch] = useState("");
  const [cityEntries, setcityEntries] = useState(false);

  function searchHandle(e) {
    setSearch(e.target.value);
    if (search.trim() !== "" && city.name === undefined && fetch.length === 0) {
      setValidCity(true);
    } else {
      setValidCity(false);
    }

    if (e.target.value.trim() !== "") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=d006337bcd0fe67bcb9f7b377c70834c&units=metric`
        )
        .then((res) => {
          // console.log(res);
          setcity(res.data);
          setValidCity(false);
          setcityEntries(false);
          setfetch((event) => {
            let temp = [...event];
            if (temp.length < 3) {
              temp.unshift(res.data.name);
            } else {
              temp.unshift(res.data.name);
              temp.pop();
            }
            return temp;
          });
        })
        .catch((err) => {
          setcity({});

          setValidCity(true);

          // console.log(err);
        });
    } else {
      setcity({});
      if (city.name === undefined && fetch.length !== 0) {
        setcityEntries(true);
      } else {
        setcityEntries(false);
      }
      setValidCity(false);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Weather App</h1>
        <input
          className="search-bar"
          type={"text"}
          value={search}
          placeholder="Enter City Name"
          onChange={searchHandle}
        />
      </div>
      {city.name && (
        <div className="main-conatiner">
          <p className="city-name">Weather Details of City : {city.name}</p>
          <p>Current Temperature : {city.main.temp} &#8451;</p>
          <p>
            Temperature Range :{city.main.temp_min} &#8451; to{" "}
            {city.main.temp_max} &#8451;
          </p>
          <p>Humidity : {city.main.humidity}</p>
          <p>Sea level: {city.main.pressure}</p>
          <p>Ground level: {city.wind.speed}</p>
        </div>
      )}
      {ValidCity && (
        <div
          style={{
            margin: "30px auto",
            color: "white",
            backgroundColor: "red",
            fontSize: "2em",
          }}
        >
          Enter ValidCity city Name
        </div>
      )}
      {cityEntries && (
        <div className="last-entries" style={{ textDecoration: "none" }}>
          <h2>Last 3 city entries are:</h2>
          <ul className="last-entries">
            {fetch.map((elm, i) => {
              return (
                <li className="last-entries" key={i}>
                  {elm}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
