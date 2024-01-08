"use client";

import useSWR from "swr";

export default function Tides() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const key =
    "https://raw.githubusercontent.com/djcarter85/studland-data/main/data/tides.json";
  const { data, error, isLoading } = useSWR(key, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h1>Tides</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Height</th>
          </tr>
        </thead>
        <tbody>
          {data.tides.map((t: any) => (
            <tr key={t.timestamp}>
              <td>{t.timestamp}</td>
              <td>{t.type}</td>
              <td>{t.height} m</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
