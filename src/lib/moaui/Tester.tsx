import React from "react";
import Editor from "@monaco-editor/react";
import moa from "@midasit-dev/moaui";
import { toMoauiSchema } from "../transform";

const Tester = () => {
  const [inputSchema, setInputSchema] = React.useState(functionSchema);

	const [leftBottomShow, setLeftBottomShow] = React.useState(true);

  return (
    <div>
      <moa.GuideBox width="100%" row>
        <div style={{ width: "50%", height: "100vh" }}>
          <Editor
            theme="vs-dark"
            width="100%"
            defaultLanguage="json"
            defaultValue={JSON.stringify(inputSchema, null, 2)}
            onChange={(value: string | undefined, ev: any) => {
              try {
                const parsed = JSON.parse(value || "");
                if (parsed) {
                  setInputSchema(parsed);
                }
              } catch (err) {
                console.error("Error Parsing JSON", err);
              }
            }}
          />
        </div>
        <moa.Scrollbars
          width="50%"
          height="100vh"
          panelProps={{
            padding: 0,
          }}
        >
          <div style={{ width: "100%", height: "auto" }}>
            <moa.CodeBlock
              language="json"
              title="Converted MOAUI Schema"
              radius={0}
            >
              {JSON.stringify(toMoauiSchema(inputSchema), null, 2)}
            </moa.CodeBlock>
          </div>
        </moa.Scrollbars>
      </moa.GuideBox>

      <div style={{ position: "fixed", left: 10, bottom: 10 }}>
        <moa.GuideBox spacing={2} horRight>
          <moa.Button onClick={() => setLeftBottomShow(!leftBottomShow)}>
            Sample Code Toggle!
          </moa.Button>
          {leftBottomShow && (
            <moa.CodeBlock title="Sample Code" language="ts">
              {sampleCode}
            </moa.CodeBlock>
          )}
        </moa.GuideBox>
      </div>
    </div>
  );
};

export default Tester;

const sampleCode = `
import { toMoauiSchema } from '@midasit-dev/schemaforms';

const moauiSchema = toMoauischema(functionSchema);
`;

const functionSchema = {
  name: "text_to_plate_mesh",
  parameters: {
    type: "object",
    properties: {
      text: {
        type: "string",
        description: "The text to convert",
      },
      insert: {
        type: "string",
        description: "The insert point of the text (lower left corner)",
      },
      height: {
        type: "string",
        description: "The height of the text",
      },
    },
    required: ["text", "color", "insert", "height"],
  },
  description:
    "Convert the text to a plate mesh and upload the image as a triangular mesh to MIDAS CIVIL.",
};
