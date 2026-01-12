import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
 import Login from "./pages/Auth/Login"
  import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import {Toaster} from "react-hot-toast";
import UserProvider from "./context/UserContext";
import './index.css'
// import ChatBot from "./components/ChatBotCode/ChatBot";
import ChatWidget from "./components/ChatBotCode/ChatWidget";

const App = () => {
  return (
    <UserProvider>
      <div>
      <Router>
        <Routes>
         
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
        {/* <ChatBot/> */}
        <ChatWidget/>
      </Router>
     
      </div>
      <div>
      <Toaster 
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px"
          }
        }}
        />
      </div>
      
    </UserProvider>
    
  );
};
export default App;

const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashbord is authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard"  />
   ) : (
   <Navigate to="/login"  />
   )
}
