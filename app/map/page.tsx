import Hyperlink from "../components/hyperlink";
import useData from "../../hooks/useData";
import LastUpdatedSection from "../components/last-updated-section";

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
    <tr className="odd:bg-gray-100 odd:dark:bg-gray-700">
      <td className="p-2">{location.name}</td>
      <td className="p-2">
        <Hyperlink href={getGoogleMapsUrl(location)}>Google</Hyperlink>
        {" | "}
        <Hyperlink href={getWazeUrl(location)}>Waze</Hyperlink>
      </td>
    </tr>
  );
}

export default function Map() {
  const url =
    "https://raw.githubusercontent.com/djcarter85/studland-data/main/data/locations.json";
  const { data, lastUpdatedUtc, isLoading } = useData(url, "locations");

  const alphabetical = (a: any, b: any) => a.name.localeCompare(b.name);

  return (
    <>
      {isLoading && <div>Loading ...</div>}
      <LastUpdatedSection lastUpdatedUtc={lastUpdatedUtc} />
      <table className="w-full">
        <tbody>
          {data &&
            data.locations
              .sort(alphabetical)
              .map((l: any) => <Location key={l.name} location={l} />)}
        </tbody>
      </table>
    </>
  );
}
