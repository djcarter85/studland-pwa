import useData from "../../hooks/useData";

export default function Calendar() {
  const { data, isLoading } = useData(
    "http://worldtimeapi.org/api/timezone/Europe/London"
  );

  return (
    <div>
      <h1>Calendar</h1>
      <p>{data && data.utc_datetime.substring(11, 19)}</p>
      <p>{isLoading && "loading"}</p>
    </div>
  );
}
