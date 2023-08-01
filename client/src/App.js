import React from "react";
import { Route, Routes } from "react-router-dom";
import MatchEntriesPage from "./pages/MatchEntriesPage";
import "./App.scss"

const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<MatchEntriesPage/>}/>
     </Routes>
   </div>
 );
};
 
export default App;