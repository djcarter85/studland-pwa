import useData from "../hooks/useData";
import { z } from "zod";
import { dateSchema } from "../schemas/date-schema";
import LastUpdatedSection from "../components/last-updated-section";
import Heading from "../components/heading";
import { Calendar } from "react-bootstrap-icons";

const calendarSchema = z.object({
  year: z.number(),
  startDate: dateSchema,
  endDate: dateSchema,
});

const Table = ({ data }: { data: z.infer<typeof calendarSchema> }) => {
  return (
    <div className="grid w-full grid-cols-[min-content_1fr] border-t border-gray-200 dark:border-gray-500">
      todo
    </div>
  );
};

const CalendarPage = () => {
  const { data, loadingState } = useData("calendar", calendarSchema);

  if (
    !data &&
    (loadingState.state === "loading" || loadingState.state === "error")
  ) {
    return <LastUpdatedSection loadingState={loadingState} />;
  }

  return (
    <div>
      <Heading>
        <div className="flex flex-row items-center gap-3 px-3">
          <Calendar className="text-xl" />
          <span className="text-2xl">{data!.year}</span>
        </div>
      </Heading>
      <Table data={data!} />
    </div>
  );
};

export default CalendarPage;
