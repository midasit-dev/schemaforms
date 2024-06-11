import React from "react";
import { RjsfForm, toRJSFSchema } from "../..";
import moa from '@midasit-dev/moaui';
import EditorConverted from './editor-tabs/Converted';
import EditorRaw from './editor-tabs/Raw';

enum TabValue {
	CONVERTED = "tab-converted",
	RAW = "tab-raw"
}

const App = () => {
	const [inputSchema, setInputSchema] = React.useState<any>({});
  const [data, setData] = React.useState(null);

	const [leftBottomShow, setLeftBottomShow] = React.useState(true);
	const [rightBottomShow, setRightBottmShow] = React.useState(true);

	const [tabValue, setTabValue] = React.useState<TabValue>(TabValue.CONVERTED);

  return (
    <div>
      <moa.GuideBox row height="100vh" spacing={10} paddingRight={10}>
        <div style={{ width: "50%", height: "inherit" }}>
          <moa.TabGroup
            value={tabValue}
            onChange={(e: any, newValue: any) => setTabValue(newValue)}
          >
            <moa.Tab value={TabValue.CONVERTED} label="converted" />
            <moa.Tab value={TabValue.RAW} label="raw" />
          </moa.TabGroup>
					{tabValue === TabValue.CONVERTED && <EditorConverted setInputSchema={setInputSchema} />}
					{tabValue === TabValue.RAW && <EditorRaw setInputSchema={setInputSchema} />}
        </div>
        <div style={{ width: "50%", height: "inherit" }}>
          <RjsfForm
            schema={((): any => {
							if (tabValue === TabValue.CONVERTED) return toRJSFSchema(inputSchema);
							if (tabValue === TabValue.RAW) return inputSchema;
							return { error: "tabValue is not defined" };
						})()}
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
          <moa.Button
            color="negative"
            onClick={() => setRightBottmShow(!rightBottomShow)}
          >
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
