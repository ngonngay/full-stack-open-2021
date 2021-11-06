import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
require('dotenv').config();
const CountryDetail = ({ country }) => {
	return (
		<div>
			<br />
			<br />
			<br />
			<h1>{country.name}</h1>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<h2>Languages: </h2>
			<ul>
				{country.languages.map((language) => (
					<li key={nanoid()}>{language.name}</li>
				))}
			</ul>
			<img src={country.flags.png} alt='' />
		</div>
	);
};
const Country = ({ country, setKeywords }) => {
	return (
		<>
			{' '}
			<li>{country.name}</li>
			<button onClick={() => setKeywords(country.name)}>show</button>
		</>
	);
};
const WeatherDetail = ({ weatherData }) => {
	//console.log(weatherData);
	if (weatherData.current) {
		return (
			<>
				<h1>Weather in {weatherData.location.name}</h1>
				<h3>
					<b>Temperature</b>: {weatherData.current.temperature}{' '}
					Celsius
				</h3>
				<img src={weatherData.current.weather_icons[0]} />
				<p>
					<b>wind:</b>
					{weatherData.current.wind_speed} mph direction{' '}
					{weatherData.current.wind_dir}{' '}
				</p>
			</>
		);
	}

	return (
		<>
			<h1>Cannot get weather data</h1>
		</>
	);
};
const Result = ({ countries, setKeywords, weatherData }) => {
	//console.log(countries);
	//console.log(weatherData);
	if (countries.message) return <p>No result matched!</p>;

	if (countries.length == 1) {
		let country = countries[0];
		//console.log(country);
		return (
			<>
				<CountryDetail country={country} />
				<WeatherDetail weatherData={weatherData} />
			</>
		);
	}
	if (countries.length >= 10)
		return <p>Too many countries matches, specify another filter</p>;
	return (
		<ul>
			{countries.map((country) => {
				return (
					<Country
						key={nanoid()}
						country={country}
						setKeywords={setKeywords}
					/>
				);
			})}
		</ul>
	);
};

const App = () => {
	const api_key = process.env.REACT_APP_API_KEY;
	const [countries, setCountries] = useState([]);
	const [weatherData, setweatherData] = useState([]);
	const [keywords, setKeywords] = useState('');
	useEffect(() => {
		let api = keywords
			? `https://restcountries.com/v2/name/${keywords}`
			: `https://restcountries.com/v2/all`;
		axios.get(api).then((response) => {
			setCountries(response.data);
		});
	}, [keywords]);
	useEffect(() => {
		if (countries.length == 1) {
			let capital = countries[0].capital;
			let api = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;
			//console.log(api);
			axios.get(api).then((response) => {
				setweatherData(response.data);
				//console.log(response.data);
			});
		}
	}, [countries]);
	return (
		<div>
			find countries{' '}
			<input onChange={(e) => setKeywords(e.target.value)} value={keywords} />
			<Result
				countries={countries}
				setKeywords={setKeywords}
				weatherData={weatherData}
			/>
		</div>
	);
};

export default App;
