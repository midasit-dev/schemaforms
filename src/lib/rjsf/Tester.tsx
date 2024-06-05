import React from "react";
import { RjsfForm, toRJSFSchema } from "../../lib";

import moa from '@midasit-dev/moaui';

import Editor from '@monaco-editor/react';

const App = () => {
	const [inputSchema, setInputSchema] = React.useState(functionSchema);
  const [data, setData] = React.useState(null);

	const [leftBottomShow, setLeftBottomShow] = React.useState(true);
	const [rightBottomShow, setRightBottmShow] = React.useState(true);

  return (
    <div>
      <moa.GuideBox row height="100vh" spacing={10} paddingRight={10}>
        <div style={{ width: "50%", height: "inherit" }}>
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
        <div style={{ width: "50%", height: "inherit" }}>
          <RjsfForm
            schema={toRJSFSchema(inputSchema)}
            formData={data}
            onChange={(e: any) => setData(e.formData)}
            onSubmit={(d: any, e: any) => console.log(d, e)}
            onError={(e: any) => console.log(e)}
          />
        </div>
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

      <div style={{ position: "fixed", right: 10, bottom: 10, minWidth: 300 }}>
        <moa.GuideBox spacing={2} horRight>
          <moa.Button color="negative" onClick={() => setRightBottmShow(!rightBottomShow)} >
            Data Toggle!
          </moa.Button>
          {rightBottomShow && (
            <moa.CodeBlock language="json" title="formData" width="100%">
              {JSON.stringify(data, null, 2)}
            </moa.CodeBlock>
          )}
        </moa.GuideBox>
      </div>
    </div>
  );
};

export default App;

const sampleCode = `
import React from 'react';
import { RjsfForm, toRJSFSchema } from '@midasit-dev/schemaforms';

const App = () => {
	const [data, setData] = React.useState(null);

	return (
		<RjsfForm
			schema={toRJSFSchema(functionSchema)}
			formData={data}
			onChange={(e: any) => setData(e.formData)}
			onSubmit={(d: any, e: any) => console.log(d, e)}
			onError={(e: any) => console.log(e)}
		/>
	)
}

export default App;
`;

const functionSchema = {
	"name": "text_to_plate_mesh",
	"parameters": {
		"type": "object",
		"properties": {
			"text": {
				"type": "string",
				"description": "The text to convert"
			},
			"color": {
				"type": "object",
				"description": "The color of the text RGB, [0~255, 0~255, 0~255]",
				"properties": {
					"r": {
						"type": "integer",
						"description": "The red component of the color"
					},
					"g": {
						"type": "integer",
						"description": "The green component of the color"
					},
					"b": {
						"type": "integer",
						"description": "The blue component of the color"
					}
				}
			},
			"insert": {
				"type": "string",
				"description": "The insert point of the text (lower left corner)"
			},
			"height": {
				"type": "string",
				"description": "The height of the text"
			}
		},
		"required": ["text", "color", "insert", "height"]
	},
	"description": "Convert the text to a plate mesh and upload the image as a triangular mesh to MIDAS CIVIL."
}