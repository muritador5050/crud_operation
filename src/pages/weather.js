import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function getDayName(date = new Date(), locale = "en-US") {
  return date.toLocaleDateString(locale, { weekday: "long" });
}
export default function fakeApi() {
  const [londonWeather, setLondonWeather] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [region, setRegion] = useState("Mecca");
  const [changeLocation, setChangeLocation] = useState(false);

  async function getLondonWeather() {
    setIsLoading(true);
    const londonOptions = {
      method: "GET",
      url: `http://api.weatherapi.com/v1/current.json?q=${region}&aqi=no`,
      headers: {
        key: "b4d344549f2140059e4125539230405",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const response = await axios.request(londonOptions);
      console.log(response.data);
      const result = response.data;
      setLondonWeather(result);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  function setCountry() {
    const londonOptions = {
      method: "POST",
      url: `http://api.weatherapi.com/v1/current.json?q=${region}&aqi=no`,
      headers: {
        key: "b4d344549f2140059e4125539230405",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = axios
      .request(londonOptions)
      .then((response) => setLondonWeather(response.data));
    console.log(response.data);
  }

  const handleChangeLocation = () => {
    setCountry();
    setChangeLocation(false);
  };
  useEffect(() => {
    getLondonWeather();
  }, []);

  return (
    <>
      <h2 className="weather-template">Check Weather Condition Of Your City</h2>
      {isloading && <h3 style={{ textAlign: "center" }}>Loading...</h3>}
      <div className="weather-container">
        <div>
          {londonWeather && (
            <div className="weather-1">
              <div className="weather-blue-template">
                <div className="location">
                  {" "}
                  <ul>
                    <li>
                      <h3>{getDayName()}</h3>
                    </li>
                    <li>{londonWeather.location.localtime}</li>

                    <li>
                      {londonWeather.location.name}/
                      {londonWeather.location.country}
                    </li>
                  </ul>
                </div>
                <div className="condition">
                  <ul>
                    <li>
                      <img src={londonWeather.current.condition.icon} />
                    </li>
                    <li>
                      {" "}
                      <h1>
                        {londonWeather.current.temp_c} <sup>0</sup>C{" "}
                      </h1>
                    </li>
                    <li style={{ fontWeight: "bolder" }}>
                      {" "}
                      {londonWeather.current.condition.text}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="weather-black-template">
                <ul>
                  <li className="list-condition">
                    <strong>HUMIDITY</strong> {londonWeather.current.humidity}
                  </li>
                  <li className="list-condition">
                    <strong>WIND_DIR</strong>
                    {londonWeather.current.wind_dir}
                  </li>
                  <li className="list-condition">
                    <strong>WIND</strong>
                    {londonWeather.current.wind_kph}km/h
                  </li>
                  <li className="list-condition">
                    <strong>CLOUD</strong>
                    {londonWeather.current.cloud}
                  </li>
                </ul>
                {changeLocation ? (
                  <form className="form-input">
                    <input
                      className="text-input"
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    />
                    <button
                      className="go-button"
                      onClick={handleChangeLocation}
                    >
                      go
                    </button>
                  </form>
                ) : (
                  ""
                )}
                <button
                  className="change-location"
                  onClick={() => setChangeLocation(true)}
                >
                  Change Location
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
