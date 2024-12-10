import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/Admincontext.jsx";
import TeacherContextProvider from "./context/TeacherContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <TeacherContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </TeacherContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
