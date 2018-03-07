import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'
import Home from './routes/home'
import ChatFrom from './routes/chatFrom'
import Dashboard from './routes/dashboard'
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />

          <Route exact path="/chat" component={Home} />
          <Route path='/chat/:user' component={ChatFrom} />

          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </Provider>
  )
}

export default App
