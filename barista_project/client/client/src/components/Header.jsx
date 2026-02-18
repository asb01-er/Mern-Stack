import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verify user authentication
    const verifyUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/auth/verify", {
          withCredentials: true,
        });
        if (data.success) setUser(data.user);
        else setUser(null);
      } catch (err) {
        setUser(null);
      }
    };

    verifyUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="app_header">
      <div className="header_container">
        <h1>☕ Barista Hub</h1>
        {user && (
          <button className="logout_button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
