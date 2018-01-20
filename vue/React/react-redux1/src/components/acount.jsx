import React from 'react'
import { connect } from 'react-redux'
class Acount extends React.Component {
	constructor() {
		super()
		this.state = {
			arr: []
		}
		this.clickFn = this.clickFn.bind(this)
		this.addFn = this.addFn.bind(this)
	}
	clickFn () {
		let {dispatch} = this.props
		dispatch({
			type: 'add',
			data: this.refs.text.value
		})
		this.refs.text.nodeValue = ''
	}
	addFn ()  {
		this.props.updataFn()
	}
	render() {
		return (
			<div>
				<h1 onClick={this.clickFn}>点击点击</h1>
				<input type="text" ref='text'/>
				<button onClick={this.addFn}>添加</button>
				<ul>
					{
						this.props.olList.map((item, index) => {
							return <li key={index}>{item}</li>
						})
					}
				</ul>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		olList: state.olList
	}
}
function mapDispatchToProps(dispatch) {
	return {
		updataFn: () => {
			fetch('./src/data/textlist.json').then((res) => res.json()).then(res => {
				dispatch ({
					type:'concat',
					data: res.list
				})
			})
		},
		dispatch: (params) => {
			dispatch ({
				type:params.type,
				data: params.data
			})
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Acount)