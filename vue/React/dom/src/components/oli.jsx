import React from 'react'

class Oli extends React.Component{
	constructor () {
		super ()
		this.state = {
			ind : -1,
			flag: false
		}
		this.slideFn = this.slideFn.bind(this)
	}
	slideFn () {
		let formData = new Date()  
		fetch(' http://localhost:8080/admin/list', {
			method: 'post',
			body: {data: formData}
		})
			.then(res => {
				return res.json()
			}) .then(res => {
				console.log(res)
			})
		// this.props.downFn(this.props.index)
	}
	render () {
		return (
			<li onClick={this.slideFn}>
				<span>{this.props.item}</span>
                    
				<i className={this.props.icon}></i>
				{
					!this.props.flag && <div className="cont">
            显示
					</div>
				}
			</li>
		)
	}
}

export default Oli
