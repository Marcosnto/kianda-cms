import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";

import { registerLicense, L10n } from "@syncfusion/ej2-base";
import * as locale from "@syncfusion/ej2-locale/src/pt-BR.json";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { useRef } from "react";
import useSchedule from "./schedule.hook";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpceHZURWZcUUN1W0M=",
);

L10n.load({
  "pt-BR": locale,
});

export default function Schedule() {
  const { data, handleCompleteAction } = useSchedule();
  const scheduleObj = useRef(null);
  const eventSettings = { dataSource: data };

  return (
    <ScheduleComponent
      height="80vh"
      eventSettings={eventSettings}
      selectedDate={new Date(2018, 1, 15)}
      ref={scheduleObj}
      actionComplete={handleCompleteAction}
      // locale="pt-BR"
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
