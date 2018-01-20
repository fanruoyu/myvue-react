import React from 'react'
import H1 from '../components/H1'
class Index extends React.Component {
	constructor () {
		super()
		this.gotoSex = this.gotoSex.bind(this)
	}
	gotoSex () {
		let { push } = this.props.history
		push('/sex')
	}
	render () {
		return (
			<div className='router index'>
				<H1 go={this.props.history.go}>
					小鲜测评
				</H1>
				<div className="index_maincont">
					<button onClick={this.gotoSex}>开始</button>
				</div>
			</div>
		)
	}
}
export default Index