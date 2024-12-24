/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import WeatherLogo from "../../assets/weather.png";
import { getCityIdNameList, ICity, IWeatherDetail } from "../../utils/helper";
import { MdOutlineDone } from "react-icons/md";
import { WeatherDetailsCard } from "./WeatherDetailsCard";

export const Weather = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [weatherData, setWeatherData] = useState<IWeatherDetail | null>(null);
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<ICity[]>([]);
  const [selectedCity, setSelectedCity] = useState<ICity | null>({
    id: 1256047,
    name: "Sirsi",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedCity(e.target.value);
    if (e.target.value?.length === 0) setFilteredCities([]);
  };

  const filterCities = async (query: string) => {
    if (query.trim() === "") {
      setFilteredCities([]);
      return;
    }
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered.slice(0, 100));
  };

  const fetchWeatherDetails = async (cityName: string) => {
    try {
      if (cityName?.length > 0) {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${
            import.meta.env.VITE_APP_WEATHER_API_KEY
          }`
        )
          ?.then((res) => res?.json())
          ?.then((weatherData) => {
            setWeatherData(weatherData);
          })
          .catch((err) => {
            console.error(err, "error while fetching weather details");
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async () => {
    const citiesList = await getCityIdNameList();
    setCities(citiesList);
  };

  useEffect(() => {
    if (searchedCity?.length > 0) {
      filterCities(searchedCity);
    }
  }, [searchedCity]);

  useEffect(() => {
    fetchCities();
    fetchWeatherDetails("sirsi");
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-16 my-8 md:my-[2rem]">
        <div className="flex gap-4 items-center text-center text-2xl md:text-4xl font-semibold text-white">
          <img
            src={WeatherLogo}
            alt="Weather"
            className="w-24 h-12 md:w-32 md:h-16 object-cover rounded-lg me-4"
          />
          <div>Weather</div>
        </div>
        <input
          type="text"
          placeholder="Search City Name"
          className="input input-bordered w-full md:w-[20rem] h-12 md:h-[4rem] bg-white placeholder:font-medium text-black font-medium text-lg md:text-xl rounded-badge ps-4 md:ps-8"
          value={searchedCity}
          onChange={handleSearch}
        />
      </div>

      <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-16">
        <WeatherDetailsCard
          weatherDetails={weatherData}
          selectedCity={selectedCity}
        />

        {filteredCities.length > 0 && (
          <div className="absolute md:relative top-0 md:top-auto left-0 md:left-auto w-full md:w-[26rem] mt-3 p-2 bg-gray-50 rounded-lg shadow-lg border border-gray-300 z-10 h-min">
            <ul className="space-y-2 max-h-[61vh] md:max-h-[70vh] overflow-y-auto">
              {filteredCities.map((city) => (
                <li
                  key={city.id}
                  className="p-2 cursor-pointer hover:bg-cyan-200 hover:text-black rounded-lg text-gray-600 font-medium text-lg md:text-xl"
                  onClick={() => {
                    setSelectedCity(city);
                    fetchWeatherDetails(city?.name);
                    setFilteredCities([]);
                    setSearchedCity("");
                  }}
                >
                  <div
                    className={`flex items-center justify-center ${
                      selectedCity?.id === city?.id
                        ? "font-semibold text-xl md:text-2xl text-black"
                        : ""
                    }`}
                  >
                    {selectedCity?.id === city?.id && (
                      <MdOutlineDone className="me-2" />
                    )}
                    {city.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
