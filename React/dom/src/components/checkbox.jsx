import React, {Fragment}from 'react'

class CheckBox extends React.Component {
	constructor() {
		super()
		this.state = {
			ind: []
		}
		this.checkAll = this.checkAll.bind(this)
	}
	checkAll (i) {
		this.setState(state => {
			if (state.ind.indexOf(i) !==-1) {
				state.ind.splice(state.ind.indexOf(i), 1)
				if (this.props.callBack) {
					this.props.callBack(state)
				}
			} else {
				state.ind.push(i)
				if (this.props.callBack) {
					this.props.callBack(state)
				}
			}
			return state
		})
	}
	render () {
		let {children} = this.props
		if (children) {
			return <Fragment>
				{React.Children.map(children,(Item, index) => {
					return (
						<p key={index} onClick={() => {this.checkAll(index)}} className={this.state.ind.indexOf(index) !==-1? 'active':''}>
							{Item}
						</p>
					)
				})}
			</Fragment>
		} else {
			return (<h1>没有节点</h1>)
		}
	}
}
export default CheckBox