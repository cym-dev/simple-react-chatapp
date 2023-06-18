import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./Routes";
import { ToastContainer } from "react-toastify";
// import DevTools from "devtools-detect";

const App = () => {
  return (
    <BrowserRouter>
      <main className="h-100">
        <Routers />
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </BrowserRouter>
  );
};

export default App;
