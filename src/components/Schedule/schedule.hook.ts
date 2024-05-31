import { axiosInstance } from "@/api/axiosInstance";
import { ActionEventArgs } from "@syncfusion/ej2-react-schedule";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import editorWindowTemplate from "./components/editorWindow";

export default function useSchedule() {
  const recurrObject = useRef(null);

  function editorWindowComponent(e: any) {
    return editorWindowTemplate({ ...e, recurrObject });
  }

  //@ts-ignore
  const onPopupClose = (args) => {
    if (args.type === "Editor" && args.data) {
      //@ts-ignore
      args.data.RecurrenceRule = recurrObject.current.value;
    }
  };

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

  const {
    mutate: postSchedule,
    isPending: postPending,
    isError: postError,
    isSuccess: postSuccess,
  } = useMutation({
    mutationFn: (data) => axiosInstance.post("/schedule", data),
    onSuccess: () => console.log("sucesso!!!!"),
    onError: (err) => console.log("deu erro pai ", err),
  });

  const {
    mutate: putSchedule,
    isPending: putPending,
    isError: putError,
    isSuccess: putSuccess,
  } = useMutation({
    mutationFn: (data) =>
      axiosInstance.put(`/schedule/${data.calendarID}`, data),
    onSuccess: () => console.log("editado!!!!"),
    onError: (err) => console.log("deu na edicao erro pai ", err),
  });

  const {
    mutate: deleteSchedule,
    isPending: deletePending,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useMutation({
    mutationFn: (data) => axiosInstance.delete(`/schedule/${data.calendarID}`),
    onSuccess: () => console.log("deletado!!!!"),
    onError: (err) => console.log("deu na deleção erro pai ", err),
  });

  const handleCompleteAction = (e: ActionEventArgs) => {
    console.log(e);
    const { requestType, addedRecords, changedRecords, deletedRecords } = e;

    switch (requestType) {
      case "eventCreated":
        postSchedule(addedRecords[0]);
        break;
      case "eventChanged":
        putSchedule(changedRecords[0]);
        break;
      case "eventRemoved":
        console.log("eventDeleted", deletedRecords);
        deleteSchedule(deletedRecords[0]);
        break;
      default:
        break;
    }
  };

  return {
    data,
    isLoading,
    error,
    postPending,
    postError,
    postSuccess,
    putPending,
    putError,
    putSuccess,
    deletePending,
    deleteError,
    deleteSuccess,
    onPopupClose,
    handleCompleteAction,
    editorWindowComponent,
  };
}
