import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import TodoApp from "./routes/TodoApp";
import RootLayout from "./RootLayout";
import NotesApp from "./routes/NotesApp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<NotesApp />} />
          <Route path="/notes" element={<TodoApp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
