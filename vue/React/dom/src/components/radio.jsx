import React, { Fragment } from 'react'
export default class Vadio extends React.Component {
	constructor() {
		super()
		this.state = {
			ind: -1
		}
	}
	changeInd(i) {
		this.setState(state => {
			state.ind = i
			return state
		})
		if (this.props.callBack) {
			if (this.props.type === 'feel') {
				this.props.callBack(i)
			} else {
				if (i == 0) {
					this.props.callBack('男')
				} else {
					this.props.callBack('女')
				}
			}

		}
	}
	render() {
		let { children } = this.props
		if (children) {
			return (
				<Fragment>
					{
						React.Children.map(children, (item, index) => {
							return <this.props.tag key={index} onClick={() => { this.changeInd(index) }} className={this.state.ind === index ? this.props.className : ''}>{item}</this.props.tag>
						})
					}
				</Fragment>
			)
		} else {
			return <h1>没有节点</h1>
		}
	}
}