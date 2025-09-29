import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { fetchWorldBankData, fetchUNDPData } from '../utils/api'

const DataContext = createContext()

const initialState = {
  loading: false,
  data: [],
  filters: {
    country: '',
    region: '',
    year: '2022',
    indicator: 'poverty',
    gender: 'all'
  },
  error: null
}

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  useEffect(() => {
    loadData()
  }, [state.filters])

  const loadData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      let data
      if (state.filters.indicator === 'poverty') {
        data = await fetchWorldBankData(state.filters)
      } else {
        data = await fetchUNDPData(state.filters)
      }
      dispatch({ type: 'SET_DATA', payload: data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const updateFilters = (newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters })
  }

  return (
    <DataContext.Provider value={{
      ...state,
      updateFilters
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}