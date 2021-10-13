import { combineReducers } from 'redux'

import filterReducer from './filters'
import PizzaReducer from './pizzas'

const rootReducer = combineReducers({
  filters: filterReducer,
  pizzas: PizzaReducer
})

export default rootReducer