import React from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import AddNewEntries from "./pages/AddNewEntriesPage";
import ViewEntryPage from "./pages/ViewEntryPage";
import EditProductPage from "./pages/EditProductPage";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/userDetailsContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add" element={<AddNewEntries />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
          <Route path="/view/:id" element={<ViewEntryPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </UserProvider>
  );
};

export default App;
