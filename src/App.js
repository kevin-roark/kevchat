import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Chat from './components/chat'
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Home} />
        <Route path='/chat/:user' component={Chat} />
      </div>
    </Router>
  )
}

export default App
