import { combineReducers } from 'redux'
import {UPDATA_LIST, UPDATA_BOOL, DELETE_LIST, CLEAR, FILTER} from '../store/action'

function list(state = [{ type: UPDATA_LIST, id: 0, finished: false, val: '红豆' }], action) {
	// 更新数据添加
	if (action.type === UPDATA_LIST) {
		let flag = true
		state.forEach(item => {
			if (item.val === action.data.val) {
				window.confirm('该条数据已存在！')
				flag = false
			}
		})
		if (flag) {
			state = [...state, action.data]
		}
	}
	// 改变finished状态
	if (action.type === UPDATA_BOOL) {
		state.forEach((item) => {
			if (item.id == action.data.id) {
				item.finished = action.data.finished
			}
		})
	}
	// 删除数据
	if (action.type === DELETE_LIST) {
		let id = action.data.id
		state.forEach((item, index) => {
			if (item.id === id) {
				state.splice(index, 1)
			}
		})
	}

	// 清除完成
	if (action.type === CLEAR) {
		state = state.filter(item => {
			if (item.finished !== true) {
				return item
			}
		})
	}
	return [...state]
}

// 筛选，返回筛选条件
function filter(state = 'all', action) {
	if (action.type === FILTER) {
		return action.data
	} else {
		return state
	}
}
let reducer = combineReducers({
	list,
	filter
})
export default reducer