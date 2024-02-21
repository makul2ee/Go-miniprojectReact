import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Signin';
import Register from './components/Register';
import Nav from './components/Nav';
import Card from './components/Card';
import Teacher from './components/Teacher';
import TeachersList from './components/Teacherformfind';
import SubjectList from './components/Subjectformfind';
import StudentList from './components/Studentformfind';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleRegisterSuccess = () => {
    setIsRegister(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="bg-gray-800 text-white p-4">
        <Nav isLoggedIn={isLoggedIn} isRegister={isRegister} onLogout={handleLogout} />
        <Routes>
          <Route path="/signin" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/" element={<Card isLoggedIn={isLoggedIn} />} />
          <Route path="/teachers" element={<TeachersList />} />
          <Route path="/subjects" element={<SubjectList/>} />
          <Route path="/students" element={<StudentList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
