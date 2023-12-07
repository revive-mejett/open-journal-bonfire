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
import BonfireStatistics from "./pages/BonfireStatistics";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <Topbar />
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/entries/browse" element={<JournalEntriesPage />} />
                <Route path="/entries/new" element={<CreateEntryPage />} />
                <Route path="/entries/viewing" element={<JournalEntryDetail />} />
                <Route path="/entries/error" element={<NotFound
                    primaryMessage="It seems that the journal entry page you're looking for is not found. It might already got thrown into the bonfire."
                    secondaryMessage="Entries can't stay hanging here. We need to burn them eventually." />} />
                
                <Route path="/bonfire-statistics" element={<BonfireStatistics/>}/>

                {/* Display 404 page not found if no routes match the above */}
                <Route path="*" element={<NotFound
                    primaryMessage="Whoops. You tried to venture off to a route that leads to nowhere and therefore does not exist!"
                    secondaryMessage="Double check your URL. Perhaps somebody gave you the wrong directions! " />} />
            </Routes>
            <Footer/>
        </>
    );
};

export default App;