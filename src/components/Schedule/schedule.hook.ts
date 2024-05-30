import { axiosInstance } from "@/api/axiosInstance";
import { ActionEventArgs } from "@syncfusion/ej2-react-schedule";
import { useQuery } from "@tanstack/react-query";

export default function useSchedule() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["schedulesList"],
    queryFn: () =>
      axiosInstance
        .get("/schedules")
        .then(({ data }) => {
          return data;
        })
        .catch((error) => new Error(error)),
  });

  const handleCompleteAction = (e: ActionEventArgs) => {
    console.log(e);
    const { requestType, addedRecords, changedRecords, deletedRecords } = e;

    switch (requestType) {
      case "eventCreated":
        console.log("eventCreated", addedRecords);
        break;
      case "eventChanged":
        console.log("eventChanged", changedRecords);
        break;
      case "eventRemoved":
        console.log("eventDeleted", deletedRecords);
        break;
      default:
        break;
    }
  };

  return {
    data,
    isLoading,
    error,
    handleCompleteAction,
  };
}
