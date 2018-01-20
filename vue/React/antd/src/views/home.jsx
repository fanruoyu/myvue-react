import React from 'react'
import MyCont from '../components/tablecont'
import { Link } from 'react-router-dom'
class Home extends React.Component{
	constructor() {
		super()
		this.sendFn = this.sendFn.bind(this)
	}
	sendFn () {
		let feeling = {
			app_id: '13751313169',
			password: '123456',
			user_name: 'Nicholas'
		}
		fetch('/test/list', {
			method: 'post',
			body:  JSON.stringify(feeling),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => {
			return res.json()
		}) .then(res => {
			console.log(res)
		}) 
	}
	render() {
		let stypeObj = {
			'marginLeft': '20px',
			'marginTop': '20px'
		}
		return( <div style={stypeObj}>
			<MyCont />
			<Link to='/week'><button>跳转</button></Link>
			<p onClick={this.sendFn}>后台请求</p>
		</div>)
	}
}

export default Home