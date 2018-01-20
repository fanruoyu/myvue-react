import React from 'react'
class Login extends React.Component{
	constructor() {
		super()
		this.state = {
			user: '',
			pwd: ''
		}
		this.goto = this.goto.bind(this)
		this.getUser = this.getUser.bind(this)
		this.getPwd = this.getPwd.bind(this)
	}
	getUser (e) {
		let user = e.target.value
		this.setState (state => {
			state.user = user
		})
	}
	getPwd (e) {
		let pwd = e.target.value
		this.setState (state => {
			state.pwd = pwd
		})
	}
	goto () {
		let {user, pwd} = this.state
		if (user !== '' && pwd !== '') {
			let {push} = this.props.history
			let path = '/home'
			push(path)
		} else  {
			alert('账户或密码不能为空!')
		}
	}
	render () {
		return (<div className='login'>
			<div className="form">
				<p><span>用户名：</span><input type="text" onChange={this.getUser}/></p>
				<p><span>密  码：</span><input type="password" onChange={this.getPwd}/></p>
				<button onClick={this.goto}>登录</button>
			</div>
		</div>)
	}
}
export default Login