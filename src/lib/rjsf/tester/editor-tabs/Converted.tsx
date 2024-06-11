import * as React from 'react';
import Editor from '@monaco-editor/react';

const Converted = (props: any) => {
	const { setInputSchema } = props;
	React.useEffect(() => setInputSchema(functionSchema), [setInputSchema]);

	return (
    <Editor
      theme="vs-dark"
      width="100%"
      defaultLanguage="json"
      defaultValue={JSON.stringify(functionSchema, null, 2)}
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
  );
}

export default Converted;

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