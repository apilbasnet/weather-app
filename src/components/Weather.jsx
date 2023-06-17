import React, { useState, useEffect } from "react";
import axios from 'axios'


const Weather = () => {
    const API_KEY = "0e708c878ddb415f89a45ce2d53a7435"

    const [location, setLocation] = useState('');

    const [weatherData, setWeatherData] = useState(null);
    const [weatherData1, setWeatherData1] = useState(null);
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        const getCurrentPosition = () => {


            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({ latitude, longitude });
                    },
                    (error) => {
                        // console.error('Error getting geolocation:', error);
                    }
                );
            } else {
                // console.error('Geolocation is not supported by this browser.');
            }
        };
        getCurrentPosition();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setCurrentTime(date.toLocaleTimeString());
            setCurrentDate(date.toLocaleDateString());


        }, 1000);
        return () => clearInterval(interval);
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();


        setError(null);

        try {
            const { latitude, longitude } = currentLocation;
            // console.log(latitude);
            // console.log(longitude);


            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,rain_sum,windspeed_10m_max&forecast_days=1&timezone=auto`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        }
        // console.log(weatherData);
    };

    const fetchData = async (lat, lng) => {


        setError(null);

        try {




            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,rain_sum,windspeed_10m_max&forecast_days=1&timezone=auto`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data1 = await response.json();
            setWeatherData1(data1);
        } catch (err) {
            setError(err.message);
        }
        // console.log(weatherData1);
    };


    const handleSubmit1 = async (e) => {
        e.preventDefault();

        try {
            const response1 = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${API_KEY}`

            );

            const { lat, lng } = response1.data.results[0].geometry;

            fetchData(lat, lng);




        } catch (error) {
            // console.log("Error fetching coordinates.")
        }

    }


    return (
        <div className=' grid  lg:grid-cols-2  h-screen place-items-center  '>

            <div className=" col-span-2 md:mt-5 text-center text-white md:text-black">
                <h1 className=" font-bold  text-3xl">Weather App</h1>
                <h1>
                    Current Time : {currentTime}
                </h1>
                <h1>

                    Current Date : {currentDate}
                </h1>
                <h1 className="font-semibold text-xl pt-1">
                    Get the Weather Data for :
                </h1>



            </div>




            <div className=" col-span-2 lg:col-span-1  md:mb-5 border border-gray-400 rounded-md p-2 w-[80vw] h-[35vh]  lg:w-[350px] lg:h-[400px] flex flex-col items-center justify-center text-white"  >
                <h1 className=" font-bold mb-5 text-3xl">Local</h1>



                <form onSubmit={handleSubmit} >

                    <button className=" m-3 border border-violet-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" type='submit' >Get Data</button>
                </form>


                {error && <p>{error}</p>}
                {weatherData && (
                    <div>
                        <h2>Weather for {weatherData.timezone}</h2>
                        <p>Maximum Temperature: {weatherData.daily.temperature_2m_max} &deg; </p>
                        <p>Minimum Temperature: {weatherData.daily.temperature_2m_min} &deg;</p>
                        <p>Windspeed: {weatherData.daily.windspeed_10m_max} km/hr </p>




                    </div>
                )}



            </div>

            <div className="col-span-2 lg:col-span-1 md:mb-5 border  border-gray-400 rounded-md w-[80vw] h-[45vh] lg:w-[350px] lg:h-[400px] flex flex-col items-center justify-center text-white"  >
                <h1 className=" font-bold mb-5 text-3xl">International</h1>

                <form onSubmit={handleSubmit1}>
                    <input className="text-black m-2 p-2" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Enter Location' />
                    <div className="flex items-center justify-center">

                        <button className=" m-3 border border-violet-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" type='submit' >Get Data</button>
                    </div>
                </form>
                {error && <p>{error}</p>}
                {weatherData1 && (
                    <div>
                        <h2>Weather for {weatherData1.timezone}</h2>
                        <p>Maximum Temperature: {weatherData1.daily.temperature_2m_max} &deg; </p>
                        <p>Minimum Temperature: {weatherData1.daily.temperature_2m_min} &deg;</p>
                        <p>Windspeed: {weatherData1.daily.windspeed_10m_max} km/hr </p>




                    </div>
                )}



            </div>
        </div>


    )

}

export default Weather;