import { useRef } from "react";

import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

import useSchedule from "./schedule.hook";
import withSyncFusionConfig from "./withScheduleConfig";

function Schedule(this: any) {
  const scheduleObj = useRef(null);

  const { data, handleCompleteAction, editorWindowComponent, onPopupClose } =
    useSchedule();

  const eventSettings = { dataSource: data };
  const today = new Date();

  // const workHours = {
  //   highlight: true,
  //   start: "11:00",
  //   end: "20:00",
  // };

  return (
    <ScheduleComponent
      height="80vh"
      eventSettings={eventSettings}
      selectedDate={today}
      ref={scheduleObj}
      actionComplete={handleCompleteAction}
      editorTemplate={editorWindowComponent}
      showQuickInfo={false}
      popupClose={onPopupClose}
      // workHours={workHours}
      // workDays={[1, 2, 3, 4, 5]}
      locale="pt"
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="Month" />
        <ViewDirective option="Agenda" />
      </ViewsDirective>
      <Inject services={[Day, Week, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default withSyncFusionConfig(Schedule);
