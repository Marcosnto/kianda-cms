import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";

const editorWindowTemplate = (props: any) => {
  const { recurrObject } = props;

  const ownerData = [
    { OwnerText: "Nancy", Id: 1, OwnerColor: "#ffaa00" },
    { OwnerText: "Steven", Id: 2, OwnerColor: "#f8a398" },
    { OwnerText: "Michael", Id: 3, OwnerColor: "#7499e1" },
  ];

  const fields = { text: "OwnerText", value: "Id" };

  return props !== undefined ? (
    <table
      className="custom-event-editor"
      style={{ width: "100%", padding: "5" }}
    >
      <tbody>
        <tr>
          <td className="e-textlabel">Paciente</td>
          <td colSpan={4}>
            <MultiSelectComponent
              className="e-field"
              placeholder="Choose owner"
              data-name="OwnerId"
              dataSource={ownerData}
              fields={fields}
              value={props.OwnerId}
            />
          </td>
        </tr>

        <tr>
          <td>Assunto</td>
          <td colSpan={4}>
            <input
              id="Summary"
              className="e-field e-input"
              type="text"
              name="Subject"
              style={{ width: "100%" }}
            />
          </td>
        </tr>

        <tr>
          <td className="e-textlabel">Inicio</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="StartTime"
              data-name="StartTime"
              value={new Date(props.startTime || props.StartTime)}
              className="e-field"
              locale="pt"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Fim</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yyyy hh:mm a"
              id="EndTime"
              data-name="EndTime"
              value={new Date(props.endTime || props.EndTime)}
              className="e-field"
              locale="pt"
            ></DateTimePickerComponent>
          </td>
        </tr>

        <tr>
          <td className="e-textlabel">Frequência</td>
          <td colSpan={4}>
            <RecurrenceEditorComponent
              ref={recurrObject}
              data-name="RecurrenceEditor"
              id="RecurrenceEditor"
              locale="pt"
            />
          </td>
        </tr>

        <tr>
          <td className="e-textlabel">Descrição</td>
          <td colSpan={4}>
            <textarea
              id="Description"
              className="e-field e-input"
              name="Description"
              rows={3}
              cols={50}
              style={{
                width: "100%",
                height: "60px !important",
                resize: "vertical",
              }}
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div></div>
  );
};

export default editorWindowTemplate;
