import React from "react";
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import RjsfTester from "./lib/rjsf/Tester";
import MoauiTester from './lib/moaui/Tester';
import moa from '@midasit-dev/moaui';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(rgba(211, 211, 211, .9) 30%, rgba(255, 142, 83, .4) 90%)",
      }}
    >
      <moa.GuideBox spacing={2} padding={5} width="100%" center>
        <moa.Typography variant="h1" size="medium">
          SchemaForms Testers
        </moa.Typography>
        <moa.Panel>
          <moa.GuideBox spacing={1}>
            <moa.Button
              onClick={() => navigate("rjsf")}
              color="negative"
              width="100%"
            >
              React-JsonSchema-Form tester
            </moa.Button>

            <moa.Button
              onClick={() => navigate("moaui")}
              color="negative"
              width="100%"
            >
              moaui tester
            </moa.Button>
          </moa.GuideBox>
        </moa.Panel>
      </moa.GuideBox>
    </div>
  );
};

const App = () => {
	return (
    <BrowserRouter>
      <Routes>
        <Route path="rjsf" element={<RjsfTester />} />
        <Route path="moaui" element={<MoauiTester />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;