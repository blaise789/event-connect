import React from 'react';
import './index.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import DesktopLanding from './layout/Landing';
import LandingPage from './layout/Landing';

import Sharing from './components/Sharing';

import AuthenticationService from './layout/Authenticating'
import SignInOption from './layout/SignInOption';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import Home from './layout/Venue/Home'
import BookPage from './layout/Venue/Book';
import BuyingTicketProcess from './layout/Venue/BuyTicketProcess';
import BookEvent from './layout/Event/EventBooking'
import BookEventTicket from './Scenes/Event/BookingEvent'

import Testing from './components/SubComponents/BookingSteptest'

import Missing from './components/Missing';
import Location from './components/Location';
import Notification from './components/Notification';

function App() {
  return (
<div>
    <Routes>
      <Route path='/' exact element={<DesktopLanding/>}/>
      <Route path='/' exact element={<LandingPage/>}/>
      <Route path='/options' exact element={<SignInOption/>}/>
      <Route path='/location' exact element={<Location/>}/>
      <Route path='/authentication' exact element={<AuthenticationService/>}>
          <Route index element={<Login/>} />
          <Route path='/authentication/signup' element={<SignUp/>} />
          <Route path='/authentication/reset' element={<ResetPassword/>} />
          <Route path='/authentication/forgot' element={ <ForgotPassword/>} />
      </Route>
      <Route path ='/home' exact element={<Home/>}/>
      <Route path='/bookVenue/:id' exact element={<BookPage />} />
      <Route path='/bookVenueTicket/:id' exact element={<BuyingTicketProcess />}/>
      <Route path='/bookEvent/:id' exact element={<BookEvent/>}/>
      <Route path='/bookEventTicket/:id' exact element={<BookEventTicket/>}/>
      <Route path='/Notification' exact element={<Notification />} />
        <Route path='/testing' exact element={<Testing />} />
        <Route path='/sharing' exact element={<Sharing />} />
        <Route path='*' exact element={<Missing />} />
      </Routes>

      </div>
    
  );
}

export default App;

