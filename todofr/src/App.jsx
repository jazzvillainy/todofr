import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import TodoApp from "./TodoApp";
import RootLayout from "./RootLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<TodoApp/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
