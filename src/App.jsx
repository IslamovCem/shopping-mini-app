import React, { useState } from "react";
import Catalog from "./components/Catalog";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="app-container">
      <header>
        <h1>{isAdmin ? "Admin Panel" : "Katalog"}</h1>
        <button onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? "Foydalanuvchi" : "Admin"}
        </button>
      </header>
      {isAdmin ? <AdminPanel /> : <Catalog />}
    </div>
  );
}