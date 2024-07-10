import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SelectTypeUser from "./Screens/SelectTypeUser";
import LoginBasicUsers from "./Screens/LoginBasicUsers";
import LoginAdmins from "./Screens/LoginAdmins";
import  Dashboard from "./Screens/Dashboard";
import Users from "./Screens/Users";
import Doors from "./Screens/Doors";
import Footer from "./components/Footer";

function App() {

  return (
    <React.Fragment>

      <Router>

        <Navbar/>
          <br/>          
          <div  className="container">
            <Routes>
              <Route path="/" element={<SelectTypeUser/>}/> 
              <Route path="/SelectTypeUser" element={<SelectTypeUser/>}/>                
              <Route path="/LoginBasicUsers" element={<LoginBasicUsers/>}/> 
              <Route path="/LoginAdmins" element={<LoginAdmins/>}/> 
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/doors" element={<Doors/>}/>              
            </Routes>
          </div>
          <Footer/>
      </Router>
    </React.Fragment>
  )
}
export default App;