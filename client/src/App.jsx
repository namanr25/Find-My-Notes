import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Search from "./Pages/Search";
import About from "./Pages/About";
import Upload from "./Pages/Upload";
import Faq from "./Pages/Faq";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      <Header />

      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {isAuthenticated ? (
            <>
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </Router >
  );
};

export default App;