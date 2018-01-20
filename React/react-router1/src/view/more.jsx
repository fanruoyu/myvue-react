import React from 'react'
class My extends React.Component{
	constructor() {
		super()
		this.state = {
			list: []
		}
	}
	componentDidMount () {
		fetch('./src/data/moreList.json')
			.then(res => {return res.json()})
			.then(res => {
				this.setState(state => {
					state.list = res
					return state
				})
			})
	}
	render () {
		return (<div className='router more'>
			<h1>更多</h1>
			{
				this.state.list.map((item, index) => {
					return <p key={index} onClick={() => console.log(index)}><i className={item.icon}></i><span>{item.text}</span></p>
				})
			}
		</div>)
	}
}
export default My