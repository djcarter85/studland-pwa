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
  hours: z.array(z.object({ time: z.string(), temperature: z.string() })),
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

function DateSection({
  date,
  hours,
  sunData,
}: {
  date: string;
  hours: { time: string; temperature: string }[];
  sunData: z.infer<typeof sunSchema>;
}) {
  const sunDataForThisDate = sunData.dates.find((x) => x.date == date);

  return (
    <div key={date}>
      <h2 className="my-3 text-xl font-bold">
        {DateTime.fromISO(date).toFormat("cccc dd LLL yyyy")}
      </h2>
      <div>Sunrise: {sunDataForThisDate?.sunrise}</div>
      <div>Sunset: {sunDataForThisDate?.sunset}</div>
      <div className="grid grid-cols-2 mt-3">
        {hours.map((h) => (
          <>
            <div>{h.time}</div>
            <div>{h.temperature}°C</div>
          </>
        ))}
      </div>
    </div>
  );
}

function DateSection2({
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
          <DateSection2
            key={d.date}
            data={d}
            isSelected={d.date === selectedDate}
            setSelectedData={setSelectedData}
          />
        ))}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-row overflow-x-auto py-3">
          {selectedData.hours.map((h) => (
            <div key={h.time} className="flex flex-col items-center px-3 border-r border-gray-300">
              <div className="text-lg">{h.time}</div>
              <div className="text-xl font-bold">{h.temperature}°C</div>
            </div>
          ))}
        </div>
      </div>
      {weatherData.data.map((d) => (
        <DateSection date={d.date} hours={d.hours} sunData={sunData} />
      ))}
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
