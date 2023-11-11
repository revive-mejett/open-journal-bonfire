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
                <Route path="/entries/browse" element={<JournalEntriesPage />} />
                <Route path="/entries/new" element={<CreateEntryPage />} />
                <Route path="/entries/viewing" element={<JournalEntryDetail />} />
                <Route path="/entries/error" element={<JournalEntryDetail />} />

                {/* Display 404 page not found if no routes match the above */}
                <Route path="*" element={<NotFound
                    primaryMessage="Whoops. You tried to venture off to a route that leads to nowhere and therefore does not exist!"
                    secondaryMessage="Double check your URL. Perhaps somebody gave you the wrong directions! " />} />
            </Routes>
        </>
    );
};

export default App;