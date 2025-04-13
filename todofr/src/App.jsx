import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import TodoApp from "./routes/TodoApp";
import RootLayout from "./RootLayout";
import NotesApp from "./routes/NotesApp";
import NotesEditor from "./components/NotesEditor";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import { NotesUpdator } from "./routes/NotesUpdator";
import { Dashboard } from "./routes/Dashboard";
import { Privateroute } from "./components/Privateroute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index path="/" element={<Signup />} />
          <Route
            path="/notesapp"
            element={
              <Privateroute>
                <NotesApp />
              </Privateroute>
            }
          />
          <Route
            path="/todos"
            element={
              <Privateroute>
                <TodoApp />
              </Privateroute>
            }
          />
          <Route
            path="/notesEditor"
            element={
              <Privateroute>
                <NotesEditor />
              </Privateroute>
            }
          />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/updator/:id"
            element={
              <Privateroute>
                <NotesUpdator />
              </Privateroute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Privateroute>
                <Dashboard />
              </Privateroute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
