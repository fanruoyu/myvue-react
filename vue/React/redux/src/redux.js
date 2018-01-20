import {createStore} from 'redux'
function count (state = 0, action) {
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
function getArr (state = [], action) {
	let arr = [...state]
	if (action.type === 'new_add') {
		arr.push(text.value)
		return arr
	}
	return arr
}
function reducer(state, action) {
	return {
		count: count(state.count, action),
		arr: getArr(state.arr, action)
	}
}
// 实现多个reducer函数存在
let store = createStore(reducer, {
	count: 1,
	arr: ['醉里挑灯看剑']
})
let increase = document.getElementById('increase')
let decrease = document.getElementById('decrease')
let countDom = document.getElementById('count')
let text = document.getElementById('text')
let add = document.getElementById('add')
increase.addEventListener('click', () => {
	store.dispatch(actionFn('increament', 2))
})
decrease.addEventListener('click', () => {
	store.dispatch(actionFn('decreament', 1))
})
add.addEventListener('click', function() {
	store.dispatch({
		type: 'new_add',
		count: 1
	})
	text.value = ''
	store.subscribe(function() {
		console.log(store.getState())
	})
})
store.subscribe(function() {
	countDom.innerHTML = store.getState().count
	console.log(store.getState())
})
