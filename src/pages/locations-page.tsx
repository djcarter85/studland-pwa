import { z } from "zod";
import useData from "../hooks/useData";
import LastUpdatedSection from "../components/last-updated-section";
import {
  ArrowRightSquare,
  HouseDoor,
  Shop,
  Signpost,
  TrainFront,
  Water,
} from "react-bootstrap-icons";

const locationSchema = z.object({
  name: z.string(),
  lat: z.string(),
  lng: z.string(),
  googlePlaceId: z.string(),
  type: z.enum(["home", "beach", "destination", "shop", "station"]),
});

type Location = z.infer<typeof locationSchema>;

const locationsSchema = z.object({ locations: z.array(locationSchema) });

const getGoogleMapsUrl = (location: Location) => {
  let url =
    "https://www.google.com/maps/search/?api=1&query=" +
    location.lat +
    "%2C" +
    location.lng;

  if (location.googlePlaceId) {
    url += "&query_place_id=" + location.googlePlaceId;
  }

  return url;
};

const LocationIcon = ({ location }: { location: Location }) => {
  switch (location.type) {
    case "home":
      return <HouseDoor className="text-teal-600 dark:text-teal-400" />;
    case "beach":
      return <Water className="text-sky-600 dark:text-sky-400" />;
    case "destination":
      return <Signpost className="text-violet-600 dark:text-violet-400" />;
    case "station":
      return <TrainFront className="text-rose-600 dark:text-rose-400" />;
    case "shop":
      return <Shop className="text-amber-600 dark:text-amber-400" />;
  }
};

const Location = ({ location }: { location: Location }) => {
  return (
    <div className="border-t first:border-t-0">
      <a
        href={getGoogleMapsUrl(location)}
        className="flex flex-row items-center justify-between gap-5 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <span className="inline-flex flex-row items-center gap-5 text-xl">
          <LocationIcon location={location} />
          <span className="text-lg">{location.name}</span>
        </span>
        <ArrowRightSquare className="text-xl" />
      </a>
    </div>
  );
};

export default function LocationsPage() {
  const { data, loadingState } = useData("locations", locationsSchema);

  if (
    !data &&
    (loadingState.state === "loading" || loadingState.state === "error")
  ) {
    return <LastUpdatedSection loadingState={loadingState} />;
  }

  return (
    <div className="py-2">
      {data!.locations.map((l) => (
        <Location key={l.name} location={l} />
      ))}
    </div>
  );
}
