import { z } from "zod";
import Hyperlink from "../components/hyperlink";
import useData from "../hooks/useData";

const locationSchema = z.object({
  name: z.string(),
  lat: z.string(),
  lng: z.string(),
  googlePlaceId: z.string(),
  wazeVenueId: z.string(),
});

type Location = z.infer<typeof locationSchema>;

const locationsSchema = z.object({ locations: z.array(locationSchema) });

function getGoogleMapsUrl(location: Location) {
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

function getWazeUrl(location: Location) {
  let url = "https://www.waze.com/ul?";
  if (location.wazeVenueId) {
    url += "preview_venue_id=" + location.wazeVenueId;
  } else {
    url += "ll=" + location.lat + "%2C" + location.lng;
  }

  return url;
}

function Location({ location }: { location: Location }) {
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

export default function LocationsPage() {
  const { data } = useData("locations");

  if (!data) {
    return <div>Loading ...</div>;
  }

  const locations = locationsSchema.parse(data);

  const alphabetical = (a: Location, b: Location) =>
    a.name.localeCompare(b.name);

  return (
    <>
      <table className="w-full">
        <tbody>
          {locations.locations.sort(alphabetical).map((l) => (
            <Location key={l.name} location={l} />
          ))}
        </tbody>
      </table>
    </>
  );
}
