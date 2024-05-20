import { DateTime } from "luxon";
import useData from "../hooks/useData";
import { z } from "zod";
import BigDate from "../components/big-date";
import Heading from "../components/heading";
import {
  ArrowDown,
  BoxArrowUpRight,
  CloudRain,
  GeoAltFill,
  Sunrise,
  Sunset,
  Wind,
} from "react-bootstrap-icons";
import clsx from "clsx";
import { useState } from "react";
import Hyperlink from "../components/hyperlink";
import LastUpdatedSection from "../components/last-updated-section";
import { WeatherIcon } from "../components/weather-icon";

const dateSchema = z.object({
  date: z.string(),
  summary: z.object({
    description: z.string(),
    weatherType: z.number(),
    maximumTemperature: z.number(),
    minimumTemperature: z.number(),
    sunrise: z.string(),
    sunset: z.string(),
  }),
  hours: z.array(
    z.object({
      time: z.string(),
      temperature: z.number(),
      chanceOfRain: z.number(),
      windSpeedMph: z.number(),
      windDirection: z.string(),
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

function Temperature({ temperature }: { temperature: string | number }) {
  return <>{temperature}°C</>;
}

function PageHeader({ lastUpdatedUtc }: { lastUpdatedUtc: string }) {
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
      <LastUpdatedSection lastUpdatedUtc={lastUpdatedUtc} />
    </>
  );
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
          <div className="flex flex-col items-center">
            <div className="font-bold text-xl">
              <Temperature
                temperature={selectedData.summary.maximumTemperature}
              />
            </div>
            <div>
              <Temperature
                temperature={selectedData.summary.minimumTemperature}
              />
            </div>
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
                    fallback={
                      <span className="text-sm">
                        {h.weatherTypeDescription}
                      </span>
                    }
                  />
                </div>
                <div className="text-xl font-bold">
                  <Temperature temperature={h.temperature} />
                </div>
                <div
                  className={clsx("flex flex-row gap-1 items-center", {
                    "text-sky-600 dark:text-sky-300": h.chanceOfRain !== 0,
                  })}
                >
                  <CloudRain className="text-xm" />
                  <div>{h.chanceOfRain}%</div>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <Wind />
                  <div>{h.windSpeedMph}</div>
                  <ArrowDown
                    className={clsx({
                      "rotate-N": h.windDirection === "N",
                      "rotate-NNE": h.windDirection === "NNE",
                      "rotate-NE": h.windDirection === "NE",
                      "rotate-ENE": h.windDirection === "ENE",
                      "rotate-E": h.windDirection === "E",
                      "rotate-ESE": h.windDirection === "ESE",
                      "rotate-SE": h.windDirection === "SE",
                      "rotate-SSE": h.windDirection === "SSE",
                      "rotate-S": h.windDirection === "S",
                      "rotate-SSW": h.windDirection === "SSW",
                      "rotate-SW": h.windDirection === "SW",
                      "rotate-WSW": h.windDirection === "WSW",
                      "rotate-W": h.windDirection === "W",
                      "rotate-WNW": h.windDirection === "WNW",
                      "rotate-NW": h.windDirection === "NW",
                      "rotate-NNW": h.windDirection === "NNW",
                    })}
                  />
                </div>
              </div>
            ))
          }
        </div>
        <div className="grid grid-cols-[min-content_min-content_1fr_min-content_min-content] items-center gap-3 p-3">
          <div className="text-xl">
            <Sunrise />
          </div>
          <div className="text-lg">{selectedData.summary.sunrise}</div>
          <div className="h-2 rounded-sm bg-gradient-to-r from-sky-300 via-amber-300 to-sky-300 dark:from-sky-600 dark:via-amber-400 dark:to-sky-600"></div>
          <div className="text-lg">{selectedData.summary.sunset}</div>
          <div className="text-xl">
            <Sunset />
          </div>
        </div>
      </div>
    </>
  );
}

export default function WeatherPage() {
  const { data, lastUpdatedUtc } = useData("weather");

  if (data) {
    const weatherData = weatherSchema.parse(data);

    return (
      <>
        <PageHeader lastUpdatedUtc={lastUpdatedUtc} />
        <PageBody weatherData={weatherData} />
      </>
    );
  }

  return <></>;
}
