import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit'
import dataReducer from './features/data'
import thunk from 'redux-thunk'

const store = createStore(dataReducer, applyMiddleware(thunk))

export default store