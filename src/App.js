import React, { useEffect } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Header } from './components'
import { Home, Cart } from './pages'
import { setPizzas } from './redux/actions/pizzas.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      dispatch(setPizzas(data.pizzas))
    })
  }, [])

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Route path="/" component={Home} exact/>
          <Route path="/cart" component={Cart} exact/>
        </div>
      </div>
    </div>
  )
}

export default App