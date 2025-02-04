import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main'
import Greeting from './pages/Greeting/Greeting'
import Register from './pages/ForRegistration/Register/Register'
import Login from './pages/ForLogin/Login/Login'
import MainRegister from './pages/ForRegistration/MainRegister/MainRegister'
import PhoneRegister from './pages/ForRegistration/PhoneRegister/PhoneRegister'
import Verify from './pages/ForRegistration/Verify/Verify'
import ForgetPas from './pages/ForLogin/ForgetPas/ForgetPas'
import NewPas from './pages/ForLogin/NewPas/NewPas'
import Sms from './pages/ForLogin/Sms/Sms';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Greeting />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainRegister" element={<MainRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/phone" element={<PhoneRegister />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forget" element={<ForgetPas />} />
        <Route path="/sms" element={<Sms />} />
        <Route path="/newpas" element={<NewPas />} />
      </Routes>
    </Router>
  );
}

export default App