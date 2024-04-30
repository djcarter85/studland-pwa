import { DateTime } from "luxon";
import useData from "../hooks/useData";
import { z } from "zod";
import BigDate from "../components/big-date";
import Heading from "../components/heading";
import {
  BoxArrowUpRight,
  Cloud,
  CloudDrizzle,
  CloudMoon,
  CloudRain,
  CloudRainHeavy,
  CloudSun,
  GeoAltFill,
  Moon,
  Sun,
} from "react-bootstrap-icons";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import Hyperlink from "../components/hyperlink";

const dateSchema = z.object({
  date: z.string(),
  summary: z.object({ description: z.string(), weatherType: z.number() }),
  hours: z.array(
    z.object({
      time: z.string(),
      temperature: z.string(),
      chanceOfRain: z.string(),
      weatherType: z.number(),
      weatherTypeDescription: z.string(),
    })
  ),
});

const weatherSchema = z.object({
  data: z.array(dateSchema),
});

function DateTab({
  data,
  isSelected,
  setSelectedData,
}: {
  data: z.infer<typeof dateSchema>;
  isSelected: boolean;
  setSelectedData: (data: z.infer<typeof dateSchema>) => void;
}) {
  return (
    <button
      className={clsx("py-2 basis-full border-t-2", {
        "bg-gray-50 dark:bg-gray-700 border-teal-600 dark:border-teal-400":
          isSelected,
        "bg-gray-100 dark:bg-gray-800 border-transparent": !isSelected,
      })}
      onClick={() => setSelectedData(data)}
    >
      <BigDate date={DateTime.fromISO(data.date)} />
    </button>
  );
}

function WeatherIcon({
  weatherType,
  fallback,
}: {
  weatherType: number;
  fallback: ReactNode;
}) {
  switch (weatherType) {
    case 0: // Clear sky
      return <Moon />;
    case 1: // Sunny
      return <Sun />;
    case 2: // Partly Cloudy
      return <CloudMoon />;
    case 3: // Sunny intervals
      return <CloudSun />;
    case 7: // Light cloud
      return <Cloud />;
    case 10: // Light Rain Showers
      return <CloudRain />; // Bootstrap icons doesn't have an icon for cloud + rain + sun
    case 11: // Drizzle
    case 12: // Light rain
      return <CloudDrizzle />;
    case 15: // Heavy rain
      return <CloudRainHeavy />;
  }

  return fallback;
}

function PageBody({
  weatherData,
}: {
  weatherData: z.infer<typeof weatherSchema>;
}) {
  const [selectedData, setSelectedData] = useState(weatherData.data[0]);
  const selectedDate = selectedData.date;

  return (
    <>
      <Heading>
        <div className="px-3 flex flex-row items-center gap-3">
          <GeoAltFill className="text-xl" />
          <span className="text-2xl">Studland</span>
          <Hyperlink href="https://www.bbc.co.uk/weather/2636597">
            <BoxArrowUpRight />
          </Hyperlink>
        </div>
      </Heading>
      <div className="flex flex-row justify-around">
        {weatherData.data.map((d) => (
          <DateTab
            key={d.date}
            data={d}
            isSelected={d.date === selectedDate}
            setSelectedData={setSelectedData}
          />
        ))}
      </div>
      <div className="dark:bg-gray-700">
        <div className="px-3 pt-3 flex flex-row gap-4 items-center">
          <div className="text-5xl">
            <WeatherIcon
              weatherType={selectedData.summary.weatherType}
              fallback={<></>}
            />
          </div>
          <div>{selectedData.summary.description}</div>
        </div>
        <div className="flex flex-row overflow-x-auto py-3">
          {
            // TODO: figure out a way of resetting the scroll when the date changes
            selectedData.hours.map((h) => (
              <div
                key={h.time}
                className="flex flex-col items-center px-3 border-r border-gray-300"
              >
                <div className="text-lg">{h.time}</div>
                <div className="text-center text-3xl py-2">
                  <WeatherIcon
                    weatherType={h.weatherType}
                    fallback={<span className="text-sm">{h.weatherTypeDescription}</span>}
                  />
                </div>
                <div className="text-xl font-bold">{h.temperature}°C</div>
                <div
                  className={clsx("flex flex-row gap-1 items-center", {
                    "text-sky-600 dark:text-sky-300": h.chanceOfRain !== "0",
                  })}
                >
                  <CloudRain className="text-xm" />
                  <div>{h.chanceOfRain}%</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default function WeatherPage() {
  // TODO: combine into one store of data
  // TODO: add last updated section
  const { data: rawWeather } = useData("weather");
  const { data: rawSun } = useData("sun");

  if (rawWeather && rawSun) {
    const weatherData = weatherSchema.parse(rawWeather);

    return <PageBody weatherData={weatherData} />;
  }

  return <></>;
}
