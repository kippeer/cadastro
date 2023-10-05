import './App.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'


import { BrowserRouter as Router } from 'react-router-dom'
import Routes from "./rota"

export default props =>
  <Router>
    <div className="app">
      <Logo />
      <Nav />
      <Routes />
      <Footer />
    </div>
  </Router>