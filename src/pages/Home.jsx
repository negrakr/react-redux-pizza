import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components/index'

import { setCategory, setSortBy } from '../redux/actions/filters'
import { fetchPizzas } from '../redux/actions/pizzas.js'

const categoryNames = [
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые'
]
const sortIems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc'},
  { name: 'алфавиту', type: 'name', order: 'asc'}
]

function Home() {
  const dispatch = useDispatch()
  const items = useSelector(({ pizzas }) => pizzas.items)
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded)
  const { category, sortBy } = useSelector(({ filters }) => filters)

  useEffect(() => {
    // if (!items.length) {
    //   dispatch(fetchPizzas())
    // }
    dispatch(fetchPizzas(sortBy, category))
  }, [category, sortBy])

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index))
  }, [])

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type))
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortIems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoaded
          ? items.map((obj) =>
              <PizzaBlock
                key={obj.id}
                {...obj}
              />  
            )
          : Array(12).fill(0).map((_, index) => <PizzaLoadingBlock key={index} />)
        }
      </div>
    </div>
  )
}

export default Home
