import React from 'react'
import {createStore} from 'redux'

function addFn (state, action) {
	if (action.type === 'add') {
		return [...state, action.data]
	}
	if (action.type === 'concat') {
		return [...state, ...action.data]
	}
	return [...state]
}
function reducer(state={olList:[]}, action) {
	return {
		olList: addFn(state.olList, action)
	}
}
let store =createStore(reducer)
export default store