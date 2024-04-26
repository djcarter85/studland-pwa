import { DateTime } from "luxon";
import useData from "../hooks/useData";
import { z } from "zod";
import BigDate from "../components/big-date";
import Heading from "../components/heading";
import { GeoAltFill } from "react-bootstrap-icons";
import clsx from "clsx";
import { useState } from "react";

const dateSchema = z.object({
  date: z.string(),
  summary: z.object({ description: z.string() }),
  hours: z.array(
    z.object({
      time: z.string(),
      temperature: z.string(),
      chanceOfRain: z.string(),
    })
  ),
});

const weatherSchema = z.object({
  data: z.array(dateSchema),
});

const sunSchema = z.object({
  dates: z.array(
    z.object({
      date: z.string(),
      sunrise: z.string(),
      sunset: z.string(),
    })
  ),
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
        "bg-gray-100 dark:bg-gray-700 border-teal-600 dark:border-teal-400":
          isSelected,
        "bg-gray-200 dark:bg-gray-800 border-transparent": !isSelected,
      })}
      onClick={() => setSelectedData(data)}
    >
      <BigDate date={DateTime.fromISO(data.date)} />
    </button>
  );
}

function PageBody({
  weatherData,
  sunData,
}: {
  weatherData: z.infer<typeof weatherSchema>;
  sunData: z.infer<typeof sunSchema>;
}) {
  const [selectedData, setSelectedData] = useState(weatherData.data[0]);
  const selectedDate = selectedData.date;

  return (
    <>
      <Heading>
        <div className="px-3 flex flex-row items-center gap-3">
          <GeoAltFill className="text-xl" />
          <span className="text-2xl">Studland</span>
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
      <div className="bg-gray-100 dark:bg-gray-700">
        <div className="px-3 pt-3">{selectedData.summary.description}</div>
        <div className="flex flex-row overflow-x-auto py-3">
          {
            // TODO: figure out a way of resetting the scroll when the date changes
            selectedData.hours.map((h) => (
              <div
                key={h.time}
                className="flex flex-col items-center px-3 border-r border-gray-300"
              >
                <div className="text-lg">{h.time}</div>
                <div className="text-xl font-bold">{h.temperature}°C</div>
                <div
                  className={clsx({ "text-sky-600": h.chanceOfRain !== "0" })}
                >
                  {h.chanceOfRain}%
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
    const sunData = sunSchema.parse(rawSun);

    return <PageBody weatherData={weatherData} sunData={sunData} />;
  }

  return <></>;
}
