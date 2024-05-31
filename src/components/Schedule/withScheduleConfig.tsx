import { L10n, loadCldr, registerLicense } from "@syncfusion/ej2-base";

import { SYNCFUSION_API_KEY } from "@/helpers/envs";
import { caGregorian } from "./helpers/ca-gregorian";
import { numberingSystems } from "./helpers/numberingSystems";
import { numbers } from "./helpers/numbers";
import { timeZoneNames } from "./helpers/timeZoneNames";
import { localesPt } from "./helpers/locales";
import React, { ComponentType } from "react";

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

L10n.load({
  pt: localesPt.pt,
});

registerLicense(SYNCFUSION_API_KEY);

function withSyncFusionConfig<T extends {}>(
  WrappedComponent: ComponentType<T>,
) {
  loadCldr(caGregorian, numberingSystems, numbers, timeZoneNames);

  return class extends React.Component<T> {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSyncFusionConfig;
