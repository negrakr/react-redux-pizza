import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Header } from './components'
import { Home, Cart } from './pages'
import { setPizzas } from './redux/actions/pizzas.js'

// function App() {
//   useEffect(() => {
//     axios.get('http://localhost:3000/db.json').then(({ data }) => {
//       setPizzas(data.pizzas)
//     })
//   }, [])

//   return (
    
//   );
// }

class App extends React.Component {
  componentDidMount() {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      this.props.setPizzas(data.pizzas)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <Route path="/" render={() => <Home items={this.props.items} />} exact/>
            <Route path="/cart" component={Cart} exact/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.pizzas.items,
    filters: state.filters
  }
}

const mapDispatchToProps = {
    setPizzas
}

export default connect(mapStateToProps, mapDispatchToProps)(App)