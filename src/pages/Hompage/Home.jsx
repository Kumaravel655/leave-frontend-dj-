import React from 'react';
import LoginPage from '../../components/Common/LoginPage/LoginPage';
import SignUp from '../../components/employe/Signup/SignUp';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const { mode } = useParams();
  const navigate = useNavigate();

  const renderContent = () => {
    if (mode === "login") {
      return <LoginPage />;
    } else if (mode === "signup") {
      return <SignUp />;
    } else {
      return <LoginPage />;
    }
  };

  const handleToggle = () => {
    if (mode === "signup") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <button onClick={handleToggle} className="px-4 py-2 bg-[#4D49B3] text-white rounded">
            {mode === "signup" ? "Login" : "Sign Up"}
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
