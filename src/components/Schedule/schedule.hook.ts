import { ActionEventArgs } from "@syncfusion/ej2-react-schedule";
import { useRef } from "react";
import editorWindowTemplate from "./components/editorWindow";
import {
  handleDeleteSchedule,
  handleGetScheduleList,
  handlePostSchedule,
  handlePutSchedule,
} from "@/api/schedule";

export default function useSchedule() {
  const recurrObject = useRef(null);
  const { scheduleListData, isScheduleListLoading, isScheduleListError } =
    handleGetScheduleList();
  const { postSchedule, postPending, postError, postSuccess } =
    handlePostSchedule();
  const { putSchedule, putPending, putError, putSuccess } = handlePutSchedule();
  const { deleteSchedule, deletePending, deleteError, deleteSuccess } =
    handleDeleteSchedule();

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

  const handleCompleteAction = (e: ActionEventArgs) => {
    console.log(e);
    const { requestType, addedRecords, changedRecords, deletedRecords } = e;

    switch (requestType) {
      case "eventCreated":
        //@ts-ignore
        postSchedule(addedRecords[0]);
        break;
      case "eventChanged":
        //@ts-ignore
        putSchedule(changedRecords[0]);
        break;
      case "eventRemoved":
        console.log("eventDeleted", deletedRecords);
        //@ts-ignore
        deleteSchedule(deletedRecords[0]);
        break;
      default:
        break;
    }
  };

  return {
    data: scheduleListData,
    isLoading: isScheduleListLoading,
    error: isScheduleListError,
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
