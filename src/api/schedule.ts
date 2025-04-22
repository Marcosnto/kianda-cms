import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const handleGetScheduleList = () => {
  const {
    data: scheduleListData,
    isLoading: isScheduleListLoading,
    error: isScheduleListError,
  } = useQuery({
    queryKey: ["schedulesList"],
    queryFn: () =>
      axiosInstance
        .get("/schedules")
        .then(({ data }) => {
          return data;
        })
        .catch((error) => new Error(error)),
  });

  return { scheduleListData, isScheduleListLoading, isScheduleListError };
};

export const handlePostSchedule = () => {
  const {
    mutate: postSchedule,
    isPending: postPending,
    isError: postError,
    isSuccess: postSuccess,
  } = useMutation({
    mutationFn: (data) => axiosInstance.post("/schedule", data),
    onSuccess: () => console.log("Sucesso!"),
    onError: (err) => console.log("Deu erro", err),
  });

  return { postSchedule, postPending, postError, postSuccess };
};

export const handlePutSchedule = () => {
  const {
    mutate: putSchedule,
    isPending: putPending,
    isError: putError,
    isSuccess: putSuccess,
  } = useMutation({
    mutationFn: (data) =>
      //@ts-ignore
      axiosInstance.put(`/schedule/${data.calendarID}`, data),
    onSuccess: () => console.log("Editado!"),
    onError: (err) => console.log("Deu erro na edição", err),
  });

  return { putSchedule, putPending, putError, putSuccess };
};

export const handleDeleteSchedule = () => {
  const {
    mutate: deleteSchedule,
    isPending: deletePending,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useMutation({
    //@ts-ignore
    mutationFn: (data) => axiosInstance.delete(`/schedule/${data.calendarID}`),
    onSuccess: () => console.log("Deletado!"),
    onError: (err) => console.log("deu na deleção erro pai ", err),
  });

  return { deleteSchedule, deletePending, deleteError, deleteSuccess };
};
