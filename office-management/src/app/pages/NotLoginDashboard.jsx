'use client'


import { useAuthState } from "react-firebase-hooks/auth";
import { author } from "../../../firebase/clientApp";

import './NotLoginDashboard.css'
import Homepage from "../Homepage";
// import Dashboardtwo from "./Tem";

export default function NotLoginDashboad() {
  const [user, loading, error] = useAuthState(author);

  if (loading) {
    return (
      <div className="container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {user ? (
        <div className="">
          <Homepage/>
        </div>
      ) : (
        <div className="welcomeBox">
          <h2>You are not logged in</h2>
          <p className="info">
            Please{" "}
            <a className="loginLink" href="/auth">
              login here
            </a>{" "}
            to access your office dashboard.
          </p>
          
        </div>
      )}
    </div>
  );
}