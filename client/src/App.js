import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss"
import "./components/visuals/Background.scss";
import Topbar from "./components/Topbar";
import JournalEntriesPage from "./pages/JournalEntriesPage";
import CreateEntryPage from "./pages/CreateEntryPage";
import JournalEntryDetail from "./pages/JournalEntryDetail";
import Homepage from "./pages/Homepage";
import Background from "./components/visuals/Background";

const App = () => {
    return (
        <>
            <Topbar />
            <Background></Background>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/entries/browse" element={<JournalEntriesPage />} />
                <Route exact path="/entries/new" element={<CreateEntryPage />} />
                <Route exact path="/entries/viewing" element={<JournalEntryDetail />} />
            </Routes>
        </>
    );
};

export default App;