import { DateTime } from "luxon";
import useData from "../hooks/useData";
import { z } from "zod";
import BigDate from "../components/big-date";
import Heading from "../components/heading";
import { GeoAltFill } from "react-bootstrap-icons";

const weatherSchema = z.object({
  data: z.array(
    z.object({
      date: z.string(),
      hours: z.array(z.object({ time: z.string(), temperature: z.string() })),
    })
  ),
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

function DateSection2({ date }: { date: string }) {
  return (
    <div className="py-2">
      <BigDate date={DateTime.fromISO(date)} />
    </div>
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
            <DateSection2 key={d.date} date={d.date} />
          ))}
        </div>
        {weatherData.data.map((d) => (
          <DateSection date={d.date} hours={d.hours} sunData={sunData} />
        ))}
      </>
    );
  }

  return <></>;
}
