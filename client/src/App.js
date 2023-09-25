import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss"
import Topbar from "./components/Topbar";
import JournalEntriesPage from "./pages/JournalEntriesPage";
import CreateEntryPage from "./pages/CreateEntryPage";

const App = () => {
 return (
   <div>
    <Topbar/>
     <Routes>
       <Route exact path="/" element={<JournalEntriesPage/>}/>
       <Route exact path="/entries/new" element={<CreateEntryPage/>}/>
     </Routes>
   </div>
 );
};
 
export default App;