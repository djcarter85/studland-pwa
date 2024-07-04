import { z } from "zod";
import Hyperlink from "../components/hyperlink";
import useData from "../hooks/useData";
import LastUpdatedSection from "../components/last-updated-section";
import { GeoAlt } from "react-bootstrap-icons";

const locationSchema = z.object({
  name: z.string(),
  lat: z.string(),
  lng: z.string(),
  googlePlaceId: z.string(),
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

function Location({ location }: { location: Location }) {
  return (
    <tr className="odd:bg-gray-100 odd:dark:bg-gray-700">
      <td className="p-2">{location.name}</td>
      <td className="p-2 text-center">
        <Hyperlink href={getGoogleMapsUrl(location)}>Google</Hyperlink>
      </td>
    </tr>
  );
}

export default function LocationsPage() {
  const { data, loadingState } = useData("locations", locationsSchema);

  if (
    !data &&
    (loadingState.state === "loading" || loadingState.state === "error")
  ) {
    return <LastUpdatedSection loadingState={loadingState} />;
  }

  const alphabetical = (a: Location, b: Location) =>
    a.name.localeCompare(b.name);

  return (
    <>
      <table className="w-full">
        <tbody>
          {data!.locations.sort(alphabetical).map((l) => (
            <Location key={l.name} location={l} />
          ))}
        </tbody>
      </table>
    </>
  );
}
