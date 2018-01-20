import React from 'react'
class Nav extends React.Component{
	constructor () {
		super()
		this.state = {
			ind: 0
		}
		this.updata = this.updata.bind(this)
	}
	updata (i) {
		this.props.rendContent(i)
		this.setState({
			ind: i
		})
	}
	render () {
		return (
			<div className="nav">
				<span className={this.state.ind == 0? 'active': ''} onClick={() => {this.updata(0)}}>债权产品</span>
                <span className={this.state.ind == 1? 'active': ''} onClick={() => {this.updata(1)}}>优选基金</span>
			</div>
		)
	}
}
export default Nav