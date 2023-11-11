import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss"
import "./components/visuals/Background.scss";
import Topbar from "./components/Topbar";
import JournalEntriesPage from "./pages/JournalEntriesPage";
import CreateEntryPage from "./pages/CreateEntryPage";
import JournalEntryDetail from "./pages/JournalEntryDetail";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <>
            <Topbar />
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/entries/browse" element={<JournalEntriesPage />} />
                <Route exact path="/entries/new" element={<CreateEntryPage />} />
                <Route exact path="/entries/viewing" element={<JournalEntryDetail />} />
                <Route exact path="/entries/error" element={<JournalEntryDetail />} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
};

export default App;