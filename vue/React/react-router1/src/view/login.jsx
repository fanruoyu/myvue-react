import React from 'react'
class Login extends React.Component{
	constructor() {
		super()
		this.state = {
			user: '',
			pwd: ''
		}
		this.goto = this.goto.bind(this)
		this.changeuser = this.changeuser.bind(this)
		this.changepwd = this.changepwd.bind(this)
	}
	goto () {
		let {replace} = this.props.history
		let user = this.state.user
		let pwd = this.state.pwd
		let error
		if (user === '' || pwd === '') {
			error = '用户名或密码不能为空'
		} else if (user != 'admin' || pwd != 123456) {
			error = '用户或密码错误'
		}
		if (error) {
			alert(error)
			this.setState(state => {
				state.user = ''
				state.pwd = ''
				return state
			})
		} else  {
			let ls = localStorage
			let userObj = {user: this.state.user, pwd: this.state.pwd}
			ls.setItem('userObj', JSON.stringify(userObj))
			replace('/home')
			this.setState(state => {
				state.user = ''
				state.pwd = ''
				return state
			})
		}
		
	}
	changeuser (e) {
		let user = e.target.value
		this.setState(state => {
			state.user = user
			return state
		})
	}
	changepwd (e) {
		let pwd = e.target.value
		this.setState(state => {
			state.pwd = pwd
			return state
		})
	}
	render () {
		return (<div className='login'>
			<div className="conetn">
				<p><label>用户名：</label><input type="text" onChange={this.changeuser}/></p>
				<p><label>密码：</label><input type="password" onChange={this.changepwd}/></p>
				<button onClick={this.goto}>登录</button>
			</div>
		</div>)
	}
}
export default Login