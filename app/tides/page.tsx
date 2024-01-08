"use client";

import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";

function TideRow({
  type,
  timestamp,
  height,
}: {
  type: string;
  timestamp: string;
  height: number;
}) {
  // TODO: properly parse and convert to browser local time zone
  const time = timestamp.substring(11, 16);

  return (
    <tr className="text-center border-b">
      <td className="py-1">
        <FontAwesomeIcon icon={type === "low" ? faAnglesDown : faAnglesUp} />
      </td>
      <td className="py-1 capitalize">{type}</td>
      <td className="py-1">{time}</td>
      <td className="py-1">{height.toFixed(1)} m</td>
    </tr>
  );
}

export default function Tides() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const key =
    "https://raw.githubusercontent.com/djcarter85/studland-data/main/data/tides.json";
  const { data, error, isLoading } = useSWR(key, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-4">Tides at Studland Bay</h1>
      <table className="w-full border-t">
        <tbody>
          {data.tides.map((t: any) => (
            <TideRow
              key={t.timestamp}
              type={t.type}
              timestamp={t.timestamp}
              height={t.height}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
