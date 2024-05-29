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

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpceHZURWZcUUN1W0M=",
);

L10n.load({
  "pt-BR": locale,
});

const data: object[] = [
  {
    Id: 1,
    Subject: "Meeting - 1",
    StartTime: new Date(2024, 4, 15, 10, 0),
    EndTime: new Date(2024, 4, 16, 12, 30),
    IsAllDay: false,
  },
];

export default function Schedule() {
  const scheduleObj = useRef(null);
  const eventSettings = { dataSource: data };

  return (
    <ScheduleComponent
      height="80vh"
      eventSettings={eventSettings}
      selectedDate={new Date(2024, 4, 15)}
      ref={scheduleObj}
      actionComplete={(e) => console.log(e)}
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
