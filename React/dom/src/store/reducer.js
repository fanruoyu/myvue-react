import {combineReducers} from 'redux'
function sex (state = 0, action) {
	if (action.type === 'updata_sex') {
		state = action.data
	}
	return state
}

function illness (state=[], action) {
	if (action.type == 'yes') {
		state = action.data
	}
	return state
}

function food (state=[], action) {
	if (action.type === '1') {
		state = action.data
	}
	return state
}

function unlike (state = [], action) {
	if (action.type === 'updata_unlike') {
		state = action.data
	}
	return state
}

function feel (state=[], action) {
	// let flag = false
	// if (action.type === 'updata_feel'){
	// 	state.forEach(item => {
	// 		if (item.data.index == action.data.data.index) {
	// 			item.data.text = action.data.data.text
	// 			flag = true
	// 		}
	// 	})
	// 	if (!flag) {
	// 		state.push(action.data)
	// 	}
	// }
	if (action.type === 'updata_feel'){
		state = action.data
	}
	
	return state
}
let reducer = combineReducers({
	sex,
	illness,
	food,
	unlike,
	feel
})
export default reducer