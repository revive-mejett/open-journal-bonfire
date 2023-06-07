import React from "react";
import { Route, Routes } from "react-router-dom";
import MatchEntries from "./components/MatchEntries";

const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<MatchEntries/>}/>
     </Routes>
   </div>
 );
};
 
export default App;