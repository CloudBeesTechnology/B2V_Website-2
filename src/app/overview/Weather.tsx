"use client";

import manrun from "../../../public/assets/home/manRun.png";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import {
  BsFillCloudSunFill,
  BsCloudDrizzleFill,
  BsFillCloudRainFill,
  BsCloudSnowFill,
} from "react-icons/bs";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiShowers,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

import opencage from "opencage-api-client";
interface OpenCageResult {
  components: {
    state_district?: string;
    suburb?: string;
  };
}

interface OpenCageResponse {
  status: {
    code: number;
  };
  results: OpenCageResult[];
}

interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
}

interface DateTimeState {
  date: string;
  time: string;
}
const Weather: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<DateTimeState>({
    date: "",
    time: "",
  });

  const [temperature, setTemperature] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [vuur, setVuur] = useState<string | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<JSX.Element | null>(null);
  const [backgroundClass, setBackgroundClass] =
    useState<string>("from-orange to-red");

  useEffect(() => {
    // Fetch Weather and Location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const geocodeKey = "2a33da9c22c641dd8f6e0cf5e1490f6c";

          opencage
            .geocode({ q: `${lat},${lng}`, language: "en", key: geocodeKey, no_annotations:0 })
            .then((data: OpenCageResponse) => {
              if (data.status.code === 200 && data.results.length > 0) {
                const place = data.results[0];
                setCity(place?.components?.suburb || "Unknown City");

                setVuur(place?.components?.state_district || "Unknown City");

                fetch(
                  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
                )
                  .then((res) => res.json())
                  .then((weatherData: WeatherData) => {
                    const weather = weatherData?.current_weather;

                    setTemperature(weather?.temperature);

                    const weatherDescriptions: Record<number, string> = {
                      0: "Very sunny",
                      1: "Sunny",
                      2: "Partly sunny",
                      3: "Overcast",
                      45: "Fog",
                      48: "Rime fog",
                      51: "Light drizzle",
                      61: "Light rain",
                      71: "Light snow",
                      80: "Rain showers",
                      95: "Thunderstorm",
                    };

                    const weatherIcons: Record<number, JSX.Element> = {
                      0: <WiDaySunny size={28} />,
                      1: <WiDayCloudy size={28} />,
                      2: <WiCloud size={28} />,
                      3: <WiCloud size={28} />,
                      45: <WiFog size={28} />,
                      48: <WiFog size={28} />,
                      51: <BsCloudDrizzleFill size={22} />,
                      61: <BsFillCloudRainFill size={22} />,
                      71: <BsCloudSnowFill size={22} />,
                      80: <WiShowers size={28} />,
                      95: <WiThunderstorm size={28} />,
                    };

                    setDescription(
                      weatherDescriptions[weather.weathercode] || "Unknown"
                    );
                    setWeatherIcon(
                      weatherIcons[weather.weathercode] || (
                        <BsFillCloudSunFill />
                      )
                    );
                    if (weather.temperature <= 5) {
                      setBackgroundClass("from-sky to-blue");
                    } else if (weather.temperature <= 10) {
                      setBackgroundClass("from-blue to-indigo");
                    } else if (weather.temperature <= 15) {
                      setBackgroundClass("from-teal to-emerald");
                    } else if (weather.temperature <= 20) {
                      setBackgroundClass("from-green to-lime");
                    } else if (weather.temperature <= 25) {
                      setBackgroundClass("from-lime to-yellow");
                    } else if (weather.temperature <= 30) {
                      setBackgroundClass("from-yellow to-orange");
                    } else if (weather.temperature <= 35) {
                      setBackgroundClass("from-orange to-red");
                    } else if (weather.temperature <= 40) {
                      setBackgroundClass("from-red to-rose");
                    } else {
                      setBackgroundClass("from-orange to-red");
                    }
                  });
              }
            })
            .catch((error: Error) => {
              console.error("Geocode Error:", error.message);
            });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();

      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "long" });
      const year = date.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setCurrentDateTime({
        date: formattedDate,
        time: formattedTime,
      });
    };

    updateDateTime();
  }, []);

  return (
    <section
      className={`bg-gradient-to-r ${backgroundClass} flex gap-2 rounded-xl`}
    >
      <div className="text-center text-gray border-r h-full center gap-1 flex-col border-dashed px-5 py-3">
        <p className="flex flex-col text-[#73877B] text-2xl text-center items-center justify-center">
          {/* <BsFillCloudSunFill /> */}
          {weatherIcon}
          <span className="text-sm">{temperature}°C</span>
        </p>
        <p className="text-sm">
          {/* {city}, */}
          {vuur}
        </p>
        <p className="text-[13px] font-medium w-24">{description}</p>
      </div>
      <div className="flex items-center justify-between w-full p-5">
        <article className="text-gray">
          <p className="text-[13px] font-medium ">{currentDateTime.date}</p>
          <p className="text_size_1">Today</p>
        </article>
        <div className="flex items-center justify-evenly w-1/2">
          <div className="relative px-2 py-1 rounded-md bg-[#73877B]">
            <p className="text-[13px] font-medium text-[#EEEEEE] ">
              Present-on time
            </p>
            <div className="absolute -bottom-2 -right-7">
              <Image
                src={manrun}
                width={100}
                className="w-full h-full"
                alt="man run not found"
              />
            </div>
          </div>
          <article className="text-[#D9F0C5]">
            <p className="text-[13px] font-medium ">Entry Time</p>
            <p className="text_size_1">{currentDateTime.time}</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Weather;
