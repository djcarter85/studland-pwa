import { DateTime } from "luxon";
import useData from "../hooks/useData";
import { z } from "zod";

export default function WeatherPage() {
  const url =
    "https://raw.githubusercontent.com/djcarter85/studland-data/main/data/weather.json";

  const { data } = useData(url, "weather");

  const schema = z.object({
    data: z.array(
      z.object({
        date: z.string(),
        hours: z.array(z.object({ time: z.string(), temperature: z.string() })),
      })
    ),
  });

  if (data) {
    const parsed = schema.parse(data);

    return (
      <>
        {parsed.data.map((d) => (
          <div key={d.date}>
            <h2 className="my-3 text-xl font-bold">
              {DateTime.fromISO(d.date).toFormat("cccc dd LLL yyyy")}
            </h2>
            <div className="grid grid-cols-2">
              {d.hours.map((h) => (
                <>
                  <div>{h.time}</div>
                  <div>{h.temperature}°C</div>
                </>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }

  return <></>;
}
