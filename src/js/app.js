import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Index from './pages/index'

class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Index} />
        </Router>
      </div>
    )
  }
}

export default App
