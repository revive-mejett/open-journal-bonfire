import React from "react";
import { Route, Routes } from "react-router-dom";
import MatchEntriesPage from "./pages/MatchEntriesPage";
import "./App.scss"
import Topbar from "./components/Topbar";

const App = () => {
 return (
   <div>
    <Topbar/>
     <Routes>
       <Route exact path="/" element={<MatchEntriesPage/>}/>
     </Routes>
   </div>
 );
};
 
export default App;