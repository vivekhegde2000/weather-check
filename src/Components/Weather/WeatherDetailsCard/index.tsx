import React from "react";
import { ICity, IWeatherDetail } from "../../../utils/helper";

interface IWeatherDetailsCardProps {
  weatherDetails: IWeatherDetail | null;
  selectedCity: ICity | null;
}

export const WeatherDetailsCard: React.FC<IWeatherDetailsCardProps> = ({
  weatherDetails,
  selectedCity,
}) => {
  return (
    <>
      {selectedCity !== null && weatherDetails !== null && (
        <div
          className="mt-4 rounded-3xl text-black h-auto md:h-[70vh] w-full flex flex-col md:flex-row justify-between items-center p-4 md:p-12 shadow-[0px_10px_10px_0px_rgba(0,0,0,0.16)]"
          style={{
            // background: "linear-gradient(to right, #E0C3FC, #8EC5FC)",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10.1px)",
            WebkitBackdropFilter: "blur(10.1px)",
            border: "1px solid rgba(255, 255, 255, 1)",
          }}
        >
          {/* 1st column */}
          <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[50%] items-center text-center md:text-left">
            <div className="text-4xl md:text-[6rem] font-semibold mb-6 md:mb-12 break-words">
              {`${weatherDetails?.main?.temp?.toFixed(1)} `}&deg;C
            </div>
            <p className="text-gray-300 font-medium text-2xl mb-4 md:text-[3rem] text-center md:mb-8 text-wrap leading-normal">
              {`${weatherDetails?.name}, ${weatherDetails?.sys?.country}`}
            </p>
            <p className="text-gray-300 font-medium text-xl md:text-[2rem] mb-2 break-words">
              {weatherDetails?.weather?.[0]?.description}
            </p>
          </div>

          {/* 2nd column */}
          <div className="flex flex-col gap-4 md:gap-6 items-center w-full md:w-[50%]">
            <img
              src={`http://api.openweathermap.org/img/w/${weatherDetails?.weather?.[0]?.icon}@2x.png`}
              alt=""
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <p className="text-xl md:text-[2rem] text-gray-300 font-normal break-words">
              <span>Feels like</span>
              <span className="font-semibold ms-2 md:ms-6">
                {`${weatherDetails?.main?.feels_like?.toFixed(1)} `}&deg;C
              </span>
            </p>
            <p className="text-xl md:text-[2rem] text-gray-300 font-normal break-words">
              <span>Humidity</span>
              <span className="font-semibold ms-2 md:ms-6">
                {`${weatherDetails?.main?.humidity?.toFixed(1)} %`}
              </span>
            </p>
            <p className="text-xl md:text-[2rem] text-gray-300 font-normal break-words">
              <span>Wind Speed</span>
              <span className="font-semibold ms-2 md:ms-6">
                {`${weatherDetails?.wind?.speed?.toFixed(1)} kph`}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
