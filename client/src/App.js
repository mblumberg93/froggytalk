import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return (
      <div className="wrapper">
        <h1>froggytalk</h1>
        <Login setToken={setToken} />
      </div>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Dashboard />}>
      </Route>
    )
  );

  return (
    <div className="wrapper">
      <h1>froggytalk</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
