"use client";

import useSWR from "swr";
import Hyperlink from "../components/hyperlink";

function getGoogleMapsUrl(location: any) {
  let url =
    "https://www.google.com/maps/search/?api=1&query=" +
    location.lat +
    "%2C" +
    location.lng;

  if (location.googlePlaceId) {
    url += "&query_place_id=" + location.googlePlaceId;
  }

  return url;
}

function getWazeUrl(location: any) {
  let url = "https://www.waze.com/ul?";
  if (location.wazeVenueId) {
    url += "preview_venue_id=" + location.wazeVenueId;
  } else {
    url += "ll=" + location.lat + "%2C" + location.lng;
  }

  return url;
}

function Location({ location }: { location: any }) {
  return (
    <tr>
      <td>{location.name}</td>
      <td>
        <Hyperlink
          href={getGoogleMapsUrl(location)}
          text="Google Maps"
        ></Hyperlink>
        {" | "}
        <Hyperlink href={getWazeUrl(location)} text="Waze"></Hyperlink>
      </td>
    </tr>
  );
}

export default function Map() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const key =
    "https://raw.githubusercontent.com/djcarter85/studland-data/main/data/locations.json";
  const { data, error, isLoading } = useSWR(key, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  var sortedLocations = data.locations.sort((a: any, b: any) =>
    a.name.localeCompare(b.name),
  );

  return (
    <>
      <table className="w-full">
        <tbody>
          {sortedLocations.map((l: any) => (
            <Location key={l.name} location={l} />
          ))}
        </tbody>
      </table>
    </>
  );
}
