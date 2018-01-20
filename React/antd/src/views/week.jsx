import React, {Fragment} from 'react'
import {UPDATA_LIST, UPDATA_BOOL, DELETE_LIST, CLEAR, FILTER} from '../store/action'
import {connect} from 'react-redux'
class Week extends React.Component{
	constructor () {
		super()
		this.state = {
			val: '',
			ind: -1, // 滑过li显示x
			activeIndex: 0, // b标签添加样式
			flag: false,
			num: 0 // 完成个数
		}
		this.addFn = this.addFn.bind(this)
		this.getVal = this.getVal.bind(this)
		this.changeFn = this.changeFn.bind(this)
		this.deleteFn = this.deleteFn.bind(this)
	}
	// 获取input内容
	getVal (e) {
		let val = e.target.value
		this.setState(state => {
			return state.val = val
		})
	}
	// 滑过出现x
	overFn (i) {
		this.setState(state => {
			state.ind = i
			return state
		})
	}
	// 回车添加数据
	addFn (e) {
		if (e.keyCode === 13) {
			let val = this.state.val
			let len = this.props.list.length * 1
			this.props.updata_list({
				type: UPDATA_LIST,
				id:  len++,
				finished: false,
				val: val
			})
			this.refs.text.value = ''
		}
	}
	// 选择
	changeFn (i) {
		let bool = this.props.list[i].finished
		this.props.updata_list( {
			type: UPDATA_BOOL,
			finished: !bool,
			id: i
		})
	}
	// 删除单个数据
	deleteFn (i) {
		this.props.updata_list({
			type: DELETE_LIST,
			id: i
		})
	}
	render() {
		// 结构数据
		let {list, filter, clear} = this.props
		let num = 0
		// 判断完成个数更新
		if (list.length > 0) {
			list.forEach((item) => {
				if (item.finished === false) {
					num ++
				}
				return num
			})
		}
		
		return (<div className='week'>
			<input ref='text' type="text" onKeyUp={this.addFn} onChange={this.getVal}/>
			{
				list.length > 0 &&
					<ol>
						{list.map((item, index) => {
							return (
								<li key={item.id}  className={item.finished? 'active': ''} onMouseOver={() => {this.overFn(index)}} onMouseLeave={() => {this.setState(state => {return state.ind = -1})}}>
									<em onClick={() => {this.changeFn(item.id)}}></em>
									{item.val}
									{this.state.ind === index ? <span onClick={() => {this.deleteFn(item.id)}}>x</span>: ''}
								</li>
							)
						})}
					</ol>
			}
			<div className='bottom'>
				<span>{num}项未完成</span>
				<span>
					<b className={this.state.activeIndex === 0? 'my_b active': 'my_b'} onClick = {() => {filter('all');this.setState(state => {return state.activeIndex = 0})}}>所有</b>
					<b className={this.state.activeIndex === 1? 'my_b active': 'my_b'} onClick = {() => {filter(false);this.setState(state => {return state.activeIndex = 1})}}>正在做</b>
					<b className={this.state.activeIndex === 2? 'my_b active': 'my_b'} onClick = {() => {filter(true);this.setState(state => {return state.activeIndex = 2})}}>已完成</b>
				</span>
				<span onClick={clear}>清除已完成的</span>
			</div>
		</div>)
	}
}

// 筛选和全部显示
function filter_list(list, filter) {
	if (filter == 'all') return list // filter为all时候
	let arr = []
	list.forEach(item => {
		if (item.finished == filter) {
			arr.push(item)
		}
	})
	return arr
}

function mapStateTpProps (state) {
	return {
		list: filter_list(state.list, state.filter)
	}
}
function mapDispatchToProps (dispatch){
	return {
		updata_list: (data) => {
			dispatch({
				type: data.type,
				data: data
			})
		},
		filter: (type) => {
			dispatch({
				type: FILTER, 
				data: type
			})
		},
		clear: () => {
			dispatch({
				type: CLEAR,
				data: true
			})
		}
	}
}
export default connect(mapStateTpProps, mapDispatchToProps)(Week)