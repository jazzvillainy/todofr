import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import TodoApp from "./routes/TodoApp";
import RootLayout from "./RootLayout";
import NotesApp from "./routes/NotesApp";
import NotesEditor from "./components/NotesEditor";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index path="/" element={<Signup />} />
          <Route path="/notesapp" element={<NotesApp />} />
          <Route path="/notes" element={<TodoApp />} />
          <Route path="/notesEditor/:id" element={<NotesEditor />} />
          <Route path="/signin" element={<Login />} />
        </Route>
      </Routes>
    </div>  
  );
}

export default App;
