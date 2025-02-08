import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NAVBAR from "./navbar";
import HOME from "./home";
import FOOT from "./footer";
import LOGIN from "./login";
import SIGNUP from "./sign-up";
import INT from "./intern";
import PRO from "./profile";
import SCH from "./scholar";
import FYP from "./FYP";
import FORG from "./forg";
import ADDIN from "./addintern";
import ADDSHC from "./addshc";
import ADDFYP from "./addfyp";

function PublicRoutes() {
  return (
    <Router>
      <div className="bg-gradient-to-b from-black via-[#1A041C] to-[#CB1EDB]
 text-white min-h-screen">
      
    <NAVBAR/>
        <Routes>
          <Route path="/" element={<HOME />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/signup" element={<SIGNUP />} />
          <Route path="/intern" element={<INT />} />
          <Route path="/scholar" element={<SCH />} />
          <Route path="/fyp" element={<FYP />} />
          <Route path="/profile" element={<PRO />} />
          <Route path="/forgot" element={<FORG />} />
          <Route path="/addin" element={<ADDIN />} />
          <Route path="/addshc" element={<ADDSHC />} />
          <Route path="/addfyp" element={<ADDFYP />} />
          
        </Routes>

        <FOOT />
      </div>
    </Router>
  );
}

export default PublicRoutes;

