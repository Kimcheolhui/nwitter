import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
              <Route path="*" element={<Home userObj={userObj} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default AppRouter;
