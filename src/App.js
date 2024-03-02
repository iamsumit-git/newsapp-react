import './App.css';

import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
   pageSize =15;
  render() {
 
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key='general' pageSize={this.pageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News key='business' pageSize={this.pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News key='entertainment' pageSize={this.pageSize} country="in" category="entertainment" />} />
          <Route exact path="/health" element={<News key='health' pageSize={this.pageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News  key='science'pageSize={this.pageSize} country="in" category="science" />} />
          <Route exact path="/sport" element={<News key='sport' pageSize={this.pageSize} country="in" category="sport" />} />
          <Route exact path="/technology" element={<News key='technology' pageSize={this.pageSize} country="in" category="technology" />} />
        </Routes>
      </Router>
    );
  }
}

