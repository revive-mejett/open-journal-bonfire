import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss"
import Topbar from "./components/Topbar";
import JournalEntriesPage from "./pages/JournalEntriesPage";

const App = () => {
 return (
   <div>
    <Topbar/>
     <Routes>
       <Route exact path="/" element={<JournalEntriesPage/>}/>
     </Routes>
   </div>
 );
};
 
export default App;