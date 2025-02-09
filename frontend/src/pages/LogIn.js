import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate(); 
  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <>
      <h1> Log In </h1>
      <div className="mb-3 d-flex align-items-center">
        <label>Username: </label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="form-control border-2 border-gray-300 rounded-lg w-40 h-8 resize-x focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2 ml-2 "
            style={{ width: '100px' }}
          />
      </div>

      <div className="mb-3 d-flex align-items-center">
        <label>Course Code: </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control border-2 border-gray-300 rounded-lg w-40 h-8 resize-x focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2 ml-2 "
            style={{ width: '100px' }}
          />
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Log In
      </button>
    </>
  );
}