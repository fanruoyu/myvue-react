import {createStore} from 'redux'
function reducer (state = 0, action) {
	if (action.type === 'increament') {
		return state += action.step
	} else if (action.type === 'decreament') {
		return state -= action.step
	} else  {
		return state
	}
}
function actionFn (type,  step) {
	return {
		type : type,
		step: step
	}
}
let store = createStore(reducer)
let add = document.getElementById('add')
let decrease = document.getElementById('decrease')
let count = document.getElementById('count')
add.addEventListener('click', () => {
	store.dispatch(actionFn('increament', 2))
})
decrease.addEventListener('click', () => {
	store.dispatch(actionFn('decreament', 1))
})
store.subscribe(function() {
	count.innerHTML = store.getState()
})



// function reducer (state = 0, action) {
//     console.log(action)
//     if (action.type === 'increament') {
//         return state += action.step
//     } else if (action.type === 'decreament') {
//         return state -= action.step
//     }
// }
// let action = {
//     type : 'increament',
//     step: 2
// }
// let store = createStore(reducer)
// store.dispatch(action)
// console.log(store.getState())