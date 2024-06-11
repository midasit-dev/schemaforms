import * as React from 'react';
import Editor from '@monaco-editor/react';

const Raw = (props: any) => {
	const { setInputSchema } = props;
	React.useEffect(() => setInputSchema(jsonSchema), [setInputSchema]);

	return (
    <Editor
      theme="vs-dark"
      width="100%"
      defaultLanguage="json"
      defaultValue={JSON.stringify(jsonSchema, null, 2)}
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
 
export default Raw;

const jsonSchema = {
  "type": "object",
  "properties": {
    "arguments": {
      "type": "object",
      "properties": {
        "vertices": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "default": [
            [0.0, 0.0],
            [400.0, 0.0],
            [400.0, 600.0],
            [0.0, 600.0],
            [0.0, 0.0]
          ]
        }
      }
    }
  }
}

// const openapiSchema = {
//   type: "object",
//   properties: {
//     openapi: "3.0.0",
//     servers: [
//       {
//         url: "https://moa.rpm.kr-dv-midasit.com/backend/function-executor",
//         description: "MOA AWS SERVER",
//       },
//     ],
//     info: {
//       description: "스키마 to UI 생성 테스트",
//       version: "1.0.0",
//       title: "스키마 to UI 생성 테스트",
//     },
//     paths: {
//       "/python-execute": {
//         post: {
//           tags: ["Section Properties C"],
//           summary: "Calc Sect Properties C",
//           description: "Calculate Section Properties C",
//           responses: {
//             "200": { description: "Success" },
//             "400": { description: "invalid input, object invalid" },
//           },
//           requestBody: {
//             content: {
//               "application/json": {
//                 schema: {
//                   $ref: "#/components/schemas/SectionPropertiesC",
//                 },
//               },
//             },
//             description: "Calcualte Section Props C",
//           },
//         },
//       },
//     },
//     components: {
//       schemas: {
//         SectionPropertiesC: {
//           type: "object",
//           properties: {
//             packageName: {
//               type: "string",
//               default: "moapy",
//             },
//             fileName: {
//               type: "string",
//               default: "section_property",
//             },
//             functionName: {
//               type: "string",
//               default: "mdreport",
//             },
//             arguments: {
//               type: "object",
//               properties: {
//                 vertices: {
//                   type: "array",
//                   default: [
//                     [0.0, 0.0],
//                     [400.0, 0.0],
//                     [400.0, 600.0],
//                     [0.0, 600.0],
//                     [0.0, 0.0],
//                   ],
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };