import React, { useEffect, useState } from 'react';

export default function SearchWeather() {
    const [search, setSearch] = useState("vietnam");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    let componentMounted = true;

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0764e057d69855634784bc66fcdbe583`);
            if (componentMounted) {
                setData(await response.json());
                console.log(data)
            }
            return () => {
                componentMounted = false;
            }
        }
        fetchWeather();
    }, [search]);

    let emoji = null;
    if (typeof data.main != "undefined") {
        if (data.weather[0].main == "Clouds") {
            emoji = "fa-solid fa-cloud"
        } else if (data.weather[0].main == "Thunderstorm") {
            emoji = "fa-bolt"
        } else if (data.weather[0].main == "Drizzle") {
            emoji = "fa-cloud-rain"
        } else if (data.weather[0].main == "Rain") {
            emoji = "fa-solid fa-cloud-showers-heavy"
        } else if (data.weather[0].main == "Snow") {
            emoji = "fa-snowflake"
        } else {
            emoji = "fa-smog"
        }
    } else {
        return (
            <div>...Loading</div>
        );
    }


    let temp = (data.main.temp - 273.15).toFixed(2);
    let temp_max = (data.main.temp_max - 273.15).toFixed(2);
    let temp_min = (data.main.temp_min - 273.15).toFixed(2);

    // Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let moth = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });

    // Time 
    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(input);
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSearch}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Search City"
                                            aria-label="Search City"
                                            aria-describedby="basic-addon2"
                                            name='search'
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            required
                                        />
                                        <button
                                            type='submit'
                                            className="input-group-text"
                                            id="basic-addon2"
                                        >
                                            <i className='fas fa-search'></i>
                                        </button>
                                    </div>
                                </form>
                                <div className='bg-dark bg-opacity-50 py-3'>
                                    <h2 className="card-title">{data.name}</h2>
                                    <p className="card-text lead">
                                        {day}, {moth} {date}, {year}
                                        <br />
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder mb-5'>{temp}&deg;c</h1>
                                    <p className='lead fw-bolder mb-0'>{data.weather[0].main}</p>
                                    <p className='lead'>{temp_min}&deg;c | {temp_max} &deg;c</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
