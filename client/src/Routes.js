import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

//Errors
import ErrorNull from "./page/errors/null";
import ErrorBad from "./page/errors/bad";

// Sessions
import Login from "./page/sessions/login";

// Platforms
import Chat from "./page/platforms/client";
import Dashboard from "./page/platforms";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Sessions */}
      <Route path="login" element={<Login />} />
      {/* Platforms */}
      <Route path="platforms" element={<Dashboard />}>
        <Route path="msg" element={<Chat />} />
        {/* Error 400 */}
        <Route path="" element={<ErrorBad />} />
      </Route>
      {/* Platforms */}

      {/* Error 404 */}
      <Route path="*" element={<ErrorNull />} />
    </Routes>
  );
};

export default Routers;
