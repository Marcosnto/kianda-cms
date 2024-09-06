import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
  Table,
  Video,
  Audio,
  PasteCleanup,
} from "@syncfusion/ej2-react-richtexteditor";
import "./rich-text-editor.css";
import { Noop, RefCallBack, UseFormRegisterReturn } from "react-hook-form";

interface RichTextEditorType {
  change: (...event: any[]) => void;
  blur: Noop;
  value: string;
}

function RichTextEditor(props: RichTextEditorType) {
  let rteObj: RichTextEditorComponent;
  const { change, blur, value } = props;
  return (
    <div className="control-pane">
      <div className="control-section" id="rte">
        <div className="rte-control-section">
          <RichTextEditorComponent
            // beforeImageUpload={(e) => console.log(e)}
            enableTabKey
            name="content"
            change={(e) => {
              return change(e.value);
            }}
            insertImageSettings={{
              saveFormat: "Blob",
            }}
            blur={blur}
            value={value}
            ref={(richtexteditor) => {
              //@ts-ignore
              rteObj = richtexteditor;
            }}
          >
            <Inject
              services={[
                HtmlEditor,
                Toolbar,
                Image,
                Link,
                QuickToolbar,
                Table,
                Video,
                Audio,
                PasteCleanup,
              ]}
            />
          </RichTextEditorComponent>
        </div>
      </div>
    </div>
  );
}
export default RichTextEditor;
