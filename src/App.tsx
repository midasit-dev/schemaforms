import React, { Fragment } from "react";
import RjsfTester from "./lib/rjsf/tester";
import RjsfWithMoauiTester from './lib/rjsf-with-moaui/Tester';
import MoauiTester from './lib/moaui/Tester';
import moa from '@midasit-dev/moaui';

const App = () => {
	const [selectName, setSelectName] = React.useState("home");

	return (
    <Fragment>
      {selectName === "home" && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            background:
              "linear-gradient(rgba(211, 211, 211, .9) 30%, rgba(255, 142, 83, .4) 90%)",
          }}
        >
          <moa.GuideBox spacing={2} padding={5} width="100%" center>
            <moa.Typography variant="h1" size="medium">
              SchemaForms Testers
            </moa.Typography>
            <moa.Panel>
              <moa.GuideBox spacing={1}>
                <moa.Button
                  onClick={() => setSelectName("rjsf")}
                  color="negative"
                  width="100%"
                >
                  react-jsonschema-form tester
                </moa.Button>

                <moa.Button
                  onClick={() => setSelectName("rjsf-with-moaui")}
                  color="negative"
                  width="100%"
                >
                  rjsf with moaui
                </moa.Button>

                <moa.Button
                  onClick={() => setSelectName("moaui")}
                  color="negative"
                  width="100%"
                >
                  moaui tester
                </moa.Button>
              </moa.GuideBox>
            </moa.Panel>
          </moa.GuideBox>
        </div>
      )}
      {selectName === "rjsf" && <RjsfTester />}
			{selectName === "rjsf-with-moaui" && <RjsfWithMoauiTester />}
      {selectName === "moaui" && <MoauiTester />}
    </Fragment>
  );
};

export default App;