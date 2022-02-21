import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './bootstrap.min.css';
import LandingPage from './Screens/LandingPage/LandingPage';
import MyNotes from './Screens/MyNotes/MyNotes';
import LoginPage from './Screens/LoginPage/LoginPage';
import RegisterPage from './Screens/RegisterPage/RegisterPage';
import SingleNote from './Screens/SingleNote/SingleNote';
import UpdateNote from './Screens/SingleNote/UpdateNote';
import ProfilePage from './Screens/ProfilePage/ProfilePage';

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path='/createnote' element={<SingleNote />} />
          <Route exact path='/profile' element={<ProfilePage />} />
          <Route exact path='/note/:id' element={<UpdateNote />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
};

export default App;
