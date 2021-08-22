import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const WeatherForecast = ({ capital }) => {
    const [weatherData, setWeatherData] = useState();

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
			)
			.then((response) => {
				console.log("DATA FROM API:", response.data);
				console.log("DATA FROM main:", response.data.main);
				setWeatherData(response.data);
			});
	}, [capital]);
	if (!weatherData) return <div>Loading...</div>;
	return (
		<div>	
			<p>
				Temperature: <b>{weatherData.main.temp} Celsius</b>
			</p>
			<p>
				Pressure: <b>{weatherData.main.pressure} Pascal</b>
			</p>
			<p>
				Humidity: <b>{weatherData.main.humidity} gram per cubic metre</b>
			</p>
			<p>
				Wind: {weatherData.wind.speed} km/h , {weatherData.wind.deg} deg
			</p>
			<img
				src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
				alt={weatherData.weather[0].main}
			/>
		</div>
	);
};
export default WeatherForecast;
