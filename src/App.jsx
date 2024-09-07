import { useEffect, useState } from "react";
import { LoadingSpinner } from "./components";
import "./App.css";
import authService from "./service/auth";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "./components/index.js";
function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
          // return <LoadingSpinner />;
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  // loading true

  if (loading) {
    return <LoadingSpinner />;
  }

  // loading false

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
