"use client";

import useSWR from "swr";

export default function Tides() {
  const fetcher = (url: string) => fetch(url).then((res) => res.text());
  const key =
    "https://raw.githubusercontent.com/djcarter85/studland/master/_data/tides/2024-01-08.csv";
  const { data, error, isLoading } = useSWR(key, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h1>Tides</h1>
      {data}
    </div>
  );
}
